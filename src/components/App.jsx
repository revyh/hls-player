import React from 'react';
import Page from 'components/Page';
import Spinner from 'components/Spinner';

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
    </Page>
  );
}
