import React, { useEffect, useState } from 'react';
import { getCartItems } from '../API';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getCartItems();
        if (data && data.success) setCart(data.cartItems || []);
      } catch {
        // Checkout can render an empty cart when loading fails.
      }
    })();
  }, []);

  const total = cart.reduce((acc, i) => acc + (i.price || 0) * (i.quantity || 0), 0);

  const placeViaWhatsApp = () => {
    const itemsText = cart
      .map((i) => `• ${i.name} x ${i.quantity} = Rs. ${(i.price * i.quantity).toLocaleString()}`)
      .join('%0A');
    const msg = `New Order%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(
      phone
    )}%0AAddress: ${encodeURIComponent(address)}%0A%0AItems:%0A${itemsText}%0A%0ATotal: Rs. ${total.toLocaleString()}`;
    const url = `https://wa.me/94702370470?text=${msg}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item._id || item.giftId} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    {item.image && <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />}
                    <div className="text-gray-800">{item.name} x {item.quantity}</div>
                  </div>
                  <div className="text-gray-900 font-medium">Rs.</div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between mt-4 font-semibold text-lg">
            <span>Total:</span>
            <span>Rs.</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <div className="space-y-4">
            <input className="w-full border rounded px-3 py-2" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="w-full border rounded px-3 py-2" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button
              onClick={placeViaWhatsApp}
              disabled={!name || !phone || !address || cart.length === 0}
              className="w-full bg-[oklch(51.4%_0.222_16.935)] hover:opacity-95 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
