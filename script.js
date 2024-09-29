import { questionData } from "./data.js";
import ControlManagement from "./ControlManagement.js";
import Question from "./Question.js";

const controlManagement = new ControlManagement(20);

questionData.forEach((questionItem) => {
	let question;
	switch (questionItem.type) {
		case "multiple choice":
			question = new Question(
				questionItem.question,
				questionItem.options,
				questionItem.answer,
				1,
				questionItem.type
			);
			break;
		case "text response":
			question = new Question(
				questionItem.question,
				[],
				questionItem.answer,
				1,
				questionItem.type
			);
			break;
		case "checkbox":
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
