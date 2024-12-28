import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchCart, removeFromCart } from '@/store/cartActions'; // Import cart actions
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupAction,
    SidebarTrigger,
    SidebarMenu,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar'; // ShadCN UI components
import { Button } from '@/components/ui/button';

const CartSidebar = () => {
    const dispatch = useDispatch();
    const { products, totalPrice, error } = useSelector((state: RootState) => state.cart);

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
        <Sidebar>
            <SidebarTrigger className="p-4 bg-blue-600 text-white rounded-full">Cart</SidebarTrigger>
            <SidebarContent className="p-4 bg-white shadow-lg max-w-md w-full">
                <SidebarHeader>
                    <h2 className="text-xl font-semibold mb-4">Cart Details</h2>
                </SidebarHeader>

                {/* Sidebar Group: List of products */}
                <SidebarGroup>
                    {products.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        products.map((product) => (
                            <SidebarMenu key={product._id} className="py-2">
                                <SidebarMenuItem className="flex justify-between items-center">
                                    <div>
                                        <span className="font-medium">{product.name}</span>
                                        <span className="text-sm text-gray-500">{product.description}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-semibold">${product.price}</span>
                                        <span className="text-sm text-gray-400">Qty: {product.quantity}</span>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => handleRemoveFromCart(product._id, product.quantity)}
                                            className="mt-2"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </SidebarMenuItem>
                                <SidebarSeparator />
                            </SidebarMenu>
                        ))
                    )}
                </SidebarGroup>

                <SidebarFooter>
                    {/* Total Price */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total Price:</span>
                        <span className="font-bold">${totalPrice}</span>
                    </div>

                    {/* Cart Actions */}
                    <SidebarGroupAction>
                        <Button variant="secondary" onClick={handleClearCart} className="w-full mb-2">
                            Clear Cart
                        </Button>
                        <Button variant="primary" className="w-full">
                            Checkout
                        </Button>
                    </SidebarGroupAction>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
};

export default CartSidebar;
