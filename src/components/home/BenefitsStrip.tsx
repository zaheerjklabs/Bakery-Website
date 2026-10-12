import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Clock, Leaf, ShieldCheck, Gift } from 'lucide-react';

export const BenefitsStrip: React.FC = () => {
  const { setIsDeliveryModalOpen } = useBakery();

  const benefits = [
    {
      title: 'Same-Day Delivery',
      subtitle: 'Order before 2 PM',
      icon: Clock,
      onClick: () => setIsDeliveryModalOpen(true),
    },
    {
      title: 'Fresh Ingredients',
      subtitle: 'Premium & natural',
      icon: Leaf,
    },
    {
      title: 'Secure Payment',
      subtitle: 'Safe checkout',
      icon: ShieldCheck,
    },
    {
      title: 'Beautiful Packaging',
      subtitle: 'Made with care',
      icon: Gift,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-pink-900/5 border border-[#FEE2E8] p-5 sm:p-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#FFF0F2]">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                onClick={benefit.onClick}
                className={`flex items-center gap-3.5 sm:gap-4 px-2 sm:px-4 ${
                  idx > 0 ? 'pt-4 md:pt-0' : ''
                } ${benefit.onClick ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''}`}
              >
                <div className="w-11 h-11 rounded-2xl bg-[#FFF0F2] border border-[#FCD4DE] flex items-center justify-center text-[#E85D7D] shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#242124] leading-tight">
                    {benefit.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#777078] mt-0.5 font-normal">
                    {benefit.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
