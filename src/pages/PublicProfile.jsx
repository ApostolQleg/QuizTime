import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "@/features/profile/api/user.api.js";
import { getQuizzes } from "@/features/quizzes/api/quizzes.api.js";

import Container from "@/shared/ui/Container.jsx";
import Avatar from "@/shared/ui/Avatar.jsx";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ModalDescription from "@/features/quizzes/components/modals/ModalDescription.jsx";
import { API_CONFIG } from "@/shared/config/config.js";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_PUBLIC_PROFILE;

export default function PublicProfile() {
	const navigate = useNavigate();
	const { userId } = useParams();

	const [user, setUser] = useState(null);
	const [isLoadingProfile, setIsLoadingProfile] = useState(true);

	const [items, setItems] = useState([]);
	const [loadingQuizzes, setLoadingQuizzes] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
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
			// If userId is missing, stop loading and redirect to a safe route
			setIsLoadingProfile(false);
			navigate("/", { replace: true });
		}
	}, [userId, navigate]);

	const loadData = useCallback(async (pageToLoad, isInitialLoad = false, authorId) => {
		if (!authorId) return;

		try {
			if (!isInitialLoad) setIsLoadingMore(true);

			const currentLimit = ITEMS_PER_PAGE;
			const currentSkip = (pageToLoad - 1) * ITEMS_PER_PAGE;

			const data = await getQuizzes(currentSkip, currentLimit, "", "newest", authorId);

			if (data.length < currentLimit) {
				setHasMore(false);
			}

			setItems((prev) => (isInitialLoad ? data : [...prev, ...data]));
		} catch (err) {
			console.error("Failed to load quizzes", err);
		} finally {
			setLoadingQuizzes(false);
			setIsLoadingMore(false);
		}
	}, []);

	useEffect(() => {
		if (!user) return;

		setItems([]);
		setPage(1);
		setHasMore(true);
		setLoadingQuizzes(true);
		loadData(1, true, userId);
	}, [user, loadData, userId]);

	const handleLoadMore = () => {
		if (!user) return;
		const nextPage = page + 1;
		setPage(nextPage);
		loadData(nextPage, false, userId);
	};

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
