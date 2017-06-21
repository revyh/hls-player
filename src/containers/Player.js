import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {
  actions as playbackActions,
  selectors as playbackSelectors,
} from 'features/playback';
import {
  actions as mediaActions,
  selectors as mediaSelectors,
} from 'features/media';
import * as selectors from 'features/selectors';
import Presentational from 'components/Player';

const getProps = createSelector(
  createSelector(selectors.playback, playbackSelectors.playback),
  createSelector(selectors.media, mediaSelectors.media),
  (playback, media) => ({...playback, ...media}),
);

function mapStateToProps(state, props) {
  return {
    ...getProps(state),
    ...props,
  };
}

const mapDispatchToProps = {
  onPauseChange: playbackActions.setPause,
  onMuteChange: playbackActions.setMute,
  onVolumeChange: playbackActions.setVolume,
  onTimeChange: playbackActions.setTime,
  onFullscreenChange: playbackActions.setFullscreenMode,
  onLoad: mediaActions.setMedia,
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentational);
