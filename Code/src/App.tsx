import React, { useState } from 'react';
import { NavTab, Drink, CartItem } from './types';
import { STARBUCKS_DRINKS } from './data/drinks';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ShowcaseCardsSection } from './components/ShowcaseCardsSection';
import { LovedByLocalsSection } from './components/LovedByLocalsSection';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { GiftCardsModal } from './components/GiftCardsModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingDrink, setCustomizingDrink] = useState<Drink | null>(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQty,
              totalPrice: (item.totalPrice / item.quantity) * newQty,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#0B4530] text-white flex flex-col font-sans selection:bg-[#00A862] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Hero Section & Showcase Cards */}
      <main className="flex-1 flex flex-col justify-center">
        <HeroSection
          drinks={STARBUCKS_DRINKS}
          selectedDrinkIndex={selectedDrinkIndex}
          setSelectedDrinkIndex={setSelectedDrinkIndex}
          onCustomizeDrink={(drink) => setCustomizingDrink(drink)}
          onQuickAdd={(drink) => {
            const item: CartItem = {
              id: `${drink.id}-${Date.now()}`,
              drink,
              size: 'Grande',
              milk: drink.customizations.milks[0],
              whippedCream: true,
              extraShots: 0,
              quantity: 1,
              totalPrice: drink.price,
            };
            handleAddToCart(item);
          }}
        />

        {/* Showcase Cards Section (Matching Image 2) */}
        <ShowcaseCardsSection
          drinks={STARBUCKS_DRINKS}
          onCustomizeDrink={(drink) => setCustomizingDrink(drink)}
          onQuickAdd={(drink) => {
            const item: CartItem = {
              id: `${drink.id}-${Date.now()}`,
              drink,
              size: 'Grande',
              milk: drink.customizations.milks[0],
              whippedCream: true,
              extraShots: 0,
              quantity: 1,
              totalPrice: drink.price,
            };
            handleAddToCart(item);
          }}
        />

        {/* 8 Cards Section: "Find And Get What Your Love" & "Loved by Local's" */}
        <LovedByLocalsSection
          drinks={STARBUCKS_DRINKS}
          onAddToCart={handleAddToCart}
          onCustomizeDrink={(drink) => setCustomizingDrink(drink)}
        />
      </main>

      {/* Drink Customization Modal */}
      {customizingDrink && (
        <DrinkCustomizerModal
          drink={customizingDrink}
          onClose={() => setCustomizingDrink(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Navigation Modals based on activeTab */}
      {activeTab === 'about' && (
        <AboutModal onClose={() => setActiveTab('home')} />
      )}

      {activeTab === 'contact' && (
        <ContactModal onClose={() => setActiveTab('home')} />
      )}

      {activeTab === 'gift-cards' && (
        <GiftCardsModal onClose={() => setActiveTab('home')} />
      )}

      {activeTab === 'store-locator' && (
        <StoreLocatorModal onClose={() => setActiveTab('home')} />
      )}

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
