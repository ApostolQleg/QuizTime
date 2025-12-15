import { useParams, useNavigate } from "react-router";
import { getStorage, setStorage } from "../services/storage.js";
import { useState } from "react";
import Question from "../components/Quiz/Question.jsx";
import Button from "../components/UI/Button.jsx";
import Container from "../components/UI/Container.jsx";

export default function Quiz() {
	const navigate = useNavigate();
	const params = useParams();
	const quiz = getStorage().quizzes.find((quiz) => quiz.id.toString() === params.quizId);
	const isResultPage = window.location.pathname.startsWith("/result");
	const [answers, setAnswers] = useState([]);

	const handleSubmit = () => {
		let allQuestionsAnswered = true;
		let summary = 0;
		const newAnswers = [...answers];

		quiz.questions.forEach((question, qIndex) => {
			question.options.forEach((_, oIndex) => {
				const optionInput = document.querySelector(
					`input[name="${qIndex}"][value="${oIndex}"]`
				);

				if (optionInput.checked) {
					newAnswers[qIndex] = newAnswers[qIndex] || [];
					newAnswers[qIndex].push(oIndex);
				}
			});

			const correctOptionIds = question.options
				.filter((option) => option.isCorrect)
				.map((option) => option.id);

			const selectedOptionIds = newAnswers[qIndex] || [];

			if (newAnswers[qIndex] === undefined) {
				console.log("Question not answered:", qIndex);
				allQuestionsAnswered = false;
			}

			if (
				correctOptionIds.length === selectedOptionIds.length &&
				correctOptionIds.every((id) => selectedOptionIds.includes(id))
			) {
				summary++;
			}
		});

		setAnswers(newAnswers);

		const result = {
			timestamp: new Date().toISOString(),
			title: quiz.title,
			id: quiz.id,
			summary: summary,
			answers: newAnswers,
			questions: quiz.questions,
		};

		setStorage(result, "results");

		if (allQuestionsAnswered) {
			navigate(`/result/${params.quizId}`);
		}
	};

	if (!quiz) {
		return navigate("/not-found");
	}

	return (
		<>
			<Container className={"flex flex-col items-center"}>
				<div className="text-white pb-5 text-[18px] text-center">{quiz.title}</div>
				{quiz.questions.map((question, index) => (
					<Question
						question={question}
						key={index}
						className="w-[95%] m-0 mx-auto mb-5 bg-[rgb(146,6,146)] p-5 rounded-2xl shadow-[0_0_10px_rgba(114,0,104,0.692)]"
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
		</>
	);
}
