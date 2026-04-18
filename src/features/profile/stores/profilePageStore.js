import { create } from "zustand";

const initialState = {
	user: null,
	isLoading: true,
	isSaving: false,
	isDeleteModalOpen: false,
	isPasswordModalOpen: false,
};

export const useProfilePageStore = create((set) => ({
	...initialState,

	setUser: (user) => set({ user }),
	setIsLoading: (isLoading) => set({ isLoading }),
	setIsSaving: (isSaving) => set({ isSaving }),

	openDeleteModal: () => set({ isDeleteModalOpen: true }),
	closeDeleteModal: () => set({ isDeleteModalOpen: false }),

	openPasswordModal: () => set({ isPasswordModalOpen: true }),
	closePasswordModal: () => set({ isPasswordModalOpen: false }),

	resetProfilePage: () => set({ ...initialState }),
}));

export default useProfilePageStore;
