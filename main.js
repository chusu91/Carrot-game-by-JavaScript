// handle play btn
const playBtn = document.querySelector(".play_btn");

function onHandlePlaybtn() {
  startCount();
  playBtn.classList.toggle("hidden");
  stopBtn.classList.toggle("hidden");
  for (i = 0; i < 10; i++) {
    placeElementsRandomly();
  }
  onHandleCarrotClick();
  carrotCount();
}
playBtn.addEventListener("click", onHandlePlaybtn);

// place carrots and bugs randomly
const playGround = document.querySelector(".play_ground");
function placeElementsRandomly() {
  const carrot = document.createElement("img");
  carrot.src = "img/carrot.png";
  carrot.setAttribute("class", "carrot");
  playGround.appendChild(carrot);
  imgRandomPosition(carrot);
  const bug = document.createElement("img");
  bug.src = "img/bug.png";
  playGround.appendChild(bug);
  imgRandomPosition(bug);
}

function imgRandomPosition(img) {
  const winHeight = window.innerHeight;
  const winWidth = window.innerWidth;
  console.log(winWidth);
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
  timeContainer.innerHTML = "00:00";
  clearInterval(timer);
}

let timer;

function startCount() {
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
function carrotCount() {
  carrotCountBox.innerHTML = carrotNum;
  carrotNum -= 1;
}

//handle click the carrots
const carrot = document.querySelector(".carrot");
function onHandleCarrotClick() {
  console.log(carrot);
}
carrot.addEventListener("click", carrotCount);

//Handle carrot's count
