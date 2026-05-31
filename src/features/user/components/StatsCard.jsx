import galochkaIcon from "@/shared/assets/galochka.png";

export const QuizStatsCard = ({ passedCount }) => {
	const displayCount = passedCount ?? "...";

	return (
		<div className="bg-(--col-bg-card) border-(--col-border) text-(--col-text-main) shadow-2xl rounded-2xl p-6 flex items-center gap-5 border">
			<div className="bg-(--col-bg-main) p-4 rounded-full flex items-center justify-center">
				<img
					src={galochkaIcon}
					alt="Passed Quiz Icon"
					className="w-10 h-10 object-contain"
				/>
			</div>

			<div className="flex flex-col">
				<h3 className="text-sm font-semibold text-(--col-text-muted) uppercase tracking-wider">
					Completed Quizzes
				</h3>
				<p className="text-3xl font-extrabold text-(--col-text-main) mt-1">
					{displayCount}
				</p>
			</div>
		</div>
	);
};
