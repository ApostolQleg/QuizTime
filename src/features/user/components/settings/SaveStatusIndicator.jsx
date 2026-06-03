import { useProfileFormStatusState } from "@/features/user/stores/profileFormStore.js";

const STATUS_META = {
	saved: {
		label: "Saved",
		className: "border-(--col-border) bg-(--col-bg-input-darker)/80 text-(--col-text-main)",
	},
	dirty: {
		label: "Unsaved changes...",
		className: "border-amber-400/30 bg-amber-400/10 text-amber-200",
	},
	saving: {
		label: "Saving...",
		className: "border-sky-400/30 bg-sky-400/10 text-sky-200",
	},
	invalid: {
		label: "Invalid Name",
		className: "border-(--col-fail)/30 bg-(--col-fail-bg) text-(--col-fail)",
	},
};

export default function SaveStatusIndicator() {
	const { status } = useProfileFormStatusState();
	const meta = STATUS_META[status] ?? STATUS_META.saved;

	return (
		<div className="fixed right-4 top-4 z-30 pointer-events-none">
			<div
				className={`min-w-44 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide shadow-lg backdrop-blur-md transition-all duration-300 ${meta.className}`}
			>
				{status === "saving" ? (
					<span className="inline-flex items-center gap-2">
						<span className="size-2 rounded-full bg-current animate-pulse" />
						{meta.label}
					</span>
				) : (
					meta.label
				)}
			</div>
		</div>
	);
}
