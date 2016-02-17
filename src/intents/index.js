import {stream as droppableStream} from '../view/DroppableDiv';

// Allow the droppable component to be a droppable zone by
// calling e.preventDefault on each 'dragover' event.
droppableStream
	.filter(({type}) => type === 'onDragOver')
	.onValue(({event}) => event.preventDefault());

// Map drag start event to the relative position of the mouse
// inside of the target when the user begins to drag so we can 
// calculate where to place the target relative to the cursor
// once dropped.
export const dragStart =
	droppableStream
	.filter(({type}) => type === 'onDragStart')
	.map(({event}) => {
		return {
			x: event.clientX - event.target.offsetLeft,
			y: event.clientY - event.target.offsetTop
		};
	});

// Map drop event to the absolute position of the mouse inside 
// of the (non-scrolled) page
export const drop =
	droppableStream
	.filter(({type}) => type === 'onDrop')
	.map(({event}) => {
		const {clientX, clientY} = event;
		return {
			x: clientX,
			y: clientY
		};
	});
