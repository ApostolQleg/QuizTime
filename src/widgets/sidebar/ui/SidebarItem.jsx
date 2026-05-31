import { Link } from "react-router-dom";

export default function SidebarItem({ to, onClick, children }) {
	return (
		<Link
			to={to}
			onClick={onClick}
			className="text-(--col-text-main) hover:text-(--col-text-accent) transition-colors text-2xl"
		>
			{children}
		</Link>
	);
}
