import ModalChangePassword from "@/features/user/components/settings/ModalChangePassword.jsx";
import { getProfilePageActions } from "@/features/user/hooks/useProfilePageActions.js";
import {
	useProfilePageModalState,
	useProfilePageActions as useProfilePageStoreActions,
} from "@/features/user/stores/profilePageStore.js";
import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";

export default function DangerZoneSetting() {
	const { isDeleteModalOpen, isPasswordModalOpen } = useProfilePageModalState();
	const { openDeleteModal, closeDeleteModal, openPasswordModal, closePasswordModal } =
		useProfilePageStoreActions();
	const { removeAccount } = getProfilePageActions() ?? {};

	return (
		<section className="w-full max-w-lg flex flex-col gap-6 mx-auto md:mx-0">
			<h3 className="text-xl font-bold text-(--col-fail)">
				{PROFILE_SETTINGS_CONFIG.dangerZone.title}
			</h3>

			<div className="p-4 border border-(--col-border) bg-(--col-bg-input-darker) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
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
			</div>

			<div className="p-4 border border-(--col-fail) bg-(--col-fail-bg) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
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

			<ModalChangePassword isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
		</section>
	);
}
