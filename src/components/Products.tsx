import React, { useEffect } from 'react';
import { Card, CardBody, CardFooter, Image, Button } from '@nextui-org/react';
import { useStore } from '../lib/store';
import { supabase } from '../lib/supabase';

export default function Products() {
  const addToCart = useStore((state) => state.addToCart);
  const { products, setProducts } = useStore();

  useEffect(() => {
    // Data fetching
    const fetchData = async () => {
      const { data } = await supabase
        .from('products')
        .select('*');
      setProducts(data);
    }
    fetchData();

  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="max-w-sm">
          <CardBody className="p-0">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </CardBody>
          <CardFooter className="flex flex-col items-start gap-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="flex justify-between items-center w-full">
              <span className="text-lg font-bold">${product.price}</span>
              <Button
                color="primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}