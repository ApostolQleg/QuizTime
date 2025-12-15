import { getStorage } from "../services/storage.js";
import { useState } from "react";
import { Link } from "react-router";
import addIcon from "../assets/plus-icon.png";
import Description from "../components/Home/Description.jsx";
import Container from "../components/UI/Container.jsx";

export default function Home() {
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const isResultsPage = window.location.pathname === "/results";

	const quizzes = isResultsPage ? getStorage().results : getStorage().quizzes;

	return (
		<Container
			className={
				"grid gap-6 lg:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center"
			}
		>
			{isResultsPage ? null : (
				<Link to="/create" id={`quiz-add`} className="quiz-card">
					<img src={addIcon} alt="Add Quiz" className="w-1/2 h-1/2" />
				</Link>
			)}

			{quizzes.map((quiz) => (
				<button
					type="button"
					key={quiz.id}
					className="quiz-card"
					onClick={() => setSelectedQuiz(quiz)}
				>
					{" "}
					{quiz.title}
					<br />
					{`Questions: ${quiz.questions.length}`}
				</button>
			))}

			{selectedQuiz && (
				<Description quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
			)}
		</Container>
	);
}
