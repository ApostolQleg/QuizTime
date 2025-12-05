import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
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
		<div className="min-h-screen bg-[rgb(80,12,63)] text-[rgb(27,0,25)] flex flex-col flex-grow">
			<Header />
			<Routes>
				<Route exact path="/" element={<Quizzes />} />
				<Route path="/quiz/:quizId" element={<Quiz />} />
				<Route path="/result" element={<Result />} />
				<Route path="/results" element={<Results />} />
				<Route path="/create" element={<Create />} />
				<Route path="/manage" element={<Manage />} />
				<Route path="/help" element={<Help />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}
