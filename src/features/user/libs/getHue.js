export default function getHue(colorInput) {
	if (!colorInput) return 0;

	if (colorInput.startsWith("hsl")) {
		const match = colorInput.match(/hsl\((\d+(\.\d+)?)/);
		return match ? parseFloat(match[1]) : 0;
	}

	if (colorInput.startsWith("#")) {
		let hex = colorInput.replace("#", "");
		if (hex.length === 3)
			hex = hex
				.split("")
				.map((x) => x + x)
				.join("");

		const r = parseInt(hex.substring(0, 2), 16) / 255;
		const g = parseInt(hex.substring(2, 4), 16) / 255;
		const b = parseInt(hex.substring(4, 6), 16) / 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0;

		if (max !== min) {
			const d = max - min;
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}
			h /= 6;
		}
		return h * 360;
	}

	return 0;
}
