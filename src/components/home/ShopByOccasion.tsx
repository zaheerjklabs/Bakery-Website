import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { OCCASIONS_DATA } from '../../data/bakeryData';
import { Cake, Heart, Sparkles, Smile, Briefcase, PartyPopper } from 'lucide-react';
import { OccasionType } from '../../types/bakery';

const iconMap = {
  Cake: Cake,
  Heart: Heart,
  Sparkles: Sparkles,
  Smile: Smile,
  Briefcase: Briefcase,
  PartyPopper: PartyPopper,
};

export const ShopByOccasion: React.FC = () => {
  const { setActiveOccasion, setCurrentView } = useBakery();

  const handleOccasionSelect = (id: string) => {
    setActiveOccasion(id as OccasionType);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FFF0F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-2 block">
            CELEBRATE EVERY MOMENT
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#242124] tracking-tight">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-sm text-[#777078] mt-2">
            Find the perfect centerpiece tailored for life&apos;s most cherished milestones.
          </p>
        </div>

        {/* 6 Circular Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {OCCASIONS_DATA.map((item) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Cake;
            return (
              <button
                key={item.id}
                onClick={() => handleOccasionSelect(item.id)}
                className="group flex flex-col items-center p-5 bg-white rounded-3xl border border-[#FEE2E8] shadow-xs hover:shadow-xl hover:shadow-pink-900/5 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                {/* Circular white container with delicate pink line icon */}
                <div className="w-16 h-16 rounded-full bg-[#FFF9F5] border border-[#FCD4DE] flex items-center justify-center text-[#E85D7D] group-hover:bg-[#E85D7D] group-hover:text-white transition-all duration-300 mb-3 shadow-inner">
                  <IconComponent className="w-7 h-7" strokeWidth={1.6} />
                </div>

                <span className="font-serif text-sm font-bold text-[#242124] group-hover:text-[#E85D7D] transition-colors mb-0.5">
                  {item.label}
                </span>

                <span className="text-[11px] text-[#777078] leading-tight hidden sm:block">
                  {item.desc.split('&')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
