import Input from "../UI/Input";

export default function SearchBar({ onChange, placeholder }) {
	return <Input onChange={onChange} placeholder={placeholder} className="w-lg" />;
}
