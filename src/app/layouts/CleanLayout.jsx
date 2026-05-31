import { Outlet } from "react-router";

export default function CleanLayout() {
	return (
		<div className="min-h-screen flex flex-col bg-(--col-bg-main) text-(--col-text-main)">
			<main className="flex-1 flex flex-col justify-center">
				<Outlet></Outlet>
			</main>
		</div>
	);
}
