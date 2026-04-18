import Radio from "@/shared/ui/Radio.jsx";
import { useQuizSessionStore } from "@/features/quizzes/stores/quizSessionStore.js";

const EMPTY_SELECTED = [];

export default function Option({ questionId, optionId, questionIndex, disabled }) {
	const question = useQuizSessionStore((state) =>
		state.quizData?.questions?.find((item) => item.id === questionId),
	);
	const mode = useQuizSessionStore((state) => state.mode);
	const answers = useQuizSessionStore((state) => state.answers);
	const resultAnswers = useQuizSessionStore(
		(state) => state.resultData?.answers || EMPTY_SELECTED,
	);
	const selectAnswer = useQuizSessionStore((state) => state.selectAnswer);

	if (!question) {
		return null;
	}

	const option = question.options.find((item) => item.id === optionId);
	if (!option) {
		return null;
	}

	const selectedIds =
		mode === "result"
			? resultAnswers[questionIndex] || EMPTY_SELECTED
			: answers[questionIndex] || EMPTY_SELECTED;
	const selected = selectedIds.includes(option.id);
	const id = `${question.id}-${option.id}`;
	const name = question.id;
	const value = option.id;
	const text = option.text;
	const isCorrect = option.isCorrect;

	return (
		<label
			className={`${disabled ? (isCorrect ? "option-true" : selected ? "option-false" : "") : ""} flex flex-row gap-2 text-(--col-text-muted)`}
		>
			<Radio
				id={id}
				name={name}
				value={value}
				disabled={disabled}
				onChange={() => selectAnswer(questionIndex, option.id)}
			/>
			{text}
		</label>
	);
}
