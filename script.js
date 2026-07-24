// Drink data collection
const drinksData = [
  { 
    title: "Caramel Frappuccino®", 
    headline: "EXPECT MORE THAN COFFEE.", 
    price: "$5.65", 
    cal: "🔥 380 Cal", 
    desc: "Caramel syrup meets coffee, milk and ice for a blend that solves any day in the best way. Layered with buttery caramel sauce and topped with dark whipped cream." 
  },
  { 
    title: "Strawberry Crème Frappuccino®", 
    headline: "SWEET BERRY BLISS.", 
    price: "$5.85", 
    cal: "🔥 370 Cal", 
    desc: "Summer in a cup! A blend of ice, milk and strawberry puree layered over splashy strawberry puree and topped with fluffy vanilla whipped cream." 
  },
  { 
    title: "Java Chip Mocha Frappuccino®", 
    headline: "CHOCOLATE HEAVEN.", 
    price: "$6.15", 
    cal: "🔥 470 Cal", 
    desc: "Rich mocha sauce, Frappuccino chips, coffee and milk blended with ice, layered on whipped cream and chocolate cookie crumble." 
  },
  { 
    title: "Matcha Green Tea Frappuccino®", 
    headline: "PURE ZEN ENERGY.", 
    price: "$5.95", 
    cal: "🔥 420 Cal", 
    desc: "Premium sweetened matcha green tea blended with milk and ice, topped with whipped cream to give you delicious green tea vibes." 
  }
];

let cartCount = 0;

function initApp() {
  const thumbs = document.querySelectorAll('.thumb-item');
  const headlineEl = document.querySelector('.hero-headline');
  const descEl = document.querySelector('.hero-description');
  const priceValEl = document.querySelector('.price-val');
  const calBadgeEl = document.querySelector('.badge-top-left');
  const sideItems = document.querySelectorAll('.ind-item');
  const cartBadge = document.querySelector('.cart-badge');
  const priceBtn = document.querySelector('.price-btn');
  const deliveryBtn = document.querySelector('.delivery-btn');

  // Handle flavor thumbnail selection
  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      if (drinksData[idx]) {
        if (headlineEl) headlineEl.textContent = drinksData[idx].headline;
        if (descEl) descEl.textContent = drinksData[idx].desc;
        if (priceValEl) priceValEl.textContent = drinksData[idx].price;
        if (calBadgeEl) calBadgeEl.textContent = drinksData[idx].cal;
      }
    });
  });

  // Handle side indicators selection
  sideItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      sideItems.forEach(s => s.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Handle cart addition
  if (priceBtn) {
    priceBtn.addEventListener('click', () => {
      cartCount++;
      if (cartBadge) cartBadge.textContent = cartCount;
    });
  }

  if (deliveryBtn) {
    deliveryBtn.addEventListener('click', () => {
      cartCount++;
      if (cartBadge) cartBadge.textContent = cartCount;
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}onFrame(animate);
