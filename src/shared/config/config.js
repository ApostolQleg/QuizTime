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
    "Other"
];

export const QUIZ_TAGS = [
	"Test", "Dev",
    "Easy", "Medium", "Hard", "Expert",
    "Fun", "Educational", "Trivia", "Challenge", "Quick",
    "Interview", "Exam", "Logic", "Math"
];