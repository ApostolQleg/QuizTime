import AvatarSetting from "./profile/AvatarSetting.jsx";
import DangerZoneSetting from "./profile/DangerZoneSetting.jsx";
import NicknameSetting from "./profile/NicknameSetting.jsx";
import SessionSetting from "./profile/SessionSetting.jsx";
import ThemeColorSetting from "./profile/ThemeColorSetting.jsx";
import SaveStatusIndicator from "./SaveStatusIndicator.jsx";

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
