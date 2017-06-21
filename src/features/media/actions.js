import * as actionTypes from './actionTypes';
import xhr from 'utils/xhr';

// eslint-disable-next-line import/prefer-default-export
export function setMedia(url) {
  return dispatch => {
    xhr(url).then(
      response => {
        dispatch({
          type: actionTypes.LOAD_MEDIA_SUCCESS,
          payload: JSON.parse(response),
        });
      },
      error => {
        dispatch({
          type: actionTypes.LOAD_MEDIA_FAIL,
          payload: error,
        });
      },
    );

    return dispatch({type: actionTypes.LOAD_MEDIA_START});
  };
}
