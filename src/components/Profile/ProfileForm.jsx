import { useState } from "react";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import AvatarGenerator from "./AvatarGenerator.jsx";

export default function ProfileForm({ user, onSave, isLoading }) {
	const [name, setName] = useState(user.name || "");
	const [avatarType, setAvatarType] = useState(user.avatarType || "google");
	const [generatedColor, setGeneratedColor] = useState(user.themeColor || "#4f46e5");

	const hasChanges =
		name !== user.name ||
		avatarType !== user.avatarType ||
		(avatarType === "generated" && generatedColor !== user.themeColor);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave({
			name,
			avatarType,
			themeColor: generatedColor,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg">
			<div className="flex flex-col gap-2">
				<label className="text-sm font-bold text-(--col-text-muted)">Nickname</label>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Enter your nickname"
					minLength={3}
					maxLength={20}
					required
				/>
			</div>

			<div className="flex flex-col gap-3">
				<label className="text-sm font-bold text-(--col-text-muted)">Avatar Source</label>

				<div className="flex gap-4 p-1 bg-(--col-bg-input) rounded-lg border border-(--col-border)">
					<button
						type="button"
						onClick={() => setAvatarType("google")}
						className={`flex-1 py-2 rounded-md transition-all text-sm font-semibold cursor-pointer
                            ${
								avatarType === "google"
									? "bg-(--col-bg-card) shadow-md text-(--col-text-main)"
									: "text-(--col-text-muted) hover:text-(--col-text-main)"
							}`}
					>
						Google Photo
					</button>
					<button
						type="button"
						onClick={() => setAvatarType("generated")}
						className={`flex-1 py-2 rounded-md transition-all text-sm font-semibold cursor-pointer
                            ${
								avatarType === "generated"
									? "bg-(--col-bg-card) shadow-md text-(--col-text-main)"
									: "text-(--col-text-muted) hover:text-(--col-text-main)"
							}`}
					>
						Color Generator
					</button>
				</div>
			</div>

			<div className="animate-fade-in">
				{avatarType === "google" ? (
					<div className="flex flex-col items-center p-6 border border-(--col-border) rounded-xl bg-(--col-bg-input-darker)">
						{user.avatarUrl ? (
							<img
								src={user.avatarUrl}
								alt="Google Avatar"
								className="w-24 h-24 rounded-full shadow-lg"
							/>
						) : (
							<div className="w-24 h-24 rounded-full bg-gray-600 flex items-center justify-center text-2xl">
								?
							</div>
						)}
						<p className="mt-4 text-sm text-(--col-text-muted)">
							Using your Google account photo
						</p>
					</div>
				) : (
					<AvatarGenerator
						initialColor={generatedColor}
						onColorSelect={setGeneratedColor}
					/>
				)}
			</div>

			<Button
				className={`w-full mt-4 ${!hasChanges ? "opacity-50 cursor-not-allowed" : "shadow-xl"}`}
				disabled={!hasChanges || isLoading}
			>
				{isLoading ? "Saving..." : "Save Changes"}
			</Button>
		</form>
	);
}
