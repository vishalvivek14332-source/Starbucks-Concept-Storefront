import { Drink } from '../types';

import caramelImg from '../assets/images/caramel_frappuccino_1784827289499.jpg';
import strawberryImg from '../assets/images/strawberry_frappuccino_1784827301819.jpg';
import mochaImg from '../assets/images/mocha_frappuccino_1784827313455.jpg';
import matchaImg from '../assets/images/matcha_frappuccino_1784827325412.jpg';

export const STARBUCKS_DRINKS: Drink[] = [
  {
    id: 'caramel-frappuccino',
    name: 'Caramel Frappuccino®',
    category: 'Frappuccino',
    tagline: 'STARBUCKS IS...',
    headline: 'PURE LOVE OF COFFEE',
    price: 5.65,
    salePriceText: '5.65$ FOR SALE!',
    description: 'Caramel syrup meets coffee, milk and ice for a blend that solves any day in the best way. Layered with buttery caramel sauce and topped with dark whipped cream.',
    image: caramelImg,
    accentColor: '#00A862',
    rightCardBg: '#008B52',
    calories: 380,
    isPopular: true,
    flavors: ['Rich Caramel', 'Espresso', 'Velvety Milk'],
    customizations: {
      sizes: [
        { name: 'Tall', volume: '12 fl oz', priceMultiplier: 0.85 },
        { name: 'Grande', volume: '16 fl oz', priceMultiplier: 1.0 },
        { name: 'Venti', volume: '24 fl oz', priceMultiplier: 1.2 },
      ],
      milks: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk', 'Nonfat Milk'],
      toppings: ['Extra Caramel Drizzle', 'Whipped Cream', 'Cookie Crumbs', 'Cinnamon Powder'],
    },
  },
  {
    id: 'strawberry-creme-frappuccino',
    name: 'Strawberry Crème Frappuccino®',
    category: 'Frappuccino',
    tagline: 'STARBUCKS IS...',
    headline: 'SWEET BERRY BLISS',
    price: 5.85,
    salePriceText: '5.85$ FOR SALE!',
    description: 'Summer in a cup! A blend of ice, milk and strawberry puree layered over splashy strawberry puree and topped with fluffy vanilla whipped cream.',
    image: strawberryImg,
    accentColor: '#E04A6F',
    rightCardBg: '#00754A',
    calories: 370,
    isPopular: true,
    flavors: ['Fresh Berry', 'Vanilla Cream', 'Pure Bliss'],
    customizations: {
      sizes: [
        { name: 'Tall', volume: '12 fl oz', priceMultiplier: 0.85 },
        { name: 'Grande', volume: '16 fl oz', priceMultiplier: 1.0 },
        { name: 'Venti', volume: '24 fl oz', priceMultiplier: 1.2 },
      ],
      milks: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Coconut Milk'],
      toppings: ['Extra Strawberry Drizzle', 'Vanilla Whip', 'Freeze-dried Strawberries'],
    },
  },
  {
    id: 'mocha-cookie-crumble',
    name: 'Java Chip Mocha Frappuccino®',
    category: 'Frappuccino',
    tagline: 'STARBUCKS IS...',
    headline: 'CHOCOLATE HEAVEN',
    price: 6.15,
    salePriceText: '6.15$ FOR SALE!',
    description: 'Rich mocha sauce, Frappuccino chips, coffee and milk blended with ice, layered on whipped cream and chocolate cookie crumble.',
    image: mochaImg,
    accentColor: '#6F4E37',
    rightCardBg: '#006241',
    calories: 470,
    isPopular: true,
    flavors: ['Dark Cocoa', 'Java Chips', 'Espresso Shot'],
    customizations: {
      sizes: [
        { name: 'Tall', volume: '12 fl oz', priceMultiplier: 0.85 },
        { name: 'Grande', volume: '16 fl oz', priceMultiplier: 1.0 },
        { name: 'Venti', volume: '24 fl oz', priceMultiplier: 1.2 },
      ],
      milks: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Soy Milk'],
      toppings: ['Extra Java Chips', 'Mocha Drizzle', 'Chocolate Whip'],
    },
  },
  {
    id: 'matcha-green-tea',
    name: 'Matcha Green Tea Frappuccino®',
    category: 'Frappuccino',
    tagline: 'STARBUCKS IS...',
    headline: 'PURE ZEN ENERGY',
    price: 5.95,
    salePriceText: '5.95$ FOR SALE!',
    description: 'Premium sweetened matcha green tea blended with milk and ice, topped with whipped cream to give you delicious green tea vibes.',
    image: matchaImg,
    accentColor: '#4A7C59',
    rightCardBg: '#00A862',
    calories: 420,
    isPopular: false,
    flavors: ['Uji Matcha', 'Silky Sweet', 'Natural Zen'],
    customizations: {
      sizes: [
        { name: 'Tall', volume: '12 fl oz', priceMultiplier: 0.85 },
        { name: 'Grande', volume: '16 fl oz', priceMultiplier: 1.0 },
        { name: 'Venti', volume: '24 fl oz', priceMultiplier: 1.2 },
      ],
      milks: ['Oat Milk', 'Almond Milk', 'Coconut Milk', 'Whole Milk'],
      toppings: ['Matcha Dust', 'Whipped Cream', 'Vanilla Syrup'],
    },
  },
];
