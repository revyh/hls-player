import React from 'react';

export default class Video extends React.Component {
  componentDidMount() {
    this.sync({}, this.props);
  }

  shouldComponentUpdate(nextProps) {
    this.sync(this.props, nextProps);

    return this.props.className !== nextProps.className;
  }

  getRef = ref => {
    if (this.element)
      this.element.removeEventListener('timeupdate', this.handleTimeUpdate);

    this.element = ref;

    if (this.element)
      this.element.addEventListener('timeupdate', this.handleTimeUpdate);

    this.props.videoRef && this.props.videoRef(this.element);
  };

  handleTimeUpdate = () => {
    const {onTimeChange} = this.props;
    const currentTime = this.element && this.element.currentTime;

    onTimeChange && onTimeChange(currentTime);
  };

  sync(prevProps, nextProps) {
    if (!this.element)
      return;

    this.syncPlay(prevProps, nextProps);
    this.syncMute(prevProps, nextProps);
    this.syncVolume(prevProps, nextProps);
  }

  syncPlay(prevProps, nextProps) {
    if (prevProps.isPaused === nextProps.isPaused)
      return;

    if (nextProps.isPaused)
      this.element.pause();
    else
      this.element.play();
  }

  syncMute(prevProps, nextProps) {
    if (prevProps.isMuted !== nextProps.isMuted)
      this.element.muted = nextProps.isMuted;
  }

  syncVolume(prevProps, nextProps) {
    if (prevProps.volume !== nextProps.volume)
      this.element.volume = nextProps.volume / 100;
  }

  render() {
    return <video className={this.props.className} ref={this.getRef} />;
  }
}
