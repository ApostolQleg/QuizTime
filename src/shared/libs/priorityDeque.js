export class PriorityDeque {
	constructor() {
		this.items = [];
		this.count = 0;
	}

	get size() {
		return this.items.length;
	}

	isEmpty() {
		return this.size === 0;
	}

	toArray() {
		return this.items;
	}

	enqueue(item, priority = 0) {
		const newItem = { item, priority, order: this.count++ };
		let added = false;

		for (let i = 0; i < this.size; i++) {
			if (this.items[i].priority < newItem.priority) {
				this.items.splice(i, 0, newItem);
				added = true;
				break;
			}
		}

		if (!added) {
			this.items.push(newItem);
		}
	}

	_findIndex(type) {
		if (type === "highest") return 0;
		if (type === "lowest") return this.size - 1;

		let index = 0;

		if (type === "oldest") {
			for (let i = 1; i < this.size; i++) {
				if (this.items[i].order < this.items[index].order) {
					index = i;
				}
			}
			return index;
		}

		if (type === "newest") {
			for (let i = 1; i < this.size; i++) {
				if (this.items[i].order > this.items[index].order) {
					index = i;
				}
			}
			return index;
		}
		throw new TypeError(`Invalid type: "${type}". Expected: highest/lowest/newest/oldest`);
	}

	dequeue(type = "highest") {
		if (this.isEmpty()) return null;
		const index = this._findIndex(type);
		return this.items.splice(index, 1)[0].item;
	}

	peek(type = "highest") {
		if (this.isEmpty()) return null;
		const index = this._findIndex(type);
		return this.items[index].item;
	}
}
