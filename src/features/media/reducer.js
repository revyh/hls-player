import * as types from './actionTypes';

const DEFAULT_STATE = {
  url: null,
  title: '',
};

export default function reducer(state = DEFAULT_STATE, {type, payload}) {
  switch (type) {
    case types.LOAD_MEDIA_START:
      return {...DEFAULT_STATE};

    case types.LOAD_MEDIA_SUCCESS:
      return {...payload};

    default:
      return state;
  }
}
