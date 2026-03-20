// export const API_URL = "http://localhost:3000/api";
export const API_URL = import.meta.env.VITE_API_URL;
export const AUTH_URL = API_URL.replace("/api", "/auth");

export function getHeaders() {
	const headers = { "Content-Type": "application/json" };
	const token = localStorage.getItem("token");
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	return headers;
}
