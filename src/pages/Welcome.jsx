import { useNavigate } from "react-router";

export default function Welcome() {
	const navigate = useNavigate();

	return (
		<div>
			<p>What time is it? It's QuizTime!</p>
			<button
				type="button"
				onClick={() => {
					navigate("/quizzes");
				}}
			>
				Start
			</button>
		</div>
	);
}
