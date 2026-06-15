import Button from "@/shared/ui/Button.jsx";

export default function Verify({ formData, onSubmit, onChange, onBack }) {
	return (
		<form
			onSubmit={onSubmit}
			className="w-full max-w-xs mx-auto flex flex-col gap-6 animate-fade-in"
		>
			<div className="flex flex-col gap-2">
				<label
					htmlFor="register-code"
					className="text-sm font-semibold text-(--col-text-muted) ml-1"
				>
					Verification Code
				</label>
				<input
					id="register-code"
					className="input w-full text-lg text-center tracking-widest"
					style={{
						border: "none",
						letterSpacing: "0.3em",
						backgroundColor: "transparent",
					}}
					type="text"
					name="code"
					placeholder="123456"
					value={formData.code}
					onChange={onChange}
					required
				/>
				<p className="text-xs text-center text-(--col-text-muted)">
					Code sent to{" "}
					<span className="text-(--col-text-main) font-bold">{formData.email}</span>
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<Button type="submit" className="w-full mt-2 justify-center text-lg py-3 shadow-lg">
					Next
				</Button>
				<button
					type="button"
					onClick={onBack}
					className="text-sm text-(--col-text-muted) hover:text-(--col-primary) underline bg-transparent border-none cursor-pointer"
				>
					Back to Email
				</button>
			</div>
		</form>
	);
}
