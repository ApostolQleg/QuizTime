export default function getGoogleAuthErrorMessage(err) {
	if (err?.message === "USER_NOT_FOUND") {
		return "Google one-click sign-up is not available yet. Please use email registration.";
	}

	if (err?.status === 400 || err?.status === 401) {
		return "Google authentication failed. Please choose your Google account again.";
	}

	if (err?.status === 409) {
		return "This Google account is already linked to another account.";
	}

	if (err?.status >= 500) {
		return "Server error during Google sign-up. Please try again in a moment.";
	}

	if (/token|invalid|expired/i.test(err?.message || "")) {
		return "Your Google session is invalid or expired. Please try again.";
	}

	return err?.message || "Google Sign-Up Failed. Please try manually.";
}
