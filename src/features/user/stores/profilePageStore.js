import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const initialState = {
	user: null,
	isLoading: true,
	isSaving: false,
	isDeleteModalOpen: false,
	isPasswordModalOpen: false,
};

const useProfilePageStore = create((set) => ({
	...initialState,
	actions: {
		setUser: (user) => set({ user }),
		setIsLoading: (isLoading) => set({ isLoading }),
		setIsSaving: (isSaving) => set({ isSaving }),

		openDeleteModal: () => set({ isDeleteModalOpen: true }),
		closeDeleteModal: () => set({ isDeleteModalOpen: false }),

		openPasswordModal: () => set({ isPasswordModalOpen: true }),
		closePasswordModal: () => set({ isPasswordModalOpen: false }),

		resetProfilePage: () => set({ ...initialState }),
	},
}));

export const useProfilePageIdentityState = () =>
	useProfilePageStore(
		useShallow((state) => ({
			user: state.user,
		})),
	);

export const useProfilePageStatusState = () =>
	useProfilePageStore(
		useShallow((state) => ({
			isLoading: state.isLoading,
			isSaving: state.isSaving,
		})),
	);

export const useProfilePageModalState = () =>
	useProfilePageStore(
		useShallow((state) => ({
			isDeleteModalOpen: state.isDeleteModalOpen,
			isPasswordModalOpen: state.isPasswordModalOpen,
		})),
	);

export const useProfilePageActions = () => useProfilePageStore.getState().actions;
