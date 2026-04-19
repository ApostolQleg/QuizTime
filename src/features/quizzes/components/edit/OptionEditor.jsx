import Input from "@/shared/ui/Input.jsx";
import Radio from "@/shared/ui/Radio.jsx";
import Button from "@/shared/ui/Button.jsx";
import { useQuizEditorStore } from "@/features/quizzes/stores/quizEditorStore.js";

const EMPTY_ERRORS = {};

export default function Option({ questionId, optionId }) {
	const option = useQuizEditorStore((state) => {
		const question = state.questions.find((item) => item.id === questionId);
		return question?.options.find((item) => item.id === optionId);
	});
	const errors = useQuizEditorStore(
		(state) => state.errors.questions?.[questionId]?.options?.[optionId] || EMPTY_ERRORS,
	);
	const deleteOption = useQuizEditorStore((state) => state.deleteOption);
	const updateOptionText = useQuizEditorStore((state) => state.updateOptionText);
	const setCorrectOption = useQuizEditorStore((state) => state.setCorrectOption);

	if (!option) {
		return null;
	}

	return (
		<div id={optionId} className="flex flex-row gap-3 items-center w-full">
			<Radio
				id={`q${questionId}-o${optionId}`}
				name={`q${questionId}`}
				checked={option.isCorrect}
				onChange={() => setCorrectOption(questionId, optionId)}
			/>
			<Input
				placeholder="Enter option text here..."
				className={`flex-1 bg-(--col-bg-card) border-(--col-border) ${errors.hasError ? "error" : ""}`}
				value={option.text}
				onChange={(event) => updateOptionText(questionId, optionId, event.target.value)}
			/>
			<Button onClick={() => deleteOption(questionId, optionId)}>Delete</Button>
		</div>
	);
}
