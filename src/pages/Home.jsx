import { getStorage } from "../services/storage.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import addIcon from "../assets/plus-icon.png";
import Description from "../components/Home/Description.jsx";
import Container from "../components/UI/Container.jsx";

export default function Home() {
	const navigate = useNavigate();

	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const isResultsPage = window.location.pathname === "/results";
	const isHelpPage = window.location.pathname === "/help";

	const quizzes = isResultsPage ? getStorage().results : getStorage().quizzes;

	if (isHelpPage) {
		return (
			<Container>
				<div className="text-center text-white col-span-full">
					Here is an information section for new users.
				</div>
			</Container>
		);
	}

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

			{quizzes.map((quiz, qIndex) => (
				<button
					type="button"
					key={qIndex}
					className="quiz-card"
					onClick={
						isResultsPage
							? () => navigate(`/result/${quiz.id}`)
							: () => setSelectedQuiz(quiz)
					}
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

			{isResultsPage && quizzes.length === 0 && (
				<div className="text-center text-white col-span-full">
					You have no quiz results yet. Take some quizzes first!
				</div>
			)}
		</Container>
	);
}
