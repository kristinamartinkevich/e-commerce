import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ShoppingCart, Store } from 'lucide-react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import { useStore } from './lib/store';

function App() {
  const cart = useStore((state) => state.cart);

  return (
    <Auth0Provider
      clientId="mlZKxzDPOkwkYn6ckfKLBsMAWhc6YfV3"
      domain="sharps.eu.auth0.com"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <NextUIProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
          </div>
        </Router>
      </NextUIProvider>
    </Auth0Provider>
  );
}

export default App;