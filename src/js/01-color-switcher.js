function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    changeBackgroundColor();
  }, 1000);
  stopBtn.removeAttribute('disabled');
  startBtn.toggleAttribute('disabled');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);

  stopBtn.toggleAttribute('disabled');
  startBtn.removeAttribute('disabled');
});

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
