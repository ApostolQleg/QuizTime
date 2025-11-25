import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Quizzes from "./pages/Quizzes.jsx";
import Quiz from "./pages/Quiz.jsx";
import Result from "./pages/Result.jsx";
import Results from "./pages/Results.jsx";
import Create from "./pages/Create.jsx";
import Manage from "./pages/Manage.jsx";
import Help from "./pages/Help.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route exact path="/" element={<Quizzes />} />
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/result" element={<Result />} />
				<Route path="/results" element={<Results />} />
				<Route path="/create" element={<Create />} />
				<Route path="/manage" element={<Manage />} />
				<Route path="/help" element={<Help />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</>
	);
}
