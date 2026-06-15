import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById, updateQuiz } from "@/features/quiz/api/quizzes.api.js";
import QuizForm from "@/features/quiz/components/edit/QuizForm.jsx";
import useQuizEditorValidation from "@/features/quiz/hooks/useQuizEditorValidation.js";
import { buildQuizPayload } from "@/features/quiz/libs/buildQuiz.js";
import {
	useQuizEditorActions,
	useQuizEditorContentState,
} from "@/features/quiz/stores/quizEditorStore.js";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Manage() {
	const { quizId } = useParams();
	const navigate = useNavigate();

	const editorActions = useQuizEditorActions();
	const { title, category, tags, description, questions } = useQuizEditorContentState();
	const { validate, showSaveError } = useQuizEditorValidation();
	const { addToast } = useToastActions();

	useEffect(() => {
		editorActions.resetEditor();
		editorActions.initEditor(true);

		if (quizId) {
			getQuizById(quizId)
				.then((foundQuiz) => {
					editorActions.loadQuiz(foundQuiz.quiz);
				})
				.catch((err) => {
					console.error(err);
					navigate("/not-found");
				});
		}
	}, [editorActions, quizId, navigate]);

	const handleUpdateQuiz = async () => {
		if (!validate()) return;

		try {
			const quizPayload = buildQuizPayload({
				title,
				category,
				tags,
				description,
				questions,
			});

			await updateQuiz(quizId, quizPayload);
			addToast("Your quiz has been updated.");
			navigate("/quizzes");
		} catch (error) {
			console.error("Error updating quiz: ", error);
			showSaveError("Failed to update quiz. Please try again later.");
		}
	};

	return <QuizForm onSave={handleUpdateQuiz} isEditing={true} />;
}
