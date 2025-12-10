export default function Textarea({ placeholder, className = "", ...props }) {
	return (
		<>
			<textarea
				placeholder={placeholder}
				className={className}
				{...props}
				onChange={(area) => {
					area.target.style.height = "auto";
					area.target.style.height = area.target.scrollHeight + "px";
				}}
			/>
		</>
	);
}
