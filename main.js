// handle play btn
const playBtn = document.querySelector(".play_btn");

function onHandlePlaybtn() {
  startCount();
}
playBtn.addEventListener("click", onHandlePlaybtn);

//handle stop btn
const stopBtn = document.querySelector(".stop_btn");

stopBtn.addEventListener("click", stopInterver);

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
