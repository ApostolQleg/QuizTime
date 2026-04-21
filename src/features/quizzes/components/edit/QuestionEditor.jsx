import Option from "./OptionEditor.jsx";
import Input from "@/shared/ui/Input.jsx";
import Button from "@/shared/ui/Button.jsx";
import {
	useQuizEditorActions,
	useQuizEditorQuestionState,
} from "@/features/quizzes/stores/quizEditorStore.js";

export default function Question({ questionId, index }) {
	const { question, errors } = useQuizEditorQuestionState(questionId);
	const { deleteQuestion, updateQuestionText, addOption } = useQuizEditorActions();

	if (!question) {
		return null;
	}

	const optionIds = question.options.map((option) => option.id);

	return (
		<div
			className={`w-full bg-(--col-bg-input-darker) p-4 rounded-2xl flex flex-col gap-3 border border-(--col-border) ${errors.hasRadioError ? "error" : ""}`}
			id={questionId}
		>
			<div className="flex flex-row justify-between items-center border-b border-(--col-border) pb-2">
				<div className="text-(--col-text-muted) font-bold tracking-wide ml-2">
					Question {index + 1}
				</div>
				<Button onClick={() => deleteQuestion(questionId)}>Delete</Button>
			</div>

			<div className="flex flex-row justify-between items-center">
				<Input
					placeholder="Enter question text here..."
					className={`m-2 w-3/4 ${errors.hasError ? "error" : ""}`}
					value={question.text}
					onChange={(event) => updateQuestionText(questionId, event.target.value)}
				/>
			</div>

			{optionIds.map((optionId) => (
				<Option key={optionId} questionId={questionId} optionId={optionId} />
			))}
			<Button onClick={() => addOption(questionId)} className="self-start mt-1">
				Add Option
			</Button>
		</div>
	);
}
