import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ProductCard } from './ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  ChevronLeft,
  Check,
  Info,
} from 'lucide-react';
import { ProductVariant } from '../../types/bakery';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    setCurrentView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useBakery();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    product.availableFlavors[0] || 'Standard Baker Recipe'
  );
  const [isEggless, setIsEggless] = useState<boolean>(product.isEggless);
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [deliverySlot, setDeliverySlot] = useState<string>('Afternoon (12:00 PM – 4:00 PM)');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'care'>('details');

  const isFavorite = isInWishlist(product.id);
  const currentPrice = product.basePrice + selectedVariant.priceModifier;
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(
      product,
      {
        selectedVariant,
        selectedFlavor,
        isEggless,
        cakeMessage: cakeMessage.trim(),
        deliveryDate,
        deliverySlot,
      },
      quantity
    );
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777078] hover:text-[#E85D7D] mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </button>

      {/* Main PDP Grid: Left Gallery + Right Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-[#FFF5F7] border border-[#FEE2E8] shadow-lg">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Favorite Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-all duration-200 ${
                isFavorite
                  ? 'bg-white text-[#E85D7D]'
                  : 'bg-white/90 text-[#777078] hover:text-[#E85D7D]'
              }`}
              aria-label="Save to favorites"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#E85D7D]' : ''}`} />
            </button>

            {/* Live Message Piping Preview */}
            {cakeMessage.trim() && (
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#FCD4DE] shadow-md animate-in fade-in">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E85D7D] block">
                  Piping Message on Cake Preview:
                </span>
                <span className="font-serif italic text-sm text-[#242124]">
                  &ldquo;{cakeMessage}&rdquo;
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-2xl border border-[#FEE2E8] flex-1 flex items-center gap-2 text-xs text-[#777078]">
              <Clock className="w-4 h-4 text-[#E85D7D] shrink-0" />
              <span>Freshly baked within 4 hrs of scheduled delivery</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-[#FEE2E8] flex-1 flex items-center gap-2 text-xs text-[#777078]">
              <ShieldCheck className="w-4 h-4 text-[#E85D7D] shrink-0" />
              <span>100% Food-grade safe packaging</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#FEE2E8] shadow-xl shadow-pink-900/5 space-y-6">
          {/* Header & Rating */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-[#E9B65D]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E9B65D]" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#242124] tabular-nums">
                {product.rating}
              </span>
              <span className="text-xs text-[#777078]">
                ({product.reviewCount} customer reviews)
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#777078] mt-2 leading-relaxed">
              {product.tagline}
            </p>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-[#E85D7D] tabular-nums">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#A29BA3] line-through tabular-nums">
                  ₹{(product.originalPrice + selectedVariant.priceModifier).toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
                Inclusive of all taxes
              </span>
            </div>
          </div>

          {/* Size Variant Selector */}
          <div className="pt-4 border-t border-[#FFF0F2]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242124]">
                1. Select Cake Size / Servings:
              </label>
              <span className="text-xs text-[#E85D7D] font-medium">
                {selectedVariant.servings}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedVariant.id === variant.id
                      ? 'border-[#F27691] bg-[#FFF0F2] text-[#242124] shadow-xs'
                      : 'border-[#FEE2E8] hover:bg-[#FFF9F5] text-[#777078]'
                  }`}
                >
                  <div className="font-serif font-bold text-xs text-[#242124]">
                    {variant.size}
                  </div>
                  <div className="text-[11px] text-[#777078] mt-0.5">
                    {variant.priceModifier > 0 ? `+₹${variant.priceModifier}` : 'Standard size'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Flavor Selection */}
          <div className="pt-4 border-t border-[#FFF0F2]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#242124] block mb-2">
              2. Flavor & Filling:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.availableFlavors.map((flavor) => (
                <button
                  key={flavor}
                  type="button"
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    selectedFlavor === flavor
                      ? 'bg-[#242124] text-white border-[#242124]'
                      : 'bg-white text-[#777078] border-[#FEE2E8] hover:bg-[#FFF9F5]'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Eggless Toggle */}
          {product.canBeEggless && (
            <div className="pt-4 border-t border-[#FFF0F2]">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF9F5] border border-[#FEE2E8]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-[#242124]">
                    100% Eggless Preparation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEggless(!isEggless)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isEggless ? 'bg-emerald-600 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>
            </div>
          )}

          {/* Personalized Message on Cake */}
          <div className="pt-4 border-t border-[#FFF0F2]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#242124] block mb-1">
              3. Message to Pipe on Cake (Free):
            </label>
            <input
              type="text"
              maxLength={40}
              value={cakeMessage}
              onChange={(e) => setCakeMessage(e.target.value)}
              placeholder="e.g. Happy 25th Birthday Rhea! ✨"
              className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FCD4DE] rounded-xl text-xs text-[#242124] placeholder:text-[#A29BA3] focus:outline-none focus:ring-2 focus:ring-[#F27691]"
            />
            <span className="text-[10px] text-[#777078] mt-1 block">
              Max 40 characters. Piped by hand in gourmet royal icing.
            </span>
          </div>

          {/* Delivery Date & Time Slot */}
          <div className="pt-4 border-t border-[#FFF0F2] grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                Delivery Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                Time Slot
              </label>
              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
              >
                <option>Morning (9:00 AM – 12:00 PM)</option>
                <option>Afternoon (12:00 PM – 4:00 PM)</option>
                <option>Evening (4:00 PM – 8:00 PM)</option>
                <option>Midnight Express (11:00 PM – 12:00 AM)</option>
              </select>
            </div>
          </div>

          {/* Quantity & Buy CTA */}
          <div className="pt-6 border-t border-[#FFF0F2] flex items-center gap-3">
            <div className="flex items-center border border-[#FCD4DE] rounded-full bg-[#FFF9F5] px-3 py-1.5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 text-[#777078] hover:text-[#242124] font-bold"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#242124] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 text-[#777078] hover:text-[#242124] font-bold"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 bg-[#F27691] hover:bg-[#E85D7D] text-white font-semibold text-xs sm:text-sm rounded-full shadow-md shadow-[#F27691]/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag · ₹{(currentPrice * quantity).toLocaleString('en-IN')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Details / Ingredients / Care */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#FEE2E8] shadow-xs mb-16">
        <div className="flex items-center gap-6 border-b border-[#FFF0F2] pb-4 mb-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`font-serif text-sm font-bold pb-2 relative transition-colors ${
              activeTab === 'details' ? 'text-[#E85D7D]' : 'text-[#777078] hover:text-[#242124]'
            }`}
          >
            Description & Notes
            {activeTab === 'details' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85D7D] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`font-serif text-sm font-bold pb-2 relative transition-colors ${
              activeTab === 'ingredients' ? 'text-[#E85D7D]' : 'text-[#777078] hover:text-[#242124]'
            }`}
          >
            Ingredients & Allergens
            {activeTab === 'ingredients' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85D7D] rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`font-serif text-sm font-bold pb-2 relative transition-colors ${
              activeTab === 'care' ? 'text-[#E85D7D]' : 'text-[#777078] hover:text-[#242124]'
            }`}
          >
            Storage & Serving
            {activeTab === 'care' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85D7D] rounded-full" />
            )}
          </button>
        </div>

        {activeTab === 'details' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#777078] leading-relaxed">
            <p>{product.description}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {product.dietaryBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="bg-[#FFF0F2] text-[#E85D7D] px-3 py-1 rounded-full text-xs font-semibold border border-[#FCD4DE]"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#777078]">
            <div>
              <h4 className="font-bold text-[#242124] mb-1">Key Ingredients:</h4>
              <p>{product.ingredients.join(', ')}.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#242124] mb-1">Allergen Information:</h4>
              <p className="text-red-700 bg-red-50 p-3 rounded-xl border border-red-200">
                Contains: {product.allergens.join(', ')}. Prepared in an artisanal kitchen where nuts and dairy are handled.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="space-y-3 text-xs sm:text-sm text-[#777078]">
            <p>{product.storageInstructions}</p>
            <p>
              Always store away from direct sunlight, air-conditioner blasts, and heating appliances. Carry the cake box strictly flat by the base, never tilted.
            </p>
          </div>
        )}
      </div>

      {/* Related Creations */}
      <div>
        <h3 className="font-serif text-2xl font-bold text-[#242124] mb-6">
          You May Also Adore
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
