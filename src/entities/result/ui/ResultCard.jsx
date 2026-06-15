import { formatDateTime } from "@/shared/libs/formatDateTime.js";
import { getDateFromObjectId } from "@/shared/libs/getDateFromObjectId.js";

export default function ResultCard({ item, onClick }) {
	const date = formatDateTime(getDateFromObjectId(item._id));

	return (
		<button
			type="button"
			className="quiz-card aspect-square flex flex-col justify-between p-3 sm:p-4 md:p-5 text-left overflow-hidden w-full"
			onClick={onClick}
		>
			<div className="w-full">
				<div className="font-bold text-sm sm:text-base md:text-lg line-clamp-2 mb-1 sm:mb-2">
					{item.quizTitle}
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
				<div className="truncate">
					Score: {item.summary?.score ?? 0}/{item.summary?.total ?? 0}
				</div>
				<div className="text-[10px] sm:text-xs mt-0.5 opacity-70 truncate">
					{date ? date : ""}
				</div>
			</div>
		</button>
	);
}
