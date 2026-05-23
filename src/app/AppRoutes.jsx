import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthActions, useAuthSessionState } from "@/features/auth/hooks/useAuth.js";
import Edit from "@/pages/Edit.jsx";
import Help from "@/pages/Help.jsx";
import Login from "@/pages/Login.jsx";
import MyQuizzes from "@/pages/MyQuizzes.jsx";
import NotFound from "@/pages/NotFound.jsx";
import Profile from "@/pages/Profile.jsx";
import Quiz from "@/pages/Quiz.jsx";
import Quizzes from "@/pages/Quizzes.jsx";
import Register from "@/pages/Register.jsx";
import Result from "@/pages/Result.jsx";
import Results from "@/pages/Results.jsx";
import Settings from "@/pages/Settings.jsx";
import Welcome from "@/pages/Welcome.jsx";
import useAutoReload from "@/shared/hooks/useAutoReload.js";
import CleanLayout from "./layouts/CleanLayout";
import MainLayout from "./layouts/MainLayout";

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
				<Route element={<CleanLayout />}>
					<Route exact path="/" element={<Welcome />} />{" "}
					<Route path="*" element={<NotFound />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route element={<MainLayout />}>
					<Route path="/help" element={<Help />} />
					<Route path="/quizzes" element={<Quizzes />} />
					<Route path="/my-quizzes" element={<MyQuizzes />} />
					<Route path="/results" element={<Results />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/quiz/:quizId" element={<Quiz />} />{" "}
					<Route path="/result/:quizId/:resultIdParam" element={<Result />} />
					<Route path="/create" element={<Edit />} />
					<Route path="/manage/:quizId" element={<Edit />} />
					<Route path="/user/:userId" element={<Profile />} />
				</Route>
			</Routes>
		</div>
	);
}
