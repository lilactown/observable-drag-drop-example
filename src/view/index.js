import React from 'react';
import {DropZone} from './DropZone';
import {DraggableOne, DraggableTwo} from './Draggable';
import {connectedView} from '../libs/connectedView';

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

function ViewComponent({position1, position2}) {
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

export const view = connectedView(ViewComponent);
