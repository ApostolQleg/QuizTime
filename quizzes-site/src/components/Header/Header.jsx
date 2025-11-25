import logoImage from "../../assets/logo-icon.png";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<>
			<header>
				<img src={logoImage} alt="logo" class="logo" />
				QuizTime bitches!
			</header>
			{/* TODO: Make a fucking good navigation bar */}
			<nav className="nav-bar">
				<Link to="/">Quizzes</Link>
				<Link to="/results">Results</Link>
				<Link to="/help">Help</Link>
			</nav>
		</>
	);
}
