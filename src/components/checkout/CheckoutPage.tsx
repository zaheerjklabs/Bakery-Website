import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  Store,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { OrderCustomer } from '../../types/bakery';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    appliedCoupon,
    discountAmount,
    deliveryFee,
    grandTotal,
    currentUser,
    placeOrder,
    setCurrentView,
  } = useBakery();

  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400050');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-[#242124] mb-2">
          Your cart is currently empty
        </h2>
        <p className="text-xs text-[#777078] mb-6">
          Please add a fresh celebration cake or pastry before proceeding to checkout.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-2.5 bg-[#F27691] hover:bg-[#E85D7D] text-white rounded-full text-xs font-semibold shadow-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    if (deliveryMethod === 'delivery' && (!addressLine1 || !pincode)) return;

    setIsSubmitting(true);

    const customer: OrderCustomer = {
      fullName,
      email,
      phone,
      deliveryMethod,
      addressLine1,
      addressLine2,
      city,
      pincode,
      notes,
    };

    setTimeout(() => {
      placeOrder({
        customer,
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        deliveryFee: deliveryMethod === 'pickup' ? 0 : deliveryFee,
        tax: Math.round(cartSubtotal * 0.05), // 5% GST
        total: grandTotal,
        couponCode: appliedCoupon || undefined,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        estimatedDelivery: 'Today, 4:00 PM – 8:00 PM',
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => setCurrentView('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777078] hover:text-[#E85D7D] mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Return to Shop</span>
      </button>

      <div className="mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
          Checkout & Celebration Details
        </h1>
        <p className="text-xs text-[#777078] mt-1">
          Review your sweet selections and provide delivery coordinates.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Details, Fulfillment, Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Customer Contact */}
            <div className="bg-white p-6 rounded-3xl border border-[#FEE2E8] shadow-xs">
              <h3 className="font-serif text-base font-bold text-[#242124] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FFF0F2] text-[#E85D7D] text-xs flex items-center justify-center font-sans font-bold">
                  1
                </span>
                <span>Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Zaheer Ahmad"
                    className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Phone Number (for Delivery Driver) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Email Address (for Order Updates & Receipt) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="zaheer@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery vs Pickup */}
            <div className="bg-white p-6 rounded-3xl border border-[#FEE2E8] shadow-xs">
              <h3 className="font-serif text-base font-bold text-[#242124] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FFF0F2] text-[#E85D7D] text-xs flex items-center justify-center font-sans font-bold">
                  2
                </span>
                <span>Fulfillment Method</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    deliveryMethod === 'delivery'
                      ? 'border-[#F27691] bg-[#FFF0F2] text-[#242124]'
                      : 'border-[#FEE2E8] hover:bg-[#FFF9F5] text-[#777078]'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#E85D7D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#242124]">Van Delivery</h4>
                    <p className="text-[11px] text-[#777078]">Refrigerated vehicle</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#F27691] bg-[#FFF0F2] text-[#242124]'
                      : 'border-[#FEE2E8] hover:bg-[#FFF9F5] text-[#777078]'
                  }`}
                >
                  <Store className="w-5 h-5 text-[#E85D7D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#242124]">Bakery Studio Pickup</h4>
                    <p className="text-[11px] text-[#777078]">Bandra West, Mumbai</p>
                  </div>
                </button>
              </div>

              {deliveryMethod === 'delivery' && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                      Flat / House No. & Building Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="e.g. Flat 402, Rosewood Tower"
                      className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                      Street Address & Landmark
                    </label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="Near Hill Road Junction"
                      className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="400050"
                        className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                      Delivery Instructions / Gate Code
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Ring bell twice, deliver to party venue"
                      className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment Options */}
            <div className="bg-white p-6 rounded-3xl border border-[#FEE2E8] shadow-xs">
              <h3 className="font-serif text-base font-bold text-[#242124] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#FFF0F2] text-[#E85D7D] text-xs flex items-center justify-center font-sans font-bold">
                  3
                </span>
                <span>Payment Method</span>
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#FEE2E8] hover:bg-[#FFF9F5] cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-[#F27691] w-4 h-4"
                  />
                  <QrCode className="w-5 h-5 text-[#E85D7D]" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#242124] block">
                      Instant UPI / QR / Google Pay / PhonePe
                    </span>
                    <span className="text-[11px] text-[#777078]">
                      Fast, seamless payment with 0 transaction fees
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#FEE2E8] hover:bg-[#FFF9F5] cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#F27691] w-4 h-4"
                  />
                  <CreditCard className="w-5 h-5 text-[#E85D7D]" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#242124] block">
                      Credit / Debit Card (Visa, Mastercard, RuPay, Amex)
                    </span>
                    <span className="text-[11px] text-[#777078]">
                      Secured 256-bit encrypted gateway
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#FEE2E8] hover:bg-[#FFF9F5] cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#F27691] w-4 h-4"
                  />
                  <Truck className="w-5 h-5 text-[#E85D7D]" />
                  <div className="flex-1">
                    <span className="text-xs font-bold text-[#242124] block">
                      Pay on Delivery / Collection
                    </span>
                    <span className="text-[11px] text-[#777078]">
                      Cash or UPI scan at delivery handover
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#FEE2E8] shadow-xl shadow-pink-900/5 space-y-6 sticky top-28">
            <h3 className="font-serif text-base font-bold text-[#242124] pb-3 border-b border-[#FFF0F2]">
              Order Summary ({cart.length} item{cart.length === 1 ? '' : 's'})
            </h3>

            {/* Items */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-3 text-xs">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFF5F7] shrink-0">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-[#242124] truncate">{item.product.name}</h5>
                    <p className="text-[11px] text-[#777078]">
                      Qty: {item.quantity} · {item.customization.selectedVariant.size.split('(')[0]}
                    </p>
                  </div>
                  <span className="font-serif font-bold text-[#242124] tabular-nums">
                    ₹{item.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-4 border-t border-[#FFF0F2] text-xs text-[#777078]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#242124] font-medium tabular-nums">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#E85D7D]">
                  <span>Discount ({appliedCoupon})</span>
                  <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Refrigerated Delivery</span>
                <span className="tabular-nums">
                  {deliveryMethod === 'pickup' ? (
                    <span className="text-emerald-700 font-semibold">Store Pickup (₹0)</span>
                  ) : deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>GST / Taxes (5%)</span>
                <span className="tabular-nums">₹{Math.round(cartSubtotal * 0.05)}</span>
              </div>
              <div className="pt-3 border-t border-[#FFF0F2] flex justify-between items-baseline text-sm font-bold text-[#242124]">
                <span>Total Due</span>
                <span className="font-serif text-xl text-[#E85D7D] tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#F27691] hover:bg-[#E85D7D] text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg shadow-[#F27691]/25 transition-all duration-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Baking your order in queue...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#E9B65D]" />
                  <span>Confirm Order · ₹{grandTotal.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <div className="p-3 bg-[#FFF9F5] rounded-2xl border border-[#FEE2E8] text-[11px] text-[#777078] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Real-time SMS and email updates sent upon dispatch</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
