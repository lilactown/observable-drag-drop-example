import {stream as droppableStream} from '../components/DroppableDiv';
import {zip, constant, merge} from 'kefir';

// Allow the droppable component to be a droppable zone
droppableStream
	.filter(({event}) => event === 'onDragOver')
	.onValue(({e}) => e.preventDefault());

// Map drag start event to the relative position of the mouse
// inside of the target when the user begins to drag so we can 
// calculate where to place the target relative to the cursor
// once dropped.
const dragStart =
	droppableStream
	.filter(({event}) => event === 'onDragStart')
	.map(({e}) => {
		return {
			x: e.clientX - e.target.offsetLeft,
			y: e.clientY - e.target.offsetTop
		};
	});

// Map drop event to the absolute position of the mouse inside 
// of the (non-scrolled) page
const drop =
	droppableStream
	.filter(({event}) => event === 'onDrop')
	.map(({e}) => {
		const {clientX, clientY} = e;
		return {
			x: clientX,
			y: clientY
		};
	});

// Define the state that will be emitted on first listen.
const INITIAL_STATE = constant({ x: 0, y: 0 });
const droppedPosition =
	// zip the two streams so we emit only once both
	// `dragStart` and `drop` have new values
	zip([dragStart, drop])
	// we use scan to emit a dummy value when listened
	// to render the initial view
	.map(([relative, absolute]) =>
		// calculate new position of the target div
		// relative to the cursor position when dragged
		({
			x: absolute.x - relative.x,
			y: absolute.y - relative.y,
		})
	);

// Application state stream
// When we merge the constant INITIAL_STATE with other streams,
// it will be received by the first listener.
// Subsequent listeners will only get values as they are
// received from `droppedPosition`. 
export const appState = merge([INITIAL_STATE, droppedPosition]);
