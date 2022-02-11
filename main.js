// Audio
let alertSound = new Audio("sound/alert.wav");
let bgSound = new Audio("sound/bg.mp3");
let bugSound = new Audio("sound/bug_pull.mp3");
let carrotSound = new Audio("sound/carrot_pull.mp3");
let winSound = new Audio("sound/game_win.mp3");

// handle play btn
const playBtn = document.querySelector(".play_btn");

function onHandlePlaybtn() {
  if (!playGround.childElementCount) {
    bgSound.play();
    startCountTime();
    playBtn.classList.toggle("hidden");
    stopBtn.classList.toggle("hidden");
    for (i = 0; i < 10; i++) {
      placeElementsRandomly();
    }
    startCarrotCountBox();
  }
}
playBtn.addEventListener("click", onHandlePlaybtn);

// place carrots and bugs randomly
const playGround = document.querySelector(".play_ground");
function placeElementsRandomly() {
  const carrot = document.createElement("img");
  carrot.src = "img/carrot.png";
  carrot.setAttribute("class", "carrot");
  carrot.setAttribute("data-id", "carrot");
  playGround.appendChild(carrot);
  imgRandomPosition(carrot);
  const bug = document.createElement("img");
  bug.src = "img/bug.png";
  bug.setAttribute("data-id", "bug");
  bug.setAttribute("class", "bug");
  playGround.appendChild(bug);
  imgRandomPosition(bug);
}

function imgRandomPosition(img) {
  const winHeight = window.innerHeight;
  const winWidth = window.innerWidth;
  let randomY = getRandomNum(0, winHeight / 2);
  let randomX = getRandomNum(0, winWidth - 50);
  img.style.position = "absolute";
  img.style.bottom = `${randomY}px`;
  img.style.left = `${randomX}px`;
}

function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

//handle stop btn
const stopBtn = document.querySelector(".stop_btn");
function OnHandleStopBtn() {
  stopBtn.classList.toggle("hidden");
  playBtn.classList.toggle("hidden");
  stopInterver();
  whenLostResult();
}
stopBtn.addEventListener("click", OnHandleStopBtn);

// 10sec countdown

const timeContainer = document.querySelector(".time_count");
function stopInterver() {
  //timeContainer.innerHTML = "00:00";
  clearInterval(timer);
  timeleft = 10;
}

let timer;
let timeleft = 10;
function startCountTime() {
  countTime();
  timer = setInterval(countTime, 1000);
  //setInterval(countTime, 1000);
}

function countTime() {
  if (timeleft === 0) {
    timeContainer.innerHTML = `0:${timeleft}`;
    //stopInterver(timer);
    whenLostResult();
  } else {
    timeContainer.innerHTML = `0:${timeleft}`;
    timeleft -= 1;
  }
}

// Handle carrot count box
const carrotCountBox = document.querySelector(".carrot_count");
let carrotNum;

function startCarrotCountBox() {
  carrotNum = document.querySelectorAll(".carrot").length;
  carrotCountBox.innerText = carrotNum;
}

// Handle on Click carrot or Bug

const resultBox = document.querySelector(".result");
const winText = document.querySelector(".won");
const lostText = document.querySelector(".lost");
function onClickcarrotOrBug(event) {
  const dataId = event.target.dataset.id;
  if (carrotNum > 1 && dataId === "carrot") {
    onHandleClickCarrot(event);
  } else if (dataId === "bug") {
    bugSound.play();
    stopInterver();
    whenLostResult();
  } else if (carrotNum === 1 && dataId === "carrot") {
    onHandleClickCarrot(event);
    stopInterver();
    whenWinResult();
  }
}

playGround.addEventListener("click", (event) => {
  onClickcarrotOrBug(event);
});

function onHandleClickCarrot(event) {
  carrotSound.play();
  carrotNum -= 1;
  carrotCountBox.innerHTML = carrotNum;
  event.target.remove();
}

// Result display
function whenLostResult() {
  bgSound.pause();
  alertSound.play();
  alertSound.pause();
  resultBox.classList.remove("hidden");
  winText.classList.add("hidden");
  lostText.classList.remove("hidden");
  coverThePlayGround();
}
function whenWinResult() {
  bgSound.pause();
  winSound.play();
  resultBox.classList.remove("hidden");
  lostText.classList.add("hidden");
  winText.classList.remove("hidden");
}

// ??how to unable to click after the result***??

//handle replay Btn
const replayBtn = document.querySelector(".replay_btn");
replayBtn.addEventListener("click", onHandleReplay);

function onHandleReplay() {
  resultBox.classList.add("hidden");
  removeAllchildNodes(playGround);
  onHandlePlaybtn();
  carrotNum = 10;
}

function removeAllchildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
