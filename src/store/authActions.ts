import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const login =
	(credentials: { email: string; password: string }) =>
	async (dispatch: any) => {
		try {
			const response = await axios.post(
				"https://ecommerce-be-c02v.onrender.com/user/login",
				credentials
			);
			console.log(response.data, 12313);
			const { token, user } = response.data.data;

			// Store the token in local storage or cookies if needed
			localStorage.setItem("token", token);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: { token, user },
			});
		} catch (error) {
			console.error("Login failed", error);
			// Handle login error (e.g., dispatch an error action)
		}
	};

export const logout = () => (dispatch: any) => {
	localStorage.clear();
	dispatch({
		type: LOGOUT,
	});
};
