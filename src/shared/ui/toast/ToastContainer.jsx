import { useToastListState } from "./toastStore.js";
import Toast from "./Toast.jsx";

export default function ToastContainer() {
	const { toasts } = useToastListState();

	if (toasts.length === 0) return null;

	return (
		<div className="fixed inset-x-6 bottom-4 z-50 flex flex-col-reverse pointer-events-none sm:inset-x-auto sm:right-4 sm:w-80">
			{toasts.map((toast) => (
				<Toast
					key={toast.id}
					id={toast.id}
					message={toast.message}
					image={toast.image}
					isExiting={toast.isExiting}
				/>
			))}
		</div>
	);
}
