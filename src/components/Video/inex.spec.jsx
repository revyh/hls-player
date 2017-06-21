import React from 'react';
import {shallow, mount} from 'enzyme';
import Video from '.';

function renderElement(props = {}) {
  let videoRef;

  const getVideoRef = ref => {
    videoRef = ref;
  };

  const video = mount(<Video {...props} videoRef={getVideoRef} />);

  return {video, videoRef};
}

it('should render', () => {
  expect(shallow(<Video className="some-class" />)).toMatchSnapshot();
});

it('should pass ref', () => {
  expect(renderElement().videoRef).toBeDefined();
});

it('should sync props with dom element on mount', () => {
  const {videoRef} = renderElement({
    isMuted: true,
    volume: 10,
  });

  expect(videoRef.muted).toBeTruthy();
  expect(videoRef.volume).toBeCloseTo(0.1);
});

// skip because `play` and `pause` methods don't implemented in jsdom yet
it.skip('should sync \'isPaused\' prop with dom element', () => {
  const {videoRef, video} = renderElement({isPaused: true});

  expect(videoRef.paused).toBeTruthy();
  video.setProps({isPaused: false});
  expect(videoRef.paused).toBeFalsy();
});

it('should sync \'isMuted\' prop with dom element', () => {
  const {videoRef, video} = renderElement({isMuted: false});

  expect(videoRef.muted).toBeFalsy();
  video.setProps({isMuted: true});
  expect(videoRef.muted).toBeTruthy();
});

it('should sync \'volume\' prop with dom element', () => {
  const {videoRef, video} = renderElement({volume: 30});

  expect(videoRef.volume).toBeCloseTo(0.3);
  video.setProps({volume: 70});
  expect(videoRef.volume).toBeCloseTo(0.7);
});

it('should rerender when \'className\' prop changes', () => {
  const {videoRef, video} = renderElement({className: 'some-class'});

  expect(videoRef.className).toBe('some-class');
  video.setProps({className: 'another-class'});
  expect(videoRef.className).toBe('another-class');
});

// skip because `play` and `pause` methods don't implemented in jsdom yet
it.skip('should trigger \'onTimeChange\' event handler', () => {
  const onTimeChangeMock = jest.fn();
  const {videoRef} = renderElement({onTimeChange: onTimeChangeMock});

  const timeUpdateEvent = document.createEvent('MediaEvents');
  timeUpdateEvent.initEvent('timeupdate', true, true);
  videoRef.dispatchEvent(timeUpdateEvent);

  expect(onTimeChangeMock).toHaveBeenCalled();
});
