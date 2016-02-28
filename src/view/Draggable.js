import {observeComponent} from 'observe-component/kefir';

export const Draggable =
	observeComponent('div', ['onDragStart']);
