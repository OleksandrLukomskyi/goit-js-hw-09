// const delayRef = document.querySelector('[name=delay]');

// const stepRef = document.querySelector('[name=step]');

// const amountRef = document.querySelector('[name=amount]');

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
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
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
