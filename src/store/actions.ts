// Define your action types
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Define your action creators
export const addToCart = (product) => ({
	type: ADD_TO_CART,
	payload: product,
});

export const removeFromCart = (productId) => ({
	type: REMOVE_FROM_CART,
	payload: productId,
});
