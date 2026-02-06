import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import {
	loginUser,
	registerUser,
	loginWithGoogle,
	sendVerificationCode,
} from "../services/storage";
import Container from "../components/UI/Container.jsx";

export default function Login() {
	const [isRegister, setIsRegister] = useState(false);

	const [isVerifying, setIsVerifying] = useState(false);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
		code: "",
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			let data;
			if (isRegister) {
				if (!isVerifying) {
					await sendVerificationCode(formData.email);
					setIsVerifying(true);
					return;
				} else {
					data = await registerUser(formData);
				}
			} else {
				data = await loginUser({ email: formData.email, password: formData.password });
			}

			login(data.user, data.token);
			navigate("/");
		} catch (err) {
			setError(err.message || "Something went wrong");
		}
	};

	const toggleMode = () => {
		setIsRegister(!isRegister);
		setIsVerifying(false);
		setError("");
		setFormData({ ...formData, code: "" });
	};

	const handleGoogleSuccess = async (credentialResponse) => {
		try {
			const data = await loginWithGoogle(credentialResponse.credential);
			login(data.user, data.token);
			navigate("/");
		} catch {
			setError("Google Login Failed");
		}
	};

	return (
		<Container className="flex flex-col items-center justify-center gap-6 max-w-lg mx-auto mt-10">
			<h2 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md">
				{isRegister ? (isVerifying ? "Verify Email" : "Create Account") : "Welcome Back"}
			</h2>

			{error && (
				<div className="w-full p-3 text-center border rounded-lg bg-(--col-fail-bg) border-(--col-fail) text-(--col-text-main)">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
				{(!isRegister || !isVerifying) && (
					<>
						{isRegister && (
							<div className="flex flex-col gap-1">
								<label className="text-sm font-semibold text-(--col-text-muted)">
									Name
								</label>
								<input
									className="input w-full text-lg"
									type="text"
									name="name"
									placeholder="Enter your name"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>
						)}

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
								disabled={isVerifying}
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
								disabled={isVerifying}
							/>
						</div>
					</>
				)}
				
				{isRegister && isVerifying && (
					<div className="flex flex-col gap-1 animate-fade-in">
						<label className="text-sm font-semibold text-(--col-text-muted)">
							Verification Code
						</label>
						<input
							className="input w-full text-lg text-center tracking-widest"
							type="text"
							name="code"
							placeholder="123456"
							value={formData.code}
							onChange={handleChange}
							required
						/>
						<p className="text-xs text-(--col-text-muted) mt-1">
							We sent a code to {formData.email}.
							<button
								type="button"
								onClick={() => setIsVerifying(false)}
								className="ml-1 text-(--col-primary) hover:underline bg-transparent border-none cursor-pointer"
							>
								Change details?
							</button>
						</p>
					</div>
				)}

				<button type="submit" className="button w-full mt-4 justify-center text-lg">
					{isRegister ? (isVerifying ? "Confirm & Register" : "Send Code") : "Log In"}
				</button>
			</form>

			<div className="flex items-center w-full mb-4">
				<div className="h-px bg-(--col-border) flex-1" />
				<span className="px-4 text-xs text-(--col-text-muted)">Or continue with</span>
				<div className="h-px bg-(--col-border) flex-1" />
			</div>

			<div className="w-full flex justify-center mb-4">
				<GoogleLogin
					onSuccess={handleGoogleSuccess}
					onError={() => setError("Google Login Failed")}
					theme="filled_blue"
					shape="pill"
					size="large"
				/>
			</div>

			<div className="text-(--col-text-muted) text-sm mt-2">
				{isRegister ? "Already have an account? " : "Don't have an account? "}
				<button
					onClick={toggleMode}
					className="font-bold text-(--col-primary) hover:underline bg-transparent border-none cursor-pointer"
				>
					{isRegister ? "Log In" : "Register"}
				</button>
			</div>
		</Container>
	);
}
