import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createQuiz, getQuizById, updateQuiz } from "@/features/quizzes/api/quizzes.api.js";
import Question from "@/features/quizzes/components/edit/QuestionEditor.jsx";
import useQuizEditorValidation from "@/features/quizzes/hooks/useQuizEditorValidation.js";
import {
	useQuizEditorActions,
	useQuizEditorContentState,
	useQuizEditorMetaState,
} from "@/features/quizzes/stores/quizEditorStore.js";
import { QUIZ_CONSTRAINTS, QUIZ_CATEGORIES, QUIZ_TAGS } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import Container from "@/shared/ui/Container.jsx";
import Input from "@/shared/ui/Input.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";
import Textarea from "@/shared/ui/Textarea.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Edit() {
	const navigate = useNavigate();
	const { quizId } = useParams();
	const location = useLocation();

	const isManagePage = location.pathname.startsWith("/manage");
	const { loading, alertInfo } = useQuizEditorMetaState();
	const { title, category, tags, description, counter, errors, questions } =
		useQuizEditorContentState();
	const editorActions = useQuizEditorActions();
	const { validate, showSaveError, closeAlert } = useQuizEditorValidation();
	const { addToast } = useToastActions();

	useEffect(() => {
		editorActions.resetEditor();
		editorActions.initEditor(isManagePage);
	}, [editorActions, isManagePage]);

	useEffect(() => {
		if (isManagePage && quizId) {
			getQuizById(quizId)
				.then((foundQuiz) => {
					editorActions.loadQuiz(foundQuiz.quiz);
				})
				.catch((err) => {
					console.error(err);
					navigate("/not-found");
				});
		}
	}, [editorActions, isManagePage, quizId, navigate]);

	const handleSaveQuiz = async () => {
		const isValid = validate();
		if (!isValid) return;

		try {
			const quizPayload = {
				title,
				category,
				tags: tags.map((tag) => tag.text.trim()),
				description,
				questions,
				...(isManagePage ? {} : { id: Date.now().toString() }),
			};

			if (isManagePage) {
				await updateQuiz(quizId, quizPayload);
				addToast("Your quiz has been updated.");
			} else {
				await createQuiz(quizPayload);
				addToast("Your quiz has been created.");
			}

			navigate("/");
		} catch (error) {
			console.error("Error saving quiz: ", error);
			showSaveError("Failed to save quiz. Please try again later.");
		}
	};

	if (loading) {
		return <Container className="text-center text-(--col-text-main)">Loading...</Container>;
	}

	return (
		<Container className={"flex flex-col gap-4 flex-1"}>
			<div className="w-full flex flex-col gap-4 p-4 rounded-xl border bg-(--col-bg-input-darker) border-(--col-border)">
				<div className="flex flex-row items-center gap-3 w-full">
					<Input
						placeholder="Enter quiz title here..."
						className={`text-xs lg:text-lg font-bold w-3/4 ${errors.title ? "error" : ""}`}
						value={title}
						onChange={(event) => {
							const newValue = event.target.value.slice(
								0,
								QUIZ_CONSTRAINTS.TITLE_MAX_LENGTH,
							);
							editorActions.setTitle(newValue);
						}}
						maxLength={QUIZ_CONSTRAINTS.TITLE_MAX_LENGTH}
					/>

					<div className="font-bold m-1 text-xs sm:text-lg text-(--col-text-muted)">
						{counter}/{QUIZ_CONSTRAINTS.TITLE_MAX_LENGTH}
					</div>
					<Button onClick={editorActions.clearTitle}>Clear</Button>
				</div>

				<div className="flex flex-row items-center gap-2 w-full">
					<span className="font-bold text-xs sm:text-sm text-(--col-text-muted)">
						Category:
					</span>
					<select
						className={`w-3/8 p-3 rounded-xl border bg-(--col-bg-input) border-(--col-border) text-(--col-text-main) font-bold text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 ${errors.category ? "error" : ""}`}
						value={category}
						onChange={(event) => editorActions.setCategory(event.target.value)}
					>
						<option value="" disabled>
							Select a category...
						</option>

						{QUIZ_CATEGORIES.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col gap-2 w-full">
					<span className="font-bold text-xs sm:text-sm text-(--col-text-muted)">
						Tags (select multiple):
					</span>

					<select
						className={`w-full p-3 rounded-xl border bg-(--col-bg-input) border-(--col-border) text-(--col-text-main) font-bold text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
						value=""
						onChange={(event) => {
							const selectedTagText = event.target.value;

							editorActions.setTags([
								...tags,
								{ id: crypto.randomUUID(), text: selectedTagText },
							]);
						}}
					>
						<option value="" disabled>
							Select a tag to add...
						</option>

						{QUIZ_TAGS.map((tagText) => {
							const isAlreadySelected = tags.some((t) => t.text === tagText);
							return (
								<option
									key={tagText}
									value={tagText}
									disabled={isAlreadySelected}
								>
									{tagText} {isAlreadySelected ? "(Added)" : ""}
								</option>
							);
						})}
					</select>

					{tags.length > 0 && tags[0].text !== "" && (
						<div className="flex flex-wrap gap-2 items-center mt-2 p-3 rounded-xl border border-dashed border-(--col-border) min-h-[50px]">
							{tags
								.filter((tag) => tag.text !== "")
								.map((tag) => (
									<div
										key={tag.id}
										className="flex items-center gap-1 bg-(--col-bg-input-darker) px-3 py-1 rounded-full border border-(--col-border)"
									>
										<span className="text-xs lg:text-sm font-bold">
											{tag.text}
										</span>
										<Button
											onClick={() => editorActions.deleteTag(tag.id)}
											className="bg-transparent text-red-500 font-bold px-1 hover:bg-transparent hover:text-red-700 shadow-none border-none p-0 ml-1"
											title="Remove tag"
										>
											x
										</Button>
									</div>
								))}
						</div>
					)}
				</div>
			</div>

			<Textarea
				placeholder="Enter quiz description here..."
				className={`resize-y w-full font-bold text-xs lg:text-lg ${errors.description ? "error" : ""}`}
				value={description}
				onChange={(event) => editorActions.setDescription(event.target.value)}
			/>

			<div className="flex flex-col gap-4">
				{questions.map((question, index) => (
					<Question key={question.id} questionId={question.id} index={index} />
				))}
			</div>

			<Button
				onClick={editorActions.addQuestion}
				className="bg-(--col-bg-input) hover:bg-(--col-border) shadow-none"
			>
				Add Question
			</Button>

			<Button className="self-center mt-auto min-w-full shadow-xl" onClick={handleSaveQuiz}>
				Save Quiz
			</Button>
			<ModalConfirm
				isOpen={alertInfo.isOpen}
				onClose={closeAlert}
				title="Error"
				message={alertInfo.message}
				isAlert={true}
				isDanger={true}
			/>
		</Container>
	);
}
