import { useState } from "react";
import Question from "../components/Create/Question.jsx";
import Input from "../components/UI/Input.jsx";
import Button from "../components/UI/Button.jsx";
import Textarea from "../components/UI/Textarea.jsx";
import Container from "../components/UI/Container.jsx";

export default function Create() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [questions, setQuestions] = useState([
		{
			id: 0,
			text: "",
			options: [
				{ id: 0, text: "Так" },
				{ id: 1, text: "Ні" },
			],
		},
	]);
	const [errors, setErrors] = useState({
		title: false,
		description: false,
		questions: [],
	});

	const handleQuestionAdd = () => {
		const newId = questions.length ? questions[questions.length - 1].id + 1 : 0;
		setQuestions([
			...questions,
			{
				id: newId,
				text: "",
				options: [
					{ id: 0, text: "Так" },
					{ id: 1, text: "Ні" },
				],
			},
		]);
	};

	const handleQuestionDelete = (id) => {
		setQuestions(questions.filter((question) => question.id !== id));
	};

	const handleQuestionUpdate = (id, newValue) => {
		setQuestions(
			questions.map((question) =>
				question.id === id ? { ...question, text: newValue } : question
			)
		);
	};

	const handleOptionAdd = (questionId) => {
		setQuestions(
			questions.map((q) => {
				if (q.id === questionId) {
					const newOptionId = q.options.length
						? q.options[q.options.length - 1].id + 1
						: 0;
					return { ...q, options: [...q.options, { id: newOptionId, text: "" }] };
				}
				return q;
			})
		);
	};

	const handleOptionDelete = (questionId, optionId) => {
		setQuestions(
			questions.map((q) => {
				if (q.id === questionId) {
					return { ...q, options: q.options.filter((o) => o.id !== optionId) };
				}
				return q;
			})
		);
	};

	const handleOptionUpdate = (questionId, optionId, newValue) => {
		setQuestions(
			questions.map((q) => {
				if (q.id === questionId) {
					const updatedOptions = q.options.map((o) =>
						o.id === optionId ? { ...o, text: newValue } : o
					);
					return { ...q, options: updatedOptions };
				}
				return q;
			})
		);
	};

	const handleSaveQuiz = () => {
		const newErrors = {
			title: title.trim() === "",
			description: description.trim() === "",
			questions: questions.map((question) => ({
				hasError: question.text.trim() === "",
				options: question.options.map((option) => ({
					hasError: option.text.trim() === "",
				})),
			})),
		};

		setErrors(newErrors);

		const hasErrors =
			newErrors.title ||
			newErrors.description ||
			newErrors.questions.some(
				(question) =>
					question.hasError || question.options.some((option) => option.hasError)
			);

		if (hasErrors) return console.log("Errors:", JSON.stringify(newErrors));

		console.log("Quiz saved");
	};

	return (
		<Container className={"flex flex-col gap-4 flex-1"}>
			<Input
				placeholder="Enter quiz title here..."
				className={`text-[20px] ${errors.title ? "input-error" : ""}`}
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Textarea
				placeholder="Enter quiz description here..."
				className={`h-10 resize-handle ${errors.description ? "input-error" : ""}`}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<Button onClick={handleQuestionAdd}>Add Question</Button>
			{questions.map((question) => (
				<Question
					id={question.id}
					key={question.id}
					hasError={errors.questions[question.id]}
					options={question.options}
					onDelete={() => handleQuestionDelete(question.id)}
					onChange={(e) => handleQuestionUpdate(question.id, e.target.value)}
					onOptionAdd={() => handleOptionAdd(question.id)}
					onOptionDelete={(optionId) => handleOptionDelete(question.id, optionId)}
					onOptionChange={(optionId, val) =>
						handleOptionUpdate(question.id, optionId, val)
					}
				/>
			))}
			<Button className="self-center mt-auto min-w-full" onClick={handleSaveQuiz}>
				Save Quiz
			</Button>
		</Container>
	);
}
