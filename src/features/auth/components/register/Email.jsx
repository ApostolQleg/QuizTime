import { GoogleLogin } from "@react-oauth/google";
import Button from "@/shared/ui/Button.jsx";
import Input from "@/shared/ui/Input.jsx";
import Divider from "./Divider.jsx";

export default function Email({
	formData,
	isLoading,
	onSubmit,
	onChange,
	onGoogleSuccess,
	onGoogleError,
}) {
	return (
		<div className="flex flex-col md:flex-row w-full items-stretch justify-between gap-8 md:gap-0 animate-fade-in">
			<div className="flex-1 flex flex-col items-center justify-center">
				<form onSubmit={onSubmit} className="w-full max-w-xs flex flex-col gap-5">
					<div className="flex flex-col gap-2">
						<label
							htmlFor="register-email"
							className="text-sm font-semibold text-(--col-text-muted) ml-1"
						>
							Email
						</label>
						<Input
							id="register-email"
							type="email"
							name="email"
							placeholder="name@example.com"
							value={formData.email}
							onChange={onChange}
							required
							disabled={isLoading}
						/>
					</div>
					<Button
						type="submit"
						disabled={isLoading}
						className="w-full mt-2 justify-center text-lg py-3 shadow-lg"
					>
						{isLoading ? "Sending..." : "Send Verification Code"}
					</Button>
				</form>
			</div>

			<Divider />

			<div className="flex-1 flex flex-col items-center justify-center">
				<div className="w-full max-w-xs flex flex-col items-center gap-6">
					<p className="text-sm text-(--col-text-muted) text-center">
						Sign up quickly with your Google account
					</p>
					<div className="transform transition-transform hover:scale-105">
						<GoogleLogin
							onSuccess={onGoogleSuccess}
							onError={onGoogleError}
							theme="filled_blue"
							shape="pill"
							size="large"
							text="signup_with"
							width="280"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
