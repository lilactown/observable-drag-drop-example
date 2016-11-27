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
	// list of draggable elements - could add more
	[DraggableOne, DraggableTwo]
	// map component to its observable stream
	.map((component) => fromComponent(component, ['onDragStart']))
	.map((observable) =>
		observable
		// transform each observable into stream of x, y mouse pos
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

function combineDragDrop(dropzone, pickedup, id) {
	// get the dropped action after picked up, only once
	return zip([pickedup, pickedup.flatMap(() => dropzone.take(1))]);
	// return zip([pickedup, pickedup.takeUntilBy(dropzone)]);
}

function newPosition(id, [offset, position]) {
	// return the new left and top values for our draggable element
	// along with id in list to differentiate between other
	// element positions
	return {
		id,
		left: position.x - offset.x,
		top: position.y - offset.y,
	};
}

// our fully transformed drag-drop stream of new element positions
export const intent = merge(
	pickedUp
	.map(combineDragDrop.bind(null, dropped))
	.map((action, id) => 
		action.map(newPosition.bind(null, id)))
);
