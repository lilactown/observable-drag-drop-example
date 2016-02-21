import React from 'react';
import {observeComponent} from 'observe-component';

function Draggable(props) {
	return (<div draggable {...props} />);
}

export const DraggableOne = observeComponent(Draggable, ['onDragStart']);
export const DraggableTwo = observeComponent(Draggable, ['onDragStart']);
