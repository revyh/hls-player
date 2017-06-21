import React from 'react';
import Player from './Player';
import Page from 'components/Page';
import HlsClient from 'utils/HlsClient';

const MEDIA_URL = '/media.json';

export default function App() {
  return (
    <Page>
      <Player
        mediaUrl={MEDIA_URL}
        Client={HlsClient}
      />
    </Page>
  );
}
