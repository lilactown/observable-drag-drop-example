import React from 'react';
import {DropZone} from './DropZone';
import {Draggable} from './Draggable';

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

export function View(props) {
	const position = {
		left: props.x,
		top: props.y,
	};
	return (
		<DropZone style={styles.droppable}>
			<Draggable
			draggable
			style={Object.assign({}, styles.draggable, position)}
			>
				Hello, world!
			</Draggable>
		</DropZone>
	);
}
