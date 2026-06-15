import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import ModalDescription from "@/features/quiz/components/modals/ModalDescription.jsx";
import { useQuizSSE } from "@/features/quiz/hooks/useQuizSSE.js";
import {
	useQuizzesListActions,
	useQuizzesListState,
} from "@/features/quiz/stores/quizListStore.js";
import { API_CONFIG } from "@/shared/config/config.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import Loading from "@/shared/ui/Loading.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";
import Grid from "@/widgets/grid/ui/Grid.jsx";
import ToolBar from "@/widgets/toolbar/ui/ToolBar.jsx";

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

	const { items, loading, page, hasMore } = useQuizzesListState();
	const { fetchQuizzesPage, clear, removeQuiz } = useQuizzesListActions();

	useEffect(() => {
		if (!user) {
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	const fetchParams = useCallback(
		(pageToLoad) => ({
			pageToLoad,
			itemsPerPage: ITEMS_PER_PAGE,
			itemsPerPageFirst: ITEMS_PER_PAGE_FIRST,
			condition: debouncedQuery === "",
			query: debouncedQuery,
			sort: sortOption,
			authorId: user?._id,
		}),
		[user?._id, debouncedQuery, sortOption],
	);

	useEffect(() => {
		if (user?._id) {
			clear();
			fetchQuizzesPage(fetchParams(1));
		}
		return () => clear();
	}, [fetchQuizzesPage, clear, user?._id, fetchParams]);

	const handleLoadMore = useCallback(() => {
		if (!loading && hasMore) {
			fetchQuizzesPage(fetchParams(page + 1));
		}
	}, [loading, hasMore, page, fetchQuizzesPage, fetchParams]);

	const handleDeleteSuccess = (deletedQuizId, deletedQuizTitle) => {
		removeQuiz(deletedQuizId);
		setSelectedQuiz(null);
		addToast(
			deletedQuizTitle
				? `Quiz "${deletedQuizTitle}" deleted successfully.`
				: "Quiz deleted successfully.",
		);
	};

	useQuizSSE({
		authorId: user?._id,
		searchQuery: debouncedQuery,
		sortOption,
		onActiveQuizChange: (updatedOrNull) => {
			if (!updatedOrNull && selectedQuiz) setSelectedQuiz(null);
			if (updatedOrNull && selectedQuiz?._id === updatedOrNull._id)
				setSelectedQuiz(updatedOrNull);
		},
	});

	if (!user) return null;

	if (loading && page === 1) {
		return <Loading message="Loading quizzes..." />;
	}

	return (
		<>
			<ToolBar
				search={{ value: searchQuery, onChange: setSearchQuery }}
				sort={{ value: sortOption, onChange: setSortOption }}
				placeholder="Search for quizzes..."
			/>

			<div className="mt-5">
				<Grid
					items={items}
					view={{
						loading: loading && page === 1,
						hasMore,
						isLoadingMore: loading && page > 1,
						showAddButton: !!user && searchQuery === "",
						isResultsPage: false,
					}}
					onLoadMore={handleLoadMore}
					onCardClick={setSelectedQuiz}
					emptyMessage={
						debouncedQuery
							? `No quizzes found matching "${debouncedQuery}"`
							: "You are quizless, create your first quiz!"
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
