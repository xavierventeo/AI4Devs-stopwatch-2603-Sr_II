const VIEW_ORDER = ["countdown", "selection", "stopwatch"];
const DEFAULT_VIEW = "selection";

const viewTrack = document.querySelector("[data-view-track]");
const backButton = document.querySelector("[data-back-button]");
const modeButtons = document.querySelectorAll("[data-target-view]");

const stopwatchTime = document.querySelector("[data-stopwatch-time]");
const stopwatchMilliseconds = document.querySelector(
  "[data-stopwatch-milliseconds]"
);
const stopwatchToggleButton = document.querySelector("[data-stopwatch-toggle]");
const stopwatchClearButton = document.querySelector("[data-stopwatch-clear]");

const STOPWATCH_STATE = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
};

const stopwatch = {
  state: STOPWATCH_STATE.IDLE,
  elapsedMs: 0,
  startTimestamp: 0,
  animationFrameId: null,
};

function isValidView(viewName) {
  return VIEW_ORDER.includes(viewName);
}

function updateTrackPosition(viewName) {
  viewTrack.classList.remove(
    "is-countdown",
    "is-selection",
    "is-stopwatch"
  );

  viewTrack.classList.add(`is-${viewName}`);
}

function updateFooter(viewName) {
  backButton.hidden = viewName === DEFAULT_VIEW;
}

function goToView(viewName) {
  if (!isValidView(viewName)) {
    return;
  }

  updateTrackPosition(viewName);
  updateFooter(viewName);
}

function formatTime(totalMilliseconds) {
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = totalMilliseconds % 1000;

  return {
    time: [hours, minutes, seconds]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":"),
    milliseconds: String(milliseconds).padStart(3, "0"),
  };
}

function renderStopwatch() {
  const formattedTime = formatTime(stopwatch.elapsedMs);
  stopwatchTime.textContent = formattedTime.time;
  stopwatchMilliseconds.textContent = formattedTime.milliseconds;
}

function renderStopwatchButton() {
  if (stopwatch.state === STOPWATCH_STATE.RUNNING) {
    stopwatchToggleButton.textContent = "Pause";
    stopwatchToggleButton.dataset.state = STOPWATCH_STATE.RUNNING;
    return;
  }

  if (stopwatch.state === STOPWATCH_STATE.PAUSED) {
    stopwatchToggleButton.textContent = "Continue";
    stopwatchToggleButton.dataset.state = STOPWATCH_STATE.PAUSED;
    return;
  }

  stopwatchToggleButton.textContent = "Start";
  stopwatchToggleButton.dataset.state = STOPWATCH_STATE.IDLE;
}

function cancelStopwatchAnimation() {
  if (stopwatch.animationFrameId !== null) {
    cancelAnimationFrame(stopwatch.animationFrameId);
    stopwatch.animationFrameId = null;
  }
}

function tickStopwatch(now) {
  stopwatch.elapsedMs = Math.max(0, Math.floor(now - stopwatch.startTimestamp));
  renderStopwatch();

  if (stopwatch.state === STOPWATCH_STATE.RUNNING) {
    stopwatch.animationFrameId = requestAnimationFrame(tickStopwatch);
  }
}

function startStopwatch() {
  stopwatch.state = STOPWATCH_STATE.RUNNING;
  stopwatch.startTimestamp = performance.now() - stopwatch.elapsedMs;
  renderStopwatchButton();
  cancelStopwatchAnimation();
  stopwatch.animationFrameId = requestAnimationFrame(tickStopwatch);
}

function pauseStopwatch() {
  stopwatch.state = STOPWATCH_STATE.PAUSED;
  cancelStopwatchAnimation();
  renderStopwatch();
  renderStopwatchButton();
}

function resetStopwatch() {
  stopwatch.state = STOPWATCH_STATE.IDLE;
  stopwatch.elapsedMs = 0;
  stopwatch.startTimestamp = 0;
  cancelStopwatchAnimation();
  renderStopwatch();
  renderStopwatchButton();
}

function handleStopwatchToggle() {
  if (stopwatch.state === STOPWATCH_STATE.RUNNING) {
    pauseStopwatch();
    return;
  }

  startStopwatch();
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetView = button.dataset.targetView;
    goToView(targetView);
  });
});

backButton.addEventListener("click", () => {
  goToView(DEFAULT_VIEW);
});

stopwatchToggleButton.addEventListener("click", handleStopwatchToggle);
stopwatchClearButton.addEventListener("click", resetStopwatch);

renderStopwatch();
renderStopwatchButton();
goToView(DEFAULT_VIEW);
