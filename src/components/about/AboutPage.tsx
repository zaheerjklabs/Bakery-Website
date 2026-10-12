import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { HERO_IMAGE } from '../../data/bakeryData';
import { Heart, Award, Sparkles, MapPin, Clock, Phone, Mail, Check } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useBakery();

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-3">
          <Heart className="w-3.5 h-3.5 fill-[#E85D7D]" />
          <span>OUR ARTISANAL HERITAGE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#242124] tracking-tight">
          Crafting sweetness, memory, and celebration.
        </h1>
        <p className="text-xs sm:text-base text-[#777078] mt-4 leading-relaxed">
          Founded with a simple mission: to create cakes that look like museum works of art and taste like homemade warmth.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 relative">
          <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <ImageWithFallback
              src={HERO_IMAGE}
              alt="CakeLuv Signature Celebration Masterpiece"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#242124]">
            From a Passion Kitchen to an Acclaimed Patisserie
          </h2>

          <p className="text-xs sm:text-sm text-[#777078] leading-relaxed">
            CakeLuv began in 2021 as a boutique micro-bakery baking intimate celebration cakes for friends and family. Disenchanted by commercial bakeries relying on artificial cake mixes, hydrogenated shortening, and overly sweet fondant pastes, our founding pastry chefs set out to resurrect authentic European and Japanese baking traditions.
          </p>

          <p className="text-xs sm:text-sm text-[#777078] leading-relaxed">
            Today, our Bandra atelier is renowned for cloud-like chiffon layers, single-origin Belgian truffle fillings, delicate Lambeth-piped vintage heart creations, and viral Korean lunchbox bento cakes.
          </p>

          <div className="pt-2 flex items-center gap-6">
            <div>
              <div className="font-serif text-3xl font-bold text-[#E85D7D] tabular-nums">10,000+</div>
              <div className="text-xs text-[#777078] mt-0.5">Celebrations Sweetened</div>
            </div>
            <div className="w-px h-10 bg-[#FEE2E8]" />
            <div>
              <div className="font-serif text-3xl font-bold text-[#E85D7D] tabular-nums">4.9 / 5</div>
              <div className="text-xs text-[#777078] mt-0.5">Average Customer Rating</div>
            </div>
            <div className="w-px h-10 bg-[#FEE2E8]" />
            <div>
              <div className="font-serif text-3xl font-bold text-[#E85D7D] tabular-nums">100%</div>
              <div className="text-xs text-[#777078] mt-0.5">Pure Natural Butter</div>
            </div>
          </div>
        </div>
      </div>

      {/* Atelier Location & Contact Info */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#FEE2E8] shadow-xl shadow-pink-900/5 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#242124]">Visit Our Studio</h3>
            <p className="text-xs text-[#777078] leading-relaxed">
              124 Patisserie Promenade, Off Hill Road, Bandra West, Mumbai 400050.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#242124]">Opening Hours</h3>
            <p className="text-xs text-[#777078] leading-relaxed">
              Monday – Sunday: 8:00 AM – 11:30 PM <br />
              Kitchen dispatch begins daily at 9:00 AM.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#242124]">Celebration Concierge</h3>
            <p className="text-xs text-[#777078] leading-relaxed">
              Phone: +91 (022) 8492-3000 <br />
              Email: hello@cakeluv.com
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <h3 className="font-serif text-2xl font-bold text-[#242124] text-center mb-8">
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#FEE2E8]">
            <h4 className="text-sm font-bold text-[#242124] mb-1">
              Do you offer 100% eggless cakes?
            </h4>
            <p className="text-xs text-[#777078] leading-relaxed">
              Yes! Almost all of our cakes can be prepared completely eggless without sacrificing any fluffiness, moisture, or richness. We use proprietary cultured yogurt and flaxseed milk emulsion techniques.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#FEE2E8]">
            <h4 className="text-sm font-bold text-[#242124] mb-1">
              How far in advance should I order?
            </h4>
            <p className="text-xs text-[#777078] leading-relaxed">
              Standard catalog cakes can be ordered same-day before 2:00 PM. For multi-tier custom bespoke wedding cakes, we recommend booking at least 3 to 7 days in advance.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#FEE2E8]">
            <h4 className="text-sm font-bold text-[#242124] mb-1">
              How are the cakes transported safely?
            </h4>
            <p className="text-xs text-[#777078] leading-relaxed">
              We never use two-wheelers for layered cakes. All orders are transported inside customized climate-controlled refrigerated vans with anti-shock stabilizing bases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
