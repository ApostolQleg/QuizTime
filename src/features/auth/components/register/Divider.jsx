export default function Divider() {
	return (
		<>
			<div className="hidden md:flex flex-col items-center px-8">
				<div className="flex-1 w-px bg-(--col-border)"></div>
				<div className="flex items-center justify-center shrink-0 size-11 bg-(--col-bg-card) text-(--col-text-muted) font-bold text-sm rounded-full border border-(--col-border) my-4">
					OR
				</div>
				<div className="flex-1 w-px bg-(--col-border)"></div>
			</div>

			<div className="flex md:hidden items-center w-full px-4 my-2">
				<div className="flex-1 h-px bg-(--col-border)"></div>
				<div className="flex items-center justify-center shrink-0 size-11 bg-(--col-bg-card) text-(--col-text-muted) font-bold text-sm rounded-full border border-(--col-border) mx-4">
					OR
				</div>
				<div className="flex-1 h-px bg-(--col-border)"></div>
			</div>
		</>
	);
}
