import Input from "../UI/Input";

export default function SearchBar({ searchTerm, onSearchChange, placeholder = "Search..." }) {
	return (
		<Input
			value={searchTerm}
			onChange={(e) => onSearchChange(e.target.value)}
			placeholder={placeholder}
			className="w-lg p-4"
		/>
	);
}
