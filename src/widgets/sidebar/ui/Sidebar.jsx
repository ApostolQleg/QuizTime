import { Link } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import logoImage from "@/shared/assets/logo-icon.png";
import Avatar from "@/shared/ui/Avatar.jsx";
import AuthActions from "@/shared/ui/auth/AuthActions.jsx";
import { useSidebarActions, useSidebarState } from "../stores/SidebarStore.js";

export default function Sidebar() {
	const { user } = useAuthUserState();

	const { isOpened } = useSidebarState();
	const { setIsOpened } = useSidebarActions();

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

				<div className="fixed top-0 left-0 h-screen w-xs sm:w-sm bg-(--col-bg-card) p-4 flex flex-col gap-2 shadow-lg z-50">
					<Link
						to="/"
						onClick={handleToggle}
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
						{!user && <AuthActions onClick={handleToggle} />}

						{user && (
							<div className="flex items-center gap-4 sm:gap-6">
								<Link
									onClick={handleToggle}
									to={`/user/${user._id}`}
									className="flex flex-1 items-center gap-3 group hover:opacity-90 transition-all"
									title="Go to Profile"
								>
									<div className="relative group-hover:scale-105 transition-transform duration-300">
										<Avatar
											src={user.avatarUrl}
											name={user.nickname}
											type={user.avatarType}
											color={user.themeColor}
											size="md"
										/>
									</div>
									<div className="flex flex-col items-end leading-tight">
										<span
											className="font-bold max-w-50 truncate transition-colors duration-300 text-2xl"
											style={{
												color: user.themeColor || "var(--col-primary)",
											}}
										>
											{user.nickname}
										</span>
									</div>
								</Link>
							</div>
						)}

						<Link
							to="/quizzes"
							onClick={handleToggle}
							className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors text-2xl"
						>
							Quizzes
						</Link>
						{user && (
							<>
								<Link
									to={"/my-quizzes"}
									onClick={handleToggle}
									className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors text-2xl"
								>
									My Quizzes
								</Link>
								<Link
									to="/results"
									onClick={handleToggle}
									className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors text-2xl"
								>
									Results
								</Link>
								<Link
									to={"/settings"}
									onClick={handleToggle}
									className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors text-2xl"
								>
									Settings
								</Link>
							</>
						)}

						<Link
							to="/help"
							onClick={handleToggle}
							className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors text-2xl"
						>
							Help
						</Link>
					</div>
				</div>
			</>
		);
	}
}
