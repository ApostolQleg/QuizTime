import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useAuthActions, useAuthSessionState } from "@/features/auth/hooks/useAuth.js";
import useAutoReload from "@/shared/hooks/useAutoReload.js";
import CleanLayout from "./layouts/CleanLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

const Create = lazy(() => import("@/pages/Create.jsx"));
const Manage = lazy(() => import("@/pages/Manage.jsx"));
const Help = lazy(() => import("@/pages/Help.jsx"));
const Login = lazy(() => import("@/pages/Login.jsx"));
const MyQuizzes = lazy(() => import("@/pages/MyQuizzes.jsx"));
const NotFound = lazy(() => import("@/pages/NotFound.jsx"));
const Profile = lazy(() => import("@/pages/Profile.jsx"));
const Quiz = lazy(() => import("@/pages/Quiz.jsx"));
const Quizzes = lazy(() => import("@/pages/Quizzes.jsx"));
const Register = lazy(() => import("@/pages/Register.jsx"));
const Result = lazy(() => import("@/pages/Result.jsx"));
const Results = lazy(() => import("@/pages/Results.jsx"));
const Settings = lazy(() => import("@/pages/Settings.jsx"));
const Welcome = lazy(() => import("@/pages/Welcome.jsx"));

const ProtectedRoute = ({ token, children }) => {
	if (!token) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default function AppRoutes() {
	const { token } = useAuthSessionState();
	const { checkSession } = useAuthActions();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname) {
			window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}
	}, [location.pathname]);

	useEffect(() => {
		if (!token) return;

		checkSession().then((ok) => {
			if (!ok) {
				console.log("User no longer exists or token expired. Logged out.");
			}
		});
	}, [token, checkSession]);

	const handleSoftRefresh = () => {
		if (token) {
			checkSession({ force: true });
		}
	};

	useAutoReload(handleSoftRefresh);

	return (
		<div className="flex-1 flex flex-col w-full">
			<Suspense
				fallback={
					<div className="flex-1 flex items-center justify-center text-(--col-text-main)"></div>
				}
			>
				<Routes>
					<Route element={<CleanLayout />}>
						<Route path="/" element={<Welcome />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="*" element={<NotFound />} />
					</Route>

					<Route
						element={
							<ProtectedRoute token={token}>
								<MainLayout />
							</ProtectedRoute>
						}
					>
						<Route path="/quizzes" element={<Quizzes />} />
						<Route path="/my-quizzes" element={<MyQuizzes />} />
						<Route path="/results" element={<Results />} />
						<Route path="/quiz/:quizId" element={<Quiz />} />
						<Route path="/result/:quizId/:resultIdParam" element={<Result />} />
						<Route path="/create" element={<Create />} />
						<Route path="/manage/:quizId" element={<Manage />} />
						<Route path="/help" element={<Help />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/user/:userId" element={<Profile />} />
					</Route>
				</Routes>
			</Suspense>
		</div>
	);
}
