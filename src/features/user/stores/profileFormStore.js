import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { PROFILE_CONFIG, QUIZ_CONSTRAINTS } from "@/shared/config/config.js";

const DEFAULT_THEME_COLOR = PROFILE_CONFIG.DEFAULT_THEME_COLOR;
const MUTABLE_FIELDS = ["nickname", "avatarType", "themeColor"];

const cloneProfileState = (user) => {
	if (!user) return null;

	return {
		...user,
		nickname: user.nickname ?? "",
		avatarType: user.avatarType ?? "generated",
		themeColor: user.themeColor ?? DEFAULT_THEME_COLOR,
	};
};

const getProfileDraftSignature = (profileState) => {
	if (!profileState) return "";

	return [
		profileState.nickname ?? "",
		profileState.avatarType ?? "",
		profileState.themeColor ?? "",
	].join("|");
};

const isProfileDraftEqual = (leftProfileState, rightProfileState) => {
	if (!leftProfileState || !rightProfileState) return false;

	return MUTABLE_FIELDS.every(
		(field) => (leftProfileState[field] ?? "") === (rightProfileState[field] ?? ""),
	);
};

export const buildProfilePayload = (profileState) => ({
	nickname: profileState?.nickname?.trim() ?? "",
	avatarType: profileState?.avatarType ?? "generated",
	themeColor: profileState?.themeColor ?? DEFAULT_THEME_COLOR,
});

export const validateProfileDraft = (profileState) => {
	const nickname = profileState?.nickname?.trim() ?? "";

	return (
		nickname.length >= QUIZ_CONSTRAINTS.NICKNAME_MIN_LENGTH &&
		nickname.length <= QUIZ_CONSTRAINTS.NICKNAME_MAX_LENGTH
	);
};

const resolveProfileStatus = (initialState, draftState) => {
	if (!draftState) return "saved";
	if (!validateProfileDraft(draftState)) return "invalid";
	if (initialState && isProfileDraftEqual(initialState, draftState)) return "saved";
	return "dirty";
};

const initialStoreState = {
	initialState: null,
	draftState: null,
	status: "saved",
};

export const useProfileFormStore = create((set) => ({
	...initialStoreState,
	actions: {
		initialize: (user) => {
			const profileState = cloneProfileState(user);

			set({
				initialState: profileState,
				draftState: profileState,
				status: "saved",
			});
		},
		updateField: (key, value) =>
			set((state) => {
				const baseState = state.draftState ?? state.initialState ?? {};
				const draftState = {
					...baseState,
					[key]: value,
				};

				return {
					draftState,
					status: resolveProfileStatus(state.initialState, draftState),
				};
			}),
		setStatus: (status) => set({ status }),
		commit: (user) => {
			const profileState = cloneProfileState(user);

			set({
				initialState: profileState,
				draftState: profileState,
				status: "saved",
			});
		},
		reset: () => set({ ...initialStoreState }),
	},
}));

export const useProfileFormState = () =>
	useProfileFormStore(
		useShallow((state) => ({
			initialState: state.initialState,
			draftState: state.draftState,
			status: state.status,
		})),
	);

export const useProfileFormDraftState = () =>
	useProfileFormStore(useShallow((state) => state.draftState));

export const useProfileFormStatusState = () =>
	useProfileFormStore(useShallow((state) => ({ status: state.status })));

export const useProfileFormActions = () => useProfileFormStore.getState().actions;

export { cloneProfileState, getProfileDraftSignature, isProfileDraftEqual };
