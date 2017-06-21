import Hls from 'hls.js';

const {MEDIA_ATTACHED, MANIFEST_PARSED, FRAG_LOADED} = Hls.Events;

function promisifyEvent(object, eventName) {
  return new Promise(
    resolve => {
      const handler = (...args) => {
        object.off(eventName, handler);
        resolve(...args);
      };
      object.on(eventName, handler);
    },
  );
}

export default class HlsClient {
  constructor() {
    this.hls = new Hls();
  }

  get url() {
    return this._url;
  }

  get videoElement() {
    return this._videoElement;
  }

  get isLoaded() {
    return this._isLoaded;
  }

  start(url, videoElement) {
    this._url = url;
    this._videoElement = videoElement;
    this.hls.attachMedia(videoElement);

    return promisifyEvent(this.hls, MEDIA_ATTACHED)
      .then(() => {
        this.hls.loadSource(this.url);
        return promisifyEvent(this.hls, MANIFEST_PARSED);
      })
      .then(() => {
        this.videoElement && this.videoElement.play();
        return promisifyEvent(this.hls, FRAG_LOADED);
      })
      .then(() => {
        this._isLoaded = true;
      });
  }

  destroy() {
    this.hls.destroy();
  }
}
