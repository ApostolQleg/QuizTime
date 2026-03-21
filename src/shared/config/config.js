// API Configuration
export const API_CONFIG = {
	ITEMS_PER_PAGE_QUIZZES: 36,
	ITEMS_PER_PAGE_QUIZZES_AUTH: 35, // 36 - 1 for create button
	ITEMS_PER_PAGE_RESULTS: 36,
	ITEMS_PER_PAGE_PUBLIC_PROFILE: 36,
};

// Quiz Constraints
export const QUIZ_CONSTRAINTS = {
	TITLE_MAX_LENGTH: 30,
	NICKNAME_MIN_LENGTH: 3,
	NICKNAME_MAX_LENGTH: 20,
	PASSWORD_MIN_LENGTH: 6,
	LOGIN_MIN_LENGTH: 3,
};

// Auto-reload Configuration
export const AUTO_RELOAD_CONFIG = {
	TIME_OUT_MS: 5 * 60 * 1000, // 5 minutes
};

// Color Animation Configuration
export const COLOR_ANIMATION_CONFIG = {
	DURATION_MS: 1000,
	SATURATION: 90,
	LIGHTNESS: 55,
};

// Sorting Options
export const SORT_OPTIONS = [
	{ id: "newest", label: "Newest first" },
	{ id: "oldest", label: "Oldest first" },
	{ id: "az", label: "Alphabetical (A-Z)" },
	{ id: "za", label: "Alphabetical (Z-A)" },
];
