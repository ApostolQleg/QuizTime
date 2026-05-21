const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const getDateFromObjectId = (objectId) => {
	if (!objectId || typeof objectId !== "string") return null;
	if (!objectIdRegex.test(objectId)) return null;

	const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
	if (!Number.isFinite(timestamp)) return null;

	return new Date(timestamp);
};
