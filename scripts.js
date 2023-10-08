const cards = document.querySelectorAll('.card');
const timeValue = document.getElementById("time");
const begin = document.getElementById("start");
const moves = document.getElementById("moves-count");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
let hasFlippedCard = false;
let lockBoard = true;
let isTheGameOver = false;
let firstCard, secondCard;
let movesCount = 0

var minutes = 00;
var seconds = 00;
var appendSeconds = document.getElementById("seconds")
var appendMinutes = document.getElementById("minutes")
var Interval;


function startTimer() {
  seconds++;

  if (seconds <= 9) {
    appendSeconds.innerHTML = "0" + seconds;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;

  }

  if (seconds > 59) {
    minutes++;
    appendMinutes.innerHTML = "<span>Time:0</span>" + minutes;
    seconds = 0;
    appendSeconds.innerHTML = "0" + 0;
  }

  if (minutes > 9) {
    appendMinutes.innerHTML = minutes;
  }

}

function stopClock() {
  clearInterval(Interval);
}

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

begin.addEventListener("click", function () {
  start();
  
 
});

function start() {
  startButton.classList.add("hide");
  stopButton.classList.remove("hide");
  lockBoard = false;
  clearInterval(Interval);
  Interval = setInterval(startTimer, 1000);
  movesCount = 0;
  
 
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    //first time click
    hasFlippedCard = true;
    firstCard = this;
    return
  }

  //second time click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();

}


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableFlip() : unflipCards();
  const flipped = document.querySelectorAll('.flip');
  const count = flipped.length;
  console.log(count);
  if (count == 12) {
    stopClock();
    console.log('game-over')
  }
}


function disableFlip() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  movesCounter();

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null]
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));