import { useNavigate } from "react-router-dom";
import {
	useAuthActions,
	useAuthUserState,
	useAuthSessionState,
} from "@/features/auth/hooks/useAuth.js";
import {
	useProfilePageActions as useProfilePageStoreActions,
	useProfilePageIdentityState,
	useProfilePageModalState,
	useProfilePageStatusState,
} from "@/features/profile/stores/profilePageStore.js";
import useProfilePageActions from "@/features/profile/hooks/useProfilePageActions.js";

import Container from "@/shared/ui/Container.jsx";
import ProfileForm from "@/features/profile/components/ProfileForm.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";
import ModalChangePassword from "@/features/profile/components/ModalChangePassword.jsx";
import Button from "@/shared/ui/Button.jsx";

import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Profile() {
	const navigate = useNavigate();
	const { user: authUser } = useAuthUserState();
	const { logout, login } = useAuthActions();
	const { token, isSessionChecking } = useAuthSessionState();
	const { user } = useProfilePageIdentityState();
	const { isLoading, isSaving } = useProfilePageStatusState();
	const { isDeleteModalOpen, isPasswordModalOpen } = useProfilePageModalState();
	const { openDeleteModal, closeDeleteModal, openPasswordModal, closePasswordModal } =
		useProfilePageStoreActions();

	const { addToast } = useToastActions();
	const { saveProfile, removeAccount } = useProfilePageActions({
		navigate,
		login,
		logout,
		token,
		user: authUser,
		isSessionChecking,
		addToast,
	});

	if (isLoading) return <Container className="text-center">Loading...</Container>;
	if (!user) return null;

	return (
		<Container className="flex flex-col items-center gap-8">
			<h1 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md">
				My Profile
			</h1>

			<ProfileForm
				key={user._id + (user.themeColor || "")}
				user={user}
				onSave={saveProfile}
				isLoading={isSaving}
			/>

			<hr className="w-full border-(--col-border) opacity-50" />

			<div className="w-full max-w-lg flex flex-col gap-6">
				<h3 className="text-xl font-bold text-(--col-fail)">Danger Zone</h3>

				<div className="p-4 border border-(--col-border) bg-(--col-bg-input-darker) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="text-sm opacity-90">
						<p className="font-bold text-(--col-text-main)">Change Password</p>
						<p className="text-(--col-text-muted)">
							Update your password to keep your account secure.
						</p>
					</div>
					<Button
						onClick={openPasswordModal}
						className="bg-(--col-bg-input) border border-(--col-border) hover:bg-(--col-border) shadow-none text-xs px-4 py-2 whitespace-nowrap"
					>
						Change Password
					</Button>
				</div>

				<div className="p-4 border border-(--col-fail) bg-(--col-fail-bg) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="text-sm opacity-90">
						<p className="font-bold">Delete Account</p>
						<p>Permanently remove your account and all quiz results.</p>
					</div>
					<Button
						onClick={openDeleteModal}
						className="bg-(--col-fail) hover:bg-(--col-fail-hover) shadow-none text-xs px-4 py-2"
					>
						Delete
					</Button>
				</div>
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
		</Container>
	);
}
