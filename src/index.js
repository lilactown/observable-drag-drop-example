import React from 'react';
import {render} from 'react-dom';
import {model} from './model';
import {View} from './view';
import {elementPickedUp, elementDropped} from './intents';

const appState = model(elementPickedUp, elementDropped);

appState.onValue((props) =>
	render(<View {...props} />, document.getElementById('app'))
);
appState.log();
