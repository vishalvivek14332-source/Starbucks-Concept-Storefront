import React, { useState } from 'react';
import { Drink, CartItem } from '../types';
import { X, Check, Sparkles, ShoppingBag, Coffee } from 'lucide-react';

interface DrinkCustomizerModalProps {
  drink: Drink;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const DrinkCustomizerModal: React.FC<DrinkCustomizerModalProps> = ({
  drink,
  onClose,
  onAddToCart,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // Grande default
  const [selectedMilk, setSelectedMilk] = useState(drink.customizations.milks[0]);
  const [whippedCream, setWhippedCream] = useState(true);
  const [extraShots, setExtraShots] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const size = drink.customizations.sizes[selectedSizeIndex];
  const unitPrice = drink.price * size.priceMultiplier + extraShots * 0.90;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const item: CartItem = {
      id: `${drink.id}-${Date.now()}`,
      drink,
      size: size.name,
      milk: selectedMilk,
      whippedCream,
      extraShots,
      quantity,
      totalPrice,
    };
    onAddToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#072e20] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#003824]/80">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#00A862]" />
            <h3 className="font-display font-bold text-lg text-white truncate max-w-[260px]">
              Customize {drink.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Drink Preview Header */}
          <div className="flex items-center gap-4 bg-[#0B4530] p-4 rounded-2xl border border-white/5">
            <img
              src={drink.image}
              alt={drink.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 object-contain"
            />
            <div>
              <span className="text-xs font-bold text-[#00A862] tracking-wider uppercase">
                {drink.category}
              </span>
              <h4 className="font-bold text-base text-white">{drink.name}</h4>
              <p className="text-xs text-white/60 mt-1">{drink.calories} calories</p>
            </div>
          </div>

          {/* Size Choice */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-white/70">
              1. Choose Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {drink.customizations.sizes.map((s, idx) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedSizeIndex === idx
                      ? 'bg-[#00A862] border-[#00A862] text-white font-bold shadow-md'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span className="block text-sm">{s.name}</span>
                  <span className="block text-[10px] opacity-80 mt-0.5">{s.volume}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Milk Choice */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-widest text-white/70">
              2. Milk Option
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {drink.customizations.milks.map((milk) => (
                <button
                  key={milk}
                  type="button"
                  onClick={() => setSelectedMilk(milk)}
                  className={`py-2 px-3 rounded-xl border text-xs text-left flex items-center justify-between transition-all ${
                    selectedMilk === milk
                      ? 'bg-[#006241] border-[#00A862] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{milk}</span>
                  {selectedMilk === milk && <Check className="w-3.5 h-3.5 text-[#00A862]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Toppings & Shots */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <label className="text-xs font-extrabold uppercase tracking-widest text-white/70">
              3. Extras & Customizations
            </label>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-white/90">Whipped Cream Topping</span>
              <button
                type="button"
                onClick={() => setWhippedCream(!whippedCream)}
                className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                  whippedCream ? 'bg-[#00A862]' : 'bg-white/20'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    whippedCream ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <div>
                <span className="block text-xs text-white/90">Extra Espresso Shot</span>
                <span className="text-[10px] text-white/50">+$0.90 per shot</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExtraShots(Math.max(0, extraShots - 1))}
                  className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-sm hover:bg-white/20"
                >
                  -
                </button>
                <span className="text-xs font-bold w-4 text-center">{extraShots}</span>
                <button
                  type="button"
                  onClick={() => setExtraShots(extraShots + 1)}
                  className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-sm hover:bg-white/20"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/70">
              Quantity
            </span>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1.5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20"
              >
                -
              </button>
              <span className="font-bold text-sm px-2">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold hover:bg-white/20"
              >
                +
              </button>
            </div>
          </div>

        </div>

        {/* Footer Button */}
        <div className="p-5 border-t border-white/10 bg-[#002d1d] flex items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] uppercase text-white/60 font-semibold">Total Price</span>
            <span className="text-xl font-extrabold text-white">${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 bg-[#00A862] hover:bg-[#008B52] text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-98 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add To Order</span>
          </button>
        </div>

      </div>
    </div>
  );
};
