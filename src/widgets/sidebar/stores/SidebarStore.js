import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const initialState = {
	isOpened: false,
};

const useSidebarStore = create((set) => ({
	...initialState,
	actions: {
		setIsOpened: (isOpened) => set({ isOpened }),
	},
}));

export const useSidebarState = () =>
	useSidebarStore(
		useShallow((state) => ({
			isOpened: state.isOpened,
		})),
	);

export const useSidebarActions = () => useSidebarStore.getState().actions;
