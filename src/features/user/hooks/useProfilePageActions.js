import { useCallback, useEffect, useRef } from "react";
import { deleteUser, updateUser, verifySession } from "@/features/user/api/user.api.js";
import { useProfilePageActions as useProfilePageStoreActions } from "@/features/user/stores/profilePageStore.js";

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

	const latestTokenRef = useRef(token);

	useEffect(() => {
		latestTokenRef.current = token;
	}, [token]);

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
		const requestToken = latestTokenRef.current;

		try {
			const response = await verifySession();
			const freshUser = response?.user;
			if (!freshUser) {
				return;
			}

			if (latestTokenRef.current !== requestToken || !latestTokenRef.current) {
				console.warn("Token changed or removed during flight. Ignoring response.");
				return;
			}

			setUser(freshUser);
			login(freshUser, latestTokenRef.current);
		} catch (error) {
			const status = error?.response?.status || error?.status;
			if (status === 401) {
				console.warn("Session expired or invalid. Logging out.");
				logout();
			} else {
				console.error("Failed to fetch fresh profile data:", error);
			}
		}
	}, [setUser, login, logout]);

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
		fetchProfile,
	};
}

export default useProfilePageActions;
