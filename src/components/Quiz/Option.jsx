import Radio from "../UI/Radio.jsx";

export default function Option({ id, name, text, value, isResultPage, onChange, isCorrect, selected }) {
	return (
		<div className={(isResultPage && isCorrect ? "option-true" : (isResultPage && selected ? "option-false" : "flex flex-row gap-2"))}>
			<Radio id={id} name={name} value={value} disabled={isResultPage} onChange={onChange} />
			<label htmlFor={id}>{text}</label>
		</div>
	);
}