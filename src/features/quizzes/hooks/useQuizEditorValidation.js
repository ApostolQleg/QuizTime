import { useCallback } from "react";
import {
	useQuizEditorActions,
	useQuizEditorStore,
} from "@/features/quizzes/stores/quizEditorStore.js";

export function useQuizEditorValidation() {
	const { setErrors, setAlertInfo, closeAlert } = useQuizEditorActions();

	const validate = useCallback(() => {
		const { title, description, questions } = useQuizEditorStore.getState();

		const newErrors = {
			title: title.trim() === "",
			description: description.trim() === "",
			questions: {},
		};

		let hasError = newErrors.title || newErrors.description;

		for (const question of questions) {
			const optionsErrors = {};
			let optionHasError = false;

			for (const option of question.options) {
				if (option.text.trim() === "") {
					optionsErrors[option.id] = { hasError: true };
					optionHasError = true;
				}
			}

			const hasCorrectOption = question.options.some((option) => option.isCorrect);
			const questionTextEmpty = question.text.trim() === "";

			if (questionTextEmpty || !hasCorrectOption || optionHasError) {
				hasError = true;
				newErrors.questions[question.id] = {
					hasError: questionTextEmpty,
					hasRadioError: !hasCorrectOption,
					options: optionsErrors,
				};
			}
		}

		setErrors(newErrors);
		return !hasError;
	}, [setErrors]);

	const showSaveError = useCallback(
		(message) => {
			setAlertInfo({ isOpen: true, message });
		},
		[setAlertInfo],
	);

	return {
		validate,
		showSaveError,
		closeAlert,
	};
}

export default useQuizEditorValidation;
