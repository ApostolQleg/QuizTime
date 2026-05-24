import Button from "@/shared/ui/Button.jsx";
import Container from "@/shared/ui/Container.jsx";

export default function Welcome() {
	return (
		<Container className="flex justify-center">
			<Button to="quizzes">Welcome</Button>
		</Container>
	);
}
