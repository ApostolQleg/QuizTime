import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthActions, useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";

export default function Sidebar() {
	const { user } = useAuthUserState();
	const { logout } = useAuthActions();
	const navigate = useNavigate();

	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

	const handleLogoutClick = () => {
		setIsLogoutModalOpen(true);
	};

	const confirmLogout = () => {
		logout();
		navigate("/");
		setIsLogoutModalOpen(false);
	};

	return (
		<>
			<div className="fixed top-0 right-0 h-screen w-sm bg-amber-500 p-4 flex flex-col gap-4 shadow-lg z-50">
				<p className="font-bold text-lg border-b border-amber-600 pb-2">Sidebar</p>
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
