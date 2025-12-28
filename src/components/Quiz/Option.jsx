import Radio from "../UI/Radio.jsx";

export default function Option({ id, name, text, value, disabled, onChange }) {
	return (
		<div className="flex flex-row gap-2">
			<Radio id={id} name={name} value={value} disabled={disabled} onChange={onChange} />
			<label htmlFor={id}>{text}</label>
		</div>
	);
}
