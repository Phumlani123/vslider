const slidesContainer = document.querySelector(".slider");
let cards = document.querySelectorAll(".slider__card");
const prevButton = document.querySelector(".btn__prev");
const nextButton = document.querySelector(".btn__next");
const firstItem = cards[0];
const lastItem = cards[cards.length - 1];
let index = 0;

const resetDisplay = cards;

let slideWidth = slidesContainer.clientWidth + 25;
let intervalValue, intervalValue2, timeoutId;

prevButton.disabled = true;

const cleanUpSlides = () => {
  const cardsArray = Array.from(cards);
  cardsArray.splice(3);

  slidesContainer.innerHTML = "";
  resetDisplay.forEach((card) => {
    slidesContainer.appendChild(card);
  });
};

document.addEventListener("mousemove", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    cleanUpSlides();
  }, 10000);
});

const mobileQuery = window.matchMedia("(max-width: 900px)");
const checkMobile = (e) => {
  if (e.matches) {
    slideWidth = firstItem.clientWidth + 35;
  }
  return e.matches;
};

mobileQuery.addEventListener("change", checkMobile);

const startSlideInterval = () => {
  intervalValue = setInterval(() => {
    checkMobile(mobileQuery);
    slidesContainer.scrollLeft += slideWidth;
  }, 4000);
};

const stopSlideInterval = () => {
  clearInterval(intervalValue);
};

nextButton.addEventListener("click", () => {
  slidesContainer.scrollLeft += slideWidth;
  slidesContainer.append(cards[index % cards.length].cloneNode(true));
  index++;
  checkMobile(mobileQuery);
  stopSlideInterval();
  startSlideInterval();
});

prevButton.addEventListener("click", () => {
  if (index === 0) {
    index = cards.length - 1;
  }
  slidesContainer.scrollLeft -= slideWidth;
  cards = document.querySelectorAll(".slider__card");
  slidesContainer.prepend(cards[(cards.length - 1) % index].cloneNode(true));
  index++;
  checkMobile(mobileQuery);
  stopSlideInterval();
  startSlideInterval();
});

nextButton.addEventListener("click", () => {
  prevButton.classList.remove("btn__prev--disabled");
  prevButton.disabled = false;
});

startSlideInterval();
