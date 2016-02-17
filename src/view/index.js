import React from 'react';
import {DroppableDiv} from './DroppableDiv';

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
		<DroppableDiv style={styles.droppable}>
			<div
			draggable
			style={Object.assign({}, styles.draggable, position)}
			>
				Hello, world!
			</div>
		</DroppableDiv>
	);
}
