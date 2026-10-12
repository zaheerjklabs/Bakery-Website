import React, { useState, useMemo } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCard } from '../product/ProductCard';
import { CakeCategory, OccasionType } from '../../types/bakery';
import { Search, SlidersHorizontal, X, Cake, Sparkles, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    activeCategory,
    setActiveCategory,
    activeOccasion,
    setActiveOccasion,
    searchQuery,
    setSearchQuery,
  } = useBakery();

  const [egglessOnly, setEgglessOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: { id: CakeCategory; label: string }[] = [
    { id: 'all', label: 'All Delights' },
    { id: 'cakes', label: 'Celebration Cakes' },
    { id: 'bento', label: 'Bento Lunchbox' },
    { id: 'cupcakes', label: 'Gourmet Cupcakes' },
    { id: 'brownies', label: 'Fudge Brownies' },
  ];

  const occasions: { id: OccasionType; label: string }[] = [
    { id: 'all', label: 'All Occasions' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'kids', label: 'Kids & Play' },
    { id: 'corporate', label: 'Corporate' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        // Occasion
        if (activeOccasion !== 'all' && !p.occasions.includes(activeOccasion) && !p.occasions.includes('all')) return false;
        // Eggless
        if (egglessOnly && !p.isEggless && !p.canBeEggless) return false;
        // Price
        if (p.basePrice > maxPrice) return false;
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTag = p.tagline.toLowerCase().includes(q);
          const matchFlavors = p.availableFlavors.some((f) => f.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchTag && !matchFlavors) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default: popular
        return b.reviewCount - a.reviewCount;
      });
  }, [products, activeCategory, activeOccasion, egglessOnly, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveOccasion('all');
    setEgglessOnly(false);
    setMaxPrice(2500);
    setSearchQuery('');
    setSortBy('popular');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E9B65D]" />
          <span>CURATED COLLECTION</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#242124] tracking-tight">
          Artisanal Bakery Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[#777078] mt-2 max-w-2xl">
          Browse our hand-piped signature layer cakes, Korean bento boxes, and delicate pastries. Every order is baked fresh to order.
        </p>
      </div>

      {/* Control Bar: Search & Quick Filters */}
      <div className="bg-white rounded-2xl p-4 border border-[#FEE2E8] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777078]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chocolate, bento, mango..."
            className="w-full pl-10 pr-4 py-2 bg-[#FFF9F5] border border-[#FCD4DE] rounded-full text-xs text-[#242124] focus:outline-none focus:ring-2 focus:ring-[#F27691]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777078] hover:text-[#242124]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs font-medium text-[#242124]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E85D7D]" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#777078] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl px-3 py-2 text-xs font-medium text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6`}>
          <div className="bg-white p-5 rounded-3xl border border-[#FEE2E8] shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#FFF0F2]">
              <span className="font-serif text-sm font-bold text-[#242124]">Filter Delights</span>
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-[#E85D7D] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#777078] mb-3">
                Category
              </h4>
              <div className="space-y-1.5">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      activeCategory === c.id
                        ? 'bg-[#FFF0F2] text-[#E85D7D] font-bold'
                        : 'text-[#242124] hover:bg-[#FFF9F5]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasions Filter */}
            <div className="pt-4 border-t border-[#FFF0F2]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#777078] mb-3">
                Occasion
              </h4>
              <div className="space-y-1.5">
                {occasions.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setActiveOccasion(o.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      activeOccasion === o.id
                        ? 'bg-[#FFF0F2] text-[#E85D7D] font-bold'
                        : 'text-[#242124] hover:bg-[#FFF9F5]'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference */}
            <div className="pt-4 border-t border-[#FFF0F2]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#777078] mb-3">
                Dietary Preference
              </h4>
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={egglessOnly}
                  onChange={(e) => setEgglessOnly(e.target.checked)}
                  className="rounded border-[#FCD4DE] text-[#F27691] focus:ring-[#F27691] w-4 h-4"
                />
                <span className="text-xs text-[#242124]">Eggless Only (Vegetarian)</span>
              </label>
            </div>

            {/* Price Slider */}
            <div className="pt-4 border-t border-[#FFF0F2]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#777078] uppercase tracking-wider text-[11px]">
                  Max Price
                </span>
                <span className="font-bold text-[#E85D7D] tabular-nums">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="2500"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F27691]"
              />
              <div className="flex justify-between text-[10px] text-[#777078] mt-1">
                <span>₹500</span>
                <span>₹2,500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4 text-xs text-[#777078]">
            <span>
              Showing <strong className="text-[#242124]">{filteredProducts.length}</strong> creations
            </span>
            {(activeCategory !== 'all' || activeOccasion !== 'all' || egglessOnly || searchQuery) && (
              <span className="bg-[#FFF0F2] text-[#E85D7D] px-2.5 py-1 rounded-full text-[11px] font-semibold">
                Filters Active
              </span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#FEE2E8] shadow-xs">
              <div className="w-14 h-14 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center mx-auto mb-4">
                <Cake className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#242124] mb-1">
                No cakes found matching your selection
              </h3>
              <p className="text-xs text-[#777078] max-w-sm mx-auto mb-6">
                Try widening your price filter, resetting dietary tags, or searching for another flavor.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#F27691] hover:bg-[#E85D7D] text-white rounded-full text-xs font-semibold shadow-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
