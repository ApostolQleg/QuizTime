import { useNavigate } from "react-router";

export default function Welcome() {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center items-center"> 
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
				<model-viewer
				    className="h-100 w-100"
					src="/3DModels/QuizTime_logo.glb"
					alt="A descriptive 3D model text for accessibility"
					auto-rotate
					camera-controls
				/>
		</div>
	);
}
