export default function SettingCard({
	title,
	helpText,
	children,
	isDanger = false,
	htmlFor,
	className = "",
}) {
	const TitleElement = htmlFor ? "label" : "span";

	return (
		<section
			className={`flex flex-col gap-4 p-5 border rounded-2xl w-full max-w-xl transition-all duration-200 ${
				isDanger
					? "border-(--col-fail)/30 bg-(--col-fail-bg)/10"
					: "border-(--col-border) bg-(--col-bg-input-darker)/20"
			} ${className}`}
		>
			<div className="flex flex-col gap-1">
				<TitleElement
					{...(htmlFor ? { htmlFor } : {})}
					className={`text-sm font-bold ${isDanger ? "text-(--col-fail)" : "text-(--col-text-muted)"}`}
				>
					{title}
				</TitleElement>
				{helpText && <span className="text-xs text-(--col-text-muted)/80">{helpText}</span>}
			</div>

			{children}
		</section>
	);
}
