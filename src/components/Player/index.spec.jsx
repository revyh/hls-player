import React from 'react';
import {shallow, mount} from 'enzyme';
import Player from '.';

// eslint-disable-next-line no-var
var mockScreenfull;

jest.mock('components/Icon');
jest.mock('utils/workInAnimationFrame', () => arg => arg);
jest.mock('screenfull', () => {
  mockScreenfull = mockScreenfull || {
    element: null,
    request: jest.fn(),
    exit: jest.fn(),
    raw: {fullscreenchange: 'fullscreenchange'},
  };
  return mockScreenfull;
});

jest.useFakeTimers();

beforeEach(() => {
  mockScreenfull.element = null;
  mockScreenfull.request.mockClear();
  mockScreenfull.exit.mockClear();
});

const MockClient = jest.fn(function MockClient() {
  this.startPromise = Promise.resolve();

  this.start = jest.fn((startUrl, videoElement) => {
    this.url = startUrl;
    this.videoElement = videoElement;

    return this.startPromise.then(() => {
      this.isLoaded = true;
    });
  });

  this.destroy = jest.fn();
});

function dispatchMouseMove() {
  const mouseMoveEvent = document.createEvent('MouseEvents');
  mouseMoveEvent.initEvent('mousemove', true, true);
  document.dispatchEvent(mouseMoveEvent);
}

function expectControlsVisible(player) {
  expect(player.find('.titleElem').exists()).toBeTruthy();
  expect(player.find('.panelElem').exists()).toBeTruthy();
}

function expectControlsHidden(player) {
  expect(player.find('.titleElemHidden').exists()).toBeTruthy();
  expect(player.find('.panelElemHidden').exists()).toBeTruthy();
}

function renderStub(props) {
  return shallow(
    <Player
      Client={MockClient}
      url="some-url"
      title="some title"
      isPaused
      isMuted
      isFullscreenEntered
      volume={10}
      time={3600}
      onPauseChange={jest.fn()}
      onMuteChange={jest.fn()}
      onVolumeChange={jest.fn()}
      onFullscreenChange={jest.fn()}
      {...props}
    />,
  );
}

it('should render', () => {
  expect(renderStub({url: null})).toMatchSnapshot();
});

it('should render in loading state', () => {
  expect(renderStub()).toMatchSnapshot();
});

it('should render in loaded state', () => {
  const player = renderStub();
  player.instance().getVideoRef('videoElement');
  MockClient.mock.instances[0].isLoaded = true;
  player.instance().forceUpdate();

  expect(player.shallow()).toMatchSnapshot();
});

it('should render with visible controls in loaded state', () => {
  const player = renderStub();
  player.instance().getVideoRef('videoElement');
  MockClient.mock.instances[0].isLoaded = true;
  player.setState({isControlsVisible: true});

  expect(player.shallow()).toMatchSnapshot();
});

it('should init new client', () => {
  mount(<Player Client={MockClient} url="some-url" />);
  const clientMock = MockClient.mock.instances[0];

  expect(clientMock.start).toHaveBeenCalledTimes(1);
  expect(clientMock.start.mock.calls[0][0]).toBe('some-url');
});

it('should destroy previous client', () => {
  const player = mount(<Player Client={MockClient} url="some-url" />);
  const clientMock = MockClient.mock.instances[0];

  player.setProps({url: 'another-url'});

  expect(clientMock.destroy).toHaveBeenCalled();
});

it('should reinit client only when needed', () => {
  const player = mount(<Player Client={MockClient} url="some-url" />);
  const clientMock = MockClient.mock.instances[0];

  player.update();

  expect(clientMock.start).toHaveBeenCalledTimes(1);
  expect(clientMock.destroy).not.toHaveBeenCalled();
});

it('should show hidden controls on \'mousemove\' event', () => {
  const player = mount(<Player Client={MockClient} url="some-url" />);
  MockClient.mock.instances[0].isLoaded = true;

  expectControlsHidden(player);

  dispatchMouseMove();
  expectControlsVisible(player);
});

it('should hide controls on timeout after \'mousemove\' event', () => {
  const player = mount(<Player Client={MockClient} url="some-url" />);
  MockClient.mock.instances[0].isLoaded = true;

  dispatchMouseMove();
  expectControlsVisible(player);

  jest.runAllTimers();
  expectControlsHidden(player);
});

it('should rerun timer on each \'mousemove\' event', () => {
  const player = mount(<Player Client={MockClient} url="some-url" />);
  MockClient.mock.instances[0].isLoaded = true;

  dispatchMouseMove();
  expectControlsVisible(player);

  jest.runTimersToTime(4000);
  dispatchMouseMove();
  jest.runTimersToTime(4000);

  expectControlsVisible(player);
});

it('should enter fullscreen', () => {
  const player = mount(<Player />);
  const containerElement = player.instance().containerElement;

  player.setProps({isFullscreenEntered: true});

  expect(mockScreenfull.request).toHaveBeenCalledWith(containerElement);
});

it('should leave fullscreen', () => {
  const player = mount(<Player isFullscreenEntered />);
  mockScreenfull.element = player.instance().containerElement;

  player.setProps({isFullscreenEntered: false});

  expect(mockScreenfull.exit).toHaveBeenCalled();
});

it('should show controls in fullscreen mode', () => {
  const player = mount(<Player Client={MockClient} url="some-url" />);
  MockClient.mock.instances[0].isLoaded = true;

  expect(player.find('.titleElemHidden').exists()).toBeTruthy();
  expect(player.find('.panelElemHidden').exists()).toBeTruthy();

  player.setProps({isFullscreenEntered: true});

  expect(player.find('.titleElemHidden').exists()).toBeTruthy();
  expect(player.find('.panelElem').exists()).toBeTruthy();
});

// skip because `fullscreenchange` event doesn't implemented in jsdom yet
it.skip('should trigger \'onFullscreenChange\' event handler on \'esc\' key', () => {
  const mockOnFullscreenChange = jest.fn();
  mount(
    <Player
      isFullscreenEntered
      onFullscreenChange={mockOnFullscreenChange}
    />,
  );

  const fullscreenChangeEvent = document.createEvent('ViewEvents');
  fullscreenChangeEvent.initEvent('fullscreenchange', true, true);
  document.dispatchEvent(fullscreenChangeEvent);

  expect(mockOnFullscreenChange).toHaveBeenCalledWith(false);
});

it('should trigger \'onLoad\' event handler', () => {
  const mockOnLoad = jest.fn();
  const player = mount(
    <Player
      mediaUrl="some-media-url"
      onLoad={mockOnLoad}
    />,
  );

  player.find('.loaderBtnElem').simulate('click');

  expect(mockOnLoad).toHaveBeenCalledWith('some-media-url');
});
