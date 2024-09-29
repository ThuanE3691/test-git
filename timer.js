function Timer(root, time = 120, startFlow, stopFlow) {
	root.innerHTML = getHTML();

	const el = {
		minutes: root.querySelector(".timer__part--minutes"),
		seconds: root.querySelector(".timer__part--seconds"),
		control: root.querySelector(".timer__btn--control"),
	};

	let interval = null;
	let remainingSeconds = time;

	el.control.addEventListener("click", () => {
		if (interval === null) {
			startFlow();
			start();
		}
	});
	updateInterfaceTime();

	function updateInterfaceTime() {
		const minutes = Math.floor(remainingSeconds / 60);
		const seconds = remainingSeconds % 60;

		el.minutes.textContent = minutes.toString().padStart(2, "0");
		el.seconds.textContent = seconds.toString().padStart(2, "0");
	}

	function updateInterfaceControls() {
		if (interval === null) {
			el.control.innerHTML = `<div class="material-icons">play_arrow</div>`;
			el.control.classList.add("timer__btn--start");
			el.control.classList.remove("timer__btn--stop");
		} else {
			el.control.innerHTML = `<div class="material-icons">pause</div>`;
			el.control.classList.add("timer__btn--stop");
			el.control.classList.remove("timer__btn--start");
		}
	}

	function start() {
		if (remainingSeconds === 0) return;

		interval = setInterval(() => {
			remainingSeconds--;
			updateInterfaceTime();

			if (remainingSeconds === 0) {
				stop();
			}
		}, 1000);

		updateInterfaceControls();
	}

	function stop() {
		clearInterval(interval);
		interval = null;
		stopFlow();
		updateInterfaceControls();
	}

	return interval;
}

function getHTML() {
	return `
      <div class="timer__part timer__part--minutes">00</div>
      <div class="timer__part">:</div>
      <div class="timer__part timer__part--seconds">00</div>
      <button type="button" class="timer__btn timer__btn--control timer__btn--start">
          <div class="material-icons">play_arrow</div>
      </button>
  `;
}

export default Timer;
