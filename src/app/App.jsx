import { BrowserRouter } from "react-router-dom";
import ToastContainer from "@/shared/ui/toast/ToastContainer.jsx";

import AppRoutes from "./AppRoutes.jsx";

export default function App() {
	return (
		<BrowserRouter>
			<ToastContainer />
			<AppRoutes />
		</BrowserRouter>
	);
}
