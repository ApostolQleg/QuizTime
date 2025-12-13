import Question from "../components/QuizUI/Question.jsx";
import Button from "../components/UI/Button.jsx";
import { useParams, useNavigate } from "react-router";
import { getStorage, setStorage } from "../services/storage.js";
import { containerStyle } from "./Quizzes.jsx";

export default function Quiz() {
	const params = useParams();
	const navigate = useNavigate();
	const quiz = getStorage().quizzes.find((quiz) => quiz.id === params.quizId);
	return (
		<>
			<div className={containerStyle + " flex flex-col items-center"}>
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
				<Button
					onClick={() => {
						let allQuestionsAnswered = true;
						// gather answers
						const answers = [];
						let summary = 0;
						quiz.questions.forEach((question, qIndex) => {
							question.options.forEach((option, oIndex) => {
								const optionInput = document.querySelector(
									`input[name="${qIndex}"][value="${oIndex}"]`
								);

								if (optionInput.checked) {
									answers[qIndex] = answers[qIndex] || [];
									answers[qIndex].push(oIndex);
								}
							});

							// calculate summary
							const correctOptionIds = question.options
								.filter((option) => option.isCorrect)
								.map((option) => option.id);

							const selectedOptionIds = answers[qIndex] || [];

							if (answers[qIndex] === undefined) {
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

						// create result object
						const result = {
							timestamp: new Date().toISOString(),
							title: quiz.title,
							summary: summary,
							answers: answers,
							questions: quiz.questions,
						};

						// store result
						setStorage(result, "results");

						if (allQuestionsAnswered) {
							navigate("/result");
						}
					}}
				>
					Submit
				</Button>
			</div>
		</>
	);
}
