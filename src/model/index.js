import {zip, constant, merge} from 'kefir';

// Define the state that will be emitted on first listen.
const INITIAL_STATE = constant({ x: 0, y: 0 });

// Application state stream
export function model(mouseOffset, droppedPosition) {
	const divPosition =
		// zip the action streams so we emit only once both
		// `mouseOffset` and `droppedPosition` have new values
		zip([mouseOffset, droppedPosition])
		// we use scan to emit a dummy value when listened
		// to render the initial view
		.map(([offset, position]) =>
			// calculate new position of the target div
			// relative to the cursor position inside of it
			// when dragged
			({
				x: position.x - offset.x,
				y: position.y - offset.y,
			})
		);

	// When we merge the constant INITIAL_STATE with other streams,
	// it will be received by the first listener.
	// Subsequent listeners will only get values as they are
	// received from `divPosition`. 
	return merge([INITIAL_STATE, divPosition]);
}
