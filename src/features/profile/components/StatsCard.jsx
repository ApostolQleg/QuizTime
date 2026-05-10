export const QuizStatsCard = ({ passedCount }) => {
	const displayCount = passedCount ?? "...";

	return (
		<div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-5 border border-gray-100">
			<div className="bg-indigo-50 p-4 rounded-full">
				<svg
					className="w-8 h-8 text-indigo-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
					/>
				</svg>
			</div>

			<div className="flex flex-col">
				<h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
					Completed Quizzes
				</h3>
				<p className="text-3xl font-extrabold text-gray-900 mt-1">{displayCount}</p>
			</div>
		</div>
	);
};
