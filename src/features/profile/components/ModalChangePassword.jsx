import { useState } from "react";
import Modal from "@/shared/ui/Modal.jsx";
import Input from "@/shared/ui/Input.jsx";
import Button from "@/shared/ui/Button.jsx";
import { changePassword } from "@/features/profile/api/user.api.js";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function ModalChangePassword({ isOpen, onClose }) {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { addToast } = useToastActions();

	const handleClose = () => {
		setCurrentPassword("");
		setNewPassword("");
		setConfirmPassword("");
		setError("");
		onClose();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (newPassword.length < 6) {
			return setError("New password must be at least 6 characters");
		}
		if (newPassword !== confirmPassword) {
			return setError("New passwords do not match");
		}

		setIsLoading(true);
		try {
			await changePassword({ currentPassword, newPassword });
			addToast("Your password has been changed successfully.");
			handleClose();
		} catch (err) {
			setError(err.message || "Failed to change password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} title="Change Password">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				{error && (
					<div className="text-(--col-fail) text-sm bg-(--col-bg-input) p-2 rounded border border-(--col-fail)">
						{error}
					</div>
				)}

				<div className="flex flex-col gap-1">
					<label
						htmlFor="current-password"
						className="text-sm font-bold text-(--col-text-muted)"
					>
						Current Password
					</label>
					<Input
						id="current-password"
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label
						htmlFor="new-password"
						className="text-sm font-bold text-(--col-text-muted)"
					>
						New Password
					</label>
					<Input
						id="new-password"
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						required
						minLength={6}
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label
						htmlFor="confirm-new-password"
						className="text-sm font-bold text-(--col-text-muted)"
					>
						Confirm New Password
					</label>
					<Input
						id="confirm-new-password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>

				<div className="flex justify-end gap-3 mt-4">
					<Button
						type="button"
						onClick={handleClose}
						className="bg-transparent border border-(--col-border)"
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isLoading} className="shadow-xl">
						{isLoading ? "Saving..." : "Change Password"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
