import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer"; // Import the productReducer
import cartReducer from "./cartReducer"; // Import the cartReducer

const rootReducer = combineReducers({
	auth: authReducer,
	products: productReducer, // Add the productReducer
	cart: cartReducer, // Add the cartReducer
});

export default rootReducer;
