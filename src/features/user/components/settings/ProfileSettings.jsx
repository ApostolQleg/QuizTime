import Button from "@/shared/ui/Button";
import ModalConfirm from "@/shared/ui/ModalConfirm";
import ModalChangePassword from "../ModalChangePassword";
import ProfileForm from "../ProfileForm";

export default function ProfileSettings({
	user,
	saveProfile,
	isSaving,
	openPasswordModal,
	openDeleteModal,
	isDeleteModalOpen,
	closeDeleteModal,
	removeAccount,
	isPasswordModalOpen,
	closePasswordModal,
}) {
	return (
		<div className="w-full flex flex-col gap-8">
			<h2 className="text-2xl font-bold text-(--col-text-main)">Profile Settings</h2>

			<ProfileForm
				key={user._id + (user.themeColor || "")}
				user={user}
				onSave={saveProfile}
				isLoading={isSaving}
			/>

			<hr className="w-full border-(--col-border) opacity-50" />

			<div className="w-full max-w-lg flex flex-col gap-6 mx-auto md:mx-0">
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
		</div>
	);
}
