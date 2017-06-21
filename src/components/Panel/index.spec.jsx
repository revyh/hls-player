import React from 'react';
import {shallow} from 'enzyme';
import Panel from '.';

jest.mock('components/Icon');

function getButton(element, key) {
  return element.findWhere(
    node => node.name() === 'Icon' && node.key() === key,
  );
}

it('should render with default values', () => {
  expect(shallow(<Panel />)).toMatchSnapshot();
});

it('should render with custom values', () => {
  const element = shallow(
    <Panel
      isPaused
      isMuted
      isFullscreenEntered
      volume={10}
      time={3661}
      onPauseChange={jest.fn()}
      onMuteChange={jest.fn()}
      onFullscreenChange={jest.fn()}
      onVolumeChange={jest.fn()}
    />,
  );

  expect(element).toMatchSnapshot();
});

it('should trigger \'onPauseChange\' event handler', () => {
  const mockOnPauseChange = jest.fn();
  const panel = shallow(
    <Panel isPaused onPauseChange={mockOnPauseChange} />,
  );

  const pauseButton = getButton(panel, 'play');

  pauseButton.simulate('click');

  expect(mockOnPauseChange).toHaveBeenCalledWith(false);
});

it('should trigger \'onMuteChange\' event handler', () => {
  const mockOnMuteChange = jest.fn();
  const panel = shallow(
    <Panel isMuted onMuteChange={mockOnMuteChange} />,
  );

  const muteButton = getButton(panel, 'mute');

  muteButton.simulate('click');

  expect(mockOnMuteChange).toHaveBeenCalledWith(false);
});

it('should trigger \'onFullscreenChange\' event handler', () => {
  const mockOnFullscreenChange = jest.fn();
  const panel = shallow(
    <Panel isFullscreenEntered onFullscreenChange={mockOnFullscreenChange} />,
  );

  const fullscreenButton = getButton(panel, 'fullscreen');

  fullscreenButton.simulate('click');

  expect(mockOnFullscreenChange).toHaveBeenCalledWith(false);
});

it('should trigger \'onVolumeChange\' event handler', () => {
  const mockOnVolumeChange = jest.fn();
  const panel = shallow(
    <Panel volume={10} onVolumeChange={mockOnVolumeChange} />,
  );

  const volumeRange = panel.findWhere(node => node.name() === 'InputRange');

  volumeRange.simulate('change', 40);

  expect(mockOnVolumeChange).toHaveBeenCalledWith(40);
});
