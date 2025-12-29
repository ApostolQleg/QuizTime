import Option from "./Option.jsx";

export default function Question({ question, className, isResultPage, onOptionSelect, error, selected }) {
	const options = question.options;
	console.log(selected);
	return (
		<div className={error ? `quiz-error ${className}` : className}>
			{question.text}
			{options.map((option, index) => (
				<Option
					key={index}
					id={`${question.id}-${option.id}`}
					name={question.id}
					value={option.id}
					text={option.text}
					isResultPage={isResultPage}
					onChange={() => onOptionSelect(option.id)}
					isCorrect={option.isCorrect}
					selected={selected && selected[0] === option.id}
				/>
			))}
		</div>
	);
}
