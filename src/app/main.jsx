import { GoogleOAuthProvider } from "@react-oauth/google";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "@/styles.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
	<StrictMode>
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<App />
		</GoogleOAuthProvider>
	</StrictMode>,
);
