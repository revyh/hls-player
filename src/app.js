/* eslint-env commonjs */

import 'core-js';

import App from 'components/App';
import renderApp from 'utils/renderApp';
import loadSvgSprite from 'utils/loadSvgSprite';
import waitPageLoad from 'utils/waitPageLoad';

loadSvgSprite('icons');
waitPageLoad().then(() => renderApp(App));

if (module.hot)
  module.hot.accept('./components/App', () => {
    import('components/App').then(
      ({'default': NextApp}) => renderApp(NextApp),
    );
  });
