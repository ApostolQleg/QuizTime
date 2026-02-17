import { AUTH_URL, getHeaders } from "./api.js";

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
	const res = await fetch(`${AUTH_URL}/google`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token: credential }),
	});

	const json = await res.json();
	if (!res.ok) {
		if (res.status === 404) {
			throw new Error("USER_NOT_FOUND");
		}
		throw new Error(json.error || "Google login failed");
	}
	return json;
}

export async function extractGoogleData(credential) {
	const res = await fetch(`${AUTH_URL}/google-extract`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token: credential }),
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || "Failed to extract Google data");
	return json;
}

export async function sendVerificationCode(email) {
	const res = await fetch(`${AUTH_URL}/send-code`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || "Failed to send verification code");
	return json;
}

export async function linkGoogleAccount(credential) {
	const res = await fetch(`${AUTH_URL}/link-google`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify({ token: credential }),
	});

	const json = await res.json();
	if (!res.ok) throw new Error(json.error || "Failed to link Google account");
	return json;
}
