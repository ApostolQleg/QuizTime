import Radio from "../UI/Radio.jsx";
import Input from "./Input.jsx";

export default function Option({ id, name, text, onDelete }) {
	return (
		<>
			<div id={id} className="flex flex-row gap-2 items-center">
				<Radio id={id} name={name} />
				<Input
					placeholder="Enter option text here..."
					className="border border-gray-300 rounded text-white p-1 m-1 w-1/2"
					value={text ? text : null}
				/>
				<button
					type="button"
					className="bg-pink-600 text-black rounded-2xl transition hover:bg-pink-500 flex items-center justify-center px-4 py-2"
					onClick={() => {
						onDelete();
					}}
				>
					Delete
				</button>
			</div>
		</>
	);
}
