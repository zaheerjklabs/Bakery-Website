export type CakeCategory = 
  | 'all'
  | 'cakes'
  | 'bento'
  | 'pastries'
  | 'cupcakes'
  | 'brownies'
  | 'tarts';

export type OccasionType = 
  | 'birthday'
  | 'anniversary'
  | 'wedding'
  | 'kids'
  | 'corporate'
  | 'all';

export interface ProductVariant {
  id: string;
  size: string; // e.g. "0.5 kg (Serves 4)", "1.0 kg (Serves 8-10)", "1.5 kg (Serves 14)", "2.0 kg (Serves 20)"
  weightKg: number;
  servings: string;
  priceModifier: number; // added to base price
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface BakeryProduct {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: CakeCategory;
  occasions: OccasionType[];
  basePrice: number;
  originalPrice?: number;
  image: string;
  secondaryImages?: string[];
  isBestSeller?: boolean;
  isTrending?: boolean;
  isEggless: boolean;
  canBeEggless: boolean;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  variants: ProductVariant[];
  defaultVariantId: string;
  availableFlavors: string[];
  ingredients: string[];
  allergens: string[];
  storageInstructions: string;
  dietaryBadges: string[];
  inStock: boolean;
}

export interface CartCustomization {
  selectedVariant: ProductVariant;
  selectedFlavor: string;
  isEggless: boolean;
  cakeMessage?: string;
  deliveryDate?: string;
  deliverySlot?: string;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: BakeryProduct;
  customization: CartCustomization;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  deliveryMethod: 'delivery' | 'pickup';
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  pincode?: string;
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  couponCode?: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'received' | 'baking' | 'decorating' | 'out_for_delivery' | 'delivered';
  estimatedDelivery: string;
}

export interface CustomCakeRequest {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  occasion: string;
  guestCount: number;
  tiers: string;
  flavorProfile: string;
  themeDescription: string;
  budgetRange: string;
  deliveryDate: string;
  deliveryType: 'delivery' | 'pickup';
  status: 'pending_review' | 'quoted' | 'confirmed';
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minOrder: number;
  description: string;
}
