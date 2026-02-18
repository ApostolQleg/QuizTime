export function startColorAnimation(
	onUpdateReactState,
	onFinishReactState,
	iterator,
	duration = 1000,
) {
	let startTime = null;
	let lastFlashTime = 0;
	let animationFrameId;
	const flashInterval = 100;

	const step = (timestamp) => {
		if (!startTime) startTime = timestamp;

		const elapsed = timestamp - startTime;

		if (timestamp - lastFlashTime > flashInterval) {
			const nextHue = iterator.next().value;
			const colorString = `hsl(${nextHue}, 90%, 55%)`;

			onUpdateReactState(colorString, 1.1);
			lastFlashTime = timestamp;
		}

		if (elapsed < duration) {
			animationFrameId = requestAnimationFrame(step);
		} else {
			const finalHue = iterator.next().value;
			onFinishReactState(`hsl(${finalHue}, 90%, 55%)`);
		}
	};

	animationFrameId = requestAnimationFrame(step);

	return () => cancelAnimationFrame(animationFrameId);
}
