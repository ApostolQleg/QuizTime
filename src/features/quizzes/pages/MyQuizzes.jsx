import { useState, useEffect, useCallback } from "react";
import { getQuizzes } from "@/features/quizzes/api/quizzes.api.js";
import { useAuth } from "@/features/auth/hooks/useAuth.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import Grid from "@/shared/components/Grid.jsx";
import ModalDescription from "@/features/quizzes/components/modals/ModalDescription.jsx";
import ToolBar from "@/shared/components/ToolBar.jsx";
import { useNavigate } from "react-router-dom";
import { API_CONFIG } from "@/constants/config.js";

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

				let currentLimit = ITEMS_PER_PAGE;
				let currentSkip = 0;

				if (searchParam === "") {
					if (pageToLoad === 1) {
						currentLimit = ITEMS_PER_PAGE_FIRST;
						currentSkip = 0;
					} else {
						currentLimit = ITEMS_PER_PAGE;
						currentSkip = ITEMS_PER_PAGE_FIRST + (pageToLoad - 2) * ITEMS_PER_PAGE;
					}
				} else {
					currentLimit = ITEMS_PER_PAGE;
					currentSkip = (pageToLoad - 1) * ITEMS_PER_PAGE;
				}

				const data = await getQuizzes(
					currentSkip,
					currentLimit,
					searchParam,
					sortParam,
					authorId,
				);

				if (data.length < currentLimit) {
					setHasMore(false);
				}

				setItems((prev) => (isInitialLoad ? data : [...prev, ...data]));
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

	const handleDeleteSuccess = (deletedQuizId) => {
		setItems((prevItems) =>
			prevItems.filter((item) => item.id !== deletedQuizId && item._id !== deletedQuizId),
		);
		setSelectedQuiz(null);
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
