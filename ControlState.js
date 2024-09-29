class ShowQuestionState {
	constructor(flow, question) {
		this.flow = flow;
		this.question = question;

		this.questionContainer = document.querySelector(".questionnaires");
		this.questionElement = this.questionContainer.querySelector(".question");

		this.multiChoiceElement =
			this.questionContainer.querySelector(".answer.multi");
		this.checkboxElement =
			this.questionContainer.querySelector(".answer.check");
		this.textResponseElement =
			this.questionContainer.querySelector(".answer.text");
	}

	initRenderHtml() {
		this.questionContainer.style.display = "block";
		this.multiChoiceElement.style.display = "none";
		this.checkboxElement.style.display = "none";
		this.textResponseElement.style.display = "none";
	}

	renderQuestionAndChoices() {
		this.questionElement.textContent = this.question.question;
		switch (this.question.type) {
			case "multiple choice":
				this.renderMultipleChoice();
				break;
			case "checkbox":
				this.renderCheckbox();
				break;
			case "text response":
				this.renderTextResponse();
				break;
		}
	}

	renderMultipleChoice() {
		this.multiChoiceElement.style.display = "block";
		this.multiChoiceElement.innerHTML = "";
		// Container

		// Div <options></options>

		this.question.options.forEach((option, index) => {
			const optionHtml = `
                <div class="option-container">
                    <input type="radio" name="multi-choice" id="option${index}" value="${option}" />
                    <label for="option${index}">${option}</label>
                </div>
            `;
			this.multiChoiceElement.insertAdjacentHTML("beforeend", optionHtml);
		});

		this.multiChoiceElement.addEventListener("change", (e) => {
			if (e.target.type === "radio") {
				this.selectAnswer(e.target.value);
			}
		});
	}

	renderCheckbox() {
		this.checkboxElement.style.display = "block";
		this.checkboxElement.innerHTML = "";

		this.question.options.forEach((option, index) => {
			const optionHtml = `
                <div class="option-container">
                    <input type="checkbox" name="checkbox" id="checkbox${index}" value="${option}" />
                    <label for="checkbox${index}">${option}</label>
                </div>
            `;
			this.checkboxElement.insertAdjacentHTML("beforeend", optionHtml);
		});

		const submitButton = document.createElement("button");
		submitButton.textContent = "Submit";
		submitButton.addEventListener("click", () => {
			const selectedOptions = Array.from(
				this.checkboxElement.querySelectorAll('input[type="checkbox"]:checked')
			).map((checkbox) => checkbox.value);
			this.selectAnswer(selectedOptions);
		});
		this.checkboxElement.appendChild(submitButton);
	}

	renderTextResponse() {
		this.textResponseElement.style.display = "block";
		this.textResponseElement.classList.add("active");
		const inputElement =
			this.textResponseElement.querySelector('input[type="text"]');
		inputElement.value = "";

		// Focus on the input element to make it active
		inputElement.focus();

		// Add a submit button
		const submitButton = document.createElement("button");
		submitButton.textContent = "Submit";
		this.textResponseElement.appendChild(submitButton);

		// Function to handle answer submission
		const submitAnswer = () => {
			const answer = inputElement.value.trim();
			if (answer) {
				this.selectAnswer(answer);
			}
		};

		// Event listener for the Enter key
		inputElement.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				submitAnswer();
			}
		});

		// Event listener for the submit button
		submitButton.addEventListener("click", submitAnswer);

		// Log the input element to check if it exists
		console.log("Text input element:", inputElement);
	}

	run() {
		// If don't have render Question before, Init Render state
		this.initRenderHtml();
		this.renderQuestionAndChoices();
	}

	selectAnswer(answers) {
		this.flow.setState(
			new AnswerQuestionState(this.flow, this.question, answers)
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

class EndControlState {
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
		if (!this.flow.isCompleteAll) {
			this.renderFailDialog();
		}
		this.renderShowTotalScore();

		this.flow.isFinishFlow = true;
	}
}

export { ShowQuestionState, AnswerQuestionState, EndControlState };
