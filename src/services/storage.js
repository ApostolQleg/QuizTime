const API_URL = "http://localhost:3000/api";
// const API_URL = "https://quiztime-react-backend.vercel.app/api";

const AUTH_URL = API_URL.replace("/api", "/auth");

// --- Headers ---
function getHeaders() {
	const headers = { "Content-Type": "application/json" };
	const token = localStorage.getItem("token");
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	return headers;
}

// --- Auth Services ---

export async function registerUser(data) {
	const res = await fetch(`${AUTH_URL}/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || "Registration failed");
	return json;
}

export async function loginUser(data) {
	const res = await fetch(`${AUTH_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || "Login failed");
	return json;
}

export async function loginWithGoogle(credential) {
	const AUTH_URL = API_URL.replace("/api", "/auth");

	const res = await fetch(`${AUTH_URL}/google`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token: credential }),
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || "Google login failed");
	return json;
}

// --- Quizzes Services ---

export async function getQuizzesList() {
	const res = await fetch(`${API_URL}/quizzes`, {
		headers: getHeaders(),
	});
	if (!res.ok) throw new Error("Failed to load quizzes");
	return await res.json();
}

export async function createQuiz(data) {
	const res = await fetch(`${API_URL}/quizzes`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Failed to create quiz");
	return await res.json();
}

export async function getQuizById(id) {
	const res = await fetch(`${API_URL}/quizzes/${id}`, {
		headers: getHeaders(),
	});
	if (!res.ok) throw new Error("Failed to load quiz details");
	return await res.json();
}

export async function updateQuiz(id, data) {
	const res = await fetch(`${API_URL}/quizzes/${id}`, {
		method: "PUT",
		headers: getHeaders(),
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Failed to update quiz");
	return await res.json();
}

export async function deleteQuiz(id) {
	const res = await fetch(`${API_URL}/quizzes/${id}`, {
		method: "DELETE",
		headers: getHeaders(),
	});
	if (!res.ok) throw new Error("Failed to delete quiz");
	return await res.json();
}

// --- Results Services ---

export async function getResults() {
	const res = await fetch(`${API_URL}/results`, {
		headers: getHeaders(),
	});
	if (!res.ok) throw new Error("Failed to load results");
	return await res.json();
}

export async function getResultById(id) {
	const res = await fetch(`${API_URL}/results/${id}`, {
		headers: getHeaders(),
	});
	if (!res.ok) throw new Error("Failed to load result details");
	return await res.json();
}

export async function saveResult(resultData) {
	const res = await fetch(`${API_URL}/results`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify(resultData),
	});

	if (!res.ok) {
		if (res.status === 403) {
			console.warn("User not logged in, result not saved");
			return null;
		}
		throw new Error("Failed to save result");
	}

	return await res.json();
}
