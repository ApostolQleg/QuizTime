import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthActions, useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import logoImage from "@/shared/assets/logo-icon.png";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";
import { useSidebarActions, useSidebarState } from "../stores/SidebarStore.js";

export default function Sidebar() {
	const { user } = useAuthUserState();
	const { logout } = useAuthActions();
	const navigate = useNavigate();

	const { isOpened } = useSidebarState();
	const { setIsOpened } = useSidebarActions();

	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

	const handleLogoutClick = () => {
		setIsLogoutModalOpen(true);
	};

	const confirmLogout = () => {
		logout();
		navigate("/");
		setIsOpened(!isOpened);
		setIsLogoutModalOpen(false);
	};

	const handleToggle = () => {
		setIsOpened(!isOpened);
	};

	if (isOpened) {
		return (
			<>
				<button
					type="button"
					onClick={handleToggle}
					className="fixed z-50 top-0 w-screen h-screen bg-[rgba(2,6,23,0.2)] backdrop-blur-xs"
				></button>

				<div className="fixed top-0 left-0 h-screen w-sm bg-(--col-bg-card) p-4 flex flex-col gap-4 shadow-lg z-50">
					<Link
						to="/"
						onClick={handleToggle}
						className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
					>
						<img
							src={logoImage}
							alt="QuizTime Logo"
							className="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
						/>
						<span className="text-xl sm:text-3xl tracking-wide drop-shadow-lg font-bold">
							QuizTime
							<span className="text-(--col-text-accent) text-sm align-top opacity-80 hidden sm:inline ml-1 font-normal">
								bitches!
							</span>
						</span>
					</Link>
					<Link
						to="/quizzes"
						className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors"
					>
						Quizzes
					</Link>
					{user && (
						<>
							<Link
								to={"/my-quizzes"}
								className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors"
							>
								My Quizzes
							</Link>
							<Link
								to="/results"
								className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors"
							>
								Results
							</Link>
						</>
					)}

					<Link
						to="/help"
						className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors"
					>
						Help
					</Link>

					{user && (
						<>
							<Link
								to={"/settings"}
								className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors"
							>
								Settings
							</Link>
							<button
								type="button"
								onClick={handleLogoutClick}
								className="px-4 py-2 rounded-lg border border-(--col-border) text-(--col-text-muted) 
                                   hover:bg-(--col-fail-bg) hover:text-(--col-fail) hover:border-(--col-fail) 
                                   transition-all duration-300 text-xs sm:text-sm font-semibold shadow-sm cursor-pointer"
							>
								Sign Out
							</button>
						</>
					)}
				</div>

				<ModalConfirm
					isOpen={isLogoutModalOpen}
					onClose={() => setIsLogoutModalOpen(false)}
					onConfirm={confirmLogout}
					title="Sign Out?"
					message="Are you sure you want to sign out of your account?"
					confirmLabel="Sign Out"
				/>
			</>
		);
	}
}
