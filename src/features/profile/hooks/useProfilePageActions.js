import { useEffect, useCallback } from "react";
import { verifySession, updateUser, deleteUser } from "@/features/profile/api/user.api.js";
import { useProfilePageStore } from "@/features/profile/stores/profilePageStore.js";

export function useProfilePageActions({ navigate, login, logout, token, addToast }) {
	const setUser = useProfilePageStore((state) => state.setUser);
	const setIsLoading = useProfilePageStore((state) => state.setIsLoading);
	const setIsSaving = useProfilePageStore((state) => state.setIsSaving);
	const closeDeleteModal = useProfilePageStore((state) => state.closeDeleteModal);

	useEffect(() => {
		let isMounted = true;

		verifySession()
			.then((data) => {
				if (!isMounted) return;
				setUser(data.user);
			})
			.catch(() => {
				if (!isMounted) return;
				navigate("/login");
			})
			.finally(() => {
				if (!isMounted) return;
				setIsLoading(false);
			});

		return () => {
			isMounted = false;
		};
	}, [navigate, setIsLoading, setUser]);

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
	};
}

export default useProfilePageActions;
