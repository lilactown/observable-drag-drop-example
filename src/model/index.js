import {flatMap, zip, merge} from 'kefir';

// Define the state that will be emitted on first listen.
const INITIAL_STATE = [{ left: 0, top: 0 }, { left: 100, top: 0 }];

// Application state stream
export function model(componentsPickedUp, componentDropped) {
	const elementsPositions =
		merge(
			componentsPickedUp
			.map((pickedUp, id) =>
				zip([pickedUp, pickedUp.flatMap(() =>
					componentDropped.take(1)
				)])
				.map(([offset, position]) => ({
					id,
					left: position.x - offset.x,
					top: position.y - offset.y,
				}))
			)
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
