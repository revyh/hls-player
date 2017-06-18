const promises = {};

export default function loadSvgSprite(spriteName) {
  if (promises[spriteName] != null)
    return promises[spriteName];

  promises[spriteName] = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `/${spriteName}.svg`, true);
    xhr.send();
    xhr.onerror = reject;
    xhr.onload = () => {
      const container = document.createElement('div');

      container.style.cssText = `
        border: 0;
        clip: rect(0 0 0 0);
        height: 0;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 0;
      `;
      container.innerHTML = xhr.responseText;
      document.body.insertBefore(container, document.body.childNodes[0]);
      resolve();
    };
  });

  return promises[spriteName];
}
