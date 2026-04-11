import { create } from "zustand";
import { Queue } from "@/shared/libs/queue.js";

const MAX_TOASTS = 3;
const TOAST_LIFETIME = 5000;

const queue = new Queue();
const timers = new Map();

export const useToastStore = create((set, get) => ({
	toasts: [],

	addToast: (message) => {
		const id = crypto.randomUUID();
		const newToast = { id, message };

		queue.enqueue(newToast);

		if (queue.size > MAX_TOASTS) {
			const removedToast = queue.dequeue();

			if (removedToast && timers.has(removedToast.id)) {
				clearTimeout(timers.get(removedToast.id));
				timers.delete(removedToast.id);
			}
		}

		set({ toasts: queue.toArray() });

		const timerId = setTimeout(() => {
			get().removeToast(id);
		}, TOAST_LIFETIME);

		timers.set(id, timerId);
	},

	removeToast: (id) => {
		if (timers.has(id)) {
			clearTimeout(timers.get(id));
			timers.delete(id);
		}

		queue.items = queue.items.filter((toast) => toast.id !== id);

		set({ toasts: queue.toArray() });
	},
}));
