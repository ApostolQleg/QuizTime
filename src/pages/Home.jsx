import { getQuizzesList, getResults } from "../services/storage.js";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import addIcon from "../assets/plus-icon.png";
import Description from "../components/Home/Description.jsx";
import Container from "../components/UI/Container.jsx";

export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();

    // Замість одного storage, тримаємо список елементів (або квізи, або результати)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    // Стани для пагінації (на майбутнє)
    // const [totalPages, setTotalPages] = useState(1);

    const isResultsPage = location.pathname === "/results";
    const isHelpPage = location.pathname === "/help";

    useEffect(() => {
        // setLoading(true);
        if (isResultsPage) {
            // Завантажуємо результати
            getResults()
                .then((data) => {
                    setItems(data); // Бекенд повертає масив результатів
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to load results", err);
                    setLoading(false);
                });
        } else if (!isHelpPage) {
            // Завантажуємо квізи (перша сторінка, наприклад 100 штук, щоб поки без кнопок пагінації)
            getQuizzesList(1, 100)
                .then((response) => {
                    setItems(response.data); // бекенд повертає { data: [...], totalPages: ... }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to load quizzes", err);
                    setLoading(false);
                });
        } else {
            // setLoading(false);
        }
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
            {!isResultsPage && (
                <Link to="/create" id={`quiz-add`} className="quiz-card">
                    <img src={addIcon} alt="Add Quiz" className="w-1/2 h-1/2" />
                </Link>
            )}

            {items.map((item, index) => (
                <button
                    type="button"
                    key={item._id || item.id || index} // Використовуємо _id з Mongo або id
                    className="quiz-card"
                    onClick={
                        isResultsPage
                            // Для результатів переходимо по ID результату (item._id)
                            // item.quizId - це ID квіза, item._id - це ID результату
                            ? () => navigate(`/result/${item.quizId}/${item._id}`)
                            // Для квізів відкриваємо опис
                            : () => setSelectedQuiz(item)
                    }
                >
                    {/* Якщо це результат, показуємо назву квіза (item.quizTitle) */}
                    {isResultsPage ? item.quizTitle : item.title}
                    <br />
                    {isResultsPage ? (
                        <span className="text-sm">
                            Score: {item.summary.score}/{item.summary.total}
                        </span>
                    ) : (
                        // Кількість питань може не приходити в списку квізів (ми робили .select("-questions"))
                        // Тому або показуємо заглушку, або прибираємо цей рядок
                        <span className="text-sm">Click to details</span>
                    )}
                </button>
            ))}

            {selectedQuiz && (
                <Description quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
            )}

            {items.length === 0 && (
                <div className="text-center text-white col-span-full">
                    {isResultsPage
                        ? "You have no quiz results yet."
                        : "No quizzes found. Create one!"}
                </div>
            )}
        </Container>
    );
}