import ColorGenerator from "@/features/user/components/ColorGenerator.jsx";
import {
	useProfileFormActions,
	useProfileFormDraftState,
} from "@/features/user/stores/profileFormStore.js";

export default function ThemeColorSetting() {
	const draftState = useProfileFormDraftState();
	const { updateField } = useProfileFormActions();

	return (
		<section className="flex flex-col gap-4 p-5 border border-(--col-border) bg-(--col-bg-input-darker)/20 rounded-2xl">
			<div className="flex flex-col gap-1">
				<span className="text-sm font-bold text-(--col-text-muted)">Theme Color</span>
				<span className="text-xs text-(--col-text-muted)/80">
					This color styles your nickname and default avatar.
				</span>
			</div>

			<div className="w-full">
				<ColorGenerator
					initialColor={draftState?.themeColor ?? "#4f46e5"}
					onColorSelect={(color) => updateField("themeColor", color)}
				/>
			</div>
		</section>
	);
}
