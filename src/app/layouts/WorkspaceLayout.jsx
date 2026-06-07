import { Outlet } from "react-router";
import Container from "@/shared/ui/Container.jsx";

export default function WorkspaceLayout() {
	return (
		<Container className="page-layout p-6 flex-1 flex flex-col w-full">
			<Outlet />
		</Container>
	);
}
