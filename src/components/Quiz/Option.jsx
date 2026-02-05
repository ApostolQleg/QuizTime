import Radio from "../UI/Radio.jsx";

export default function Option({ id, name, text, value, disabled, onChange, isCorrect, selected }) {
	return (
		<div
			className={`${disabled ? (isCorrect ? "option-true" : selected ? "option-false" : "") : ""} flex flex-row gap-2 text-(--col-text-muted)`}
		>
			<Radio id={id} name={name} value={value} disabled={disabled} onChange={onChange} />
			<label htmlFor={id}>{text}</label>
		</div>
	);
}
