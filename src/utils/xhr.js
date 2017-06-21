export default function xhr(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener(
      'load',
      () => resolve(request.responseText),
    );

    request.addEventListener('error', () => {
      const error = new Error('Loading failed');

      error.url = url;
      error.status = request.status;
      error.statusText = request.statusText;
      reject(error);
    });

    request.open('GET', url);
    request.send();
  });
}
