import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const EMPTY_SELECTED = [];

const initialState = {
	loading: true,
	quizData: null,
	resultData: null,
	answers: [],
	errors: {},
	alertInfo: { isOpen: false, message: "" },
	mode: "play",
};

const useQuizSessionStore = create((set) => ({
	...initialState,
	actions: {
		resetSession: () => set({ ...initialState }),

		setLoading: (loading) => set({ loading }),

		loadQuizForPlay: (quiz) =>
			set({
				quizData: quiz,
				resultData: null,
				answers: [],
				errors: {},
				mode: "play",
			}),

		loadResultForView: (result) =>
			set({
				resultData: result,
				quizData: {
					title: result.quizTitle,
					questions: result.questions,
				},
				answers: result.answers || [],
				errors: {},
				mode: "result",
			}),

		selectAnswer: (questionIndex, optionId) =>
			set((state) => {
				const nextAnswers = [...state.answers];
				nextAnswers[questionIndex] = [optionId];

				if (!state.errors[questionIndex]) {
					return { answers: nextAnswers };
				}

				const nextErrors = { ...state.errors };
				delete nextErrors[questionIndex];

				return {
					answers: nextAnswers,
					errors: nextErrors,
				};
			}),

		setValidationErrors: (errors) => set({ errors }),

		setGuestResult: (result) =>
			set({
				resultData: result,
				mode: "result",
			}),

		setAlertInfo: (alertInfo) => set({ alertInfo }),

		closeAlert: () => set({ alertInfo: { isOpen: false, message: "" } }),
	},
}));

export const useQuizSessionViewState = () =>
	useQuizSessionStore(
		useShallow((state) => ({
			loading: state.loading,
			quizData: state.quizData,
			resultData: state.resultData,
			answers: state.answers,
			errors: state.errors,
			alertInfo: state.alertInfo,
			mode: state.mode,
		})),
	);

export const useQuizSessionQuestionState = (questionId, index) =>
	useQuizSessionStore(
		useShallow((state) => ({
			question: state.quizData?.questions?.find((item) => item.id === questionId),
			hasError: Boolean(state.errors[index]),
			mode: state.mode,
		})),
	);

export const useQuizSessionOptionState = (questionId, questionIndex) =>
	useQuizSessionStore(
		useShallow((state) => ({
			question: state.quizData?.questions?.find((item) => item.id === questionId),
			mode: state.mode,
			answers: state.answers,
			resultAnswers: state.resultData?.answers ?? EMPTY_SELECTED,
			questionIndex,
		})),
	);

export const useQuizSessionActions = () => useQuizSessionStore.getState().actions;
