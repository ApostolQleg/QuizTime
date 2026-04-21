import { useParams, useNavigate } from "react-router-dom";
import {
	saveResult,
	getResultById,
	clearAllResultsCache,
} from "@/features/results/api/results.api.js";
import { getQuizById } from "@/features/quizzes/api/quizzes.api.js";
import { useEffect } from "react";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import Question from "@/features/quizzes/components/quiz/Question.jsx";
import {
	useQuizSessionActions,
	useQuizSessionViewState,
} from "@/features/quizzes/stores/quizSessionStore.js";
import Button from "@/shared/ui/Button.jsx";
import Container from "@/shared/ui/Container.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Quiz() {
	const navigate = useNavigate();
	const { quizId, resultIdParam } = useParams();
	const { user } = useAuthUserState();
	const { loading, quizData, resultData, answers, alertInfo } = useQuizSessionViewState();
	const {
		loadQuizForPlay,
		loadResultForView,
		setValidationErrors,
		setGuestResult,
		setAlertInfo,
		closeAlert,
		setLoading,
		resetSession,
	} = useQuizSessionActions();

	const { addToast } = useToastActions();

	const isResultView = Boolean(resultIdParam) || Boolean(resultData);

	useEffect(() => {
		resetSession();
		setLoading(true);

		const loadData = async () => {
			try {
				if (resultIdParam) {
					const data = await getResultById(resultIdParam);
					loadResultForView(data.result);
				} else {
					const data = await getQuizById(quizId);
					loadQuizForPlay(data.quiz);
				}
			} catch (error) {
				console.error("Failed to load data", error);
				navigate("/not-found");
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [
		quizId,
		resultIdParam,
		navigate,
		loadQuizForPlay,
		loadResultForView,
		resetSession,
		setLoading,
	]);

	const handleSubmit = async () => {
		if (!quizData) return;

		let allAnswered = true;
		const newErrors = {};

		for (let i = 0; i < quizData.questions.length; i++) {
			if (!answers[i] || answers[i].length === 0) {
				allAnswered = false;
				newErrors[i] = true;
			}
		}

		setValidationErrors(newErrors);
		if (!allAnswered) return;

		let score = 0;

		for (const [qIndex, question] of quizData.questions.entries()) {
			const correctIds = question.options.filter((o) => o.isCorrect).map((o) => o.id);
			const selectedIds = answers[qIndex] || [];

			if (
				correctIds.length === selectedIds.length &&
				correctIds.every((id) => selectedIds.includes(id))
			) {
				score++;
			}
		}

		const summary = {
			score,
			correct: score,
			total: quizData.questions.length,
		};

		const payload = {
			quizId: quizData.id || quizId,
			answers,
			summary,
			createdAt: Date.now(),
		};

		if (user) {
			try {
				const response = await saveResult(payload);
				clearAllResultsCache();
				navigate(`/result/${quizId}/${response.result._id}`);
				addToast("Result saved.");
			} catch (error) {
				console.error("Save error", error);
				setAlertInfo({ isOpen: true, message: "Failed to save result" });
			}
		} else {
			const localResult = {
				...payload,
				quizTitle: quizData.title,
				questions: quizData.questions,
			};
			setGuestResult(localResult);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	if (loading) {
		return <Container className="text-center text-(--col-text-main)">Loading...</Container>;
	}

	if (!quizData) return null;

	return (
		<Container className={"flex flex-col items-center gap-6"}>
			<div className="text-3xl font-bold text-center drop-shadow-md pb-2 border-b w-full text-(--col-text-accent) border-(--col-border)">
				{quizData.title}
			</div>
			{isResultView && resultData && (
				<div className="flex flex-col items-center gap-2">
					<div className="text-xl font-semibold px-6 py-2 rounded-full border text-(--col-success) bg-(--col-success-glow) border-(--col-success)">
						Result: {resultData.summary?.score} / {quizData.questions.length}
					</div>
					{!user && !resultIdParam && (
						<div className="text-xs text-yellow-500 opacity-80">
							(Guest Mode: Result not saved to history)
						</div>
					)}
				</div>
			)}

			<div className="w-full flex flex-col gap-6">
				{quizData.questions.map((question, index) => (
					<Question key={question.id} questionId={question.id} index={index} />
				))}
			</div>

			{!isResultView ? (
				<Button
					onClick={handleSubmit}
					className="w-full md:w-auto min-w-50 text-lg shadow-xl"
				>
					Submit
				</Button>
			) : (
				<Button
					onClick={() => navigate(resultIdParam ? "/results" : "/")}
					className="w-full md:w-auto"
				>
					{resultIdParam ? "Back to Results" : "Back to Home"}
				</Button>
			)}

			<ModalConfirm
				isOpen={alertInfo.isOpen}
				onClose={closeAlert}
				title="Ooops!"
				message={alertInfo.message}
				isAlert={true}
				isDanger={true}
			/>
		</Container>
	);
}
