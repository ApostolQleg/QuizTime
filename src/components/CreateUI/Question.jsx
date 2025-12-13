import { useState } from "react";
import Input from "./Input.jsx";
import Option from "./Option.jsx";
import Button from "../UI/Button.jsx";

export default function Question({ id, onDelete }) {
	const [options, setOptions] = useState([
		{ id: 0, text: "Так" },
		{ id: 1, text: "Ні" },
	]);

	const handleAddOption = () => {
		const newId = options.length ? options[options.length - 1].id + 1 : 0;
		setOptions([...options, { id: newId, text: "" }]);
	};

	const handleOptionDelete = (id) => {
		setOptions(options.filter((option) => option.id !== id));
	};

	return (
		<div className="p-4 border border-gray-300 rounded flex flex-col gap-2" id={id}>
			<div className="flex flex-row justify-between items-center">
				<Input placeholder="Enter question text here..." className=" m-2 w-3/4" />
				<Button onClick={onDelete}>Delete</Button>
			</div>
			{options.map((option) => (
				<Option
					key={option.id}
					id={option.id}
					name={id}
					text={option.text}
					onDelete={() => handleOptionDelete(option.id)}
				/>
			))}
			<Button onClick={handleAddOption}>Add Option</Button>
		</div>
	);
}
