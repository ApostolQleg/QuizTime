export default class Memoizer {
	constructor() {
		this.cache = new Map();
	}

	memoize(fn, ttl = 30000, capacity = 50) {
		return (...args) => {
			const key = JSON.stringify(args);
			const cache = this.cache;

			const now = Date.now();

			if (cache.has(key)) {
				const entry = cache.get(key);
				const { data, timestamp } = entry;

				if (now - timestamp <= ttl) {
					cache.delete(key);
					cache.set(key, entry);
					return data;
				}
				cache.delete(key);
			}

			const result = fn(...args);
			if (cache.size >= capacity) {
				const oldestKey = cache.keys().next().value;
				cache.delete(oldestKey);
			}
			cache.set(key, { data: result, timestamp: now });
			return result;
		};
	}

	clear(...args) {
		const key = JSON.stringify(args);
		this.cache.delete(key);
	}

	clearAll() {
		this.cache.clear();
	}
}
