import Input from "../UI/Input";

export default function SearchBar({ searchTerm, onSearchChange, placeholder = "Search..." }) {
	return (
		<Input
			value={searchTerm}
			onChange={(e) => onSearchChange(e.target.value)}
			placeholder={"🔍 " + placeholder}
			className="w-xs sm:w-sm lg:w-lg xl:w-xl p-4"
		/>
	);
}
