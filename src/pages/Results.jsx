import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getResults } from "@/features/results/api/results.api.js";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ToolBar from "@/widgets/quiz-toolbar/ui/ToolBar.jsx";
import { API_CONFIG } from "@/shared/config/config.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";
import { useInfiniteList } from "@/shared/hooks/useInfiniteList.js";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_RESULTS;

export default function Results() {
	const navigate = useNavigate();
	const { user } = useAuthUserState();

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 500);

	const [sortOption, setSortOption] = useState("newest");

	const loadData = useCallback(
		async ({ pageToLoad }) => {
			if (!user) {
				return {
					items: [],
					hasMore: false,
				};
			}

			try {
				const { skip: currentSkip, limit: currentLimit } = getPaginationRange(
					pageToLoad,
					ITEMS_PER_PAGE,
				);
				const data = await getResults(
					currentSkip,
					currentLimit,
					debouncedQuery,
					sortOption,
				);

				return {
					items: data.results,
					hasMore: data.results.length >= currentLimit,
				};
			} catch (err) {
				console.error("Failed to load results", err);
				return {
					items: [],
					hasMore: false,
				};
			}
		},
		[user, debouncedQuery, sortOption],
	);

	const { items, loading, hasMore, isLoadingMore, handleLoadMore } = useInfiniteList(loadData);

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
		<div className="flex flex-col items-center justify-between gap-3">
			<ToolBar
				search={{ value: searchQuery, onChange: setSearchQuery }}
				sort={{ value: sortOption, onChange: setSortOption }}
				placeholder="Search for results..."
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
	);
}
