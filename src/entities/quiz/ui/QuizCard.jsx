export default function QuizCard({ item, onClick }) {
	return (
		<button
			type="button"
			className="quiz-card aspect-square flex flex-col justify-between p-3 sm:p-4 md:p-5 text-left overflow-hidden w-full"
			onClick={onClick}
		>
			<div className="w-full">
				<div className="font-bold text-sm sm:text-base md:text-lg line-clamp-2 mb-1 sm:mb-2">
					{item.title}
				</div>

				{typeof item.category === "string" && item.category.trim() && (
					<div className="text-[11px] sm:text-xs md:text-sm opacity-80 truncate mb-2">
						{item.category}
					</div>
				)}

				<div className="flex flex-wrap justify-center gap-1 mt-1 sm:mt-2 w-full">
					{item.tags?.map((tag) => (
						<span
							key={tag}
							className="inline-block bg-(--col-text-main) text-(--col-primary) text-[9px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full"
						>
							{tag}
						</span>
					))}
				</div>
			</div>

			<div className="text-[11px] sm:text-xs md:text-sm opacity-90 text-(--col-text-main) w-full mt-2">
				<div className="flex flex-col gap-0.5 sm:gap-1">
					<span className="truncate">
						{item.questionsCount ? `${item.questionsCount} questions` : "No questions"}
					</span>
					{item.authorName && (
						<span className="text-[10px] sm:text-xs text-yellow-300 opacity-80 truncate">
							by {item.authorName}
						</span>
					)}
				</div>
			</div>
		</button>
	);
}
