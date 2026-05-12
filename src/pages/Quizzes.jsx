import { useCallback, useEffect, useState } from "react";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import { getQuizList, invalidateQuizCache, invalidateQuizListCache } from "@/features/quizzes/api/quizzes.api.js";
import ModalDescription from "@/features/quizzes/components/modals/ModalDescription.jsx";
import {
	useQuizzesListActions,
	useQuizzesListState,
} from "@/features/quizzes/stores/quizzesListStore.js";
import { API_CONFIG } from "@/shared/config/config.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import { useSSE } from "@/shared/hooks/useSSE.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ToolBar from "@/widgets/quiz-toolbar/ui/ToolBar.jsx";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_QUIZZES;
const ITEMS_PER_PAGE_AUTH = API_CONFIG.ITEMS_PER_PAGE_QUIZZES_AUTH;

export default function Quizzes() {
	const { user } = useAuthUserState();
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 500);
	const [sortOption, setSortOption] = useState("newest");

	const { addToast } = useToastActions();

	const { items, loading, page, hasMore } = useQuizzesListState();
	const { setItems, appendItems, clear, setLoading, setPage, setHasMore, removeItem } =
		useQuizzesListActions();

	const fetchQuizzes = useCallback(
		async (pageToLoad) => {
			setLoading(true);
			try {
				const { skip, limit } = getPaginationRange(
					pageToLoad,
					ITEMS_PER_PAGE,
					ITEMS_PER_PAGE_AUTH,
					!!user && debouncedQuery === "",
				);

				const data = await getQuizList(skip, limit, debouncedQuery, sortOption);
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
		[user, debouncedQuery, sortOption, setItems, appendItems, setHasMore, setPage, setLoading],
	);

	useEffect(() => {
		clear();
		fetchQuizzes(1);

		return () => clear();
	}, [fetchQuizzes, clear]);

	const handleLoadMore = useCallback(() => {
		if (!loading && hasMore) {
			fetchQuizzes(page + 1);
		}
	}, [loading, hasMore, page, fetchQuizzes]);

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
				if (searchQuery === "" && sortOption === "newest") {
					setItems([newQuiz, ...items]);
				}
				invalidateQuizListCache();
			},
			[items, searchQuery, sortOption, setItems],
		),
	);

	useSSE(
		"UPDATE_QUIZ",
		useCallback(
			(updatedQuiz) => {
				setItems(items.map((item) => (item._id === updatedQuiz._id ? updatedQuiz : item)));
				if (selectedQuiz?._id === updatedQuiz._id) {
					setSelectedQuiz(updatedQuiz);
				}
				invalidateQuizCache(updatedQuiz._id);
				invalidateQuizListCache();
			},
			[items, setItems, selectedQuiz],
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
			},
			[removeItem, selectedQuiz],
		),
	);

	return (
		<>
			<div className="flex flex-col items-center justify-between gap-3">
				<ToolBar
					search={{ value: searchQuery, onChange: setSearchQuery }}
					sort={{ value: sortOption, onChange: setSortOption }}
					placeholder="Search for quizzes..."
				/>
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
							: "No quizzes found."
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
