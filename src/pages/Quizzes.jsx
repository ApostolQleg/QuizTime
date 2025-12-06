import { getStorage } from "../services/storage";
import { useState } from "react";
import addIcon from "../assets/plus-icon.png";
import { Link } from "react-router";
import Description from "../components/QuizzesUI/Description";

const quizButtonStyle =
	"bg-[rgb(233,14,178)] rounded-3xl max-h-[400px] max-w-[400px] aspect-square w-full text-1/2 flex items-center justify-center text-center hover:scale-105 transition-all shadow-[0_0_10px_rgba(114,0,104,0.692)]";

export const containerStyle =
	"w-[95%] m-0 mx-auto mb-5 bg-[rgb(34,14,34)] p-5 rounded-2xl shadow-[0_0_10px_rgba(114,0,104,0.692)]";

export default function Quizzes() {
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const quizzes = getStorage().quizzes;

	return (
		<div className={containerStyle + " grid gap-[2vw] grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"}>
			<Link to="/create" id={`quiz-add`} className={quizButtonStyle}>
				<img src={addIcon} alt="Add Quiz" className="w-1/2 h-1/2" />
			</Link>

			{quizzes.map((quiz) => (
				<button
					type="button"
					key={quiz.id}
					className={quizButtonStyle}
					onClick={() => setSelectedQuiz(quiz)}
				>
					{" "}
					{quiz.title}
					<br />
					{`Questions: ${quiz.questions.length}`}{" "}
				</button>
			))}

			{selectedQuiz && (
				<Description quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
			)}
		</div>
	);
}
