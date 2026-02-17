import { useState } from "react";
import { deleteQuiz } from "../../services/quizzes.js";
import Button from "../UI/Button.jsx";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../UI/Modal.jsx";
import ModalConfirm from "../UI/ModalConfirm.jsx";
import Avatar from "../UI/Avatar.jsx";

export default function ModalDescription({ quiz, onClose, isOpen, onDeleteSuccess }) {
	const { user } = useAuth();

	const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleDelete = async () => {
		try {
			await deleteQuiz(quiz.id);
			setIsDeleteConfirmOpen(false);
			onClose();

			if (onDeleteSuccess) {
				onDeleteSuccess(quiz.id);
			} else {
				onClose();
			}
		} catch (error) {
			console.error("Error deleting quiz: ", error);
			setErrorMessage("Failed to delete quiz. Please try again later.");
		}
	};

	const isOwner = user && quiz.authorId && String(user._id) === String(quiz.authorId);
	const canManage = isOwner;

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} className="min-h-[60vh] max-h-[80vh] w-[80vw]">
				<div className="flex flex-col flex-1 overflow-y-auto gap-4">
					<div className="text-5xl font-bold drop-shadow-md text-(--col-text-accent)">
						{quiz.title}
					</div>

					<div className="text-sm opacity-70">
						{quiz.authorName ? (
							<div className="flex items-center gap-2 mt-1">
								<span>Author:</span>

								<div className="flex items-center gap-2 p-1 pr-3 rounded-full bg-(--col-bg-card) border border-(--col-border) w-fit">
									<Avatar
										src={quiz.authorAvatarUrl}
										name={quiz.authorName}
										type={quiz.authorAvatarType}
										color={quiz.authorThemeColor}
										size="sm"
									/>
									<span
										className="font-bold text-sm"
										style={{
											color: quiz.authorThemeColor || "var(--col-primary)",
										}}
									>
										{quiz.authorName}
									</span>
								</div>
							</div>
						) : (
							quiz.isSystem && <span className="text-yellow-500">System Quiz</span>
						)}
					</div>

					<div className="text-2xl w-full break-all leading-relaxed border-t pt-4 text-(--col-text-muted) border-(--col-border)">
						{quiz.description}
					</div>
				</div>

				<div className="flex justify-between items-center pt-6 mt-2 gap-4">
					{canManage && <Button to={`/manage/${quiz.id}`}>Manage</Button>}
					<Button to={`/quiz/${quiz.id}`} className="flex-1">
						Start Quiz
					</Button>
					{canManage && (
						<Button onClick={() => setIsDeleteConfirmOpen(true)}>Delete</Button>
					)}
				</div>
			</Modal>

			<ModalConfirm
				isOpen={isDeleteConfirmOpen}
				onClose={() => setIsDeleteConfirmOpen(false)}
				onConfirm={handleDelete}
				title="Delete Quiz?"
				message={`Are you sure you want to delete "${quiz.title}"? This action cannot be undone.`}
				confirmLabel="Delete"
				isDanger={true}
			/>

			<ModalConfirm
				isOpen={!!errorMessage}
				onClose={() => setErrorMessage(null)}
				title="Error"
				message={errorMessage}
				isAlert={true}
				isDanger={true}
			/>
		</>
	);
}
