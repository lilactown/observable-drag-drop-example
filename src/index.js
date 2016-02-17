import React from 'react';
import {render} from 'react-dom';
import {model} from './model';
import {View} from './view';
import {mouseOffset, droppedPosition} from './intents';

const appState = model(mouseOffset, droppedPosition);

appState.onValue((props) =>
	render(<View {...props} />, document.getElementById('app'))
);
appState.log();
