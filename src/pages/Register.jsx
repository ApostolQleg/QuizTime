import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { registerUser, sendVerificationCode, extractGoogleData } from "../services/auth.js";
import Container from "../components/UI/Container.jsx";
import Input from "../components/UI/Input.jsx";
import Button from "../components/UI/Button.jsx";

export default function Register() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [step, setStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState({
		email: "",
		code: "",
		name: "",
		password: "",
		confirmPassword: "",
		avatarUrl: "",
		googleToken: null,
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
			setStep(2);
		} catch (err) {
			setError(err.message || "Failed to send code");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSuccess = async (credentialResponse) => {
		setIsLoading(true);
		setError("");
		try {
			const googleData = await extractGoogleData(credentialResponse.credential);
			setFormData((prev) => ({
				...prev,
				email: googleData.email,
				name: "",
				avatarUrl: googleData.picture,
				googleToken: credentialResponse.credential,
			}));
			setStep(3);
		} catch (err) {
			console.error(err);
			setError(err.message || "Google Sign-Up Failed. Please try manually.");
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
		if (formData.name.length < 3) {
			return setError("Nickname must be at least 3 characters");
		}

		setIsLoading(true);
		try {
			const data = await registerUser({
				email: formData.email,
				name: formData.name,
				password: formData.password,
				code: formData.googleToken ? null : formData.code,
				googleToken: formData.googleToken,
				avatarUrl: formData.avatarUrl,
			});

			login(data.user, data.token);
			navigate("/");
		} catch (err) {
			setError(err.message || "Registration failed");
		} finally {
			setIsLoading(false);
		}
	};

	const renderTitle = () => {
		if (step === 1) return "Create Account";
		if (step === 2) return "Verify Email";
		return "Finish Registration";
	};

	return (
		<Container className="flex flex-col items-center justify-center gap-6 max-w-md mx-auto">
			<h2 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md text-center">
				{renderTitle()}
			</h2>

			{error && (
				<div className="w-full p-3 text-center border rounded-lg bg-(--col-fail-bg) border-(--col-fail) text-(--col-text-main)">
					{error}
				</div>
			)}

			{step === 1 && (
				<div className="w-full flex flex-col gap-5 animate-fade-in">
					<form onSubmit={handleSendCode} className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-sm font-semibold text-(--col-text-muted)">
								Email
							</label>
							<Input
								type="email"
								name="email"
								placeholder="name@example.com"
								value={formData.email}
								onChange={handleChange}
								required
								disabled={isLoading}
								className="text-lg"
							/>
						</div>
						<Button
							type="submit"
							disabled={isLoading}
							className="justify-center text-lg w-full"
						>
							{isLoading ? "Sending..." : "Send Verification Code"}
						</Button>
					</form>

					<div className="flex items-center w-full my-1">
						<div className="h-px bg-(--col-border) flex-1" />
						<span className="px-4 text-xs text-(--col-text-muted)">OR</span>
						<div className="h-px bg-(--col-border) flex-1" />
					</div>

					<div className="w-full flex justify-center">
						<GoogleLogin
							onSuccess={handleGoogleSuccess}
							onError={() => setError("Google Sign-Up Failed")}
							theme="filled_blue"
							shape="pill"
							size="large"
							text="signup_with"
						/>
					</div>

					<div className="text-(--col-text-muted) text-sm mt-2 text-center">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-bold text-(--col-primary) hover:underline"
						>
							Sign In
						</Link>
					</div>
				</div>
			)}

			{step === 2 && (
				<form
					onSubmit={handleVerifyCodeNext}
					className="w-full flex flex-col gap-6 animate-fade-in"
				>
					<div className="flex flex-col gap-2">
						<label className="text-sm font-semibold text-(--col-text-muted)">
							Verification Code
						</label>
						<Input
							type="text"
							name="code"
							placeholder="123456"
							value={formData.code}
							onChange={handleChange}
							required
							className="text-center text-2xl tracking-[0.5em] font-mono border-none bg-transparent focus:ring-0"
							maxLength={6}
						/>
						<p className="text-xs text-center text-(--col-text-muted)">
							Code sent to{" "}
							<span className="text-(--col-text-main) font-bold">
								{formData.email}
							</span>
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<Button type="submit" className="justify-center text-lg w-full">
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
					className="w-full flex flex-col gap-4 animate-fade-in"
				>
					<div className="p-3 mb-2 bg-(--col-bg-input-darker) rounded-lg border border-(--col-border) flex items-center gap-3">
						{formData.avatarUrl ? (
							<img
								src={formData.avatarUrl}
								alt="Avatar"
								className="w-10 h-10 rounded-full"
							/>
						) : (
							<div className="w-10 h-10 rounded-full bg-(--col-primary) flex items-center justify-center font-bold">
								{formData.name.charAt(0).toUpperCase() || "U"}
							</div>
						)}
						<div className="flex flex-col overflow-hidden">
							<span className="text-xs text-(--col-text-muted)">Registering as</span>
							<span className="text-sm font-bold truncate">{formData.email}</span>
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-(--col-text-muted)">
							Nickname
						</label>
						<Input
							type="text"
							name="name"
							placeholder="CoolUser123"
							value={formData.name}
							onChange={handleChange}
							required
							minLength={3}
							className="text-lg"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-(--col-text-muted)">
							Password
						</label>
						<Input
							type="password"
							name="password"
							placeholder="••••••••"
							value={formData.password}
							onChange={handleChange}
							required
							minLength={6}
							className="text-lg"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-(--col-text-muted)">
							Confirm Password
						</label>
						<Input
							type="password"
							name="confirmPassword"
							placeholder="••••••••"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							className="text-lg"
						/>
					</div>

					<div className="flex flex-col gap-3 mt-4">
						<Button
							type="submit"
							disabled={isLoading}
							className="justify-center text-lg w-full"
						>
							{isLoading ? "Creating Account..." : "Create Account"}
						</Button>

						{!formData.googleToken && (
							<button
								type="button"
								onClick={() => setStep(2)}
								className="text-sm text-center text-(--col-text-muted) hover:text-(--col-primary) underline bg-transparent border-none cursor-pointer"
							>
								Back
							</button>
						)}
					</div>
				</form>
			)}
		</Container>
	);
}
