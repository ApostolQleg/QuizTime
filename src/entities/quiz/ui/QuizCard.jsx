import { formatDateTime } from "@/shared/libs/formatDateTime.js";

export default function QuizCard({ item, isResultsPage, onClick }) {
	return (
		<button type="button" className="quiz-card flex flex-col justify-between" onClick={onClick}>
			<div className="font-bold text-lg mb-2 pt-4 px-2">
				{isResultsPage ? item.quizTitle : item.title}
			</div>
			<div className="">{item.category}</div>
			<div className="flex flex-wrap gap-1 mt-2 px-2">
				{item.tags?.map((tag) => (
					<span
						key={tag}
						className="inline-block bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full mb-2"
					>
						{tag}
					</span>
				))}
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
