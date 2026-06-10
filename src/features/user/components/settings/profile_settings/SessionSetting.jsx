import { useAuthActions, useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";

export default function SessionSetting() {
	const { logout } = useAuthActions();
	const { user } = useAuthUserState();

	return (
		<section className="w-full max-w-lg flex flex-col gap-6 mx-auto md:mx-0">
			<h3 className="text-xl font-bold text-(--col-text-main)">
				{PROFILE_SETTINGS_CONFIG.session.title}
			</h3>

			<div className="p-4 border border-(--col-border) bg-(--col-bg-input-darker) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="text-sm opacity-90 w-full sm:w-auto">
					<p className="font-bold text-(--col-text-main)">
						{PROFILE_SETTINGS_CONFIG.session.signedInAsPrefix}
						{user?.nickname || PROFILE_SETTINGS_CONFIG.session.fallbackName}
					</p>
					<p className="text-(--col-text-muted)">
						{PROFILE_SETTINGS_CONFIG.session.helpText}
					</p>
				</div>
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
