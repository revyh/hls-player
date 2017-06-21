import React from 'react';
import Page from 'components/Page';
import Spinner from 'components/Spinner';
import Video from 'components/Video';

export default function App() {
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
    </Page>
  );
}
