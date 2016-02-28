import {observeComponent} from 'observe-component/kefir';

export const DropZone =
	observeComponent('div', ['onDrop', 'onDragOver']);
