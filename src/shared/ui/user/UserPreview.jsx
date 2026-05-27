import { Link } from "react-router-dom";
import Avatar from "../Avatar";

const VARIANT_CONFIGS = {
	default: {
		linkClass: "flex-row",
		textWrapperClass: "items-start text-left",
		textClass: "",
		avatarSize: "sm",
	},
	sidebar: {
		linkClass: "flex-row",
		textWrapperClass: "items-start text-left",
		textClass: "text-2xl",
		avatarSize: "md",
	},
	header: {
		linkClass: "flex-row-reverse",
		textWrapperClass: "items-end text-right",
		textClass: "",
		avatarSize: "sm",
	},
};

export default function UserPreview({ user, onClick, variant = "default" }) {
	if (!user) return null;

	const config = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.default;

	return (
		<Link
			onClick={onClick}
			to={`/user/${user._id}`}
			title="Go to Profile"
			className={`flex items-center gap-3 group hover:opacity-90 transition-all ${config.linkClass}`}
		>
			<div className="relative group-hover:scale-105 transition-transform duration-300 shrink-0">
				<Avatar
					src={user.avatarUrl}
					name={user.nickname}
					type={user.avatarType}
					color={user.themeColor}
					size={config.avatarSize}
				/>
			</div>

			<div className={`flex flex-col leading-tight min-w-0 ${config.textWrapperClass}`}>
				<span
					className={`font-bold truncate transition-colors duration-300 max-w-50 ${config.textClass || ""}`}
					style={{
						color: user.themeColor || "var(--col-primary)",
					}}
				>
					{user.nickname}
				</span>
			</div>
		</Link>
	);
}
