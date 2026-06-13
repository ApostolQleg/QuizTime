import SessionSetting from "./account-settings/SessionSetting.jsx";

export default function AccountSettings() {
	return (
		<div className="relative w-full flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold text-(--col-text-main)">Account Settings</h2>
				<p className="text-sm text-(--col-text-muted)">
					Manage your account devices, active sessions, and core settings.
				</p>
			</div>

			<SessionSetting />
		</div>
	);
}
