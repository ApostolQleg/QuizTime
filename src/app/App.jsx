import Header from "./layouts/Header.jsx";
import Footer from "./layouts/Footer.jsx";
import AppRoutes from "./AppRoutes.jsx";

export default function App() {
	return (
		<div className="min-h-screen flex flex-col flex-1 bg-(--col-bg-main) text-(--col-text-main)">
			<Header />
			<AppRoutes />
			<Footer />
		</div>
	);
}
