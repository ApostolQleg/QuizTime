import { formatDateTime } from "@/shared/libs/formatDateTime.js";
import { getDateFromObjectId } from "@/shared/libs/getDateFromObjectId.js";

export default function ResultCard({ item, onClick }) {
	const date = formatDateTime(getDateFromObjectId(item._id));

	return (
		<button type="button" className="quiz-card flex flex-col justify-between" onClick={onClick}>
			<div className="font-bold text-lg mb-2 pt-4 px-2">{item.quizTitle}</div>
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
				<div>
					Score: {item.summary?.score ?? 0}/{item.summary?.total ?? 0}
				</div>
				<div className="text-xs mt-1 opacity-70">{date ? date : ""}</div>
			</div>
		</button>
	);
}
