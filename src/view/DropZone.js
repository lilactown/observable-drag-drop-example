import {observeComponent} from 'observe-component/kefir';

export const DropZone =
	observeComponent('div', ['onDragStart', 'onDrop', 'onDragOver']);
