export default function Radio({ label, className = "", ...props }) {
	return (
		<div className={className}>
			<input type="radio" {...props} />
			<label className={"radio-label"} htmlFor={props.id}>
				{label}
			</label>
		</div>
	);
}
