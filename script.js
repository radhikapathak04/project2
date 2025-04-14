let startTime = 0;
let running = false;
let interval;
let elapsed = 0;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  const time = now - startTime + elapsed;
  document.getElementById('display').textContent = formatTime(time);
}

function startStopwatch() {
  if (!running) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    running = true;
  }
}

function pauseStopwatch() {
  if (running) {
    clearInterval(interval);
    elapsed += Date.now() - startTime;
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(interval);
  running = false;
  startTime = 0;
  elapsed = 0;
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('laps').innerHTML = '';
}

function lapTime() {
  if (running || elapsed > 0) {
    const now = Date.now();
    const time = running ? now - startTime + elapsed : elapsed;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${document.querySelectorAll('#laps li').length + 1}: ${formatTime(time)}`;
    document.getElementById('laps').appendChild(lapItem);
  }
}
