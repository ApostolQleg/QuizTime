import Option from "./Option.jsx";
import { useQuizSessionQuestionState } from "@/features/quizzes/stores/quizSessionStore.js";

export default function Question({ questionId, index }) {
	const { question, hasError, mode } = useQuizSessionQuestionState(questionId, index);

	if (!question) {
		return null;
	}

	const options = question.options;
	const className =
		"p-6 rounded-xl border shadow-lg transition-all bg-(--col-bg-input) border-(--col-border) hover:border-(--col-border)";

	return (
		<div className={hasError ? `quiz-error ${className}` : className}>
			{question.text}
			{options.map((option) => (
				<Option
					key={option.id}
					questionId={question.id}
					optionId={option.id}
					questionIndex={index}
					disabled={mode === "result"}
				/>
			))}
		</div>
	);
}
