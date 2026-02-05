import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Edit from "./pages/Edit.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, [pathname]);

	return (
		<div className="min-h-screen flex flex-col flex-1 bg-(--col-bg-main) text-(--col-text-main)">
			<AuthProvider>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/results" element={<Home />} />
					<Route path="/help" element={<Home />} />
					<Route path="/quiz/:quizId" element={<Quiz />} />
					<Route path="/result/:quizId/:resultIdParam" element={<Quiz />} />
					<Route path="/create" element={<Edit />} />
					<Route path="/manage/:quizId" element={<Edit />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</AuthProvider>
		</div>
	);
}
