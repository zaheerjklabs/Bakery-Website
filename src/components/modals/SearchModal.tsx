import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Search, X, Cake, ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    products,
    openProductDetail,
    setCurrentView,
    setActiveCategory,
  } = useBakery();

  const [query, setQuery] = useState('');

  if (!isSearchModalOpen) return null;

  const popularSearches = [
    'Chocolate Bliss',
    'Strawberry Shortcake',
    'Vintage Heart',
    'Bento Cake',
    'Eggless',
    'Red Velvet',
  ];

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.availableFlavors.some((f) => f.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSelectProduct = (id: string) => {
    setIsSearchModalOpen(false);
    openProductDetail(id);
  };

  const handleSearchTag = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchModalOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center pt-20 p-4">
        <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#FEE2E8] animate-in zoom-in-95 duration-150">
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 pb-4 border-b border-[#FFF0F2]">
            <Search className="w-5 h-5 text-[#E85D7D]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cakes, flavors, occasions, eggless..."
              className="flex-1 text-sm sm:text-base text-[#242124] placeholder:text-[#A29BA3] focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-[#777078] hover:text-[#242124]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="text-xs font-semibold text-[#777078] hover:text-[#242124] px-2 py-1 rounded-lg"
            >
              Esc
            </button>
          </div>

          {/* Quick Suggestions */}
          {!query && (
            <div className="py-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#777078] block mb-3">
                Trending Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSearchTag(tag)}
                    className="px-3.5 py-1.5 bg-[#FFF9F5] hover:bg-[#FFF0F2] text-[#242124] hover:text-[#E85D7D] rounded-full text-xs font-medium border border-[#FEE2E8] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="py-4 max-h-96 overflow-y-auto space-y-2">
              <div className="text-[11px] font-bold text-[#777078] uppercase mb-2">
                Found {results.length} delicious results:
              </div>

              {results.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#777078]">
                  No matching cakes or pastries found for &ldquo;{query}&rdquo;.
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#FFF9F5] cursor-pointer transition-colors border border-transparent hover:border-[#FEE2E8]"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FFF5F7] shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-[#242124] truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#777078] truncate">
                        {product.tagline}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif font-bold text-xs text-[#E85D7D] tabular-nums">
                        ₹{product.basePrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
