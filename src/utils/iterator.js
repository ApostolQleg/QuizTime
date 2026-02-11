/**
 * Iterator with Timeout
 *
 * Consumes an iterator for a limited time
 */
export function consumeIteratorWithTimeout(iterator, durationMs, onTick, onFinish) {
	const startTime = Date.now();

	const intervalId = setInterval(() => {
		const elapsed = Date.now() - startTime;
		const progress = Math.min(elapsed / durationMs, 1);

		if (progress >= 1) {
			clearInterval(intervalId);
			const finalValue = iterator.next().value;
			if (onFinish) onFinish(finalValue);
			return;
		}

		const nextValue = iterator.next().value;

		if (onTick) onTick(nextValue, progress);
	}, 50);

	return () => clearInterval(intervalId);
}
