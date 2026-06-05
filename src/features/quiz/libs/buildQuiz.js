export const buildQuizPayload = ({ title, category, tags, description, questions }) => ({
	title,
	category,
	tags: tags.reduce((acc, tag) => {
		const normalizedTag = tag.text.trim();
		if (normalizedTag !== "") {
			acc.push(normalizedTag);
		}
		return acc;
	}, []),
	description,
	questions,
});
