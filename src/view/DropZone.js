import {observeComponent} from 'observe-component';

export const DropZone =
	observeComponent('div', ['onDragStart', 'onDrop', 'onDragOver']);
