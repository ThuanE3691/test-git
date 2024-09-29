export const QuestionType = Object.freeze({
	MULTIPLE_CHOICE: 0,
	TEXT_RESPONSE: 1,
	CHECKBOX: 2,
});

export class Question {
	constructor(question, options, correctAnswer, score, type) {
		this.question = question;
		this.options = options;
		this.correctAnswer = correctAnswer;
		this.score = score;
		this.type = type;

		this.validate();
	}

	validate() {
		if (this.score < 0) {
			throw new Error("Score must be non-negative");
		}
		if (!Object.values(QuestionType).includes(this.type)) {
			throw new Error("Invalid question type");
		}
		if (
			this.type === QuestionType.MULTIPLE_CHOICE &&
			!this.options.includes(this.correctAnswer)
		) {
			throw new Error("Correct answer not found in choices");
		}
		if (
			this.type === QuestionType.CHECKBOX &&
			!Array.isArray(this.correctAnswer)
		) {
			throw new Error("Correct answer for checkbox question must be an array");
		}
	}

	checkAnswer(userAnswer) {
		switch (this.type) {
			case QuestionType.MULTIPLE_CHOICE: // multiple choice
				return this.options[userAnswer] === this.correctAnswer;
			case QuestionType.CHECKBOX: // checkbox
				return (
					Array.isArray(userAnswer) &&
					userAnswer.length === this.correctAnswer.length &&
					userAnswer.every((index) =>
						this.correctAnswer.includes(this.options[index])
					)
				);
			default:
				return false;
		}
	}

	getScore(isCorrect) {
		return isCorrect ? this.score : 0;
	}
}
