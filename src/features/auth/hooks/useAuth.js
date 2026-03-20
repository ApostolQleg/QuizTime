import { useContext } from "react";
import { AuthContext } from "@/app/providers/AuthContext";

export const useAuth = () => {
	return useContext(AuthContext);
};
