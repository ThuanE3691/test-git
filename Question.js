class Question {
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
		if (!["multiple choice", "text response", "checkbox"].includes(this.type)) {
			throw new Error("Invalid question type");
		}
		if (
			this.type === "multiple choice" &&
			!this.options.includes(this.correctAnswer)
		) {
			throw new Error("Correct answer not found in choices");
		}
		if (this.type === "checkbox" && !Array.isArray(this.correctAnswer)) {
			throw new Error("Correct answer for checkbox question must be an array");
		}
	}

	checkAnswer(userAnswer) {
		switch (this.type) {
			case "multiple choice":
			case "text response":
				return userAnswer === this.correctAnswer;
			case "checkbox":
				return (
					Array.isArray(userAnswer) &&
					userAnswer.length === this.correctAnswer.length &&
					userAnswer.every((answer) => this.correctAnswer.includes(answer))
				);
			default:
				return false;
		}
	}

	getScore(isCorrect, timeRemaining) {
		return isCorrect && timeRemaining > 0 ? this.score : 0;
	}
}

export default Question;
