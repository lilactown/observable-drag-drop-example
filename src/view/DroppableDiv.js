import {observeComponent, fromComponent} from 'react-streamable';

export const DroppableDiv =
	observeComponent('div', ['onDragStart', 'onDrop', 'onDragOver']);

export const stream = fromComponent(DroppableDiv);
