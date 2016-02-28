import React from 'react';
import ReactDOM from 'react-dom';

import {model} from './model';
import {View} from './view';
import {dragDrop} from './intents';

const appState = model(dragDrop);
const render = (positions) =>
	ReactDOM.render(<View positions={positions} />, document.getElementById('app'))

appState.onValue(render);
appState.log();
