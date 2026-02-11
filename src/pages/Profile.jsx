import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { verifySession, updateUser, deleteUser } from "../services/user.js";

import Container from "../components/UI/Container.jsx";
import ProfileForm from "../components/Profile/ProfileForm.jsx";
import ModalConfirm from "../components/UI/ModalConfirm.jsx";
import Button from "../components/UI/Button.jsx";

export default function Profile() {
	const navigate = useNavigate();
	const { logout } = useAuth();

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const [modalInfo, setModalInfo] = useState({
		isOpen: false,
		title: "",
		message: "",
		isError: false,
	});
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	useEffect(() => {
		verifySession()
			.then((data) => {
				setUser(data.user);
			})
			.catch(() => {
				navigate("/login");
			})
			.finally(() => setIsLoading(false));
	}, [navigate]);

	const handleSaveProfile = async (formData) => {
		setIsSaving(true);
		try {
			const updated = await updateUser(formData);
			setUser(updated.user);
			setModalInfo({
				isOpen: true,
				title: "Success",
				message: "Profile updated successfully!",
				isError: false,
			});
		} catch (error) {
			setModalInfo({
				isOpen: true,
				title: "Error",
				message: error.message || "Failed to update profile",
				isError: true,
			});
		} finally {
			setIsSaving(false);
		}
	};

	const handleDeleteAccount = async () => {
		try {
			await deleteUser();
			logout();
			navigate("/");
		} catch (error) {
			setModalInfo({
				isOpen: true,
				title: "Error",
				message: "Failed to delete account. Try again later.",
				isError: true,
			});
			setIsDeleteModalOpen(false);
			console.error("Failed to delete account: ", error);
		}
	};

	if (isLoading) return <Container className="text-center">Loading...</Container>;
	if (!user) return null;

	return (
		<Container className="flex flex-col items-center gap-8">
			<h1 className="text-3xl font-bold text-(--col-text-accent) drop-shadow-md">
				My Profile
			</h1>

			<ProfileForm user={user} onSave={handleSaveProfile} isLoading={isSaving} />

			<hr className="w-full border-(--col-border) opacity-50" />

			<div className="w-full max-w-lg flex flex-col gap-4">
				<h3 className="text-xl font-bold text-(--col-fail)">Danger Zone</h3>

				<div className="p-4 border border-(--col-fail) bg-(--col-fail-bg) rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="text-sm opacity-90">
						<p className="font-bold">Delete Account</p>
						<p>Permanently remove your account and all quiz results.</p>
					</div>
					<Button
						onClick={() => setIsDeleteModalOpen(true)}
						className="bg-red-600 hover:bg-red-700 shadow-none text-xs px-4 py-2"
					>
						Delete
					</Button>
				</div>
			</div>

			<ModalConfirm
				isOpen={modalInfo.isOpen}
				onClose={() => setModalInfo({ ...modalInfo, isOpen: false })}
				title={modalInfo.title}
				message={modalInfo.message}
				isAlert={true}
				isDanger={modalInfo.isError}
			/>

			<ModalConfirm
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDeleteAccount}
				title="Delete Account?"
				message="Are you sure you want to delete your account? This action cannot be undone and you will lose all your progress."
				confirmLabel="Yes, Delete My Account"
				isDanger={true}
			/>
		</Container>
	);
}
