import client from "@/shared/api/client.js";
import Memoizer from "@/shared/libs/memoizer.js";

const cache = new Memoizer();

function getAllQuizzes(skip = 0, limit = 36, search = "", sort = "newest", authorId = "") {
	const params = new URLSearchParams({ skip: String(skip), limit: String(limit), sort });
	if (search) params.append("search", search);
	if (authorId) params.append("authorId", authorId);

	return client.get(`/quizzes?${params.toString()}`);
}

export const getQuizzes = cache.memoize(getAllQuizzes, 180000);

export const createQuiz = (data) => client.post("/quizzes", data);

const getQuiz = (id) => client.get(`/quizzes/${id}`);

export const getQuizById = cache.memoize(getQuiz);

export const clearAllQuizzesCache = () => cache.clearAll();

export const updateQuiz = (id, data) => client.put(`/quizzes/${id}`, data);

export const deleteQuiz = (id) => client.delete(`/quizzes/${id}`);
