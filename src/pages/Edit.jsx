import { useNavigate, useParams, useLocation } from "react-router";
import { createQuiz, getQuizById, updateQuiz } from "../services/storage.js"; // Оновлені імпорти
import { useState, useEffect } from "react";
import Question from "../components/Edit/Question.jsx";
import Input from "../components/UI/Input.jsx";
import Button from "../components/UI/Button.jsx";
import Textarea from "../components/UI/Textarea.jsx";
import Container from "../components/UI/Container.jsx";

const DEFAULT_QUESTION = {
	id: 0,
	text: "",
	options: [
		{ id: 0, text: "Так", isCorrect: false },
		{ id: 1, text: "Ні", isCorrect: false },
	],
};

export default function Edit() {
	const navigate = useNavigate();
	const { quizId } = useParams();
	const location = useLocation();

	const isManagePage = location.pathname.startsWith("/manage");

	const [loading, setLoading] = useState(isManagePage); // Якщо створюємо новий - loading false одразу

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [questions, setQuestions] = useState([DEFAULT_QUESTION]);
	const [counter, setCounter] = useState(0);

	const [errors, setErrors] = useState({
		title: false,
		description: false,
		questions: {},
	});

	// Завантаження даних, якщо ми редагуємо існуючий квіз
	useEffect(() => {
		if (isManagePage && quizId) {
			getQuizById(quizId)
				.then((foundQuiz) => {
					setTitle(foundQuiz.title);
					setDescription(foundQuiz.description);
					setQuestions(foundQuiz.questions);
					setCounter(foundQuiz.title.length);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					navigate("/not-found");
				});
		}
	}, [isManagePage, quizId, navigate]);

	const handleQuestionAdd = () => {
		const newId = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 0;
		setQuestions([...questions, { ...DEFAULT_QUESTION, id: newId }]);
	};

	const handleQuestionDelete = (id) => {
		setQuestions(questions.filter((question) => question.id !== id));
	};

	const handleQuestionUpdate = (id, newValue) => {
		setQuestions(questions.map((q) => (q.id === id ? { ...q, text: newValue } : q)));
	};

	const handleOptionAdd = (questionId) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === questionId) {
					const newOptionId =
						question.options.length > 0
							? Math.max(...question.options.map((o) => o.id)) + 1
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
			}),
		);
	};

	const handleOptionDelete = (questionId, optionId) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === questionId) {
					return {
						...question,
						options: question.options.filter((o) => o.id !== optionId),
					};
				}
				return question;
			}),
		);
	};

	const handleOptionUpdate = (questionId, optionId, newValue) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === questionId) {
					return {
						...question,
						options: question.options.map((o) =>
							o.id === optionId ? { ...o, text: newValue } : o,
						),
					};
				}
				return question;
			}),
		);
	};

	const handleCorrectOption = (questionId, optionId) => {
		setQuestions(
			questions.map((question) => {
				if (question.id === questionId) {
					return {
						...question,
						options: question.options.map((o) => ({
							...o,
							isCorrect: o.id === optionId,
						})),
					};
				}
				return question;
			}),
		);
	};

	const handleSaveQuiz = async () => {
		// Validation logic
		const newErrors = {
			title: title.trim() === "",
			description: description.trim() === "",
			questions: {},
		};

		let hasError = newErrors.title || newErrors.description;

		questions.forEach((question) => {
			const optionsErrors = {};
			let optionHasError = false;

			question.options.forEach((option) => {
				if (option.text.trim() === "") {
					optionsErrors[option.id] = { hasError: true };
					optionHasError = true;
				}
			});

			const hasCorrectOption = question.options.some((o) => o.isCorrect);
			const questionTextEmpty = question.text.trim() === "";

			if (questionTextEmpty || !hasCorrectOption || optionHasError) {
				hasError = true;
				newErrors.questions[question.id] = {
					hasError: questionTextEmpty,
					hasRadioError: !hasCorrectOption,
					options: optionsErrors,
				};
			}
		});

		setErrors(newErrors);
		if (hasError) return;

		// Save logic (API CALLS)
		try {
			const quizPayload = {
				title,
				description,
				questions,
				...(isManagePage ? {} : { id: Date.now().toString() }),
			};

			if (isManagePage) {
				await updateQuiz(quizId, quizPayload);
			} else {
				await createQuiz(quizPayload);
			}

			navigate("/");
		} catch (error) {
			console.error("Failed to save quiz", error);
			alert("Error saving quiz. Please try again.");
		}
	};

	if (loading) {
		return <Container className="text-white text-center">Loading...</Container>;
	}

	return (
		<Container className={"flex flex-col gap-4 flex-1"}>
			<div className="w-full flex flex-row gap-2 justify-between items-center">
				<Input
					placeholder="Enter quiz title here..."
					className={`text-[20px] w-3/4 ${errors.title ? "error" : ""}`}
					value={title}
					onChange={(e) => {
						const newValue = e.target.value.slice(0, 30);
						setTitle(newValue);
						setCounter(newValue.length);
					}}
					maxLength="30"
				/>

				<div className="text-white text-[20px]">{counter}/30</div>
				<Button
					onClick={() => {
						setTitle("");
						setCounter(0);
					}}
				>
					Clear
				</Button>
			</div>

			<Textarea
				placeholder="Enter quiz description here..."
				className={`h-10 resize-handle w-full ${errors.description ? "error" : ""}`}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

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

			<Button onClick={handleQuestionAdd}>Add Question</Button>

			<Button className="self-center mt-auto min-w-full" onClick={handleSaveQuiz}>
				Save Quiz
			</Button>
		</Container>
	);
}
