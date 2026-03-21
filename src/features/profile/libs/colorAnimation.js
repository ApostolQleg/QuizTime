import getHue from "./getHue.js";
import { COLOR_ANIMATION_CONFIG } from "@/constants/config.js";

export function startColorAnimation(
	onUpdateReactState,
	onFinishReactState,
	iterator,
	duration = COLOR_ANIMATION_CONFIG.DURATION_MS,
	initialColor,
) {
	const startHue = getHue(initialColor);
	let targetHue = iterator.next().value;

	let delta = targetHue - startHue;

	if (Math.abs(delta) < 180) {
		delta = delta > 0 ? delta - 360 : delta + 360;
	}

	const finalDelta = targetHue - startHue;

	let startTime = null;
	let animationFrameId;

	const step = (timestamp) => {
		if (!startTime) startTime = timestamp;

		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / duration, 1);

		const currentHue = startHue + finalDelta * progress;

		const colorString = `hsl(${currentHue}, ${COLOR_ANIMATION_CONFIG.SATURATION}%, ${COLOR_ANIMATION_CONFIG.LIGHTNESS}%)`;

		const scale = 1 + Math.sin(progress * Math.PI) * 0.3;

		onUpdateReactState(colorString, scale);

		if (progress < 1) {
			animationFrameId = requestAnimationFrame(step);
		} else {
			const finalHue = targetHue % 360;
			const finalColorString = `hsl(${finalHue}, ${COLOR_ANIMATION_CONFIG.SATURATION}%, ${COLOR_ANIMATION_CONFIG.LIGHTNESS}%)`;
			onFinishReactState(finalColorString);
		}
	};

	animationFrameId = requestAnimationFrame(step);

	return () => cancelAnimationFrame(animationFrameId);
}
