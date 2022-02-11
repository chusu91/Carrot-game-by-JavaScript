// handle play btn
const playBtn = document.querySelector(".play_btn");

function onHandlePlaybtn() {
  startCountTime();
  playBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  for (i = 0; i < 10; i++) {
    placeElementsRandomly();
  }
  startCarrotCoutBox();
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
}
stopBtn.addEventListener("click", OnHandleStopBtn);

// 10sec countdown

const timeContainer = document.querySelector(".time_count");
function stopInterver() {
  //timeContainer.innerHTML = "00:00";
  clearInterval(timer);
}

let timer;

function startCountTime() {
  let timeleft = 10;
  timer = setInterval(() => {
    if (timeleft === 0) {
      stopInterver(timer);
    } else {
      timeContainer.innerHTML = `0:${timeleft}`;
      timeleft -= 1;
    }
  }, 1000);
}

// Handle carrot count box
const carrotCountBox = document.querySelector(".carrot_count");
let carrotNum = 10;

function startCarrotCoutBox() {
  carrotCountBox.innerHTML = carrotNum;
}

const resultBox = document.querySelector(".result");
const winText = document.querySelector(".won");
const lostText = document.querySelector(".lost");
function onClickcarrotOrBug(event) {
  const dataId = event.target.dataset.id;
  if (carrotNum > 1 && dataId === "carrot") {
    carrotNum -= 1;
    carrotCountBox.innerHTML = carrotNum;
    event.target.remove();
  } else if (dataId === "bug") {
    stopInterver();
    resultBox.classList.remove("hidden");
    winText.classList.toggle("hidden");
  } else if (carrotNum === 1 && dataId === "carrot") {
    carrotNum -= 1;
    carrotCountBox.innerHTML = carrotNum;
    event.target.remove();
    stopInterver();
    resultBox.classList.remove("hidden");
    lostText.classList.toggle("hidden");
  }
}

playGround.addEventListener("click", (event) => {
  onClickcarrotOrBug(event);
});

//handle replay Btn
const replayBtn = document.querySelector(".replay_btn");
replayBtn.addEventListener("click", () => {
  location.reload();
});
