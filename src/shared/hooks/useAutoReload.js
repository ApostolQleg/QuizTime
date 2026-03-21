import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth.js";
import { isTokenExpired } from "../libs/jwt.js";
import { verifySession } from "@/features/profile/api/user.api.js";
import { AUTO_RELOAD_CONFIG } from "@/constants/config.js";

export default function useAutoReload(onRefresh, timeoutMs = AUTO_RELOAD_CONFIG.TIME_OUT_MS) {
	const lastLeaveTime = useRef(null);
	const location = useLocation();
	const { token, logout } = useAuth();

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				lastLeaveTime.current = Date.now();
			} else if (document.visibilityState === "visible") {
				if (lastLeaveTime.current) {
					const now = Date.now();
					const timeAway = now - lastLeaveTime.current;

					const isEditing =
						location.pathname.startsWith("/create") ||
						location.pathname.startsWith("/manage");

					if (timeAway > timeoutMs) {
						if (isEditing) {
							console.log(
								"Welcome back. Session refresh ignored to protect unsaved work.",
							);
							return;
						}

						if (isTokenExpired(token)) {
							console.log("Token expired. Logging out...");
							logout();
							return;
						}

						verifySession()
							.then(() => {
								console.log("Session verified. Updating data...");
								if (onRefresh) onRefresh();
							})
							.catch(() => {
								console.log("User deleted or session invalid. Logging out...");
								logout();
							});
					}
				}
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [timeoutMs, location.pathname, token, logout, onRefresh]);
}
