import { useToastStore } from "./toastStore.js";
import Toast from "./Toast.jsx";

export default function ToastContainer() {
	const toasts = useToastStore((state) => state.toasts);

	if (toasts.length === 0) return null;

	return (
		<div className="fixed inset-x-3 bottom-3 z-100 flex flex-col gap-2 pointer-events-none sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-80 sm:gap-3">
			{toasts.map((toast) => (
				<Toast key={toast.id} id={toast.id} message={toast.message} />
			))}
		</div>
	);
}
