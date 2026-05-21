import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import { getQuizById } from "@/features/quizzes/api/quizzes.api.js";
import Question from "@/features/quizzes/components/quiz/Question.jsx";
import {
	useQuizSessionActions,
	useQuizSessionViewState,
} from "@/features/quizzes/stores/quizSessionStore.js";
import { saveResult } from "@/features/results/api/results.api.js";
import Button from "@/shared/ui/Button.jsx";
import Container from "@/shared/ui/Container.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Quiz() {
	const navigate = useNavigate();
	const { quizId } = useParams();
	const { user } = useAuthUserState();
	const { loading, quizData, answers, alertInfo } = useQuizSessionViewState();
	const {
		loadQuizForPlay,
		setValidationErrors,
		setGuestResult,
		setAlertInfo,
		closeAlert,
		setLoading,
		resetSession,
	} = useQuizSessionActions();

	const { addToast } = useToastActions();
	const currentQuizId = quizData?._id ?? quizId;

	useEffect(() => {
		resetSession();
		setLoading(true);

		const loadData = async () => {
			try {
				const data = await getQuizById(quizId);
				loadQuizForPlay(data.quiz);
			} catch (error) {
				console.error("Failed to load quiz", error);
				navigate("/not-found");
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [quizId, navigate, loadQuizForPlay, resetSession, setLoading]);

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
			quizId: currentQuizId,
			answers,
			summary,
		};

		if (user) {
			try {
				const response = await saveResult(payload);
				navigate(`/result/${currentQuizId}/${response.result._id}`);
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
			navigate(`/result/${currentQuizId}/guest`);
		}
	};

	if (loading) {
		return <Container className="text-center text-(--col-text-main)">Loading...</Container>;
	}

	if (!quizData) return null;

	return (
		<Container className="flex flex-col items-center gap-6">
			<div className="text-3xl font-bold text-center drop-shadow-md pb-2 border-b w-full text-(--col-text-accent) border-(--col-border)">
				{quizData.title}
			</div>

			<div className="w-full flex flex-col gap-6">
				{quizData.questions.map((question, index) => (
					<Question key={question.id} questionId={question.id} index={index} />
				))}
			</div>

			<Button onClick={handleSubmit} className="w-full md:w-auto min-w-50 text-lg shadow-xl">
				Submit
			</Button>

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
