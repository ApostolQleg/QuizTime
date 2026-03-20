import { useState } from "react";
import { AuthContext } from "./AuthContext.jsx";

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		try {
			const savedUser = localStorage.getItem("user");
			return savedUser ? JSON.parse(savedUser) : null;
		} catch (error) {
			console.error("Error parsing user from local storage", error);
			return null;
		}
	});

	const [token, setToken] = useState(() => {
		return localStorage.getItem("token") || null;
	});

	const login = (userData, authToken) => {
		localStorage.setItem("user", JSON.stringify(userData));
		localStorage.setItem("token", authToken);
		setUser(userData);
		setToken(authToken);
	};

	const logout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUser(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
