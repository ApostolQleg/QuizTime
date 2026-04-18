import { useState, useEffect, useCallback } from "react";
import { getQuizzes } from "@/features/quizzes/api/quizzes.api.js";
import { useAuth } from "@/features/auth/hooks/useAuth.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ModalDescription from "@/features/quizzes/components/modals/ModalDescription.jsx";
import ToolBar from "@/widgets/quiz-toolbar/ui/ToolBar.jsx";
import { useNavigate } from "react-router-dom";
import { API_CONFIG } from "@/shared/config/config.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";
import { useToastStore } from "@/shared/ui/toast/toastStore.js";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_QUIZZES;
const ITEMS_PER_PAGE_FIRST = API_CONFIG.ITEMS_PER_PAGE_QUIZZES_AUTH;

export default function MyQuizzes() {
	const { user } = useAuth();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 500);

	const addToast = useToastStore((state) => state.addToast);

	const [sortOption, setSortOption] = useState("newest");
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	const loadData = useCallback(
		async (
			pageToLoad,
			isInitialLoad = false,
			searchParam = "",
			sortParam = "newest",
			authorId,
		) => {
			if (!authorId) return;
			try {
				if (!isInitialLoad) setIsLoadingMore(true);

				const { skip: currentSkip, limit: currentLimit } = getPaginationRange(
					pageToLoad,
					ITEMS_PER_PAGE,
					ITEMS_PER_PAGE_FIRST,
					searchParam === "",
				);

				const data = await getQuizzes(
					currentSkip,
					currentLimit,
					searchParam,
					sortParam,
					authorId,
				);

				if (data.quizzes.length < currentLimit) {
					setHasMore(false);
				}

				setItems((prev) => (isInitialLoad ? data.quizzes : [...prev, ...data.quizzes]));
			} catch (err) {
				console.error("Failed to load quizzes", err);
			} finally {
				setLoading(false);
				setIsLoadingMore(false);
			}
		},
		[],
	);

	useEffect(() => {
		if (!user) return;

		setItems([]);
		setPage(1);
		setHasMore(true);
		setLoading(true);
		loadData(1, true, debouncedQuery, sortOption, `${user._id}`);
	}, [user, loadData, debouncedQuery, sortOption]);

	const handleLoadMore = () => {
		if (!user) return;
		const nextPage = page + 1;
		setPage(nextPage);
		loadData(nextPage, false, debouncedQuery, sortOption, `${user._id}`);
	};

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
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					sortOption={sortOption}
					onSortChange={setSortOption}
					placeholder={"Search for quizzes..."}
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
