import ColorGenerator from "@/features/user/components/settings/ColorGenerator.jsx";
import {
	useProfileFormActions,
	useProfileFormDraftState,
} from "@/features/user/stores/profileFormStore.js";
import { PROFILE_CONFIG, PROFILE_SETTINGS_CONFIG } from "@/shared/config/config.js";
import SettingCard from "@/shared/ui/SettingCard.jsx";

export default function ThemeColorSetting() {
	const draftState = useProfileFormDraftState();
	const { updateField } = useProfileFormActions();

	return (
		<SettingCard
			title={PROFILE_SETTINGS_CONFIG.themeColor.label}
			helpText={PROFILE_SETTINGS_CONFIG.themeColor.helpText}
		>
			<div className="w-full">
				<ColorGenerator
					initialColor={draftState?.themeColor ?? PROFILE_CONFIG.DEFAULT_THEME_COLOR}
					onColorSelect={(color) => updateField("themeColor", color)}
				/>
			</div>
		</SettingCard>
	);
}
