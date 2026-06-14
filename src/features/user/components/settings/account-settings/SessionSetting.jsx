import { useAuthActions, useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import SettingCard from "@/shared/ui/SettingCard.jsx";

export default function SessionSetting() {
	const { logout } = useAuthActions();
	const { user } = useAuthUserState();

	return (
		<SettingCard
			title={PROFILE_SETTINGS_CONFIG.session.title}
			helpText={PROFILE_SETTINGS_CONFIG.session.helpText}
		>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
		</SettingCard>
	);
}
