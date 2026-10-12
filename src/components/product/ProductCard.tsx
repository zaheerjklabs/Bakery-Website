import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { BakeryProduct } from '../../types/bakery';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Heart, Star, Plus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: BakeryProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    toggleWishlist,
    isInWishlist,
    addToCart,
    setQuickViewProduct,
  } = useBakery();

  const isFavorite = isInWishlist(product.id);
  const defaultVariant = product.variants.find((v) => v.id === product.defaultVariantId) || product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(
      product,
      {
        selectedVariant: defaultVariant,
        selectedFlavor: product.availableFlavors[0] || 'Original Patisserie Flavor',
        isEggless: product.isEggless,
        cakeMessage: '',
      },
      1
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openProductDetail(product.id)}
      className="group bg-white rounded-3xl p-3 sm:p-4 border border-[#FDE6EB] shadow-xs hover:shadow-xl hover:shadow-pink-900/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Image Container with 4:3 Aspect Ratio */}
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#FFF5F7] mb-3.5">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {product.isBestSeller && (
              <span className="bg-white/95 backdrop-blur-xs text-[#E85D7D] font-bold text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full shadow-xs border border-[#FEE2E8]">
                Best Seller
              </span>
            )}
            {product.isTrending && (
              <span className="bg-[#FFF0F2]/95 backdrop-blur-xs text-[#E85D7D] font-bold text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full shadow-xs border border-[#FCD4DE]">
                Trending Now
              </span>
            )}
          </div>

          {/* Quick Actions (Wishlist & Quick View) */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
            <button
              onClick={handleWishlistClick}
              className={`p-2 rounded-full backdrop-blur-xs transition-all duration-200 ${
                isFavorite
                  ? 'bg-[#FFF0F2] text-[#E85D7D] shadow-xs'
                  : 'bg-white/90 text-[#777078] hover:text-[#E85D7D] shadow-xs'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? 'fill-[#E85D7D]' : ''}`}
              />
            </button>

            <button
              onClick={handleQuickView}
              className="p-2 rounded-full bg-white/90 text-[#777078] hover:text-[#E85D7D] backdrop-blur-xs shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex"
              aria-label="Quick preview"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Dietary Indicator */}
          {product.isEggless && (
            <div className="absolute bottom-2 left-2.5 bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-emerald-200/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>100% Eggless</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="px-1">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-[#777078] mb-1.5">
            <div className="flex items-center text-[#E9B65D]">
              <Star className="w-3.5 h-3.5 fill-[#E9B65D]" />
            </div>
            <span className="font-bold text-[#242124] tabular-nums">{product.rating}</span>
            <span className="text-[#A29BA3]">({product.reviewCount})</span>
          </div>

          {/* Name */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#242124] group-hover:text-[#E85D7D] transition-colors leading-snug line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-[#777078] line-clamp-1 mb-3 leading-relaxed">
            {product.tagline}
          </p>
        </div>
      </div>

      {/* Footer / Price & Add to Cart */}
      <div className="px-1 pt-2 border-t border-[#FFF0F2] flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg font-bold text-[#242124] tabular-nums">
              ₹{product.basePrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#A29BA3] line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#777078]">
            {defaultVariant.size.split('(')[0].trim()}
          </span>
        </div>

        <button
          onClick={handleQuickAdd}
          className="p-2 sm:px-3 sm:py-2 bg-[#FFF0F2] hover:bg-[#F27691] text-[#E85D7D] hover:text-white rounded-full sm:rounded-xl font-semibold text-xs transition-colors duration-200 flex items-center gap-1 active:scale-95 shrink-0"
          aria-label={`Add ${product.name} to bag`}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  );
};
