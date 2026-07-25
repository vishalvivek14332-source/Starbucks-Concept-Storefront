import React, { useState } from 'react';
import { NavTab } from '../types';
import { MapPin, ShoppingBag, Menu, X } from 'lucide-react';
import { StarbucksLogo } from './StarbucksLogo';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'gift-cards', label: 'Gift Cards' },
    { 
      id: 'store-locator', 
      label: 'Store Locator', 
      icon: <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#00A862]" /> 
    },
  ];

  return (
    <header className="w-full bg-[#0B4530]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Left: Starbucks Logo */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A862] rounded-full p-1"
          aria-label="Starbucks Home"
        >
          <StarbucksLogo className="w-10 h-10 sm:w-11 sm:h-11" />
          <span className="font-display font-bold text-lg tracking-wider text-white hidden sm:block">
            STARBUCKS
          </span>
        </button>

        {/* Right: Desktop Text Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`relative py-1 transition-colors duration-200 text-xs sm:text-sm tracking-wide ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.icon}
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00A862] rounded-full animate-pulse" />
                )}
              </button>
            );
          })}

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-white/80 hover:text-white transition-colors focus:outline-none rounded-full hover:bg-white/5"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00A862] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenCart}
            className="relative p-2 text-white/80 hover:text-white"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00A862] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#072e20] border-b border-white/10 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm font-medium flex items-center transition-colors ${
                activeTab === link.id
                  ? 'bg-[#006241] text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
