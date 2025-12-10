import { defaultQuizzes } from "./default-quizzes.js";

const STORAGE_KEY = "storage";

// Initialize storage if not present
export function initStorage() {
	if (!localStorage.getItem(STORAGE_KEY)) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuizzes));
	}
}

// Getting all quizzes (always fresh data)
export function getStorage() {
	initStorage();
	const storage = localStorage.getItem(STORAGE_KEY);
	return storage ? JSON.parse(storage) : [];
}

// Setting all quizzes
export function setStorage(data, key) {
	const storage = getStorage();
	storage[key].push(data);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}
