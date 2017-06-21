import {combineReducers} from 'redux';
import {reducer as playbackReducer} from './playback';
import {reducer as mediaReducer} from './media';

export default combineReducers({
  playback: playbackReducer,
  media: mediaReducer,
});
