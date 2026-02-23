import { useParams, useNavigate } from "react-router";
import { saveResult, getResultById } from "../services/results.js";
import { getQuizById } from "../services/quizzes.js";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Question from "../components/Quiz/Question.jsx";
import Button from "../components/UI/Button.jsx";
import Container from "../components/UI/Container.jsx";
import ModalConfirm from "../components/UI/ModalConfirm.jsx";

export default function Quiz() {
	const navigate = useNavigate();
	const { quizId, resultIdParam } = useParams();
	const { user } = useAuth();

	const [loading, setLoading] = useState(true);
	const [quizData, setQuizData] = useState(null);
	const [resultData, setResultData] = useState(null);

	const [alertInfo, setAlertInfo] = useState({ isOpen: false, message: "" });

	const [answers, setAnswers] = useState([]);
	const [errors, setErrors] = useState({});

	const isResultView = Boolean(resultIdParam) || Boolean(resultData);

	useEffect(() => {
		if (resultIdParam && resultData && resultData._id === resultIdParam) {
			return;
		}

		if (!resultIdParam && resultData && resultData.quizId === quizId) {
			return;
		}

		setLoading(true);
		setQuizData(null);

		if (!resultData || resultData.quizId !== quizId) {
			setResultData(null);
		}

		setAnswers([]);
		setErrors({});

		const loadData = async () => {
			try {
				if (resultIdParam) {
					const res = await getResultById(resultIdParam);
					setResultData(res);
					setQuizData({
						title: res.quizTitle,
						questions: res.questions,
					});
				} else {
					const quiz = await getQuizById(quizId);
					setQuizData(quiz);
				}
			} catch (error) {
				console.error("Failed to load data", error);
				navigate("/not-found");
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [quizId, resultIdParam, navigate, resultData]);

	const handleRadioUpdate = (qIndex, oIndex) => {
		const newAnswers = [...answers];
		newAnswers[qIndex] = [oIndex];
		setAnswers(newAnswers);
		if (errors[qIndex]) {
			setErrors((prev) => ({ ...prev, [qIndex]: false }));
		}
	};

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

		setErrors(newErrors);
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
			timestamp: Date.now(),
		};

		if (user) {
			try {
				const response = await saveResult(payload);
				navigate(`/result/${quizId}/${response.resultId}`);
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
			setResultData(localResult);
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
					<Question
						question={question}
						key={index}
						className="p-6 rounded-xl border shadow-lg transition-all bg-(--col-bg-input) border-(--col-border) hover:border-(--col-border)"
						isResultPage={isResultView}
						onOptionSelect={(optionId) =>
							!isResultView && handleRadioUpdate(index, optionId)
						}
						error={errors[index]}
						selected={isResultView ? resultData?.answers?.[index] : answers[index]}
					>
						{question.text}
					</Question>
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
				<Button onClick={() => navigate("/")} className="w-full md:w-auto">
					Back to Home
				</Button>
			)}

			<ModalConfirm
				isOpen={alertInfo.isOpen}
				onClose={() => setAlertInfo({ ...alertInfo, isOpen: false })}
				title="Ooops!"
				message={alertInfo.message}
				isAlert={true}
				isDanger={true}
			/>
		</Container>
	);
}
