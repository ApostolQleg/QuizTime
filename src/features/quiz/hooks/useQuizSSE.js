import { useCallback } from "react";
import { invalidateQuizCache, invalidateQuizListCache } from "@/features/quiz/api/quizzes.api.js";
import { useQuizzesListActions } from "@/features/quiz/stores/quizListStore.js";
import { useResultsListActions } from "@/features/result/stores/resultListStore.js";
import { useSSE } from "@/shared/hooks/useSSE.js";

export function useQuizSSE({
	authorId = null,
	searchQuery = "",
	sortOption = "newest",
	onActiveQuizChange = null,
} = {}) {
	const { addQuiz, updateQuiz, removeQuiz } = useQuizzesListActions();
	const { removeResultsByQuizId } = useResultsListActions();

	useSSE(
		"CREATE_QUIZ",
		useCallback(
			(newQuiz) => {
				const matchesAuthor = !authorId || newQuiz.authorId === authorId;
				const matchesFilters = searchQuery === "" && sortOption === "newest";

				if (matchesAuthor && matchesFilters) {
					addQuiz(newQuiz);
				}
				invalidateQuizListCache();
			},
			[authorId, searchQuery, sortOption, addQuiz],
		),
	);

	useSSE(
		"UPDATE_QUIZ",
		useCallback(
			(updatedQuiz) => {
				const matchesAuthor = !authorId || updatedQuiz.authorId === authorId;
				if (matchesAuthor) {
					updateQuiz(updatedQuiz);
					if (onActiveQuizChange) {
						onActiveQuizChange(updatedQuiz);
					}
					invalidateQuizCache(updatedQuiz._id);
					invalidateQuizListCache();
				}
			},
			[authorId, updateQuiz, onActiveQuizChange],
		),
	);

	useSSE(
		"DELETE_QUIZ",
		useCallback(
			(deletedQuizId) => {
				removeQuiz(deletedQuizId);
				removeResultsByQuizId(deletedQuizId);

				if (onActiveQuizChange) {
					onActiveQuizChange(null);
				}

				invalidateQuizCache(deletedQuizId);
				invalidateQuizListCache();
			},
			[removeQuiz, removeResultsByQuizId, onActiveQuizChange],
		),
	);
}
