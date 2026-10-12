import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import strawberryShortcakeImg from '../../assets/images/cake_strawberry_shortcake_1791806004419.jpg';
import { Mail, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useBakery();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      showToast({
        type: 'success',
        title: 'Welcome to the CakeLuv Family! 🍰',
        description: 'Your 10% off coupon SWEET10 is activated.',
      });
      try {
        const existing = JSON.parse(localStorage.getItem('cakeluv_subscribers') || '[]');
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem('cakeluv_subscribers', JSON.stringify(existing));
        }
      } catch (e) {
        console.error(e);
      }
    }, 600);
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('SWEET10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#FFF0F2] border-t border-[#FEE2E8] py-14 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#FCD4DE] shadow-xl shadow-pink-900/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Cupcake / Cake Visual */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-48 sm:w-60 aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <ImageWithFallback
                src={strawberryShortcakeImg}
                alt="Artisanal fresh strawberry whipped cream dessert"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[#E85D7D] p-1.5 rounded-full shadow-xs">
                <Sparkles className="w-4 h-4 text-[#E9B65D]" />
              </div>
            </div>
          </div>

          {/* Center & Right: Copy & Form */}
          <div className="lg:col-span-8 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold tracking-widest uppercase text-[#E85D7D] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STAY SWEET</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#242124] tracking-tight mb-3">
              Subscribe & Get 10% Off
            </h2>

            <p className="text-xs sm:text-sm text-[#777078] max-w-xl mx-auto lg:mx-0 mb-6 font-normal">
              Get exclusive secret recipes, seasonal product alerts, early festival reservation windows, and sweet surprises straight to your inbox.
            </p>

            {status === 'success' ? (
              <div className="p-4 bg-[#FFF9F5] border border-[#FCD4DE] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#242124]">You are subscribed!</p>
                    <p className="text-xs text-[#777078]">Use coupon at checkout for 10% off:</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#FEE2E8]">
                  <span className="font-mono font-bold text-sm text-[#E85D7D] tracking-wider">SWEET10</span>
                  <button
                    onClick={copyCoupon}
                    className="p-1 hover:text-[#E85D7D] text-[#777078] transition-colors"
                    title="Copy promo code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0 w-full">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777078]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 bg-[#FFF9F5] border border-[#FCD4DE] rounded-full text-xs sm:text-sm text-[#242124] placeholder:text-[#A29BA3] focus:outline-none focus:ring-2 focus:ring-[#F27691] transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-[#F27691] hover:bg-[#E85D7D] text-white font-semibold text-xs sm:text-sm rounded-full shadow-md shadow-[#F27691]/20 transition-all duration-200 active:scale-95 disabled:opacity-50 shrink-0"
                >
                  {status === 'loading' ? 'Joining...' : 'Subscribe'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
            )}

            <p className="text-[11px] text-[#A29BA3] mt-3">
              We respect your privacy. No spam ever, unsubscribe in 1-click anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
