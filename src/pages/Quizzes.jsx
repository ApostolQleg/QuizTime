import { useState, useEffect, useCallback } from "react";
import { getQuizzes } from "../services/quizzes.js";
import { useAuth } from "../hooks/useAuth";
import { useDebounce } from "../hooks/useDebounce";
import Grid from "../components/Home/Grid.jsx";
import ModalDescription from "../components/Home/ModalDescription.jsx";
import SearchBar from "../components/Home/SearchBar.jsx";

const ITEMS_PER_PAGE = 36;
const ITEMS_PER_PAGE_AUTH = ITEMS_PER_PAGE - 1;

export default function Quizzes() {
	const { user } = useAuth();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 500);

	const loadData = useCallback(
		async (pageToLoad, isInitialLoad = false, searchParam = "") => {
			try {
				if (!isInitialLoad) setIsLoadingMore(true);

				let currentLimit = ITEMS_PER_PAGE;
				let currentSkip = 0;

				if (user) {
					if (pageToLoad === 1) {
						currentLimit = ITEMS_PER_PAGE_AUTH;
						currentSkip = 0;
					} else {
						currentLimit = ITEMS_PER_PAGE;
						currentSkip = ITEMS_PER_PAGE_AUTH + (pageToLoad - 2) * ITEMS_PER_PAGE;
					}
				} else {
					currentLimit = ITEMS_PER_PAGE;
					currentSkip = (pageToLoad - 1) * ITEMS_PER_PAGE;
				}

				const data = await getQuizzes(currentSkip, currentLimit, searchParam);

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
		[user],
	);

	useEffect(() => {
		setItems([]);
		setPage(1);
		setHasMore(true);
		setLoading(true);
		loadData(1, true, debouncedQuery);
	}, [user, loadData, debouncedQuery]);

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		loadData(nextPage, false, debouncedQuery);
	};

	const handleDeleteSuccess = (deletedQuizId) => {
		setItems((prevItems) =>
			prevItems.filter((item) => item.id !== deletedQuizId && item._id !== deletedQuizId),
		);
		setSelectedQuiz(null);
	};

	return (
		<>
			<div className="flex flex-col items-center justify-between gap-3">
				<SearchBar
					searchTerm={searchQuery}
					onSearchChange={setSearchQuery}
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
