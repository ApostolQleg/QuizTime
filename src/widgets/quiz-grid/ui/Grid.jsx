import QuizCard from "@/entities/quiz/ui/QuizCard.jsx";
import Container from "@/shared/ui/Container.jsx";
import { Link } from "react-router-dom";
import addIcon from "@/shared/assets/plus-icon.png";

export default function Grid({
	items,
	loading,
	hasMore,
	onLoadMore,
	isLoadingMore,
	emptyMessage,
	showAddButton = false,
	isResultsPage = false,
	onCardClick,
}) {
	if (loading) {
		return <Container className="text-center text-(--col-text-main)">Loading...</Container>;
	}

	return (
		<Container>
			{(items.length > 0 || showAddButton) && (
				<div className="grid gap-6 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center justify-items-center mb-8">
					{showAddButton && (
						<Link to="/create" id={`quiz-add`} className="quiz-card group">
							<img
								src={addIcon}
								alt="Add Quiz"
								className="w-1/2 h-1/2 group-hover:rotate-90 transition-transform duration-300"
							/>
						</Link>
					)}

					{items.map((item, index) => (
						<QuizCard
							key={`${item._id}-${index}`}
							item={item}
							isResultsPage={isResultsPage}
							onClick={() => onCardClick(item)}
						/>
					))}
				</div>
			)}

			{!loading && items.length === 0 && (
				<div className="text-center text-(--col-text-main) flex flex-col gap-2">
					{emptyMessage}
				</div>
			)}

			{hasMore && items.length > 0 && (
				<div className="flex justify-center pb-4">
					<button
						onClick={onLoadMore}
						disabled={isLoadingMore}
						className="button px-8 py-3 text-lg"
					>
						{isLoadingMore ? "Loading..." : "Load More"}
					</button>
				</div>
			)}
		</Container>
	);
}
