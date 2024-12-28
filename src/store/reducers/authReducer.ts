interface AuthState {
	isAuthenticated: boolean;
	user: null | { id: string; name: string };
	token: null | string;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
				token: action.payload.token,
			};
		case "LOGOUT":
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: null,
			};
		default:
			return state;
	}
};

export default authReducer;
