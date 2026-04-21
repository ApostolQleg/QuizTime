import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const DEFAULT_QUESTION = {
	id: 0,
	text: "",
	options: [
		{ id: 0, text: "Yes", isCorrect: false },
		{ id: 1, text: "No", isCorrect: false },
	],
};

const initialErrors = {
	title: false,
	description: false,
	questions: {},
};

const initialState = {
	title: "",
	description: "",
	questions: [DEFAULT_QUESTION],
	counter: 0,
	loading: false,
	errors: initialErrors,
	alertInfo: { isOpen: false, message: "" },
};

const EMPTY_OBJECT = {};

export const useQuizEditorStore = create((set) => ({
	...initialState,
	actions: {
		initEditor: (isManagePage) => set({ loading: Boolean(isManagePage) }),

		setTitle: (title) =>
			set({
				title,
				counter: title.length,
			}),

		clearTitle: () => set({ title: "", counter: 0 }),

		setDescription: (description) => set({ description }),

		setErrors: (errors) => set({ errors }),

		setAlertInfo: (alertInfo) => set({ alertInfo }),

		closeAlert: () => set({ alertInfo: { isOpen: false, message: "" } }),

		loadQuiz: (quiz) =>
			set({
				title: quiz.title,
				description: quiz.description,
				questions: quiz.questions,
				counter: quiz.title.length,
				loading: false,
			}),

		addQuestion: () =>
			set((state) => {
				const newId =
					state.questions.length > 0
						? Math.max(...state.questions.map((q) => q.id)) + 1
						: 0;
				return {
					questions: [...state.questions, { ...DEFAULT_QUESTION, id: newId }],
				};
			}),

		deleteQuestion: (questionId) =>
			set((state) => ({
				questions: state.questions.filter((question) => question.id !== questionId),
			})),

		updateQuestionText: (questionId, text) =>
			set((state) => ({
				questions: state.questions.map((question) =>
					question.id === questionId ? { ...question, text } : question,
				),
			})),

		addOption: (questionId) =>
			set((state) => ({
				questions: state.questions.map((question) => {
					if (question.id !== questionId) return question;

					const newOptionId =
						question.options.length > 0
							? Math.max(...question.options.map((option) => option.id)) + 1
							: 0;

					return {
						...question,
						options: [
							...question.options,
							{ id: newOptionId, text: "", isCorrect: false },
						],
					};
				}),
			})),

		deleteOption: (questionId, optionId) =>
			set((state) => ({
				questions: state.questions.map((question) => {
					if (question.id !== questionId) return question;
					return {
						...question,
						options: question.options.filter((option) => option.id !== optionId),
					};
				}),
			})),

		updateOptionText: (questionId, optionId, text) =>
			set((state) => ({
				questions: state.questions.map((question) => {
					if (question.id !== questionId) return question;
					return {
						...question,
						options: question.options.map((option) =>
							option.id === optionId ? { ...option, text } : option,
						),
					};
				}),
			})),

		setCorrectOption: (questionId, optionId) =>
			set((state) => ({
				questions: state.questions.map((question) => {
					if (question.id !== questionId) return question;
					return {
						...question,
						options: question.options.map((option) => ({
							...option,
							isCorrect: option.id === optionId,
						})),
					};
				}),
			})),

		resetEditor: () => set({ ...initialState }),
	},
}));

export const useQuizEditorMetaState = () =>
	useQuizEditorStore(
		useShallow((state) => ({
			loading: state.loading,
			alertInfo: state.alertInfo,
		})),
	);

export const useQuizEditorContentState = () =>
	useQuizEditorStore(
		useShallow((state) => ({
			title: state.title,
			description: state.description,
			counter: state.counter,
			errors: state.errors,
			questions: state.questions,
		})),
	);

export const useQuizEditorQuestionState = (questionId) =>
	useQuizEditorStore(
		useShallow((state) => ({
			question: state.questions.find((item) => item.id === questionId),
			errors: state.errors.questions?.[questionId] || EMPTY_OBJECT,
		})),
	);

export const useQuizEditorOptionState = (questionId, optionId) =>
	useQuizEditorStore(
		useShallow((state) => {
			const question = state.questions.find((item) => item.id === questionId);
			return {
				option: question?.options.find((item) => item.id === optionId),
				errors: state.errors.questions?.[questionId]?.options?.[optionId] || EMPTY_OBJECT,
			};
		}),
	);

export const useQuizEditorActions = () => useQuizEditorStore.getState().actions;

export default useQuizEditorStore;
