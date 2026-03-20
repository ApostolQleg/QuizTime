import Container from "@/shared/ui/Container.jsx";

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
						page, browse or search the collection and click on any card to view details.
					</p>
					<ul className="list-disc list-inside pl-2 sm:pl-4 opacity-90 space-y-1 marker:text-(--col-primary)">
						<li>
							Use the <span className="font-bold">search bar</span> or{" "}
							<span className="font-bold">sort</span> options to find what you are
							looking for.
						</li>
						<li>
							Click a card to open its details. You can also click the author&apos;s
							name to visit their public profile.
						</li>
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
							page. You can search, sort, and click any past result to review your
							answers in detail.
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
							Quizzes page to create a new quiz.
						</li>
						<li>
							Fill in the <strong>Title</strong>, <strong>Description</strong>, and
							add as many questions and answer options as you like.
						</li>
						<li>
							If you are the author of a quiz, open its details card to find the{" "}
							<span className="font-bold text-(--col-primary)">Manage</span> button
							(edit title, description, and questions) or the{" "}
							<span className="font-bold text-(--col-fail)">Delete</span> button to
							remove it permanently.
						</li>
						<li>
							The <span className="font-bold">My Quizzes</span> page shows all quizzes
							you have created in one place, also with search and sort support.
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold text-(--col-text-accent) mb-3">
						👤 Your Profile
					</h2>
					<p className="mb-2">
						Registered users can personalise their account from the{" "}
						<span className="font-bold">Profile</span> page:
					</p>
					<ul className="list-disc list-inside pl-2 sm:pl-4 opacity-90 space-y-1 marker:text-(--col-primary)">
						<li>Update your nickname, avatar, and theme colour.</li>
						<li>Change your password at any time.</li>
						<li>
							Permanently delete your account and all associated results from the{" "}
							<span className="font-bold text-(--col-fail)">Danger Zone</span>{" "}
							section.
						</li>
					</ul>
				</section>
			</div>
		</Container>
	);
}
