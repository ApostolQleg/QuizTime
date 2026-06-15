export default function QuizCard({ item, onClick }) {
	return (
		<button
			type="button"
			className="quiz-card aspect-square flex flex-col justify-between"
			onClick={onClick}
		>
			<div className="font-bold text-lg mb-2 pt-4 px-2">{item.title}</div>
			{typeof item.category === "string" && item.category.trim() && (
				<div className="text-sm opacity-80 px-2 mb-2">{item.category}</div>
			)}
			<div className="flex flex-wrap gap-1 mt-2 px-2">
				{item.tags?.map((tag) => (
					<span
						key={tag}
						className="inline-block bg-(--col-text-main) text-(--col-primary) text-xs px-2 py-1 rounded-full mb-2"
					>
						{tag}
					</span>
				))}
			</div>

			<div className="text-sm opacity-90 text-(--col-text-main) pb-4 px-2 w-full">
				<div className="flex flex-col gap-1">
					<span>
						{item.questionsCount ? `${item.questionsCount} questions` : "No questions"}
					</span>
					{item.authorName && (
						<span className="text-xs text-yellow-300 opacity-80 truncate px-2">
							by {item.authorName}
						</span>
					)}
				</div>
			</div>
		</button>
	);
}
