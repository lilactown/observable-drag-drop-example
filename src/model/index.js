// Application state stream
export function model(dragDropActions) {
	return dragDropActions
		.map(([offset, position]) =>
			// calculate new position of the target div
			// relative to the cursor position inside of it
			// when dragged
			({
				x: position.x - offset.x,
				y: position.y - offset.y,
			})
		);
}
