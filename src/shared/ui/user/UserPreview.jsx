import { Link } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import Avatar from "../Avatar";

const VARIANT_CONFIGS = {
	default: {
		linkClass: "flex-row",
		avatarSize: "sm",
	},
	sidebar: {
		linkClass: "flex-row",
		textClass: "text-2xl",
		avatarSize: "md",
	},
	header: {
		linkClass: "flex-row-reverse",
		avatarSize: "sm",
	},
};

export default function UserPreview({ onClick, variant = "default" }) {
	const { user } = useAuthUserState();
	if (!user) return null;

	const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.default;

	return (
		<div className="flex items-center gap-4 sm:gap-6">
			<Link
				onClick={onClick}
				to={`/user/${user._id}`}
				title="Go to Profile"
				className={`flex flex-1 items-center gap-3 group hover:opacity-90 transition-all ${config.linkClass}`}
			>
				<div className="relative group-hover:scale-105 transition-transform duration-300">
					<Avatar
						src={user.avatarUrl}
						name={user.nickname}
						type={user.avatarType}
						color={user.themeColor}
						size={config.avatarSize}
					/>
				</div>

				<div className="flex flex-col items-end leading-tight">
					<span
						className={`font-bold truncate transition-colors duration-300 max-w-50 ${config.textClass}`}
						style={{
							color: user.themeColor || "var(--col-primary)",
						}}
					>
						{user.nickname}
					</span>
				</div>
			</Link>
		</div>
	);
}
