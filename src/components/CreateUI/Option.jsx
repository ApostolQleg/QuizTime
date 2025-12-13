import Radio from "../UI/Radio.jsx";
import Button from "../UI/Button.jsx";
import Input from "./Input.jsx";
import { useState } from "react";

export default function Option({ id, name, text, onDelete }) {
	const [value, setValue] = useState(text || "");

	return (
		<>
			<div id={id} className="flex flex-row gap-3 items-center">
				<Radio id={id} name={name} />
				<Input
					placeholder="Enter option text here..."
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button onClick={onDelete}>Delete</Button>
			</div>
		</>
	);
}
