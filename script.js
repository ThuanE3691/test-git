import { questionData } from "./data.js";
import { QuestionType, Question } from "./Question.js";
import ControlManagement from "./ControlManagement.js";

const controlManagement = new ControlManagement(45);

// Get random 10 questions
const randomQuestions = questionData
	.sort(() => 0.5 - Math.random())
	.slice(0, 10);

randomQuestions.forEach((questionItem) => {
	let question;
	switch (questionItem.type) {
		case QuestionType.MULTIPLE_CHOICE:
			question = new Question(
				questionItem.question,
				questionItem.options,
				questionItem.answer,
				1,
				questionItem.type
			);
			break;
		case QuestionType.TEXT_RESPONSE:
			question = new Question(
				questionItem.question,
				[],
				questionItem.answer,
				1,
				questionItem.type
			);
			break;
		case QuestionType.CHECKBOX:
			question = new Question(
				questionItem.question,
				questionItem.options,
				questionItem.answers,
				1,
				questionItem.type
			);
			break;
	}

	if (question) {
		controlManagement.addQuestion(question);
	}
});
