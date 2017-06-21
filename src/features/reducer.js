import {combineReducers} from 'redux';
import {reducer as playbackReducer} from './playback';

export default combineReducers({
  playback: playbackReducer,
});
