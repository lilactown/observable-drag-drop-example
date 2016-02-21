import React from 'react';
import {DropZone} from './DropZone';
import {DraggableOne, DraggableTwo} from './Draggable';

const styles = {
	draggable: {
		width: "100px",
		height: "100px",
		background: "red",
		position: "absolute",
	},
	droppable: {
		width: "500px",
		height: "500px",
		background: "purple",
	}
};

export function View({positions}) {
	const [position1, position2] = positions
	return (
		<DropZone style={styles.droppable}>
			<DraggableOne
			style={Object.assign({}, styles.draggable, position1)}
			>
				Div #1
			</DraggableOne>
			<DraggableTwo
			style={Object.assign({}, styles.draggable, {background: "orange"}, position2)}
			>
				Div #2
			</DraggableTwo>
		</DropZone>
	);
}
