import client from "@/shared/api/apiClient.js";
import { LogLevel, withLogger } from "@/shared/libs/logger.js";

function rawGetResults(skip = 0, limit = 36, search = "", sort = "newest") {
	return client.get("/results", {
		params: {
			skip,
			limit,
			sort,
			search: search || undefined,
		},
	});
}

const rawGetResultById = (id) => client.get(`/results/${id}`);

async function rawSaveResult(resultData) {
	try {
		return await client.post("/results", resultData);
	} catch (error) {
		if (error.status === 403) {
			console.warn("User not logged in, result not saved");
		}
		throw error;
	}
}

export const getResults = withLogger(rawGetResults, {
	level: LogLevel.INFO,
	actionName: "getResults",
	format: "json",
});

export const getResultById = withLogger(rawGetResultById, {
	level: LogLevel.INFO,
	actionName: "getResultById",
	format: "json",
});

export const saveResult = withLogger(rawSaveResult, {
	level: LogLevel.INFO,
	actionName: "saveResult",
	format: "json",
});
