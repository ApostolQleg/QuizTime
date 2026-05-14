import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "@/features/profile/api/user.api.js";
import {
	getQuizList,
	invalidateQuizCache,
	invalidateQuizListCache,
} from "@/features/quizzes/api/quizzes.api.js";
import ModalDescription from "@/features/quizzes/components/modals/ModalDescription.jsx";
import {
	useQuizzesListActions,
	useQuizzesListState,
} from "@/features/quizzes/stores/quizzesListStore.js";
import { API_CONFIG } from "@/shared/config/config.js";
import { useSSE } from "@/shared/hooks/useSSE.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";
import Avatar from "@/shared/ui/Avatar.jsx";
import Container from "@/shared/ui/Container.jsx";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_PUBLIC_PROFILE;

export default function PublicProfile() {
	const navigate = useNavigate();
	const { userId } = useParams();

	const [user, setUser] = useState(null);
	const [isProfileLoading, setIsProfileLoading] = useState(true);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const { items, loading: loadingQuizzes, page, hasMore } = useQuizzesListState();
	const { setItems, appendItems, clear, setLoading, setPage, setHasMore } =
		useQuizzesListActions();

	const removeItemLocally = useCallback(
		(idToRemove) => {
			setItems(items.filter((item) => item._id !== idToRemove));
		},
		[items, setItems],
	);

	useEffect(() => {
		if (userId) {
			getUserProfile(userId)
				.then((data) => {
					setUser(data.user);
				})
				.catch((err) => {
					console.error(err);
					navigate("/", { replace: true });
				})
				.finally(() => setIsProfileLoading(false));
		} else {
			navigate("/", { replace: true });
		}
	}, [userId, navigate]);

	const fetchUserQuizzes = useCallback(
		async (pageToLoad) => {
			if (!userId) return;

			setLoading(true);
			try {
				const { skip, limit } = getPaginationRange(pageToLoad, ITEMS_PER_PAGE);

				const data = await getQuizList(skip, limit, "", "newest", userId);
				const fetchedQuizzes = data.quizzes;

				if (pageToLoad === 1) {
					setItems(fetchedQuizzes);
				} else {
					appendItems(fetchedQuizzes);
				}

				setHasMore(fetchedQuizzes.length >= limit);
				setPage(pageToLoad);
			} catch (err) {
				console.error("Failed to load quizzes", err);
				setHasMore(false);
			} finally {
				setLoading(false);
			}
		},
		[userId, setItems, appendItems, setHasMore, setPage, setLoading],
	);

	useEffect(() => {
		if (userId) {
			clear();
			fetchUserQuizzes(1);
		}
		return () => clear();
	}, [fetchUserQuizzes, clear, userId]);

	const handleLoadMore = useCallback(() => {
		if (!loadingQuizzes && hasMore) {
			fetchUserQuizzes(page + 1);
		}
	}, [loadingQuizzes, hasMore, page, fetchUserQuizzes]);

	useSSE(
		"CREATE_QUIZ",
		useCallback(
			(newQuiz) => {
				if (newQuiz.authorId === userId) {
					setItems([newQuiz, ...items]);
				}
				invalidateQuizListCache();
			},
			[items, setItems, userId],
		),
	);

	useSSE(
		"UPDATE_QUIZ",
		useCallback(
			(updatedQuiz) => {
				if (updatedQuiz.authorId === userId) {
					setItems(
						items.map((item) => (item._id === updatedQuiz._id ? updatedQuiz : item)),
					);
					if (selectedQuiz?._id === updatedQuiz._id) {
						setSelectedQuiz(updatedQuiz);
					}
					invalidateQuizCache(updatedQuiz._id);
					invalidateQuizListCache();
				}
			},
			[items, setItems, selectedQuiz, userId],
		),
	);

	useSSE(
		"DELETE_QUIZ",
		useCallback(
			(deletedQuizId) => {
				removeItemLocally(deletedQuizId);
				if (selectedQuiz?._id === deletedQuizId) {
					setSelectedQuiz(null);
				}
				invalidateQuizCache(deletedQuizId);
				invalidateQuizListCache();
			},
			[removeItemLocally, selectedQuiz],
		),
	);

	if (isProfileLoading) return <Container className="text-center">Loading...</Container>;
	if (!user) return null;

	return (
		<Container className="flex flex-col items-center gap-8 py-8">
			<div className="flex flex-col items-center justify-center p-8 bg-(--col-bg-card) border border-(--col-border) rounded-3xl w-full max-w-4xl shadow-lg gap-5">
				<Avatar
					src={user.avatarUrl}
					type={user.avatarType}
					color={user.themeColor}
					name={user.nickname}
					size="xl"
				/>

				<div className="flex flex-col items-center gap-1">
					<h1 className="text-3xl sm:text-4xl font-extrabold text-(--col-text-main) tracking-tight">
						{user.nickname}
					</h1>
					<span className="text-(--col-text-muted) font-medium px-4 py-1 bg-(--col-bg-input) rounded-full text-sm mt-2">
						Quiz Creator
					</span>
				</div>
			</div>

			<div className="w-full max-w-7xl flex flex-col gap-6 mt-4">
				<h2 className="text-2xl font-bold text-(--col-text-main) px-2 sm:px-4">
					Quizzes by {user.nickname}
				</h2>

				<Grid
					items={items}
					loading={loadingQuizzes && page === 1}
					hasMore={hasMore}
					onLoadMore={handleLoadMore}
					isLoadingMore={loadingQuizzes && page > 1}
					showAddButton={false}
					isResultsPage={false}
					onCardClick={setSelectedQuiz}
					emptyMessage={`${user.nickname} hasn't published any quizzes yet.`}
				/>
			</div>

			{selectedQuiz && (
				<ModalDescription
					quiz={selectedQuiz}
					onClose={() => setSelectedQuiz(null)}
					isOpen={!!selectedQuiz}
				/>
			)}
		</Container>
	);
}
