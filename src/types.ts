export type NavTab = 'home' | 'about' | 'contact' | 'gift-cards' | 'store-locator';

export interface Drink {
  id: string;
  name: string;
  category: string;
  tagline: string;
  headline: string;
  price: number;
  salePriceText: string;
  description: string;
  image: string;
  accentColor: string;
  rightCardBg: string;
  calories: number;
  isPopular?: boolean;
  flavors: string[];
  customizations: {
    sizes: { name: string; volume: string; priceMultiplier: number }[];
    milks: string[];
    toppings: string[];
  };
}

export interface CartItem {
  id: string;
  drink: Drink;
  size: string;
  milk: string;
  whippedCream: boolean;
  extraShots: number;
  quantity: number;
  totalPrice: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  distance: string;
  isOpen: boolean;
  hours: string;
  hasDriveThru: boolean;
  hasMobileOrder: boolean;
  lat: number;
  lng: number;
}
