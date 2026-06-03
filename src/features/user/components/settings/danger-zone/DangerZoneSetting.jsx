import ModalChangePassword from "@/features/user/components/ModalChangePassword.jsx";
import { getProfilePageActions } from "@/features/user/hooks/useProfilePageActions.js";
import {
	useProfilePageActions as useProfilePageStoreActions,
	useProfilePageModalState,
} from "@/features/user/stores/profilePageStore.js";
import Button from "@/shared/ui/Button.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";

export default function DangerZoneSetting() {
	const { isDeleteModalOpen, isPasswordModalOpen } = useProfilePageModalState();
	const { openDeleteModal, closeDeleteModal, openPasswordModal, closePasswordModal } =
		useProfilePageStoreActions();
	const { removeAccount } = getProfilePageActions() ?? {};

	return (
		<section className="w-full max-w-lg flex flex-col gap-6 mx-auto md:mx-0">
			<h3 className="text-xl font-bold text-(--col-fail)">Danger Zone</h3>

			<div className="p-4 border border-(--col-border) bg-(--col-bg-input-darker) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="text-sm opacity-90 w-full sm:w-auto">
					<p className="font-bold text-(--col-text-main)">Change Password</p>
					<p className="text-(--col-text-muted)">
						Update your password to keep your account secure.
					</p>
				</div>
				<Button
					onClick={openPasswordModal}
					className="bg-(--col-bg-input) border border-(--col-border) hover:bg-(--col-border) shadow-none text-xs px-4 py-2 whitespace-nowrap w-full sm:w-auto"
				>
					Change Password
				</Button>
			</div>

			<div className="p-4 border border-(--col-fail) bg-(--col-fail-bg) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="text-sm opacity-90 w-full sm:w-auto">
					<p className="font-bold">Delete Account</p>
					<p>Permanently remove your account and all quiz results.</p>
				</div>
				<Button
					onClick={openDeleteModal}
					className="bg-(--col-fail) hover:bg-(--col-fail-hover) shadow-none text-xs px-4 py-2 w-full sm:w-auto"
				>
					Delete
				</Button>
			</div>

			<ModalConfirm
				isOpen={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onConfirm={removeAccount}
				title="Delete Account?"
				message="Are you sure you want to delete your account? This action cannot be undone."
				confirmLabel="Yes"
				isDanger={true}
			/>

			<ModalChangePassword isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
		</section>
	);
}
