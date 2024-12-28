import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/store/productActions';
import { addToCart } from '@/store/cartActions';
import { RootState } from '@/store';
import { Card, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  const handleAddToCart = (productId: string) => {
    dispatch(addToCart(productId, 1));
    toast('Added to cart')
  };

  return (
    <TooltipProvider>
      <div className="w-full p-4 md:p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <Card
              key={product._id}
              className="border shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-200"
            >
              <CardContent className="p-4">
                <img
                  src="https://picsum.photos/300" // Replace with `product.image` if available
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-lg font-semibold truncate">{product.name}</CardTitle>
                <CardDescription className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </CardDescription>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${product.inStock
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                      }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product._id)}
                      className={`w-full ${product.inStock
                        ? 'hover:bg-gray-100'
                        : 'opacity-50 cursor-not-allowed'
                        }`}
                    >
                      Add to Cart
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{product.inStock ? 'Add this item to your cart' : 'Out of Stock'}</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ProductList;
