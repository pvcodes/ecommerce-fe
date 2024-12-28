import axios from "axios";
import { RootState } from "@/store";

export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAILURE = "FETCH_CART_FAILURE";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAILURE = "ADD_TO_CART_FAILURE";
export const REMOVE_FROM_CART_SUCCESS = "REMOVE_FROM_CART_SUCCESS";
export const REMOVE_FROM_CART_FAILURE = "REMOVE_FROM_CART_FAILURE";

export const fetchCart =
	() => async (dispatch: any, getState: () => RootState) => {
		try {
			const state = getState();
			const token = state.auth.token;

			const response = await axios.get(
				"https://ecommerce-be-c02v.onrender.com/cart",
				{
					headers: {
						"x-token": token,
					},
				}
			);

			dispatch({
				type: FETCH_CART_SUCCESS,
				payload: response.data.data,
			});
		} catch (error) {
			dispatch({
				type: FETCH_CART_FAILURE,
				payload: error.message,
			});
		}
	};

export const addToCart =
	(productId: string, quantity: number) =>
	async (dispatch: any, getState: () => RootState) => {
		try {
			const state = getState();
			const token = state.auth.token;

			const response = await axios.post(
				"https://ecommerce-be-c02v.onrender.com/cart",
				{ productId, quantity },
				{
					headers: {
						"x-token": token,
					},
				}
			);

			dispatch({
				type: ADD_TO_CART_SUCCESS,
				payload: response.data.data,
			});
		} catch (error) {
			dispatch({
				type: ADD_TO_CART_FAILURE,
				payload: error.message,
			});
		}
	};

export const removeFromCart =
	(productId: string, quantity: number) =>
	async (dispatch: any, getState: () => RootState) => {
		try {
			const state = getState();
			const token = state.auth.token;

			const response = await axios.delete(
				`https://ecommerce-be-c02v.onrender.com/cart/${productId}`,
				{
					headers: {
						"x-token": token,
					},
					params: { quantity },
				}
			);

			dispatch({
				type: REMOVE_FROM_CART_SUCCESS,
				payload: response.data.data,
			});
		} catch (error) {
			dispatch({
				type: REMOVE_FROM_CART_FAILURE,
				payload: error.message,
			});
		}
	};
