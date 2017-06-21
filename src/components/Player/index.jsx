import React from 'react';
import screenfull from 'screenfull';
import styles from './styles.scss';
import Panel from 'components/Panel';
import Video from 'components/Video';
import Spinner from 'components/Spinner';
import Icon from 'components/Icon';
import getClassName from 'utils/getClassName';
import workInAnimationFrame from 'utils/workInAnimationFrame';

const CONTROLS_VISIBILITY_TIMEOUT = 5000;

export default class Player extends React.Component {
  state = {
    isControlsVisible: false,
  };

  componentDidMount() {
    this.updateClient(this.props.Client);
    document.addEventListener('mousemove', this.checkControlsVisibility);
    document.addEventListener(
      screenfull.raw.fullscreenchange,
      this.handleFullscreenEscape,
    );
  }

  componentDidUpdate(prevProps) {
    this.updateClient(prevProps.Client);
    this.syncFullscreen();
  }

  componentWillUnmount() {
    if (this.client)
      this.client.destroy();

    document.removeEventListener('mousemove', this.checkControlsVisibility);
    document.removeEventListener(
      screenfull.raw.fullscreenchange,
      this.handleFullscreenEscape,
    );
  }

  get isLoaded() {
    return this.client && this.client.isLoaded;
  }

  getRef = ref => {
    this.containerElement = ref;
    this.syncFullscreen();
  };

  getVideoRef = ref => {
    this.videoElement = ref;
    this.updateClient(this.props.Client);
  };

  handleFullscreenEscape = () => {
    if (!screenfull.isFullscreen)
      this.props.onFullscreenChange(false);
  };

  handleLoad = () => {
    const {mediaUrl, onLoad} = this.props;
    onLoad && onLoad(mediaUrl);
  };

  checkControlsVisibility = workInAnimationFrame(() => {
    if (this.controlsVisibilityTimeout)
      clearTimeout(this.controlsVisibilityTimeout);

    if (!this.state.isControlsVisible)
      this.setState({...this.state, isControlsVisible: true});

    this.controlsVisibilityTimeout = setTimeout(
      () => { this.setState({...this.state, isControlsVisible: false}); },
      CONTROLS_VISIBILITY_TIMEOUT,
    );
  });

  syncFullscreen() {
    const {isFullscreenEntered} = this.props;
    const container = this.containerElement;

    if (!container)
      return;

    if (isFullscreenEntered && screenfull.element !== container)
      screenfull.request(container);
    else if (!isFullscreenEntered && screenfull.element === container)
      screenfull.exit();
  }

  updateClient(prevClient) {
    const {Client, url} = this.props;
    const videoElement = this.videoElement;

    if (this.client)
      if (
        this.client.url === url
        && this.client.videoElement === videoElement
        && prevClient === Client
      )
        return;
      else {
        this.client.destroy();
        this.client = null;
      }

    if (!url || !videoElement || !Client)
      return;

    this.client = new Client();
    this.client.start(url, this.videoElement);
  }

  renderLoader() {
    return this.isLoaded
      ? null
      : (
        <div className={styles.loaderElem}>
          <Spinner active={!!this.props.url} />
          <Icon className={styles.loaderIconElem} symbol="play" />
          <button
            className={styles.loaderBtnElem}
            onClick={!this.props.url && this.handleLoad}
          />
        </div>
      );
  }

  renderTitle() {
    const titleClassName = this.isLoaded && this.state.isControlsVisible
      ? styles.titleElem
      : styles.titleElemHidden;

    return (
      <div className={titleClassName}>
        <span className={styles.titleTextElem}>{this.props.title}</span>
      </div>
    );
  }

  renderVideo() {
    const {isPaused, isMuted, volume, onTimeChange} = this.props;

    const videoClassName = this.isLoaded
      ? styles.videoElem
      : styles.videoElemHidden;

    return (
      <Video
        className={videoClassName}
        isPaused={isPaused}
        isMuted={isMuted}
        volume={volume}
        onTimeChange={onTimeChange}
        videoRef={this.getVideoRef}
      />
    );
  }

  renderPanel() {
    const {
      isPaused,
      isMuted,
      volume,
      isFullscreenEntered,
      time,
      onPauseChange,
      onMuteChange,
      onVolumeChange,
      onFullscreenChange,
    } = this.props;

    const isVisible = this.state.isControlsVisible || isFullscreenEntered;
    const panelClassName = this.isLoaded && isVisible
      ? styles.panelElem
      : styles.panelElemHidden;

    return (
      <div className={panelClassName}>
        <Panel
          isPaused={isPaused}
          isMuted={isMuted}
          isFullscreenEntered={isFullscreenEntered}
          volume={volume}
          time={time}
          onPauseChange={onPauseChange}
          onMuteChange={onMuteChange}
          onVolumeChange={onVolumeChange}
          onFullscreenChange={onFullscreenChange}
        />
      </div>
    );
  }

  render() {
    return (
      <div
        className={getClassName(styles, this.props, styles.base)}
        ref={this.getRef}
      >
        {this.renderLoader()}
        {this.renderTitle()}
        {this.renderVideo()}
        {this.renderPanel()}
      </div>
    );
  }
}
