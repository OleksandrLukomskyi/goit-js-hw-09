import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  const stepInput = step.value;

  const delayInput = parseInt(delay.value);
  const amountInput = amount.value;
  for (let i = 0; i < amountInput; i += 1) {
    createPromise(i + 1, delayInput + i * stepInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
