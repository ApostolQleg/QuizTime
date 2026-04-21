import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import useAutoReload from "@/shared/hooks/useAutoReload.js";
import { useAuthActions, useAuthSessionState } from "@/features/auth/hooks/useAuth.js";

import Quizzes from "@/pages/Quizzes.jsx";
import Results from "@/pages/Results.jsx";
import MyQuizzes from "@/pages/MyQuizzes.jsx";
import Help from "@/pages/Help.jsx";
import Quiz from "@/pages/Quiz.jsx";
import Edit from "@/pages/Edit.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import Profile from "@/pages/Profile.jsx";
import NotFound from "@/pages/NotFound.jsx";
import PublicProfile from "@/pages/PublicProfile.jsx";

export default function AppRoutes() {
	const { token } = useAuthSessionState();
	const { checkSession } = useAuthActions();

	const [refreshKey, setRefreshKey] = useState(0);

	const handleSoftRefresh = () => {
		setRefreshKey((prev) => prev + 1);
	};

	useAutoReload(handleSoftRefresh);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, []);

	useEffect(() => {
		if (!token) return;

		checkSession().then((ok) => {
			if (!ok) {
				console.log("User no longer exists or token expired. Logged out.");
			}
		});
	}, [token, checkSession]);

	return (
		<div key={refreshKey} className="flex-1 flex flex-col w-full">
			<Routes>
				<Route exact path="/" element={<Quizzes />} />
				<Route path="/my-quizzes" element={<MyQuizzes />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/results" element={<Results />} />
				<Route path="/help" element={<Help />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/quiz/:quizId" element={<Quiz />} />
				<Route path="/result/:quizId/:resultIdParam" element={<Quiz />} />
				<Route path="/create" element={<Edit />} />
				<Route path="/manage/:quizId" element={<Edit />} />
				<Route path="/user/:userId" element={<PublicProfile />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}
