function activeElement(element) {
	element.classList.remove("hidden");
	element.classList.add("active");
}

const ANSWER_MULTI_CLASS = ".answer.multi";
const ANSWER_CHECK_CLASS = ".answer.check";
const ANSWER_TEXT_CLASS = ".answer.text";
const SUBMIT_BUTTON_CLASS = ".submit.button";
const QUESTION_CLASS = ".question";
const QUESTIONNAIRES_CLASS = ".questionnaires";

class ShowQuestionState {
	constructor(control, question) {
		this.control = control;
		this.question = question;

		this.questionContainer = document.querySelector(QUESTIONNAIRES_CLASS);
		this.questionElement = this.questionContainer.querySelector(QUESTION_CLASS);

		this.multiChoiceElement =
			this.questionContainer.querySelector(ANSWER_MULTI_CLASS);
		this.checkboxElement =
			this.questionContainer.querySelector(ANSWER_CHECK_CLASS);
		this.textResponseElement =
			this.questionContainer.querySelector(ANSWER_TEXT_CLASS);
		this.submitButtonElement =
			this.questionContainer.querySelector(SUBMIT_BUTTON_CLASS);

		this.questionContainer.addEventListener("click", this.handleClick);
	}

	initRenderHtml() {
		this.questionContainer.style.display = "block";
		activeElement(this.submitButtonElement);
		const answerElements = [
			this.multiChoiceElement,
			this.checkboxElement,
			this.textResponseElement,
		];
		answerElements.forEach((element) => {
			element.classList.remove("active");
			element.classList.add("hidden");
		});
		this.clearAnswerElements();
	}

	clearAnswerElements() {
		this.multiChoiceElement.innerHTML = "";
		this.checkboxElement.innerHTML = "";
		const textInput =
			this.textResponseElement.querySelector('input[type="text"]');
		if (textInput) {
			textInput.value = "";
		}
	}

	renderQuestionAndChoices() {
		this.questionElement.textContent = this.question.question;
		const renderMethods = {
			"multiple choice": this.renderMultipleChoice,
			checkbox: this.renderCheckbox,
			"text response": this.renderTextResponse,
		};
		renderMethods[this.question.type].call(this);
	}

	renderMultipleChoice = () => {
		activeElement(this.multiChoiceElement);
		this.multiChoiceElement.innerHTML = this.question.options
			.map(
				(option, index) => `
					<div class="option-container">
						<input type="radio" name="multi-choice" id="option${index}" value="${option}" />
						<label for="option${index}">${option}</label>
					</div>
      		`
			)
			.join("");
	};

	renderCheckbox = () => {
		activeElement(this.checkboxElement);
		this.checkboxElement.innerHTML = this.question.options
			.map(
				(option, index) => `
        <div class="option-container">
          <input type="checkbox" name="checkbox" id="checkbox${index}" value="${option}" />
          <label for="checkbox${index}">${option}</label>
        </div>
      `
			)
			.join("");
	};

	renderTextResponse = () => {
		activeElement(this.textResponseElement);
		const inputElement =
			this.textResponseElement.querySelector('input[type="text"]');
		inputElement.value = "";
		inputElement.focus();
	};

	handleClick = (event) => {
		if (event.target === this.submitButtonElement) {
			this.handleSubmit();
		}
	};

	handleSubmit = () => {
		const answerValues = {
			"multiple choice": this.getSelectedRadioValue,
			checkbox: this.getSelectedCheckboxValues,
			"text response": this.getTextInputValue,
		};
		const answer = answerValues[this.question.type].call(this);

		if (answer) {
			this.selectAnswer(answer);
		}
	};

	getSelectedRadioValue = () => {
		const selectedRadio = this.multiChoiceElement.querySelector(
			'input[type="radio"]:checked'
		);
		return selectedRadio ? selectedRadio.value : null;
	};

	getSelectedCheckboxValues = () => {
		return Array.from(
			this.checkboxElement.querySelectorAll('input[type="checkbox"]:checked')
		).map((checkbox) => checkbox.value);
	};

	getTextInputValue = () => {
		const inputElement =
			this.textResponseElement.querySelector('input[type="text"]');
		return inputElement.value.trim();
	};

	run() {
		// If don't have render Question before, Init Render state
		this.initRenderHtml();
		this.renderQuestionAndChoices();
	}

	selectAnswer(answers) {
		this.control.setState(
			new AnswerQuestionState(this.control, this.question, answers)
		);
	}
}

class AnswerQuestionState {
	constructor(control, question, userChoice) {
		this.control = control;
		this.question = question;
		this.userChoice = userChoice;
	}

	run() {
		// Check answer is true or not
		const isCorrect = this.question.checkAnswer(this.userChoice);
		const score = this.question.getScore(isCorrect, this.control.timeRemaining);

		this.control.updateScore(score);

		// After check will run
		this.control.nextQuestion();
	}
}

class EndControlState {
	constructor(control) {
		this.control = control;
		this.resultContainer = document.querySelector(".result");
		this.failDialog = this.resultContainer.querySelector(".fail-dialog");
		this.resultDialog = this.resultContainer.querySelector(".result-dialog");
		this.questionnaireContainer = document.querySelector(".questionnaires");
	}

	renderFailDialog() {
		this.failDialog.style.display = "block";
		this.resultDialog.style.display = "none";
	}

	renderShowTotalScore() {
		const scoreElement = document.createElement("p");
		scoreElement.textContent = `Your total score: ${this.control.totalScore}`;
		this.resultDialog.appendChild(scoreElement);
		this.resultDialog.style.display = "block";
		this.failDialog.style.display = "none";
	}

	run() {
		this.questionnaireContainer.style.display = "none";
		this.resultContainer.classList.remove("hidden");

		// Check condition to render Fail Dialog
		if (!this.control.isCompleteAll) {
			this.renderFailDialog();
		} else {
			this.renderShowTotalScore();
		}

		this.control.isFinishControl = true;
	}
}

export { ShowQuestionState, AnswerQuestionState, EndControlState };
