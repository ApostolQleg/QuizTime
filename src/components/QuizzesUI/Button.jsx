import { Link } from "react-router";

export default function Button({ text, to }) {
	return (
		<Link
			className={
				"bg-pink-600 text-black rounded-2xl h-[50px] w-[100px] transition hover:bg-pink-500 flex items-center justify-center"
			}
			to={to}
		>
			{text}
		</Link>
	);
}
