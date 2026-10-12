import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCard } from '../product/ProductCard';
import { Flame, ArrowRight } from 'lucide-react';

export const TrendingCakes: React.FC = () => {
  const { products, setCurrentView } = useBakery();

  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 5);

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#FFF9F5] to-white border-y border-[#FEE2E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#FEE2E8]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-2">
              <Flame className="w-4 h-4 text-[#F27691] fill-[#F27691]" />
              <span>INTERNET OBSESSIONS</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#242124] tracking-tight">
              TRENDING NOW
            </h2>
            <p className="text-xs sm:text-sm text-[#777078] mt-1">
              Viral styles, nostalgic Lambeth piping, and lunchbox sensations stealing the spotlight.
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

        {/* 5 Cards Row on Large Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
