import SaveStatusIndicator from "./SaveStatusIndicator.jsx";
import AvatarSetting from "./avatar/AvatarSetting.jsx";
import DangerZoneSetting from "./danger-zone/DangerZoneSetting.jsx";
import NicknameSetting from "./nickname/NicknameSetting.jsx";
import SessionSetting from "./session/SessionSetting.jsx";
import ThemeColorSetting from "./theme-color/ThemeColorSetting.jsx";

export default function ProfileSettings() {
	return (
		<div className="relative w-full flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold text-(--col-text-main)">Profile Settings</h2>
				<p className="text-sm text-(--col-text-muted)">
					Changes are saved automatically after a short pause.
				</p>
			</div>

			<SaveStatusIndicator />
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
