import { ThemeId } from './utils/themes';

export interface Product {
  id: number;
  slot: number; // 1 to 10
  titleAr: string;
  titleEn: string;
  price: number;
  originalPrice?: number;
  category: 'streetwear' | 'gaming' | 'accessories' | 'gear';
  badgeAr?: string;
  badgeEn?: string;
  descAr: string;
  descEn: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
}

export interface StoreConfig {
  storeNameAr: string;
  storeNameEn: string;
  headlineAr: string;
  headlineEn: string;
  taglineAr: string;
  taglineEn: string;
  logoUrl: string;
  logoType: 'text' | 'image';
  logoText: string;
  whatsappNumber: string;
  emailAddress: string;
  currency: string;
  accentColor: string;
  themeId: ThemeId;
  bannerTextAr: string;
  bannerTextEn: string;
  heroBadgeAr: string;
  heroBadgeEn: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

export type Language = 'ar' | 'en';
