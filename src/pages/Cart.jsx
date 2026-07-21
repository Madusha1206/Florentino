import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, MessageCircle, Plus, Trash2 } from 'lucide-react';
import { submitOrder } from '../API';
import { clearStoredCart, getStoredCart, updateCartQuantity } from '../utils/cart';

const whatsappNumber = '94702370470';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setCart(getStoredCart());
  }, []);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0),
    [cart]
  );

  const handleQuantityChange = (code, quantity) => {
    setCart(updateCartQuantity(code, quantity));
  };

  const handleClearCart = () => {
    const confirmed = window.confirm('Are you sure you want to clear your cart?');
    if (!confirmed) return;

    clearStoredCart();
    setCart([]);
  };

  const whatsappLink = useMemo(() => {
    const lines = cart.map((item) => {
      const priceText = item.price ? ` - Rs. ${((item.price || 0) * item.quantity).toLocaleString()}` : '';
      return `${item.code} x ${item.quantity}${priceText}`;
    });

    const message = [
      'Hi Florentino, I want to order these item codes:',
      '',
      ...lines,
      '',
      total ? `Total: Rs. ${total.toLocaleString()}` : '',
      customerName ? `Name: ${customerName}` : '',
      customerPhone ? `Phone: ${customerPhone}` : '',
      deliveryNote ? `Note: ${deliveryNote}` : '',
    ].filter(Boolean).join('\n');

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [cart, customerName, customerPhone, deliveryNote, total]);

  const handleSendCart = async () => {
    if (!customerName.trim() || !customerPhone.trim()) return;

    setSending(true);
    try {
      await submitOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryNote: deliveryNote.trim(),
        items: cart.map((item) => ({
          code: item.code,
          quantity: item.quantity,
          price: item.price || 0,
          category: item.category || '',
          image: item.image || '',
        })),
        total,
      });
    } catch {
      // Still open WhatsApp even if the save fails.
    }
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    setSending(false);
  };

  const canSend = customerName.trim() && customerPhone.trim() && cart.length > 0;

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
            
          </div>
          <Link to="/catalog" className="font-semibold text-rose-600 hover:text-rose-700">
            Continue shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-gray-600">Hurry Up.Your cart is empty.</p>
            <Link
              to="/catalog"
              className="mt-5 inline-flex rounded-lg bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700"
            >
              View Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                {cart.map((item) => (
                  <div key={item.code} className="flex flex-col gap-4 border-b border-gray-100 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={`Florentino item ${item.code}`} className="h-20 w-20 rounded-md object-cover" />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Item Code: {item.code}</h2>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="mt-1 font-semibold text-gray-900">Rs.</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="inline-flex items-center rounded-lg border border-gray-200">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.code, item.quantity - 1)}
                          className="p-2 text-gray-700 hover:bg-gray-50"
                          aria-label={`Decrease ${item.code}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-10 px-3 text-center font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.code, item.quantity + 1)}
                          className="p-2 text-gray-700 hover:bg-gray-50"
                          aria-label={`Increase ${item.code}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.code, 0)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        aria-label={`Remove ${item.code}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleClearCart}
                className="mt-4 text-sm font-semibold text-gray-500 hover:text-red-600"
              >
                Clear cart
              </button>
            </div>

            <aside className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-bold text-gray-900">Send to WhatsApp</h2>
              <div className="mt-5 space-y-4">
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                />
                <input
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                />
                <textarea
                  value={deliveryNote}
                  onChange={(event) => setDeliveryNote(event.target.value)}
                  placeholder="Delivery note or address"
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                />
              </div>

              <div className="mt-5 flex justify-between border-t border-gray-100 pt-5 text-lg font-bold">
                <span>Total</span>
                <span>Rs.</span>
              </div>

              <button
                type="button"
                onClick={handleSendCart}
                disabled={!canSend || sending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MessageCircle className="h-5 w-5" />
                {sending ? 'Saving...' : 'Send Cart'}
              </button>
              {!canSend && (
                <p className="mt-2 text-sm text-gray-500">Enter your name and phone to send the cart.</p>
              )}
            </aside>
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;
