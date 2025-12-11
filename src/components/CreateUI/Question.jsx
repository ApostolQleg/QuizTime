import { useState } from "react";
import Input from "./Input.jsx";
import Option from "./Option.jsx";

export default function Question({ id }) {
	const [options, setOptions] = useState(["Так", "Ні"]);

	const handleAddOption = () => {
		setOptions([...options, ""]);
	};

	const handleOptionDelete = (index) => {
		const newOptions = options.filter((_, i) => i !== index);
		setOptions(newOptions);
	};

	return (
		<div className="m-4 p-4 border border-gray-300 rounded flex flex-col gap-3">
			<Input
				placeholder="Enter question text here..."
				className="w-full border border-gray-300 rounded text-white p-2"
			/>
			{options.map((option, oIndex) => (
				<Option
					id={oIndex}
					name={id}
					key={oIndex}
					text={option}
					onDelete={() => handleOptionDelete(oIndex)}
				/>
			))}
			<button
				type="button"
				className="bg-pink-600 text-black rounded-2xl transition hover:bg-pink-500 flex items-center justify-center px-4 py-2"
				onClick={handleAddOption}
			>
				Add Option
			</button>
		</div>
	);
}
