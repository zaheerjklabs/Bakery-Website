import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Sparkles, Heart, Award, Check } from 'lucide-react';
import redVelvetImg from '../../assets/images/cake_red_velvet_1791806015666.jpg';

export const CraftsmanshipStory: React.FC = () => {
  const { setCurrentView } = useBakery();

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Visual */}
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <ImageWithFallback
              src={redVelvetImg}
              alt="Artisan cake slice showcasing decadent sponge texture and rich frosting"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -right-4 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#FEE2E8] shadow-xl max-w-xs hidden sm:block">
            <div className="flex items-center gap-2 text-[#E85D7D] mb-1">
              <Award className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Master Pâtisserie</span>
            </div>
            <p className="text-xs text-[#777078] leading-relaxed">
              Every sponge is baked fresh within 4 hours of delivery using cold-pressed vanilla and single-origin cocoa.
            </p>
          </div>
        </div>

        {/* Right Editorial Copy */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#E85D7D]" />
            <span>THE CAKELUV PHILOSOPHY</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#242124] tracking-tight leading-tight mb-6">
            Baking with uncompromising devotion to flavor and artistry.
          </h2>

          <p className="text-sm sm:text-base text-[#777078] leading-relaxed mb-6 font-normal">
            At CakeLuv, baking is an art form. Founded on the belief that life&apos;s most meaningful milestones deserve unforgettable taste, we reject shortcuts, commercial stabilizers, and artificial coloring. Instead, we slow-churn fresh cream, source farm-picked berries, and calibrate every recipe to achieve cloud-like fluffiness.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#FEE2E8]">
              <div className="w-6 h-6 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#242124]">Pure Dairy & Natural Butter</h4>
                <p className="text-[11px] text-[#777078] mt-0.5">No hydrogenated fats or imitation oils.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#FEE2E8]">
              <div className="w-6 h-6 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#242124]">Belgian Callebaut Cocoa</h4>
                <p className="text-[11px] text-[#777078] mt-0.5">Single-origin 70% dark couverture beans.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#FEE2E8]">
              <div className="w-6 h-6 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#242124]">100% Eggless Certified Options</h4>
                <p className="text-[11px] text-[#777078] mt-0.5">Prepared in a dedicated sanitized bakery line.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#FEE2E8]">
              <div className="w-6 h-6 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#242124]">Temperature-Controlled Van Delivery</h4>
                <p className="text-[11px] text-[#777078] mt-0.5">Specialized refrigerated cake carriers.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setCurrentView('custom-cake');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#242124] hover:bg-[#3D373D] text-white font-semibold text-xs rounded-full transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#E9B65D]" />
              <span>Design a Bespoke Cake</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white hover:bg-[#FFF0F2] text-[#242124] font-semibold text-xs rounded-full border border-[#FCD4DE] transition-colors"
            >
              Read Our Full Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
