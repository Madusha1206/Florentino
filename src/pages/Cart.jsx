import React, { useEffect, useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { getCartItems, updateCartItemQty, deleteCartItem } from '../API';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; // show empty state if not logged in
    (async () => {
      try {
        const data = await getCartItems();
        if (data && data.success) {
          setCart(data.cartItems);
          const count = (data.cartItems || []).reduce((acc, i) => acc + (i.quantity || 0), 0);
          try { window.dispatchEvent(new CustomEvent('cart:update', { detail: { count } })); } catch {}
        }
      } catch (err) {
        console.error('Failed to load cart', err);
      }
    })();
  }, []);

  const updateQuantity = async (item, nextQty) => {
    try {
      if (!item._id) return;
      if (nextQty <= 0) {
        const res = await deleteCartItem(item._id);
        if (res && res.success) setCart((prev) => prev.filter((i) => i._id !== item._id));
        return;
      }
      const res = await updateCartItemQty(item._id, { quantity: nextQty });
      if (res && res.success) {
        setCart((prev) => {
          const next = prev.map((i) => (i._id === item._id ? res.cartItem : i));
          const count = next.reduce((acc, it) => acc + (it.quantity || 0), 0);
          try { window.dispatchEvent(new CustomEvent('cart:update', { detail: { count } })); } catch {}
          return next;
        });
      }
    } catch (err) {
      console.error('Update quantity error', err);
      alert('Could not update quantity. Please try again.');
    }
  };

  const handleIncrement = (item) => updateQuantity(item, (item.quantity || 1) + 1);
  const handleDecrement = (item) => updateQuantity(item, (item.quantity || 1) - 1);
  const handleRemove = (item) => updateQuantity(item, 0);

  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          <Link to="/gift-items" className="text-rose-600 hover:text-rose-500 font-medium">Continue shopping</Link>
        </div>

        {!isLoggedIn && (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700">Please log in to view your cart.</p>
            <button onClick={() => navigate('/login')} className="mt-3 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg">Go to Login</button>
          </div>
        )}

        {isLoggedIn && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
                <ul>
              {cart.map((item) => (
                <li key={item._id || item.giftId} className="border-b py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-gray-800">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-md object-cover border border-gray-200"
                        />
                      )}
                      <span>{item.name} x {item.quantity}</span>
                    </div>
                    <div className="text-gray-900 font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                        <div className="inline-flex items-center gap-2">
                          <button onClick={() => handleDecrement(item)} className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200" aria-label="Decrease quantity">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button onClick={() => handleIncrement(item)} className="p-1.5 rounded-md bg-gray-100 hover:bg-gray-200" aria-label="Increase quantity">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button onClick={() => handleRemove(item)} className="inline-flex items-center gap-1 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between mt-4 font-semibold text-lg">
                  <span>Total:</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <div className="mt-6 flex justify-end">
                  <a
                    href="/checkout"
                    className="inline-flex items-center justify-center bg-[oklch(51.4%_0.222_16.935)] hover:opacity-95 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Place Order
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
