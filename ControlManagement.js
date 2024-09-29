import Timer from "./timer.js";
import { ShowQuestionState, EndControlState } from "./ControlState.js";

class ControlManagement {
	timeRemaining;
	totalScore = 0;
	currentState = null;
	currentQuestionIndex = 0;
	questions = [];
	timeInterval = null;
	isCompleteAll = false;
	isFinishFlow = false;

	constructor(time) {
		this.timeRemaining = time;

		this.timeInterval = new Timer(
			document.querySelector(".timer"),
			this.timeRemaining,
			this.start.bind(this),
			this.stop.bind(this)
		);
	}

	start() {
		const startState = this.getCurrentQuestionState();
		this.setState(startState);
	}

	setState(state) {
		if (this.isFinishFlow) {
			return;
		}

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
		if (this.timeInterval) {
			clearInterval(this.timeInterval);
			this.timeInterval = null;
		}
		this.setState(new EndControlState(this));
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
