import React from 'react';
import {render} from 'react-dom';
import {App} from './components/App';
import {appState} from './streams';

appState.onValue((props) =>
	render(<App {...props} />, document.getElementById('app'))
);
appState.log();
