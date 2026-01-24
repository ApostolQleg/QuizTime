import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Edit from "./pages/Edit.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
	// Scroll to top on route change
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, [pathname]);

	// Main app layout with routing
	return (
		<div className="min-h-screen bg-[rgb(80,12,63)] text-[rgb(27,0,25)] flex flex-col flex-1">
			<Header />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/results" element={<Home />} />
				<Route path="/help" element={<Home />} />
				<Route path="/quiz/:quizId" element={<Quiz />} />
				<Route path="/result/:quizId/:resultIdParam" element={<Quiz />} />
				<Route path="/create" element={<Edit />} />
				<Route path="/manage/:quizId" element={<Edit />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}
