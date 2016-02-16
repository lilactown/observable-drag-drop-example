import {stream as droppableStream} from '../components/DroppableDiv';
import {zip} from 'kefir';

// Allow the droppable component to be a droppable zone
droppableStream
	.filter(({event}) => event === 'onDragOver')
	.onValue(({e}) => e.preventDefault());

// Map to the relative position of the mouse inside of
// the target when the user begins to drag so we can 
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

// Map to the absolute position of the mouse inside of
// the (non-scrolled) page
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

// Application state stream
export const appState =
	// zip the two streams so we emit only once both
	// `dragStart` and `drop` have new values
	zip([dragStart, drop])
	// we use scan to emit a dummy value when listened
	// to render the initial view
	.scan((_, [relative, absolute]) => ({
		// calculate new position of the target div
		// relative to the cursor position when dragged
		x: absolute.x - relative.x,
		y: absolute.y - relative.y,
	}), null);
