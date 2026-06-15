import { useCallback, useEffect, useRef } from "react";
import { getProfilePageActions } from "@/features/user/hooks/useProfilePageActions.js";
import {
	buildProfilePayload,
	getProfileDraftSignature,
	isProfileDraftEqual,
	useProfileFormStore,
	validateProfileDraft,
} from "@/features/user/stores/profileFormStore.js";
import { PROFILE_CONFIG } from "@/shared/config/config.js";

const SAVE_DELAY_MS = PROFILE_CONFIG.AUTOSAVE_DELAY_MS;

export function useProfileFormAutosave() {
	const profilePageActions = getProfilePageActions();
	const saveProfileRef = useRef(profilePageActions?.saveProfile ?? null);
	const attemptSaveRef = useRef(null);
	const timerRef = useRef(null);
	const resaveRequestedRef = useRef(false);

	useEffect(() => {
		saveProfileRef.current = profilePageActions?.saveProfile ?? null;
	}, [profilePageActions]);

	const flushPendingSave = useCallback(async ({ force = false } = {}) => {
		const attemptSave = attemptSaveRef.current;
		if (!attemptSave) return false;

		return attemptSave(force);
	}, []);

	useEffect(() => {
		const clearTimer = () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		};

		const scheduleSave = () => {
			clearTimer();

			const currentState = useProfileFormStore.getState();
			if (currentState.status !== "dirty") return;

			timerRef.current = setTimeout(() => {
				void attemptSaveRef.current?.(false);
			}, SAVE_DELAY_MS);
		};

		async function attemptSave(force = false) {
			const currentState = useProfileFormStore.getState();
			const profileActions = useProfileFormStore.getState().actions;

			if (!currentState.draftState) return false;

			if (currentState.status === "saving") {
				resaveRequestedRef.current = true;
				return false;
			}

			if (!force && currentState.status !== "dirty") {
				return false;
			}

			if (!validateProfileDraft(currentState.draftState)) {
				profileActions.setStatus("invalid");
				clearTimer();
				return false;
			}

			const payload = buildProfilePayload(currentState.draftState);
			const requestSignature = getProfileDraftSignature(currentState.draftState);

			profileActions.setStatus("saving");
			clearTimer();

			try {
				await saveProfileRef.current?.(payload);
			} catch {
				const latestState = useProfileFormStore.getState();
				const latestStatus = validateProfileDraft(latestState.draftState)
					? isProfileDraftEqual(latestState.initialState, latestState.draftState)
						? "saved"
						: "dirty"
					: "invalid";

				profileActions.setStatus(latestStatus);
				return false;
			} finally {
				const latestState = useProfileFormStore.getState();
				const latestSignature = getProfileDraftSignature(latestState.draftState);
				const shouldReschedule =
					latestSignature !== requestSignature && latestState.status !== "saved";

				if (shouldReschedule || resaveRequestedRef.current) {
					resaveRequestedRef.current = false;
					scheduleSave();
				} else {
					resaveRequestedRef.current = false;
				}
			}

			return true;
		}

		attemptSaveRef.current = attemptSave;

		const unsubscribe = useProfileFormStore.subscribe((state, previousState) => {
			if (
				state.draftState === previousState.draftState &&
				state.status === previousState.status
			) {
				return;
			}

			if (state.status !== "dirty") {
				clearTimer();
				return;
			}

			if (isProfileDraftEqual(state.initialState, state.draftState)) {
				clearTimer();
				return;
			}

			scheduleSave();
		});

		return () => {
			clearTimer();
			unsubscribe();
		};
	}, []);

	return {
		flushPendingSave,
	};
}

export default useProfileFormAutosave;
