import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import AvatarSetting from "./profile_settings/AvatarSetting.jsx";
import DangerZoneSetting from "./profile_settings/DangerZoneSetting.jsx";
import NicknameSetting from "./profile_settings/NicknameSetting.jsx";
import SessionSetting from "./profile_settings/SessionSetting.jsx";
import ThemeColorSetting from "./profile_settings/ThemeColorSetting.jsx";

export default function ProfileSettings() {
	return (
		<div className="relative w-full flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold text-(--col-text-main)">
					{PROFILE_SETTINGS_CONFIG.profile.title}
				</h2>
				<p className="text-sm text-(--col-text-muted)">
					{PROFILE_SETTINGS_CONFIG.profile.autosaveHint}
				</p>
			</div>

			<NicknameSetting />
			<ThemeColorSetting />
			<AvatarSetting />
			<hr className="w-full border-(--col-border) opacity-50" />
			<SessionSetting />
			<hr className="w-full border-(--col-border) opacity-50" />
			<DangerZoneSetting />
		</div>
	);
}
