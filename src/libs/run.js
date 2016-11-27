import React from 'react';
import ReactDOM from 'react-dom';

let _View;

function render(DOMNode, View, state) {
	ReactDOM.render(<View {...state} />, DOMNode);
}

export function run(viewSubscriber, DOMNode) {
	viewSubscriber((View, state) => render(DOMNode, View, state));
}
