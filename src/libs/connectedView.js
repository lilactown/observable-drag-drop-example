export function connectedView(View) {
	return function connectViewTo(Model) {
		return Model.map((state) => [View, state]);
	}
}
