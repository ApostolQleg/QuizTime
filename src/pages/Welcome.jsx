import { useNavigate } from "react-router";

export default function Welcome() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-[85vh] flex-col items-center justify-start px-4">
			<div className="max-w-4xl w-full space-y-6 opacity-0 animate-welcome">
				<div className="flex flex-1 flex-row sm:items-center gap-4">
					<h1 className="text-7xl font-black tracking-tighter sm:text-9xl text-(--col-text-main) leading-none select-none">
						QuizTime
					</h1>
					<div className="flex flex-1 justify-center ">
						<button
							type="button"
							className="passive-button px-10! sm:px-6! py-1! sm:py-2!"
							onClick={() => {
								navigate("/quizzes");
							}}
						>
							Start
						</button>
					</div>
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
