import { useToastStore } from "./toastStore.js";

export default function Toast({ id, message }) {
	const removeToast = useToastStore((state) => state.removeToast);

	return (
		<div className="relative flex w-full items-start justify-between gap-3 rounded-xl border border-(--col-border) bg-(--col-bg-card) p-3 text-(--col-text-main) shadow-lg pointer-events-auto transition-all duration-300 sm:p-4">
			<p className="text-sm font-medium leading-snug">{message}</p>

			<button
				onClick={() => removeToast(id)}
				className="ml-1 shrink-0 rounded-md p-1 text-(--col-text-muted) transition-colors hover:text-(--col-text-main)"
				aria-label="Закрити сповіщення"
			>
				✕
			</button>

			<div
				className="absolute bottom-0 left-0 h-1 rounded-b-xl bg-(--col-primary) opacity-60 animate-[shrink_5s_linear_forwards]"
				style={{ width: "100%" }}
			/>
		</div>
	);
}
