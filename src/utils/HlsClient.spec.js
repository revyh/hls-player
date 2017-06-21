import HlsClient from './HlsClient';

// eslint-disable-next-line no-var
var mockHls;

jest.mock('hls.js', () => {
  if (mockHls)
    return mockHls;

  mockHls = jest.fn(function ClientMock() {
    this.attachMedia = jest.fn();
    this.loadSource = jest.fn();
    this.on = jest.fn((eventName, handler) => { handler(); });
    this.off = jest.fn();
    this.destroy = jest.fn();
  });

  mockHls.Events = {
    MEDIA_ATTACHED: 'MEDIA_ATTACHED',
    MANIFEST_PARSED: 'MANIFEST_PARSED',
    FRAG_LOADED: 'FRAG_LOADED',
  };

  return mockHls;
});

it('should resolve start promise', () => {
  const hlsClient = new HlsClient();
  const hlsMock = mockHls.mock.instances[0];
  const videoElementMock = {
    play: jest.fn(),
  };

  return hlsClient.start('some-url', videoElementMock).then(() => {
    expect(hlsMock.attachMedia).toHaveBeenCalledWith(videoElementMock);
    expect(hlsMock.loadSource).toHaveBeenCalledWith('some-url');
    expect(videoElementMock.play).toHaveBeenCalled();
  });
});

it('should set \'isLoaded\' property after start promise resolve', () => {
  const hlsClient = new HlsClient();
  const videoElementMock = {
    play: jest.fn(),
  };

  expect(hlsClient.isLoaded).toBeFalsy();

  return hlsClient.start('some-url', videoElementMock).then(() => {
    expect(hlsClient.isLoaded).toBeTruthy();
  });
});

it('should cache url and videoElement', () => {
  const hlsClient = new HlsClient();
  const videoElementMock = {
    play: jest.fn(),
  };

  hlsClient.start('some-url', videoElementMock);

  expect(hlsClient.videoElement).toBe(videoElementMock);
  expect(hlsClient.url).toBe('some-url');
});

it('should redirect destroy call', () => {
  const hlsClient = new HlsClient();
  const hlsMock = mockHls.mock.instances[0];

  hlsClient.destroy();

  expect(hlsMock.destroy).toHaveBeenCalled();
});
