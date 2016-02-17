import {zip, constant, merge} from 'kefir';
import {dragStart, drop} from '../intents';

// Define the state that will be emitted on first listen.
const INITIAL_STATE = constant({ x: 0, y: 0 });

// Application state stream
export function model(dragStart, drop) {
	const droppedPosition =
		// zip the action streams so we emit only once both
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

	// When we merge the constant INITIAL_STATE with other streams,
	// it will be received by the first listener.
	// Subsequent listeners will only get values as they are
	// received from `droppedPosition`. 
	return merge([INITIAL_STATE, droppedPosition]);
}
