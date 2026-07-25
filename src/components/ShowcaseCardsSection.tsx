import React, { useState } from 'react';
import { Drink } from '../types';
import { ShoppingBag, Menu, MapPin, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ShowcaseCardsSectionProps {
  drinks: Drink[];
  onCustomizeDrink: (drink: Drink) => void;
  onQuickAdd: (drink: Drink) => void;
}

export const ShowcaseCardsSection: React.FC<ShowcaseCardsSectionProps> = ({
  drinks,
  onCustomizeDrink,
  onQuickAdd,
}) => {
  const [selectedSize, setSelectedSize] = useState<'T' | 'G' | 'V'>('G');
  const [selectedBrew, setSelectedBrew] = useState('Espresso');
  const [selectedRoast, setSelectedRoast] = useState('Light');
  const [selectedOrigin, setSelectedOrigin] = useState('Venezuela');

  const brewOptions = ['Brew', 'Cold', 'Espresso', 'Drip'];
  const roastOptions = ['Light', 'Medium', 'Dark'];
  const originOptions = ['Colombia', 'Brazil', 'Ethiopia', 'Guatemala', 'Venezuela', 'Vietnam'];

  const currentDrink = drinks[0];

  return (
    <section className="w-full bg-[#072e20] py-16 px-4 sm:px-8 lg:px-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00A862]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[#00A862] text-xs font-extrabold uppercase tracking-widest font-display">
            EXCLUSIVELY CRAFTED
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Starbucks Signature Mobile Experience
          </h2>
          <p className="text-white/70 text-sm font-light">
            Crafted with precision — explore our custom coffee filters, mobile order cards, and iconic brand artwork.
          </p>
        </div>

        {/* 3-Card Layout matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch justify-center max-w-5xl mx-auto">
          
          {/* CARD 1: Starbucks Siren Logo Card */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="bg-[#006241] rounded-[2rem] overflow-hidden shadow-2xl relative min-h-[440px] flex flex-col justify-between p-6 border border-white/10 group cursor-pointer"
          >
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0B4530] via-[#006241] to-[#00A862] opacity-90" />
            <div className="absolute inset-0 bg-[#00A862]/20 blur-3xl pointer-events-none" />

            {/* Official Starbucks Logo Image in Card Center */}
            <div className="relative z-10 flex-1 flex items-center justify-center p-4">
              <div className="w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="/starbucklady.jpg" 
                  alt="Starbucks Official Logo"
                  className="w-full h-full object-cover rounded-full select-none"
                />
              </div>
            </div>

            <div className="relative z-10 space-y-1 text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200 block">
                EST. 1971
              </span>
              <h3 className="text-2xl font-display font-extrabold text-white leading-tight">
                Pure Arabica Craft
              </h3>
            </div>
          </motion.div>

          {/* CARD 2: Interactive Mobile Order Drink Card */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col justify-between border border-white/20 text-slate-900"
          >
            {/* Top White Area: Header + Cup */}
            <div className="p-5 pb-0 bg-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/starbucklady.jpg" alt="Starbucks Logo" className="w-5 h-5 rounded-full object-cover select-none" />
                  <span className="font-display font-black text-sm tracking-widest text-black">
                    STARBUCKS
                  </span>
                </div>
                <Menu className="w-5 h-5 text-black cursor-pointer hover:opacity-70" />
              </div>

              {/* Overflow Cup Image */}
              <div className="w-full h-44 relative flex items-center justify-center my-2">
                <img
                  src={currentDrink.image}
                  alt="Organic Blonde Light Roast"
                  referrerPolicy="no-referrer"
                  className="max-h-52 object-contain filter drop-shadow-xl transform hover:scale-105 transition-transform"
                />
              </div>
            </div>

            {/* Bottom Dark Green Card Area */}
            <div className="bg-[#006241] p-5 text-white flex-1 flex flex-col justify-between relative">
              
              {/* Right Vertical Badges */}
              <div className="absolute right-3 top-5 bottom-16 flex flex-col items-center justify-between text-[9px] font-bold tracking-widest text-emerald-200/60 uppercase select-none pointer-events-none">
                <span className="[writing-mode:vertical-lr] rotate-180">Fair Trade</span>
                <span className="[writing-mode:vertical-lr] rotate-180">Organic</span>
                <span className="[writing-mode:vertical-lr] rotate-180">Non-GMO</span>
              </div>

              <div className="space-y-3 pr-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-white leading-snug">
                    Organic Blonde Light Roast
                  </h3>
                  <p className="text-[11px] text-white/70 font-light mt-0.5">
                    Harvested and roasted in the heart of Venezuela.
                  </p>
                </div>

                {/* Size Selector Badges [ T ] [ G ] [ V ] */}
                <div className="flex items-center gap-2 pt-1">
                  {(['T', 'G', 'V'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-8 h-8 rounded-xl font-extrabold text-xs flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? 'bg-[#00A862] text-white ring-2 ring-emerald-300 shadow-md'
                          : 'bg-white/10 hover:bg-white/20 text-white/80'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Price Display */}
                <div className="pt-2">
                  <span className="text-2xl font-extrabold text-white">$2.79</span>
                </div>
              </div>

              {/* Order Button & Location */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onQuickAdd(currentDrink)}
                    className="bg-black hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all active:scale-95"
                  >
                    Order Now
                  </button>

                  <div className="text-right">
                    <span className="block text-[9px] uppercase tracking-wider text-emerald-200/80 font-bold">
                      Pickup
                    </span>
                    <span className="text-[10px] text-white/90 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#00A862]" /> 13 Lucky Rd, Boston MA
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* CARD 3: Coffee Filter Sidebar Card */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="bg-[#111111] rounded-[2rem] p-6 text-white shadow-2xl flex flex-col justify-between border border-white/10 relative overflow-hidden"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-display font-bold text-lg tracking-wide text-white">
                  Coffee Filter
                </h3>
                <span className="text-[10px] font-bold bg-[#00A862]/20 text-[#00A862] px-2.5 py-0.5 rounded-full">
                  Interactive
                </span>
              </div>

              {/* Brew Section */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50 block">
                  Brew
                </span>
                <div className="space-y-1">
                  {brewOptions.map((brew) => (
                    <button
                      key={brew}
                      onClick={() => setSelectedBrew(brew)}
                      className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between ${
                        selectedBrew === brew
                          ? 'text-[#00A862] font-extrabold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span>{brew}</span>
                      {selectedBrew === brew && <span className="w-1.5 h-1.5 rounded-full bg-[#00A862]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roast Section */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50 block">
                  Roast
                </span>
                <div className="space-y-1">
                  {roastOptions.map((roast) => (
                    <button
                      key={roast}
                      onClick={() => setSelectedRoast(roast)}
                      className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between ${
                        selectedRoast === roast
                          ? 'text-[#00A862] font-extrabold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span>{roast}</span>
                      {selectedRoast === roast && <span className="w-1.5 h-1.5 rounded-full bg-[#00A862]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Origin Section */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50 block">
                  Origin
                </span>
                <div className="space-y-1">
                  {originOptions.map((origin) => (
                    <button
                      key={origin}
                      onClick={() => setSelectedOrigin(origin)}
                      className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between ${
                        selectedOrigin === origin
                          ? 'text-[#00A862] font-extrabold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span>{origin}</span>
                      {selectedOrigin === origin && <span className="w-1.5 h-1.5 rounded-full bg-[#00A862]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side tick marks line */}
            <div className="absolute right-3 top-12 bottom-12 w-0.5 bg-white/10 flex flex-col justify-between items-center">
              <div className="w-2 h-0.5 bg-[#00A862]" />
              <div className="w-2 h-0.5 bg-[#00A862]" />
              <div className="w-2 h-0.5 bg-[#00A862]" />
            </div>

            <div className="pt-4 border-t border-white/10 text-[10px] text-white/40 uppercase font-semibold text-center">
              Filtered for {selectedOrigin} • {selectedRoast} Roast
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
