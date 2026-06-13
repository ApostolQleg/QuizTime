import { useState } from "react";
import { getNicknameArray } from "@/features/user/api/user.api.js";
import {
	useProfileFormActions,
	useProfileFormDraftState,
} from "@/features/user/stores/profileFormStore.js";
import {
	PROFILE_CONFIG,
	PROFILE_SETTINGS_CONFIG,
	QUIZ_CONSTRAINTS,
} from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import Input from "@/shared/ui/Input.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function NicknameSetting() {
	const draftState = useProfileFormDraftState();
	const { updateField } = useProfileFormActions();
	const { addToast } = useToastActions();
	const [isRolling, setIsRolling] = useState(false);

	const handleRandomNickname = async () => {
		if (isRolling) return;

		try {
			setIsRolling(true);
			const data = await getNicknameArray();
			const nicknames = data.nicknames ?? [];

			for (const nickname of nicknames) {
				updateField("nickname", nickname);
				await sleep(PROFILE_CONFIG.NICKNAME_ROLL_DELAY_MS);
			}

			addToast(PROFILE_SETTINGS_CONFIG.nickname.successToast);
		} catch (error) {
			console.error("Failed to get nicknames", error);
		} finally {
			setIsRolling(false);
		}
	};

	return (
		<section className="flex flex-col gap-4 p-5 border border-(--col-border) bg-(--col-bg-input-darker)/20 rounded-2xl">
			<div className="flex flex-col gap-1">
				<label
					htmlFor="profile-nickname"
					className="text-sm font-bold text-(--col-text-muted)"
				>
					{PROFILE_SETTINGS_CONFIG.nickname.label}
				</label>
				<span className="text-xs text-(--col-text-muted)/80">
					{PROFILE_SETTINGS_CONFIG.nickname.helpText}
				</span>
			</div>

			<div className="flex flex-row items-center gap-3">
				<Input
					id="profile-nickname"
					className="w-48 lg:w-full max-w-xl"
					value={draftState?.nickname ?? ""}
					onChange={(event) => updateField("nickname", event.target.value)}
					placeholder={PROFILE_SETTINGS_CONFIG.nickname.placeholder}
					minLength={QUIZ_CONSTRAINTS.NICKNAME_MIN_LENGTH}
					maxLength={QUIZ_CONSTRAINTS.NICKNAME_MAX_LENGTH}
					required
					disabled={isRolling}
				/>
				<Button type="button" onClick={handleRandomNickname} disabled={isRolling}>
					{isRolling
						? PROFILE_SETTINGS_CONFIG.nickname.randomButtonLabel.rolling
						: PROFILE_SETTINGS_CONFIG.nickname.randomButtonLabel.idle}
				</Button>
			</div>
		</section>
	);
}
