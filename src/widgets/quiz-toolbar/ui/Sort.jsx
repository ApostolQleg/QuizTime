import { useState, useRef, useEffect } from "react";
import newoldIcon from "@/shared/assets/sort-newold-icon.png";
import oldnewIcon from "@/shared/assets/sort-oldnew-icon.png";
import azIcon from "@/shared/assets/sort-AZ-icon.png";
import zaIcon from "@/shared/assets/sort-ZA-icon.png";
import { SORT_OPTIONS as BASE_SORT_OPTIONS } from "@/shared/config/config.js";

const SORT_ICONS = {
	newest: newoldIcon,
	oldest: oldnewIcon,
	az: azIcon,
	za: zaIcon,
};

const SORT_OPTIONS = BASE_SORT_OPTIONS.map((option) => ({
	...option,
	icon: SORT_ICONS[option.id] ?? newoldIcon,
}));

export default function Sort({ currentSort, onSortChange }) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const currentOption = SORT_OPTIONS.find((opt) => opt.id === currentSort) || SORT_OPTIONS[0];

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative h-full flex items-center" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="h-full p-3 border-none rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-md"
				title="Sort quizzes"
				type="button"
			>
				<img
					src={currentOption.icon}
					alt={currentOption.label}
					className="w-6 h-6 object-contain opacity-90 transition-transform hover:scale-110"
				/>
			</button>

			{isOpen && (
				<div className="absolute top-[110%] right-0 w-56 bg-(--col-bg-card) border border-(--col-border) rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden flex flex-col">
					{SORT_OPTIONS.map((option) => (
						<button
							type="button"
							key={option.id}
							className={`w-full flex flex-row items-center gap-4 px-4 py-3 hover:bg-(--col-bg-input) transition-colors cursor-pointer text-left ${
								currentSort === option.id
									? "text-(--col-primary) bg-(--col-bg-input-darker)"
									: "text-(--col-text-main)"
							}`}
							onClick={() => {
								onSortChange(option.id);
								setIsOpen(false);
							}}
						>
							<img
								src={option.icon}
								alt={option.label}
								className="w-5 h-5 object-contain opacity-80"
							/>
							<span className="font-bold text-sm flex-1">{option.label}</span>

							{currentSort === option.id && (
								<div className="w-2 h-2 rounded-full bg-(--col-primary) shadow-[0_0_8px_var(--col-primary-glow)]"></div>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
