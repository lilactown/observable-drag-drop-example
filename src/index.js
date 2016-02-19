import React from 'react';
import {render} from 'react-dom';

// app functions
import {model} from './model';
import {View} from './view';
import {elementPickedUp, elementDropped} from './intents';

const appState = model(elementPickedUp, elementDropped);

appState.onValue((state) =>
	render(<View {...state} />, document.getElementById('app'))
);
appState.log();
