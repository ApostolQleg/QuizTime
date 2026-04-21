import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { Queue } from "@/shared/libs/queue.js";

import { TOAST_CONFIG } from "@/shared/config/config.js";
const { MAX_TOASTS, TOAST_LIFETIME, TOAST_ANIM_TIME } = TOAST_CONFIG;

const queue = new Queue();
const timers = new Map();

export const useToastStore = create((set, get) => ({
	toasts: [],
	actions: {
		addToast: (message, image) => {
			const id = crypto.randomUUID();
			const newToast = { id, message, image };

			queue.enqueue(newToast);

			const activeToasts = queue.items.filter((toast) => !toast.isExiting);

			if (activeToasts.length > MAX_TOASTS) {
				const oldestActive = activeToasts[0];
				if (oldestActive) {
					get().actions.dismissToast(oldestActive.id);
				}
			}

			set({ toasts: queue.toArray() });

			const timerId = setTimeout(() => {
				get().actions.dismissToast(id);
			}, TOAST_LIFETIME);

			timers.set(id, timerId);
		},

		dismissToast: (id) => {
			const item = queue.items.find((toast) => toast.id === id);
			if (!item || item.isExiting) return;

			item.isExiting = true;
			set({ toasts: queue.toArray() });

			if (timers.has(id)) clearTimeout(timers.get(id));

			const animTimerId = setTimeout(() => {
				get().actions.removeToast(id);
			}, TOAST_ANIM_TIME);

			timers.set(id, animTimerId);
		},

		removeToast: (id) => {
			if (timers.has(id)) {
				clearTimeout(timers.get(id));
				timers.delete(id);
			}

			queue.items = queue.items.filter((toast) => toast.id !== id);

			set({ toasts: queue.toArray() });
		},
	},
}));

export const useToastListState = () =>
	useToastStore(
		useShallow((state) => ({
			toasts: state.toasts,
		})),
	);

export const useToastActions = () => useToastStore.getState().actions;
