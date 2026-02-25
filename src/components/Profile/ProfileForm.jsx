import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { linkGoogleAccount } from "../../services/auth.js";
import { useAuth } from "../../hooks/useAuth.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import ColorGenerator from "./ColorGenerator.jsx";
import Avatar from "../UI/Avatar.jsx";
import { nicknameAnimation } from "../../utils/nicknameGen.js"

export default function ProfileForm({ user, onSave, isLoading }) {
	const { login, token } = useAuth();

	const [hasGoogleAccount, setHasGoogleAccount] = useState(!!user.googleId);
	const [linkError, setLinkError] = useState(null);

	const [nickname, setNickname] = useState(user.nickname || "");

	const [avatarType, setAvatarType] = useState(user.avatarType || "generated");

	const [generatedColor, setGeneratedColor] = useState(user.themeColor || "#4f46e5");

	const hasChanges =
		nickname !== user.nickname ||
		avatarType !== user.avatarType ||
		(avatarType === "generated" && generatedColor !== user.themeColor);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave({
			nickname,
			avatarType,
			themeColor: generatedColor,
		});
	};

	const handleGoogleLinkSuccess = async (credentialResponse) => {
		setLinkError(null);
		try {
			const data = await linkGoogleAccount(credentialResponse.credential);
			login(data.user, token);
			setHasGoogleAccount(true);
		} catch (err) {
			console.error(err);
			setLinkError(err.message || "Failed to link Google Account");
		}
	};

	const handleRandomNickname = async () => {
		try{
			nicknameAnimation();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg">
			<div className="flex flex-col gap-2">
				<label className="text-lg font-bold text-(--col-text-main)">{user.login}</label>
				<label className="text-sm font-bold text-(--col-text-muted)">Nickname</label>
				<div className="w-full flex flex-row items-center gap-4">
					<Input
						className="flex-1"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						placeholder="Enter your nickname"
						minLength={3}
						maxLength={20}
						required
					/>
					<Button type="button" onClick={handleRandomNickname}>
						Random
					</Button>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<label className="text-sm font-bold text-(--col-text-muted)">Avatar Source</label>

				<div className="flex gap-4 p-1 bg-(--col-bg-input) rounded-lg border border-(--col-border)">
					<button
						type="button"
						onClick={() => setAvatarType("google")}
						className={`flex-1 py-2 rounded-md transition-all text-sm font-semibold cursor-pointer flex items-center justify-center gap-2
						${avatarType === "google"
								? "bg-(--col-bg-card) shadow-md text-(--col-text-main)"
								: "text-(--col-text-muted) hover:text-(--col-text-main)"
							}`}
					>
						{!hasGoogleAccount && avatarType !== "google" && (
							<span className="w-2 h-2 rounded-full bg-(--col-primary)"></span>
						)}
						Google Photo
					</button>
					<button
						type="button"
						onClick={() => setAvatarType("generated")}
						className={`flex-1 py-2 rounded-md transition-all text-sm font-semibold cursor-pointer
						${avatarType === "generated"
								? "bg-(--col-bg-card) shadow-md text-(--col-text-main)"
								: "text-(--col-text-muted) hover:text-(--col-text-main)"
							}`}
					>
						Color Generator
					</button>
				</div>
			</div>

			<div className="animate-fade-in min-h-50">
				{avatarType === "google" ? (
					hasGoogleAccount ? (
						<div className="flex flex-col items-center p-6 border border-(--col-border) rounded-xl bg-(--col-bg-input-darker)">
							{user.avatarUrl ? (
								<Avatar src={user.avatarUrl} name={user.nickname} size="lg" />
							) : (
								<div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-2xl">
									?
								</div>
							)}
							<p className="mt-6 text-sm text-(--col-text-muted)">
								Using your Google account photo
							</p>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center p-8 border border-dashed border-(--col-border) rounded-xl bg-(--col-bg-input-darker) gap-4 text-center h-full">
							<div className="w-16 h-16 rounded-full bg-(--col-bg-input) flex items-center justify-center text-2xl mb-2 opacity-50">
								G
							</div>
							<div>
								<p className="font-bold text-(--col-text-main)">
									Connect Google Account
								</p>
								<p className="text-xs text-(--col-text-muted) mt-1 max-w-50">
									Link your account to use your Google profile photo as an avatar.
								</p>
							</div>

							<div className="mt-2">
								<GoogleLogin
									onSuccess={handleGoogleLinkSuccess}
									onError={() => setLinkError("Connection Failed")}
									theme="filled_blue"
									shape="pill"
									size="medium"
									text="continue_with"
								/>
							</div>
							{linkError && <p className="text-xs text-(--col-error)">{linkError}</p>}
						</div>
					)
				) : (
					<div className="flex flex-col gap-2">
						<ColorGenerator
							initialColor={generatedColor}
							onColorSelect={setGeneratedColor}
						/>
					</div>
				)}
			</div>

			<Button
				className={`w-full mt-4 ${!hasChanges ? "opacity-50 cursor-not-allowed" : "shadow-xl"}`}
				disabled={!hasChanges || isLoading}
			>
				{isLoading ? "Saving..." : "Save Changes"}
			</Button>
		</form>
	);
}
