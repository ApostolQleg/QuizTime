import { API_URL, getHeaders } from "./api.js";

export async function getQuizzes(skip = 0, limit = 36, search = "") {
	const params = new URLSearchParams({
		skip: String(skip),
		limit: String(limit),
	});
	if (search !== "") {
		params.append("search", search);
	}
	const res = await fetch(`${API_URL}/quizzes?${params.toString()}`, {
		headers: getHeaders(),
	});

	const json = await res.json();
	if (!res.ok) throw new Error("Failed to load quizzes");
	return json;
}

export async function createQuiz(data) {
	const res = await fetch(`${API_URL}/quizzes`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify(data),
	});

	const json = await res.json();
	if (!res.ok) throw new Error("Failed to create quiz");
	return json;
}

export async function getQuizById(id) {
	const res = await fetch(`${API_URL}/quizzes/${id}`, {
		headers: getHeaders(),
	});

	const json = await res.json();
	if (!res.ok) throw new Error("Failed to load quiz details");
	return json;
}

export async function updateQuiz(id, data) {
	const res = await fetch(`${API_URL}/quizzes/${id}`, {
		method: "PUT",
		headers: getHeaders(),
		body: JSON.stringify(data),
	});

	const json = await res.json();
	if (!res.ok) throw new Error("Failed to update quiz");
	return json;
}

export async function deleteQuiz(id) {
	const headers = getHeaders();
	delete headers["Content-Type"];

	const res = await fetch(`${API_URL}/quizzes/${id}`, {
		method: "DELETE",
		headers: headers,
	});

	const json = await res.json();
	if (!res.ok) throw new Error("Failed to delete quiz");
	return json;
}
