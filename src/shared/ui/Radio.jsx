export default function Radio({
	label,
	className = "",
	id,
	name,
	checked = null,
	onChange = () => {},
	...props
}) {
	return (
		<div className={`${className} flex items-center gap-2 cursor-pointer`}>
			<input
				type="radio"
				id={id}
				name={name}
				checked={checked}
				onChange={onChange}
				className="accent-(--col-primary) w-4 h-4 cursor-pointer"
				{...props}
			/>
			<label htmlFor={id} className="cursor-pointer text-(--col-text-main)">
				{label}
			</label>
		</div>
	);
}
