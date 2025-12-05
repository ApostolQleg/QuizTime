import Question from "../components/QuizUI/Question.jsx";
import { useParams, Link } from "react-router";
import { getStorage } from "../services/storage.js";
import { containerStyle } from "./Quizzes.jsx";

export default function Quiz() {
	const params = useParams();
	const quiz = getStorage().quizzes.find((quiz) => quiz.id === params.quizId);
	return (
		<>
			<div className={containerStyle}>
				{quiz.title}
				{quiz.questions.map((question, index) => (
					<Question question={question} key={index} className="question-block">
						{question.text}
					</Question>
				))}
				<Link to={"/result"} className="button">
					Submit
				</Link>
			</div>
		</>
	);
}
