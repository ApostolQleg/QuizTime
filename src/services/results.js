import { API_URL, getHeaders } from "./api";

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
