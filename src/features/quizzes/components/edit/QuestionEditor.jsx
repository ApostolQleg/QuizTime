import Option from "./OptionEditor.jsx";
import Input from "../../../../shared/ui/Input.jsx";
import Button from "../../../../shared/ui/Button.jsx";

export default function Question({
	id,
	text,
	index,
	errors,
	options,
	onDelete,
	onChange,
	onCorrect,
	onOptionAdd,
	onOptionDelete,
	onOptionChange,
}) {
	return (
		<div
			className={`w-full bg-(--col-bg-input-darker) p-4 rounded-2xl flex flex-col gap-3 border border-(--col-border) ${errors?.hasRadioError ? "error" : ""}`}
			id={id}
		>
			<div className="flex flex-row justify-between items-center border-b border-(--col-border) pb-2">
				<div className="text-(--col-text-muted) font-bold tracking-wide ml-2">
					Question {index + 1}
				</div>
				<Button onClick={onDelete}>Delete</Button>
			</div>

			<div className="flex flex-row justify-between items-center">
				<Input
					placeholder="Enter question text here..."
					className={`m-2 w-3/4 ${errors?.hasError ? "error" : ""}`}
					value={text}
					onChange={onChange}
				/>
			</div>

			{options.map((option) => (
				<Option
					id={option.id}
					key={option.id}
					name={id}
					text={option.text}
					errors={errors.options?.[option.id] || {}}
					onDelete={() => onOptionDelete(option.id)}
					onChange={(e) => onOptionChange(option.id, e.target.value)}
					isCorrect={option.isCorrect}
					onCorrect={() => onCorrect(option.id)}
				/>
			))}
			<Button onClick={onOptionAdd} className="self-start mt-1">
				Add Option
			</Button>
		</div>
	);
}
