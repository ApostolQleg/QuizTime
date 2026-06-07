import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	loginWithGoogle,
	registerUser,
	sendVerificationCode,
} from "@/features/auth/api/auth.api.js";
import Email from "@/features/auth/components/register/Email.jsx";
import Password from "@/features/auth/components/register/Password.jsx";
import Verify from "@/features/auth/components/register/Verify.jsx";
import { useAuthActions } from "@/features/auth/hooks/useAuth.js";
import getGoogleAuthErrorMessage from "@/features/auth/libs/getGoogleAuthErrorMessage.js";
import Container from "@/shared/ui/Container.jsx";
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

	const updateFormField = (e) => {
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

	const renderTitle =
		step === 1 ? "Create Account" : step === 2 ? "Verify Email" : "Set Password";

	return (
		<Container className="page-layout flex flex-col items-center justify-center gap-6">
			<h2 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md text-center">
				{renderTitle}
			</h2>

			{error && (
				<div className="w-full max-w-md p-3 text-center border rounded-lg bg-(--col-fail-bg) border-(--col-fail) text-(--col-text-main)">
					{error}
				</div>
			)}

			{step === 1 && (
				<Email
					formData={formData}
					isLoading={isLoading}
					onSubmit={handleSendCode}
					onChange={updateFormField}
					onGoogleSuccess={handleGoogleSuccess}
					onGoogleError={() => setError("Google Sign-Up Failed")}
				/>
			)}

			{step === 2 && (
				<Verify
					formData={formData}
					onSubmit={handleVerifyCodeNext}
					onChange={updateFormField}
					onBack={() => {
						setStep(1);
						setError("");
					}}
				/>
			)}

			{step === 3 && (
				<Password
					formData={formData}
					isLoading={isLoading}
					onSubmit={handleFinalRegister}
					onChange={updateFormField}
					onBack={() => {
						setStep(2);
						setError("");
					}}
				/>
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
