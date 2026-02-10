import { deleteQuiz } from "../../services/quizzes.js";
import Button from "../UI/Button.jsx";
import { useAuth } from "../../hooks/useAuth";

export default function Description({ quiz, onClose }) {
	const { user } = useAuth();

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this quiz?")) {
			try {
				await deleteQuiz(quiz.id);
				onClose();
				window.location.reload();
			} catch (error) {
				console.error("Error deleting quiz: ", error);
				alert("Failed to delete quiz. Please try again later.");
			}
		}
	};

	const isOwner = user && quiz.authorId && String(user._id) === String(quiz.authorId);
	const canManage = isOwner;

	return (
		<>
			<div
				className="fixed inset-0 backdrop-blur-sm z-20 transition-opacity bg-slate-950/80"
				onClick={onClose}
			/>
			<div
				className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    flex flex-col min-h-[60vh] max-h-[80vh] w-[80vw] 
                    rounded-2xl p-8 z-30 shadow-2xl shadow-black/50 border bg-(--col-bg-card) border-(--col-border) text-(--col-text-main)"
			>
				<div className="flex flex-col flex-1 overflow-y-auto gap-4">
					<div className="text-5xl font-bold drop-shadow-md text-(--col-text-accent)">
						{quiz.title}
					</div>

					<div className="text-sm opacity-70">
						{quiz.authorName ? (
							<span>
								Author:{" "}
								<span className="text-(--col-primary)">{quiz.authorName}</span>
							</span>
						) : (
							quiz.isSystem && <span className="text-yellow-500">System Quiz</span>
						)}
					</div>

					<div className="text-2xl w-full break-all leading-relaxed border-t pt-4 text-(--col-text-muted) border-(--col-border)">
						{quiz.description}
					</div>
				</div>

				<div className="flex justify-between items-center pt-6 mt-2 gap-4">
					{/* Manage button - only for the owner */}
					{canManage && (
						<Button to={`/manage/${quiz.id}`} className="bg-blue-600 hover:bg-blue-700">
							Manage
						</Button>
					)}

					{/* Start Quiz - available to everyone */}
					<Button to={`/quiz/${quiz.id}`} className="flex-1 shadow-xl text-lg">
						Start Quiz
					</Button>

					{/* Delete button - only for the owner */}
					{canManage && (
						<Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
							Delete
						</Button>
					)}
				</div>
			</div>
		</>
	);
}
