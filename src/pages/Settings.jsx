import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	useAuthActions,
	useAuthSessionState,
	useAuthUserState,
} from "@/features/auth/hooks/useAuth.js";
import OtherSettings from "@/features/user/components/settings/OtherSettings.jsx";
import ProfileSettings from "@/features/user/components/settings/ProfileSettings.jsx";
import useProfilePageActions from "@/features/user/hooks/useProfilePageActions.js";
import {
	useProfilePageIdentityState,
	useProfilePageModalState,
	useProfilePageStatusState,
	useProfilePageActions as useProfilePageStoreActions,
} from "@/features/user/stores/profilePageStore.js";
import Container from "@/shared/ui/Container.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Settings() {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("all");

	const { user: authUser } = useAuthUserState();
	const { logout, login } = useAuthActions();
	const { token, isSessionChecking } = useAuthSessionState();
	const { user } = useProfilePageIdentityState();
	const { isLoading, isSaving } = useProfilePageStatusState();

	const { isDeleteModalOpen, isPasswordModalOpen } = useProfilePageModalState();
	const { openDeleteModal, closeDeleteModal, openPasswordModal, closePasswordModal } =
		useProfilePageStoreActions();

	const { addToast } = useToastActions();
	const { saveProfile, removeAccount, fetchProfile } = useProfilePageActions({
		navigate,
		login,
		logout,
		token,
		user: authUser,
		isSessionChecking,
		addToast,
	});

	useEffect(() => {
		if (isSessionChecking || !token) return;
		if (typeof fetchProfile === "function") {
			fetchProfile();
		}
	}, [fetchProfile, isSessionChecking, token]);

	if (isLoading) return <Container className="text-center">Loading...</Container>;
	if (!user) return null;

	const tabs = [
		{ id: "all", label: "All" },
		{ id: "profile", label: "Profile" },
		{ id: "other", label: "Other" },
	];

	return (
		<Container className="flex flex-col gap-8 max-w-6xl w-full">
			<h1 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md">Settings</h1>

			<div className="w-full flex flex-col md:flex-row gap-8 items-start">
				<aside className="w-full md:w-64 flex flex-row md:flex-col gap-2 p-1 bg-(--col-bg-input-darker) border border-(--col-border) rounded-2xl overflow-x-auto md:overflow-visible shrink-0">
					{tabs.map((tab) => {
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
					{(activeTab === "all" || activeTab === "profile") && (
						<ProfileSettings
							user={user}
							saveProfile={saveProfile}
							isSaving={isSaving}
							openPasswordModal={openPasswordModal}
							openDeleteModal={openDeleteModal}
							isDeleteModalOpen={isDeleteModalOpen}
							closeDeleteModal={closeDeleteModal}
							removeAccount={removeAccount}
							isPasswordModalOpen={isPasswordModalOpen}
							closePasswordModal={closePasswordModal}
						/>
					)}

					{activeTab === "all" && (
						<hr className="w-full border-(--col-border) opacity-50 my-10" />
					)}

					{(activeTab === "all" || activeTab === "other") && <OtherSettings />}
				</main>
			</div>
		</Container>
	);
}
