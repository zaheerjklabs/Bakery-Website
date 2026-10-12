import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { ProductVariant } from '../../types/bakery';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    openProductDetail,
  } = useBakery();

  if (!quickViewProduct) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    quickViewProduct.variants[0]
  );
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    quickViewProduct.availableFlavors[0] || 'Standard Baker Recipe'
  );
  const [isEggless, setIsEggless] = useState<boolean>(quickViewProduct.isEggless);
  const [cakeMessage, setCakeMessage] = useState<string>('');

  const currentPrice = quickViewProduct.basePrice + selectedVariant.priceModifier;

  const handleAdd = () => {
    addToCart(
      quickViewProduct,
      {
        selectedVariant,
        selectedFlavor,
        isEggless,
        cakeMessage: cakeMessage.trim(),
      },
      1
    );
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#FEE2E8] animate-in zoom-in-95 duration-150">
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 text-[#777078] hover:text-[#242124] rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Image */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#FFF5F7] border border-[#FEE2E8]">
              <ImageWithFallback
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#E9B65D] mb-1">
                  <Star className="w-3.5 h-3.5 fill-[#E9B65D]" />
                  <span className="font-bold text-[#242124] tabular-nums">
                    {quickViewProduct.rating}
                  </span>
                  <span className="text-[#A29BA3]">({quickViewProduct.reviewCount})</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#242124]">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-[#777078] line-clamp-2 mt-1">
                  {quickViewProduct.tagline}
                </p>
                <div className="font-serif text-xl font-bold text-[#E85D7D] mt-2 tabular-nums">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Variant */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#777078] block mb-1">
                  Size:
                </label>
                <select
                  value={selectedVariant.id}
                  onChange={(e) => {
                    const v = quickViewProduct.variants.find((v) => v.id === e.target.value);
                    if (v) setSelectedVariant(v);
                  }}
                  className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none"
                >
                  {quickViewProduct.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.size} {v.priceModifier > 0 ? `(+₹${v.priceModifier})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#777078] block mb-1">
                  Message on cake (Optional):
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  placeholder="e.g. Happy Birthday!"
                  className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-2.5 px-4 bg-[#F27691] hover:bg-[#E85D7D] text-white rounded-full text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    openProductDetail(quickViewProduct.id);
                  }}
                  className="py-2.5 px-3 bg-white border border-[#FEE2E8] hover:bg-[#FFF9F5] rounded-full text-xs font-semibold text-[#242124] transition-colors"
                  title="Full details"
                >
                  Full Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
