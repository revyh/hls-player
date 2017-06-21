export default function workInAnimationFrame(worker) {
  let isRafStarted = false;

  return function rafWrapper(...args: *): * {
    if (isRafStarted)
      return;

    requestAnimationFrame(() => {
      worker(...args);
      isRafStarted = false;
    });

    isRafStarted = true;
  };
}
