"use strict";
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;
const CARROT_SIZE = 80;

const gameBtn = document.querySelector(".game__button");
const gameField = document.querySelector(".game__field");
const gameFieldRect = gameField.getBoundingClientRect();
const gameTimer = document.querySelector(".game__timer");
const scoreBoard = document.querySelector(".game__score");
const popUp = document.querySelector(".pop-up");
const popUpMsg = document.querySelector(".pop-up__message");
const replayBtn = document.querySelector(".pop-up__replay");

const carrotSound = new Audio("sound/carrot_pull.mp3");
const alertSound = new Audio("sound/alert.wav");
const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const winSound = new Audio("sound/game_win.mp3");

let started = false;
let countDown = undefined;
let score = 0;

gameField.addEventListener("click", onFieldClick);
replayBtn.addEventListener("click", onClickReplayBtn);

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
}

function stopGame() {
  started = false;
  stopGameTimer();
  //showpopup replay?
  showPopUpWithText("Replay?");
}

function finishGame(win) {
  started = false;
  stopGameTimer();
  showPopUpWithText(win ? "YOU WON" : "YOU LOST");
}

function initGame() {
  score = 0;
  gameField.innerHTML = "";
  showTimerAndScore();
  scoreBoard.innerText = CARROT_COUNT;
  showGameStopBtn();
  displayGameElements("carrot", CARROT_COUNT, "./img/carrot.png");
  displayGameElements("bug", BUG_COUNT, "./img/bug.png");
  startGameTimer();
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);

  countDown = setInterval(() => {
    if (remainingTimeSec <= 0) {
      finishGame();
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(countDown);
  //
}

function showGameStopBtn() {
  gameBtn.innerHTML = `<i class="fas fa-stop"></i>`;
}

function showGamePlayBtn() {
  gameBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function onClickReplayBtn() {
  startGame();
  hidePopUp();
}

function showTimerAndScore() {
  scoreBoard.style.visibility = "visible";
  gameTimer.style.visibility = "visible";
}

function updateTimerText(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  gameTimer.innerText = `${min}:${sec}`;
}

function updateScoreBoard() {
  scoreBoard.innerText = CARROT_COUNT - score;
}

function onFieldClick(event) {
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  }
}

function showPopUpWithText(text) {
  popUpMsg.innerText = text;
  popUp.classList.remove("pop-up--hide");
}

function hidePopUp() {
  popUp.classList.add("pop-up--hide");
}

function displayGameElements(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = gameFieldRect.width - CARROT_SIZE;
  const y2 = gameFieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = getRandomNum(x1, x2);
    const y = getRandomNum(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}
