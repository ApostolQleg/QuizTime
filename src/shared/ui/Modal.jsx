import { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ isOpen, onClose, children, className = "" }) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<>
			<div
				className="fixed inset-0 backdrop-blur-sm z-50 transition-opacity bg-slate-950/60"
				onClick={onClose}
			/>
			<div
				className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    flex flex-col rounded-2xl p-8 z-50 shadow-2xl shadow-black/50 border 
                    bg-(--col-bg-card) border-(--col-border) text-(--col-text-main)
                    ${className}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</>,
		document.getElementById("root"),
	);
}
