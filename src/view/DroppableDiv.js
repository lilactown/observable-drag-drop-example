import {streamComponent, fromComponent} from 'react-streamable';

export const DroppableDiv =
	streamComponent('div', ['onDragStart', 'onDrop', 'onDragOver']);

export const stream = fromComponent(DroppableDiv);
