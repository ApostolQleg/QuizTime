export function* colorGenerator() {
	while (true) {
		const hue = Math.floor(Math.random() * 361);
		const color = `hsl(${hue}, 90%, 55%)`;
		yield color;
	}
}
