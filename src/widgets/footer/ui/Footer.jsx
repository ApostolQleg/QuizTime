import teamlogo from "@/shared/assets/piska_team_blue.png";

export default function Footer() {
	return (
		<footer className="flex flex-row justify-center items-center mt-auto text-center p-6 text-sm shadow-[0_-10px_40px_rgba(0,0,0,0.3)] bg-(--col-bg-card) text-(--col-text-muted) border-t border-(--col-border)">
			<div className="w-3xs">
				<img src={teamlogo} />
			</div>
			<div className="flex flex-col">
				&copy; Piska team, 2025
				<br />
				developers: Oleg & Dima
				<br />
				the best team lead: Bohdanchik
				<br />
				dev ideas and moral support: Vlad, Bohdan
			</div>
		</footer>
	);
}
