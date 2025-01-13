import React from 'react';
import { Card, CardBody, Button } from '@nextui-org/react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../lib/store';
import getStripe from './getStripe';
import { useAuth0 } from '@auth0/auth0-react';

export default function Cart() {
  const { user } = useAuth0();
  const { cart, removeFromCart, updateQuantity } = useStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart to see them here.</p>
      </div>
    );
  }

  async function handleCheckout() {
    const stripe = await getStripe();
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({
        lineItems: cart.map((item) => ({
          price: item.price_id, // replace with your Stripe price ID
          quantity: item.quantity,
        })),
        mode: "payment", // here you can specify the mode as either `payment` or `subscription` for one time payments or recurring payments respectively
        successUrl: `http://localhost:5173/pricing`,
        cancelUrl: `http://localhost:5173/pricing`,
        customerEmail: user.email || "example@mail.com",
      });
      console.warn(error.message);
    }
  }


  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <Card key={item.id}>
            <CardBody className="flex flex-row items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border rounded p-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <Button
                  isIconOnly
                  color="danger"
                  variant="light"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold">${total.toFixed(2)}</span>
        </div>
        <Button color="primary" className="w-full" onPress={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}