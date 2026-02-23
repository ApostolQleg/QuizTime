import { useState, useEffect, useCallback } from "react";
import { getQuizzes } from "../services/quizzes.js";
import { useAuth } from "../hooks/useAuth";
import Grid from "../components/Home/Grid.jsx";
import ModalDescription from "../components/Home/ModalDescription.jsx";
import SearchBar from "../components/Home/SearchBar.jsx";

export default function Quizzes() {
	const { user } = useAuth();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");

	const ITEMS_PER_PAGE = 36;
	const ITEMS_PER_PAGE_AUTH = ITEMS_PER_PAGE - 1;

	const loadData = useCallback(
		async (pageToLoad, isInitialLoad = false) => {
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

				const data = await getQuizzes(currentSkip, currentLimit);

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
		[user, ITEMS_PER_PAGE, ITEMS_PER_PAGE_AUTH],
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

	const handleDeleteSuccess = (deletedQuizId) => {
		setItems((prevItems) =>
			prevItems.filter((item) => item.id !== deletedQuizId && item._id !== deletedQuizId),
		);
		setSelectedQuiz(null);
	};

	const filteredItems = items.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<>
			<div className="flex flex-col items-center justify-between gap-3">
				<SearchBar
					searchTerm={searchQuery}
					onSearchChange={setSearchQuery}
					placeholder="Search for quizzes..."
				/>
				<Grid
					items={filteredItems}
					loading={loading}
					hasMore={hasMore && searchQuery === ""}
					onLoadMore={handleLoadMore}
					isLoadingMore={isLoadingMore}
					showAddButton={!!user && searchQuery === ""}
					isResultsPage={false}
					onCardClick={setSelectedQuiz}
					emptyMessage={
						searchQuery
							? `No quizzes found matching "${searchQuery}"`
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
