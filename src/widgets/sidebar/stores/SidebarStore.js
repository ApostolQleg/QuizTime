import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const initialState = {
	isOpened: false,
};

const useSidebarStore = create((set) => ({
	...initialState,
	actions: {
		open: () => set({ isOpened: true }),
		close: () => set({ isOpened: false }),
		toggle: () => set((state) => ({ isOpened: !state.isOpened })),
	},
}));

export const useSidebarState = () =>
	useSidebarStore(
		useShallow((state) => ({
			isOpened: state.isOpened,
		})),
	);

export const useSidebarActions = () => useSidebarStore.getState().actions;
