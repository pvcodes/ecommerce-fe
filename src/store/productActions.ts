import axios from "axios";
import { RootState } from "@/store"; // Import RootState to type the getState function

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const fetchProducts =
	() => async (dispatch: any, getState: () => RootState) => {
		try {
			const state = getState();
			const token = state.auth.token; // Access the token from the auth state
			console.log({ token });

			const response = await axios.get(
				"https://ecommerce-be-c02v.onrender.com/products",
				{
					headers: {
						"x-token": token, // Include the token in the headers
					},
				}
			);

			const products = response.data.data;

			dispatch({
				type: FETCH_PRODUCTS_SUCCESS,
				payload: products,
			});
		} catch (error) {
			console.error("Failed to fetch products", error);
			dispatch({
				type: FETCH_PRODUCTS_FAILURE,
				payload: error.message,
			});
		}
	};
