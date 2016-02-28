import React from 'react';
import ReactDOM from 'react-dom';

import {model} from './model';
import {View} from './view';
import {dragDrop} from './intents';

const INITIAL_STATE = { x: 0, y: 0 };
const appState = model(dragDrop);
appState.log();

const render = (state) =>
	ReactDOM.render(<View {...state} />, document.getElementById('app'));

appState.onValue(render);
render(INITIAL_STATE);
