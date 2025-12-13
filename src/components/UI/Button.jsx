import { useNavigate } from "react-router";

export default function Button({ children, className = "", to, onClick }) {
	const navigate = useNavigate();
	return (
		<button className={`${className} button`} onClick={onClick ? onClick : () => navigate(to)}>
			{children}
		</button>
	);
}
