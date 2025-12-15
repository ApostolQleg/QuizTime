import Radio from "../UI/Radio.jsx";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";

export default function Option({
	id,
	name,
	text,
	errors,
	onDelete,
	onChange,
	isCorrect,
	onCorrect,
}) {
	return (
		<>
			<div id={id} className="flex flex-row gap-3 items-center">
				<Radio
					id={`q${name}-o${id}`}
					name={`q${name}`}
					checked={isCorrect}
					onChange={onCorrect}
				/>
				<Input
					placeholder="Enter option text here..."
					className={`${errors?.hasError ? "input-error" : ""}`}
					value={text}
					onChange={onChange}
				/>
				<Button onClick={onDelete}>Delete</Button>
			</div>
		</>
	);
}
