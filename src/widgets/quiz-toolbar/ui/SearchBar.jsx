import Input from "@/shared/ui/Input.jsx";
import searchIcon from "@/shared/assets/search-icon.png";

export default function SearchBar({ searchTerm, onSearchChange, placeholder = "Search..." }) {
	return (
		<Input
			value={searchTerm}
			onChange={(e) => onSearchChange(e.target.value)}
			image={searchIcon}
			placeholder={placeholder}
			className="w-full max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl p-4"
		/>
	);
}
