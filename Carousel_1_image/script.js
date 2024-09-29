const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		// Mean that what the button we click prev or next will increase or decrease the index of current show image
		const offset = btn.dataset.carouselButton === "next" ? 1 : -1;

		// From the button, find the closets element has data-carousel
		// That mean is the div have data-carousel
		// Then now element query next is <div data-carousel> find again the data-slides
		const slides = btn
			.closest("[data-carousel]")
			.querySelector("[data-slides]");

		// Active slide mean current image show
		const activeSlide = slides.querySelector("[data-active]");

		// Calculate the next index, this is infinite loop for show image
		let newIndex = [...slides.children].indexOf(activeSlide) + offset;

		if (newIndex < 0) newIndex = slides.children.length - 1;
		if (newIndex >= slides.children.length) newIndex = 0;

		// Active the new index to show the new image
		slides.children[newIndex].dataset.active = true;

		// Not show the old image any more
		delete activeSlide.dataset.active;
	});
});
