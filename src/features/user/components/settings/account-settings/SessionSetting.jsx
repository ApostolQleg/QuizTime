import { useAuthActions, useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";

export default function SessionSetting() {
	const { logout } = useAuthActions();
	const { user } = useAuthUserState();

	return (
		<section className="flex flex-col gap-4 p-5 border border-(--col-border) bg-(--col-bg-input-darker)/20 rounded-2xl w-full max-w-xl">
			<div className="flex flex-col gap-1">
				<span className="text-sm font-bold text-(--col-text-muted)">
					{PROFILE_SETTINGS_CONFIG.session.title}
				</span>
				<span className="text-xs text-(--col-text-muted)/80">
					{PROFILE_SETTINGS_CONFIG.session.helpText}
				</span>
			</div>

			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
				<p className="text-sm font-semibold text-(--col-text-main)">
					{PROFILE_SETTINGS_CONFIG.session.signedInAsPrefix}
					<span className="text-(--col-text-accent) ml-1">
						{user?.nickname || PROFILE_SETTINGS_CONFIG.session.fallbackName}
					</span>
				</p>
				<Button
					onClick={logout}
					className="bg-transparent border border-(--col-fail)/30 text-(--col-fail) hover:bg-(--col-fail)/10 shadow-none text-xs px-4 py-2 whitespace-nowrap w-full sm:w-auto"
				>
					{PROFILE_SETTINGS_CONFIG.session.buttonLabel}
				</Button>
			</div>
		</section>
	);
}
