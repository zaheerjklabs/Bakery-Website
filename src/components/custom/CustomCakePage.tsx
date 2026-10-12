import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Sparkles, Upload, CheckCircle2, Calendar, Phone, Mail, Award, Clock } from 'lucide-react';
import { HERO_IMAGE } from '../../data/bakeryData';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const CustomCakePage: React.FC = () => {
  const { submitCustomCakeRequest, setCurrentView } = useBakery();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Wedding & Reception');
  const [guestCount, setGuestCount] = useState<number>(30);
  const [tiers, setTiers] = useState('2 Tiers (Serves 25–40)');
  const [flavorProfile, setFlavorProfile] = useState('Belgian Chocolate & Raspberry Truffle');
  const [themeDescription, setThemeDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹4,000 – ₹8,000');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 3);
    return nextWeek.toISOString().split('T')[0];
  });
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const ticketId = submitCustomCakeRequest({
      fullName,
      email,
      phone,
      occasion,
      guestCount,
      tiers,
      flavorProfile,
      themeDescription,
      budgetRange,
      deliveryDate,
      deliveryType,
    });

    setSubmittedTicket(ticketId);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#E9B65D]" />
          <span>BESPOKE SUGARCRAFT ATELIER</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#242124] tracking-tight">
          Commission a Custom Masterpiece
        </h1>
        <p className="text-xs sm:text-sm text-[#777078] mt-3 leading-relaxed">
          From multi-tiered botanical wedding cakes to whimsical themed sculptures, our master cake artists bring your sweetest vision to life with precision hand-piping.
        </p>
      </div>

      {submittedTicket ? (
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-[#FCD4DE] shadow-xl text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#242124] mb-2">
            Request Received!
          </h2>
          <p className="text-xs sm:text-sm text-[#777078] leading-relaxed mb-6">
            Thank you, <strong>{fullName}</strong>. Your custom cake brief has been assigned to our Head Decorator. We will review your theme and contact you via WhatsApp / Phone within 2 business hours.
          </p>

          <div className="p-4 bg-[#FFF9F5] border border-[#FEE2E8] rounded-2xl mb-8">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#777078] block">
              Reference Consultation ID
            </span>
            <span className="font-mono text-lg font-bold text-[#E85D7D]">
              {submittedTicket}
            </span>
          </div>

          <button
            onClick={() => {
              setSubmittedTicket(null);
              setCurrentView('shop');
            }}
            className="w-full py-3 bg-[#F27691] hover:bg-[#E85D7D] text-white font-semibold text-xs rounded-full shadow-md transition-colors"
          >
            Continue Browsing Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Preview & Inspiration */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#FEE2E8] shadow-xs">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 border border-[#FCD4DE]">
                <ImageWithFallback
                  src={HERO_IMAGE}
                  alt="Custom Tiered Celebration Cake"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-serif text-lg font-bold text-[#242124] mb-1">
                How Bespoke Orders Work
              </h3>
              <p className="text-xs text-[#777078] leading-relaxed mb-4">
                We take orders 48 hours to 3 months in advance for weddings, anniversaries, and grand celebrations.
              </p>

              <div className="space-y-3 text-xs text-[#777078]">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#FFF0F2] text-[#E85D7D] font-bold flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>Submit your design ideas and guest count</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#FFF0F2] text-[#E85D7D] font-bold flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>Receive customized 3D design sketch & tasting box</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#FFF0F2] text-[#E85D7D] font-bold flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>Handcrafted fresh & delivered in refrigerated transit</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-[#FFF0F2] border border-[#FCD4DE] text-xs text-[#242124] flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#E85D7D] shrink-0" />
              <div>
                <strong>Need an urgent custom cake?</strong>
                <p className="text-[11px] text-[#777078] mt-0.5">Call our express atelier hotline at +91 8492-3000</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#FEE2E8] shadow-xl shadow-pink-900/5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Zaheer Ahmad"
                    className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="zaheer@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Occasion / Event
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  >
                    <option>Wedding & Reception</option>
                    <option>Milestone Birthday</option>
                    <option>Romantic Anniversary</option>
                    <option>Baby Shower & Gender Reveal</option>
                    <option>Corporate Gala / Product Launch</option>
                    <option>Graduation Celebration</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Expected Guest Count
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Tier Preference
                  </label>
                  <select
                    value={tiers}
                    onChange={(e) => setTiers(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  >
                    <option>1 Large Single Tier (Serves 15–20)</option>
                    <option>2 Tiers (Serves 25–40)</option>
                    <option>3 Tiers (Serves 50–80)</option>
                    <option>4+ Tiers Grand Centerpiece (100+ guests)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Target Budget Range
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  >
                    <option>₹2,500 – ₹4,000</option>
                    <option>₹4,000 – ₹8,000</option>
                    <option>₹8,000 – ₹15,000</option>
                    <option>₹15,000 – ₹30,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                  Design Vision & Theme Notes
                </label>
                <textarea
                  rows={3}
                  value={themeDescription}
                  onChange={(e) => setThemeDescription(e.target.value)}
                  placeholder="Describe your desired color palette, sugar flowers, figurines, or message theme..."
                  className="w-full px-3.5 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FFF9F5] border border-[#FEE2E8] rounded-xl text-xs text-[#242124] focus:outline-none focus:ring-1 focus:ring-[#F27691]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#242124] block mb-1">
                    Fulfillment
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border ${
                        deliveryType === 'delivery'
                          ? 'bg-[#FFF0F2] border-[#F27691] text-[#E85D7D]'
                          : 'bg-[#FFF9F5] border-[#FEE2E8] text-[#777078]'
                      }`}
                    >
                      Venue Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border ${
                        deliveryType === 'pickup'
                          ? 'bg-[#FFF0F2] border-[#F27691] text-[#E85D7D]'
                          : 'bg-[#FFF9F5] border-[#FEE2E8] text-[#777078]'
                      }`}
                    >
                      Studio Pickup
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#F27691] hover:bg-[#E85D7D] text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg shadow-[#F27691]/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 mt-2"
              >
                <Sparkles className="w-4 h-4 text-[#E9B65D]" />
                <span>Submit Bespoke Cake Request</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
