export const LogLevel = {
	INFO: "INFO",
	DEBUG: "DEBUG",
	ERROR: "ERROR",
};

export const withLogger = (
	apiFunction,
	{ level = LogLevel.INFO, actionName = "API Call", format = "text" } = {},
) => {
	return async (...args) => {
		const timestamp = new Date().toISOString();
		const start = performance.now();

		const printLog = (msgLevel, message, data = undefined) => {
			if (format === "json") {
				console[msgLevel === "ERROR" ? "error" : "log"](
					JSON.stringify({ timestamp, level: msgLevel, action: actionName, message, data })
				);
			} else {
				if (data !== undefined) {
					console[msgLevel === "ERROR" ? "error" : "log"](`[${timestamp}] [${msgLevel}] ${message}`, data);
				} else {
					console[msgLevel === "ERROR" ? "error" : "log"](`[${timestamp}] [${msgLevel}] ${message}`);
				}
			}
		};

		if (level === LogLevel.DEBUG || level === LogLevel.INFO) {
			console.log(`[${timestamp}] [${level}] Input for ${actionName}:`, args);
		}

		try {
			const result = await apiFunction(...args);
			const executionTime = (performance.now() - start).toFixed(2);

			if (level === LogLevel.DEBUG) {
				const logData = result?.data !== undefined ? result.data : result;
				printLog(level, `Success (${executionTime}ms). Result:`, logData);
			} else if (level === LogLevel.INFO) {
				printLog(level, `Success (${executionTime}ms).`);
			}

			return result;
		} catch (error) {
			const executionTime = (performance.now() - start).toFixed(2);
			printLog("ERROR", `Failed (${executionTime}ms)`, error.message);
			throw error;
		}
	};
};
