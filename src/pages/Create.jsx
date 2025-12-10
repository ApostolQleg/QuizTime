import { containerStyle } from "./Quizzes";
import { useNavigate } from "react-router";
import { setStorage } from "../services/storage.js";
import Question from "../components/CreateUI/Question";
import Input from "../components/CreateUI/Input.jsx";
import Textarea from "../components/CreateUI/Textarea.jsx";

export default function Create() {
	const navigate = useNavigate();
	return (
		<>
			<div className={containerStyle}>
				<Input
					placeholder="Enter quiz title here..."
					className="w-full border border-gray-300 rounded text-white p-2 mb-4 text-[20px]"	
				/>
				<Textarea
					placeholder="Enter quiz description here..."
					className="w-full border border-gray-300 rounded text-white p-2 mb-4 h-10 resize-handle	"
				/>
				<Question></Question>
			</div>
		</>
	);
}
