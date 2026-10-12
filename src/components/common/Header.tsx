import React, { useState, useEffect } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  ShoppingBag,
  Search,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Cake,
} from 'lucide-react';
import { CakeCategory, OccasionType } from '../../types/bakery';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchModalOpen,
    setIsAccountModalOpen,
    setActiveCategory,
    setActiveOccasion,
    openProductDetail,
    currentUser,
  } = useBakery();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [occasionsDropdownOpen, setOccasionsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setOccasionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: CakeCategory) => {
    setActiveCategory(category);
    setCurrentView('shop');
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOccasionClick = (occasion: OccasionType) => {
    setActiveOccasion(occasion);
    setCurrentView('shop');
    setOccasionsDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#FFF0F2] text-[#E85D7D] text-xs font-medium py-1.5 px-4 text-center border-b border-[#FEE2E8] flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Freshly baked every morning · Free express delivery on orders over ₹999 · Use code <strong>SWEET10</strong> for 10% off</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FFF9F5]/95 backdrop-blur-md shadow-sm border-b border-[#FDE6EB]'
            : 'bg-[#FFF9F5] border-b border-[#F7E7E9]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#242124] hover:text-[#E85D7D] transition-colors rounded-lg"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group"
              aria-label="CakeLuv Home"
            >
              <div className="w-10 h-10 rounded-full bg-[#FFF0F2] border border-[#FCD4DE] flex items-center justify-center text-[#E85D7D] group-hover:scale-105 transition-transform duration-200">
                <Cake className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#242124] group-hover:text-[#E85D7D] transition-colors">
                  Cake<span className="text-[#F27691]">Luv</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#777078] -mt-1">
                  Artisanal Patisserie
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#242124]">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-[#E85D7D] transition-colors whitespace-nowrap py-2 relative ${
                currentView === 'home' ? 'text-[#E85D7D] font-semibold' : ''
              }`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E85D7D] rounded-full" />
              )}
            </button>

            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('shop')}
                className={`flex items-center gap-1 hover:text-[#E85D7D] transition-colors whitespace-nowrap py-2 ${
                  currentView === 'shop' ? 'text-[#E85D7D] font-semibold' : ''
                }`}
              >
                Shop Catalog
                <ChevronDown className="w-3.5 h-3.5 text-[#777078]" />
              </button>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-56 pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-[#FEE2E8] p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      onClick={() => handleCategoryClick('all')}
                      className="px-3 py-2 text-left text-xs font-semibold text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      All Delights
                    </button>
                    <button
                      onClick={() => handleCategoryClick('cakes')}
                      className="px-3 py-2 text-left text-xs text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      Celebration Layer Cakes
                    </button>
                    <button
                      onClick={() => handleCategoryClick('bento')}
                      className="px-3 py-2 text-left text-xs text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      Korean Bento Lunchbox Cakes
                    </button>
                    <button
                      onClick={() => handleCategoryClick('cupcakes')}
                      className="px-3 py-2 text-left text-xs text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      Gourmet Cupcake Gift Boxes
                    </button>
                    <button
                      onClick={() => handleCategoryClick('brownies')}
                      className="px-3 py-2 text-left text-xs text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      Salted Fudge Brownies
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Occasions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOccasionsDropdownOpen(true)}
              onMouseLeave={() => setOccasionsDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  setActiveOccasion('all');
                  navigateTo('shop');
                }}
                className="flex items-center gap-1 hover:text-[#E85D7D] transition-colors whitespace-nowrap py-2"
              >
                Occasions
                <ChevronDown className="w-3.5 h-3.5 text-[#777078]" />
              </button>

              {occasionsDropdownOpen && (
                <div className="absolute top-full left-0 w-52 pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-[#FEE2E8] p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      onClick={() => handleOccasionClick('birthday')}
                      className="px-3 py-2 text-left text-xs text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      Birthday Celebrations
                    </button>
                    <button
                      onClick={() => handleOccasionClick('anniversary')}
                      className="px-3 py-2 text-left text-xs text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      Romantic Anniversaries
                    </button>
                    <button
                      onClick={() => handleOccasionClick('wedding')}
                      className="px-3 py-2 text-left text-xs text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      Weddings & Receptions
                    </button>
                    <button
                      onClick={() => handleOccasionClick('kids')}
                      className="px-3 py-2 text-left text-xs text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      Kids & Fun Themes
                    </button>
                    <button
                      onClick={() => handleOccasionClick('corporate')}
                      className="px-3 py-2 text-left text-xs text-[#242124] hover:bg-[#FFF0F2] hover:text-[#E85D7D] rounded-xl transition-colors"
                    >
                      Corporate Gatherings
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('custom-cake')}
              className={`hover:text-[#E85D7D] transition-colors whitespace-nowrap py-2 flex items-center gap-1.5 ${
                currentView === 'custom-cake' ? 'text-[#E85D7D] font-semibold' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E9B65D]" />
              Bespoke Custom Orders
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-[#E85D7D] transition-colors whitespace-nowrap py-2 ${
                currentView === 'about' ? 'text-[#E85D7D] font-semibold' : ''
              }`}
            >
              Our Story
            </button>
          </nav>

          {/* Zone 3: Interactive Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-[#242124] hover:text-[#E85D7D] hover:bg-[#FFF0F2] transition-colors rounded-full"
              aria-label="Search baked goods"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-[#242124] hover:text-[#E85D7D] hover:bg-[#FFF0F2] transition-colors rounded-full relative"
              aria-label={`Wishlist with ${wishlist.length} saved cakes`}
            >
              <Heart
                className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#E85D7D] text-[#E85D7D]' : ''}`}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E85D7D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account Trigger */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="p-2 text-[#242124] hover:text-[#E85D7D] hover:bg-[#FFF0F2] transition-colors rounded-full"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Bag Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#F27691] hover:bg-[#E85D7D] text-white px-4 py-2.5 rounded-full font-medium text-xs sm:text-sm shadow-sm transition-all duration-200 active:scale-95"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-white text-[#E85D7D] font-bold text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FFF9F5] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#FEE2E8]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFF0F2] flex items-center justify-center text-[#E85D7D]">
                    <Cake className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-xl font-bold text-[#242124]">
                    Cake<span className="text-[#F27691]">Luv</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#777078] hover:text-[#242124] rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-3">
                <button
                  onClick={() => navigateTo('home')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#FFF0F2] text-sm font-semibold text-[#242124]"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#FFF0F2] text-sm font-medium text-[#242124]"
                >
                  Shop All Delights
                </button>
                <button
                  onClick={() => handleCategoryClick('cakes')}
                  className="text-left py-2 px-3 text-xs text-[#777078] hover:text-[#E85D7D]"
                >
                  ↳ Celebration Cakes
                </button>
                <button
                  onClick={() => handleCategoryClick('bento')}
                  className="text-left py-2 px-3 text-xs text-[#777078] hover:text-[#E85D7D]"
                >
                  ↳ Bento Lunchbox Cakes
                </button>
                <button
                  onClick={() => handleCategoryClick('cupcakes')}
                  className="text-left py-2 px-3 text-xs text-[#777078] hover:text-[#E85D7D]"
                >
                  ↳ Gourmet Cupcakes
                </button>
                <button
                  onClick={() => navigateTo('custom-cake')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#FFF0F2] text-sm font-medium text-[#E85D7D] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#E9B65D]" />
                  Bespoke Custom Cakes
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className="text-left py-2.5 px-3 rounded-xl hover:bg-[#FFF0F2] text-sm font-medium text-[#242124]"
                >
                  Our Story & Craftsmanship
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#FEE2E8] space-y-3">
              <div className="text-xs text-[#777078]">
                {currentUser ? (
                  <div>Signed in as <strong>{currentUser.name}</strong></div>
                ) : (
                  <div>Welcome! Order fresh artisanal cakes anytime.</div>
                )}
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountModalOpen(true);
                }}
                className="w-full py-2.5 px-4 bg-white border border-[#FEE2E8] rounded-xl text-xs font-semibold text-[#242124] text-center"
              >
                {currentUser ? 'Manage Account' : 'Sign In / Register'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
