import SearchBar from "./SearchBar.jsx";
import Sort from "./Sort.jsx";

export default function ToolBar({ search, sort, placeholder = "Search..." }) {
	const { value: searchQuery = "", onChange: onSearchChange } = search || {};
	const { value: sortOption = "newest", onChange: onSortChange } = sort || {};

	return (
		<div className="flex flex-row items-stretch justify-center gap-3 w-full max-w-xs sm:max-w-xl lg:max-w-2xl">
			<SearchBar
				searchTerm={searchQuery}
				onSearchChange={onSearchChange}
				placeholder={placeholder}
			/>
			<Sort currentSort={sortOption} onSortChange={onSortChange} />
		</div>
	);
}
