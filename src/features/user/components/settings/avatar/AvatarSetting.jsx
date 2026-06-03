import { GoogleLogin } from "@react-oauth/google";
import { linkGoogleAccount } from "@/features/auth/api/auth.api.js";
import {
	useAuthActions,
	useAuthSessionState,
	useAuthUserState,
} from "@/features/auth/hooks/useAuth.js";
import {
	useProfileFormActions,
	useProfileFormDraftState,
} from "@/features/user/stores/profileFormStore.js";
import Avatar from "@/shared/ui/user/Avatar.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function AvatarSetting() {
	const draftState = useProfileFormDraftState();
	const { updateField } = useProfileFormActions();
	const { user } = useAuthUserState();
	const { login } = useAuthActions();
	const { token } = useAuthSessionState();
	const { addToast } = useToastActions();

	const hasGoogleAccount = !!user?.googleId;
	const avatarType = draftState?.avatarType ?? "generated";
	const nickname = draftState?.nickname ?? "";
	const themeColor = draftState?.themeColor ?? "#4f46e5";

	const handleGoogleLinkSuccess = async (credentialResponse) => {
		try {
			const data = await linkGoogleAccount(credentialResponse.credential);
			login(data.user, token);
			addToast("Google account linked successfully!");
		} catch (error) {
			console.error(error);
			addToast(error.message || "Failed to link Google Account");
		}
	};

	return (
		<section className="flex flex-col gap-4 p-5 border border-(--col-border) bg-(--col-bg-input-darker)/20 rounded-2xl">
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
					onClick={() => updateField("avatarType", "google")}
					className={`flex-1 py-2 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 border transition-colors duration-200 ${
						avatarType === "google"
							? "bg-(--col-bg-card) text-(--col-text-accent) border-(--col-border) shadow-sm"
							: "bg-transparent border-transparent text-(--col-text-muted) hover:text-(--col-text-main)"
					}`}
				>
					{!hasGoogleAccount && avatarType !== "google" && (
						<span className="size-1.5 rounded-full bg-(--col-primary) animate-pulse shrink-0" />
					)}
					Google Photo
				</button>
				<button
					type="button"
					onClick={() => updateField("avatarType", "generated")}
					className={`flex-1 py-2 rounded-lg text-sm font-semibold cursor-pointer flex items-center justify-center border transition-colors duration-200 ${
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
							{user?.avatarUrl ? (
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
									onError={() => addToast("Connection Failed")}
									theme="filled_blue"
									shape="pill"
									size="medium"
									text="continue_with"
								/>
							</div>
						</div>
					)
				) : (
					<div className="flex flex-col items-center justify-center p-5 border border-(--col-border) rounded-xl bg-(--col-bg-input-darker)/40 gap-3 text-center">
						<div
							style={{ backgroundColor: themeColor }}
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
		</section>
	);
}
