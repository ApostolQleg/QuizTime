import logoImage from "../assets/logo-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useState } from "react";
import ModalConfirm from "./UI/ModalConfirm.jsx";

export default function Header() {
	const { user, logout } = useAuth();
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
			<header className="sticky top-0 z-40 flex flex-row items-center justify-between gap-4 px-6 py-4 w-full shadow-2xl shadow-black/50 bg-(--col-bg-card) text-(--col-text-main) border-b border-(--col-border)">
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

				<div className="text-base sm:text-lg font-medium">
					{user ? (
						<div className="flex items-center gap-4 sm:gap-6">
							<Link
								to="/profile"
								className="flex items-center gap-3 group hover:opacity-90 transition-all"
								title="Go to Profile"
							>
								<div className="hidden sm:flex flex-col items-end leading-tight">
									<span className="text-[10px] uppercase tracking-wider text-(--col-text-muted)">
										Welcome,
									</span>
									<span
										className="font-bold max-w-[150px] truncate transition-colors duration-300"
										style={{ color: user.themeColor || "var(--col-primary)" }}
									>
										{user.name}
									</span>
								</div>

								<div className="relative">
									{user.avatarUrl ? (
										<img
											src={user.avatarUrl}
											alt={user.name}
											className="w-10 h-10 rounded-full border border-(--col-border) shadow-md object-cover group-hover:border-(--col-text-accent) transition-colors"
										/>
									) : user.avatarType === "generated" && user.themeColor ? (
										<div
											className="w-10 h-10 rounded-full border border-(--col-border) shadow-md group-hover:scale-105 transition-transform"
											style={{
												backgroundColor: user.themeColor,
												boxShadow: `0 0 10px ${user.themeColor}60`,
											}}
										/>
									) : (
										<div className="w-10 h-10 rounded-full bg-(--col-primary) flex items-center justify-center text-(--col-text-main) font-bold border border-(--col-border) shadow-md">
											{user.name.charAt(0).toUpperCase()}
										</div>
									)}
								</div>
							</Link>

							<button
								onClick={handleLogoutClick}
								className="px-4 py-2 rounded-lg border border-(--col-border) text-(--col-text-muted) 
                                           hover:bg-(--col-fail-bg) hover:text-(--col-fail) hover:border-(--col-fail) 
                                           transition-all duration-300 text-xs sm:text-sm font-semibold shadow-sm cursor-pointer"
							>
								Sign Out
							</button>
						</div>
					) : (
						<div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
							<span className="text-(--col-text-muted) hidden lg:inline text-xs">
								To save your progress
							</span>
							<div className="flex gap-3">
								<Link
									to="/register"
									className="button px-4 py-2 text-sm shadow-md"
									style={{
										backgroundColor: "var(--col-primary)",
										boxShadow: "0 4px 10px -2px var(--col-primary-glow)",
									}}
								>
									Sign Up
								</Link>
								<span className="text-(--col-text-muted) self-center text-xs">
									or
								</span>
								<Link
									to="/login"
									className="button px-4 py-2 text-sm bg-transparent border border-(--col-border) hover:bg-(--col-bg-input) shadow-none"
									style={{
										backgroundColor: "transparent",
										boxShadow: "none",
									}}
								>
									Sign In
								</Link>
							</div>
						</div>
					)}
				</div>
			</header>

			{/* NAVIGATION */}
			<nav className="justify-center flex flex-row space-x-8 text-lg sm:text-xl my-6 font-medium text-(--col-text-muted)">
				<Link to="/" className="nav-link hover:text-(--col-text-accent) transition-colors">
					Quizzes
				</Link>
				<Link
					to="/results"
					className="nav-link hover:text-(--col-text-accent) transition-colors"
				>
					Results
				</Link>
				<Link
					to="/help"
					className="nav-link hover:text-(--col-text-accent) transition-colors"
				>
					Help
				</Link>
			</nav>

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
