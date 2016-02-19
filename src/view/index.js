import React from 'react';
import {DropZone} from './DropZone';

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
			<div
			draggable
			style={Object.assign({}, styles.draggable, position)}
			>
				Hello, world!
			</div>
		</DropZone>
	);
}
