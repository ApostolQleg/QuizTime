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
		if (type === "end") return this.items.push(item);
		if (type === "start") return this.items.unshift(item);
		throw new TypeError(`Invalid type: "${type}". Expected: end/start`);
	}

	dequeue(type = "start") {
		if (this.isEmpty()) return null;
		if (type === "start") return this.items.shift(); 
		if (type === "end") return this.items.pop(); 
		throw new TypeError(`Invalid type: "${type}". Expected: end/start`);
	}

	peek(type = "start") {
		if (this.isEmpty()) return null;
		if (type === "start") return this.items[0];
		if (type === "end") return this.items[this.size - 1];
		throw new TypeError(`Invalid type: "${type}". Expected: end/start`);
	}
}
