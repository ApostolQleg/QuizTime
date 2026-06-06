import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useAuthActions,
	useAuthSessionState,
	useAuthUserState,
} from "@/features/auth/hooks/useAuth.js";
import OtherSettings from "@/features/user/components/settings/OtherSettings.jsx";
import ProfileSettings from "@/features/user/components/settings/ProfileSettings.jsx";
import { useProfileFormAutosave } from "@/features/user/hooks/useProfileFormAutosave.js";
import useProfilePageActions from "@/features/user/hooks/useProfilePageActions.js";
import {
	useProfileFormActions,
	useProfileFormStatusState,
} from "@/features/user/stores/profileFormStore.js";
import {
	useProfilePageIdentityState,
	useProfilePageStatusState,
} from "@/features/user/stores/profilePageStore.js";
import { PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import Loading from "@/shared/ui/Loading";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

const TABS = PROFILE_SETTINGS_CONFIG.page.tabs;

export default function Settings() {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("all");

	const { user: authUser } = useAuthUserState();
	const { logout, login } = useAuthActions();
	const { token, isSessionChecking } = useAuthSessionState();
	const { user } = useProfilePageIdentityState();
	const { isLoading } = useProfilePageStatusState();
	const { initialize } = useProfileFormActions();
	const { status } = useProfileFormStatusState();

	const { addToast } = useToastActions();
	const { fetchProfile } = useProfilePageActions({
		navigate,
		login,
		logout,
		token,
		user: authUser,
		isSessionChecking,
		addToast,
	});
	const { flushPendingSave } = useProfileFormAutosave();

	useEffect(() => {
		if (isSessionChecking || !token || typeof fetchProfile !== "function") return;
		fetchProfile();
	}, [fetchProfile, isSessionChecking, token]);

	useEffect(() => {
		if (user) {
			initialize(user);
		}
	}, [initialize, user]);

	useEffect(() => {
		return () => {
			if (status === "dirty") {
				void flushPendingSave({ force: true });
			}
		};
	}, [flushPendingSave, status]);

	if (isLoading) return <Loading />;
	if (!user) return null;

	return (
		<div className="flex flex-col gap-8 max-w-6xl w-full">
			<h1 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md">
				{PROFILE_SETTINGS_CONFIG.page.title}
			</h1>

			<div className="w-full flex flex-col md:flex-row gap-8 items-start">
				<aside className="w-full md:w-64 flex flex-row md:flex-col gap-2 p-1 bg-(--col-bg-input-darker) border border-(--col-border) rounded-2xl overflow-x-auto md:overflow-visible shrink-0">
					{TABS.map((tab) => {
						const isActive = activeTab === tab.id;
						return (
							<button
								type="button"
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex-1 md:flex-none text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap
                                    ${
										isActive
											? "bg-(--col-bg-input) text-(--col-text-accent) border border-(--col-border) shadow-sm"
											: "text-(--col-text-muted) hover:text-(--col-text-main) hover:bg-(--col-bg-input)/50 border border-transparent"
									}`}
							>
								{tab.label}
							</button>
						);
					})}
				</aside>

				<main className="flex-1 w-full bg-(--col-bg-input-darker)/30 border border-(--col-border)/50 rounded-2xl p-6 md:p-8 min-h-100">
					{(activeTab === "all" || activeTab === "profile") && <ProfileSettings />}

					{activeTab === "all" && (
						<hr className="w-full border-(--col-border) opacity-50 my-10" />
					)}

					{(activeTab === "all" || activeTab === "other") && <OtherSettings />}
				</main>
			</div>
		</div>
	);
}
