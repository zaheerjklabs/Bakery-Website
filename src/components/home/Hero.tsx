import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { HERO_IMAGE } from '../../data/bakeryData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Star, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentView, setIsDeliveryModalOpen } = useBakery();

  return (
    <section className="relative overflow-hidden pt-6 pb-14 md:pt-10 md:pb-20 bg-gradient-to-b from-[#FFF9F5] via-[#FFF3F5] to-[#FFF9F5]">
      {/* Subtle organic decorative background elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-radial from-[#FFE3E8]/40 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Hero Messaging */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-4">
              <span className="w-6 h-px bg-[#E85D7D]" />
              <span>FRESH & DELICIOUS CAKES</span>
              <span className="w-6 h-px bg-[#E85D7D]" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#242124] tracking-tight leading-[1.15] mb-6 text-balance">
              Made with love, <br className="hidden sm:inline" />
              just for <span className="text-[#F27691] italic font-normal">you.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#777078] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-normal">
              Beautifully crafted cakes for every celebration, made with the finest Belgian chocolate, fresh seasonal fruits, and pure organic cream.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
              <button
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F27691] hover:bg-[#E85D7D] text-white font-semibold text-sm rounded-full shadow-md shadow-[#F27691]/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentView('custom-cake');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#FFF0F2] text-[#242124] hover:text-[#E85D7D] font-semibold text-sm rounded-full border border-[#FCD4DE] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#E9B65D]" />
                <span>Custom Cakes</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-6 border-t border-[#FEE2E8] flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#FCE7EC] flex items-center justify-center text-xs font-bold text-[#E85D7D]">
                  AK
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F9D5DF] flex items-center justify-center text-xs font-bold text-[#E85D7D]">
                  MR
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F5BFCF] flex items-center justify-center text-xs font-bold text-[#E85D7D]">
                  SP
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F0A0B7] flex items-center justify-center text-xs font-bold text-white">
                  +10k
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1 justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E9B65D] text-[#E9B65D]" />
                  ))}
                  <span className="text-xs font-bold text-[#242124] ml-1.5 tabular-nums">4.9 / 5</span>
                </div>
                <p className="text-xs text-[#777078] tracking-tight mt-0.5">
                  LOVED BY 10,000+ CUSTOMERS · Sample client review statistics
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Interactive Delivery Badge */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Visual Frame */}
            <div className="relative w-full max-w-lg lg:max-w-none aspect-4/3 sm:aspect-1/1 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white">
              <ImageWithFallback
                src={HERO_IMAGE}
                alt="Artisanal white celebration cake adorned with strawberries, blueberries and floral accents"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
              />

              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Card Annotation */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-[#FEE2E8] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E85D7D]" />
                  <span className="font-medium text-[#242124]">Signature Summer Berry Chiffon</span>
                </div>
                <span className="font-serif font-bold text-[#E85D7D] text-sm tabular-nums">From ₹1,599</span>
              </div>
            </div>

            {/* Circular Same-Day Delivery Badge */}
            <button
              onClick={() => setIsDeliveryModalOpen(true)}
              className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:left-4 bg-white rounded-full p-2.5 sm:p-3 shadow-xl border-2 border-[#FCD4DE] flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all duration-200 group text-left z-20 cursor-pointer"
              aria-label="View same day delivery options"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFF0F2] flex items-center justify-center text-[#E85D7D] group-hover:bg-[#E85D7D] group-hover:text-white transition-colors duration-200">
                <Clock className="w-5 h-5" />
              </div>
              <div className="pr-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#E85D7D]">
                  Guaranteed
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#242124]">
                  Same-Day Delivery
                </div>
                <div className="text-[10px] text-[#777078]">
                  Order before 2:00 PM
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
