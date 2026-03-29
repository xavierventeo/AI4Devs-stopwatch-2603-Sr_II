const VIEW_ORDER = ["countdown", "selection", "stopwatch"];
const DEFAULT_VIEW = "selection";
const DEFAULT_COUNTDOWN_MS = 10_000;

const viewTrack = document.querySelector("[data-view-track]");
const backButton = document.querySelector("[data-back-button]");
const modeButtons = document.querySelectorAll("[data-target-view]");

const stopwatchDisplay = document.querySelector("[data-stopwatch-display]");
const stopwatchTime = document.querySelector("[data-stopwatch-time]");
const stopwatchMilliseconds = document.querySelector("[data-stopwatch-milliseconds]");
const stopwatchActions = document.querySelector("[data-stopwatch-actions]");
const stopwatchToggleButton = document.querySelector("[data-stopwatch-toggle]");
const stopwatchClearButton = document.querySelector("[data-stopwatch-clear]");

const countdownDisplay = document.querySelector("[data-countdown-display]");
const countdownTime = document.querySelector("[data-countdown-time]");
const countdownMilliseconds = document.querySelector("[data-countdown-milliseconds]");
const countdownDigitButtons = document.querySelectorAll("[data-countdown-digit]");
const countdownSetButton = document.querySelector("[data-countdown-set]");
const countdownClearButton = document.querySelector("[data-countdown-clear]");

const TIMER_MODE = {
  STOPWATCH: "stopwatch",
  COUNTDOWN: "countdown",
};

const TIMER_PHASE = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
  FINISHED: "finished",
};

const timer = {
  mode: TIMER_MODE.STOPWATCH,
  phase: TIMER_PHASE.IDLE,
  currentMs: 0,
  anchorMs: 0,
  startTimestamp: 0,
  animationFrameId: null,
  initialCountdownMs: DEFAULT_COUNTDOWN_MS,
};

let currentView = DEFAULT_VIEW;
let countdownDigits = "000000";

function isValidView(viewName) {
  return VIEW_ORDER.includes(viewName);
}

function updateTrackPosition(viewName, instant = false) {
  viewTrack.classList.toggle("no-transition", instant);
  viewTrack.classList.remove("is-countdown", "is-selection", "is-stopwatch");
  viewTrack.classList.add(`is-${viewName}`);

  if (instant) {
    requestAnimationFrame(() => {
      viewTrack.classList.remove("no-transition");
    });
  }
}

function updateFooter(viewName) {
  backButton.hidden = viewName === DEFAULT_VIEW;
}

function goToView(viewName, options = {}) {
  if (!isValidView(viewName)) {
    return;
  }

  currentView = viewName;
  updateTrackPosition(viewName, Boolean(options.instant));
  updateFooter(viewName);
}

function formatTimeParts(totalMilliseconds) {
  const safeMs = Math.max(0, Math.floor(totalMilliseconds));
  const totalSeconds = Math.floor(safeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = safeMs % 1000;

  return {
    time: [hours, minutes, seconds].map((unit) => String(unit).padStart(2, "0")).join(":"),
    milliseconds: String(milliseconds).padStart(3, "0"),
  };
}

function renderDisplay(timeNode, millisecondsNode, totalMilliseconds) {
  const formatted = formatTimeParts(totalMilliseconds);
  timeNode.textContent = formatted.time;
  millisecondsNode.textContent = formatted.milliseconds;
}

function renderStopwatchDisplay() {
  renderDisplay(stopwatchTime, stopwatchMilliseconds, timer.currentMs);
}

function renderCountdownDisplay() {
  const hours = countdownDigits.slice(0, 2);
  const minutes = countdownDigits.slice(2, 4);
  const seconds = countdownDigits.slice(4, 6);

  countdownTime.textContent = `${hours}:${minutes}:${seconds}`;
  countdownMilliseconds.textContent = "000";
}

function clearFinishedState() {
  stopwatchDisplay.classList.remove("is-finished");
  stopwatchActions.classList.remove("is-finished");
}

function applyFinishedState() {
  stopwatchDisplay.classList.add("is-finished");
  stopwatchActions.classList.add("is-finished");
}

function renderToggleButton() {
  if (timer.phase === TIMER_PHASE.RUNNING) {
    stopwatchToggleButton.textContent = "Pause";
    stopwatchToggleButton.dataset.state = TIMER_PHASE.RUNNING;
    return;
  }

  if (timer.phase === TIMER_PHASE.PAUSED) {
    stopwatchToggleButton.textContent = "Continue";
    stopwatchToggleButton.dataset.state = TIMER_PHASE.PAUSED;
    return;
  }

  stopwatchToggleButton.textContent = "Start";
  stopwatchToggleButton.dataset.state = TIMER_PHASE.IDLE;
}

function cancelTimerAnimation() {
  if (timer.animationFrameId !== null) {
    cancelAnimationFrame(timer.animationFrameId);
    timer.animationFrameId = null;
  }
}

function beepAlarm() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;

  if (!AudioCtx) {
    return;
  }

  try {
    const audioContext = new AudioCtx();
    const now = audioContext.currentTime;

    [0, 0.22, 0.44].forEach((offset, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = index % 2 === 0 ? "square" : "sawtooth";
      oscillator.frequency.setValueAtTime(index % 2 === 0 ? 880 : 660, now + offset);

      gainNode.gain.setValueAtTime(0.0001, now + offset);
      gainNode.gain.exponentialRampToValueAtTime(0.18, now + offset + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.18);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start(now + offset);
      oscillator.stop(now + offset + 0.2);
    });

    setTimeout(() => {
      audioContext.close().catch(() => {});
    }, 900);
  } catch (error) {
    // Ignore audio failures silently.
  }
}

function finishCountdown() {
  cancelTimerAnimation();
  timer.phase = TIMER_PHASE.FINISHED;
  timer.currentMs = 0;
  renderStopwatchDisplay();
  renderToggleButton();
  applyFinishedState();
  beepAlarm();
}

function tickTimer(now) {
  const elapsedSinceStart = now - timer.startTimestamp;

  if (timer.mode === TIMER_MODE.STOPWATCH) {
    timer.currentMs = Math.max(0, Math.floor(timer.anchorMs + elapsedSinceStart));
    renderStopwatchDisplay();
  } else {
    timer.currentMs = Math.max(0, Math.floor(timer.anchorMs - elapsedSinceStart));
    renderStopwatchDisplay();

    if (timer.currentMs <= 0) {
      finishCountdown();
      return;
    }
  }

  if (timer.phase === TIMER_PHASE.RUNNING) {
    timer.animationFrameId = requestAnimationFrame(tickTimer);
  }
}

function startTimer() {
  if (timer.mode === TIMER_MODE.COUNTDOWN && timer.phase === TIMER_PHASE.FINISHED) {
    return;
  }

  clearFinishedState();
  timer.phase = TIMER_PHASE.RUNNING;
  timer.anchorMs = timer.currentMs;
  timer.startTimestamp = performance.now();
  renderToggleButton();
  cancelTimerAnimation();
  timer.animationFrameId = requestAnimationFrame(tickTimer);
}

function pauseTimer() {
  timer.phase = TIMER_PHASE.PAUSED;
  cancelTimerAnimation();
  renderStopwatchDisplay();
  renderToggleButton();
}

function prepareStopwatchMode() {
  cancelTimerAnimation();
  clearFinishedState();
  timer.mode = TIMER_MODE.STOPWATCH;
  timer.phase = TIMER_PHASE.IDLE;
  timer.currentMs = 0;
  timer.anchorMs = 0;
  timer.startTimestamp = 0;
  renderStopwatchDisplay();
  renderToggleButton();
}

function prepareCountdownMode(totalMilliseconds) {
  cancelTimerAnimation();
  clearFinishedState();
  timer.mode = TIMER_MODE.COUNTDOWN;
  timer.phase = TIMER_PHASE.IDLE;
  timer.currentMs = totalMilliseconds;
  timer.anchorMs = totalMilliseconds;
  timer.startTimestamp = 0;
  timer.initialCountdownMs = totalMilliseconds;
  renderStopwatchDisplay();
  renderToggleButton();
}

function cancelCountdownSession() {
  cancelTimerAnimation();
  clearFinishedState();
  timer.mode = TIMER_MODE.STOPWATCH;
  timer.phase = TIMER_PHASE.IDLE;
  timer.currentMs = 0;
  timer.anchorMs = 0;
  timer.startTimestamp = 0;
  timer.initialCountdownMs = DEFAULT_COUNTDOWN_MS;
  resetCountdownInput();
  renderStopwatchDisplay();
  renderToggleButton();
}

function resetStopwatch() {
  if (timer.mode === TIMER_MODE.COUNTDOWN) {
    cancelTimerAnimation();
    clearFinishedState();
    timer.phase = TIMER_PHASE.IDLE;
    timer.currentMs = timer.initialCountdownMs;
    timer.anchorMs = timer.initialCountdownMs;
    timer.startTimestamp = 0;
    renderStopwatchDisplay();
    renderToggleButton();
    return;
  }

  prepareStopwatchMode();
}

function handleStopwatchToggle() {
  if (timer.phase === TIMER_PHASE.FINISHED) {
    return;
  }

  if (timer.phase === TIMER_PHASE.RUNNING) {
    pauseTimer();
    return;
  }

  startTimer();
}

function resetCountdownInput() {
  countdownDigits = "000000";
  countdownDisplay.classList.remove("is-finished");
  renderCountdownDisplay();
}

function appendCountdownDigit(digit) {
  countdownDigits = `${countdownDigits}${digit}`.slice(-6);
  renderCountdownDisplay();
}

function parseCountdownDigitsToMilliseconds() {
  const hours = Number(countdownDigits.slice(0, 2));
  const minutes = Number(countdownDigits.slice(2, 4));
  const seconds = Number(countdownDigits.slice(4, 6));

  return ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000;
}

function launchCountdownFromInput() {
  const configuredMs = parseCountdownDigitsToMilliseconds();
  const targetMs = configuredMs > 0 ? configuredMs : DEFAULT_COUNTDOWN_MS;

  prepareCountdownMode(targetMs);
  goToView("stopwatch", { instant: true });
}

function handleModeSelection(targetView) {
  if (targetView === "countdown") {
    resetCountdownInput();
    goToView("countdown");
    return;
  }

  if (targetView === "stopwatch") {
    prepareStopwatchMode();
    goToView("stopwatch");
  }
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleModeSelection(button.dataset.targetView);
  });
});

backButton.addEventListener("click", () => {
  if (timer.mode === TIMER_MODE.COUNTDOWN) {
    cancelCountdownSession();
  }

  goToView(DEFAULT_VIEW);
});

countdownDigitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendCountdownDigit(button.dataset.countdownDigit);
  });
});

countdownSetButton.addEventListener("click", launchCountdownFromInput);
countdownClearButton.addEventListener("click", resetCountdownInput);
stopwatchToggleButton.addEventListener("click", handleStopwatchToggle);
stopwatchClearButton.addEventListener("click", resetStopwatch);

renderCountdownDisplay();
prepareStopwatchMode();
goToView(DEFAULT_VIEW);
