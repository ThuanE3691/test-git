import { QuestionType } from "./Question.js";

export const questionData = [
	{
		question: "What is the capital of France?",
		options: ["Berlin", "Madrid", "Paris", "Rome"],
		answer: "Paris",
		type: QuestionType.MULTIPLE_CHOICE,
	},
	{
		question: "Which planet is known as the Red Planet?",
		options: ["Venus", "Mars", "Jupiter", "Saturn"],
		answer: "Mars",
		type: QuestionType.MULTIPLE_CHOICE,
	},
	{
		question: "What is the largest mammal in the world?",
		options: ["African Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
		answer: "Blue Whale",
		type: QuestionType.MULTIPLE_CHOICE,
	},
	{
		question: "Who wrote 'Romeo and Juliet'?",
		options: [
			"Charles Dickens",
			"Mark Twain",
			"William Shakespeare",
			"Jane Austen",
		],
		answer: "William Shakespeare",
		type: QuestionType.MULTIPLE_CHOICE,
	},
	{
		question: "What is the chemical symbol for gold?",
		options: ["Au", "Ag", "Fe", "Pb"],
		answer: "Au",
		type: QuestionType.MULTIPLE_CHOICE,
	},
	{
		question: "What gas do plants absorb from the atmosphere?",
		options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
		answer: "Carbon Dioxide",
		type: QuestionType.MULTIPLE_CHOICE,
	},
	{
		question: "In which continent is the Sahara Desert located?",
		options: ["Asia", "Africa", "Australia", "North America"],
		answer: "Africa",
		type: QuestionType.MULTIPLE_CHOICE,
	},
	{
		question: "What is the main ingredient in guacamole?",
		options: ["Tomato", "Avocado", "Onion", "Lime"],
		answer: "Avocado",
		type: QuestionType.MULTIPLE_CHOICE,
	},
	{
		question: "What is the boiling point of water in Celsius?",
		answer: "100°C",
		type: QuestionType.TEXT_RESPONSE,
	},
	{
		question: "Name the longest river in the world.",
		answer: "Nile River",
		type: QuestionType.TEXT_RESPONSE,
	},
	{
		question: "What is the currency of Japan?",
		answer: "Yen",
		type: QuestionType.TEXT_RESPONSE,
	},
	{
		question: "Who painted the Mona Lisa?",
		answer: "Leonardo da Vinci",
		type: QuestionType.TEXT_RESPONSE,
	},
	{
		question: "What is the hardest natural substance on Earth?",
		answer: "Diamond",
		type: QuestionType.TEXT_RESPONSE,
	},
	{
		question: "Name the process by which plants make their food.",
		answer: "Photosynthesis",
		type: QuestionType.TEXT_RESPONSE,
	},
	{
		question: "Which of the following are primary colors?",
		options: ["Red", "Blue", "Green", "Yellow"],
		answers: ["Red", "Blue", "Yellow"],
		type: QuestionType.CHECKBOX,
	},
	{
		question: "Which of the following are types of clouds?",
		options: ["Cumulus", "Cirrus", "Stratus", "Nimbus"],
		answers: ["Cumulus", "Cirrus", "Stratus", "Nimbus"],
		type: QuestionType.CHECKBOX,
	},
	{
		question: "Which of the following are classical elements?",
		options: ["Earth", "Air", "Fire", "Water"],
		answers: ["Earth", "Air", "Fire", "Water"],
		type: QuestionType.CHECKBOX,
	},
	{
		question:
			"Which of the following are known as the 'Big Five' animals in Africa?",
		options: ["Lion", "Elephant", "Giraffe", "Rhino", "Leopard"],
		answers: ["Lion", "Elephant", "Rhino", "Leopard"],
		type: QuestionType.CHECKBOX,
	},
	{
		question: "Which of the following are considered programming languages?",
		options: ["Python", "Java", "HTML", "CSS"],
		answers: ["Python", "Java"],
		type: QuestionType.CHECKBOX,
	},
	{
		question: "Which of the following are types of renewable energy?",
		options: ["Solar", "Wind", "Coal", "Hydroelectric"],
		answers: ["Solar", "Wind", "Hydroelectric"],
		type: QuestionType.CHECKBOX,
	},
];
