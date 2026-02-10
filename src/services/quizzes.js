import { API_URL, getHeaders } from "./api";

export async function getQuizzesList(skip = 0, limit = 36) {
	const res = await fetch(`${API_URL}/quizzes?skip=${skip}&limit=${limit}`, {
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
