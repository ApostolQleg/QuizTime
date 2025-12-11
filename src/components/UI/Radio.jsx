export default function Radio({ label, className = "", id, name, ...props }) {
	return (
		<div className={className}>
			<input type="radio" id={id} name={name} {...props} />
			<label htmlFor={id}>{label}</label>
		</div>
	);
}
