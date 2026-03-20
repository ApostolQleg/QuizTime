import Radio from "../../../../shared/ui/Radio.jsx";
import Button from "../../../../shared/ui/Button.jsx";
import Input from "../../../../shared/ui/Input.jsx";

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
			<div id={id} className="flex flex-row gap-3 items-center w-full">
				<Radio
					id={`q${name}-o${id}`}
					name={`q${name}`}
					checked={isCorrect}
					onChange={onCorrect}
				/>
				<Input
					placeholder="Enter option text here..."
					className={`flex-1 bg-(--col-bg-card) border-(--col-border) ${errors?.hasError ? "error" : ""}`}
					value={text}
					onChange={onChange}
				/>
				<Button onClick={onDelete}>Delete</Button>
			</div>
		</>
	);
}
