import Option from "./Option.jsx";

export default function Question({ question, className, isResultPage, onOptionSelect, error }) {
	const options = question.options;
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
					disabled={isResultPage}
					onChange={() => onOptionSelect(option.id)}
				/>
			))}
		</div>
	);
}
