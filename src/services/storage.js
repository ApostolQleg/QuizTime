const API_URL = "https://quiztime-react-backend.vercel.app/api";

// QUIZES SERVICES

export async function getQuizzesList(page = 1, limit = 6) {
	const res = await fetch(`${API_URL}/quizzes?page=${page}&limit=${limit}`);
	if (!res.ok) throw new Error("Failed to load quizzes");
	return await res.json();
}

export async function createQuiz(data) {
	const res = await fetch(`${API_URL}/quizzes`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Failed to create quiz");
	return await res.json();
}

export async function getQuizById(id) {
	const res = await fetch(`${API_URL}/quizzes/${id}`);
	if (!res.ok) throw new Error("Failed to load quiz details");
	return await res.json();
}

export async function updateQuiz(id, data) {
	const res = await fetch(`${API_URL}/quizzes/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error("Failed to update quiz");
	return await res.json();
}

export async function deleteQuiz(id) {
	const res = await fetch(`${API_URL}/quizzes/${id}`, {
		method: "DELETE",
	});
	if (!res.ok) throw new Error("Failed to delete quiz");
	return await res.json();
}

// RESULTS SERVICES

export async function getResults() {
	const res = await fetch(`${API_URL}/results`);
	if (!res.ok) throw new Error("Failed to load results");
	return await res.json();
}

export async function getResultById(id) {
	const res = await fetch(`${API_URL}/results/${id}`);
	if (!res.ok) throw new Error("Failed to load result details");
	return await res.json();
}

export async function saveResult(resultData) {
	const res = await fetch(`${API_URL}/results`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(resultData),
	});

	if (!res.ok) {
		throw new Error("Failed to save result");
	}

	return await res.json();
}
