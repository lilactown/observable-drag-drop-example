import React from 'react';
import {render} from 'react-dom';

// app functions
import {model} from './model';
import {View} from './view';
import {dragActions, droppedActions} from './intents';
import {DraggableOne, DraggableTwo} from './view/Draggable';

const appState = model(dragActions(DraggableOne, DraggableTwo), droppedActions);

appState.onValue((positions) =>
	render(<View positions={positions} />, document.getElementById('app'))
);
appState.log();
