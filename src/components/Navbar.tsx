import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import { useAuth0 } from '@auth0/auth0-react';
import { ShoppingCart, Store } from 'lucide-react';
import { useStore } from '../lib/store';

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <NextUINavbar>
      <NavbarBrand>
        <Link to="/" className="flex items-center gap-2">
          <Store className="w-6 h-6" />
          <span className="font-bold text-inherit">Modern Shop</span>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated ? (
            <Button color="danger" variant="flat" onClick={() => logout()}>
              Logout
            </Button>
          ) : (
            <Button color="primary" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}