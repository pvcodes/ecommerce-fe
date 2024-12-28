interface Product {
	_id: string;
	name: string;
	description: string;
	price: number;
	inStock: boolean;
}

interface ProductState {
	products: Product[];
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	error: null,
};

const productReducer = (state = initialState, action: any): ProductState => {
	switch (action.type) {
		case "FETCH_PRODUCTS_SUCCESS":
			return {
				...state,
				products: action.payload,
				error: null,
			};
		case "FETCH_PRODUCTS_FAILURE":
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default productReducer;
