import { useState } from "react";
import Modal from "../UI/Modal.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import { changePassword } from "../../services/user.js";

export default function ModalChangePassword({ isOpen, onClose }) {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

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
			setSuccess(true);
			setTimeout(() => {
				onClose();
				setSuccess(false);
				setCurrentPassword("");
				setNewPassword("");
				setConfirmPassword("");
			}, 1500);
		} catch (err) {
			setError(err.message || "Failed to change password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Change Password">
			{success ? (
				<div className="text-center text-green-500 py-8 text-xl font-bold animate-fade-in">
					Password changed successfully!
				</div>
			) : (
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{error && (
						<div className="text-red-500 text-sm bg-red-500/10 p-2 rounded border border-red-500">
							{error}
						</div>
					)}

					<div className="flex flex-col gap-1">
						<label className="text-sm font-bold text-(--col-text-muted)">
							Current Password
						</label>
						<Input
							type="password"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-bold text-(--col-text-muted)">
							New Password
						</label>
						<Input
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
							minLength={6}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-bold text-(--col-text-muted)">
							Confirm New Password
						</label>
						<Input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>

					<div className="flex justify-end gap-3 mt-4">
						<Button
							type="button"
							onClick={onClose}
							className="bg-transparent border border-(--col-border)"
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading} className="shadow-xl">
							{isLoading ? "Saving..." : "Change Password"}
						</Button>
					</div>
				</form>
			)}
		</Modal>
	);
}
