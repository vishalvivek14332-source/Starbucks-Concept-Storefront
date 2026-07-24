import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = subtotal >= 15 || subtotal === 0 ? 0 : 2.99;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#072e20] border-l border-white/10 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#003824]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#00A862]" />
              <h3 className="font-display font-bold text-lg text-white">Your Starbucks Order</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            
            {isOrdered ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#00A862]/20 text-[#00A862] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h4 className="font-display text-2xl font-bold text-white">Order Confirmed!</h4>
                <p className="text-sm text-white/70 max-w-xs mx-auto">
                  Your handcrafted Starbucks beverages are being prepared with love and will be ready shortly!
                </p>
                <button
                  onClick={() => {
                    setIsOrdered(false);
                    onClose();
                  }}
                  className="mt-4 bg-[#00A862] text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider"
                >
                  Back To Menu
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3 text-white/60">
                <ShoppingBag className="w-12 h-12 mx-auto text-white/20" />
                <p className="text-sm font-medium">Your Starbucks bag is empty</p>
                <p className="text-xs text-white/40">Select your favorite Frappuccino® to get started!</p>
              </div>
            ) : (
              <>
                {/* Free Delivery Bar */}
                <div className="bg-[#003824] p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00A862]/20 text-[#00A862] flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    {subtotal >= 15 ? (
                      <span className="font-bold text-[#00A862]">
                        🎉 You unlocked FREE Delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-white">${(15 - subtotal).toFixed(2)}</strong> more for FREE Delivery!
                      </span>
                    )}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 pt-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between gap-3"
                    >
                      <img
                        src={item.drink.image}
                        alt={item.drink.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-contain"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-white truncate">{item.drink.name}</h4>
                        <p className="text-[11px] text-white/60">
                          {item.size} • {item.milk}
                        </p>
                        {item.extraShots > 0 && (
                          <p className="text-[10px] text-[#00A862]">+{item.extraShots} Extra Shot</p>
                        )}
                        <span className="font-extrabold text-xs text-white mt-1 block">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-white/40 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 rounded text-xs font-bold text-white hover:bg-white/20"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded text-xs font-bold text-white hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && !isOrdered && (
            <div className="p-6 border-t border-white/10 bg-[#002d1d] space-y-4">
              <div className="space-y-1.5 text-xs text-white/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-white font-semibold">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#00A862]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#00A862] hover:bg-[#008B52] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all text-sm"
              >
                <span>Place Starbucks Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
