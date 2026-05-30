import { Link } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import logoImage from "@/shared/assets/logo.png";
import AuthActions from "@/shared/ui/auth/AuthActions.jsx";
import UserPreview from "@/shared/ui/user/UserPreview.jsx";
import { useSidebarActions, useSidebarState } from "../stores/SidebarStore.js";
import SidebarItem from "./SidebarItem.jsx";

export default function Sidebar() {
	const { user } = useAuthUserState();
	const { isOpened } = useSidebarState();
	const { close } = useSidebarActions();

	return (
		<>
			<button
				type="button"
				onClick={close}
				className={`fixed z-50 top-0 left-0 w-screen h-screen bg-[rgba(2,6,23,0.2)] backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
					isOpened ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
			></button>

			<div
				className={`fixed top-0 left-0 h-screen w-xs sm:w-sm bg-(--col-bg-card) p-4 flex flex-col gap-2 shadow-lg z-50 transition-transform duration-300 ease-in-out ${
					isOpened ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<Link
					to="/"
					onClick={close}
					className="flex items-center gap-3 hover:opacity-80 transition-opacity group mt-2"
				>
					<img
						src={logoImage}
						alt="QuizTime Logo"
						className="h-24 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
					/>
					<span className="text-4xl sm:text-5xl tracking-wide drop-shadow-lg font-bold">
						QuizTime
					</span>
				</Link>

				<div className="flex flex-col gap-4 m-6">
					{!user && <AuthActions onClick={close} />}
					{user && <UserPreview user={user} onClick={close} variant="sidebar" />}

					<SidebarItem to="/quizzes" onClick={close}>
						Quizzes
					</SidebarItem>

					{user && (
						<>
							<SidebarItem to="/my-quizzes" onClick={close}>
								My Quizzes
							</SidebarItem>
							<SidebarItem to="/results" onClick={close}>
								Results
							</SidebarItem>
							<SidebarItem to="/settings" onClick={close}>
								Settings
							</SidebarItem>
						</>
					)}

					<SidebarItem to="/help" onClick={close}>
						Help
					</SidebarItem>
				</div>
			</div>
		</>
	);
}
