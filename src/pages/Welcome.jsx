import Button from "@/shared/ui/Button.jsx";

export default function Welcome() {
	return (
		<div className="flex min-h-[85vh] flex-col items-center justify-start px-4">
			<div className="max-w-4xl w-full space-y-6 opacity-0 animate-welcome">
				<div className="flex flex-col sm:flex-row sm:items-end gap-9">
					<h1 className="text-7xl font-black tracking-tighter sm:text-9xl text-(--col-text-main) leading-none select-none">
						QuizTime
					</h1>

					<Button
						to="/quizzes"
						className="auth-button text-2xl px-8 py-4 font-bold tracking-wider uppercase border-2 border-(--col-border) mb-1"
					>
						Start
					</Button>
				</div>

				<p className="text-xl sm:text-2xl text-(--col-text-muted) max-w-3xl text-left font-medium leading-relaxed pt-2">
					Browse, search, and take public quizzes instantly. Log in to unlock full
					response history tracking, review detailed scores, personalize your profile with
					custom themes, and build your own quizzes to contribute to the community.
				</p>
			</div>
		</div>
	);
}
