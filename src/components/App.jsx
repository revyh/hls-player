import React from 'react';
import Page from 'components/Page';
import Spinner from 'components/Spinner';
import Video from 'components/Video';
import Panel from 'components/Panel';

export default class App extends React.Component {
  state = {
    isPaused: false,
    isMuted: false,
    volume: 50,
    isFullscreenEntered: false,
  };

  handlePauseChange = nextIsPaused => {
    this.setState({...this.state, isPaused: nextIsPaused});
  };

  handleMuteChange = nextIsMuted => {
    this.setState({...this.state, isMuted: nextIsMuted});
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

  render() {
    const {
      isPaused,
      isMuted,
      volume,
      isFullscreenEntered,
    } = this.state;

    return (
      <Page>
        <div style={{
          width: '100px',
          height: '100px',
        }}
        >
          <Spinner active />
        </div>
        <Video />
        <Panel
          isPaused={isPaused}
          isMuted={isMuted}
          isFullscreenEntered={isFullscreenEntered}
          volume={volume}
          time={61}
          onPauseChange={this.handlePauseChange}
          onMuteChange={this.handleMuteChange}
          onVolumeChange={this.handleVolumeChange}
          onFullscreenChange={this.handleFullscreenChange}
        />
      </Page>
    );
  }
}
