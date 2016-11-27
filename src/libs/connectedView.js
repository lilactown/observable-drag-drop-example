export function connectedView(View) {
	return function connectViewTo(Model) {
		return function subscribeWith(subscriber) {
			Model.onValue((state) => subscriber(View, state));
		};
	}
}
