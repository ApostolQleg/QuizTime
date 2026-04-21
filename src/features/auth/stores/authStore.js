import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { verifySession } from "@/features/profile/api/user.api.js";
import { isTokenExpired } from "@/shared/libs/jwt.js";

let sessionCheckPromise = null;
let sessionCheckedToken = null;

const getStoredUser = () => {
	try {
		const savedUser = localStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	} catch (error) {
		console.error("Error parsing user from local storage", error);
		return null;
	}
};

const getStoredToken = () => localStorage.getItem("token") || null;

const persistAuth = (user, token) => {
	if (user) {
		localStorage.setItem("user", JSON.stringify(user));
	} else {
		localStorage.removeItem("user");
	}

	if (token) {
		localStorage.setItem("token", token);
	} else {
		localStorage.removeItem("token");
	}
};

export const useAuthStore = create((set, get) => ({
	user: getStoredUser(),
	token: getStoredToken(),
	isSessionChecking: false,
	actions: {
		login: (userData, authToken) => {
			persistAuth(userData, authToken);
			sessionCheckedToken = authToken;
			set({ user: userData, token: authToken });
		},

		logout: () => {
			sessionCheckPromise = null;
			sessionCheckedToken = null;
			persistAuth(null, null);
			set({ user: null, token: null, isSessionChecking: false });
		},

		checkSession: async ({ force = false } = {}) => {
			const { token, actions } = get();

			if (!token) return false;
			if (isTokenExpired(token)) {
				actions.logout();
				return false;
			}

			if (!force && sessionCheckedToken === token) return true;

			if (sessionCheckPromise) return sessionCheckPromise;

			set({ isSessionChecking: true });
			const requestToken = token;

			const currentPromise = verifySession()
				.then((data) => {
					if (get().token !== requestToken) {
						return false;
					}

					if (data?.user) {
						persistAuth(data.user, requestToken);
						set({ user: data.user });
					}
					sessionCheckedToken = requestToken;
					return true;
				})
				.catch(() => {
					if (get().token !== requestToken) {
						return false;
					}

					actions.logout();
					return false;
				})
				.finally(() => {
					if (sessionCheckPromise === currentPromise) {
						sessionCheckPromise = null;
					}

					if (get().token === requestToken) {
						set({ isSessionChecking: false });
					}
				});

			sessionCheckPromise = currentPromise;
			return currentPromise;
		},
	},
}));

export const useAuthUserState = () =>
	useAuthStore(
		useShallow((state) => ({
			user: state.user,
		})),
	);

export const useAuthSessionState = () =>
	useAuthStore(
		useShallow((state) => ({
			token: state.token,
			isSessionChecking: state.isSessionChecking,
		})),
	);

export const useAuthActions = () => useAuthStore.getState().actions;

export default useAuthStore;
