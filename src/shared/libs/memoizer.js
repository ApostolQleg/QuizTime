export default class Memoizer {
	constructor() {
		this.cache = new WeakMap();
	}

	memoize(fn, ttl = 30000, capacity = 50) {
		if (typeof fn !== "function") {
			throw new TypeError("Expected a function to memoize");
		}

		return (...args) => {
			const key = JSON.stringify(args);
			let cache = this.cache.get(fn);
			if (!cache) {
				cache = new Map();
				this.cache.set(fn, cache);
			}

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

	clear(fn, ...args) {
		if (typeof fn !== "function") {
			return;
		}

		const cache = this.cache.get(fn);
		if (!cache) {
			return;
		}

		if (args.length === 0) {
			cache.clear();
			return;
		}

		const key = JSON.stringify(args);
		cache.delete(key);
	}

	clearAll() {
		this.cache = new WeakMap();
	}
}
