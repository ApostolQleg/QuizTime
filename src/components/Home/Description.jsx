import { getStorage, setStorage } from "../../services/storage.js";
import Button from "../UI/Button.jsx";

export default function Description({ quiz, onClose }) {
	const handleDelete = async () => {
		try {
			const data = await getStorage();
			const updatedQuizzes = (data.quizzes || []).filter((q) => q.id !== quiz.id);
			const newData = { ...data, quizzes: updatedQuizzes };
			await setStorage(newData);
			onClose();
			window.location.reload();
		} catch (error) {
			console.error("Помилка при видаленні:", error);
		}
	};

	return (
		<>
			<div className="fixed inset-0 bg-black opacity-50 z-20" onClick={onClose} />
			<div
				className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                   flex flex-col min-h-[60vh] max-h-[80vh] w-[80vw] bg-[rgb(233,14,178)] rounded-2xl p-6 z-30"
			>
				<div className="flex flex-col flex-1 overflow-y-auto gap-2">
					<div className="text-5xl font-bold">{quiz.title}</div>
					<div className="text-3xl w-full break-all">{quiz.description}</div>
				</div>

				<div className="flex justify-between">
					<Button to={`/manage/${quiz.id}`}>Manage</Button>
					<Button to={`/quiz/${quiz.id}`}>Start Quiz</Button>
					<Button onClick={handleDelete}>Delete</Button>
				</div>
			</div>
		</>
	);
}
