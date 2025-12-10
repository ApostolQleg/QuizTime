import { Link } from "react-router";

export default function Button({ text, to, className = "" }) {
	return (
		<Link
			className={
				`${className}` +
				" bg-pink-600 text-black rounded-2xl transition hover:bg-pink-500 flex items-center justify-center px-4 py-2"
			}
			to={to}
		>
			{text}
		</Link>
	);
}
