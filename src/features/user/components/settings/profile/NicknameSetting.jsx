import { useState } from "react";
import { getNicknameArray } from "@/features/user/api/user.api.js";
import {
	useProfileFormActions,
	useProfileFormDraftState,
} from "@/features/user/stores/profileFormStore.js";
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
				await sleep(70);
			}

			addToast("Nickname generated.");
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
					Nickname
				</label>
				<span className="text-xs text-(--col-text-muted)/80">
					Set your public name or roll a random one.
				</span>
			</div>

			<div className="w-full flex flex-row items-center gap-3">
				<Input
					id="profile-nickname"
					className="flex-1"
					value={draftState?.nickname ?? ""}
					onChange={(event) => updateField("nickname", event.target.value)}
					placeholder="Enter your nickname"
					minLength={3}
					maxLength={20}
					required
					disabled={isRolling}
				/>
				<Button
					type="button"
					onClick={handleRandomNickname}
					disabled={isRolling}
					className="px-4 py-2 bg-(--col-bg-input) border border-(--col-border) hover:bg-(--col-border) text-(--col-text-main) shadow-none text-sm"
				>
					{isRolling ? "Rolling..." : "Random"}
				</Button>
			</div>
		</section>
	);
}
