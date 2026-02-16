import { API_URL, getHeaders } from "./api.js";

export async function verifySession() {
	const res = await fetch(`${API_URL}/user`, {
		method: "GET",
		headers: getHeaders(),
	});

	const json = await res.json();
	if (!res.ok) throw new Error("Session invalid");
	return json;
}

export async function deleteUser() {
	const headers = getHeaders();
	delete headers["Content-Type"];

	const res = await fetch(`${API_URL}/user/delete`, {
		method: "DELETE",
		headers: headers,
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || "Failed to delete user");
	return json;
}

export async function updateUser(data) {
	const res = await fetch(`${API_URL}/user/update`, {
		method: "PUT",
		headers: getHeaders(),
		body: JSON.stringify(data),
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || "Failed to update user");
	return json;
}

export async function changePassword(data) {
	const res = await fetch(`${API_URL}/user/password`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify(data),
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || "Failed to change password");
	return json;
}
