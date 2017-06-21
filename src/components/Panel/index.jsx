import React from 'react';
import InputRange from 'react-input-range';
import styles from './styles.scss';
import Icon from 'components/Icon';
import getClassName from 'utils/getClassName';
import formatTime from 'utils/formatTime';

const volumeClassNames = {
  inputRange: styles.volumeElem,
  track: styles.volumeTrackElem,
  activeTrack: styles.volumeActiveTrackElem,
  labelContainer: styles.volumeHiddenElem,
  valueLabel: styles.volumeHiddenElem,
  maxLabel: styles.volumeHiddenElem,
  minLabel: styles.volumeHiddenElem,
  slider: styles.volumeHiddenElem,
  sliderContainer: styles.volumeHiddenElem,
};

export default class Panel extends React.Component {
  static defaultProps = {
    isPaused: false,
    isMuted: false,
    isFullscreenEntered: false,
    volume: 50,
    time: 0,
    onVolumeChange() { /* empty */ },
  };

  handlePauseChange = () => {
    const {isPaused, onPauseChange} = this.props;
    onPauseChange && onPauseChange(!isPaused);
  };

  handleMuteChange = () => {
    const {isMuted, onMuteChange} = this.props;
    onMuteChange && onMuteChange(!isMuted);
  };

  handleFullscreenChange = () => {
    const {isFullscreenEntered, onFullscreenChange} = this.props;
    onFullscreenChange && onFullscreenChange(!isFullscreenEntered);
  };

  render() {
    const {
      onVolumeChange,
      isPaused,
      isMuted,
      isFullscreenEntered,
      volume,
      time,
    } = this.props;

    const playSymbol = isPaused
      ? 'play'
      : 'pause';

    const muteSymbol = isMuted
      ? 'mute'
      : 'sound';

    const fullscreenSymbol = isFullscreenEntered
      ? 'leaveFullscreen'
      : 'enterFullscreen';

    const muteClassName = isMuted
      ? styles.muteBtnElemActive
      : styles.muteBtnElem;

    return (
      <div className={getClassName(styles, this.props, styles.base)}>
        <Icon
          className={styles.playBtnElem}
          symbol={playSymbol}
          onClick={this.handlePauseChange}
          key="play"
        />
        <Icon
          className={muteClassName}
          symbol={muteSymbol}
          onClick={this.handleMuteChange}
          key="mute"
        />
        <InputRange
          maxValue={100}
          minValue={0}
          classNames={volumeClassNames}
          value={volume}
          onChange={onVolumeChange}
        />
        <span className={styles.timeElem}>{formatTime(time)}</span>
        <Icon
          className={styles.fullscreenBtnElem}
          symbol={fullscreenSymbol}
          onClick={this.handleFullscreenChange}
          key="fullscreen"
        />
      </div>
    );
  }
}
