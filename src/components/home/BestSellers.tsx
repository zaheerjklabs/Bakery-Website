import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { products, setCurrentView } = useBakery();

  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#FEE2E8]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E9B65D]" />
            <span>PATISSERIE FAVORITES</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#242124] tracking-tight">
            BEST SELLERS
          </h2>
          <p className="text-xs sm:text-sm text-[#777078] mt-1">
            Our most adored celebration cakes, baked fresh to perfection each morning.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#E85D7D] hover:text-[#F27691] transition-colors group self-start sm:self-end"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
