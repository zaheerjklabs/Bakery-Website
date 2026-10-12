import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  Cake,
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ShieldCheck,
  Award,
  Headphones,
  Settings,
} from 'lucide-react';
import { CakeCategory } from '../../types/bakery';

export const Footer: React.FC = () => {
  const { setCurrentView, setActiveCategory, setIsDeliveryModalOpen } = useBakery();

  const handleNav = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCat = (cat: CakeCategory) => {
    setActiveCategory(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#FEE2E8] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Service-Quality Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-[#FFF0F2]">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FFF9F5] border border-[#FEE2E8]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#E85D7D] shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#242124]">Quality Ingredients</h4>
              <p className="text-[11px] text-[#777078] mt-0.5">100% Belgian chocolate & fresh local dairy</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FFF9F5] border border-[#FEE2E8]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#E85D7D] shadow-xs">
              <Heart className="w-5 h-5 fill-[#E85D7D]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#242124]">Made with Love</h4>
              <p className="text-[11px] text-[#777078] mt-0.5">Artisanal hand-piped cakes baked to order</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FFF9F5] border border-[#FEE2E8]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#E85D7D] shadow-xs">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#242124]">Celebration Support</h4>
              <p className="text-[11px] text-[#777078] mt-0.5">Live pastry team assistance 8 AM – 10 PM</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#FEE2E8]">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 mb-4 text-left"
            >
              <div className="w-9 h-9 rounded-full bg-[#FFF0F2] border border-[#FCD4DE] flex items-center justify-center text-[#E85D7D]">
                <Cake className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-[#242124]">
                Cake<span className="text-[#F27691]">Luv</span>
              </span>
            </button>
            <p className="text-xs text-[#777078] leading-relaxed max-w-sm mb-6">
              Crafting joy, one delicate layer at a time. We specialize in contemporary luxury cakes, viral Korean aesthetic bento boxes, and personalized celebration centerpieces made with pure honest ingredients.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-[#FFF9F5] border border-[#FEE2E8] flex items-center justify-center text-[#777078] hover:text-[#E85D7D] hover:border-[#F27691] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-[#FFF9F5] border border-[#FEE2E8] flex items-center justify-center text-[#777078] hover:text-[#E85D7D] hover:border-[#F27691] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Shop Delights */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#242124] mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#777078]">
              <li>
                <button
                  onClick={() => handleCat('cakes')}
                  className="hover:text-[#E85D7D] transition-colors"
                >
                  Celebration Cakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCat('bento')}
                  className="hover:text-[#E85D7D] transition-colors"
                >
                  Bento Lunchbox Cakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCat('cupcakes')}
                  className="hover:text-[#E85D7D] transition-colors"
                >
                  Gourmet Cupcakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCat('brownies')}
                  className="hover:text-[#E85D7D] transition-colors"
                >
                  Fudge Brownies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('custom-cake')}
                  className="hover:text-[#E85D7D] transition-colors font-medium text-[#E85D7D]"
                >
                  Bespoke Wedding Orders →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#242124] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#777078]">
              <li>
                <button
                  onClick={() => setIsDeliveryModalOpen(true)}
                  className="hover:text-[#E85D7D] transition-colors"
                >
                  Delivery & Shipping Slots
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#E85D7D] transition-colors"
                >
                  Cake Care & Storage Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#E85D7D] transition-colors"
                >
                  Dietary & Allergen Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#E85D7D] transition-colors"
                >
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-[#E85D7D] transition-colors flex items-center gap-1 text-[#242124]"
                >
                  <Settings className="w-3.5 h-3.5 text-[#E85D7D]" />
                  <span>Bakery Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier Storefront */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#242124] mb-4">
              Bakery Studio
            </h4>
            <div className="space-y-3 text-xs text-[#777078]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E85D7D] shrink-0 mt-0.5" />
                <span>124 Patisserie Promenade, Bandra West, Mumbai 400050</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E85D7D] shrink-0" />
                <span>Open Daily: 8:00 AM – 11:30 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E85D7D] shrink-0" />
                <span>+91 (022) 8492-3000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E85D7D] shrink-0" />
                <span>hello@cakeluv.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A29BA3]">
          <p>© {new Date().getFullYear()} CakeLuv Patisserie Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px]">Handcrafted with 100% natural butter & organic dairy</span>
            <span>·</span>
            <button onClick={() => handleNav('admin')} className="hover:text-[#E85D7D] text-[11px]">
              Staff Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
