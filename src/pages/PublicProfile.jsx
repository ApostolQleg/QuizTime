import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "@/features/profile/api/user.api.js";
import { getQuizzes } from "@/features/quizzes/api/quizzes.api.js";

import Container from "@/shared/ui/Container.jsx";
import Avatar from "@/shared/ui/Avatar.jsx";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ModalDescription from "@/features/quizzes/components/modals/ModalDescription.jsx";
import { API_CONFIG } from "@/shared/config/config.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";
import { useInfiniteList } from "@/shared/hooks/useInfiniteList.js";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_PUBLIC_PROFILE;

export default function PublicProfile() {
	const navigate = useNavigate();
	const { userId } = useParams();

	const [user, setUser] = useState(null);
	const [isLoadingProfile, setIsLoadingProfile] = useState(true);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	useEffect(() => {
		if (userId) {
			getUserProfile(userId)
				.then((data) => {
					setUser(data.user);
				})
				.catch(() => {
					navigate("/", { replace: true });
				})
				.finally(() => setIsLoadingProfile(false));
		} else {
			setIsLoadingProfile(false);
			navigate("/", { replace: true });
		}
	}, [userId, navigate]);

	const loadData = useCallback(async ({ pageToLoad, authorId }) => {
		if (!authorId) {
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

			const data = await getQuizzes(currentSkip, currentLimit, "", "newest", authorId);

			return {
				items: data.quizzes,
				hasMore: data.quizzes.length >= currentLimit,
			};
		} catch (err) {
			console.error("Failed to load quizzes", err);
			return {
				items: [],
				hasMore: false,
			};
		}
	}, []);

	const authorParams = useMemo(() => ({ authorId: userId }), [userId]);

	const {
		items,
		loading: loadingQuizzes,
		hasMore,
		isLoadingMore,
		handleLoadMore,
	} = useInfiniteList(loadData, [loadData, userId], authorParams);

	if (isLoadingProfile) return <Container className="text-center">Loading...</Container>;
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
					loading={loadingQuizzes}
					hasMore={hasMore}
					onLoadMore={handleLoadMore}
					isLoadingMore={isLoadingMore}
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
