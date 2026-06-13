import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import ChangePasswordSetting from "./security-settings/ChangePasswordSetting.jsx";
import DeleteAccountSetting from "./security-settings/DeleteAccountSetting.jsx";

export default function SecuritySettings() {
	return (
		<div className="relative w-full flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-bold text-(--col-text-main)">Security</h2>
				<p className="text-sm text-(--col-text-muted)">
					Update your password and manage your account's safety.
				</p>
			</div>

			<section className="w-full max-w-lg flex flex-col gap-6 mx-auto md:mx-0">
				<h3 className="text-xl font-bold text-(--col-fail)">
					{PROFILE_SETTINGS_CONFIG.dangerZone.title}
				</h3>
				<ChangePasswordSetting />
				<DeleteAccountSetting />
			</section>
		</div>
	);
}
