import { Link } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import logoImage from "@/shared/assets/logo-icon.png";
import menuImage from "@/shared/assets/menu-icon.png";
import Avatar from "@/shared/ui/Avatar.jsx";
import { useSidebarActions, useSidebarState } from "@/widgets/sidebar/stores/SidebarStore";

export default function Header() {
	const { user } = useAuthUserState();
	const { isOpened} = useSidebarState();
	const { setIsOpened } = useSidebarActions();

	const handleToggleSidebar = () => {
		setIsOpened(!isOpened);
	};

	return (
		<header className="mb-3 sticky top-0 z-40 flex flex-row items-center justify-between p-4 w-full shadow-2xl shadow-black/50 bg-(--col-bg-card) text-(--col-text-main) border-b border-(--col-border)">
			<div className="flex flex-row gap-2">
				<button
					type="button"
					onClick={handleToggleSidebar}
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
					<div className="flex items-center gap-4 sm:gap-6">
						<Link
							to={`/user/${user._id}`}
							className="flex items-center gap-3 group hover:opacity-90 transition-all"
							title="Go to Profile"
						>
							<div className="hidden sm:flex flex-col items-end leading-tight">
								<span
									className="font-bold max-w-37.5 truncate transition-colors duration-300"
									style={{ color: user.themeColor || "var(--col-primary)" }}
								>
									{user.nickname}
								</span>
							</div>

							<div className="relative group-hover:scale-105 transition-transform duration-300">
								<Avatar
									src={user.avatarUrl}
									name={user.nickname}
									type={user.avatarType}
									color={user.themeColor}
									size="sm"
								/>
							</div>
						</Link>
					</div>
				) : (
					<div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
						<span className="text-(--col-text-muted) hidden lg:inline text-xs">
							To save your progress
						</span>
						<div className="flex gap-3">
							<Link
								to="/register"
								className="button px-4 py-2 text-sm shadow-md transition-shadow"
								style={{
									backgroundColor: "var(--col-primary)",
									boxShadow: "0 4px 10px -2px var(--col-primary-glow)",
								}}
							>
								Sign Up
							</Link>
							<span className="text-(--col-text-muted) self-center text-xs">or</span>
							<Link
								to="/login"
								className="button px-4 py-2 text-sm bg-transparent border border-(--col-border) hover:bg-(--col-bg-input) shadow-none transition-colors"
								style={{
									backgroundColor: "transparent",
									boxShadow: "none",
								}}
							>
								Log In
							</Link>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
