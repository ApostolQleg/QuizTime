import { Outlet } from "react-router";

export default function WorkspaceLayout() {
	return (
		<div className="container flex-1 flex flex-col w-full">
			<Outlet />
		</div>
	);
}
