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
		<section className="flex flex-col gap-4 p-5 border border-(--col-border) bg-(--col-bg-input-darker)/20 rounded-2xl w-full max-w-xl">
			<div className="flex flex-col gap-1">
				<span className="text-sm font-bold text-(--col-text-muted)">
					{PROFILE_SETTINGS_CONFIG.dangerZone.changePassword.title}
				</span>
				<span className="text-xs text-(--col-text-muted)/80">
					{PROFILE_SETTINGS_CONFIG.dangerZone.changePassword.helpText}
				</span>
			</div>

			<div className="flex justify-start pt-1">
				<Button
					onClick={openPasswordModal}
					className="bg-(--col-bg-input) border border-(--col-border) hover:bg-(--col-border) shadow-none text-xs px-4 py-2 whitespace-nowrap w-full sm:w-auto"
				>
					{PROFILE_SETTINGS_CONFIG.dangerZone.changePassword.buttonLabel}
				</Button>
			</div>

			<ModalChangePassword isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
		</section>
	);
}
