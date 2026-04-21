import { useState, useEffect, useCallback, useMemo } from "react";
import { getQuizzes } from "@/features/quizzes/api/quizzes.api.js";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ModalDescription from "@/features/quizzes/components/modals/ModalDescription.jsx";
import ToolBar from "@/widgets/quiz-toolbar/ui/ToolBar.jsx";
import { useNavigate } from "react-router-dom";
import { API_CONFIG } from "@/shared/config/config.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";
import { useInfiniteList } from "@/shared/hooks/useInfiniteList.js";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

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

	useEffect(() => {
		if (!user) {
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	const loadData = useCallback(
		async ({ pageToLoad, authorId }) => {
			if (!authorId) {
				return {
					items: [],
					hasMore: false,
				};
			}

			try {
				const { skip: currentSkip, limit: currentLimit } = getPaginationRange(
					pageToLoad,
					ITEMS_PER_PAGE,
					ITEMS_PER_PAGE_FIRST,
					debouncedQuery === "",
				);

				const data = await getQuizzes(
					currentSkip,
					currentLimit,
					debouncedQuery,
					sortOption,
					authorId,
				);

				return {
					items: data.quizzes,
					hasMore: data.quizzes.length >= currentLimit,
				};
			} catch (err) {
				console.error("Failed to load quizzes", err);
				return {
					items: [],
					hasMore: false,
				};
			}
		},
		[debouncedQuery, sortOption],
	);

	const authorParams = useMemo(() => ({ authorId: user?._id }), [user?._id]);

	const { items, setItems, loading, hasMore, isLoadingMore, handleLoadMore } = useInfiniteList(
		loadData,
		authorParams,
	);

	const handleDeleteSuccess = (deletedQuizId, deletedQuizTitle) => {
		setItems((prevItems) =>
			prevItems.filter((item) => item.id !== deletedQuizId && item._id !== deletedQuizId),
		);
		setSelectedQuiz(null);
		addToast(
			deletedQuizTitle
				? `Quiz "${deletedQuizTitle}" deleted successfully.`
				: "Quiz deleted successfully.",
		);
	};

	if (!user) return null;

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
					loading={loading}
					hasMore={hasMore}
					onLoadMore={handleLoadMore}
					isLoadingMore={isLoadingMore}
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
