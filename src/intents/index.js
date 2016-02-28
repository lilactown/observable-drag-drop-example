import {flatMap, zip, merge} from 'kefir';
import {fromComponent} from 'observe-component/kefir'
import {DropZone} from '../view/DropZone';
import {DraggableOne, DraggableTwo} from '../view/Draggable';

// Allow the drop zone component to be a droppable area by
// calling e.preventDefault on each 'dragover' event.
fromComponent(DropZone, ['onDragOver'])
	.onValue(({event}) => event.preventDefault());

// Map drag start event to the relative position of the mouse
// inside of the target when the user begins to drag so we can 
// calculate where to place the target relative to the cursor
// once dropped.
const pickedUp =  
	[DraggableOne, DraggableTwo]
	.map((component) => fromComponent(component, ['onDragStart']))
	.map((observable) =>
		observable
		.map(({event}) => {
			return {
				x: event.clientX - event.target.offsetLeft,
				y: event.clientY - event.target.offsetTop
			};
		})
	);

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

function combineDragDrop(dropzone, element, id) {
	// get the dropped action only once, after picked up
	const droppedAction =
		element
		.flatMap(() => dropzone.take(1));

	return zip([element, droppedAction]);
}

function newPosition(id, [offset, position]) {
	return {
		id,
		left: position.x - offset.x,
		top: position.y - offset.y,
	};
}

export const dragDrop = merge(
	pickedUp
	.map(combineDragDrop.bind(null, dropped))
	.map((action, id) => 
		action.map(newPosition.bind(null, id)))
);
