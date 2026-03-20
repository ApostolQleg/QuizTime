import { formatDateTime } from "@/shared/libs/formatDateTime.js";

export default function QuizCard({ item, isResultsPage, onClick }) {
	return (
		<button type="button" className="quiz-card flex flex-col justify-between" onClick={onClick}>
			<div className="font-bold text-lg mb-2 pt-4 px-2">
				{isResultsPage ? item.quizTitle : item.title}
			</div>

			<div className="text-sm opacity-90 text-indigo-100 pb-4 px-2 w-full">
				{isResultsPage ? (
					<>
						<div>
							Score: {item.summary?.score ?? 0}/{item.summary?.total ?? 0}
						</div>
						<div className="text-xs mt-1 opacity-70">
							{item.createdAt ? formatDateTime(item.createdAt) : ""}
						</div>
					</>
				) : (
					<div className="flex flex-col gap-1">
						<span>
							{item.questionsCount
								? `${item.questionsCount} questions`
								: "No questions"}
						</span>
						{item.authorName && (
							<span className="text-xs text-yellow-300 opacity-80 truncate px-2">
								by {item.authorName}
							</span>
						)}
					</div>
				)}
			</div>
		</button>
	);
}
