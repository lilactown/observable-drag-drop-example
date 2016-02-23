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
export function dragActions(...components) {
	return components.map((component) => 
		fromComponent(component, ['onDragStart'])
		.map(({event}) => {
			return {
				x: event.clientX - event.target.offsetLeft,
				y: event.clientY - event.target.offsetTop
			};
		})
	);
}

// Map drop event to the absolute position of the mouse inside 
// of the (non-scrolled) page
export const droppedActions =
	fromComponent(DropZone, ['onDrop'])
	.map(({event}) => {
		const {clientX, clientY} = event;
		return {
			x: clientX,
			y: clientY
		};
	});
