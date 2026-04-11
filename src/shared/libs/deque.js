export class Deque {
	constructor() {
		this.items = [];
	}

	get size() {
		return this.items.length;
	}

	isEmpty() {
		return this.size === 0;
	}

	toArray() {
		return [...this.items];
	}

	enqueue(item, type = "end") {
		if (type === "end") this.items.push(item);
		else if (type === "start") this.items.unshift(item);
		else throw new TypeError(`Invalid type: "${type}". Expected: end/start`);
	}

	_findIndex(type) {
		if (type === "start") return 0;
		else if (type === "end") return this.size - 1;
		else throw new TypeError(`Invalid type: "${type}". Expected: end/start`);
	}

	dequeue(type = "end") {
		if (this.isEmpty()) return null;
		const index = this._findIndex(type);
		return this.items.splice(index, 1)[0];
	}

	peek(type = "end") {
		if (this.isEmpty()) return null;
		const index = this._findIndex(type);
		return this.items[index];
	}
}
