export const API_CONFIG = {
	ITEMS_PER_PAGE_QUIZZES: 36,
	ITEMS_PER_PAGE_QUIZZES_AUTH: 35, // -1 for create button
	ITEMS_PER_PAGE_RESULTS: 36,
	ITEMS_PER_PAGE_PUBLIC_PROFILE: 36,
};

export const QUIZ_CONSTRAINTS = {
	TITLE_MAX_LENGTH: 30,
	NICKNAME_MIN_LENGTH: 3,
	NICKNAME_MAX_LENGTH: 20,
	PASSWORD_MIN_LENGTH: 6,
	LOGIN_MIN_LENGTH: 3,
};

export const AUTO_RELOAD_CONFIG = {
	TIME_OUT_MS: 5 * 60 * 1000, // 5 minutes
};

export const TOAST_CONFIG = {
	MAX_TOASTS: 3,
	TOAST_LIFETIME: 5 * 1000, // 5 seconds
	TOAST_ANIM_TIME: 200, // 200 ms
};

export const COLOR_ANIMATION_CONFIG = {
	DURATION_MS: 1000,
	SATURATION: 90,
	LIGHTNESS: 55,
};

export const SORT_OPTIONS = [
	{ id: "newest", label: "Newest first" },
	{ id: "oldest", label: "Oldest first" },
	{ id: "az", label: "Alphabetical (A-Z)" },
	{ id: "za", label: "Alphabetical (Z-A)" },
];

// const API_URL = "http://localhost:3000/api";
const API_URL = import.meta.env.VITE_API_URL;

export const URL_CONFIG = {
	API_URL: API_URL,
	AUTH_URL: API_URL.replace("/api", "/auth"),
};

export const QUIZ_CATEGORIES = [
	"Programming",
	"Music",
	"Gaming",
	"History",
	"Science",
	"Literature",
	"Other",
];

export const QUIZ_TAGS = [
	"Test",
	"Dev",
	"Easy",
	"Medium",
	"Hard",
	"Expert",
	"Fun",
	"Educational",
	"Trivia",
	"Challenge",
	"Quick",
	"Interview",
	"Exam",
	"Logic",
	"Math",
];

export const PROFILE_CONFIG = {
	DEFAULT_THEME_COLOR: "#4f46e5",
	AUTOSAVE_DELAY_MS: 1000,
	NICKNAME_ROLL_DELAY_MS: 70,
	AVATAR_FALLBACK_INITIAL: "?",
	SAVE_STATUS_META: {
		saved: {
			label: "Saved",
			className: "border-(--col-border) bg-(--col-bg-input-darker)/80 text-(--col-text-main)",
		},
		dirty: {
			label: "Unsaved changes...",
			className: "border-amber-400/30 bg-amber-400/10 text-amber-200",
		},
		saving: {
			label: "Saving...",
			className: "border-sky-400/30 bg-sky-400/10 text-sky-200",
		},
		invalid: {
			label: "Invalid Name",
			className: "border-(--col-fail)/30 bg-(--col-fail-bg) text-(--col-fail)",
		},
	},
};

export const PROFILE_SETTINGS_CONFIG = {
	page: {
		title: "Settings",
		tabs: [
			{ id: "all", label: "All" },
			{ id: "profile", label: "Profile" },
			{ id: "other", label: "Other" },
		],
	},
	profile: {
		title: "Profile Settings",
		autosaveHint: "Changes are saved automatically after a short pause.",
	},
	nickname: {
		label: "Nickname",
		helpText: "Set your public name or roll a random one.",
		placeholder: "Enter your nickname",
		randomButtonLabel: {
			idle: "Random",
			rolling: "Rolling...",
		},
		successToast: "Nickname generated.",
	},
	themeColor: {
		label: "Theme Color",
		helpText: "This color styles your nickname and default avatar.",
	},
	avatar: {
		label: "Avatar Customization",
		helpText: "Choose how your profile picture looks to other users.",
		options: {
			google: "Google Photo",
			generated: "Pure Color",
		},
		google: {
			connectedLabel: "Active: synchronization with Google Profile Photo",
			disconnectedTitle: "Connect Google Account",
			disconnectedText: "Link your account to import your official Google photo.",
			connectButtonText: "continue_with",
		},
		generated: {
			activeLabel: "Active: styling using your Profile Theme Color",
		},
	},
	session: {
		title: "Session",
		signedInAsPrefix: "Signed in as ",
		fallbackName: "you",
		helpText: "Log out on this device.",
		buttonLabel: "Sign Out",
	},
	dangerZone: {
		title: "Danger Zone",
		changePassword: {
			title: "Change Password",
			helpText: "Update your password to keep your account secure.",
			buttonLabel: "Change Password",
		},
		deleteAccount: {
			title: "Delete Account",
			helpText: "Permanently remove your account and all quiz results.",
			buttonLabel: "Delete",
			modalTitle: "Delete Account?",
			modalMessage:
				"Are you sure you want to delete your account? This action cannot be undone.",
			modalConfirmLabel: "Yes",
		},
	},
};
