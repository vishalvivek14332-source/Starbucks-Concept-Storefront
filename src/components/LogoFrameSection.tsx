import React from 'react';
import { LogoFrameCanvas } from './LogoFrameCanvas';
import { Sparkles, MapPin, Award, ArrowRight, Heart } from 'lucide-react';

interface LogoFrameSectionProps {
  onOpenStoreLocator?: () => void;
  onOpenGiftCards?: () => void;
}

export const LogoFrameSection: React.FC<LogoFrameSectionProps> = ({
  onOpenStoreLocator,
  onOpenGiftCards,
}) => {
  return (
    <section className="relative w-full py-12 px-4 sm:px-8 lg:px-12 bg-[#0B4530] text-white overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00A862]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#006241]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Rectangular Slide Card Banner Container */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#072e20]/90 via-[#003824]/90 to-[#072e20]/90 border border-white/15 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#00A862_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: 3D Logo Canvas Animation (Original Widescreen Ratio) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <LogoFrameCanvas className="w-full max-w-[560px]" />
            </div>

            {/* Right Column: Starbucks Siren Story & Interactive Slide Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Badge Header */}
              <div className="inline-flex items-center gap-2 bg-[#00A862]/20 border border-[#00A862]/40 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-[#00A862] animate-pulse" />
                <span className="text-xs font-extrabold tracking-widest uppercase text-[#00A862]">
                  SIGNATURE SIREN HERITAGE
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                CRAFTED WITH PASSION <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-[#00A862] to-emerald-400">
                  PURE LOVE OF COFFEE
                </span>
              </h2>

              {/* Description */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                For over 50 years, the iconic Starbucks Siren has symbolized our relentless dedication to coffee craft, community, and pure coffee bliss. Drag or interact with the 3D Siren emblem above to explore every dimension of our legacy.
              </p>

              {/* Feature Chips Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-black/30 border border-white/10 rounded-2xl p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#00A862]/20 text-[#00A862] flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">100% Arabica</div>
                    <div className="text-[10px] text-white/60">Ethically Sourced</div>
                  </div>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#00A862]/20 text-[#00A862] flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Freshly Brewed</div>
                    <div className="text-[10px] text-white/60">Made to Order</div>
                  </div>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-2xl p-3 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-8 h-8 rounded-xl bg-[#00A862]/20 text-[#00A862] flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">35,000+ Stores</div>
                    <div className="text-[10px] text-white/60">Worldwide</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={onOpenStoreLocator}
                  className="bg-[#00A862] hover:bg-[#008B52] text-white font-extrabold px-6 py-3.5 rounded-2xl flex items-center gap-2.5 transition-all shadow-lg hover:scale-105 active:scale-95 text-xs sm:text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find a Starbucks Store</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenGiftCards}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-2xl border border-white/20 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
                >
                  Send a Starbucks Card
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
