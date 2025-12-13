export default function Input({ placeholder, className = "", ...props }) {
	return (
		<>
			<input type="text" placeholder={placeholder} className={`${className} input`} {...props} />
		</>
	);
}
