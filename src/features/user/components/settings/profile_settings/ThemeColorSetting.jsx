import ColorGenerator from "@/features/user/components/settings/ColorGenerator.jsx";
import {
	useProfileFormActions,
	useProfileFormDraftState,
} from "@/features/user/stores/profileFormStore.js";
import { PROFILE_CONFIG, PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";

export default function ThemeColorSetting() {
	const draftState = useProfileFormDraftState();
	const { updateField } = useProfileFormActions();

	return (
		<section className="flex flex-col gap-4 p-5 border border-(--col-border) bg-(--col-bg-input-darker)/20 rounded-2xl">
			<div className="flex flex-col gap-1">
				<span className="text-sm font-bold text-(--col-text-muted)">
					{PROFILE_SETTINGS_CONFIG.themeColor.label}
				</span>
				<span className="text-xs text-(--col-text-muted)/80">
					{PROFILE_SETTINGS_CONFIG.themeColor.helpText}
				</span>
			</div>

			<div className="w-full">
				<ColorGenerator
					initialColor={draftState?.themeColor ?? PROFILE_CONFIG.DEFAULT_THEME_COLOR}
					onColorSelect={(color) => updateField("themeColor", color)}
				/>
			</div>
		</section>
	);
}
