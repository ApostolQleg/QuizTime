import Header from "@/widgets/header/ui/Header.jsx";
import Footer from "@/widgets/footer/ui/Footer.jsx";
import ToastContainer from "@/shared/ui/toast/ToastContainer.jsx";
import AppRoutes from "./AppRoutes.jsx";

export default function App() {
	return (
		<div className="min-h-screen flex flex-col flex-1 bg-(--col-bg-main) text-(--col-text-main)">
			<Header />
			<ToastContainer />
			<AppRoutes />
			<Footer />
		</div>
	);
}
