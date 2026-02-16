import Modal from "./Modal";
import Button from "./Button";

export default function ModalConfirm({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmLabel = "OK",
	isDanger = false,
	isAlert = false,
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} className="w-[90vw] max-w-100 min-h-50">
			<div className="flex flex-col h-full justify-between gap-6">
				<div>
					<h3 className="text-2xl font-bold mb-4 text-(--col-text-accent) drop-shadow-md">
						{title}
					</h3>
					<p className="text-(--col-text-main) opacity-90 leading-relaxed">{message}</p>
				</div>

				<div className="flex justify-end gap-4 mt-auto">
					{!isAlert && (
						<Button
							onClick={onClose}
							className="bg-transparent border border-(--col-border) hover:bg-(--col-bg-input)"
						>
							Cancel
						</Button>
					)}
					<Button
						onClick={() => {
							if (onConfirm) onConfirm();
							onClose();
						}}
						className={
							isDanger
								? "bg-red-600 hover:bg-red-700 shadow-red-900/20"
								: "bg-(--col-primary) hover:brightness-110"
						}
					>
						{confirmLabel}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
