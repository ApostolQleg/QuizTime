import { useProfileFormStatusState } from "@/features/user/stores/profileFormStore.js";
import { PROFILE_CONFIG } from "@/shared/config/config.js";

const STATUS_META = PROFILE_CONFIG.SAVE_STATUS_META;

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
