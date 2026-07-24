import React, { useState } from 'react';
import { Drink } from '../types';
import { Truck, Heart, ChevronLeft, ChevronRight, Sparkles, Plus, PlayCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CoffeeFrameCanvas } from './CoffeeFrameCanvas';

interface HeroSectionProps {
  drinks: Drink[];
  selectedDrinkIndex: number;
  setSelectedDrinkIndex: (index: number) => void;
  onCustomizeDrink: (drink: Drink) => void;
  onQuickAdd: (drink: Drink) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  drinks,
  selectedDrinkIndex,
  setSelectedDrinkIndex,
  onCustomizeDrink,
  onQuickAdd,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'static'>('3d');
  const currentDrink = drinks[selectedDrinkIndex];

  const categories = [
    { name: 'Frappuccino', drinkIdx: 0 },
    { name: 'Caramel Macchiato', drinkIdx: 1 % drinks.length },
    { name: 'White Chocolate Mocha', drinkIdx: 2 % drinks.length },
    { name: 'Espresso Macchiato', drinkIdx: 3 % drinks.length },
    { name: 'Americano', drinkIdx: 4 % drinks.length },
    { name: 'Classic Hot Chocolate', drinkIdx: 5 % drinks.length },
  ];

  const handleNext = () => {
    setSelectedDrinkIndex((selectedDrinkIndex + 1) % drinks.length);
    setIsFavorite(false);
  };

  const handlePrev = () => {
    setSelectedDrinkIndex(
      (selectedDrinkIndex - 1 + drinks.length) % drinks.length
    );
    setIsFavorite(false);
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-4rem)] bg-[#0B4530] text-white overflow-hidden flex items-center py-6 lg:py-0">
      {/* Background ambient lighting blur circles */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#006241]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-[#00A862]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Typography & Action Buttons */}
        <div className="lg:col-span-6 space-y-6 lg:space-y-8 z-20">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDrink.id + '-text'}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-3"
            >
              {/* Green Subtitle Tag */}
              <div className="inline-flex items-center gap-2">
                <span className="text-[#00A862] font-extrabold tracking-widest text-sm sm:text-base uppercase font-display">
                  {currentDrink.tagline}
                </span>
                <span className="w-8 h-[2px] bg-[#00A862]" />
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] max-w-lg">
                {currentDrink.headline}
              </h1>

              {/* Description subtext */}
              <p className="text-white/70 text-sm sm:text-base max-w-md line-clamp-2 pt-1 font-light">
                {currentDrink.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            
            {/* Price badge button */}
            <button
              onClick={() => onCustomizeDrink(currentDrink)}
              className="bg-[#003824]/90 hover:bg-[#002d1d] border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 group transition-all duration-200 shadow-lg"
            >
              <div className="text-left">
                <span className="block font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">
                  ${currentDrink.price.toFixed(2)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#00A862] font-semibold">
                  FOR SALE!
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00A862]/20 flex items-center justify-center text-[#00A862] group-hover:bg-[#00A862] group-hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </div>
            </button>

            {/* Free Delivery Pill Button */}
            <button
              onClick={() => onCustomizeDrink(currentDrink)}
              className="bg-white hover:bg-emerald-50 text-[#0B4530] font-bold px-5 py-3.5 rounded-2xl flex items-center gap-3 transition-all duration-200 shadow-xl hover:scale-105 active:scale-95"
            >
              <div className="w-8 h-8 rounded-full bg-[#0B4530] text-white flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-xs font-black tracking-wider uppercase">
                  FREE
                </span>
                <span className="block text-xs font-bold tracking-wider uppercase text-emerald-800">
                  DELIVERY
                </span>
              </div>
            </button>
          </div>

          {/* Bottom Thumbnail Selector Row */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
              {drinks.map((drink, idx) => {
                const isSelected = idx === selectedDrinkIndex;
                return (
                  <button
                    key={drink.id}
                    onClick={() => setSelectedDrinkIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl p-1.5 transition-all duration-200 flex flex-col items-center justify-between group flex-shrink-0 ${
                      isSelected
                        ? 'bg-[#006241] ring-2 ring-[#00A862] shadow-xl scale-105'
                        : 'bg-[#003824]/60 hover:bg-[#004d33] border border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full h-12 sm:h-16 relative flex items-center justify-center">
                      <img
                        src={drink.image}
                        alt={drink.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-center truncate w-full text-white/90 px-0.5">
                      {drink.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-3 text-[11px] font-bold tracking-widest text-white/50 uppercase">
              STARBUCKS AMERICA — SIGNATURE COLLECTION
            </div>
          </div>

        </div>

        {/* CENTER / RIGHT COLUMN: Hero Drink Showcase & Green Accent Banner */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
          
          {/* Green Rotated Background Card Accent */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[240px] sm:w-[300px] h-[420px] sm:h-[500px] bg-[#00A862] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 z-0 border border-white/10">
            
            {/* Top decorative badge & Quick tag chips */}
            <div className="flex flex-col gap-2 relative z-10">
              <div className="flex items-center justify-between text-white/80">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-100 animate-pulse" />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-white/90">
                    SERVED FRESH
                  </span>
                </div>
                
                {/* 3D vs Static View Switcher */}
                <div className="flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/10">
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full transition-all ${
                      viewMode === '3d'
                        ? 'bg-[#00A862] text-white shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <PlayCircle className="w-3 h-3" />
                    <span>3D Motion</span>
                  </button>
                  <button
                    onClick={() => setViewMode('static')}
                    className={`flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full transition-all ${
                      viewMode === 'static'
                        ? 'bg-[#00A862] text-white shadow-md'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Card</span>
                  </button>
                </div>
              </div>

              {/* Right Side Quick Size/Feature Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentDrink.customizations.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => onCustomizeDrink(currentDrink)}
                    className="text-[10px] font-extrabold bg-black/20 hover:bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full text-white/90 border border-white/10 transition-all hover:scale-105 active:scale-95"
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Vertical Stacked FRAPPUCCINO Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-80 rotate-90">
              <div className="space-y-1 text-center">
                <span className="block font-display font-extrabold text-3xl sm:text-4xl tracking-widest text-white uppercase">
                  FRAPPUCCINO
                </span>
                <span className="block font-display font-extrabold text-3xl sm:text-4xl tracking-widest text-stroke uppercase">
                  FRAPPUCCINO
                </span>
              </div>
            </div>

            {/* Bottom Right Side Flavor Chips & Navigation */}
            <div className="relative z-10 space-y-3 mt-auto">
              
              {/* Right Side Flavor Profile Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-100/80 block">
                  Flavor Profile
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentDrink.flavors.map((flavor, fIdx) => (
                    <span
                      key={fIdx}
                      onClick={() => onCustomizeDrink(currentDrink)}
                      className="text-[10px] font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md px-2.5 py-1 rounded-lg text-white border border-white/20 cursor-pointer shadow-sm transition-transform hover:scale-105"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Controls */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-semibold text-white/70">
                  {selectedDrinkIndex + 1} / {drinks.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-xl bg-black/20 hover:bg-black/30 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 border border-white/10"
                    aria-label="Previous drink"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-xl bg-black/20 hover:bg-black/30 backdrop-blur-md flex items-center justify-center text-white transition-all active:scale-95 border border-white/10"
                    aria-label="Next drink"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Central Product Hero Showcase (3D Motion Canvas or Static Card) */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[440px] flex flex-col items-center justify-center mr-6 sm:mr-16">
            
            <AnimatePresence mode="wait">
              {viewMode === '3d' ? (
                <motion.div
                  key="3d-canvas-hero"
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* FLOATING CHIP 1: Top-Left Floating Badge */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="absolute -top-4 -left-2 sm:-left-6 z-20 bg-[#072e20]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold text-white hover:scale-105 transition-transform"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#00A862] animate-ping" />
                    <span>🔥 {currentDrink.calories} Cal</span>
                  </motion.div>

                  {/* FLOATING CHIP 2: Top-Right Fresh Steam Badge */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="absolute -top-2 -right-2 sm:-right-6 z-20 bg-[#006241]/95 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 text-xs font-bold text-white hover:scale-105 transition-transform"
                  >
                    <span>☕ 3D Steaming Cup</span>
                  </motion.div>

                  {/* 3D Canvas Frame Sequence with Seamless Radial Masking */}
                  <CoffeeFrameCanvas onCustomize={() => onCustomizeDrink(currentDrink)} />
                </motion.div>
              ) : (
                <motion.div
                  key={currentDrink.id + '-static'}
                  initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="relative group cursor-pointer w-full flex flex-col items-center"
                  onClick={() => onCustomizeDrink(currentDrink)}
                >
                  {/* Glow ring behind cup */}
                  <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl group-hover:bg-emerald-400/35 transition-all duration-300" />

                  {/* FLOATING CHIP 1: Top-Left Floating Badge */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="absolute -top-3 -left-4 sm:-left-8 z-20 bg-[#072e20]/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold text-white hover:scale-105 transition-transform"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#00A862] animate-ping" />
                    <span>🔥 {currentDrink.calories} Cal</span>
                  </motion.div>

                  {/* FLOATING CHIP 2: Top-Right Milk / Blend Badge */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="absolute top-8 -right-6 sm:-right-10 z-20 bg-[#006241]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-1.5 text-xs font-bold text-white hover:scale-105 transition-transform"
                  >
                    <span>🧊 Ice Blended</span>
                  </motion.div>

                  {/* Main Product Cup Image */}
                  <img
                    src={currentDrink.image}
                    alt={currentDrink.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain max-h-[360px] sm:max-h-[440px] filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Floating Heart / Favorite button attached on cup right edge */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFavorite(!isFavorite);
                    }}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md border border-white/20 transition-all duration-200 z-20 ${
                      isFavorite
                        ? 'bg-red-500 text-white scale-110'
                        : 'bg-white/80 hover:bg-white text-emerald-900 hover:text-red-500'
                    }`}
                    aria-label="Favorite drink"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite ? 'fill-current text-white' : ''
                      }`}
                    />
                  </button>

                  {/* FLOATING CHIP 3: Bottom Left Customization Prompt Chip */}
                  <div className="absolute -bottom-3 left-2 sm:-left-4 z-20 bg-gradient-to-r from-[#006241] to-[#00A862] border border-white/20 px-3.5 py-1.5 rounded-2xl shadow-xl text-[11px] font-extrabold text-white flex items-center gap-1.5 hover:scale-105 transition-transform">
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span>Customize Recipe</span>
                  </div>

                  {/* FLOATING CHIP 4: Roasted Coffee Beans Accent graphic at bottom right */}
                  <div className="absolute -bottom-2 right-4 bg-[#072e20]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-2xl text-[11px] font-bold text-white/90 flex items-center gap-1.5 shadow-lg z-20">
                    <span className="w-2 h-2 rounded-full bg-[#00A862]" />
                    <span>100% Arabica</span>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* MINIMALIST VERTICAL NAVIGATION INDICATOR (Image 1 feature) */}
          <div className="hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 items-center">
            <div className="relative flex flex-col items-end gap-6 py-4">
              
              {/* Thin Vertical Connecting Line */}
              <div className="absolute right-[5px] top-3 bottom-3 w-[1.5px] bg-white/20 pointer-events-none" />

              {categories.map((cat, idx) => {
                const isActive = selectedDrinkIndex === cat.drinkIdx;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedDrinkIndex(cat.drinkIdx)}
                    className="group flex items-center gap-3 cursor-pointer relative z-10 text-right focus:outline-none"
                  >
                    <span
                      className={`text-xs font-bold transition-all duration-200 ${
                        isActive
                          ? 'text-white font-extrabold scale-105'
                          : 'text-white/50 group-hover:text-white/80'
                      }`}
                    >
                      {cat.name}
                    </span>

                    {/* Circular Progress Node */}
                    <div
                      className={`w-3 h-3 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-white ring-4 ring-[#00A862] scale-125'
                          : 'bg-white/40 group-hover:bg-white/80 group-hover:scale-110'
                      }`}
                    >
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#0B4530]" />}
                    </div>
                  </button>
                );
              })}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
