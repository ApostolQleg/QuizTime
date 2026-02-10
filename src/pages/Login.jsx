import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { loginUser, loginWithGoogle } from "../services/auth.js";
import Container from "../components/UI/Container.jsx";

export default function Login() {
	const [formData, setFormData] = useState({
		login: "",
		password: "",
	});

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const data = await loginUser({
				login: formData.login,
				password: formData.password,
			});
			login(data.user, data.token);
			navigate("/");
		} catch (err) {
			setError(err.message || "Invalid credentials");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSuccess = async (credentialResponse) => {
		setError("");
		setIsLoading(true);
		try {
			const data = await loginWithGoogle(credentialResponse.credential);
			login(data.user, data.token);
			navigate("/");
		} catch (err) {
			if (err.message === "USER_NOT_FOUND") {
				navigate("/register");
			} else {
				setError("Google Login Failed. Please try again.");
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
				<div className="flex-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-(--col-border) pb-8 md:pb-0 md:pr-12">
					<form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-5">
						<div className="flex flex-col gap-2">
							<label className="text-sm font-semibold text-(--col-text-muted) ml-1">
								Nickname
							</label>
							<input
								className="input w-full text-lg py-3 px-4"
								type="text"
								name="login"
								placeholder="Your nickname"
								value={formData.login}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label className="text-sm font-semibold text-(--col-text-muted) ml-1">
								Password
							</label>
							<input
								className="input w-full text-lg py-3 px-4"
								type="password"
								name="password"
								placeholder="••••••••"
								value={formData.password}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
						</div>

						<button
							type="submit"
							className="button w-full mt-2 justify-center text-lg py-3 shadow-lg"
							disabled={isLoading}
						>
							{isLoading ? "Signing In..." : "Sign In"}
						</button>
					</form>
				</div>

				<div className="relative hidden md:flex items-center justify-center">
					<div className="absolute bg-(--col-bg-card) p-3 text-(--col-text-muted) font-bold text-sm z-10 rounded-full border border-(--col-border)">
						OR
					</div>
				</div>

				<div className="md:hidden flex items-center justify-center -my-4 relative z-10">
					<span className="bg-(--col-bg-card) px-4 text-(--col-text-muted) font-bold text-sm">
						OR
					</span>
				</div>

				<div className="flex-1 flex flex-col items-center justify-center pt-8 md:pt-0 md:pl-12">
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
