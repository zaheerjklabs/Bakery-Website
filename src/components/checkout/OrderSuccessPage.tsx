import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Sparkles,
  ShoppingBag,
  Printer,
  ChevronRight,
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { currentOrder, setCurrentView } = useBakery();

  if (!currentOrder) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-[#242124] mb-4">
          No Recent Order Found
        </h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-2.5 bg-[#F27691] text-white rounded-full text-xs font-semibold"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  const steps = [
    { label: 'Order Received', done: true, time: 'Just now' },
    { label: 'Baking in Oven', done: true, time: 'In progress' },
    { label: 'Artisan Decorating', done: false, time: 'Next step' },
    { label: 'Refrigerated Transit', done: false, time: 'Scheduled' },
    { label: 'Delivered Fresh', done: false, time: 'Today' },
  ];

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Celebration Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#FCD4DE] shadow-xl text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E9B65D]" />
          <span>ORDER CONFIRMED & SCHEDULED</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#242124] mb-2">
          Sweet Celebrations are on the Way!
        </h1>

        <p className="text-xs sm:text-sm text-[#777078] max-w-lg mx-auto mb-6">
          Thank you for choosing CakeLuv. Your order <strong>#{currentOrder.id}</strong> has entered our artisan bake queue.
        </p>

        {/* Live Timeline */}
        <div className="py-6 border-y border-[#FFF0F2] mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {steps.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 text-xs font-bold ${
                    s.done
                      ? 'bg-[#E85D7D] text-white shadow-xs'
                      : 'bg-[#FFF0F2] text-[#A29BA3] border border-[#FEE2E8]'
                  }`}
                >
                  {s.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className="font-serif font-bold text-xs text-[#242124] leading-tight">
                  {s.label}
                </span>
                <span className="text-[10px] text-[#777078] mt-0.5">{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs mb-8">
          <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#FEE2E8]">
            <span className="text-[10px] uppercase font-bold text-[#777078] block mb-1">
              Delivery Address & Recipient
            </span>
            <p className="font-bold text-[#242124]">{currentOrder.customer.fullName}</p>
            <p className="text-[#777078]">{currentOrder.customer.phone}</p>
            {currentOrder.customer.addressLine1 && (
              <p className="text-[#777078] mt-1">
                {currentOrder.customer.addressLine1}, {currentOrder.customer.city} - {currentOrder.customer.pincode}
              </p>
            )}
          </div>

          <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#FEE2E8]">
            <span className="text-[10px] uppercase font-bold text-[#777078] block mb-1">
              Payment & Timing
            </span>
            <p className="font-bold text-[#242124] uppercase">
              Method: {currentOrder.paymentMethod} · {currentOrder.paymentStatus.toUpperCase()}
            </p>
            <p className="text-[#777078] mt-1">
              Estimated Delivery: {currentOrder.estimatedDelivery}
            </p>
          </div>
        </div>

        {/* Itemized Receipt */}
        <div className="bg-[#FFF9F5] rounded-2xl p-5 border border-[#FEE2E8] text-left text-xs space-y-3 mb-8">
          <h4 className="font-serif font-bold text-sm text-[#242124]">
            Itemized Bakery Summary
          </h4>
          <div className="divide-y divide-[#FEE2E8]">
            {currentOrder.items.map((item) => (
              <div key={item.cartItemId} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#242124]">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="text-[11px] text-[#777078] block">
                    {item.customization.selectedVariant.size.split('(')[0]} · {item.customization.selectedFlavor}
                  </span>
                  {item.customization.cakeMessage && (
                    <span className="text-[10px] text-[#E85D7D] italic block">
                      Message: &ldquo;{item.customization.cakeMessage}&rdquo;
                    </span>
                  )}
                </div>
                <span className="font-serif font-bold text-[#242124] tabular-nums">
                  ₹{item.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#FEE2E8] space-y-1 text-[#777078]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums">₹{currentOrder.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {currentOrder.discount > 0 && (
              <div className="flex justify-between text-[#E85D7D]">
                <span>Discount</span>
                <span className="tabular-nums">-₹{currentOrder.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Refrigerated Delivery</span>
              <span>{currentOrder.deliveryFee === 0 ? 'FREE' : `₹${currentOrder.deliveryFee}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{currentOrder.tax}</span>
            </div>
            <div className="pt-2 flex justify-between font-bold text-sm text-[#242124]">
              <span>Final Total Paid</span>
              <span className="font-serif text-[#E85D7D] tabular-nums">
                ₹{currentOrder.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-2.5 bg-white border border-[#FEE2E8] hover:bg-[#FFF9F5] rounded-full text-xs font-semibold text-[#242124] flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4 text-[#777078]" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3 bg-[#F27691] hover:bg-[#E85D7D] text-white rounded-full text-xs font-semibold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};
