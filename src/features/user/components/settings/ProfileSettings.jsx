import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { linkGoogleAccount } from "@/features/auth/api/auth.api.js";
import { useAuthActions, useAuthSessionState } from "@/features/auth/hooks/useAuth.js";
import {
	useProfilePageModalState,
	useProfilePageActions as useProfilePageStoreActions,
} from "@/features/user/stores/profilePageStore.js";
import { QUIZ_CONSTRAINTS } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";
import Avatar from "@/shared/ui/user/Avatar.jsx";
import { getNicknameArray } from "../../api/user.api.js";
import ColorGenerator from "../ColorGenerator.jsx";
import ModalChangePassword from "../ModalChangePassword";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ProfileSettings({ user, saveProfile, isSaving, removeAccount }) {
	const { logout, login } = useAuthActions();
	const { token } = useAuthSessionState();
	const { addToast } = useToastActions();

	const { isDeleteModalOpen, isPasswordModalOpen } = useProfilePageModalState();
	const { openDeleteModal, closeDeleteModal, openPasswordModal, closePasswordModal } =
		useProfilePageStoreActions();

	const [nickname, setNickname] = useState(user.nickname || "");
	const [isAnimating, setIsAnimating] = useState(false);
	const [generatedColor, setGeneratedColor] = useState(user.themeColor || "#4f46e5");
	const [avatarType, setAvatarType] = useState(user.avatarType || "generated");
	const [hasGoogleAccount, setHasGoogleAccount] = useState(!!user.googleId);
	const [linkError, setLinkError] = useState(null);

	const hasChanges =
		nickname !== user.nickname ||
		avatarType !== user.avatarType ||
		generatedColor !== user.themeColor;

	const handleSubmit = (e) => {
		e.preventDefault();
		saveProfile({
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
			addToast("Google account linked successfully!");
		} catch (err) {
			console.error(err);
			setLinkError(err.message || "Failed to link Google Account");
		}
	};

	const handleRandomNickname = async () => {
		if (isAnimating) return;
		try {
			setIsAnimating(true);
			const data = await getNicknameArray();
			const nicknames = data.nicknames;

			for (let i = 0; i < nicknames.length; i++) {
				setNickname(nicknames[i]);
				await sleep(70);
			}
			addToast("Nickname generated.");
		} catch (err) {
			console.error("Failed to get nicknames", err);
		} finally {
			setIsAnimating(false);
		}
	};

	return (
		<div className="w-full flex flex-col gap-8">
			<h2 className="text-2xl font-bold text-(--col-text-main)">Profile Settings</h2>

			<form
				key={user._id + (user.themeColor || "")}
				onSubmit={handleSubmit}
				className="flex flex-col gap-6 w-full max-w-lg mx-auto md:mx-0"
			>
				<div className="flex flex-col gap-4 p-5 border border-(--col-border) bg-(--col-bg-input-darker)/20 rounded-2xl">
					<div className="flex flex-col gap-1">
						<label
							htmlFor="profile-nickname"
							className="text-sm font-bold text-(--col-text-muted)"
						>
							Nickname
						</label>
						<span className="text-xs text-(--col-text-muted)/80">
							Set your public name or roll a random one.
						</span>
					</div>
					<div className="w-full flex flex-row items-center gap-3">
						<Input
							id="profile-nickname"
							className="flex-1"
							value={nickname}
							onChange={(e) => setNickname(e.target.value)}
							placeholder="Enter your nickname"
							minLength={QUIZ_CONSTRAINTS.NICKNAME_MIN_LENGTH}
							maxLength={QUIZ_CONSTRAINTS.NICKNAME_MAX_LENGTH}
							required
							disabled={isAnimating}
						/>
						<Button
							type="button"
							onClick={handleRandomNickname}
							disabled={isAnimating}
							className="px-4 py-2 bg-(--col-bg-input) border border-(--col-border) hover:bg-(--col-border) text-(--col-text-main) shadow-none text-sm"
						>
							{isAnimating ? "Rolling..." : "Random"}
						</Button>
					</div>
				</div>

				<div className="flex flex-col gap-4 p-5 border border-(--col-border) bg-(--col-bg-input-darker)/20 rounded-2xl">
					<div className="flex flex-col gap-1">
						<span className="text-sm font-bold text-(--col-text-muted)">
							Theme Color
						</span>
						<span className="text-xs text-(--col-text-muted)/80">
							This color styles your nickname and default avatar.
						</span>
					</div>
					<div className="w-full">
						<ColorGenerator
							initialColor={generatedColor}
							onColorSelect={setGeneratedColor}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-4 p-5 border border-(--col-border) bg-(--col-bg-input-darker)/20 rounded-2xl">
					<div className="flex flex-col gap-1">
						<span className="text-sm font-bold text-(--col-text-muted)">
							Avatar Customization
						</span>
						<span className="text-xs text-(--col-text-muted)/80">
							Choose how your profile picture looks to other users.
						</span>
					</div>

					<div className="flex gap-2 p-1 bg-(--col-bg-input) rounded-xl border border-(--col-border)">
						<button
							type="button"
							onClick={() => setAvatarType("google")}
							className={`flex-1 py-2 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 border transition-colors duration-200
                            ${
								avatarType === "google"
									? "bg-(--col-bg-card) text-(--col-text-accent) border-(--col-border) shadow-sm"
									: "bg-transparent border-transparent text-(--col-text-muted) hover:text-(--col-text-main)"
							}`}
						>
							{!hasGoogleAccount && avatarType !== "google" && (
								<span className="size-1.5 rounded-full bg-(--col-primary) animate-pulse shrink-0"></span>
							)}
							Google Photo
						</button>
						<button
							type="button"
							onClick={() => setAvatarType("generated")}
							className={`flex-1 py-2 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center border transition-colors duration-200
                            ${
								avatarType === "generated"
									? "bg-(--col-bg-card) text-(--col-text-accent) border-(--col-border) shadow-sm"
									: "bg-transparent border-transparent text-(--col-text-muted) hover:text-(--col-text-main)"
							}`}
						>
							Pure Color
						</button>
					</div>

					<div className="w-full">
						{avatarType === "google" ? (
							hasGoogleAccount ? (
								<div className="flex flex-col items-center justify-center p-5 border border-(--col-border) rounded-xl bg-(--col-bg-input-darker)/40 gap-3 text-center">
									{user.avatarUrl ? (
										<Avatar src={user.avatarUrl} name={nickname} size="lg" />
									) : (
										<div className="size-20 rounded-full bg-(--col-bg-input) border border-(--col-border) flex items-center justify-center text-xl font-bold text-(--col-text-main)">
											{nickname?.charAt(0).toUpperCase() || "?"}
										</div>
									)}
									<p className="text-xs text-(--col-text-muted)">
										Active: synchronization with Google Profile Photo
									</p>
								</div>
							) : (
								<div className="flex flex-col items-center justify-center p-5 border border-(--col-border) rounded-xl bg-(--col-bg-input-darker)/40 gap-3 text-center">
									<div className="size-12 rounded-full bg-(--col-bg-input) border border-(--col-border) flex items-center justify-center font-bold opacity-60 text-lg text-(--col-text-main)">
										G
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-sm font-bold text-(--col-text-main)">
											Connect Google Account
										</p>
										<p className="text-xs text-(--col-text-muted) max-w-xs mx-auto">
											Link your account to import your official Google photo.
										</p>
									</div>
									<div className="w-full flex justify-center">
										<GoogleLogin
											onSuccess={handleGoogleLinkSuccess}
											onError={() => setLinkError("Connection Failed")}
											theme="filled_blue"
											shape="pill"
											size="medium"
											text="continue_with"
										/>
									</div>
									{linkError && (
										<p className="text-xs text-(--col-fail) font-medium">
											{linkError}
										</p>
									)}
								</div>
							)
						) : (
							<div className="flex flex-col items-center justify-center p-5 border border-(--col-border) rounded-xl bg-(--col-bg-input-darker)/40 gap-3 text-center">
								<div
									style={{ backgroundColor: generatedColor }}
									className="size-20 rounded-full flex items-center justify-center text-2xl font-bold text-(--col-text-main) border border-(--col-border) transition-transform duration-300 transform hover:scale-105"
								>
									{nickname?.charAt(0).toUpperCase() || "?"}
								</div>
								<p className="text-xs text-(--col-text-muted)">
									Active: styling using your Profile Theme Color
								</p>
							</div>
						)}
					</div>
				</div>

				<Button
					type="submit"
					className={`w-full py-3 text-sm font-bold transition-all duration-200 ${
						!hasChanges
							? "opacity-40 cursor-not-allowed bg-(--col-bg-input) text-(--col-text-muted) border border-(--col-border)"
							: "bg-(--col-primary) hover:bg-(--col-primary) hover:scale-[1.01] text-(--col-text-main) border border-(--col-border)"
					}`}
					disabled={!hasChanges || isSaving}
				>
					{isSaving ? "Saving Changes..." : "Save Changes"}
				</Button>
			</form>

			<hr className="w-full border-(--col-border) opacity-50" />

			<div className="w-full max-w-lg flex flex-col gap-6 mx-auto md:mx-0">
				<h3 className="text-xl font-bold text-(--col-text-main)">Session</h3>

				<div className="p-4 border border-(--col-border) bg-(--col-bg-input-darker) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="text-sm opacity-90 w-full sm:w-auto">
						<p className="font-bold text-(--col-text-main)">Sign Out</p>
						<p className="text-(--col-text-muted)">
							Log out of your current session on this device.
						</p>
					</div>
					<Button
						onClick={logout}
						className="bg-transparent border border-(--col-fail)/30 text-(--col-fail) hover:bg-(--col-fail)/10 shadow-none text-xs px-4 py-2 whitespace-nowrap w-full sm:w-auto"
					>
						Sign Out
					</Button>
				</div>
			</div>

			<hr className="w-full border-(--col-border) opacity-50" />

			<div className="w-full max-w-lg flex flex-col gap-6 mx-auto md:mx-0">
				<h3 className="text-xl font-bold text-(--col-fail)">Danger Zone</h3>

				<div className="p-4 border border-(--col-border) bg-(--col-bg-input-darker) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="text-sm opacity-90 w-full sm:w-auto">
						<p className="font-bold text-(--col-text-main)">Change Password</p>
						<p className="text-(--col-text-muted)">
							Update your password to keep your account secure.
						</p>
					</div>
					<Button
						onClick={openPasswordModal}
						className="bg-(--col-bg-input) border border-(--col-border) hover:bg-(--col-border) shadow-none text-xs px-4 py-2 whitespace-nowrap w-full sm:w-auto"
					>
						Change Password
					</Button>
				</div>

				<div className="p-4 border border-(--col-fail) bg-(--col-fail-bg) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="text-sm opacity-90 w-full sm:w-auto">
						<p className="font-bold">Delete Account</p>
						<p>Permanently remove your account and all quiz results.</p>
					</div>
					<Button
						onClick={openDeleteModal}
						className="bg-(--col-fail) hover:bg-(--col-fail-hover) shadow-none text-xs px-4 py-2 w-full sm:w-auto"
					>
						Delete
					</Button>
				</div>
			</div>

			<ModalConfirm
				isOpen={isDeleteModalOpen}
				onClose={closeDeleteModal}
				onConfirm={removeAccount}
				title="Delete Account?"
				message="Are you sure you want to delete your account? This action cannot be undone."
				confirmLabel="Yes"
				isDanger={true}
			/>

			<ModalChangePassword isOpen={isPasswordModalOpen} onClose={closePasswordModal} />
		</div>
	);
}
