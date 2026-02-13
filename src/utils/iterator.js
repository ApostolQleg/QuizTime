/**
 * AnimationSequence implements the Iterable Protocol using Symbol.iterator.
 */
export class AnimationSequence {
	constructor(generator, durationMs) {
		this.generator = generator;
		this.durationMs = durationMs;
	}

	[Symbol.iterator]() {
		const startTime = Date.now();
		const gen = this.generator;
		const duration = this.durationMs;

		return {
			next: () => {
				const now = Date.now();
				const elapsed = now - startTime;

				const progress = Math.min(elapsed / duration, 1);

				const { value: color } = gen.next();

				const value = {
					color,
					progress,
					isFinished: progress >= 1,
				};

				if (progress >= 1) {
					return { done: true, value };
				}

				return { done: false, value };
			},
		};
	}
}
