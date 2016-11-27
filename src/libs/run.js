import React from 'react';
import ReactDOM from 'react-dom';

function render(DOMNode, View, state) {
	ReactDOM.render(<View {...state} />, DOMNode);
}

export function run([View, Model], DOMNode) {
	Model.onValue((state) => render(DOMNode, View, state));
}
