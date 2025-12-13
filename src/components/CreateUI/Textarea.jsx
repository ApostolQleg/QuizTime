export default function Textarea({ placeholder, className = "", ...props }) {
	return (
		<>
			<textarea
				placeholder={placeholder}
				className={`${className} input`}
				{...props}
				onChange={(area) => {
					area.target.style.height = area.target.scrollHeight + "px";
				}}
			/>
		</>
	);
}
