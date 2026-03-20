import Input from "@/shared/ui/Input.jsx";

export default function SearchBar({ searchTerm, onSearchChange, placeholder = "Search..." }) {
	return (
		<Input
			value={searchTerm}
			onChange={(e) => onSearchChange(e.target.value)}
			placeholder={"🔍 " + placeholder}
			className="w-full max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl p-4"
		/>
	);
}
