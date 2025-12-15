import { useNavigate, useParams } from "react-router";
import { getStorage, setStorage } from "../services/storage.js";
import { useState } from "react";
import Question from "../components/Edit/Question.jsx";
import Input from "../components/UI/Input.jsx";
import Button from "../components/UI/Button.jsx";
import Textarea from "../components/UI/Textarea.jsx";
import Container from "../components/UI/Container.jsx";

export default function Edit() {
	const navigate = useNavigate();
	const params = useParams();
	const isManagePage = window.location.pathname.startsWith("/manage");
	const quiz = getStorage().quizzes.find((quiz) => quiz.id.toString() === params.quizId);

	const [title, setTitle] = useState(quiz ? quiz.title : "");
	const [description, setDescription] = useState(quiz ? quiz.description : "");
	const [questions, setQuestions] = useState(
		quiz
			? quiz.questions
			: [
					{
						id: 0,
						text: "",
						options: [
							{ id: 0, text: "Так", isCorrect: false },
							{ id: 1, text: "Ні", isCorrect: false },
						],
					},
			  ]
	);
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
					{ id: 0, text: "Так", isCorrect: false },
					{ id: 1, text: "Ні", isCorrect: false },
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
			questions.map((question) => {
				if (question.id === questionId) {
					const newOptionId = question.options.length
						? question.options[question.options.length - 1].id + 1
						: 0;
					return {
						...question,
						options: [
							...question.options,
							{ id: newOptionId, text: "", isCorrect: false },
						],
					};
				}
				return question;
			})
		);
	};

	const handleOptionDelete = (questionId, optionId) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === questionId) {
					return {
						...question,
						options: question.options.filter((option) => option.id !== optionId),
					};
				}
				return question;
			})
		);
	};

	const handleOptionUpdate = (questionId, optionId, newValue) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === questionId) {
					const updatedOptions = question.options.map((option) =>
						option.id === optionId ? { ...option, text: newValue } : option
					);
					return { ...question, options: updatedOptions };
				}
				return question;
			})
		);
	};

	const handleCorrectOption = (questionId, optionId) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === questionId) {
					const updatedOptions = question.options.map((option) => ({
						...option,
						isCorrect: option.id === optionId,
					}));
					return { ...question, options: updatedOptions };
				}
				return question;
			})
		);
	};

	const handleSaveQuiz = () => {
		const newErrors = {
			title: title.trim() === "",
			description: description.trim() === "",
			questions: questions.reduce((acc, question) => {
				acc[question.id] = {
					hasError: question.text.trim() === "",
					options: question.options.reduce((optionAcc, option) => {
						optionAcc[option.id] = { hasError: option.text.trim() === "" };
						return optionAcc;
					}, {}),
				};
				return acc;
			}, {}),
		};

		setErrors(newErrors);

		const hasErrors =
			newErrors.title ||
			newErrors.description ||
			Object.values(newErrors.questions).some(
				(question) =>
					question.hasError ||
					Object.values(question.options).some((option) => option.hasError)
			);

		if (hasErrors) return;

		const quiz = { title, description, id: Date.now().toString(), questions };
		setStorage(quiz, "quizzes");

		navigate("/");
	};

	if (isManagePage && !quiz) {
		return navigate("/not-found");
	}

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
					text={question.text}
					errors={errors.questions?.[question.id] || {}}
					options={question.options}
					onDelete={() => handleQuestionDelete(question.id)}
					onChange={(e) => handleQuestionUpdate(question.id, e.target.value)}
					onCorrect={(optionId) => handleCorrectOption(question.id, optionId)}
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
