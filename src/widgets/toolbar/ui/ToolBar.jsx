import SearchBar from "./SearchBar.jsx";
import Sort from "./Sort.jsx";

export default function ToolBar({ search, sort, placeholder = "Search..." }) {
	const { value: searchQuery = "", onChange: onSearchChange } = search || {};
	const { value: sortOption = "newest", onChange: onSortChange } = sort || {};

	return (
		<div className="w-full flex flex-row items-center shrink-0">
			<SearchBar
				searchTerm={searchQuery}
				onSearchChange={onSearchChange}
				placeholder={placeholder}
			/>
			<Sort currentSort={sortOption} onSortChange={onSortChange} />
		</div>
	);
}
