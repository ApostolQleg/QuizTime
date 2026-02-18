import { useState, useRef, useEffect } from "react";
import { startColorAnimation } from "../../utils/animationUtil.js";
// import { startColorAnimation } from "../../utils/iterator.js";
import { generator } from "../../utils/generator.js";
import Button from "../UI/Button.jsx";

export default function ColorGenerator({ onColorSelect, initialColor }) {
	const [displayColor, setDisplayColor] = useState(initialColor);
	const [scale, setScale] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);

	const stopAnimationRef = useRef(null);

	useEffect(() => {
		return () => {
			if (stopAnimationRef.current) stopAnimationRef.current();
		};
	}, []);

	const handleGenerate = () => {
		if (isAnimating) return;
		setIsAnimating(true);

		stopAnimationRef.current = startColorAnimation(
			(color, currentScale) => {
				setDisplayColor(color);
				setScale(currentScale);
			},
			(finalColor) => {
				setDisplayColor(finalColor);
				setScale(1);
				setIsAnimating(false);
				onColorSelect(finalColor);
			},
			generator(),
			1000,
			displayColor,
		);
	};

	return (
		<div className="flex flex-col items-center gap-4 p-6 rounded-xl border border-(--col-border) bg-(--col-bg-input-darker)">
			<div className="relative w-20 h-20 flex items-center justify-center">
				<div
					className="w-20 h-20 rounded-full shadow-lg transition-transform duration-75 will-change-transform"
					style={{
						backgroundColor: displayColor,
						transform: `scale(${scale})`,
					}}
				/>
			</div>

			<Button
				type="button"
				onClick={handleGenerate}
				disabled={isAnimating}
				className="w-full mt-3"
			>
				{isAnimating ? "Generating..." : "Generate New Color"}
			</Button>
		</div>
	);
}
