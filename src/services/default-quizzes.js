// Test quizzes
export const defaultQuizzes = {
	quizzes: [
		// --- ТЕСТ 1: Англійська мова (A1) ---
		{
			title: "Тест з англійської мови (A1)",
			description: "Перевір свої базові знання англійських слів і граматики.",
			id: "0",
			questions: [
				{
					id: 0,
					text: "Як сказати 'яблуко' англійською?",
					options: [
						{ text: "pear", id: 0, isCorrect: false },
						{ text: "apple", id: 1, isCorrect: true },
						{ text: "orange", id: 2, isCorrect: false },
						{ text: "banana", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Оберіть правильне дієслово: 'They ___ from Ukraine.'",
					options: [
						{ text: "is", id: 0, isCorrect: false },
						{ text: "am", id: 1, isCorrect: false },
						{ text: "are", id: 2, isCorrect: true },
						{ text: "be", id: 3, isCorrect: false },
					],
				},
			],
		},
		// --- ТЕСТ 2: Англійська мова (A2) ---
		{
			title: "Тест з англійської мови (A2)",
			description: "Перевір свої знання часів та структури речень.",
			id: "1",
			questions: [
				{
					id: 0,
					text: "Яке слово означає 'подорож'?",
					options: [
						{ text: "Journey", id: 0, isCorrect: true },
						{ text: "Work", id: 1, isCorrect: false },
						{ text: "Home", id: 2, isCorrect: false },
						{ text: "Street", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Оберіть минулу форму дієслова 'go':",
					options: [
						{ text: "goed", id: 0, isCorrect: false },
						{ text: "gone", id: 1, isCorrect: false },
						{ text: "went", id: 2, isCorrect: true },
						{ text: "going", id: 3, isCorrect: false },
					],
				},
				{
					id: 2,
					text: "Як сказати 'веселий' або 'радісний'?",
					options: [
						{ text: "sad", id: 0, isCorrect: false },
						{ text: "angry", id: 1, isCorrect: false },
						{ text: "tired", id: 2, isCorrect: false },
						{ text: "gay", id: 3, isCorrect: true },
					],
				},
			],
		},
		// --- ТЕСТ 3: Англійська мова (B1) ---
		{
			title: "Тест з англійської мови (B1)",
			description: "Перевір свої знання Present Perfect та умовних речень.",
			id: "2",
			questions: [
				{
					id: 0,
					text: "Оберіть правильну форму: 'I ___ (live) in this city for ten years.'",
					options: [
						{ text: "lived", id: 0, isCorrect: false },
						{ text: "have lived", id: 1, isCorrect: true },
						{ text: "am living", id: 2, isCorrect: false },
						{ text: "will live", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Доповніть речення: 'If I were rich, I ___ a mansion.'",
					options: [
						{ text: "will buy", id: 0, isCorrect: false },
						{ text: "would buy", id: 1, isCorrect: true },
						{ text: "buy", id: 2, isCorrect: false },
						{
							text: "have bought",
							id: 3,
							isCorrect: false,
						},
					],
				},
				{
					id: 2,
					text: "Що означає 'reliable'?",
					options: [
						{ text: "швидкий", id: 0, isCorrect: false },
						{ text: "дорогий", id: 1, isCorrect: false },
						{ text: "надійний", id: 2, isCorrect: true },
						{ text: "складний", id: 3, isCorrect: false },
					],
				},
			],
		},
		// --- ТЕСТ 4: Історія України ---
		{
			title: "Тест: Історія України (Базовий)",
			description: "Перевірте знання ключових подій української історії.",
			id: "3",
			questions: [
				{
					id: 0,
					text: "В якому році було проголошено незалежність України?",
					options: [
						{ text: "1989", id: 0, isCorrect: false },
						{ text: "1991", id: 1, isCorrect: true },
						{ text: "1996", id: 2, isCorrect: false },
						{ text: "2004", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Хто був автором слів гімну України?",
					options: [
						{
							text: "Тарас Шевченко",
							id: 0,
							isCorrect: false,
						},
						{
							text: "Павло Чубинський",
							id: 1,
							isCorrect: true,
						},
						{
							text: "Леся Українка",
							id: 2,
							isCorrect: false,
						},
						{
							text: "Михайло Вербицький",
							id: 3,
							isCorrect: false,
						},
					],
				},
				{
					id: 2,
					text: "Коли відбулася Помаранчева революція?",
					options: [
						{ text: "1991", id: 0, isCorrect: false },
						{ text: "2000", id: 1, isCorrect: false },
						{ text: "2004", id: 2, isCorrect: true },
						{ text: "2014", id: 3, isCorrect: false },
					],
				},
			],
		},
		// --- ТЕСТ 5: Математика ---
		{
			title: "Тест з Математики (Алгебра)",
			description: "Перевірка базових знань з алгебри.",
			id: "4",
			questions: [
				{
					id: 0,
					text: "Який результат виразу: 5 * (4 + 2) - 10?",
					options: [
						{ text: "20", id: 0, isCorrect: true },
						{ text: "30", id: 1, isCorrect: false },
						{ text: "10", id: 2, isCorrect: false },
						{ text: "15", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Чому дорівнює $\\sqrt{81}$?",
					options: [
						{ text: "7", id: 0, isCorrect: false },
						{ text: "9", id: 1, isCorrect: true },
						{ text: "8.1", id: 2, isCorrect: false },
						{ text: "40.5", id: 3, isCorrect: false },
					],
				},
				{
					id: 2,
					text: "Розв'яжіть рівняння: 2x + 5 = 15",
					options: [
						{ text: "x = 10", id: 0, isCorrect: false },
						{ text: "x = 7.5", id: 1, isCorrect: false },
						{ text: "x = 5", id: 2, isCorrect: true },
						{ text: "x = 2.5", id: 3, isCorrect: false },
					],
				},
			],
		},
		// --- ТЕСТ 6: Географія ---
		{
			title: "Тест з Географії (Світ)",
			description: "Перевір свої знання столиць та континентів.",
			id: "5",
			questions: [
				{
					id: 0,
					text: "Яка столиця Канади?",
					options: [
						{ text: "Торонто", id: 0, isCorrect: false },
						{ text: "Ванкувер", id: 1, isCorrect: false },
						{ text: "Оттава", id: 2, isCorrect: true },
						{ text: "Монреаль", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Який найменший континент?",
					options: [
						{ text: "Європа", id: 0, isCorrect: false },
						{ text: "Австралія", id: 1, isCorrect: true },
						{ text: "Антарктида", id: 2, isCorrect: false },
						{
							text: "Південна Америка",
							id: 3,
							isCorrect: false,
						},
					],
				},
				{
					id: 2,
					text: "Яка річка є найдовшою у світі?",
					options: [
						{ text: "Ніл", id: 0, isCorrect: false },
						{ text: "Амазонка", id: 1, isCorrect: true },
						{ text: "Міссісіпі", id: 2, isCorrect: false },
						{ text: "Янцзи", id: 3, isCorrect: false },
					],
				},
			],
		},
		// --- ТЕСТ 7: Програмування (JS) ---
		{
			title: "Тест з JavaScript (Основи)",
			description: "Перевірка знань базового синтаксису JavaScript.",
			id: "6",
			questions: [
				{
					id: 0,
					text: "Як оголосити константу в JS?",
					options: [
						{ text: "var x = 1;", id: 0, isCorrect: false },
						{
							text: "const x = 1;",
							id: 1,
							isCorrect: true,
						},
						{ text: "let x = 1;", id: 2, isCorrect: false },
						{
							text: "constant x = 1;",
							id: 3,
							isCorrect: false,
						},
					],
				},
				{
					id: 1,
					text: "Який метод додає елемент в кінець масиву?",
					options: [
						{ text: "shift()", id: 0, isCorrect: false },
						{ text: "pop()", id: 1, isCorrect: false },
						{ text: "push()", id: 2, isCorrect: true },
						{ text: "unshift()", id: 3, isCorrect: false },
					],
				},
				{
					id: 2,
					text: "Який оператор використовується для строгої рівності (за типом і значенням)?",
					options: [
						{ text: "==", id: 0, isCorrect: false },
						{ text: "=", id: 1, isCorrect: false },
						{ text: "!=", id: 2, isCorrect: false },
						{ text: "===", id: 3, isCorrect: true },
					],
				},
			],
		},
		// --- ТЕСТ 8: Біологія ---
		{
			title: "Тест з Біології (Клітина)",
			description: "Основні знання про будову клітини.",
			id: "7",
			questions: [
				{
					id: 0,
					text: "Який органел відповідає за фотосинтез?",
					options: [
						{
							text: "Мітохондрії",
							id: 0,
							isCorrect: false,
						},
						{ text: "Рибосоми", id: 1, isCorrect: false },
						{ text: "Хлоропласти", id: 2, isCorrect: true },
						{ text: "Ядро", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Що називають 'енергетичною станцією' клітини?",
					options: [
						{ text: "Мітохондрії", id: 0, isCorrect: true },
						{ text: "Лізосоми", id: 1, isCorrect: false },
						{ text: "Вакуолі", id: 2, isCorrect: false },
						{
							text: "Хлоропласти",
							id: 3,
							isCorrect: false,
						},
					],
				},
			],
		},
		// --- ТЕСТ 9: Література ---
		{
			title: "Тест з Української Літератури",
			description: "Твори та автори класичної української літератури.",
			id: "8",
			questions: [
				{
					id: 0,
					text: "Хто є автором поеми 'Катерина'?",
					options: [
						{
							text: "Іван Франко",
							id: 0,
							isCorrect: false,
						},
						{
							text: "Тарас Шевченко",
							id: 1,
							isCorrect: true,
						},
						{
							text: "Леся Українка",
							id: 2,
							isCorrect: false,
						},
						{
							text: "Панас Мирний",
							id: 3,
							isCorrect: false,
						},
					],
				},
				{
					id: 1,
					text: "Хто написав 'Лісову пісню'?",
					options: [
						{
							text: "Ольга Кобилянська",
							id: 0,
							isCorrect: false,
						},
						{
							text: "Іван Нечуй-Левицький",
							id: 1,
							isCorrect: false,
						},
						{
							text: "Леся Українка",
							id: 2,
							isCorrect: true,
						},
						{
							text: "Тарас Шевченко",
							id: 3,
							isCorrect: false,
						},
					],
				},
			],
		},
		// --- ТЕСТ 10: Фізика (Механіка) ---
		{
			title: "Тест з Фізики (Механіка)",
			description: "Базові закони Ньютона та кінематика.",
			id: "9",
			questions: [
				{
					id: 0,
					text: "Яка одиниця вимірювання сили в системі СІ?",
					options: [
						{ text: "Ватт (W)", id: 0, isCorrect: false },
						{ text: "Джоуль (J)", id: 1, isCorrect: false },
						{ text: "Ньютон (N)", id: 2, isCorrect: true },
						{
							text: "Паскаль (Pa)",
							id: 3,
							isCorrect: false,
						},
					],
				},
				{
					id: 1,
					text: "Формула другого закону Ньютона:",
					options: [
						{ text: "F = m * a", id: 0, isCorrect: true },
						{ text: "E = mc^2", id: 1, isCorrect: false },
						{ text: "P = F / A", id: 2, isCorrect: false },
						{ text: "A = F * s", id: 3, isCorrect: false },
					],
				},
			],
		},
		// --- ТЕСТ 11: Кулінарія ---
		{
			title: "Тест: Основи Кулінарії",
			description: "Базові знання про приготування їжі.",
			id: "10",
			questions: [
				{
					id: 0,
					text: "Який інгредієнт є основним у борщі?",
					options: [
						{ text: "Капуста", id: 0, isCorrect: false },
						{ text: "Буряк", id: 1, isCorrect: true },
						{ text: "Морква", id: 2, isCorrect: false },
						{ text: "Картопля", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Як називається процес приготування їжі на гарячій сковороді з невеликою кількістю жиру?",
					options: [
						{ text: "Варіння", id: 0, isCorrect: false },
						{ text: "Тушкування", id: 1, isCorrect: false },
						{ text: "Запікання", id: 2, isCorrect: false },
						{ text: "Смаження", id: 3, isCorrect: true },
					],
				},
			],
		},
		// --- ТЕСТ 12: Комп'ютерні мережі ---
		{
			title: "Тест з Мереж (Основи)",
			description: "Перевірка знань про моделі OSI та протоколи.",
			id: "11",
			questions: [
				{
					id: 0,
					text: "Скільки рівнів має модель OSI?",
					options: [
						{ text: "5", id: 0, isCorrect: false },
						{ text: "7", id: 1, isCorrect: true },
						{ text: "4", id: 2, isCorrect: false },
						{ text: "8", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Який протокол відповідає за передачу веб-сторінок?",
					options: [
						{ text: "FTP", id: 0, isCorrect: false },
						{ text: "SMTP", id: 1, isCorrect: false },
						{ text: "HTTP", id: 2, isCorrect: true },
						{ text: "TCP", id: 3, isCorrect: false },
					],
				},
			],
		},
		// --- ТЕСТ 13: Логіка ---
		{
			title: "Тест на Логіку",
			description: "Перевірка логічного мислення.",
			id: "12",
			questions: [
				{
					id: 0,
					text: "Продовжіть послідовність: 2, 4, 8, 16, ___",
					options: [
						{ text: "24", id: 0, isCorrect: false },
						{ text: "32", id: 1, isCorrect: true },
						{ text: "20", id: 2, isCorrect: false },
						{ text: "64", id: 3, isCorrect: false },
					],
				},
				{
					id: 1,
					text: "Якщо всі А є Б, а деякі Б є В, чи обов'язково деякі А є В?",
					options: [
						{
							text: "Так, завжди",
							id: 0,
							isCorrect: false,
						},
						{
							text: "Ні, не обов'язково",
							id: 1,
							isCorrect: true,
						},
						{
							text: "Тільки якщо А = Б",
							id: 2,
							isCorrect: false,
						},
						{
							text: "Тільки якщо Б = В",
							id: 3,
							isCorrect: false,
						},
					],
				},
			],
		},
		// --- ТЕСТ 14: Мистецтво ---
		{
			title: "Тест з Мистецтва",
			description: "Знання відомих картин та художників.",
			id: "13",
			questions: [
				{
					id: 0,
					text: "Хто намалював картину 'Мона Ліза'?",
					options: [
						{
							text: "Вінсент Ван Гог",
							id: 0,
							isCorrect: false,
						},
						{
							text: "Леонардо да Вінчі",
							id: 1,
							isCorrect: true,
						},
						{
							text: "Пабло Пікассо",
							id: 2,
							isCorrect: false,
						},
						{
							text: "Мікеланджело",
							id: 3,
							isCorrect: false,
						},
					],
				},
				{
					id: 1,
					text: "В якому стилі творив Сальвадор Далі?",
					options: [
						{
							text: "Імпресіонізм",
							id: 0,
							isCorrect: false,
						},
						{ text: "Кубізм", id: 1, isCorrect: false },
						{ text: "Сюрреалізм", id: 2, isCorrect: true },
						{ text: "Реалізм", id: 3, isCorrect: false },
					],
				},
			],
		},
		// --- ТЕСТ 15: Фінанси ---
		{
			title: "Тест з Особистих Фінансів",
			description: "Базові поняття про гроші та інвестиції.",
			id: "14",
			questions: [
				{
					id: 0,
					text: "Що таке 'інфляція'?",
					options: [
						{
							text: "Зростання вартості грошей",
							id: 0,
							isCorrect: false,
						},
						{
							text: "Зниження купівельної спроможності грошей",
							id: 1,
							isCorrect: true,
						},
						{
							text: "Фіксований обмінний курс",
							id: 2,
							isCorrect: false,
						},
						{
							text: "Накопичення багатства",
							id: 3,
							isCorrect: false,
						},
					],
				},
				{
					id: 1,
					text: "Що таке 'диверсифікація' у інвестиціях?",
					options: [
						{
							text: "Вкладення всіх грошей в один актив",
							id: 0,
							isCorrect: false,
						},
						{
							text: "Розподіл інвестицій між різними активами для зниження ризику",
							id: 1,
							isCorrect: true,
						},
						{
							text: "Швидкий продаж активів для отримання прибутку",
							id: 2,
							isCorrect: false,
						},
						{
							text: "Інвестування тільки в іноземну валюту",
							id: 3,
							isCorrect: false,
						},
					],
				},
			],
		},
	],
	// --- Секція результатів залишається без змін (для прикладу) ---
	results: [],
};
