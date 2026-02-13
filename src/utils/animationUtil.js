import { colorGenerator } from "./colorGenerator.js";
import { AnimationSequence } from "./iterator.js";

/**
 * Explosion Animation using the custom Iterable Class
 * @param {function} onUpdateReactState - Callback to update React state with current color and scale
 * @param {function} onFinishReactState - Callback to update React state when animation finishes
 * @returns {function} A cleanup function to stop the animation
 */
export function startExplosionAnimation(onUpdateReactState, onFinishReactState) {
	const colorSource = colorGenerator();

	const animationSequence = new AnimationSequence(colorSource, 2000);

	const iterator = animationSequence[Symbol.iterator]();

	const intervalId = setInterval(() => {
		const { value, done } = iterator.next();
		const { color, progress } = value;

		if (done) {
			clearInterval(intervalId);
			onFinishReactState(color);
			return;
		}

		const oscillation = Math.sin(progress * Math.PI * 6) * (1 - progress);
		const scale = 1 + Math.abs(oscillation) * 0.5;

		onUpdateReactState(color, scale);
	}, 50); // 20 FPS

	return () => clearInterval(intervalId);
}
