import React from 'react';
import Page from 'components/Page';
import Player from 'components/Player';
import HlsClient from 'utils/HlsClient';

export default class App extends React.Component {
  state = {
    isPaused: false,
    isMuted: false,
    volume: 50,
    time: 0,
    isFullscreenEntered: false,
    url: null,
  };

  handlePauseChange = nextIsPaused => {
    this.setState({...this.state, isPaused: nextIsPaused});
  };

  handleMuteChange = nextIsMuted => {
    this.setState({...this.state, isMuted: nextIsMuted});
  };

  handleTimeChange = nextTime => {
    this.setState({...this.state, time: nextTime});
  };

  handleVolumeChange = nextVolume => {
    this.setState({...this.state, volume: nextVolume});
  };

  handleFullscreenChange = nextIsFullscreenEntered => {
    this.setState({
      ...this.state,
      isFullscreenEntered: nextIsFullscreenEntered,
    });
  };

  handleLoad = () => {
    this.setState({
      ...this.state,
      url: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
    });
  };

  render() {
    const {
      isPaused,
      isMuted,
      volume,
      time,
      isFullscreenEntered,
      url,
    } = this.state;

    return (
      <Page>
        <Player
          Client={HlsClient}
          mediaUrl={'some-url'}
          url={url}
          title="Big Buck Bunny"
          isPaused={isPaused}
          isMuted={isMuted}
          isFullscreenEntered={isFullscreenEntered}
          volume={volume}
          time={time}
          onPauseChange={this.handlePauseChange}
          onMuteChange={this.handleMuteChange}
          onVolumeChange={this.handleVolumeChange}
          onTimeChange={this.handleTimeChange}
          onFullscreenChange={this.handleFullscreenChange}
          onLoad={this.handleLoad}
        />
      </Page>
    );
  }
}
