import React from 'react';
import ReactDOM from 'react-dom';

function render(DOMNode, View, state) {
	ReactDOM.render(<View {...state} />, DOMNode);
}

export function run(viewStream, DOMNode) {
	viewStream.onValue(([View, state]) => render(DOMNode, View, state));
}
