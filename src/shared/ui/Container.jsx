export default function Container({ children, className = "" }) {
	return <div className={`${className} container`}>{children}</div>;
}
