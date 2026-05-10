import { useCallback, useEffect } from "react";
import { deleteUser, updateUser, verifySession } from "@/features/profile/api/user.api.js";
import { useProfilePageActions as useProfilePageStoreActions } from "@/features/profile/stores/profilePageStore.js";

export function useProfilePageActions({
	navigate,
	login,
	logout,
	token,
	user: authUser,
	isSessionChecking,
	addToast,
}) {
	const { setUser, setIsLoading, setIsSaving, closeDeleteModal } = useProfilePageStoreActions();

	useEffect(() => {
		if (!token) {
			setUser(null);
			setIsLoading(false);
			navigate("/login");
			return;
		}

		if (isSessionChecking) {
			setIsLoading(true);
			return;
		}

		if (!authUser) {
			setUser(null);
			setIsLoading(false);
			return;
		}

		setUser(authUser);
		setIsLoading(false);
	}, [authUser, isSessionChecking, navigate, setIsLoading, setUser, token]);

	const fetchProfile = useCallback(async () => {
        try {
            const response = await verifySession();
			const freshUser = response.user || response.data?.user || response;
        	setUser(freshUser); 
            
    		login(freshUser, token); 
        } catch (error) {
            console.error("Failed to fetch fresh profile data:", error);
        }
    }, [setUser, login, token]);

	const saveProfile = useCallback(
		async (formData) => {
			setIsSaving(true);
			try {
				const updated = await updateUser(formData);
				setUser(updated.user);
				login(updated.user, token);
				addToast("Your profile has been updated successfully.");
			} catch (error) {
				addToast(error.message || "Failed to update profile.");
			} finally {
				setIsSaving(false);
			}
		},
		[addToast, login, setIsSaving, setUser, token],
	);

	const removeAccount = useCallback(async () => {
		try {
			await deleteUser();
			logout();
			navigate("/");
			addToast("Your account has been deleted successfully.");
		} catch (error) {
			closeDeleteModal();
			console.error("Failed to delete account: ", error);
			addToast("Failed to delete account. Try again later.");
		}
	}, [addToast, closeDeleteModal, logout, navigate]);

	return {
		saveProfile,
		removeAccount,
		fetchProfile
	};
}

export default useProfilePageActions;
