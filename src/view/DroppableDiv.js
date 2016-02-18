import {observeComponent, fromComponent} from 'observe-component';

export const DroppableDiv =
	observeComponent('div', ['onDragStart', 'onDrop', 'onDragOver']);

export const dragDropStream = fromComponent(DroppableDiv);
