export const toIdleTask = (callback: () => void) => {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, 0);
  }
};
