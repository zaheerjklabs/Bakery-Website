/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { Hero } from './components/home/Hero';
import { BenefitsStrip } from './components/home/BenefitsStrip';
import { BestSellers } from './components/home/BestSellers';
import { TrendingCakes } from './components/home/TrendingCakes';
import { ShopByOccasion } from './components/home/ShopByOccasion';
import { CraftsmanshipStory } from './components/home/CraftsmanshipStory';
import { NewsletterSection } from './components/home/NewsletterSection';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CustomCakePage } from './components/custom/CustomCakePage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderSuccessPage } from './components/checkout/OrderSuccessPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { AboutPage } from './components/about/AboutPage';
import { AdminPortal } from './components/admin/AdminPortal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/modals/SearchModal';
import { AccountModal } from './components/modals/AccountModal';
import { DeliveryInfoModal } from './components/modals/DeliveryInfoModal';
import { QuickViewModal } from './components/modals/QuickViewModal';

const AppContent: React.FC = () => {
  const { currentView } = useBakery();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#242124]">
      {/* Sticky Header */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <BenefitsStrip />
            <BestSellers />
            <TrendingCakes />
            <ShopByOccasion />
            <CraftsmanshipStory />
            <NewsletterSection />
          </>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'custom-cake' && <CustomCakePage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'order-success' && <OrderSuccessPage />}
        {currentView === 'wishlist' && <WishlistPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'admin' && <AdminPortal />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <AccountModal />
      <DeliveryInfoModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <BakeryProvider>
      <AppContent />
    </BakeryProvider>
  );
}
