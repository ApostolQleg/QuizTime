import { Link } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import logoImage from "@/shared/assets/logo.png";
import menuImage from "@/shared/assets/menu.png";
import AuthActions from "@/shared/ui/auth/AuthActions.jsx";
import UserPreview from "@/shared/ui/user/UserPreview";
import { useSidebarActions } from "@/widgets/sidebar/stores/SidebarStore.js";

export default function Header() {
	const { user } = useAuthUserState();
	const { open } = useSidebarActions();

	return (
		<header className="mb-3 sticky top-0 z-40 flex flex-row items-center justify-between p-4 w-full shadow-2xl shadow-black/50 bg-(--col-bg-card) text-(--col-text-main) border-b border-(--col-border)">
			<div className="flex flex-row gap-2">
				<button
					type="button"
					onClick={open}
					className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
					aria-label="Toggle navigation menu"
				>
					<img
						src={menuImage}
						alt="Menu Icon"
						className="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
					/>
				</button>

				<Link
					to="/"
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
			</div>

			<div className="text-base sm:text-lg font-medium">
				{user ? (
					<UserPreview user={user} variant="header" />
				) : (
					<div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
						<span className="text-(--col-text-muted) hidden lg:inline text-xs">
							To save your progress
						</span>
						<AuthActions />
					</div>
				)}
			</div>
		</header>
	);
}
