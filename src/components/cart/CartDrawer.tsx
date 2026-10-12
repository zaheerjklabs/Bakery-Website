import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    deliveryFee,
    grandTotal,
    setCurrentView,
    openProductDetail,
  } = useBakery();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const proceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F5] shadow-2xl flex flex-col justify-between border-l border-[#FEE2E8] animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#FEE2E8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#242124]">
                  Your Sweet Box
                </h3>
                <span className="text-xs text-[#777078]">
                  {cart.length} unique creation{cart.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-[#777078] hover:text-[#242124] rounded-full transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#242124] mb-1">
                  Your box is currently empty
                </h4>
                <p className="text-xs text-[#777078] max-w-xs mb-6">
                  Fill it with hand-piped celebration cakes, artisan bento boxes, or fudgy brownies!
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('shop');
                  }}
                  className="px-6 py-2.5 bg-[#F27691] hover:bg-[#E85D7D] text-white rounded-full text-xs font-semibold shadow-xs"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Bar */}
                <div className="p-3 bg-white rounded-2xl border border-[#FEE2E8] text-xs">
                  {cartSubtotal >= 999 ? (
                    <div className="flex items-center gap-2 text-emerald-700 font-medium">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Congratulations! You qualify for Free Express Delivery! 🎉</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[#777078]">
                        <span>Add ₹{(999 - cartSubtotal).toLocaleString('en-IN')} more for Free Delivery</span>
                        <span className="font-semibold">{Math.round((cartSubtotal / 999) * 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#FFF0F2] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#F27691] rounded-full"
                          style={{ width: `${Math.min(100, (cartSubtotal / 999) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Items */}
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-4 bg-white rounded-2xl border border-[#FEE2E8] shadow-xs flex gap-3.5"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsCartDrawerOpen(false);
                        openProductDetail(item.productId);
                      }}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#FFF5F7] shrink-0 cursor-pointer"
                    >
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            openProductDetail(item.productId);
                          }}
                          className="font-serif text-sm font-bold text-[#242124] hover:text-[#E85D7D] truncate cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="p-1 text-[#777078] hover:text-red-500 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#777078] space-y-0.5 mt-1">
                        <div>Size: {item.customization.selectedVariant.size.split('(')[0]}</div>
                        {item.customization.isEggless && (
                          <span className="inline-block text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[10px]">
                            Eggless
                          </span>
                        )}
                        {item.customization.cakeMessage && (
                          <div className="italic text-[#E85D7D] truncate">
                            Piping: &ldquo;{item.customization.cakeMessage}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#FFF0F2]">
                        <div className="flex items-center border border-[#FCD4DE] rounded-lg bg-[#FFF9F5] px-2 py-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                            className="text-[#777078] hover:text-[#242124] p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#242124] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                            className="text-[#777078] hover:text-[#242124] p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif font-bold text-xs sm:text-sm text-[#242124] tabular-nums">
                          ₹{item.totalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#FEE2E8] space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#FFF0F2] border border-[#FCD4DE] rounded-xl text-xs text-[#E85D7D]">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedCoupon}</strong> active</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-[#777078] hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (e.g. SWEET10)"
                      className="flex-1 px-3 py-2 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] uppercase focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#242124] hover:bg-[#3D373D] text-white rounded-xl text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Price Calculation Row */}
              <div className="space-y-1.5 text-xs text-[#777078]">
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
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#FFF0F2] flex justify-between items-baseline text-sm font-bold text-[#242124]">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg text-[#E85D7D] tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={proceedToCheckout}
                className="w-full py-3.5 bg-[#F27691] hover:bg-[#E85D7D] text-white font-semibold text-xs sm:text-sm rounded-full shadow-md shadow-[#F27691]/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#A29BA3]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Safe SSL Checkout · Freshness Guaranteed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
