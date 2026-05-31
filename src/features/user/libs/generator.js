export function* generator() {
	while (true) {
		const hue = Math.floor(Math.random() * 361);
		yield hue;
	}
}
