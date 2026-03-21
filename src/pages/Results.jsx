import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getResults } from "@/features/results/api/results.api.js";
import { useAuth } from "@/features/auth/hooks/useAuth.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ToolBar from "@/widgets/quiz-toolbar/ui/ToolBar.jsx";
import { API_CONFIG } from "@/shared/config/config.js";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_RESULTS;

export default function Results() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 500);

	const [sortOption, setSortOption] = useState("newest");

	const loadData = useCallback(
		async (pageToLoad, isInitialLoad = false, searchParam = "", sortParam = "newest") => {
			if (!user) {
				setLoading(false);
				return;
			}

			try {
				if (!isInitialLoad) setIsLoadingMore(true);

				const currentSkip = (pageToLoad - 1) * ITEMS_PER_PAGE;
				const data = await getResults(currentSkip, ITEMS_PER_PAGE, searchParam, sortParam);

				if (data.length < ITEMS_PER_PAGE) {
					setHasMore(false);
				}

				setItems((prev) => (isInitialLoad ? data : [...prev, ...data]));
			} catch (err) {
				console.error("Failed to load results", err);
			} finally {
				setLoading(false);
				setIsLoadingMore(false);
			}
		},
		[user],
	);

	useEffect(() => {
		setItems([]);
		setPage(1);
		setHasMore(true);
		setLoading(true);
		loadData(1, true, debouncedQuery, sortOption);
	}, [user, loadData, debouncedQuery, sortOption]);

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		loadData(nextPage, false, debouncedQuery, sortOption);
	};

	const emptyMessage = user ? (
		"You have no quiz results yet."
	) : (
		<>
			<span className="text-xl font-bold">
				History is available only for registered users
			</span>
			<Link to="/register" className="text-(--col-primary) hover:underline text-base">
				Sign up to save your progress
			</Link>
		</>
	);

	return (
		<>
			<div className="flex flex-col items-center justify-between gap-3">
				<ToolBar
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					sortOption={sortOption}
					onSortChange={setSortOption}
					placeholder={"Search for results..."}
				/>
				<Grid
					items={items}
					loading={loading}
					hasMore={hasMore}
					onLoadMore={handleLoadMore}
					isLoadingMore={isLoadingMore}
					showAddButton={false}
					isResultsPage={true}
					onCardClick={(item) => navigate(`/result/${item.quizId}/${item._id}`)}
					emptyMessage={emptyMessage}
				/>
			</div>
		</>
	);
}
