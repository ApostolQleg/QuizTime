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
	const [result, setResult] = useState({});
	const [errors, setErrors] = useState({});

	const handleRadioUpdate = (qIndex, oIndex) => {
		const newAnswers = [...answers];
		newAnswers[qIndex] = [oIndex];
		setAnswers(newAnswers);
	}

	if (isResultPage && Object.keys(result).length === 0) {
		const result = getStorage().results.find((result) =>
			result.timestamp.toString() === params.timestamp
		);
		setResult(result);
	}

	const handleSubmit = () => {
		let allQuestionsAnswered = true;
		let summary = 0;

		quiz.questions.forEach((question, qIndex) => {
			const correctOptionIds = question.options
				.filter((option) => option.isCorrect)
				.map((option) => option.id);

			const selectedOptionIds = answers[qIndex] || [];
			if (answers[qIndex] === undefined) {
				allQuestionsAnswered = false;
			}

			if (
				correctOptionIds.length === selectedOptionIds.length &&
				correctOptionIds.every((id) => selectedOptionIds.includes(id))
			) {
				summary++;
			}
		});

		const newErrors = quiz.questions.reduce((acc, question, qIndex) => {
			if (answers[qIndex] === undefined) {
				acc[qIndex] = true;
			} else {
				acc[qIndex] = false;
			}
			return acc;
		}, {});

		setErrors(newErrors);

		if (allQuestionsAnswered) {
			const timestamp = Math.floor((new Date() - new Date('2025-01-01T00:00:00Z')) / 1000);
			const resultData = {
				timestamp: timestamp,
				title: quiz.title,
				id: quiz.id,
				summary: summary,
				answers: answers,
				questions: quiz.questions,
			};
			setResult(resultData);
			setStorage(resultData, "results");
			navigate(`/result/${params.quizId}/${timestamp}`);
		} else {
			console.log("Please answer all questions before submitting.");
		}
	};

	if (!quiz) {
		return navigate("/not-found");
	}

	return (
		<>
			<Container className={"flex flex-col items-center"}>
				<div className="text-white pb-5 text-[18px] text-center">{quiz.title}</div>
				{isResultPage && <div className="text-white mb-5">Your Result is {result.summary} / {quiz.questions.length}</div>}
				{quiz.questions.map((question, index) => (
					<Question
						question={question}
						key={index}
						className="w-[95%] m-0 mx-auto mb-5 bg-[rgb(146,6,146)] p-5 rounded-2xl shadow-[0_0_10px_rgba(114,0,104,0.692)]"
						isResultPage={isResultPage}
						onOptionSelect={(optionId) => handleRadioUpdate(index, optionId)}
						error = {errors[index]}
						selected={isResultPage ? result?.answers?.[index] : answers[index]}
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
