import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { registerUser, sendVerificationCode, extractGoogleData } from "../services/auth.js";
import Container from "../components/UI/Container.jsx";

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

	// --- STEP 1 LOGIC: Send Code or Google ---

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
			setError("Google Sign-Up Failed. Please try manually.");
		} finally {
			setIsLoading(false);
		}
	};

	// --- STEP 2 LOGIC: Verify Code (Local Transition) ---

	const handleVerifyCodeNext = (e) => {
		e.preventDefault();
		if (formData.code.length < 4) return setError("Please enter the valid code");
		setError("");
		setStep(3);
	};

	// --- STEP 3 LOGIC: Finalize Registration ---

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

	// --- RENDER HELPERS ---

	return (
		<Container className="flex flex-col items-center justify-center gap-6">
			<h2 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md text-center">
				{step === 1 && "Create Account"}
				{step === 2 && "Verify Email"}
				{step === 3 && "Finish Registration"}
			</h2>

			{error && (
				<div className="w-full p-3 text-center border rounded-lg bg-(--col-fail-bg) border-(--col-fail) text-(--col-text-main)">
					{error}
				</div>
			)}

			{step === 1 && (
				<div className="w-full flex flex-col gap-4 animate-fade-in">
					<form onSubmit={handleSendCode} className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-sm font-semibold text-(--col-text-muted)">
								Email
							</label>
							<input
								className="input w-full text-lg"
								type="email"
								name="email"
								placeholder="name@example.com"
								value={formData.email}
								onChange={handleChange}
								required
								disabled={isLoading}
							/>
						</div>
						<button
							type="submit"
							className="button w-full justify-center text-lg"
							disabled={isLoading}
						>
							{isLoading ? "Sending..." : "Send Verification Code"}
						</button>
					</form>

					<div className="flex items-center w-full my-2">
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
					className="w-full flex flex-col gap-4 animate-fade-in"
				>
					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-(--col-text-muted)">
							Verification Code
						</label>
						<input
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
						<p className="text-xs text-(--col-text-muted) mt-1">
							We sent a code to{" "}
							<span className="text-(--col-text-main)">{formData.email}</span>.
						</p>
					</div>

					<button type="submit" className="button w-full justify-center text-lg">
						Next
					</button>

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
				</form>
			)}

			{step === 3 && (
				<form
					onSubmit={handleFinalRegister}
					className="w-full flex flex-col gap-4 animate-fade-in"
				>
					<div className="p-3 mb-2 bg-(--col-bg-input-darker) rounded-lg border border-(--col-border) flex items-center gap-3">
						{formData.avatarUrl && (
							<img
								src={formData.avatarUrl}
								alt="Avatar"
								className="w-10 h-10 rounded-full"
							/>
						)}
						<div className="flex flex-col overflow-hidden">
							<span className="text-xs text-(--col-text-muted)">Registering as</span>
							<span className="text-sm font-bold truncate">{formData.email}</span>
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-(--col-text-muted)">
							Nickname (Unique)
						</label>
						<input
							className="input w-full text-lg"
							type="text"
							name="name"
							placeholder="CoolUser123"
							value={formData.name}
							onChange={handleChange}
							required
							minLength={3}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-(--col-text-muted)">
							Password
						</label>
						<input
							className="input w-full text-lg"
							type="password"
							name="password"
							placeholder="••••••••"
							value={formData.password}
							onChange={handleChange}
							required
							minLength={6}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-(--col-text-muted)">
							Confirm Password
						</label>
						<input
							className="input w-full text-lg"
							type="password"
							name="confirmPassword"
							placeholder="••••••••"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
					</div>

					<button
						type="submit"
						className="button w-full mt-4 justify-center text-lg"
						disabled={isLoading}
					>
						{isLoading ? "Creating Account..." : "Create Account"}
					</button>

					{!formData.googleToken && (
						<button
							type="button"
							onClick={() => setStep(2)}
							className="text-sm text-center text-(--col-text-muted) hover:text-(--col-primary) underline bg-transparent border-none cursor-pointer"
						>
							Back
						</button>
					)}
				</form>
			)}
		</Container>
	);
}
