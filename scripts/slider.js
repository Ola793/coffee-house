"use strict";

let progress_width = 0;
let slider_count = 0;
let auto_swipe = setInterval(autoChange, 50);
let xDown = null;
let yDown = null;

const slider = document.querySelector(".slides-holder");
const slide = document.querySelectorAll(".slide");
const next_slide = document.querySelector(".arrow.right");
const previous_slide = document.querySelector(".arrow.left");
const control = document.querySelectorAll(".control");
const control_progress = document.querySelectorAll(".control-progress");

const pauseAutoChange = () => clearInterval(auto_swipe);

const continueAutoChange = () => auto_swipe = setInterval(autoChange, 50);

next_slide.addEventListener("click", nextSlide);

previous_slide.addEventListener("click", previousSlide);

slider.addEventListener("touchstart", touchStart);

slider.addEventListener("touchmove", touchMove);

slide.forEach(slide => {
  if (window.matchMedia("(max-width: 768px)").matches) {
    slide.addEventListener("touchstart", function(event) {
      event.preventDefault();
      pauseAutoChange();
    });

    slide.addEventListener("touchend", function(event) {
      event.preventDefault();
      continueAutoChange();
    });
  } else {
    slide.addEventListener("mouseover", pauseAutoChange);
    slide.addEventListener("mouseout", continueAutoChange);
  }
})

function autoChange() {
  const progress = control_progress[slider_count];
  progress.style.width = `${progress_width}%`;
  progress_width++;

  if (progress_width > 100) {
    progress.style.width = "0%";
    nextSlide();
  }
}

function nextSlide() {
  slider_count++;

  if (slider_count >= 3) {
    slider_count = 0;
  }

  rollSlider(slider_count);
}

function previousSlide() {
  slider_count--;

  if (slider_count < 0) {
    slider_count = 2;
  }

  rollSlider(slider_count);
}

function rollSlider(count) {
  control.forEach(item => item.classList.remove("active"));

  control_progress.forEach(item => item.style.width = "0%");

  control[count].classList.add("active");

  slider.style.transform = `translateX(-${slider_count}00%)`;

  progress_width = 0;
}

function touchStart(event) {
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
}

function touchMove(event) {
  if (!xDown || !yDown) {
    return
  }

  let xUp = event.touches[0].clientX;
  let yUp = event.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      nextSlide();
    }

    if (xDiff < 0) {
      previousSlide();
    }
  }

  xDown = null;
  yDown = null;
}
