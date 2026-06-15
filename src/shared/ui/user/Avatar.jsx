import { useState } from "react";

const SIZE_CLASSES = {
	sm: "size-8 text-xs",
	md: "size-14 text-sm",
	lg: "size-20 text-2xl",
	xl: "size-32 text-4xl",
};

export default function Avatar({ src, name, type = "google", color, size = "md", className = "" }) {
	const [error, setError] = useState(false);

	if (type === "generated" || !src || error) {
		const finalColor = color || "var(--col-primary)";

		return (
			<div
				className={`${SIZE_CLASSES[size]} ${className} rounded-full shadow-md border border-(--col-border)`}
				style={{
					backgroundColor: finalColor,
					boxShadow: `0 0 10px ${finalColor}60`,
				}}
			/>
		);
	}

	const secureSrc = src.replace("http://", "https://");

	return (
		<img
			src={secureSrc}
			alt={name || "User avatar"}
			className={`${SIZE_CLASSES[size]} ${className} rounded-full object-cover bg-(--col-bg-input) border border-(--col-border)`}
			referrerPolicy="no-referrer"
			onError={() => setError(true)}
		/>
	);
}
