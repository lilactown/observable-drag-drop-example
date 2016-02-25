import {flatMap, zip, merge} from 'kefir';

// Define the state that will be emitted on first listen.
const INITIAL_STATE = [{ left: 0, top: 0 }, { left: 100, top: 0 }];

// reducers
function dragDropAction(dropzone, element, id) {
	// get the dropped action IMMEDIATELY after dragged
	const droppedAction =
		element
		.flatMap(() => dropzone.take(1));

	return zip([element, droppedAction]);
}

function newElementPosition(id, [offset, position]) {
	return {
		id,
		left: position.x - offset.x,
		top: position.y - offset.y,
	};
}

// Application state stream
export function model(componentsPickedUp, componentDropped) {
	const elementsPositions =
		merge(
			componentsPickedUp
			.map(dragDropAction.bind(null, componentDropped))
			.map((action, id) => action.map(newElementPosition.bind(null, id)))
		).scan((prevState, newState) => {
			const {top, left} = newState;
			return prevState.map((position, id) => {
				if (newState.id === id) {
					return {top, left};
				}
				return position;
			});
		}, INITIAL_STATE);

	return elementsPositions;

}
