import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "@/features/quiz/api/quizzes.api.js";
import QuizForm from "@/features/quiz/components/edit/QuizForm.jsx";
import useQuizEditorValidation from "@/features/quiz/hooks/useQuizEditorValidation.js";
import {
	useQuizEditorActions,
	useQuizEditorContentState,
} from "@/features/quiz/stores/quizEditorStore.js";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Create() {
	const navigate = useNavigate();
	const editorActions = useQuizEditorActions();
	const { title, category, tags, description, questions } = useQuizEditorContentState();
	const { validate, showSaveError } = useQuizEditorValidation();
	const { addToast } = useToastActions();

	useEffect(() => {
		editorActions.resetEditor();
		editorActions.initEditor(false);
	}, [editorActions]);

	const handleCreateQuiz = async () => {
		if (!validate()) return;

		try {
			const quizPayload = {
				title,
				category,
				tags: tags.map((tag) => tag.text.trim()).filter((t) => t !== ""),
				description,
				questions,
			};

			await createQuiz(quizPayload);
			addToast("Your quiz has been created.");
			navigate("/quizzes");
		} catch (error) {
			console.error("Error creating quiz: ", error);
			showSaveError("Failed to create quiz. Please try again later.");
		}
	};

	return <QuizForm onSave={handleCreateQuiz} isEditing={false} />;
}
