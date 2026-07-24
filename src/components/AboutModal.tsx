import React from 'react';
import { X, Coffee, Heart, ShieldCheck, Sparkles } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#072e20] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#003824]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00A862] flex items-center justify-center text-white">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">About Starbucks</h3>
              <p className="text-xs text-emerald-300">Inspiring and nurturing the human spirit—one cup at a time.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          <div className="space-y-3">
            <span className="text-xs font-extrabold tracking-widest text-[#00A862] uppercase">
              OUR HERITAGE
            </span>
            <h4 className="font-display text-2xl font-bold leading-tight">
              Crafting Exceptional Coffee Since 1971
            </h4>
            <p className="text-white/80 text-sm leading-relaxed">
              From our humble beginnings at Seattle’s Pike Place Market, Starbucks has been committed to sourcing the world's finest 100% Arabica coffee beans, roasting them with precision, and serving every handcrafted beverage with warmth and passion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#003824]/60 border border-white/10 p-4 rounded-2xl space-y-2">
              <Sparkles className="w-6 h-6 text-[#00A862]" />
              <h5 className="font-bold text-sm">100% Arabica</h5>
              <p className="text-xs text-white/60">Strictly high-elevation beans carefully selected for rich, balanced flavor profiles.</p>
            </div>

            <div className="bg-[#003824]/60 border border-white/10 p-4 rounded-2xl space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#00A862]" />
              <h5 className="font-bold text-sm">Ethical Sourcing</h5>
              <p className="text-xs text-white/60">99% ethically sourced coffee through C.A.F.E. Practices supporting coffee farmers.</p>
            </div>

            <div className="bg-[#003824]/60 border border-white/10 p-4 rounded-2xl space-y-2">
              <Heart className="w-6 h-6 text-[#00A862]" />
              <h5 className="font-bold text-sm">Community First</h5>
              <p className="text-xs text-white/60">Creating welcoming Third Places where connection and conversation thrive.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#006241] to-[#00A862] p-5 rounded-2xl text-white space-y-2">
            <h5 className="font-bold text-base">The Frappuccino® Legacy</h5>
            <p className="text-xs opacity-90 leading-relaxed">
              First introduced in 1995, our signature blended ice Frappuccino® line revolutionized iced coffee culture worldwide. Blended to perfection with custom whipped cream and artisanal toppings, it represents pure joy in every sip.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#002d1d] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#00A862] hover:bg-[#008B52] text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            Close & Explore Drinks
          </button>
        </div>

      </div>
    </div>
  );
};
