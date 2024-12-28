import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchCart, removeFromCart } from '@/store/cartActions'; // Import 
import { Button } from '@/components/ui/button';


const CartSidebar = () => {
    const dispatch = useDispatch();
    const { products, totalPrice, error } = useSelector((state: RootState) => state.cart);
    const { products: allProducts } = useSelector((state: RootState) => state.products);


    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    const handleRemoveFromCart = (productId: string, quantity: number) => {
        dispatch(removeFromCart(productId, quantity));
    };

    const handleClearCart = () => {
        // Dispatch clear cart action if available
    };

    return (
        <div className="p-4 bg-white shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Cart Details</h2>

            {/* List of products */}
            <div>
                {products.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    products.map((product) => (
                        <div key={product.productId._id} className="py-2 border-b">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-medium">{product.productId.name}</span> {/* Accessing product name */}
                                    <span className="text-sm text-gray-500">{product.productId.description}</span> {/* Accessing product description */}
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-semibold">${product.productId.price}</span>
                                    <span className="text-sm text-gray-400">Qty: {product.quantity}</span>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleRemoveFromCart(product.productId._id, product.quantity)}
                                        className="mt-2"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Total Price */}
            <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total Price:</span>
                <span className="font-bold">${totalPrice}</span>
            </div>

            {/* Cart Actions */}
            <div>
                <Button variant="secondary" onClick={handleClearCart} className="w-full mb-2" disabled>
                    Clear Cart
                </Button>
                <Button className="w-full" >
                    Checkout
                </Button>
            </div>
        </div >
    );
};

export default CartSidebar;