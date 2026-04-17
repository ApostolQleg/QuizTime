export default function Input({ type = "text", placeholder, className = "", image, ...props }) {
	return (
		<div className="relative w-full">
			{image && (
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<img src={image} alt="icon" className="w-6 h-6 object-contain" />
				</div>
			)}

			<input
				type={type}
				placeholder={placeholder}
				className={`input ${className} ${image ? "pl-11!" : ""} `}
				{...props}
			/>
		</div>
	);
}
