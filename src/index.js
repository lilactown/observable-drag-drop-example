import React from 'react';
import {render} from 'react-dom';

// app functions
import {model} from './model';
import {View} from './view';
import {elementOnePickedUp, elementTwoPickedUp, elementDropped} from './intents';

const appState = model([elementOnePickedUp, elementTwoPickedUp], elementDropped);

appState.onValue((positions) =>
	render(<View positions={positions} />, document.getElementById('app'))
);
appState.log();
