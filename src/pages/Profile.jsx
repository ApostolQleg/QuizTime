import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import ModalDescription from "@/features/quiz/components/modals/ModalDescription.jsx";
import { useQuizSSE } from "@/features/quiz/hooks/useQuizSSE.js";
import {
	useQuizzesListActions,
	useQuizzesListState,
} from "@/features/quiz/stores/quizListStore.js";
import { getUserProfile } from "@/features/user/api/user.api.js";
import { QuizStatsCard } from "@/features/user/components/profile/StatsCard.jsx";
import settingsIcon from "@/shared/assets/settings.png";
import { API_CONFIG } from "@/shared/config/config.js";
import Loading from "@/shared/ui/Loading.jsx";
import Avatar from "@/shared/ui/user/Avatar.jsx";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_PUBLIC_PROFILE;

export default function Profile() {
	const navigate = useNavigate();
	const { userId } = useParams();

	const [user, setUser] = useState(null);
	const [isProfileLoading, setIsProfileLoading] = useState(true);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const { user: authUser } = useAuthUserState();

	const { items, loading: loadingQuizzes, page, hasMore } = useQuizzesListState();
	const { fetchQuizzesPage, clear } = useQuizzesListActions();

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

	const fetchParams = useCallback(
		(pageToLoad) => ({
			pageToLoad,
			itemsPerPage: ITEMS_PER_PAGE,
			query: "",
			sort: "newest",
			authorId: userId,
		}),
		[userId],
	);

	useEffect(() => {
		if (userId) {
			clear();
			fetchQuizzesPage(fetchParams(1));
		}
		return () => clear();
	}, [fetchQuizzesPage, clear, userId, fetchParams]);

	const handleLoadMore = useCallback(() => {
		if (!loadingQuizzes && hasMore) {
			fetchQuizzesPage(fetchParams(page + 1));
		}
	}, [loadingQuizzes, hasMore, page, fetchQuizzesPage, fetchParams]);

	useQuizSSE({
		authorId: userId,
		searchQuery: "",
		sortOption: "newest",
		onActiveQuizChange: (updatedOrNull) => {
			if (!updatedOrNull && selectedQuiz) setSelectedQuiz(null);
			if (updatedOrNull && selectedQuiz?._id === updatedOrNull._id)
				setSelectedQuiz(updatedOrNull);
		},
	});

	if (isProfileLoading) return <Loading />;
	if (!user) return null;

	const authUserId = authUser?._id;
	const isOwnProfile = authUserId && authUserId === userId;

	return (
		<div className="flex flex-col items-center gap-8 py-8">
			<div className="flex flex-col items-center justify-center p-8 bg-(--col-bg-card) border border-(--col-border) rounded-3xl w-full max-w-4xl shadow-lg gap-5 relative">
				{isOwnProfile && (
					<button
						type="button"
						onClick={() => navigate("/settings")}
						aria-label="Settings"
						className="absolute top-5 right-5 p-1 bg-transparent hover:opacity-80 transition-opacity cursor-pointer border-none flex items-center justify-center"
					>
						<img src={settingsIcon} alt="" className="size-10 object-contain" />
					</button>
				)}

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

					<div className="flex items-center gap-3 mt-2">
						<span className="text-(--col-text-muted) font-medium px-4 py-1 bg-(--col-bg-input) rounded-full text-sm">
							Quiz Creator
						</span>
					</div>
				</div>
				<div className="w-full max-w-lg">
					<QuizStatsCard passedCount={user?.stats?.quizzesPassedCount ?? 0} />
				</div>
			</div>

			<div className="w-full max-w-7xl flex flex-col gap-6 mt-4">
				<h2 className="text-2xl font-bold text-(--col-text-main) px-2 sm:px-4">
					{isOwnProfile ? "My Quizzes" : `Quizzes by ${user.nickname}`}
				</h2>

				<Grid
					items={items}
					view={{
						loading: loadingQuizzes && page === 1,
						hasMore,
						isLoadingMore: loadingQuizzes && page > 1,
						showAddButton: false,
						isResultsPage: false,
					}}
					onLoadMore={handleLoadMore}
					onCardClick={setSelectedQuiz}
					emptyMessage={
						isOwnProfile
							? "You haven't published any quizzes yet."
							: `${user.nickname} hasn't published any quizzes yet.`
					}
				/>
			</div>

			{selectedQuiz && (
				<ModalDescription
					quiz={selectedQuiz}
					onClose={() => setSelectedQuiz(null)}
					isOpen={!!selectedQuiz}
				/>
			)}
		</div>
	);
}
