import { getQuizzesList, getResults } from "../services/storage.js";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import addIcon from "../assets/plus-icon.png";
import Description from "../components/Home/Description.jsx";
import Container from "../components/UI/Container.jsx";

export default function Home() {
	const navigate = useNavigate();
	const location = useLocation();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const isResultsPage = location.pathname === "/results";
	const isHelpPage = location.pathname === "/help";

	useEffect(() => {
		// Створюємо асинхронну функцію всередині ефекту
		const fetchData = async () => {
			// Якщо це сторінка допомоги - нічого не вантажимо, просто прибираємо лоадер
			if (isHelpPage) {
				setLoading(false);
				return;
			}

			// Починаємо завантаження
			setLoading(true);
			setItems([]); // Очищуємо старі дані

			try {
				let data;

				if (isResultsPage) {
					data = await getResults();
				} else {
					data = await getQuizzesList();
				}
				setItems(data);
			} catch (err) {
				console.error("Failed to load data", err);
			} finally {
				setLoading(false);
			}
		};

		// Викликаємо цю функцію
		fetchData();
	}, [isResultsPage, isHelpPage]);

	if (isHelpPage) {
		return (
			<Container>
				<div className="text-center text-white col-span-full">
					Here is an information section for new users.
				</div>
			</Container>
		);
	}

	if (loading) {
		return <Container className="text-white text-center">Loading...</Container>;
	}

	return (
		<Container
			className={
				"grid gap-6 lg:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center"
			}
		>
			{/* Картка додавання нового тесту (тільки на головній) */}
			{!isResultsPage && (
				<Link to="/create" id={`quiz-add`} className="quiz-card">
					<img src={addIcon} alt="Add Quiz" className="w-1/2 h-1/2" />
				</Link>
			)}

			{/* Список карток */}
			{items.map((item, index) => (
				<button
					type="button"
					// Використовуємо _id (MongoDB) як ключ
					key={item._id || index}
					className="quiz-card flex flex-col justify-between"
					onClick={
						isResultsPage
							? // Перехід до деталей результату
								() => navigate(`/result/${item.quizId}/${item._id}`)
							: // Відкриття опису вікторини
								() => setSelectedQuiz(item)
					}
				>
					<div className="font-bold text-lg mb-2">
						{isResultsPage ? item.quizTitle : item.title}
					</div>

					<div className="text-sm opacity-80">
						{isResultsPage ? (
							<>
								<div>
									{/* ДОДАНО ПЕРЕВІРКУ: item.summary?.score */}
									Score: {item.summary?.score ?? 0}/{item.summary?.total ?? 0}
								</div>
								<div className="text-xs mt-1 opacity-60">
									{/* Додаємо перевірку і для дати, про всяк випадок */}
									{item.timestamp
										? new Date(item.timestamp).toLocaleDateString()
										: ""}
								</div>
							</>
						) : (
							// Показуємо кількість питань
							<span>
								{item.questionsCount
									? `${item.questionsCount} questions`
									: "Click for details"}
							</span>
						)}
					</div>
				</button>
			))}

			{/* Модальне вікно з описом тесту */}
			{selectedQuiz && (
				<Description quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
			)}

			{/* Повідомлення, якщо список порожній */}
			{!loading && items.length === 0 && (
				<div className="text-center text-white col-span-full">
					{isResultsPage
						? "You have no quiz results yet."
						: "No quizzes found. Create one!"}
				</div>
			)}
		</Container>
	);
}
