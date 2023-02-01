const SlidesContainer = document.querySelector(".slider");
let cards = document.querySelectorAll(".slider__card");
const PrevButton = document.querySelector(".btn__prev");
const NextButton = document.querySelector(".btn__next");
const FirstItem = cards[0];
const ResetDisplay = cards;

let index = 0;
let slideWidth = SlidesContainer.clientWidth + 25;
let intervalValue, intervalValue2, timeoutId;

PrevButton.disabled = true;

const cleanUpSlides = () => {
  const cardsArray = Array.from(cards);
  cardsArray.splice(3);
  SlidesContainer.innerHTML = "";
  ResetDisplay.forEach((card) => {
    SlidesContainer.appendChild(card);
    setTimeout(() => {
      SlidesContainer.scrollLeft -= slideWidth;
    }, 100);
  });
};

const detectMouseMove = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    cleanUpSlides();
  }, 6000);
};

document.addEventListener("mousemove", detectMouseMove);

const mobileQuery = window.matchMedia("(max-width: 900px)");
const checkMobile = (e) => {
  if (e.matches) {
    slideWidth = FirstItem.clientWidth + 35;
  }
  return e.matches;
};

mobileQuery.addEventListener("change", checkMobile);

const startSlideInterval = () => {
  intervalValue = setInterval(() => {
    checkMobile(mobileQuery);
    SlidesContainer.scrollLeft += slideWidth;
  }, 3000);
};

const stopSlideInterval = () => {
  clearInterval(intervalValue);
};

const enablePrevButton = () => {
  PrevButton.classList.remove("btn__prev--disabled");
  PrevButton.disabled = false;
};

const handlePrev = () => {
  SlidesContainer.scrollLeft -= slideWidth;
  checkMobile(mobileQuery);
  stopSlideInterval();
  startSlideInterval();
};

const handleNext = (event) => {
  if (!event.detail || event.detail == 1) {
    SlidesContainer.scrollLeft += slideWidth;
    SlidesContainer.append(cards[index % cards.length].cloneNode(true));
    index++;
  }
  checkMobile(mobileQuery);
  enablePrevButton();
  stopSlideInterval();
  startSlideInterval();
};

NextButton.addEventListener("click", (e) => handleNext(e));
PrevButton.addEventListener("click", handlePrev);

startSlideInterval();
