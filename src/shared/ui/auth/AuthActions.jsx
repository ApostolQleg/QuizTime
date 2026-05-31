import { Link } from "react-router-dom";

export default function AuthActions({ onClick }) {
	return (
		<div className="flex gap-3">
			<Link to="/register" onClick={onClick} className="button px-4! py-2!">
				Sign Up
			</Link>
			<span className="text-(--col-text-muted) self-center text-xs">or</span>
			<Link to="/login" onClick={onClick} className="passive-button px-4! py-2!">
				Log In
			</Link>
		</div>
	);
}
