import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { X, Clock, Truck, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export const DeliveryInfoModal: React.FC = () => {
  const { isDeliveryModalOpen, setIsDeliveryModalOpen } = useBakery();

  if (!isDeliveryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDeliveryModalOpen(false)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#FEE2E8] animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-4 border-b border-[#FFF0F2] mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FFF0F2] text-[#E85D7D] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#242124]">
                Same-Day Delivery & Shipping
              </h3>
            </div>
            <button
              onClick={() => setIsDeliveryModalOpen(false)}
              className="p-1.5 text-[#777078] hover:text-[#242124] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#777078] leading-relaxed">
            <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#FEE2E8]">
              <h4 className="font-bold text-[#242124] flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-[#E85D7D]" />
                <span>Same-Day Cutoff: 2:00 PM</span>
              </h4>
              <p className="text-xs text-[#777078]">
                Orders placed before 2:00 PM are baked fresh that afternoon and delivered between 4:00 PM and 8:00 PM the very same day.
              </p>
            </div>

            <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#FEE2E8]">
              <h4 className="font-bold text-[#242124] flex items-center gap-2 mb-1">
                <Truck className="w-4 h-4 text-[#E85D7D]" />
                <span>Refrigerated Van Transit</span>
              </h4>
              <p className="text-xs text-[#777078]">
                Never transported by motorcycle or courier pouch. Our custom refrigerated vans keep delicate whipped buttercream and tiered cakes at an optimal 6°C throughout transit.
              </p>
            </div>

            <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#FEE2E8]">
              <h4 className="font-bold text-[#242124] flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#E85D7D]" />
                <span>Midnight Surprise Slots</span>
              </h4>
              <p className="text-xs text-[#777078]">
                Select the 11:00 PM – 12:00 AM slot during checkout to surprise your loved ones right as the birthday or anniversary clock strikes midnight.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#FFF0F2]">
            <button
              onClick={() => setIsDeliveryModalOpen(false)}
              className="w-full py-3 bg-[#F27691] hover:bg-[#E85D7D] text-white font-semibold text-xs rounded-full shadow-md transition-colors"
            >
              Got It, Thank You
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
