import Button from "../UI/Button.jsx";

export default function Description({ quiz, onClose }) {
	return (
		<>
			<div className="fixed inset-0 bg-black opacity-50 z-20" onClick={onClose} />
			<div
				className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
					flex flex-col min-h-[30vh] max-h-[80vh] w-[80vw] bg-[rgb(233,14,178)] rounded-2xl p-6 z-30 "
			>
				<div className="flex-1 overflow-y-auto">
					<div className="text-2xl font-bold mb-2">{quiz.title}</div>
					<div className="mb-2">{quiz.description}</div>
				</div>

				<div className="mt-4 flex justify-between">
					<Button text="Manage" to="/manage" />
					<Button text="Start Quiz" to={`/quiz/${quiz.id}`} />
					<Button text="Delete" to="#" />
				</div>
			</div>
		</>
	);
}
