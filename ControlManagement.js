import Timer from "./timer.js";
import { ShowQuestionState, EndControlState } from "./ControlState.js";

class ControlManagement {
	totalScore = 0;
	currentState = null;
	currentQuestionIndex = 0;
	questions = [];
	timer = null;
	isCompleteAll = false;
	isFinishControl = false;

	constructor(time) {
		this.timer = new Timer(
			document.querySelector(".timer"),
			time,
			this.start.bind(this),
			this.stop.bind(this)
		);
	}

	start() {
		const startState = this.getCurrentQuestionState();
		this.setState(startState);
	}

	setState(state) {
		if (this.isFinishControl) return;
		this.currentState = null;
		this.currentState = state;
		this.run();
	}

	run() {
		this.currentState.run();
	}

	addQuestion(question) {
		this.questions.push(question);
	}

	stop() {
		this.timer.forceStop();
		this.setState(new EndControlState(this));
	}

	getCurrentQuestionState() {
		return new ShowQuestionState(
			this,
			this.questions[this.currentQuestionIndex]
		);
	}

	getCurrentQuestion() {
		return this.questions[this.currentQuestionIndex];
	}

	nextQuestion() {
		debugger;
		if (this.currentQuestionIndex < this.questions.length - 1) {
			this.currentQuestionIndex++;
			const nextState = this.getCurrentQuestionState();
			this.setState(nextState);
		} else {
			// Mean that user has answered all question in legal time
			this.isCompleteAll = true;
			this.stop();
		}
	}

	updateScore(score) {
		this.totalScore += score;
		const scoreElement = document.querySelector(".my-score");
		if (scoreElement) {
			scoreElement.textContent = this.totalScore;
		} else {
			console.error("Score element not found");
		}
	}
}

export default ControlManagement;
