export function connectedView(View) {
	return function connectView(Model) {
		return [View, Model];
	}
}
