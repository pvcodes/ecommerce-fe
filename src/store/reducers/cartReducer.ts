interface CartProduct {
	productId: string;
	quantity: number;
	_id: string;
}

interface CartState {
	_id: string;
	userId: string;
	products: CartProduct[];
	totalPrice: number;
	error: string | null;
}

const initialState: CartState = {
	_id: "",
	userId: "",
	products: [],
	totalPrice: 0,
	error: null,
};

const cartReducer = (state = initialState, action: any): CartState => {
	switch (action.type) {
		case "FETCH_CART_SUCCESS":
		case "ADD_TO_CART_SUCCESS":
		case "REMOVE_FROM_CART_SUCCESS":
			return {
				...state,
				...action.payload,
				error: null,
			};
		case "FETCH_CART_FAILURE":
		case "ADD_TO_CART_FAILURE":
		case "REMOVE_FROM_CART_FAILURE":
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default cartReducer;
