import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BakeryProduct,
  CartItem,
  CartCustomization,
  Order,
  CustomCakeRequest,
  CakeCategory,
  OccasionType,
} from '../types/bakery';
import { BAKERY_PRODUCTS, ACTIVE_COUPONS } from '../data/bakeryData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin?: boolean;
}

interface BakeryContextType {
  // Navigation / View
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  
  // Products & Filtering
  products: BakeryProduct[];
  activeCategory: CakeCategory;
  setActiveCategory: (cat: CakeCategory) => void;
  activeOccasion: OccasionType;
  setActiveOccasion: (occ: OccasionType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  isDeliveryModalOpen: boolean;
  setIsDeliveryModalOpen: (open: boolean) => void;
  quickViewProduct: BakeryProduct | null;
  setQuickViewProduct: (prod: BakeryProduct | null) => void;

  // Cart operations
  cart: CartItem[];
  addToCart: (product: BakeryProduct, customization: CartCustomization, quantity?: number) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  deliveryFee: number;
  grandTotal: number;

  // Wishlist
  wishlist: string[]; // array of product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Custom cake orders
  customCakeRequests: CustomCakeRequest[];
  submitCustomCakeRequest: (req: Omit<CustomCakeRequest, 'id' | 'createdAt' | 'status'>) => string;

  // Orders & Checkout
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'orderStatus'>) => Order;

  // User Auth
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  loginUser: (email: string, name: string) => void;
  logoutUser: () => void;

  // Toast feedback
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(BAKERY_PRODUCTS[0].id);

  // Filters
  const [activeCategory, setActiveCategory] = useState<CakeCategory>('all');
  const [activeOccasion, setActiveOccasion] = useState<OccasionType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<BakeryProduct | null>(null);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cakeluv_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cakeluv_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('SWEET10');

  // Custom requests
  const [customCakeRequests, setCustomCakeRequests] = useState<CustomCakeRequest[]>(() => {
    try {
      const saved = localStorage.getItem('cakeluv_custom_requests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('cakeluv_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('cakeluv_user');
      return saved ? JSON.parse(saved) : {
        id: 'user-demo-1',
        name: 'Zaheer Ahmad',
        email: 'zaheerjkxai@gmail.com',
        phone: '+91 98765 43210',
        isAdmin: true,
      };
    } catch {
      return null;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cakeluv_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('cakeluv_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('cakeluv_custom_requests', JSON.stringify(customCakeRequests));
    } catch (e) {
      console.error(e);
    }
  }, [customCakeRequests]);

  useEffect(() => {
    try {
      localStorage.setItem('cakeluv_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cakeluv_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('cakeluv_user');
    }
  }, [currentUser]);

  // Product Detail navigation
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: BakeryProduct, customization: CartCustomization, quantity = 1) => {
    const unitPrice = product.basePrice + customization.selectedVariant.priceModifier;
    const cartItemId = `${product.id}-${customization.selectedVariant.id}-${customization.selectedFlavor}-${customization.isEggless ? 'eggless' : 'regular'}-${customization.cakeMessage || 'nomsg'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: unitPrice * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          cartItemId,
          productId: product.id,
          product,
          customization,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast({
      type: 'success',
      title: 'Added to your Box',
      description: `${product.name} (${customization.selectedVariant.size})`,
    });
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQty, totalPrice: item.unitPrice * newQty }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast({
      type: 'info',
      title: 'Item removed',
      description: 'Cart updated successfully',
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  // Coupon application
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = ACTIVE_COUPONS.find((c) => c.code === cleanCode);
    if (!coupon) {
      return { success: false, message: 'Invalid promo code. Try SWEET10 or CAKELUV15' };
    }
    if (cartSubtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Minimum order value of ₹${coupon.minOrder} required for ${coupon.code}`,
      };
    }
    setAppliedCoupon(cleanCode);
    return { success: true, message: `Promo code ${cleanCode} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const discountAmount = React.useMemo(() => {
    if (!appliedCoupon) return 0;
    const coupon = ACTIVE_COUPONS.find((c) => c.code === appliedCoupon);
    if (!coupon) return 0;
    return Math.round((cartSubtotal * coupon.discountPercentage) / 100);
  }, [appliedCoupon, cartSubtotal]);

  const deliveryFee = React.useMemo(() => {
    if (cartSubtotal === 0) return 0;
    if (appliedCoupon === 'FREEDEL' || cartSubtotal >= 999) return 0;
    return 149;
  }, [cartSubtotal, appliedCoupon]);

  const grandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast({
          type: 'info',
          title: 'Removed from Favorites',
          description: 'Item removed from your wishlist',
        });
        return prev.filter((id) => id !== productId);
      } else {
        const prod = BAKERY_PRODUCTS.find((p) => p.id === productId);
        showToast({
          type: 'success',
          title: 'Saved to Favorites',
          description: prod ? prod.name : 'Saved to wishlist',
        });
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Custom cake orders
  const submitCustomCakeRequest = (req: Omit<CustomCakeRequest, 'id' | 'createdAt' | 'status'>) => {
    const id = `BESPOKE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReq: CustomCakeRequest = {
      ...req,
      id,
      createdAt: new Date().toISOString(),
      status: 'pending_review',
    };
    setCustomCakeRequests((prev) => [newReq, ...prev]);
    showToast({
      type: 'success',
      title: 'Bespoke Cake Request Received!',
      description: `Our master decorator will contact you within 2 business hours. Ticket #${id}`,
    });
    return id;
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'orderStatus'>): Order => {
    const id = `CK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      date: new Date().toISOString(),
      orderStatus: 'received',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setCurrentView('order-success');
    showToast({
      type: 'success',
      title: 'Order Confirmed!',
      description: `Order #${id} is now being scheduled in the bakery oven.`,
    });
    return newOrder;
  };

  const loginUser = (email: string, name: string) => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || 'Valued Guest',
      email,
      phone: '+91 98765 43210',
      isAdmin: email.includes('admin') || email.includes('zaheer'),
    };
    setCurrentUser(user);
    showToast({
      type: 'success',
      title: 'Signed in successfully',
      description: `Welcome back, ${user.name}!`,
    });
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast({
      type: 'info',
      title: 'Signed out',
      description: 'You have been logged out of your account.',
    });
  };

  return (
    <BakeryContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        openProductDetail,
        products: BAKERY_PRODUCTS,
        activeCategory,
        setActiveCategory,
        activeOccasion,
        setActiveOccasion,
        searchQuery,
        setSearchQuery,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        isDeliveryModalOpen,
        setIsDeliveryModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        deliveryFee,
        grandTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        customCakeRequests,
        submitCustomCakeRequest,
        orders,
        currentOrder,
        placeOrder,
        currentUser,
        setCurrentUser,
        loginUser,
        logoutUser,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
