import 'core-js/stable';
import 'regenerator-runtime/runtime'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/containers/App';

const render = Component => {
  ReactDOM.render(
    Component,
    document.getElementById('app')
  );
};

render(<App />);

if (module.hot) {
  module.hot.accept('js/containers/App', () => {
    import('js/containers/App').then(src => {
      const NewApp = src.default;
      render(<NewApp />);
    });
  });
}
