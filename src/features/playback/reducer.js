import * as types from './actionTypes';
import {actionTypes as mediaTypes} from 'features/media';

const DEFAULT_STATE = {
  isPaused: false,
  isMuted: false,
  volume: 50,
  time: 0,
  isFullscreenEntered: false,
};

function changeProp(state, propName, propValue) {
  return state[propName] === propValue
    ? state
    : {
      ...state,
      [propName]: propValue,
    };
}

export default function reducer(state = DEFAULT_STATE, {type, payload}) {
  switch (type) {
    case types.SET_PAUSE:
      return changeProp(state, 'isPaused', payload);

    case types.SET_MUTE:
      return changeProp(state, 'isMuted', payload);

    case types.SET_VOLUME:
      return changeProp(state, 'volume', payload);

    case types.SET_TIME:
      return changeProp(state, 'time', payload);

    case types.SET_FULLSCREEN_MODE:
      return changeProp(state, 'isFullscreenEntered', payload);

    case mediaTypes.LOAD_MEDIA_START:
      return {...DEFAULT_STATE};

    default:
      return state;
  }
}
