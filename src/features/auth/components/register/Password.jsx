import { QUIZ_CONSTRAINTS } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import Input from "@/shared/ui/Input.jsx";

export default function Password({ formData, isLoading, onSubmit, onChange, onBack }) {
	return (
		<form
			onSubmit={onSubmit}
			className="w-full max-w-xs mx-auto flex flex-col gap-5 animate-fade-in"
		>
			<div className="p-3 mb-2 bg-(--col-bg-input-darker) rounded-lg border border-(--col-border)">
				<p className="text-xs text-(--col-text-muted)">Registering as</p>
				<p className="text-sm font-bold truncate">{formData.email}</p>
			</div>

			<div className="flex flex-col gap-2">
				<label
					htmlFor="register-password"
					className="text-sm font-semibold text-(--col-text-muted) ml-1"
				>
					Set your password
				</label>
				<Input
					id="register-password"
					type="password"
					name="password"
					value={formData.password}
					onChange={onChange}
					required
					minLength={QUIZ_CONSTRAINTS.PASSWORD_MIN_LENGTH}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label
					htmlFor="register-confirm-password"
					className="text-sm font-semibold text-(--col-text-muted) ml-1"
				>
					Confirm your password
				</label>
				<Input
					id="register-confirm-password"
					type="password"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={onChange}
					required
				/>
			</div>

			<div className="flex flex-col gap-3 mt-2">
				<Button
					type="submit"
					disabled={isLoading}
					className="w-full justify-center text-lg py-3 shadow-lg"
				>
					{isLoading ? "Creating Account..." : "Create Account"}
				</Button>

				<button
					type="button"
					onClick={onBack}
					className="text-sm text-center text-(--col-text-muted) hover:text-(--col-primary) underline bg-transparent border-none cursor-pointer mt-1"
				>
					Back
				</button>
			</div>
		</form>
	);
}
