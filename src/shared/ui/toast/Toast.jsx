import { useState } from "react";
import { useToastStore } from "./toastStore.js";

export default function Toast({ id, message }) {
	const removeToast = useToastStore((state) => state.removeToast);
	const [isExiting, setIsExiting] = useState(false);

	const handleClose = () => {
		setIsExiting(true);
		setTimeout(() => {
			removeToast(id);
		}, 300);
	};

	return (
		<div
			className={`pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-xl border border-(--col-border) bg-(--col-bg-card) p-4 text-(--col-text-main) shadow-lg ${
				isExiting ? "animate-toast-out" : "animate-toast-in"
			}`}
		>
			<p className="flex-1 text-sm font-medium">{message}</p>

			<button
				onClick={handleClose}
				className="shrink-0 p-1 text-(--col-text-muted) transition-colors hover:text-(--col-text-main)"
				aria-label="Close"
			>
				✕
			</button>
			<div className="absolute bottom-0 left-0 h-1 w-full bg-(--col-primary) opacity-60 animate-shrink" />
		</div>
	);
}
