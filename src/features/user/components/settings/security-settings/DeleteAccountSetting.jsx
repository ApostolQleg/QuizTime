import { getProfilePageActions } from "@/features/user/hooks/useProfilePageActions.js";
import {
	useProfilePageActions,
	useProfilePageModalState,
} from "@/features/user/stores/profilePageStore.js";
import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";

export default function DeleteAccountSetting() {
	const { isDeleteModalOpen } = useProfilePageModalState();
	const { openDeleteModal, closeDeleteModal } = useProfilePageActions();
	const { removeAccount } = getProfilePageActions() ?? {};

	return (
		<div className="p-4 border border-(--col-fail) bg-(--col-fail-bg) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
			<div className="text-sm opacity-90 w-full sm:w-auto">
				<p className="font-bold">
					{PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.title}
				</p>
				<p>{PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.helpText}</p>
			</div>
			<Button
				onClick={openDeleteModal}
				className="bg-(--col-fail) hover:bg-(--col-fail-hover) shadow-none text-xs px-4 py-2 w-full sm:w-auto"
			>
				{PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.buttonLabel}
			</Button>

			<ModalConfirm
				isOpen={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onConfirm={removeAccount}
				title={PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.modalTitle}
				message={PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.modalMessage}
				confirmLabel={PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.modalConfirmLabel}
				isDanger={true}
			/>
		</div>
	);
}
