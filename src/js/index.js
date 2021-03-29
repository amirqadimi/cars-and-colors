import 'core-js/stable';
import 'regenerator-runtime/runtime';
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
		const NewApp = require('js/containers/App').default;
		render(<NewApp />);
	});
}
