import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getResults } from "../services/results.js";
import { useAuth } from "../hooks/useAuth";
import Grid from "../components/Home/Grid.jsx";

const ITEMS_PER_PAGE = 36;

export default function Results() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const loadData = useCallback(
		async (pageToLoad, isInitialLoad = false) => {
			if (!user) {
				setLoading(false);
				return;
			}

			try {
				if (!isInitialLoad) setIsLoadingMore(true);

				const currentSkip = (pageToLoad - 1) * ITEMS_PER_PAGE;
				const data = await getResults(currentSkip, ITEMS_PER_PAGE);

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

		loadData(1, true);
	}, [user, loadData]);

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		loadData(nextPage, false);
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
	);
}
