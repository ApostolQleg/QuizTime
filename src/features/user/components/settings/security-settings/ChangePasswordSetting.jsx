import ModalChangePassword from "@/features/user/components/settings/ModalChangePassword.jsx";
import {
	useProfilePageActions,
	useProfilePageModalState,
} from "@/features/user/stores/profilePageStore.js";
import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";

export default function ChangePasswordSetting() {
	const { isPasswordModalOpen } = useProfilePageModalState();
	const { openPasswordModal, closePasswordModal } = useProfilePageActions();

	return (
		<div className="p-4 border border-(--col-border) bg-(--col-bg-input-darker) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
			<div className="text-sm opacity-90 w-full sm:w-auto">
				<p className="font-bold text-(--col-text-main)">
					{PROFILE_SETTINGS_CONFIG.dangerZone.changePassword.title}
				</p>
				<p className="text-(--col-text-muted)">
					{PROFILE_SETTINGS_CONFIG.dangerZone.changePassword.helpText}
				</p>
			</div>
			<Button
				onClick={openPasswordModal}
				className="bg-(--col-bg-input) border border-(--col-border) hover:bg-(--col-border) shadow-none text-xs px-4 py-2 whitespace-nowrap w-full sm:w-auto"
			>
				{PROFILE_SETTINGS_CONFIG.dangerZone.changePassword.buttonLabel}
			</Button>

			<ModalChangePassword isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
		</div>
	);
}
