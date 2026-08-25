const OUTBOUND_SELECTOR = "a[target='_blank']";
const EVENT_ATTRIBUTE = "data-event";

function safeTrack(eventName) {
  if (!eventName || !window.umami?.track) {
    return;
  }

  window.umami.track(eventName);
}

document.querySelectorAll(`[${EVENT_ATTRIBUTE}]`).forEach((element) => {
  element.addEventListener("click", () => safeTrack(element.getAttribute(EVENT_ATTRIBUTE)));
});

document.querySelectorAll(OUTBOUND_SELECTOR).forEach((element) => {
  element.addEventListener("click", () => safeTrack("radar_source_open"));
});
