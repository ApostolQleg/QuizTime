import { useReducer } from "react";
import { changePassword } from "@/features/user/api/user.api.js";
import Button from "@/shared/ui/Button.jsx";
import Input from "@/shared/ui/Input.jsx";
import Modal from "@/shared/ui/Modal.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

const initialState = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
	isLoading: false,
	error: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "setField":
			return { ...state, [action.field]: action.value, error: "" };
		case "setLoading":
			return { ...state, isLoading: action.value };
		case "setError":
			return { ...state, error: action.value };
		case "reset":
			return initialState;
		default:
			return state;
	}
}

export default function ModalChangePassword({ isOpen, onClose }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { addToast } = useToastActions();

	const handleClose = () => {
		dispatch({ type: "reset" });
		onClose();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "setError", value: "" });

		if (state.newPassword.length < 6) {
			return dispatch({
				type: "setError",
				value: "New password must be at least 6 characters",
			});
		}
		if (state.newPassword !== state.confirmPassword) {
			return dispatch({ type: "setError", value: "New passwords do not match" });
		}

		dispatch({ type: "setLoading", value: true });
		try {
			await changePassword({
				currentPassword: state.currentPassword,
				newPassword: state.newPassword,
			});
			addToast("Your password has been changed successfully.");
			handleClose();
		} catch (err) {
			dispatch({ type: "setError", value: err.message || "Failed to change password" });
		} finally {
			dispatch({ type: "setLoading", value: false });
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} title="Change Password">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				{state.error && (
					<div className="text-(--col-fail) text-sm bg-(--col-bg-input) p-2 rounded border border-(--col-fail)">
						{state.error}
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
						value={state.currentPassword}
						onChange={(e) =>
							dispatch({
								type: "setField",
								field: "currentPassword",
								value: e.target.value,
							})
						}
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
						value={state.newPassword}
						onChange={(e) =>
							dispatch({
								type: "setField",
								field: "newPassword",
								value: e.target.value,
							})
						}
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
						value={state.confirmPassword}
						onChange={(e) =>
							dispatch({
								type: "setField",
								field: "confirmPassword",
								value: e.target.value,
							})
						}
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
					<Button type="submit" disabled={state.isLoading} className="shadow-xl">
						{state.isLoading ? "Saving..." : "Change Password"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
