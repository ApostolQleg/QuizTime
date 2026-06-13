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
		<section className="flex flex-col gap-4 p-5 border border-(--col-fail)/30 bg-(--col-fail-bg)/10 rounded-2xl w-full max-w-xl">
			<div className="flex flex-col gap-1">
				<span className="text-sm font-bold text-(--col-fail)">
					{PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.title}
				</span>
				<span className="text-xs text-(--col-text-muted)/80">
					{PROFILE_SETTINGS_CONFIG.dangerZone.deleteAccount.helpText}
				</span>
			</div>

			<div className="flex justify-start pt-1">
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
		</section>
	);
}
