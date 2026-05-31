import client from "@/shared/api/apiClient.js";
import { LogLevel, withLogger } from "@/shared/libs/logger.js";

const rawGetQuizList = (skip = 0, limit = 36, search = "", sort = "newest", authorId = "") => {
	return client.get("/quizzes", {
		params: {
			skip,
			limit,
			sort,
			search: search || undefined,
			authorId: authorId || undefined,
		},
	});
};

const rawCreateQuiz = async (data) => {
	const response = await client.post("/quizzes", data);
	invalidateQuizListCache();
	return response;
};

const rawUpdateQuiz = async (id, data) => {
	const response = await client.put(`/quizzes/${id}`, data);
	invalidateQuizCache(id);
	invalidateQuizListCache();
	return response;
};

const rawDeleteQuiz = async (id) => {
	const response = await client.delete(`/quizzes/${id}`);
	invalidateQuizCache(id);
	invalidateQuizListCache();
	return response;
};

const quizCache = new Map();

export const invalidateQuizCache = (id) => {
	if (quizCache.has(id)) {
		quizCache.delete(id);
		console.log(`[Proxy] Delete quiz ${id} from cache`);
	}
};

const rawGetQuizById = (id) => client.get(`/quizzes/${id}`);

const proxiedGetQuizById = new Proxy(rawGetQuizById, {
	apply: async (target, thisArg, argList) => {
		const id = argList[0];

		if (quizCache.has(id)) {
			console.log(`[Proxy] Load quiz ${id} from cache`);
			return quizCache.get(id);
		}

		console.log(`[Proxy] Load quiz ${id} from server`);
		const response = await target.apply(thisArg, argList);

		quizCache.set(id, response);
		return response;
	},
});

const quizListCache = new Map();

export const invalidateQuizListCache = () => {
	if (quizListCache.size > 0) {
		quizListCache.clear();
	}
};

const proxiedGetQuizList = new Proxy(rawGetQuizList, {
	apply: async (target, thisArg, argList) => {
		const cacheKey = JSON.stringify(argList);

		if (quizListCache.has(cacheKey)) {
			console.log(`[Proxy] Load quiz list from cache (Key: ${cacheKey})`);
			return quizListCache.get(cacheKey);
		}

		console.log(`[Proxy] Load quiz list from server`);
		const response = await target.apply(thisArg, argList);

		quizListCache.set(cacheKey, response);
		return response;
	},
});

export const getQuizList = withLogger(proxiedGetQuizList, {
	level: LogLevel.INFO,
	actionName: "getQuizList",
});

export const createQuiz = withLogger(rawCreateQuiz, {
	level: LogLevel.DEBUG,
	actionName: "createQuiz",
});

export const getQuizById = withLogger(proxiedGetQuizById, {
	level: LogLevel.INFO,
	actionName: "getQuizById",
});

export const updateQuiz = withLogger(rawUpdateQuiz, {
	level: LogLevel.INFO,
	actionName: "updateQuiz",
});

export const deleteQuiz = withLogger(rawDeleteQuiz, {
	level: LogLevel.ERROR,
	actionName: "deleteQuiz",
});
