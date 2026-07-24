# Starbucks Concept Storefront ☕

Concept/fan-made Starbucks storefront. React + TypeScript. Interactive product animation, drink customization, cart, store locator, deep-forest-green theme.

> Unofficial, non-commercial concept project. Not affiliated with Starbucks Corporation. Trademarks/logos/product names belong to their owners.

## Features
- Canvas-based drag-to-scrub product animation (260 frames), matching Siren logo animation
- Drink customization — size, milk, toppings, extra shots
- Cart drawer — quantity update, price recalc, badge
- Store locator — hours, drive-thru, mobile order flags
- Gift cards, About, Contact modals
- Responsive, Framer Motion transitions

## Stack
- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (Framer Motion)
- Lucide React

## Run
Prereq: Node.js 18+

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run preview
```

## Structure
```
src/
├── App.tsx
├── types.ts
├── data/
│   ├── drinks.ts
│   └── stores.ts
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── CoffeeFrameCanvas.tsx
│   ├── LogoFrameCanvas.tsx
│   ├── LogoFrameSection.tsx
│   ├── ShowcaseCardsSection.tsx
│   ├── LovedByLocalsSection.tsx
│   ├── DrinkCustomizerModal.tsx
│   ├── CartDrawer.tsx
│   ├── StoreLocatorModal.tsx
│   ├── GiftCardsModal.tsx
│   ├── AboutModal.tsx
│   └── ContactModal.tsx
└── assets/
```
Frame sequences: `starbuck_coffeeframes/`, `starbucks_logoframes/` at root.

## License
Educational/portfolio use. Add MIT for own code if publishing. Starbucks branding non-commercial only, don't redistribute commercially.
