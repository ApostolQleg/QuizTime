import logoImage from "../assets/logo-icon.png";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<>
			<header className="bg-[rgb(146,6,146)] justify-center flex flex-row p-4 h-16 min-h-[25px] rounded-b-3xl text-4xl top-0 w-full image-rendering-pixelated">
				<img src={logoImage} alt="logo" className="logo" />
				QuizTime bitches!
			</header>
			<nav className="nav-bar">
				<Link to="/">Quizzes</Link>
				<Link to="/results">Results</Link>
				<Link to="/help">Help</Link>
			</nav>
		</>
	);
}
