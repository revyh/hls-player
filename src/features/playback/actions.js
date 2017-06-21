import * as actionTypes from './actionTypes';

export function setPause(isEnabled) {
  return {
    type: actionTypes.SET_PAUSE,
    payload: isEnabled,
  };
}

export function setMute(isEnabled) {
  return {
    type: actionTypes.SET_MUTE,
    payload: isEnabled,
  };
}

export function setVolume(value) {
  return {
    type: actionTypes.SET_VOLUME,
    payload: value,
  };
}

export function setTime(value) {
  return {
    type: actionTypes.SET_TIME,
    payload: value,
  };
}

export function setFullscreenMode(isEnabled) {
  return {
    type: actionTypes.SET_FULLSCREEN_MODE,
    payload: isEnabled,
  };
}
