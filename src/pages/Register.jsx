import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	loginWithGoogle,
	registerUser,
	sendVerificationCode,
} from "@/features/auth/api/auth.api.js";
import { useAuthActions } from "@/features/auth/hooks/useAuth.js";
import getGoogleAuthErrorMessage from "@/features/auth/libs/getGoogleAuthErrorMessage.js";
import { QUIZ_CONSTRAINTS } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import Container from "@/shared/ui/Container.jsx";
import Input from "@/shared/ui/Input.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Register() {
	const navigate = useNavigate();
	const { login } = useAuthActions();

	const [step, setStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { addToast } = useToastActions();

	const [formData, setFormData] = useState({
		email: "",
		code: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSendCode = async (e) => {
		e.preventDefault();
		if (!formData.email) return setError("Please enter your email");

		setIsLoading(true);
		setError("");
		try {
			await sendVerificationCode(formData.email);
			addToast("Verification code sent. Check your inbox.");
			setStep(2);
		} catch (err) {
			setError(err.message || "Failed to send code");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSuccess = async (credentialResponse) => {
		if (!credentialResponse?.credential) {
			setError("Google did not return a credential. Please try again.");
			return;
		}

		setIsLoading(true);
		setError("");
		try {
			const data = await loginWithGoogle(credentialResponse.credential);
			login(data.user, data.token);
			addToast("Registration successful. Welcome to QuizTime!");
			navigate("/quizzes");
		} catch (err) {
			setError(getGoogleAuthErrorMessage(err));
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerifyCodeNext = (e) => {
		e.preventDefault();
		if (formData.code.length < 4) return setError("Please enter the valid code");
		setError("");
		setStep(3);
	};

	const handleFinalRegister = async (e) => {
		e.preventDefault();
		setError("");

		if (formData.password !== formData.confirmPassword) {
			return setError("Passwords do not match");
		}

		setIsLoading(true);
		try {
			const data = await registerUser({
				email: formData.email,
				password: formData.password,
				code: formData.code,
			});

			login(data.user, data.token);
			addToast("Registration successful. Welcome to QuizTime!");
			navigate("/quizzes");
		} catch (err) {
			setError(err.message || "Registration failed");
		} finally {
			setIsLoading(false);
		}
	};

	const renderTitle = () => {
		if (step === 1) return "Create Account";
		if (step === 2) return "Verify Email";
		return "Set Password";
	};

	return (
		<Container className="flex flex-col items-center justify-center gap-6">
			<h2 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md text-center">
				{renderTitle()}
			</h2>

			{error && (
				<div className="w-full max-w-md p-3 text-center border rounded-lg bg-(--col-fail-bg) border-(--col-fail) text-(--col-text-main)">
					{error}
				</div>
			)}

			{step === 1 && (
				<div className="flex flex-col md:flex-row w-full items-stretch justify-between gap-8 md:gap-0 animate-fade-in">
					<div className="flex-1 flex flex-col items-center justify-center">
						<form
							onSubmit={handleSendCode}
							className="w-full max-w-xs flex flex-col gap-5"
						>
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
									onChange={handleChange}
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

					<div className="hidden md:flex flex-col items-center px-8">
						<div className="flex-1 w-px bg-(--col-border)"></div>
						<div className="flex items-center justify-center shrink-0 w-11 h-11 bg-(--col-bg-card) text-(--col-text-muted) font-bold text-sm rounded-full border border-(--col-border) my-4">
							OR
						</div>
						<div className="flex-1 w-px bg-(--col-border)"></div>
					</div>

					<div className="flex md:hidden items-center w-full px-4 my-2">
						<div className="flex-1 h-px bg-(--col-border)"></div>
						<div className="flex items-center justify-center shrink-0 w-11 h-11 bg-(--col-bg-card) text-(--col-text-muted) font-bold text-sm rounded-full border border-(--col-border) mx-4">
							OR
						</div>
						<div className="flex-1 h-px bg-(--col-border)"></div>
					</div>

					<div className="flex-1 flex flex-col items-center justify-center">
						<div className="w-full max-w-xs flex flex-col items-center gap-6">
							<p className="text-sm text-(--col-text-muted) text-center">
								Sign up quickly with your Google account
							</p>
							<div className="transform transition-transform hover:scale-105">
								<GoogleLogin
									onSuccess={handleGoogleSuccess}
									onError={() => setError("Google Sign-Up Failed")}
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
			)}

			{step === 2 && (
				<form
					onSubmit={handleVerifyCodeNext}
					className="w-full max-w-xs mx-auto flex flex-col gap-6 animate-fade-in"
				>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="register-code"
							className="text-sm font-semibold text-(--col-text-muted) ml-1"
						>
							Verification Code
						</label>
						<input
							id="register-code"
							className="input w-full text-lg text-center tracking-widest"
							style={{
								border: "none",
								letterSpacing: "0.3em",
								backgroundColor: "transparent",
							}}
							type="text"
							name="code"
							placeholder="123456"
							value={formData.code}
							onChange={handleChange}
							required
						/>
						<p className="text-xs text-center text-(--col-text-muted)">
							Code sent to{" "}
							<span className="text-(--col-text-main) font-bold">
								{formData.email}
							</span>
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<Button
							type="submit"
							className="w-full mt-2 justify-center text-lg py-3 shadow-lg"
						>
							Next
						</Button>
						<button
							type="button"
							onClick={() => {
								setStep(1);
								setError("");
							}}
							className="text-sm text-(--col-text-muted) hover:text-(--col-primary) underline bg-transparent border-none cursor-pointer"
						>
							Back to Email
						</button>
					</div>
				</form>
			)}

			{step === 3 && (
				<form
					onSubmit={handleFinalRegister}
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
							onChange={handleChange}
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
							onChange={handleChange}
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
							onClick={() => setStep(2)}
							className="text-sm text-center text-(--col-text-muted) hover:text-(--col-primary) underline bg-transparent border-none cursor-pointer mt-1"
						>
							Back
						</button>
					</div>
				</form>
			)}

			{step === 1 && (
				<div className="text-(--col-text-muted) text-sm mt-4">
					Already have an account?{" "}
					<Link to="/login" className="font-bold text-(--col-primary) hover:underline">
						Log In
					</Link>
				</div>
			)}
		</Container>
	);
}
