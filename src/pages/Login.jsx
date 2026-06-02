import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginWithGoogle } from "@/features/auth/api/auth.api.js";
import { useAuthActions } from "@/features/auth/hooks/useAuth.js";
import getGoogleAuthErrorMessage from "@/features/auth/libs/getGoogleAuthErrorMessage.js";
import Container from "@/shared/ui/Container.jsx";
import Input from "@/shared/ui/Input.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Login() {
	const { addToast } = useToastActions();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { login } = useAuthActions();

	const updateFormField = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const data = await loginUser({
				email: formData.email,
				password: formData.password,
			});
			login(data.user, data.token);
			addToast("Logged in successfully.");
			navigate("/quizzes");
		} catch (err) {
			setError(err.message || "Invalid credentials");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSuccess = async (credentialResponse) => {
		if (!credentialResponse?.credential) {
			setError("Google did not return a credential. Please try again.");
			return;
		}

		setError("");
		setIsLoading(true);
		try {
			const data = await loginWithGoogle(credentialResponse.credential);
			login(data.user, data.token);
			addToast("Logged in successfully.");
			navigate("/quizzes");
		} catch (err) {
			if (err.message === "USER_NOT_FOUND") {
				navigate("/register");
			} else {
				setError(getGoogleAuthErrorMessage(err));
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container className="flex flex-col items-center justify-center gap-6">
			<h2 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md text-center">
				Welcome Back
			</h2>

			{error && (
				<div className="w-full max-w-md p-3 text-center border rounded-lg bg-(--col-fail-bg) border-(--col-fail) text-(--col-text-main)">
					{error}
				</div>
			)}

			<div className="flex flex-col md:flex-row w-full items-stretch justify-between gap-8 md:gap-0 animate-fade-in">
				<div className="flex-1 flex flex-col items-center justify-center">
					<form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<label
								htmlFor="login-email"
								className="text-sm font-semibold text-(--col-text-muted) ml-1"
							>
								Email
							</label>
							<Input
								id="login-email"
								type="email"
								name="email"
								placeholder="Your email"
								value={formData.email}
								onChange={updateFormField}
								required
								disabled={isLoading}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label
								htmlFor="login-password"
								className="text-sm font-semibold text-(--col-text-muted) ml-1"
							>
								Password
							</label>
							<Input
								id="login-password"
								type="password"
								name="password"
								placeholder="Your password"
								value={formData.password}
								onChange={updateFormField}
								required
								disabled={isLoading}
							/>
						</div>

						<button
							type="submit"
							className="button w-full mt-2 justify-center text-lg py-3 shadow-lg"
							disabled={isLoading}
						>
							{isLoading ? "Logging In..." : "Log In"}
						</button>
					</form>
				</div>

				<div className="hidden md:flex flex-col items-center px-8">
					<div className="flex-1 w-px bg-(--col-border)"></div>
					<div className="flex items-center justify-center shrink-0 size-11 bg-(--col-bg-card) text-(--col-text-muted) font-bold text-sm rounded-full border border-(--col-border) my-4">
						OR
					</div>
					<div className="flex-1 w-px bg-(--col-border)"></div>
				</div>

				<div className="flex md:hidden items-center w-full px-4 my-2">
					<div className="flex-1 h-px bg-(--col-border)"></div>
					<div className="flex items-center justify-center shrink-0 size-11 bg-(--col-bg-card) text-(--col-text-muted) font-bold text-sm rounded-full border border-(--col-border) mx-4">
						OR
					</div>
					<div className="flex-1 h-px bg-(--col-border)"></div>
				</div>

				<div className="flex-1 flex flex-col items-center justify-center">
					<div className="w-full max-w-xs flex flex-col items-center gap-6">
						<p className="text-sm text-(--col-text-muted) text-center">
							Log in quickly with your Google account
						</p>
						<div className="transform transition-transform hover:scale-105">
							<GoogleLogin
								onSuccess={handleGoogleSuccess}
								onError={() => setError("Google Login Failed")}
								theme="filled_blue"
								shape="pill"
								size="large"
								text="signin_with"
								width="280"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="text-(--col-text-muted) text-sm mt-4">
				Don't have an account?{" "}
				<Link to="/register" className="font-bold text-(--col-primary) hover:underline">
					Sign Up
				</Link>
			</div>
		</Container>
	);
}
