class Timer {
	constructor(root, time = 120, onStart, onStop) {
		this.root = root;
		this.time = time;
		this.onStart = onStart;
		this.onStop = onStop;
		this.interval = null;
		this.remainingSeconds = time;

		this.initializeUI();
		this.updateInterfaceTime();
		this.addEventListeners();
	}

	initializeUI() {
		this.root.innerHTML = this.createHTML();
		this.el = {
			minutes: this.root.querySelector(".timer__part--minutes"),
			seconds: this.root.querySelector(".timer__part--seconds"),
			control: this.root.querySelector(".timer__btn--control"),
		};
	}

	createHTML() {
		return `
      <div class="timer__part timer__part--minutes">00</div>
      <div class="timer__part">:</div>
      <div class="timer__part timer__part--seconds">00</div>
      <button type="button" class="timer__btn timer__btn--control timer__btn--start">
        <span class="material-icons">play_arrow</span>
      </button>
    `;
	}

	addEventListeners() {
		this.el.control.addEventListener("click", () => {
			if (this.interval === null) {
				this.start();
			} else {
				this.stop();
			}
		});
	}

	updateInterfaceTime() {
		const minutes = Math.floor(this.remainingSeconds / 60);
		const seconds = this.remainingSeconds % 60;
		this.el.minutes.textContent = minutes.toString().padStart(2, "0");
		this.el.seconds.textContent = seconds.toString().padStart(2, "0");
	}

	updateInterfaceControls() {
		const isRunning = this.interval !== null;
		this.el.control.innerHTML = `<span class="material-icons">${
			isRunning ? "pause" : "play_arrow"
		}</span>`;
		this.el.control.classList.toggle("timer__btn--stop", isRunning);
		this.el.control.classList.toggle("timer__btn--start", !isRunning);
	}

	start() {
		if (this.remainingSeconds === 0) return;
		this.interval = setInterval(() => this.tick(), 1000);
		this.updateInterfaceControls();
		this.onStart();
	}

	tick() {
		this.remainingSeconds--;
		this.updateInterfaceTime();
		if (this.remainingSeconds === 0) {
			this.stop();
		}
	}

	stop() {
		clearInterval(this.interval);
		this.interval = null;
		this.updateInterfaceControls();
		this.onStop();
	}

	forceStop() {
		if (this.interval !== null) {
			this.stop();
		}
	}
}

export default Timer;
