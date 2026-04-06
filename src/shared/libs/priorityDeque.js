export class PriorityDeque {
	constructor() {
		this.items = [];
	}

	enqueue(item, priority = 0) {}

	dequeue(type = "oldest") {}

	peek(type = "oldest") {}

	get size() {
		return this.items.length;
	}

	isEmpty() {
		return this.size === 0;
	}
}
