import { colorGenerator } from "./colorGenerator.js";
import { consumeIteratorWithTimeout } from "./iterator.js";

/**
 * Explosion Animation
 *
 * Creates a colorful explosion effect for a limited time
 */
export function startExplosionAnimation(onUpdateReactState, onFinishReactState) {
	const colorIterator = colorGenerator();

	return consumeIteratorWithTimeout(
		colorIterator,
		2000,
		(color, progress) => {
			const oscillation = Math.sin(progress * Math.PI * 10) * (1 - progress);
			const scale = 1 + Math.abs(oscillation);

			onUpdateReactState(color, scale);
		},
		(finalColor) => {
			onFinishReactState(finalColor);
		},
	);
}
