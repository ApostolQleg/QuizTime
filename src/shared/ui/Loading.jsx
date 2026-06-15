export default function Loading({ message = "Loading...", className = "" }) {
	return (
		<div
			className={`flex-1 flex items-center justify-center text-(--col-text-main) text-xl font-bold animate-pulse ${className}`}
		>
			{message}
		</div>
	);
}
