import { useNavigate } from "react-router";

export default function Button({ children, className = "", to, onClick, ...props }) {
	const navigate = useNavigate();
	return (
		<button
			className={`${className} button`}
			onClick={() => {
				onClick ? onClick() : null;
				to ? navigate(to) : null;
			}}
			{...props}
		>
			{children}
		</button>
	);
}
