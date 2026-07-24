# Starbucks Concept Storefront ☕

A concept/fan-made recreation of a Starbucks storefront experience — built with React, TypeScript, and Tailwind CSS. Features an interactive frame-by-frame product animation, a full drink customization flow, a shopping cart, and a store locator, all wrapped in Starbucks' signature deep-forest-green aesthetic.

> **Disclaimer:** This is an unofficial, non-commercial concept project created for learning/portfolio purposes. It is not affiliated with, endorsed by, or connected to Starbucks Corporation. All Starbucks trademarks, logos, and product names belong to their respective owners.

## ✨ Features

- **Interactive product viewer** — a canvas-based, drag-to-scrub animation (260 frames) that lets you "rotate" a Frappuccino® in 3D, plus a matching animated Siren logo showcase
- **Drink customization** — pick size, milk, toppings, and extra shots before adding to cart
- **Shopping cart drawer** — live quantity updates, price recalculation, and cart badge
- **Store locator** — browse nearby store info (hours, drive-thru, mobile order availability)
- **Gift cards, About, and Contact** — modal-driven secondary pages
- **Fully responsive**, mobile-first layout with smooth Framer Motion transitions

## 🛠️ Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vitejs.dev/) — build tool & dev server
- [Tailwind CSS 4](https://tailwindcss.com/) — styling
- [Motion](https://motion.dev/) (Framer Motion) — animations
- [Lucide React](https://lucide.dev/) — icons

## 📦 Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The dev server runs at `http://localhost:3000` by default.

## 📁 Project Structure

```
src/
├── App.tsx                    # Root component & cart/tab state
├── types.ts                   # Shared TypeScript types
├── data/
│   ├── drinks.ts               # Product catalog
│   └── stores.ts               # Store locator data
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── CoffeeFrameCanvas.tsx   # Frame-sequence product animation
│   ├── LogoFrameCanvas.tsx     # Frame-sequence logo animation
│   ├── LogoFrameSection.tsx
│   ├── ShowcaseCardsSection.tsx
│   ├── LovedByLocalsSection.tsx
│   ├── DrinkCustomizerModal.tsx
│   ├── CartDrawer.tsx
│   ├── StoreLocatorModal.tsx
│   ├── GiftCardsModal.tsx
│   ├── AboutModal.tsx
│   └── ContactModal.tsx
└── assets/                    # Product imagery
```

Animation frame sequences live in `starbuck_coffeeframes/` and `starbucks_logoframes/` at the project root.

## 📝 License

This project is intended for educational/portfolio purposes only. If you plan to publish it, consider adding an [MIT License](https://choosealicense.com/licenses/mit/) for your own code while keeping in mind that Starbucks branding/imagery is used non-commercially and should not be redistributed for commercial purposes.
