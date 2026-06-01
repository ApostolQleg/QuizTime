import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import {
	getQuizList,
	invalidateQuizCache,
	invalidateQuizListCache,
} from "@/features/quiz/api/quizzes.api.js";
import ModalDescription from "@/features/quiz/components/modals/ModalDescription.jsx";
import {
	useQuizzesListActions,
	useQuizzesListState,
} from "@/features/quiz/stores/quizzesListStore.js";
import { API_CONFIG } from "@/shared/config/config.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import { useSSE } from "@/shared/hooks/useSSE.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ToolBar from "@/widgets/quiz-toolbar/ui/ToolBar.jsx";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_QUIZZES;
const ITEMS_PER_PAGE_FIRST = API_CONFIG.ITEMS_PER_PAGE_QUIZZES_AUTH;

export default function MyQuizzes() {
	const { user } = useAuthUserState();
	const navigate = useNavigate();

	const [selectedQuiz, setSelectedQuiz] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 500);
	const [sortOption, setSortOption] = useState("newest");

	const { addToast } = useToastActions();

	const { items, loading, page, hasMore } = useQuizzesListState();
	const { setItems, appendItems, clear, setLoading, setPage, setHasMore, removeItem } =
		useQuizzesListActions();

	useEffect(() => {
		if (!user) {
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	const fetchMyQuizzes = useCallback(
		async (pageToLoad) => {
			if (!user?._id) return;

			setLoading(true);
			try {
				const { skip, limit } = getPaginationRange(
					pageToLoad,
					ITEMS_PER_PAGE,
					ITEMS_PER_PAGE_FIRST,
					debouncedQuery === "",
				);

				const data = await getQuizList(skip, limit, debouncedQuery, sortOption, user._id);
				const fetchedQuizzes = data.quizzes;

				if (pageToLoad === 1) {
					setItems(fetchedQuizzes);
				} else {
					appendItems(fetchedQuizzes);
				}

				setHasMore(fetchedQuizzes.length >= limit);
				setPage(pageToLoad);
			} catch (err) {
				console.error("Failed to load quizzes", err);
				setHasMore(false);
			} finally {
				setLoading(false);
			}
		},
		[
			user?._id,
			debouncedQuery,
			sortOption,
			setItems,
			appendItems,
			setHasMore,
			setPage,
			setLoading,
		],
	);

	useEffect(() => {
		if (user?._id) {
			clear();
			fetchMyQuizzes(1);
		}
		return () => clear();
	}, [fetchMyQuizzes, clear, user?._id]);

	const handleLoadMore = useCallback(() => {
		if (!loading && hasMore) {
			fetchMyQuizzes(page + 1);
		}
	}, [loading, hasMore, page, fetchMyQuizzes]);

	const handleDeleteSuccess = (deletedQuizId, deletedQuizTitle) => {
		removeItem(deletedQuizId);
		setSelectedQuiz(null);
		addToast(
			deletedQuizTitle
				? `Quiz "${deletedQuizTitle}" deleted successfully.`
				: "Quiz deleted successfully.",
		);
	};

	useSSE(
		"CREATE_QUIZ",
		useCallback(
			(newQuiz) => {
				if (
					newQuiz.authorId === user?._id &&
					searchQuery === "" &&
					sortOption === "newest"
				) {
					setItems([newQuiz, ...items]);
				}
				invalidateQuizListCache();
				invalidateQuizListCache();
			},
			[items, searchQuery, sortOption, setItems, user?._id],
		),
	);

	useSSE(
		"UPDATE_QUIZ",
		useCallback(
			(updatedQuiz) => {
				if (updatedQuiz.authorId === user?._id) {
					setItems(
						items.map((item) => (item._id === updatedQuiz._id ? updatedQuiz : item)),
					);
					if (selectedQuiz?._id === updatedQuiz._id) {
						setSelectedQuiz(updatedQuiz);
					}
					invalidateQuizCache(updatedQuiz._id);
					invalidateQuizListCache();
					invalidateQuizListCache();
				}
			},
			[items, setItems, selectedQuiz, user?._id],
		),
	);

	useSSE(
		"DELETE_QUIZ",
		useCallback(
			(deletedQuizId) => {
				removeItem(deletedQuizId);
				if (selectedQuiz?._id === deletedQuizId) {
					setSelectedQuiz(null);
				}
				invalidateQuizCache(deletedQuizId);
				invalidateQuizListCache();
				invalidateQuizListCache();
			},
			[removeItem, selectedQuiz],
		),
	);

	if (!user) return null;

	if (loading && page === 1) {
		return (
			<div className="flex-1 flex items-center justify-center text-(--col-text-main) text-xl font-bold animate-pulse">
				Loading quizzes...
			</div>
		);
	}

	return (
		<>
			<ToolBar
				search={{ value: searchQuery, onChange: setSearchQuery }}
				sort={{ value: sortOption, onChange: setSortOption }}
				placeholder="Search for quizzes..."
			/>

			<div className="mt-5">
				<Grid
					items={items}
					loading={loading && page === 1}
					hasMore={hasMore}
					onLoadMore={handleLoadMore}
					isLoadingMore={loading && page > 1}
					showAddButton={!!user && searchQuery === ""}
					isResultsPage={false}
					onCardClick={setSelectedQuiz}
					emptyMessage={
						debouncedQuery
							? `No quizzes found matching "${debouncedQuery}"`
							: "You are quizless, create one!"
					}
				/>
			</div>

			{selectedQuiz && (
				<ModalDescription
					quiz={selectedQuiz}
					onClose={() => setSelectedQuiz(null)}
					isOpen={!!selectedQuiz}
					onDeleteSuccess={handleDeleteSuccess}
				/>
			)}
		</>
	);
}
