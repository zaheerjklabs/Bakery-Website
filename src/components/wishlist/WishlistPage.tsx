import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductCard } from '../product/ProductCard';
import { Heart, Sparkles, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, setCurrentView } = useBakery();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-2">
          <Heart className="w-3.5 h-3.5 fill-[#E85D7D]" />
          <span>YOUR SAVED CREATIONS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#242124]">
          My Celebration Wishlist
        </h1>
        <p className="text-xs sm:text-sm text-[#777078] mt-1">
          Save your favorite layer cakes and bento boxes for upcoming birthdays, anniversaries, and parties.
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#FEE2E8] shadow-xs max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#242124] mb-2">
            No cakes saved yet
          </h3>
          <p className="text-xs text-[#777078] mb-6">
            Click the heart icon on any cake in our catalog to save it to your personal celebration wishlist.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-2.5 bg-[#F27691] hover:bg-[#E85D7D] text-white rounded-full text-xs font-semibold shadow-xs"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
