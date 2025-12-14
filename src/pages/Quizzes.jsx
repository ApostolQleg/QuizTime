import { getStorage } from "../services/storage";
import { useState } from "react";
import { Link } from "react-router";
import addIcon from "../assets/plus-icon.png";
import Description from "../components/Quizzes/Description.jsx";
import Container from "../components/UI/Container.jsx";

const quizButtonStyle =
	"bg-[rgb(233,14,178)] rounded-3xl max-h-[400px] max-w-[400px] aspect-square w-full text-1/2 flex items-center justify-center text-center hover:scale-105 transition-all shadow-[0_0_10px_rgba(114,0,104,0.692)]";

export default function Quizzes() {
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const quizzes = getStorage().quizzes;

	return (
		<Container
			className={
				"grid gap-[2vw] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
			}
		>
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
		</Container>
	);
}
