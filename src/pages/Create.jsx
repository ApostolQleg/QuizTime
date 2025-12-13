import { containerStyle } from "./Quizzes";
import Question from "../components/CreateUI/Question";
import Input from "../components/CreateUI/Input.jsx";
import Button from "../components/UI/Button.jsx";
import Textarea from "../components/CreateUI/Textarea.jsx";
import { useState } from "react";

export default function Create() {
	const [questions, setQuestions] = useState([{ id: 0 }]);

	const handleAddQuestions = () => {
		const newId = questions.length ? questions[questions.length - 1].id + 1 : 0;
		setQuestions([...questions, { id: newId }]);
	};

	const handleDeleteQuestion = (id) => {
		setQuestions(questions.filter((question) => question.id !== id));
	};

	return (
		<div className={containerStyle + " flex flex-col gap-4"}>
			<Input placeholder="Enter quiz title here..." className="text-[20px]" />
			<Textarea placeholder="Enter quiz description here..." className="h-10 resize-handle" />
			<Button onClick={handleAddQuestions}>Add Question</Button>
			{questions.map((question) => (
				<Question
					id={question.id}
					key={question.id}
					onDelete={() => handleDeleteQuestion(question.id)}
				/>
			))}
		</div>
	);
}
