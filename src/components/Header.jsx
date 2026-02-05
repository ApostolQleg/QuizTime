import logoImage from "../assets/logo-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<>
			<header className="flex flex-row items-center justify-between gap-4 p-6 min-h-24 top-0 w-full shadow-2xl shadow-black/50 bg-(--col-bg-card) text-(--col-text-main) border-b border-(--col-border)">
				<Link
					to="/"
					className="flex items-center gap-4 hover:opacity-80 transition-opacity"
				>
					<img src={logoImage} alt="logo" className="h-12 w-12 object-contain" />
					<span className="text-2xl sm:text-4xl tracking-wide drop-shadow-lg font-bold">
						QuizTime{" "}
						<span className="text-(--col-text-accent) text-base align-top opacity-80 hidden sm:inline">
							bitches!
						</span>
					</span>
				</Link>

				<div className="text-lg font-medium">
					{user ? (
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-3">
								<div className="hidden sm:flex flex-col items-end leading-tight">
									<span className="text-xs text-(--col-text-muted)">
										Welcome,
									</span>
									<span className="text-(--col-primary) font-bold max-w-[150px] truncate">
										{user.name}
									</span>
								</div>
								{user.avatarUrl ? (
									<img
										src={user.avatarUrl}
										alt="Avatar"
										className="w-10 h-10 rounded-full border-2 border-(--col-border) shadow-md object-cover"
									/>
								) : (
									<div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-(--col-border) shadow-md">
										{user.name.charAt(0).toUpperCase()}
									</div>
								)}
							</div>

							<button
								onClick={handleLogout}
								className="px-4 py-2 ml-2 rounded-lg border-2 border-(--col-border) hover:bg-(--col-fail-bg) hover:text-(--col-fail) hover:border-(--col-fail) transition-all duration-300 text-sm font-semibold text-(--col-text-muted)"
							>
								Log Out
							</button>
						</div>
					) : (
						<Link
							to="/login"
							className="button"
							style={{
								backgroundColor: "var(--col-primary)",
								color: "var(--col-text-main)",
								boxShadow: "0 10px 15px -3px var(--col-primary-glow)",
							}}
						>
							Log In
						</Link>
					)}
				</div>
			</header>

			<nav className="justify-center flex flex-row space-x-8 text-xl sm:text-2xl m-6 font-medium text-(--col-text-muted)">
				<Link to="/" className="nav-link">
					Quizzes
				</Link>
				<Link to="/results" className="nav-link">
					Results
				</Link>
				<Link to="/help" className="nav-link">
					Help
				</Link>
			</nav>
		</>
	);
}
