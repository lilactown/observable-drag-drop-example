import React from 'react';
import {render} from 'react-dom';
import {App} from './view/App';
import {dragStart, drop} from './intents';
import {model} from './model';

const appState = model(dragStart, drop);

appState.onValue((props) =>
	render(<App {...props} />, document.getElementById('app'))
);
appState.log();
