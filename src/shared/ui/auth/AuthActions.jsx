import { Link } from "react-router-dom";

export default function AuthActions({ onClick }) {
	return (
		<div className="flex gap-3">
			<Link
				to="/register"
				onClick={onClick}
				className="auth-button"
				style={{ backgroundColor: "var(--col-primary)" }}
			>
				Sign Up
			</Link>
			<span className="text-(--col-text-muted) self-center text-xs">or</span>
			<Link to="/login" onClick={onClick} className="auth-button">
				Log In
			</Link>
		</div>
	);
}
