import { getQuizzesList, getResults } from "../services/storage.js";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import addIcon from "../assets/plus-icon.png";
import Description from "../components/Home/Description.jsx";
import Container from "../components/UI/Container.jsx";

export default function Home() {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const isResultsPage = location.pathname === "/results";
	const isHelpPage = location.pathname === "/help";

	useEffect(() => {
		const fetchData = async () => {
			if (isHelpPage) {
				setLoading(false);
				return;
			}

			setLoading(true);
			setItems([]);

			try {
				let data = [];

				if (isResultsPage) {
					if (user) {
						data = await getResults();
					} else {
						data = [];
					}
				} else {
					data = await getQuizzesList();
				}
				setItems(data || []);
			} catch (err) {
				console.error("Failed to load data", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [isResultsPage, isHelpPage, user]);

	if (isHelpPage) {
		return (
			<Container className="container-card gap-6 text-left">
				<div className="quiz-title border-none pb-0">How to use QuizTime</div>
				<div className="space-y-8 text-(--col-text-main)">
					<section>
						<h2 className="text-xl font-bold text-(--col-text-accent) mb-3">
							🎮 Taking a Quiz
						</h2>
						<p className="mb-2">
							Ready to test your knowledge? On the{" "}
							<span className="font-bold">Quizzes</span> page, simply click on any
							card to start.
						</p>
						<ul className="list-disc list-inside pl-2 sm:pl-4 opacity-90 space-y-1 marker:text-(--col-primary)">
							<li>Select the answer you think is correct for each question.</li>
							<li>
								Click <span className="font-bold text-(--col-danger)">Submit</span>{" "}
								at the bottom when you are finished.
							</li>
							<li>You will see your score and the correct answers immediately!</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-(--col-text-accent) mb-3">
							✨ Creating a Quiz
						</h2>
						<p className="mb-2">
							Want to challenge others? Click the big card with the{" "}
							<span className="font-bold text-(--col-primary)">+</span> icon on the
							home page.
						</p>
						<ul className="list-disc list-inside pl-2 sm:pl-4 opacity-90 space-y-1 marker:text-(--col-primary)">
							<li>
								Give your quiz a catchy <strong>Title</strong> (max 30 characters).
							</li>
							<li>
								Add a short <strong>Description</strong>.
							</li>
							<li>
								Use <span className="font-bold">Add Question</span> to expand your
								quiz.
							</li>
							<li>
								Don't forget to mark the{" "}
								<span className="font-bold text-(--col-success)">
									Correct Answer
								</span>{" "}
								for every question!
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-(--col-text-accent) mb-3">
							📊 Checking Results
						</h2>
						<p className="opacity-90">
							Navigate to the <span className="font-bold">Results</span> page via the
							top menu. Here you can track your progress, view your scores, and see
							the dates of your past attempts. Click on any result card to review your
							specific answers.
						</p>
					</section>
				</div>
			</Container>
		);
	}

	if (loading) {
		return <Container className="text-center text-(--col-text-main)">Loading...</Container>;
	}

	return (
		<Container
			className={
				"grid gap-6 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 items-center justify-items-center"
			}
		>
			{!isResultsPage && user && (
				<Link to="/create" id={`quiz-add`} className="quiz-card group">
					<img
						src={addIcon}
						alt="Add Quiz"
						className="w-1/2 h-1/2 group-hover:rotate-90 transition-transform duration-300"
					/>
				</Link>
			)}

			{items.map((item, index) => (
				<button
					type="button"
					key={item._id || index}
					className="quiz-card flex flex-col justify-between"
					onClick={
						isResultsPage
							? () => navigate(`/result/${item.quizId}/${item._id}`)
							: () => setSelectedQuiz(item)
					}
				>
					<div className="font-bold text-lg mb-2 pt-4 px-2">
						{isResultsPage ? item.quizTitle : item.title}
					</div>

					<div className="text-sm opacity-90 text-indigo-100 pb-4 px-2 w-full">
						{isResultsPage ? (
							<>
								<div>
									Score: {item.summary?.score ?? 0}/{item.summary?.total ?? 0}
								</div>
								<div className="text-xs mt-1 opacity-70">
									{item.timestamp
										? new Date(item.timestamp).toLocaleDateString()
										: ""}
								</div>
							</>
						) : (
							<div className="flex flex-col gap-1">
								<span>
									{item.questionsCount
										? `${item.questionsCount} questions`
										: "No questions"}
								</span>
								{item.authorName ? (
									<span className="text-xs text-yellow-300 opacity-80 truncate px-2">
										by {item.authorName}
									</span>
								) : (
									item.isSystem && (
										<span className="text-xs opacity-60">System Quiz</span>
									)
								)}
							</div>
						)}
					</div>
				</button>
			))}

			{selectedQuiz && (
				<Description quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
			)}

			{!loading && items.length === 0 && (
				<div className="text-center col-span-full text-(--col-text-main) flex flex-col gap-2">
					{isResultsPage ? (
						user ? (
							"You have no quiz results yet."
						) : (
							<>
								<span className="text-xl font-bold">
									History is available for registered users.
								</span>
								<Link
									to="/login"
									className="text-(--col-primary) hover:underline text-base"
								>
									Log in to save your progress
								</Link>
							</>
						)
					) : (
						"No quizzes found."
					)}
				</div>
			)}
		</Container>
	);
}
