import { getProfilePageActions } from "@/features/user/hooks/useProfilePageActions.js";
import {
	useProfilePageActions,
	useProfilePageModalState,
} from "@/features/user/stores/profilePageStore.js";
import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";
import SettingCard from "@/shared/ui/SettingCard.jsx";

export default function DeleteAccountSetting() {
	const { isDeleteModalOpen } = useProfilePageModalState();
	const { openDeleteModal, closeDeleteModal } = useProfilePageActions();
	const { removeAccount } = getProfilePageActions() ?? {};

	return (
		<SettingCard
			title={PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.title}
			helpText={PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.helpText}
			isDanger={true}
		>
			<div className="flex justify-start">
				<Button
					onClick={openDeleteModal}
					className="bg-(--col-fail) hover:bg-(--col-fail-hover) shadow-none text-xs px-4 py-2 w-full sm:w-auto"
				>
					{PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.buttonLabel}
				</Button>
			</div>

			<ModalConfirm
				isOpen={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onConfirm={removeAccount}
				title={PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.modalTitle}
				message={PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.modalMessage}
				confirmLabel={PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.modalConfirmLabel}
				isDanger={true}
			/>
		</SettingCard>
	);
}
