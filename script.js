const time = document.querySelector('.time');
const endTime = document.querySelector('.rest');
const buttons = document.querySelectorAll('[data-time]');

let countdown;

function timer(seconds) {
  // clear any existing timer
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it
    if(secondsLeft < 0) {
      clearInterval(countdown)
      return;
    }
    // display interval
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  time.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const adjustedMinutes = minutes < 10 ? '0' + minutes : minutes;
  endTime.textContent = `Next rest at ${adjustedHour}:${adjustedMinutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click', startTimer));
// document.customForm.addEventListener('submit', function(e) {
//   e.preventDefault();
//   const mins = this.minutes.value;
//   console.log(mins);
//   timer(mins * 60);
//   this.reset();
// });
