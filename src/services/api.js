// const API_URL = "http://localhost:3000/api";
export const API_URL = "https://quiztime-react-backend.vercel.app/api";
export const AUTH_URL = API_URL.replace("/api", "/auth");

export function getHeaders() {
	const headers = { "Content-Type": "application/json" };
	const token = localStorage.getItem("token");
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	return headers;
}
