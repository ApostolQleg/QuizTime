import { useParams, useNavigate } from "react-router";
import { getQuizById, saveResult, getResultById } from "../services/storage.js";
import { useState, useEffect } from "react";
import Question from "../components/Quiz/Question.jsx";
import Button from "../components/UI/Button.jsx";
import Container from "../components/UI/Container.jsx";

export default function Quiz() {
	const navigate = useNavigate();
	const { quizId, resultIdParam } = useParams();

	const [loading, setLoading] = useState(true);

	// Дані для відображення
	const [quizData, setQuizData] = useState(null); // Тут буде інфа про квіз (title, questions)
	const [resultData, setResultData] = useState(null); // Тут буде інфа про результат (якщо переглядаємо)

	const [answers, setAnswers] = useState([]);
	const [errors, setErrors] = useState({});

	// Якщо є другий параметр в URL - значить це сторінка результатів
	const isResultPage = Boolean(resultIdParam);

	useEffect(() => {
		const loadData = async () => {
			try {
				if (isResultPage) {
					// РЕЖИМ ПЕРЕГЛЯДУ РЕЗУЛЬТАТУ
					// Вантажимо результат по ID (resultIdParam)
					const res = await getResultById(resultIdParam);

					setResultData(res);
					// У нашому новому Result об'єкті вже є масив 'questions' (історія)
					// Тому нам не обов'язково вантажити окремо Quiz, ми можемо взяти питання з результату
					setQuizData({
						title: res.quizTitle,
						questions: res.questions, // Беремо "заморожені" питання з історії
					});
				} else {
					// РЕЖИМ ПРОХОДЖЕННЯ
					// Вантажимо свіжий квіз
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
	}, [quizId, resultIdParam, isResultPage, navigate]);

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

		// Валідація
		let allAnswered = true;
		const newErrors = {};

		quizData.questions.forEach((_, i) => {
			if (!answers[i] || answers[i].length === 0) {
				allAnswered = false;
				newErrors[i] = true;
			}
		});

		setErrors(newErrors);
		if (!allAnswered) return;

		// Підрахунок
		let score = 0;
		quizData.questions.forEach((question, qIndex) => {
			const correctIds = question.options.filter((o) => o.isCorrect).map((o) => o.id);
			const selectedIds = answers[qIndex] || [];

			if (
				correctIds.length === selectedIds.length &&
				correctIds.every((id) => selectedIds.includes(id))
			) {
				score++;
			}
		});

		const summary = {
			score,
			correct: score, // або інша логіка якщо треба
			total: quizData.questions.length,
		};

		const payload = {
			quizId: quizData.id || quizId, // ID квіза
			answers,
			summary,
			timestamp: Math.floor(Date.now() / 1000),
			// 'questions' додасть бекенд сам з бази, або ми можемо не передавати
			// (але в твоїй реалізації бекенду ти береш їх з БД, що супер!)
		};

		try {
			// Зберігаємо в БД
			const response = await saveResult(payload);

			// Переходимо на сторінку результату, використовуючи ID, який повернув бекенд (response.resultId)
			navigate(`/result/${quizId}/${response.resultId}`);
		} catch (error) {
			console.error("Save error", error);
			alert("Failed to save result");
		}
	};

	if (loading) {
		return <Container className="text-white text-center">Loading...</Container>;
	}

	if (!quizData) return null;

	return (
		<Container className={"flex flex-col items-center"}>
			<div className="text-white pb-5 text-[18px] text-center">{quizData.title}</div>

			{isResultPage && resultData && (
				<div className="text-white mb-5">
					Your Result is {resultData.summary.score} / {quizData.questions.length}
				</div>
			)}

			{quizData.questions.map((question, index) => (
				<Question
					question={question}
					key={index}
					className="w-[95%] m-0 mx-auto mb-5 bg-[rgb(146,6,146)] p-5 rounded-2xl shadow-[0_0_10px_rgba(114,0,104,0.692)]"
					isResultPage={isResultPage}
					onOptionSelect={(optionId) =>
						!isResultPage && handleRadioUpdate(index, optionId)
					}
					error={errors[index]}
					// Якщо сторінка результатів - беремо відповіді з завантаженого результату
					// Якщо проходження - беремо з локального стейту
					selected={isResultPage ? resultData.answers?.[index] : answers[index]}
				>
					{question.text}
				</Question>
			))}

			{!isResultPage ? (
				<Button onClick={handleSubmit}>Submit</Button>
			) : (
				<Button onClick={() => navigate("/")}>Back to Home</Button>
			)}
		</Container>
	);
}
