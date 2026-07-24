import React from 'react';
import { motion } from 'motion/react';
import { Drink, CartItem } from '../types';

// Importing generated asset images
import donutsImg from '../assets/images/donuts_stack_1784829616596.jpg';
import croissantImg from '../assets/images/croissant_bakery_1784829635077.jpg';
import cookiesImg from '../assets/images/chocolate_cookies_1784829647232.jpg';
import pastryImg from '../assets/images/cheesecake_pastry_1784829662455.jpg';

interface LovedByLocalsSectionProps {
  drinks: Drink[];
  onAddToCart: (item: CartItem) => void;
  onCustomizeDrink: (drink: Drink) => void;
}

export const LovedByLocalsSection: React.FC<LovedByLocalsSectionProps> = ({
  drinks,
  onAddToCart,
  onCustomizeDrink,
}) => {
  // 8 Total Cards (4 on Left, 4 on Right in a 4-column responsive grid)
  const items = [
    {
      id: 'local-1',
      title: "Coffee's",
      price: '$5.65',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: drinks[0]?.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
      isNew: true,
      drink: drinks[0],
    },
    {
      id: 'local-2',
      title: "Cold Coffee's",
      price: '$6.25',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: drinks[1]?.image || 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
      isNew: false,
      drink: drinks[1],
    },
    {
      id: 'local-3',
      title: "Donut's",
      price: '$4.50',
      desc: 'Freshly glazed gourmet donuts baked fresh every morning.',
      image: donutsImg,
      isNew: false,
      drink: null,
    },
    {
      id: 'local-4',
      title: "Croissant's",
      price: '$4.20',
      desc: 'Golden flaky French butter croissant made with real butter.',
      image: croissantImg,
      isNew: true,
      drink: null,
    },
    {
      id: 'local-5',
      title: "Ice Cream's",
      price: '$5.10',
      desc: 'Artisanal double-scoop creamy ice cream with waffle cone.',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
      isNew: false,
      drink: null,
    },
    {
      id: 'local-6',
      title: "Choco Biscuit's",
      price: '$3.90',
      desc: 'Rich chocolate chip cookies baked with dark Belgian cocoa.',
      image: cookiesImg,
      isNew: false,
      drink: null,
    },
    {
      id: 'local-7',
      title: "Pastry's",
      price: '$5.80',
      desc: 'Decadent strawberry cheesecake slice topped with berry drizzle.',
      image: pastryImg,
      isNew: true,
      drink: null,
    },
    {
      id: 'local-8',
      title: "Cold Drink's",
      price: '$5.25',
      desc: 'Refreshing ice-blended beverage infused with natural flavors.',
      image: drinks[2]?.image || 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
      isNew: false,
      drink: drinks[2],
    },
  ];

  const categories = [
    {
      name: 'Coffee',
      image: drinks[0]?.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: "Cold Drink's",
      image: drinks[1]?.image || 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Bakery',
      image: croissantImg,
    },
  ];

  const handleOrder = (item: typeof items[0]) => {
    if (item.drink) {
      onCustomizeDrink(item.drink);
    } else {
      const priceNum = parseFloat(item.price.replace('$', '')) || 4.50;
      const dummyDrink: Drink = {
        id: item.id,
        name: item.title,
        category: 'Bakery',
        tagline: 'Handcrafted quality',
        headline: item.title,
        salePriceText: item.price,
        description: item.desc,
        price: priceNum,
        image: item.image,
        accentColor: '#073826',
        rightCardBg: '#00A862',
        calories: 280,
        flavors: ['Fresh Baked', 'Sweet'],
        isPopular: true,
        customizations: {
          sizes: [
            { name: 'Standard', volume: '1 serving', priceMultiplier: 1.0 },
          ],
          milks: ['Whole Milk'],
          toppings: ['Whipped Cream'],
        },
      };
      onAddToCart({
        id: `${item.id}-${Date.now()}`,
        drink: dummyDrink,
        size: 'Standard',
        milk: 'Whole Milk',
        whippedCream: false,
        extraShots: 0,
        quantity: 1,
        totalPrice: priceNum,
      });
    }
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 lg:px-12 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* TOP CATEGORY SECTION: "Find And Get What Your Love" */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B4530] tracking-tight">
            Find And Get What Your Love
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                {/* Leaf Shape Card Box */}
                <div className="w-full aspect-square max-w-[200px] bg-[#073826] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-2xl rounded-bl-2xl p-6 flex items-center justify-center shadow-xl group-hover:bg-[#00A862] transition-colors duration-300 relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="mt-3 font-display font-bold text-lg text-[#0B4530] group-hover:text-[#00A862] transition-colors">
                  {cat.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: "Loved by Local's" - 8 CARDS GRID (4 ON LEFT, 4 ON RIGHT) */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0B4530] tracking-tight">
              Loved by Local's
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              EVERYTHING IS HAND-CRAFTED WITH QUALITY
            </p>
          </div>

          {/* 8 Cards in a 4-column layout (2 rows x 4 cols = 4 on left, 4 on right) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all border border-slate-100 flex flex-col justify-between group"
              >
                {/* Leaf Shaped Image Container */}
                <div className="relative w-full aspect-[4/3] bg-[#073826] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-4 flex items-center justify-center overflow-hidden shadow-inner group-hover:bg-[#006241] transition-colors duration-300">
                  
                  {/* NEW Badge */}
                  {item.isNew && (
                    <span className="absolute top-2.5 left-2.5 bg-white text-[#073826] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-md uppercase tracking-wider z-10">
                      NEW
                    </span>
                  )}

                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Details */}
                <div className="pt-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-extrabold text-lg text-[#0B4530] tracking-tight">
                        {item.title}
                      </h3>
                      <span className="font-extrabold text-[#0B4530] text-sm">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>

                  {/* ORDER NOW Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleOrder(item)}
                      className="bg-[#073826] hover:bg-[#00A862] text-white text-[11px] font-extrabold px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 uppercase tracking-wider"
                    >
                      ORDER NOW
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
