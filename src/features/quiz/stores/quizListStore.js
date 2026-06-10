import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { getQuizList } from "@/features/quiz/api/quizzes.api.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";

const initialState = {
	items: [],
	loading: false,
	page: 1,
	hasMore: true,
};

const useQuizzesListStore = create((set) => ({
	...initialState,
	actions: {
		fetchQuizzesPage: async ({
			pageToLoad,
			itemsPerPage,
			itemsPerPageFirst,
			condition,
			query = "",
			sort = "newest",
			authorId = null,
		}) => {
			set({ loading: true });
			try {
				const { skip, limit } = getPaginationRange(
					pageToLoad,
					itemsPerPage,
					itemsPerPageFirst,
					condition,
				);
				const data = await getQuizList(skip, limit, query, sort, authorId);
				const fetchedQuizzes = data.quizzes;

				set((state) => ({
					items: pageToLoad === 1 ? fetchedQuizzes : [...state.items, ...fetchedQuizzes],
					hasMore: fetchedQuizzes.length >= limit,
					page: pageToLoad,
				}));
			} catch (err) {
				console.error("Failed to load quizzes", err);
				set({ hasMore: false });
			} finally {
				set({ loading: false });
			}
		},

		clear: () => set({ ...initialState }),

		addQuiz: (newQuiz) => set((state) => ({ items: [newQuiz, ...state.items] })),

		updateQuiz: (updatedQuiz) =>
			set((state) => ({
				items: state.items.map((item) =>
					item._id === updatedQuiz._id ? updatedQuiz : item,
				),
			})),

		removeQuiz: (quizId) =>
			set((state) => ({
				items: state.items.filter((item) => item._id !== quizId),
			})),
	},
}));

export const useQuizzesListState = () =>
	useQuizzesListStore(
		useShallow((state) => ({
			items: state.items,
			loading: state.loading,
			page: state.page,
			hasMore: state.hasMore,
		})),
	);

export const useQuizzesListActions = () => useQuizzesListStore.getState().actions;
