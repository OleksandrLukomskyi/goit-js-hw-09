import flatpickr from 'flatpickr';
import '//node_modules/flatpickr/dist/flatpickr.min.css';
const flatpickr = require('flatpickr');

const datePicker = document.querySelector('input#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(datePicker, options);

const startButton = document.querySelector('button[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

datePicker.addEventListener('change', function () {
  const selectedDate = new Date(datePicker.value);
  startButton.disabled = true;
  if (selectedDate <= new Date()) {
    window.alert('Please choose a date in the future');
  } else {
    startButton.disabled = false;
  }
});

startButton.addEventListener('click', function () {
  const selectedDate = new Date(datePicker.value);

  const timerInterval = setInterval(function () {
    const timeLeft = selectedDate - new Date();
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      startButton.disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
