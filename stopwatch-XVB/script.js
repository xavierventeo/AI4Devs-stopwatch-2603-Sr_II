const VIEW_ORDER = ["countdown", "selection", "stopwatch"];
const DEFAULT_VIEW = "selection";

const viewTrack = document.querySelector("[data-view-track]");
const backButton = document.querySelector("[data-back-button]");
const modeButtons = document.querySelectorAll("[data-target-view]");

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

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetView = button.dataset.targetView;
    goToView(targetView);
  });
});

backButton.addEventListener("click", () => {
  goToView(DEFAULT_VIEW);
});

goToView(DEFAULT_VIEW);
