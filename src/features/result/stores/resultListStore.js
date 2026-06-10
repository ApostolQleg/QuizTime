import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { getResults } from "@/features/result/api/results.api.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";

const initialState = {
	items: [],
	loading: false,
	page: 1,
	hasMore: true,
};

const useResultsListStore = create((set) => ({
	...initialState,
	actions: {
		fetchResultsPage: async ({ pageToLoad, itemsPerPage, query = "", sort = "newest" }) => {
			set({ loading: true });
			try {
				const { skip, limit } = getPaginationRange(pageToLoad, itemsPerPage);
				const data = await getResults(skip, limit, query, sort);
				const fetchedResults = data.results;

				set((state) => ({
					items: pageToLoad === 1 ? fetchedResults : [...state.items, ...fetchedResults],
					hasMore: fetchedResults.length >= limit,
					page: pageToLoad,
				}));
			} catch (err) {
				console.error("Failed to load results", err);
				set({ hasMore: false });
			} finally {
				set({ loading: false });
			}
		},

		clear: () => set({ ...initialState }),

		removeResultsByQuizId: (deletedQuizId) =>
			set((state) => ({
				items: state.items.filter((item) => item.quizId !== deletedQuizId),
			})),
	},
}));

export const useResultsListState = () =>
	useResultsListStore(
		useShallow((state) => ({
			items: state.items,
			loading: state.loading,
			page: state.page,
			hasMore: state.hasMore,
		})),
	);

export const useResultsListActions = () => useResultsListStore.getState().actions;
