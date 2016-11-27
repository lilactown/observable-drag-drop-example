// Define the state that will be emitted on first listen.
const INITIAL_STATE = [{ left: 0, top: 0 }, { left: 100, top: 0 }];

// Application state stream
export function model(dragDrop) {
	const newPositions =
		dragDrop
		.scan((prevState, newState) => {
			const {top, left} = newState;
			return prevState.map((position, id) => {
				if (newState.id === id) {
					return {top, left};
				}
				return position;
			});
		}, INITIAL_STATE)
		.map((positionArray) => ({
			position1: positionArray[0],
			position2: positionArray[1],
		}));

	return newPositions;

}
