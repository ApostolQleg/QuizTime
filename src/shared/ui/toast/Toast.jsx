import { useToastActions } from "./toastStore.js";

import { TOAST_CONFIG } from "@/shared/config/config.js";

import systemIcon from "@/shared/assets/logo-icon.png";

const { TOAST_LIFETIME, TOAST_ANIM_TIME } = TOAST_CONFIG;

export default function Toast({ id, message, image = systemIcon, isExiting }) {
	const { dismissToast } = useToastActions();

	const styles = {
		"--toast-lifetime": `${TOAST_LIFETIME}ms`,
		"--toast-anim-duration": `${TOAST_ANIM_TIME}ms`,
	};

	return (
		<div
			className={`pointer-events-auto relative flex items-start overflow-hidden rounded-xl border border-(--col-border) bg-(--col-bg-card) p-4 text-(--col-text-main) shadow-lg ${
				isExiting ? "animate-toast-out" : "animate-toast-in"
			}`}
			style={styles}
		>
			<div className="flex w-full items-start gap-3">
				{image && (
					<img
						src={image}
						alt="Toast"
						className="h-8 w-8 shrink-0 rounded-md object-cover"
					/>
				)}
				<p className="flex-1 p-1 text-sm">{message}</p>

				<button
					type="button"
					onClick={() => dismissToast(id)}
					className="shrink-0 p-1 text-(--col-text-muted) transition-colors hover:text-(--col-text-main)"
					aria-label="Close"
				>
					✕
				</button>
			</div>
			<div className="absolute bottom-0 left-0 h-1 w-full bg-(--col-primary) opacity-60 animate-shrink" />
		</div>
	);
}
