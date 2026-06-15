import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import {
	useResultsListActions,
	useResultsListState,
} from "@/features/result/stores/resultListStore.js";
import { API_CONFIG } from "@/shared/config/config.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import Loading from "@/shared/ui/Loading.jsx";
import Grid from "@/widgets/grid/ui/Grid.jsx";
import ToolBar from "@/widgets/toolbar/ui/ToolBar.jsx";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_RESULTS;

export default function Results() {
	const navigate = useNavigate();
	const { user } = useAuthUserState();

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 500);
	const [sortOption, setSortOption] = useState("newest");

	const { items, loading, page, hasMore } = useResultsListState();
	const { fetchResultsPage, clear } = useResultsListActions();

	useEffect(() => {
		if (user) {
			clear();
			fetchResultsPage({
				pageToLoad: 1,
				itemsPerPage: ITEMS_PER_PAGE,
				query: debouncedQuery,
				sort: sortOption,
			});
		}
		return () => clear();
	}, [fetchResultsPage, clear, user, debouncedQuery, sortOption]);

	const handleLoadMore = useCallback(() => {
		if (!loading && hasMore) {
			fetchResultsPage({
				pageToLoad: page + 1,
				itemsPerPage: ITEMS_PER_PAGE,
				query: debouncedQuery,
				sort: sortOption,
			});
		}
	}, [loading, hasMore, page, fetchResultsPage, debouncedQuery, sortOption]);

	if (loading && page === 1) return <Loading message="Loading results..." />;

	const emptyMessage = user ? (
		"You have no quiz results yet."
	) : (
		<div className="flex flex-col items-center gap-2">
			<span className="text-xl font-bold">
				History is available only for registered users
			</span>
			<Link to="/register" className="text-(--col-primary) hover:underline text-base">
				Sign up to save your progress
			</Link>
		</div>
	);

	return (
		<>
			<ToolBar
				search={{ value: searchQuery, onChange: setSearchQuery }}
				sort={{ value: sortOption, onChange: setSortOption }}
				placeholder="Search for results..."
			/>
			<div className="mt-5">
				<Grid
					items={items}
					view={{
						loading: loading && page === 1,
						hasMore,
						isLoadingMore: loading && page > 1,
						showAddButton: false,
						isResultsPage: true,
					}}
					onLoadMore={handleLoadMore}
					onCardClick={(item) => navigate(`/result/${item.quizId}/${item._id}`)}
					emptyMessage={emptyMessage}
				/>
			</div>
		</>
	);
}
