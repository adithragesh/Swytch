// Global App Logic for Swytch Fashion

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Sidebar Menu Logic ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  
  if (menuToggle && mobileMenu && sidebarOverlay) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      sidebarOverlay.classList.add('active');
    });

    const closeSidebar = () => {
      mobileMenu.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    };

    if (closeMenu) closeMenu.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // --- Category Selection (Homepage -> Styles) ---
  const categoryPills = document.querySelectorAll('.category-pill');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const category = e.target.textContent;
      localStorage.setItem('swytch_category', category);
      window.location.href = 'styles.html';
    });
  });

  // --- Style Selection (Styles -> Shop) ---
  const styleBtns = document.querySelectorAll('.btn-style');
  styleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active from all
      styleBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      e.target.classList.add('active');
      
      const selectedStyle = e.target.textContent;
      localStorage.setItem('swytch_style', selectedStyle);
      
      // Simulate loading/processing then redirect
      setTimeout(() => {
        window.location.href = 'shop.html';
      }, 500);
    });
  });

  // --- Initialize Dynamic Content ---
  initDynamicContent();
  updateCartWishlistCounts();

  // --- Intersection Observer for Fade-in Animations ---
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, fadeObserverOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));
});

// Global Image Fallback Handler to prevent any broken images
document.addEventListener('error', function(e) {
  if (e.target.tagName.toLowerCase() === 'img') {
    // Premium fallback fashion image
    e.target.src = 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    e.target.onerror = null; // Prevent infinite loop
  }
}, true);

// Style Asset Map
const styleAssets = {
  'Gothic': {
    hero: 'img/gothic/gothic_hero_banner_1778797876273.png',
    promo: 'img/gothic/gothic_editorial_silver_1778797890612.png',
    title: 'THE GOTHIC EDIT'
  },
  'Streetwear': {
    hero: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    promo: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'URBAN STREETWEAR'
  },
  'Minimalist': {
    hero: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    promo: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'NEW MINIMALIST ERA'
  },
  'Y2K': {
    hero: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    promo: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Y2K REVIVAL'
  },
  'Cottagecore': {
    hero: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    promo: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'RUSTIC COTTAGECORE'
  },
  'Vintage': {
    hero: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    promo: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'RETRO VINTAGE'
  },
  'Bohemian': {
    hero: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    promo: 'https://images.unsplash.com/photo-1583391733958-d25e0b46e2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'MODERN BOHO'
  },
  'Athleisure': {
    hero: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    promo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'ACTIVE ATHLEISURE'
  }
};

// Mock Products Database
const mockProducts = [
  // Streetwear
  { id: 1, name: "Oversized Graphic Tee", price: "$45.00", style: "Streetwear", category: "Men", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Cargo Tech Pants", price: "$85.00", style: "Streetwear", category: "Men", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Vintage Wash Hoodie", price: "$65.00", style: "Streetwear", category: "Unisex", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Chunky Sneakers", price: "$150.00", style: "Streetwear", category: "Unisex", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  
  // Minimalist
  { id: 5, name: "Minimalist Trench Coat", price: "$120.00", style: "Minimalist", category: "Women", img: "https://images.unsplash.com/photo-1550614000-4b95d4ed1bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Structured Tailored Trousers", price: "$90.00", style: "Minimalist", category: "Women", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 7, name: "Silk Slip Dress", price: "$110.00", style: "Minimalist", category: "Women", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 8, name: "Classic White Button-Down", price: "$65.00", style: "Minimalist", category: "Men", img: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },

  // Gothic
  { id: 9, name: "Distressed Leather Jacket", price: "$295.00", style: "Gothic", category: "Unisex", img: "img/gothic/gothic_leather_jacket_1778797921518.png" },
  { id: 10, name: "Heavy Silver Chain", price: "$45.00", style: "Gothic", category: "Accessories", img: "img/gothic/gothic_silver_chain_1778797935262.png" },
  { id: 11, name: "Structured Lace Corset", price: "$85.00", style: "Gothic", category: "Women", img: "img/gothic/gothic_lace_corset_1778797951144.png" },
  { id: 12, name: "Platform Combat Boots", price: "$180.00", style: "Gothic", category: "Unisex", img: "img/gothic/gothic_platform_boots_1778797972534.png" },
  { id: 33, name: "Sheer Mesh Top", price: "$65.00", style: "Gothic", category: "Unisex", img: "img/gothic/gothic_mesh_top_1778797985865.png" },
  { id: 34, name: "Layered Dark Outfit", price: "$150.00", style: "Gothic", category: "Unisex", img: "img/gothic/gothic_layered_outfit_1778798028505.png" },
  { id: 35, name: "Hardware Leather Belt", price: "$55.00", style: "Gothic", category: "Accessories", img: "img/gothic/gothic_hardware_belt_1778798000838.png" },
  { id: 36, name: "Avant-Garde Trench", price: "$320.00", style: "Gothic", category: "Men", img: "img/gothic/gothic_avant_garde_1778798013836.png" },


  // Y2K
  { id: 13, name: "Distressed Denim Jacket", price: "$75.00", style: "Y2K", category: "Unisex", img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 14, name: "Low Rise Flare Jeans", price: "$68.00", style: "Y2K", category: "Women", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 15, name: "Chrome Sunglasses", price: "$40.00", style: "Y2K", category: "Accessories", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 16, name: "Baby Tee Graphic", price: "$35.00", style: "Y2K", category: "Women", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },

  // Cottagecore
  { id: 17, name: "Floral Midi Dress", price: "$85.00", style: "Cottagecore", category: "Women", img: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 18, name: "Knit Cardigan", price: "$60.00", style: "Cottagecore", category: "Women", img: "https://images.unsplash.com/photo-1434389678369-1833144a1e94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 19, name: "Linen Peasant Blouse", price: "$55.00", style: "Cottagecore", category: "Women", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 20, name: "Woven Straw Hat", price: "$30.00", style: "Cottagecore", category: "Accessories", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },

  // Vintage
  { id: 21, name: "Retro Windbreaker", price: "$75.00", style: "Vintage", category: "Unisex", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 22, name: "Classic Corduroy Pants", price: "$65.00", style: "Vintage", category: "Men", img: "https://images.unsplash.com/photo-1542272604-780824b22db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 23, name: "Oversized Blazer", price: "$95.00", style: "Vintage", category: "Women", img: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 24, name: "Vintage Leather Satchel", price: "$110.00", style: "Vintage", category: "Accessories", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },

  // Bohemian
  { id: 25, name: "Flowy Maxi Dress", price: "$85.00", style: "Bohemian", category: "Women", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 26, name: "Fringed Suede Vest", price: "$70.00", style: "Bohemian", category: "Women", img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 27, name: "Patterned Harem Pants", price: "$45.00", style: "Bohemian", category: "Unisex", img: "https://images.unsplash.com/photo-1583391733958-d25e0b46e2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 28, name: "Layered Beaded Necklace", price: "$35.00", style: "Bohemian", category: "Accessories", img: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },

  // Athleisure
  { id: 29, name: "Seamless Leggings", price: "$55.00", style: "Athleisure", category: "Women", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 30, name: "Quarter-Zip Pullover", price: "$65.00", style: "Athleisure", category: "Men", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 31, name: "Performance Running Shoes", price: "$130.00", style: "Athleisure", category: "Unisex", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 32, name: "Active Crop Top", price: "$40.00", style: "Athleisure", category: "Women", img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

function initDynamicContent() {
  const selectedStyle = localStorage.getItem('swytch_style') || 'Minimalist';

  // 1. Update Homepage Hero & Promo Banners
  const heroSection = document.querySelector('.hero-section');
  const promoImage = document.querySelector('.promo-image img');
  const displayTitle = document.querySelector('.hero-content .display-1');
  
  if (heroSection && styleAssets[selectedStyle]) {
    heroSection.style.backgroundImage = `url('${styleAssets[selectedStyle].hero}')`;
    if (displayTitle) displayTitle.textContent = styleAssets[selectedStyle].title;
  }
  if (promoImage && styleAssets[selectedStyle]) {
    promoImage.src = styleAssets[selectedStyle].promo;
  }

  // 2. Update Shop Page
  const shopGrid = document.getElementById('shop-grid');
  const shopTitle = document.getElementById('shop-title');
  if (shopGrid && shopTitle) {
    shopTitle.textContent = `${selectedStyle} Collection`;
    let filtered = mockProducts.filter(p => p.style === selectedStyle);
    if (filtered.length === 0) {
      filtered = mockProducts.slice(0, 4);
    }
    renderProducts(filtered, shopGrid);
  }

  // 3. Update Homepage Recommendations Carousel
  const homeCarousel = document.getElementById('home-recommendations');
  if (homeCarousel) {
    let filtered = mockProducts.filter(p => p.style === selectedStyle);
    if (filtered.length === 0) filtered = mockProducts.slice(0, 8);
    renderProducts(filtered, homeCarousel);
  }

  // 4. Update Style Selection Cards (styles.html and index.html carousel)
  const stylesGridContainer = document.getElementById('style-grid-container');
  const styleCarouselContainer = document.querySelector('.style-carousel');
  
  const generateStyleCards = () => {
    let html = '';
    for (const [styleName, assets] of Object.entries(styleAssets)) {
      html += `
        <a href="shop.html" class="style-card fade-in" onclick="localStorage.setItem('swytch_style', '${styleName}')">
          <img src="${assets.hero}" alt="${styleName}">
          <div class="style-card-content">
            <h3>${styleName}</h3>
          </div>
        </a>
      `;
    }
    return html;
  };

  if (stylesGridContainer) {
    stylesGridContainer.innerHTML = generateStyleCards();
  }
  
  if (styleCarouselContainer && !styleCarouselContainer.hasAttribute('data-populated')) {
    styleCarouselContainer.innerHTML = generateStyleCards();
    styleCarouselContainer.setAttribute('data-populated', 'true');
  }

  // 5. Update Recommendation Section Titles dynamically
  const trendingTitle = document.getElementById('trending-title');
  const curatedTitle = document.getElementById('curated-title');
  const trendingGrid = document.querySelector('.trending-grid');

  if (selectedStyle === 'Gothic') {
    if (trendingTitle) trendingTitle.textContent = 'DARK ESSENTIALS';
    if (curatedTitle) curatedTitle.textContent = 'THE SHADOW EDIT';
    
    // Completely overwrite the trending editorial blocks for Gothic
    if (trendingGrid) {
      trendingGrid.innerHTML = `
        <div class="editorial-card tall">
          <img src="img/gothic/gothic_editorial_silver_1778797890612.png" alt="Dark Essentials">
          <div class="editorial-content">
            <h3 class="editorial-title">Silver & Leather</h3>
            <p>Hardware-heavy luxury pieces</p>
          </div>
        </div>
        <div class="editorial-card wide">
          <img src="img/gothic/gothic_editorial_layering_1778797905315.png" alt="Gothic Streetwear">
          <div class="editorial-content">
            <h3 class="editorial-title">Midnight Layering</h3>
            <p>Oversized alternative silhouettes</p>
          </div>
        </div>
      `;
    }
  }

  // Initialize pages
  renderCart();
  renderWishlist();
}

function renderWishlist() {
  const wlContainer = document.getElementById('wishlist-container');
  const emptyState = document.getElementById('empty-wishlist-state');
  if (!wlContainer) return;

  const wl = JSON.parse(localStorage.getItem('swytch_wl') || '[]');

  if (wl.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    wlContainer.style.display = 'none';
    renderWishlistRecommendations();
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  wlContainer.style.display = 'block';
  wlContainer.innerHTML = '<h1 class="mb-40" style="text-align: center;">Your Wishlist</h1>';

  wl.forEach((id, index) => {
    const product = mockProducts.find(p => p.id === id);
    if (product) {
      const itemHTML = `
        <div class="list-item fade-in visible" style="animation: slideIn 0.3s ease forwards;">
          <img src="${product.img}" alt="${product.name}" class="list-img">
          <div class="list-details">
            <div class="product-tags" style="margin-bottom: 5px;">
              <span class="product-tag">${product.category}</span>
              <span class="product-tag">${product.style}</span>
            </div>
            <h3 class="list-title">${product.name}</h3>
            <p class="list-price">${product.price}</p>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
              <button class="btn-primary" style="padding: 8px 15px; font-size: 12px;" onclick="addToCart(${product.id})">Move to Cart</button>
              <span class="list-remove" onclick="removeFromWishlist(${index})"><i class="fas fa-trash"></i> Remove</span>
            </div>
          </div>
        </div>
      `;
      wlContainer.innerHTML += itemHTML;
    }
  });
}

function renderWishlistRecommendations() {
  const track = document.getElementById('wishlist-recommendations-track');
  const title = document.getElementById('dynamic-recommendation-title');
  if (!track || !title) return;

  const currentStyle = localStorage.getItem('swytch_style') || 'Gothic';
  title.textContent = `Trending in ${currentStyle}`;

  // Filter products by current style
  let styleProducts = mockProducts.filter(p => p.style === currentStyle);
  
  // Fallback to Gothic if not enough items (e.g., if mockProducts hasn't been fully populated for other styles)
  if (styleProducts.length < 4) {
    styleProducts = mockProducts.filter(p => p.style === 'Gothic');
  }

  track.innerHTML = '';
  styleProducts.slice(0, 5).forEach(product => {
    track.innerHTML += `
      <div class="horizontal-scroll-card" onclick="window.location.href='product.html?id=${product.id}'">
        <div class="horizontal-scroll-image">
          <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="horizontal-scroll-info">
          <div class="product-tags">
            <span class="product-tag">${product.style}</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.price}</p>
        </div>
      </div>
    `;
  });
}

function removeFromWishlist(index) {
  let wl = JSON.parse(localStorage.getItem('swytch_wl') || '[]');
  wl.splice(index, 1);
  localStorage.setItem('swytch_wl', JSON.stringify(wl));
  updateCartWishlistCounts();
  renderWishlist();
  showToast('Item removed from wishlist');
}

// --- Cart Logic ---
function renderCart() {
  const cartContainer = document.getElementById('cart-items-container');
  if (!cartContainer) return;

  const cart = JSON.parse(localStorage.getItem('swytch_cart') || '[]');
  const cartSummary = document.querySelector('.cart-summary');
  const cartLayout = document.querySelector('.cart-layout');
  
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    if (cartSummary) cartSummary.style.display = 'none';
    if (cartLayout) cartLayout.style.gridTemplateColumns = '1fr';
    
    cartContainer.innerHTML = `
      <div class="fade-in visible" style="text-align: center; padding: 80px 20px; background-color: var(--bg-secondary); border-radius: var(--radius); box-shadow: 0 5px 20px rgba(0,0,0,0.1); margin-bottom: 40px;">
        <div style="width: 80px; height: 80px; background-color: var(--bg-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; border: 2px solid var(--border-color);">
          <i class="fas fa-shopping-bag" style="font-size: 30px; color: var(--text-secondary);"></i>
        </div>
        <h2 style="margin-bottom: 10px; font-size: 28px;">Your cart is feeling lonely.</h2>
        <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 16px;">Discover pieces that match your style.</p>
        <a href="shop.html" class="btn-primary" style="display: inline-block; padding: 15px 40px; font-size: 16px; text-decoration: none;">Continue Shopping</a>
      </div>
    `;
    updateCartTotal([]);
    return;
  }

  if (cartSummary) cartSummary.style.display = 'block';
  if (cartLayout) cartLayout.style.gridTemplateColumns = ''; // Reset back to CSS default

  const activeProducts = [];

  cart.forEach((id, index) => {
    const product = mockProducts.find(p => p.id === id);
    if (product) {
      activeProducts.push(product);
      const itemHTML = `
        <div class="list-item fade-in visible" style="animation: slideIn 0.3s ease forwards;">
          <img src="${product.img}" alt="${product.name}" class="list-img">
          <div class="list-details">
            <div class="product-tags" style="margin-bottom: 5px;">
              <span class="product-tag">${product.category}</span>
              <span class="product-tag">${product.style}</span>
            </div>
            <h3 class="list-title">${product.name}</h3>
            <p class="list-price">${product.price}</p>
            <div>
              <span class="list-remove" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i> Remove</span>
            </div>
          </div>
        </div>
      `;
      cartContainer.innerHTML += itemHTML;
    }
  });

  updateCartTotal(activeProducts);
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('swytch_cart') || '[]');
  cart.splice(index, 1); // Remove exact instance
  localStorage.setItem('swytch_cart', JSON.stringify(cart));
  
  updateCartWishlistCounts();
  renderCart(); 
  showToast('Item removed from cart');
}

function updateCartTotal(products) {
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');
  
  if (!subtotalEl || !totalEl) return;
  
  let total = 0;
  products.forEach(p => {
    const priceNum = parseFloat(p.price.replace('$', ''));
    if (!isNaN(priceNum)) {
      total += priceNum;
    }
  });
  
  const formattedTotal = '$' + total.toFixed(2);
  subtotalEl.textContent = formattedTotal;
  totalEl.textContent = formattedTotal;
}

function renderProducts(products, container) {
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.img}" alt="${product.name}" class="product-image">
        <button class="wishlist-btn" onclick="toggleWishlist(${product.id}, this)">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="product-tags">
          <span class="product-tag">${product.category}</span>
          <span class="product-tag">${product.style}</span>
        </div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${product.price}</p>
        <button class="btn-primary add-to-cart" data-product-id="${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function toggleWishlist(id, btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  if (btn.classList.contains('active')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    // Save to local storage (mock logic)
    let wl = JSON.parse(localStorage.getItem('swytch_wl') || '[]');
    if(!wl.includes(id)) wl.push(id);
    localStorage.setItem('swytch_wl', JSON.stringify(wl));
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    let wl = JSON.parse(localStorage.getItem('swytch_wl') || '[]');
    wl = wl.filter(item => item !== id);
    localStorage.setItem('swytch_wl', JSON.stringify(wl));
  }
  updateCartWishlistCounts();
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('swytch_cart') || '[]');
  cart.push(id);
  localStorage.setItem('swytch_cart', JSON.stringify(cart));
  updateCartWishlistCounts();
  
  const product = mockProducts.find(p => p.id === id);
  const productName = product ? product.name : "Item";
  showToast(`Added ${productName} to Cart`);
}

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function updateCartWishlistCounts() {
  const cartCounts = document.querySelectorAll('.cart-count');
  const wl = JSON.parse(localStorage.getItem('swytch_wl') || '[]');
  const cart = JSON.parse(localStorage.getItem('swytch_cart') || '[]');
  
  cartCounts.forEach(el => {
    if(el.parentElement.href.includes('cart')) {
      el.textContent = cart.length;
      el.style.display = cart.length > 0 ? 'flex' : 'none';
    } else if (el.parentElement.href.includes('wishlist')) {
       // Using same class for badge visually
       el.textContent = wl.length;
       el.style.display = wl.length > 0 ? 'flex' : 'none';
    }
  });
}

// --- Orders & Checkout Logic ---
document.addEventListener('DOMContentLoaded', () => {
  // Payment Processing Simulation
  const completePaymentBtn = document.getElementById('complete-payment');
  if (completePaymentBtn) {
    completePaymentBtn.addEventListener('click', () => {
      const overlay = document.getElementById('processing-overlay');
      if (overlay) overlay.classList.add('active');
      
      setTimeout(() => {
        // Create Order Object
        const cartIds = JSON.parse(localStorage.getItem('swytch_cart')) || [];
        
        // Map IDs to actual product objects
        const cartProducts = [];
        let totalVal = 0;
        
        cartIds.forEach(id => {
          const product = mockProducts.find(p => p.id === id);
          if (product) {
            cartProducts.push(product);
            const priceNum = parseFloat(product.price.replace('$', ''));
            if (!isNaN(priceNum)) {
              totalVal += priceNum;
            }
          }
        });
        
        const newOrder = {
          id: 'SWY-' + Math.floor(100000 + Math.random() * 900000),
          date: new Date().toLocaleDateString(),
          status: 'Processing',
          items: cartProducts,
          total: '$' + totalVal.toFixed(2)
        };
        
        const orders = JSON.parse(localStorage.getItem('swytch_orders')) || [];
        orders.unshift(newOrder);
        localStorage.setItem('swytch_orders', JSON.stringify(orders));
        
        // Clear Cart
        localStorage.setItem('swytch_cart', JSON.stringify([]));
        
        // Redirect to success and pass order ID
        localStorage.setItem('swytch_last_order', newOrder.id);
        window.location.href = 'success.html';
      }, 2500);
    });
  }

  // Success Page Initialization
  const successOrderId = document.getElementById('success-order-id');
  if (successOrderId) {
    const lastOrderId = localStorage.getItem('swytch_last_order');
    if (lastOrderId) {
      successOrderId.textContent = lastOrderId;
      
      // Calculate fake ETA (5 days from now)
      const eta = new Date();
      eta.setDate(eta.getDate() + 5);
      document.getElementById('success-date').textContent = eta.toLocaleDateString();
    }
  }

  // Orders Page Initialization
  const ordersContainer = document.getElementById('orders-container');
  if (ordersContainer) {
    const orders = JSON.parse(localStorage.getItem('swytch_orders')) || [];
    
    if (orders.length === 0) {
      ordersContainer.innerHTML = '<p style="color:var(--text-secondary); text-align:center; padding: 40px;">You have no past orders.</p>';
    } else {
      let html = '';
      orders.forEach(order => {
        let itemsHtml = '';
        order.items.forEach(item => {
          itemsHtml += `<img src="${item.img}" alt="${item.name}" style="width:60px; height:70px; object-fit:cover; border-radius:4px; margin-right:15px; border: 1px solid var(--border-color);">`;
        });
        
        html += `
          <div style="background-color:var(--bg-secondary); border-radius:var(--radius); padding:20px; margin-bottom:20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:15px;">
              <div>
                <p style="font-weight:700; margin-bottom:5px;">Order ${order.id}</p>
                <p style="font-size:14px; color:var(--text-secondary);">${order.date}</p>
              </div>
              <div style="text-align:right;">
                <p style="font-weight:700; color:var(--primary); margin-bottom:5px;">${order.total}</p>
                <span style="background-color:rgba(112, 141, 129, 0.2); color:var(--primary); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:700;">${order.status}</span>
              </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; overflow-x:auto; flex:1; padding-bottom:10px;">
                ${itemsHtml}
              </div>
              <a href="track.html?id=${order.id}" class="btn-primary" style="padding: 10px 20px; margin-left: 15px; white-space:nowrap; text-decoration:none;">Track</a>
            </div>
          </div>
        `;
      });
      ordersContainer.innerHTML = html;
    }
  }

  // Tracking Page Initialization
  const trackingTimeline = document.getElementById('tracking-timeline');
  if (trackingTimeline) {
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get('id');
    const displayId = orderIdParam || localStorage.getItem('swytch_last_order') || 'SWY-XXXX';
    
    document.getElementById('track-order-id').textContent = displayId;
    
    const eta = new Date();
    eta.setDate(eta.getDate() + 3);
    document.getElementById('track-eta').textContent = eta.toLocaleDateString();

    const statuses = [
      { id: 'placed', title: 'Order Placed', desc: 'We have received your order.' },
      { id: 'packed', title: 'Packed', desc: 'Your order is packed and ready for dispatch.' },
      { id: 'shipped', title: 'Shipped', desc: 'Your order has been shipped.' },
      { id: 'out', title: 'Out for Delivery', desc: 'Your order is out for delivery today.' },
      { id: 'delivered', title: 'Delivered', desc: 'Your order has been delivered.' }
    ];

    // Force demo state: first 2 completed, 3rd active
    let html = '';
    statuses.forEach((status, index) => {
      let stateClass = '';
      let iconHtml = '<i class="fas fa-check"></i>';
      
      if (index < 2) {
        stateClass = 'completed';
      } else if (index === 2) {
        stateClass = 'active';
        iconHtml = '<i class="fas fa-truck"></i>';
      } else {
        iconHtml = '<i class="fas fa-circle" style="font-size:8px;"></i>';
      }

      html += `
        <div class="timeline-step ${stateClass}">
          <div class="timeline-icon">${iconHtml}</div>
          <div class="timeline-content">
            <h3>${status.title}</h3>
            <p>${status.desc}</p>
          </div>
        </div>
      `;
    });
    
    trackingTimeline.innerHTML = html;
  }
});
