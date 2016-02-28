import {zip} from 'kefir';
import {fromComponent} from 'observe-component/kefir'
import {DropZone} from '../view/DropZone';
import {Draggable} from '../view/Draggable';

// Allow the drop zone component to be a droppable area by
// calling e.preventDefault on each 'dragover' event.
fromComponent(DropZone, ['onDragOver'])
	.onValue(({event}) => event.preventDefault());

// Map drag start event to the relative position of the mouse
// inside of the target when the user begins to drag so we can 
// calculate where to place the target relative to the cursor
// once dropped.
const pickedUp =
	fromComponent(Draggable, ['onDragStart'])
	.map(({event}) => {
		return {
			x: event.clientX - event.target.offsetLeft,
			y: event.clientY - event.target.offsetTop
		};
	});

// Map drop event to the absolute position of the mouse inside 
// of the (non-scrolled) page
const dropped =
	fromComponent(DropZone, ['onDrop'])
	.map(({event}) => {
		const {clientX, clientY} = event;
		return {
			x: clientX,
			y: clientY
		};
	});

// zip the action streams so we emit only once both
// `pickedUp` and `dropped` have new values
export const dragDrop = zip([pickedUp, dropped]);

