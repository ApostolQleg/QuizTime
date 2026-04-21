import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuthActions, useAuthSessionState } from "@/features/auth/hooks/useAuth.js";
import { AUTO_RELOAD_CONFIG } from "@/shared/config/config.js";

export default function useAutoReload(onRefresh, timeoutMs = AUTO_RELOAD_CONFIG.TIME_OUT_MS) {
	const lastLeaveTime = useRef(null);
	const location = useLocation();
	const { token } = useAuthSessionState();
	const { checkSession } = useAuthActions();

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

						if (!token) return;

						checkSession({ force: true }).then((ok) => {
							if (!ok) {
								console.log("User deleted or session invalid. Logged out.");
								return;
							}

							console.log("Session verified. Updating data...");
							if (onRefresh) onRefresh();
						});
					}
				}
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [timeoutMs, location.pathname, token, checkSession, onRefresh]);
}
