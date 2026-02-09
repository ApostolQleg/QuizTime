import Container from "../components/UI/Container.jsx";

export default function Help() {
	return (
		<Container className="container-card gap-6 text-left">
			<div className="quiz-title border-none pb-0">How to use QuizTime</div>
			<div className="space-y-8 text-(--col-text-main)">
				<section>
					<h2 className="text-xl font-bold text-(--col-text-accent) mb-3">
						🎮 Taking a Quiz
					</h2>
					<p className="mb-2">
						Anyone can take a quiz! On the <span className="font-bold">Quizzes</span>{" "}
						page, browse the collection and click on any card to view details.
					</p>
					<ul className="list-disc list-inside pl-2 sm:pl-4 opacity-90 space-y-1 marker:text-(--col-primary)">
						<li>
							Click <span className="font-bold text-(--col-primary)">Start Quiz</span>{" "}
							to begin.
						</li>
						<li>Select the answer you think is correct for each question.</li>
						<li>
							Click <span className="font-bold text-(--col-danger)">Submit</span> to
							see your score immediately.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold text-(--col-text-accent) mb-3">
						🔐 Accounts & History
					</h2>
					<p className="mb-2">
						While guests can play freely, logging in unlocks the full experience:
					</p>
					<ul className="list-disc list-inside pl-2 sm:pl-4 opacity-90 space-y-1 marker:text-(--col-primary)">
						<li>
							<span className="font-bold text-white">Guest Mode:</span> You see your
							result once, but it is <span className="italic">not saved</span>.
						</li>
						<li>
							<span className="font-bold text-white">Registered Users:</span> All your
							attempts are saved to the <span className="font-bold">Results</span>{" "}
							page. You can track your progress and see exactly when you took each
							quiz.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold text-(--col-text-accent) mb-3">
						✨ Creating & Managing Quizzes
					</h2>
					<p className="mb-2">Logged-in users can contribute to the community!</p>
					<ul className="list-disc list-inside pl-2 sm:pl-4 opacity-90 space-y-1 marker:text-(--col-primary)">
						<li>
							Click the card with the{" "}
							<span className="font-bold text-(--col-primary)">+</span> icon on the
							home page.
						</li>
						<li>
							Fill in the <strong>Title</strong>, <strong>Description</strong>, and
							add as many questions as you like.
						</li>
						<li>
							<strong>Manage:</strong> If you are the author of a quiz, you can open
							its details card to{" "}
							<span className="font-bold text-(--col-primary)">Edit</span> or{" "}
							<span className="font-bold text-(--col-fail)">Delete</span> it.
						</li>
					</ul>
				</section>
			</div>
		</Container>
	);
}
