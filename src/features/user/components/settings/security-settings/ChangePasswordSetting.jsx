import ModalChangePassword from "@/features/user/components/settings/ModalChangePassword.jsx";
import {
	useProfilePageActions,
	useProfilePageModalState,
} from "@/features/user/stores/profilePageStore.js";
import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import SettingCard from "@/shared/ui/SettingCard.jsx";

export default function ChangePasswordSetting() {
	const { isPasswordModalOpen } = useProfilePageModalState();
	const { openPasswordModal, closePasswordModal } = useProfilePageActions();

	return (
		<SettingCard
			title={PROFILE_SETTINGS_CONFIG.dangerZone.changePassword.title}
			helpText={PROFILE_SETTINGS_CONFIG.dangerZone.changePassword.helpText}
		>
			<div className="flex justify-start">
				<Button
					onClick={openPasswordModal}
					className="bg-(--col-bg-input) border border-(--col-border) hover:bg-(--col-border) shadow-none text-xs px-4 py-2 whitespace-nowrap w-full sm:w-auto"
				>
					{PROFILE_SETTINGS_CONFIG.dangerZone.changePassword.buttonLabel}
				</Button>
			</div>

			<ModalChangePassword isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
		</SettingCard>
	);
}
