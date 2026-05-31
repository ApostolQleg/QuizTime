import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const initialState = {
	items: [],
	loading: false,
	page: 1,
	hasMore: true,
};

const useResultsListStore = create((set) => ({
	...initialState,
	actions: {
		setItems: (items) => set({ items }),

		appendItems: (items) =>
			set((state) => ({
				items: [...state.items, ...items],
			})),

		clear: () => set({ ...initialState }),

		setLoading: (loading) => set({ loading }),

		setPage: (page) => set({ page }),

		setHasMore: (hasMore) => set({ hasMore }),

		removeItem: (resultId) =>
			set((state) => ({
				items: state.items.filter((item) => item._id !== resultId),
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
