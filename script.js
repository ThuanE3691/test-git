class Question {
	constructor(question, choices, correctAnswerIndex, score) {
		this.question = question;
		this.choices = choices;
		this.correctAnswerIndex = correctAnswerIndex;
		this.score = score;

		this.validate();
	}

	validate() {
		if (
			this.correctAnswerIndex < 0 ||
			this.correctAnswerIndex >= this.choices.length
		) {
			throw new Error("Invalid correctAnswerIndex");
		}
		if (this.score < 0) {
			throw new Error("Score must be non-negative");
		}
	}

	checkAnswer(selectedChoiceIndex) {
		return selectedChoiceIndex === this.correctAnswerIndex;
	}

	getScore(isCorrect, timeRemaining) {
		return isCorrect && timeRemaining > 0 ? this.score : 0;
	}
}

class Flow {
	timeRemaining;
	totalScore = 0;
	currentState = null;
	currentQuestionIndex = 0;
	questions = [];
	timeInterval = null;
	isComplete = false;

	constructor(time) {
		this.timeRemaining = time;
	}

	start() {
		this.startCountDownTime();
		const startState = this.getCurrentQuestionState();
		this.setState(startState);
	}

	setState(state) {
		this.currentState = state;
		this.run();
	}

	run() {
		this.currentState.run();
	}

	renderAndUpdateClock() {
		console.log(`Time remaining: ${this.timeRemaining} seconds`);
	}

	startCountDownTime() {
		this.timeInterval = setInterval(() => {
			if (this.timeRemaining <= 0) {
				return this.stop();
			}
			this.timeRemaining -= 1;
			this.renderAndUpdateClock();
		}, 1000);
	}

	addQuestion(question) {
		this.questions.push(question);
	}

	stop() {
		clearInterval(this.timeInterval);
		this.timeInterval = null;
		this.setState(new EndFlowState(this));
	}

	getCurrentQuestionState() {
		return new ShowQuestionState(
			this,
			this.questions[this.currentQuestionIndex]
		);
	}

	nextQuestion() {
		if (this.currentQuestionIndex < this.questions.length - 1) {
			this.currentQuestionIndex++;
			this.setState(this.getCurrentQuestionState());
		} else {
			// Mean that user has answered all question in legal time
			this.isComplete = true;
			this.stop();
		}
	}

	updateScore(score) {
		this.totalScore += score;
	}
}

class ShowQuestionState {
	constructor(flow, question) {
		this.flow = flow;
		this.question = question;
	}

	initRenderHtml() {}

	renderQuestionAndChoices() {
		// Add event lister choices button

		// Fake select
		setTimeout(() => {
			this.selectChoices(1);
		}, 2000);
	}

	run() {
		// If don't have render Question before, Init Render state
		console.log("Show Question And Answer");
		if (false) {
			this.initRenderHtml();
		}
		this.renderQuestionAndChoices();
	}

	selectChoices(choices) {
		this.flow.setState(
			new AnswerQuestionState(this.flow, this.question, choices)
		);
	}
}

class AnswerQuestionState {
	constructor(flow, question, userChoice) {
		this.flow = flow;
		this.question = question;
		this.userChoice = userChoice;
	}

	run() {
		// Check answer is true or not
		console.log("Answer State for Question: ", this.question.question);
		const isCorrect = this.question.checkAnswer(this.userChoice);
		const score = this.question.getScore(isCorrect, this.flow.timeRemaining);

		this.flow.updateScore(score);

		// After check will run
		this.flow.nextQuestion();
	}
}

class EndFlowState {
	constructor(flow) {
		this.flow = flow;
	}

	renderFailDialog() {
		console.log("Time's up! You didn't complete all questions.");
	}

	renderShowTotalScore() {
		// Use this.flow.totalScore
		console.log(`Total score: ${this.flow.totalScore}`);
	}

	run() {
		// Remove all HTML Render

		// Check condition to render Fail Dialog
		if (!this.flow.isComplete) {
			this.renderFailDialog();
		}
		this.renderShowTotalScore();
	}
}

const flow = new Flow(2);

const q1 = new Question(
	"Question 01",
	["I am fine", "I am not fine", "Fine"],
	0,
	2
);

const q2 = new Question(
	"Question 02",
	["I am fine", "I am not fine", "Fine"],
	1,
	2
);

flow.addQuestion(q1);
flow.addQuestion(q2);

flow.start();
