import deepFreeze from 'deep-freeze';
import {actions, reducer, selectors, actionTypes} from '.';

function createState({
  isPaused = false,
  isMuted = false,
  volume = 50,
  time = 0,
  isFullscreenEntered = false,
} = {}) {
  return {isPaused, isMuted, volume, time, isFullscreenEntered};
}

describe('actions', () => {
  it('should create \'setPause\' action', () => {
    expect(actions.setPause(true)).toEqual({
      type: actionTypes.SET_PAUSE,
      payload: true,
    });
  });

  it('should create \'setMute\' action', () => {
    expect(actions.setMute(true)).toEqual({
      type: actionTypes.SET_MUTE,
      payload: true,
    });
  });

  it('should create \'setVolume\' action', () => {
    expect(actions.setVolume(59)).toEqual({
      type: actionTypes.SET_VOLUME,
      payload: 59,
    });
  });

  it('should create \'setTime\' action', () => {
    expect(actions.setTime(40)).toEqual({
      type: actionTypes.SET_TIME,
      payload: 40,
    });
  });

  it('should create \'setFullscreenMode\' action', () => {
    expect(actions.setFullscreenMode(true)).toEqual({
      type: actionTypes.SET_FULLSCREEN_MODE,
      payload: true,
    });
  });
});

describe('reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual({
      isPaused: false,
      isMuted: false,
      volume: 50,
      time: 0,
      isFullscreenEntered: false,
    });
  });

  it('should not change state on unknown action', () => {
    const state = createState();

    expect(reducer(state, {type: 'UNKNOWN_ACTION'})).toBe(state);
  });

  it('should set pause', () => {
    const state = createState({isPaused: false});
    const action = {
      type: actionTypes.SET_PAUSE,
      payload: true,
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...createState(),
      isPaused: true,
    });
  });

  it('should set mute', () => {
    const state = createState({isMuted: false});
    const action = {
      type: actionTypes.SET_MUTE,
      payload: true,
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...createState(),
      isMuted: true,
    });
  });

  it('should set volume', () => {
    const state = createState({volume: 30});
    const action = {
      type: actionTypes.SET_VOLUME,
      payload: 50,
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...createState(),
      volume: 50,
    });
  });

  it('should set time', () => {
    const state = createState({time: 100});
    const action = {
      type: actionTypes.SET_TIME,
      payload: 150,
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...createState(),
      time: 150,
    });
  });

  it('should set fullscreen mode', () => {
    const state = createState({isFullscreenEntered: false});
    const action = {
      type: actionTypes.SET_FULLSCREEN_MODE,
      payload: true,
    };

    deepFreeze(state);

    expect(reducer(state, action)).toEqual({
      ...createState(),
      isFullscreenEntered: true,
    });
  });
});

describe('selectors', () => {
  it('should select playback state', () => {
    const state = createState();

    expect(selectors.playback(state)).toEqual(state);
  });
});
