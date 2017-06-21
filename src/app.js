/* eslint-env commonjs */

import 'core-js';

import App from 'components/App';
import configureStore from 'configureStore';
import renderApp from 'utils/renderApp';
import loadSvgSprite from 'utils/loadSvgSprite';
import waitPageLoad from 'utils/waitPageLoad';
import reducer from 'features/reducer';

const store = configureStore(reducer);

loadSvgSprite('icons');
waitPageLoad().then(() => renderApp(App, store));

if (module.hot) {
  module.hot.accept('./components/App', () => {
    import('components/App').then(
      ({'default': NextApp}) => renderApp(NextApp, store),
    );
  });

  module.hot.accept('features/reducer', () => {
    import('features/reducer').then(
      ({'default': nextRootReducer}) => store.replaceReducer(nextRootReducer),
    );
  });
}
