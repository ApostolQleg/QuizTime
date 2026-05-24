import { Outlet } from "react-router";
import Footer from "@/widgets/footer/ui/Footer.jsx";
import Header from "@/widgets/header/ui/Header.jsx";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";

export default function MainLayout() {
	return (
		<div className="min-h-screen flex flex-col bg-(--col-bg-main) text-(--col-text-main)">
			<Header />
			<Sidebar />
			<main className="flex-1 flex flex-col">
				<Outlet></Outlet>
			</main>
			<Footer />
		</div>
	);
}
