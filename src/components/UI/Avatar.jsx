import { useState } from "react";

export default function Avatar({ src, name, type = "google", color, size = "md", className = "" }) {
	const [error, setError] = useState(false);

	const sizeClasses = {
		sm: "w-8 h-8 text-xs",
		md: "w-10 h-10 text-sm",
		lg: "w-20 h-20 text-2xl",
		xl: "w-32 h-32 text-4xl",
	};

	if (type === "generated" || !src || error) {
		const finalColor = color || "var(--col-primary)";

		return (
			<div
				className={`${sizeClasses[size]} ${className} rounded-full shadow-md border border-(--col-border)`}
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
			className={`${sizeClasses[size]} ${className} rounded-full object-cover bg-(--col-bg-input) border border-(--col-border)`}
			referrerPolicy="no-referrer"
			onError={() => setError(true)}
		/>
	);
}
