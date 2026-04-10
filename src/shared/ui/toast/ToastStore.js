import { create } from "zustand";

import { PriorityDeque } from "@/shared/libs/priorityDeque";

const toasts = new PriorityDeque();

export const useToastStore = create((set) => ({
	toasts: [],
	addToast: (newToast) => set((state) => ({ toasts: [...state.toasts, newToast] })),
}));
