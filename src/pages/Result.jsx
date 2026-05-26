import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Question from "@/features/quiz/components/quiz/Question.jsx";
import {
	useQuizSessionActions,
	useQuizSessionViewState,
} from "@/features/quiz/stores/quizSessionStore.js";
import { getResultById } from "@/features/result/api/results.api.js";
import Button from "@/shared/ui/Button.jsx";
import Container from "@/shared/ui/Container.jsx";

export default function Result() {
	const navigate = useNavigate();
	const { quizId, resultIdParam } = useParams();
	const { loading, quizData, resultData } = useQuizSessionViewState();
	const { loadResultForView, setLoading, resetSession } = useQuizSessionActions();

	const isGuestMode = resultIdParam === "guest";
	const hasRealResult = resultIdParam && !isGuestMode;

	useEffect(() => {
		if (hasRealResult) {
			resetSession();
			setLoading(true);

			const loadData = async () => {
				try {
					const data = await getResultById(resultIdParam);
					loadResultForView(data.result);
				} catch (error) {
					console.error("Failed to load result data", error);
					navigate("/not-found");
				}

				setLoading(false);
			};

			loadData();
		}
	}, [resultIdParam, hasRealResult, navigate, loadResultForView, resetSession, setLoading]);

	useEffect(() => {
		if (isGuestMode) {
			if (!quizData || !resultData) {
				setLoading(false);
				navigate(`/quiz/${quizId}`);
			} else {
				setLoading(false);
			}
		}
	}, [isGuestMode, quizData, resultData, quizId, navigate, setLoading]);

	if (loading) {
		return <Container className="text-center text-(--col-text-main)">Loading...</Container>;
	}

	if (!quizData || !resultData) return null;

	return (
		<Container className="flex flex-col items-center gap-6">
			<div className="text-3xl font-bold text-center drop-shadow-md pb-2 border-b w-full text-(--col-text-accent) border-(--col-border)">
				{quizData.title}
			</div>

			<div className="flex flex-col items-center gap-2">
				<div className="text-xl font-semibold px-6 py-2 rounded-full border text-(--col-success) bg-(--col-success-glow) border-(--col-success)">
					Result: {resultData.summary?.score} / {quizData.questions.length}
				</div>

				{isGuestMode && (
					<div className="text-xs text-yellow-500 opacity-80">
						(Guest Mode: Result not saved to history)
					</div>
				)}
			</div>

			<div className="w-full flex flex-col gap-6">
				{quizData.questions.map((question, index) => (
					<Question key={question.id} questionId={question.id} index={index} />
				))}
			</div>

			<Button
				onClick={() => navigate(hasRealResult ? "/results" : "/")}
				className="w-full md:w-auto"
			>
				{hasRealResult ? "Back to Results" : "Back to Home"}
			</Button>
		</Container>
	);
}
