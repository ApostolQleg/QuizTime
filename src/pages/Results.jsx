import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import { getResults } from "@/features/result/api/results.api.js";
import {
	useResultsListActions,
	useResultsListState,
} from "@/features/result/stores/resultsListStore.js";
import { API_CONFIG } from "@/shared/config/config.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import { useSSE } from "@/shared/hooks/useSSE.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";
import Loading from "@/shared/ui/Loading.jsx";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ToolBar from "@/widgets/quiz-toolbar/ui/ToolBar.jsx";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_RESULTS;

export default function Results() {
	const navigate = useNavigate();
	const { user } = useAuthUserState();

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 500);
	const [sortOption, setSortOption] = useState("newest");

	const { items, loading, page, hasMore } = useResultsListState();
	const { setItems, appendItems, clear, setLoading, setPage, setHasMore } =
		useResultsListActions();

	const fetchResults = useCallback(
		async (pageToLoad) => {
			if (!user) return;

			setLoading(true);
			try {
				const { skip, limit } = getPaginationRange(pageToLoad, ITEMS_PER_PAGE);

				const data = await getResults(skip, limit, debouncedQuery, sortOption);
				const fetchedResults = data.results;

				if (pageToLoad === 1) {
					setItems(fetchedResults);
				} else {
					appendItems(fetchedResults);
				}

				setHasMore(fetchedResults.length >= limit);
				setPage(pageToLoad);
			} catch (err) {
				console.error("Failed to load results", err);
				setHasMore(false);
			} finally {
				setLoading(false);
			}
		},
		[user, debouncedQuery, sortOption, setItems, appendItems, setHasMore, setPage, setLoading],
	);

	useEffect(() => {
		if (user) {
			clear();
			fetchResults(1);
		}
		return () => clear();
	}, [fetchResults, clear, user]);

	useSSE(
		"DELETE_QUIZ",
		useCallback(
			(deletedQuizId) => {
				setItems(items.filter((item) => item.quizId !== deletedQuizId));
			},
			[items, setItems],
		),
	);

	const handleLoadMore = useCallback(() => {
		if (!loading && hasMore) {
			fetchResults(page + 1);
		}
	}, [loading, hasMore, page, fetchResults]);

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

	if (loading && page === 1) {
		return <Loading message="Loading results..." />;
	}

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
