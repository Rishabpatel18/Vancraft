/**
 * VanCraft E-Commerce Storefront - Core Script
 * Handles state, cart, wishlist, routing, filters, carousel, accordion, validations,
 * animations, theme management, and login/signup modals.
 */

// --- Diagnostic Visual Error Catcher ---
window.addEventListener('error', function(event) {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'diagnostic-error-banner';
  errorContainer.style.position = 'fixed';
  errorContainer.style.bottom = '20px';
  errorContainer.style.right = '20px';
  errorContainer.style.backgroundColor = '#E07A76';
  errorContainer.style.color = '#FFFFFF';
  errorContainer.style.padding = '18px';
  errorContainer.style.borderRadius = '12px';
  errorContainer.style.zIndex = '10000';
  errorContainer.style.maxWidth = '450px';
  errorContainer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
  errorContainer.style.fontFamily = 'monospace';
  errorContainer.style.fontSize = '13px';
  errorContainer.style.border = '2px solid #FFFFFF';
  errorContainer.innerHTML = `
    <h3 style="font-family: inherit; font-size:14px; margin-bottom:8px; font-weight:bold;">⚠️ VanCraft Runtime Diagnostic Error:</h3>
    <p style="margin-bottom:6px;"><strong>Error:</strong> ${event.message}</p>
    <p style="margin-bottom:6px;"><strong>File:</strong> ${event.filename ? event.filename.split('/').pop() : 'inline'}:${event.lineno}:${event.colno}</p>
    <button onclick="this.parentElement.remove()" style="background:#FFFFFF; color:#E07A76; padding:4px 10px; border-radius:4px; font-weight:bold; font-size:11px; margin-top:8px;">Dismiss</button>
  `;
  document.body.appendChild(errorContainer);
});


// 1. PRODUCT DATASET (12 Curated Traditional Indian Crafts across 4 Categories)
const PRODUCTS = [
  {
    id: 1,
    name: "Hand-Painted Clay Pot",
    category: "Pottery",
    price: 799,
    rating: 4.8,
    reviews: 32,
    image: "assets/images/clay_pot.png",
    tag: "Best Seller",
    isBestSeller: true,
    isTraditionalArt: true,
    isTrending: false,
    isDiscount: false,
    discountPercent: 0,
    artisan: {
      name: "Ram Narayan",
      location: "Jaipur, Rajasthan",
      bio: "Ram uses clay extracted from the Aravalli hills and applies pigments made from natural stones and plants to paint centuries-old traditional Rajasthani motifs."
    },
    description: "A traditional clay pot (handi) adorned with intricate hand-painted motifs in earth terracotta and gold colors. Brings traditional warmth and a touch of heritage to your home.",
    specs: {
      dimensions: "8\" H x 7\" W",
      materials: "100% Organic Clay, Natural Pigments",
      care: "Wipe with a soft dry cloth. Do not scrub the hand-painted exterior surface."
    },
    stock: 5,
    sales: 154
  },
  {
    id: 2,
    name: "Cobalt Blue Ceramic Vase",
    category: "Pottery",
    price: 1299,
    rating: 4.9,
    reviews: 45,
    image: "assets/images/ceramic_vase.png",
    tag: "Trending",
    isBestSeller: false,
    isTraditionalArt: false,
    isTrending: true,
    isDiscount: false,
    discountPercent: 0,
    artisan: {
      name: "Meera Bai",
      location: "Khurja, Uttar Pradesh",
      bio: "Meera is a third-generation artisan specializing in cobalt glazing techniques that give Khurja pottery its signature deep blue glaze."
    },
    description: "A premium glazed ceramic vase featuring classic hand-painted floral patterns in rich cobalt blue and white. A stunning ornament for any mantelpiece or table setting.",
    specs: {
      dimensions: "10\" H x 5\" W",
      materials: "Stoneware Ceramic, Premium Glaze",
      care: "Hand wash with mild soap. Handle with care."
    },
    stock: 8,
    sales: 210
  },
  {
    id: 3,
    name: "Intricate Decorative Bowl",
    category: "Pottery",
    price: 599,
    rating: 4.7,
    reviews: 20,
    image: "assets/images/decorative_bowl.png",
    tag: "20% Off",
    isBestSeller: false,
    isTraditionalArt: false,
    isTrending: false,
    isDiscount: true,
    discountPercent: 20,
    artisan: {
      name: "Gopal Saini",
      location: "Jaipur, Rajasthan",
      bio: "Gopal is a master of Blue Pottery, a craft unique to Jaipur that uses Egyptian paste rather than clay, fired at low temperatures."
    },
    description: "An exquisite decorative bowl handcrafted in traditional Jaipur blue pottery style. Features colorful floral details and gold accents that elevate any decorative setup.",
    specs: {
      dimensions: "3\" H x 6\" Diameter",
      materials: "Egyptian Paste (Quartz, Glass, Multani Mitti)",
      care: "Fragile. Wipe gently with a dry cloth. Do not hold hot food or liquids."
    },
    stock: 6,
    sales: 98
  },
  {
    id: 4,
    name: "Rajasthani Wooden Horse",
    category: "Handmade Toys",
    price: 899,
    rating: 4.9,
    reviews: 18,
    image: "assets/images/wooden_horse.png",
    tag: "Best Seller",
    isBestSeller: true,
    isTraditionalArt: true,
    isTrending: false,
    isDiscount: false,
    discountPercent: 0,
    artisan: {
      name: "Devendra Singh",
      location: "Udaipur, Rajasthan",
      bio: "Devendra carves locally sourced mango wood and paints them in traditional Mewari style using organic paint pigments."
    },
    description: "A traditional wooden toy horse painted in vibrant ethnic styles. Features rustic textures and fine details that reflect the royal puppet show styles of Rajasthan.",
    specs: {
      dimensions: "9\" H x 8\" L x 3\" W",
      materials: "Mango Wood, Organic Acrylic Paints",
      care: "Keep away from moisture and direct water. Clean with dry cloth."
    },
    stock: 4,
    sales: 75
  },
  {
    id: 5,
    name: "Traditional Cloth Puppet Doll",
    category: "Handmade Toys",
    price: 499,
    rating: 4.6,
    reviews: 15,
    image: "assets/images/handmade_doll.png",
    tag: "10% Off",
    isBestSeller: false,
    isTraditionalArt: false,
    isTrending: false,
    isDiscount: true,
    discountPercent: 10,
    artisan: {
      name: "Sita Devi",
      location: "Jodhpur, Rajasthan",
      bio: "Sita has been crafting cloth puppets (Kathputli) for over 30 years, preserving Rajasthan's rich storytelling heritage."
    },
    description: "A beautiful handmade Rajasthani puppet doll dressed in traditional ethnic attire (ghagra-choli) with delicate embroidery, tinsel borders, and mirror work.",
    specs: {
      dimensions: "18\" Length",
      materials: "Cotton Fabric, Wood, Mirror Pieces, Thread",
      care: "Dust lightly. Do not wash in a washing machine."
    },
    stock: 12,
    sales: 140
  },
  {
    id: 6,
    name: "Patchwork Soft Elephant Toy",
    category: "Handmade Toys",
    price: 399,
    rating: 4.7,
    reviews: 22,
    image: "assets/images/soft_fabric_toy.png",
    tag: "Trending",
    isBestSeller: false,
    isTraditionalArt: false,
    isTrending: true,
    isDiscount: false,
    discountPercent: 0,
    artisan: {
      name: "Lakshmi Bai",
      location: "Ahmedabad, Gujarat",
      bio: "Lakshmi gathers waste cotton scraps from textile mills to create charming patchwork fabric toys, promoting zero-waste crafting."
    },
    description: "A charming, eco-friendly soft elephant toy stitched with traditional Gujarati patchwork, tiny beads, and colorful tassels. Made from 100% organic cotton fabrics.",
    specs: {
      dimensions: "6\" H x 7\" L",
      materials: "Cotton Fabric Scraps, Woolen Stuffing, Beads",
      care: "Spot clean with a damp cloth if stained. Air dry."
    },
    stock: 15,
    sales: 185
  },
  {
    id: 7,
    name: "Mirror Work Wall Hanging",
    category: "Home Decor",
    price: 1499,
    rating: 4.8,
    reviews: 28,
    image: "assets/images/wall_hanging.png",
    tag: "Trending",
    isBestSeller: false,
    isTraditionalArt: false,
    isTrending: true,
    isDiscount: false,
    discountPercent: 0,
    artisan: {
      name: "Fatima Bi",
      location: "Bhuj, Kutch, Gujarat",
      bio: "Fatima is a master of Kutchi embroidery, known for its intricate stitches and inclusion of small mirrors that reflect light and ward off evils."
    },
    description: "An exquisite traditional wall hanging (Toran) featuring Kutchi mirror embroidery, beads, and handmade cotton tassels. Perfect to add color to your doorways or accent walls.",
    specs: {
      dimensions: "36\" W x 14\" H",
      materials: "Organic Cotton Canvas, Glass Mirrors, Wool Threads",
      care: "Dry clean only. Handle mirrors carefully."
    },
    stock: 7,
    sales: 112
  },
  {
    id: 8,
    name: "Brass Filigree Hanging Lamp",
    category: "Home Decor",
    price: 2499,
    rating: 4.9,
    reviews: 36,
    image: "assets/images/decorative_lamp.png",
    tag: "Best Seller",
    isBestSeller: true,
    isTraditionalArt: false,
    isTrending: false,
    isDiscount: false,
    discountPercent: 0,
    artisan: {
      name: "Rajesh Kumar",
      location: "Moradabad, Uttar Pradesh",
      bio: "Moradabad is India's Brass City, and Rajesh is an expert in brass sheet filigree engraving, turning brass metal into warm glowing lanterns."
    },
    description: "A premium hanging brass lantern displaying detailed hand-cut filigree carvings. When lit, it casts beautiful, complex geometric patterns across the room.",
    specs: {
      dimensions: "12\" H x 8\" Diameter",
      materials: "Solid Brass Metal",
      care: "Wipe with a soft microfibre cloth. Apply brass polish once a year to preserve shine."
    },
    stock: 5,
    sales: 203
  },
  {
    id: 9,
    name: "Hand-Carved Wooden Elephant",
    category: "Home Decor",
    price: 1899,
    rating: 5.0,
    reviews: 12,
    image: "assets/images/traditional_showpiece.png",
    tag: "Artisan Special",
    isBestSeller: false,
    isTraditionalArt: true,
    isTrending: false,
    isDiscount: false,
    discountPercent: 0,
    artisan: {
      name: "Vikram Acharya",
      location: "Saharanpur, Uttar Pradesh",
      bio: "Vikram specializes in wood undercut carving, a technique where he hollows out a single block of wood to carve a second baby elephant inside the stomach of the main elephant."
    },
    description: "An astonishing undercut wooden elephant showpiece hand-carved out of premium sheesham wood. Includes fine net-like carvings and an inner carved elephant.",
    specs: {
      dimensions: "6\" H x 7\" L x 4\" W",
      materials: "Sheesham Wood (Indian Rosewood)",
      care: "Clean with a soft dry brush. Do not apply water or harsh cleaning solutions."
    },
    stock: 3,
    sales: 42
  },
  {
    id: 10,
    name: "Madhubani Tree of Life Painting",
    category: "Paintings",
    price: 2999,
    rating: 4.8,
    reviews: 14,
    image: "assets/images/nature_painting.png",
    tag: "15% Off",
    isBestSeller: false,
    isTraditionalArt: false,
    isTrending: false,
    isDiscount: true,
    discountPercent: 15,
    artisan: {
      name: "Sujata Devi",
      location: "Madhubani, Bihar",
      bio: "Sujata uses twigs, matchsticks, and fingers to apply natural colors made from turmeric, indigo, and sandalwood onto handmade canvas sheets."
    },
    description: "A traditional Madhubani folk painting depicting the sacred Tree of Life with birds, animals, and floral borders. Hand-painted on handmade paper and framed in a premium wooden frame.",
    specs: {
      dimensions: "12\" x 16\" (Framed)",
      materials: "Handmade Khadi Paper, Acrylics, Dark Teak Wood Frame",
      care: "Keep out of damp areas. Dust frame with a dry cloth."
    },
    stock: 2,
    sales: 34
  },
  {
    id: 11,
    name: "Warli Tribal Art Painting",
    category: "Paintings",
    price: 4999,
    rating: 4.9,
    reviews: 24,
    image: "assets/images/traditional_painting.png",
    tag: "Best Seller",
    isBestSeller: true,
    isTraditionalArt: true,
    isTrending: false,
    isDiscount: false,
    discountPercent: 0,
    artisan: {
      name: "Sanjay Bhoye",
      location: "Jawhar, Maharashtra",
      bio: "Sanjay belongs to the Warli tribe. He paints traditional circles, triangles, and squares on canvas, depicting festive Tarpa dances and daily tribal village activities."
    },
    description: "A classic Warli painting created with white rice paste on an earthen mud canvas backing. Framed elegantly to serve as a striking historical art centerpiece.",
    specs: {
      dimensions: "16\" x 20\" (Framed)",
      materials: "Canvas, Mud/Cowdung coating, Rice Paste, Teak Frame",
      care: "Keep dry. Wipe frame with a soft clean cloth."
    },
    stock: 2,
    sales: 58
  },
  {
    id: 12,
    name: "Gold Foil Canvas Abstract Art",
    category: "Paintings",
    price: 3499,
    rating: 4.7,
    reviews: 19,
    image: "assets/images/canvas_art.png",
    tag: "Modern Fusion",
    isBestSeller: false,
    isTraditionalArt: false,
    isTrending: true,
    isDiscount: false,
    discountPercent: 0,
    artisan: {
      name: "Ananya Roy",
      location: "Kolkata, West Bengal",
      bio: "Ananya blends contemporary modern abstract art styles with traditional Indian motifs and gold foil gilding work."
    },
    description: "A premium modern abstract canvas painting decorated with traditional Indian patterns and gold leaf detailing. Delivers a luxurious gold shimmer in room lighting.",
    specs: {
      dimensions: "18\" x 18\" (Stretched)",
      materials: "Heavy Stretched Cotton Canvas, Acrylics, Gold Leaf Gilding",
      care: "Dust with a soft, clean feather duster. Do not apply liquid cleansers."
    },
    stock: 4,
    sales: 68
  }
];

// --- Safe Local Storage Wrapper to prevent crash under strict privacy/cookie block settings ---
const safeStorage = {
  getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn(`localStorage is not accessible for reading ${key}, falling back to memory.`, e);
      return this._fallbackStorage[key] || null;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`localStorage is not accessible for writing ${key}, falling back to memory.`, e);
      this._fallbackStorage[key] = String(value);
    }
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`localStorage is not accessible for removing ${key}, falling back to memory.`, e);
      delete this._fallbackStorage[key];
    }
  },
  _fallbackStorage: {}
};

// 2. APPLICATION STATE
const state = {
  products: PRODUCTS,
  filteredProducts: [],
  cart: [],
  wishlist: [],
  filters: {
    search: '',
    category: 'all', // Matches data-category on sidebar list items ('all', 'Pottery', 'Handmade Toys', etc.)
    maxPrice: 6000,
    sortBy: 'featured'
  },
  promo: {
    code: '',
    discountPercent: 0
  },
  activeModalProductId: null,
  modalQuantity: 1,
  theme: 'light',
  user: null // Holds simulated user info
};

// 3. DOM ELEMENTS REGISTER
let elements = {};
function initDOMElements() {
  elements = {
    html: document.documentElement,
    body: document.body,
    
    // Header actions
    themeToggle: document.getElementById('theme-toggle'),
    themeToggleHeader: document.getElementById('theme-toggle-header'),
    searchBar: document.getElementById('search-bar'),
    cartCount: document.getElementById('cart-count'),
    cartCountNav: document.getElementById('cart-count-nav'),
    cartToggle: document.getElementById('cart-toggle'),
    cartToggleNav: document.getElementById('cart-toggle-nav'),
    hamburger: document.getElementById('hamburger-menu'),
    navMenu: document.getElementById('nav-menu'),
    navbar: document.querySelector('.navbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Auth elements
    loginToggle: document.getElementById('login-toggle'),
    loginToggleMobile: document.getElementById('login-toggle-mobile'),
    signupToggle: document.getElementById('signup-toggle'),
    signupToggleMobile: document.getElementById('signup-toggle-mobile'),
    loginModal: document.getElementById('login-modal'),
    loginModalClose: document.getElementById('login-modal-close'),
    signupModal: document.getElementById('signup-modal'),
    signupModalClose: document.getElementById('signup-modal-close'),
    loginForm: document.getElementById('login-form'),
    signupForm: document.getElementById('signup-form'),
    loginFeedback: document.getElementById('login-feedback'),
    signupFeedback: document.getElementById('signup-feedback'),
    switchToSignup: document.getElementById('switch-to-signup'),
    switchToLogin: document.getElementById('switch-to-login'),
    
    // Shop Sidebar
    sidebar: document.getElementById('sidebar'),
    sidebarClose: document.getElementById('sidebar-close'),
    sidebarToggle: document.getElementById('sidebar-toggle'),
    mobileFilterOpen: document.getElementById('mobile-filter-open'),
    sidebarCategoryList: document.getElementById('sidebar-category-list'),
    priceSlider: document.getElementById('price-slider'),
    priceSliderValue: document.getElementById('price-slider-value'),
    clearFilters: document.getElementById('clear-filters'),
    sortSelect: document.getElementById('sort-select'),
    catalogCount: document.getElementById('catalog-count'),
    productGrid: document.getElementById('product-grid'),
    mobileItemCount: document.getElementById('mobile-item-count'),
    
    // Cart Side Drawer
    cartDrawer: document.getElementById('cart-drawer'),
    cartClose: document.getElementById('cart-close'),
    drawerBackdrop: document.getElementById('drawer-backdrop'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    promoInput: document.getElementById('promo-input'),
    promoBtn: document.getElementById('promo-btn'),
    promoFeedback: document.getElementById('promo-feedback'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartDiscountRow: document.getElementById('cart-discount-row'),
    cartDiscount: document.getElementById('cart-discount'),
    cartTotal: document.getElementById('cart-total'),
    checkoutBtn: document.getElementById('checkout-btn'),
    
    // Product Quick View Modal
    productModal: document.getElementById('product-modal'),
    productModalClose: document.getElementById('product-modal-close'),
    modalProductImage: document.getElementById('modal-product-image'),
    modalProductCategory: document.getElementById('modal-product-category'),
    modalProductName: document.getElementById('modal-product-name'),
    modalProductArtisan: document.getElementById('modal-product-artisan'),
    modalProductDescription: document.getElementById('modal-product-description'),
    modalSpecsDimensions: document.getElementById('modal-specs-dimensions'),
    modalSpecsMaterials: document.getElementById('modal-specs-materials'),
    modalSpecsCare: document.getElementById('modal-specs-care'),
    modalArtisanBio: document.getElementById('modal-artisan-bio'),
    modalProductPrice: document.getElementById('modal-product-price'),
    modalQtyDec: document.getElementById('modal-qty-dec'),
    modalQtyInc: document.getElementById('modal-qty-inc'),
    modalQtyVal: document.getElementById('modal-qty-val'),
    modalAddBtn: document.getElementById('modal-add-btn'),
    
    // Checkout Modal
    checkoutModal: document.getElementById('checkout-modal'),
    checkoutModalClose: document.getElementById('checkout-modal-close'),
    checkoutForm: document.getElementById('checkout-form'),
    checkoutTotalBtn: document.getElementById('checkout-total-btn'),
    
    // Success Modal
    successModal: document.getElementById('success-modal'),
    successCloseBtn: document.getElementById('success-close-btn'),
    
    // Contact Form
    contactForm: document.getElementById('contact-form'),
    contactFeedback: document.getElementById('contact-feedback'),
    
    // Footer elements
    newsletterForm: document.getElementById('newsletter-form'),
    newsletterInput: document.getElementById('newsletter-email'),
    newsletterFeedback: document.getElementById('newsletter-feedback'),
    
    // Back to top
    backToTopBtn: document.getElementById('back-to-top'),
    
    // Landing pages & stats
    heroShopBtn: document.getElementById('hero-shop-btn'),
    heroExploreBtn: document.getElementById('hero-explore-btn'),
    statsSection: document.getElementById('about-stats')
  };
}

// 4. APPLICATION INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initDOMElements();
  initTheme();
  loadCartFromStorage();
  loadWishlistFromStorage();
  applyFilters();
  setupEventListeners();
  initHeroSlider();
  initTestimonialsCarousel();
  initFAQAccordion();
  initScrollAnimations();
  setupContentProtection();
  checkSessionUser();
  
  // Hide loading spinner with smooth fade out
  const loader = document.getElementById('loading-overlay');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => loader.remove(), 400);
    }, 600);
  }
});

// --- Theme Management ---
function initTheme() {
  const savedTheme = safeStorage.getItem('theme');
  if (savedTheme) {
    state.theme = savedTheme;
  } else {
    state.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  elements.html.setAttribute('data-theme', state.theme);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  elements.html.setAttribute('data-theme', state.theme);
  safeStorage.setItem('theme', state.theme);
  
  // Rotate animation on theme toggle buttons
  const triggers = [elements.themeToggle, elements.themeToggleHeader].filter(Boolean);
  triggers.forEach(trigger => {
    trigger.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      trigger.style.transform = '';
    }, 450);
  });
}

// --- Auth Modal Controllers & Simulated Login State ---
function openLoginModal() {
  closeSignupModal();
  elements.loginModal.classList.add('open');
  elements.drawerBackdrop.classList.add('open');
  elements.html.style.overflow = 'hidden';
}

function closeLoginModal() {
  elements.loginModal.classList.remove('open');
  elements.loginFeedback.textContent = '';
  elements.loginFeedback.className = 'form-feedback';
  if (!elements.signupModal.classList.contains('open') && !elements.cartDrawer.classList.contains('open') && !elements.productModal.classList.contains('open')) {
    elements.drawerBackdrop.classList.remove('open');
    elements.html.style.overflow = '';
  }
}

function openSignupModal() {
  closeLoginModal();
  elements.signupModal.classList.add('open');
  elements.drawerBackdrop.classList.add('open');
  elements.html.style.overflow = 'hidden';
}

function closeSignupModal() {
  elements.signupModal.classList.remove('open');
  elements.signupFeedback.textContent = '';
  elements.signupFeedback.className = 'form-feedback';
  if (!elements.loginModal.classList.contains('open') && !elements.cartDrawer.classList.contains('open') && !elements.productModal.classList.contains('open')) {
    elements.drawerBackdrop.classList.remove('open');
    elements.html.style.overflow = '';
  }
}

function checkSessionUser() {
  const savedUser = safeStorage.getItem('vancraft_user');
  if (savedUser) {
    try {
      state.user = JSON.parse(savedUser);
      updateHeaderUserUI();
    } catch (e) {
      state.user = null;
      safeStorage.removeItem('vancraft_user');
    }
  }
}

function updateHeaderUserUI() {
  if (state.user) {
    const userFirstName = state.user.name.split(' ')[0];
    if (elements.loginToggle) {
      elements.loginToggle.textContent = `Hi, ${userFirstName}`;
      elements.loginToggle.style.pointerEvents = 'none';
      elements.loginToggle.style.backgroundColor = 'var(--bg-secondary)';
    }
    if (elements.signupToggle) {
      elements.signupToggle.textContent = 'Logout';
      elements.signupToggle.onclick = handleLogout;
    }
    if (elements.loginToggleMobile) {
      elements.loginToggleMobile.textContent = `Hi, ${userFirstName}`;
      elements.loginToggleMobile.style.pointerEvents = 'none';
    }
    if (elements.signupToggleMobile) {
      elements.signupToggleMobile.textContent = 'Logout';
      elements.signupToggleMobile.onclick = handleLogout;
    }
  } else {
    if (elements.loginToggle) {
      elements.loginToggle.textContent = 'Login';
      elements.loginToggle.style.pointerEvents = 'auto';
      elements.loginToggle.style.backgroundColor = '';
    }
    if (elements.signupToggle) {
      elements.signupToggle.textContent = 'Sign Up';
      elements.signupToggle.onclick = openSignupModal;
    }
    if (elements.loginToggleMobile) {
      elements.loginToggleMobile.textContent = 'Login';
      elements.loginToggleMobile.style.pointerEvents = 'auto';
    }
    if (elements.signupToggleMobile) {
      elements.signupToggleMobile.textContent = 'Sign Up';
      elements.signupToggleMobile.onclick = openSignupModal;
    }
  }
}

function handleLogout() {
  state.user = null;
  safeStorage.removeItem('vancraft_user');
  updateHeaderUserUI();
  showToast('Logged out successfully.', 'success');
}

// --- Cart Operations ---
function loadCartFromStorage() {
  const savedCart = safeStorage.getItem('cart');
  if (savedCart) {
    try {
      const parsed = JSON.parse(savedCart);
      state.cart = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      state.cart = [];
    }
  }
  updateCartUI();
}

function saveCartToStorage() {
  safeStorage.setItem('cart', JSON.stringify(state.cart));
  updateCartUI();
}

function addToCart(productId, quantity = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      showToast(`Sorry, only ${product.stock} items are available in stock.`, 'error');
      existingItem.quantity = product.stock;
    } else {
      existingItem.quantity += quantity;
      showToast(`Item Added Successfully! Quantity updated.`, 'success');
    }
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: Math.min(quantity, product.stock)
    });
    showToast(`Item Added Successfully!`, 'success');
  }
  
  saveCartToStorage();
  
  // Pop animation on badges
  [elements.cartCount, elements.cartCountNav].forEach(badge => {
    if (badge) {
      badge.style.animation = 'none';
      void badge.offsetWidth; // Reflow trigger
      badge.style.animation = 'popBadge 0.4s ease-out';
    }
  });
  
  openCartDrawer();
}

function updateCartItemQuantity(productId, newQty) {
  const itemIndex = state.cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;
  
  const product = state.products.find(p => p.id === productId);
  
  if (newQty <= 0) {
    state.cart.splice(itemIndex, 1);
    showToast("Item removed from cart.", "success");
  } else if (product && newQty > product.stock) {
    showToast(`Only ${product.stock} units are currently available.`, "warning");
    state.cart[itemIndex].quantity = product.stock;
  } else {
    state.cart[itemIndex].quantity = newQty;
  }
  saveCartToStorage();
}

function removeCartItem(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  showToast("Item removed from cart.", "success");
  saveCartToStorage();
}

function calculateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal * (state.promo.discountPercent / 100);
  const total = Math.max(0, subtotal - discount);
  
  return {
    subtotal: subtotal,
    discount: discount,
    total: total
  };
}

function updateCartUI() {
  const totalItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Sync all header count badges
  [elements.cartCount, elements.cartCountNav].forEach(badge => {
    if (badge) {
      badge.textContent = totalItemsCount;
      badge.style.display = totalItemsCount > 0 ? 'flex' : 'none';
    }
  });
  
  // Populate drawer listing
  if (state.cart.length === 0) {
    elements.cartItemsContainer.innerHTML = `
      <div class="cart-empty-state" style="text-align:center; padding: 40px 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 16px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <p style="font-weight:700; color:var(--text-primary);">Your cart is currently empty</p>
        <span style="font-size: 13px; margin-top: 6px; color: var(--text-muted); display:block;">Explore our beautiful Indian craft collections!</span>
      </div>
    `;
    elements.checkoutBtn.disabled = true;
    elements.checkoutBtn.style.opacity = 0.5;
  } else {
    elements.checkoutBtn.disabled = false;
    elements.checkoutBtn.style.opacity = 1;
    elements.cartItemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item" style="display:flex; gap:16px; margin-bottom:20px; padding-bottom:16px; border-bottom:1px solid var(--border-color);">
        <div style="position: relative; width: 80px; height: 80px; flex-shrink: 0;">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width:100%; height:100%; object-fit:cover; border-radius:var(--radius-md);" ondragstart="return false;">
          <div class="image-watermark-overlay-sm" style="font-size:8px; opacity:0.6;">VanCraft</div>
        </div>
        <div class="cart-item-details" style="flex-grow:1; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="cart-item-name" style="font-size:14px; font-weight:700; color:var(--text-primary);">${item.name}</div>
            <div class="cart-item-category" style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:600;">${item.category}</div>
          </div>
          <div class="cart-item-controls" style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
            <div class="quantity-picker" style="display:flex; align-items:center; border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow:hidden;">
              <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity - 1})" style="width:24px; height:28px; background:var(--bg-secondary); font-weight:700;">-</button>
              <div class="qty-val" style="width:28px; text-align:center; font-size:13px; font-weight:700;">${item.quantity}</div>
              <button class="qty-btn" onclick="updateQty(${item.id}, ${item.quantity + 1})" style="width:24px; height:28px; background:var(--bg-secondary); font-weight:700;">+</button>
            </div>
            <div class="cart-item-price" style="font-size:14px; font-weight:700; color:var(--accent-color);">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
          </div>
          <div style="margin-top: 8px; text-align: right;">
            <span class="remove-cart-item" onclick="removeItem(${item.id})" style="font-size:12px; color:var(--error-color); cursor:pointer; font-weight:600; text-decoration:underline;">Remove</span>
          </div>
        </div>
      </div>
    `).join('');
  }
  
  const totals = calculateCartTotals();
  elements.cartSubtotal.textContent = `₹${totals.subtotal.toLocaleString('en-IN')}`;
  elements.cartTotal.textContent = `₹${totals.total.toLocaleString('en-IN')}`;
  
  if (state.promo.discountPercent > 0) {
    elements.cartDiscountRow.style.display = 'flex';
    elements.cartDiscount.textContent = `-₹${totals.discount.toLocaleString('en-IN')}`;
    elements.cartDiscountRow.querySelector('span:first-child').textContent = `Discount (${state.promo.discountPercent}%)`;
  } else {
    elements.cartDiscountRow.style.display = 'none';
  }
}

// Bind globally for inline triggers
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.openProductModal = openProductModal;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.updateQty = updateCartItemQuantity;
window.removeItem = removeCartItem;

// --- Wishlist Management ---
function loadWishlistFromStorage() {
  const savedWishlist = safeStorage.getItem('wishlist');
  if (savedWishlist) {
    try {
      const parsed = JSON.parse(savedWishlist);
      state.wishlist = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      state.wishlist = [];
    }
  }
}

function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const p = state.products.find(prod => prod.id === productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed ${p.name} from wishlist.`, 'success');
  } else {
    state.wishlist.push(productId);
    showToast(`Saved ${p.name} to wishlist!`, 'success');
  }
  safeStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  
  // Re-render catalog to sync hearts states
  renderCatalog();
}
// Bind globally for toggleWishlist is done above

// --- Filters & Catalog Rendering ---
function applyFilters() {
  let results = [...state.products];
  
  // 1. Sidebar/Categories filter
  const category = state.filters.category;
  if (category && category !== 'all') {
    if (category === 'Best Sellers') {
      results = results.filter(p => p.isBestSeller);
    } else if (category === 'Trending Products') {
      results = results.filter(p => p.isTrending);
    } else if (category === 'Discount Items') {
      results = results.filter(p => p.isDiscount);
    } else if (category === 'Traditional Art') {
      results = results.filter(p => p.isTraditionalArt);
    } else {
      results = results.filter(p => p.category === category);
    }
  }
  
  // 2. Search Query
  if (state.filters.search) {
    const query = state.filters.search.toLowerCase().trim();
    results = results.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.artisan.name.toLowerCase().includes(query) ||
      p.artisan.location.toLowerCase().includes(query)
    );
  }
  
  // 3. Price Filter Slider
  results = results.filter(p => p.price <= state.filters.maxPrice);
  
  // 4. Sorting Options
  if (state.filters.sortBy === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (state.filters.sortBy === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (state.filters.sortBy === 'best-selling') {
    results.sort((a, b) => b.sales - a.sales);
  } else {
    // Featured default ordering
    results.sort((a, b) => a.id - b.id);
  }
  
  state.filteredProducts = results;
  renderCatalog();
}

// Visual category click selector (called by categories showcase section)
window.selectCategory = (categoryName) => {
  state.filters.category = categoryName;
  
  // Update sidebar list highlights
  const categoryItems = document.querySelectorAll('#sidebar-category-list .category-item');
  categoryItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-category') === categoryName) {
      item.classList.add('active');
    }
  });
  
  applyFilters();
  scrollToSection('shop');
};

function renderCatalog() {
  const count = state.filteredProducts.length;
  elements.catalogCount.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
  elements.mobileItemCount.textContent = `${count} product${count !== 1 ? 's' : ''}`;
  
  if (count === 0) {
    elements.productGrid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1; text-align:center; padding:60px 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 48px; height: 48px; color: var(--text-muted); margin:0 auto 16px auto;"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        <h3 style="font-family: var(--font-serif); font-size:20px; color: var(--text-primary); margin-bottom:8px;">No crafts discovered</h3>
        <p style="color:var(--text-muted); font-size:14px;">Try resetting filters or expanding search parameters.</p>
      </div>
    `;
    elements.productGrid.style.display = 'grid';
    return;
  }
  
  // Check if we are displaying standard filtered list OR grouped homepage sections
  // We display grouped sections ONLY if category is 'all' and no active search or filter inputs are modified
  const isDefaultView = state.filters.category === 'all' && 
                        state.filters.search === '' && 
                        state.filters.maxPrice === 6000 && 
                        state.filters.sortBy === 'featured';
                        
  if (isDefaultView) {
    elements.productGrid.style.display = 'block'; // Block wrapper to contain sub-sections
    
    // Group products by 4 main categories
    const categories = ["Pottery", "Handmade Toys", "Home Decor", "Paintings"];
    let htmlContent = "";
    
    categories.forEach((cat, index) => {
      const catProducts = state.products.filter(p => p.category === cat);
      if (index > 0) {
        htmlContent += `<div class="section-separator"></div>`;
      }
      
      htmlContent += `
        <div class="category-block" style="margin-bottom: 32px;">
          <h2 class="category-section-title">${cat}</h2>
          <div class="category-grid-inner" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 32px;">
            ${catProducts.map(p => renderProductCardHTML(p)).join('')}
          </div>
        </div>
      `;
    });
    
    elements.productGrid.innerHTML = htmlContent;
  } else {
    // Normal single unified grid view
    elements.productGrid.style.display = 'grid';
    elements.productGrid.innerHTML = state.filteredProducts.map(p => renderProductCardHTML(p)).join('');
  }
}

// Product Card HTML generator helper
function renderProductCardHTML(p) {
  const isWished = state.wishlist.includes(p.id);
  const formattedPrice = p.price.toLocaleString('en-IN');
  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-image-wrapper">
        ${p.tag ? `<div class="product-badge ${p.tag === 'Best Seller' ? 'best-seller' : ''}">${p.tag}</div>` : ''}
        <div class="wishlist-btn-container">
          <button class="wishlist-btn ${isWished ? 'active' : ''}" onclick="toggleWishlist(${p.id})" aria-label="Toggle wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isWished ? 'var(--accent-color)' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <img src="${p.image}" alt="${p.name}" loading="lazy" class="product-image" ondragstart="return false;">
        <div class="image-watermark-overlay">VanCraft Store</div>
        <div class="quick-view-overlay">
          <button class="btn quick-view-btn" onclick="openProductModal(${p.id})" style="font-weight:700;">Quick View</button>
        </div>
      </div>
      <div class="product-card-details">
        <div class="product-card-category">${p.category}</div>
        <h3 class="product-card-title" onclick="openProductModal(${p.id})">${p.name}</h3>
        <div class="product-rating">
          <svg class="rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:14px; height:14px; fill:var(--accent-secondary);"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          <span class="rating-text">${p.rating}</span>
          <span class="rating-count">(${p.reviews} reviews)</span>
        </div>
        <p class="product-card-desc-snippet">${p.description.substring(0, 75)}...</p>
        <div class="product-card-footer">
          <div class="product-price">₹${formattedPrice}</div>
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})" aria-label="Add to cart" style="border-radius: var(--radius-sm); width:36px; height:36px; background:var(--accent-color); color:var(--text-white); display:flex; align-items:center; justify-content:center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:18px; height:18px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

// --- Product Modal Interface (Quick View) ---
function openProductModal(productId) {
  const p = state.products.find(prod => prod.id === productId);
  if (!p) return;
  
  state.activeModalProductId = productId;
  state.modalQuantity = 1;
  elements.modalQtyVal.textContent = 1;
  
  elements.modalProductImage.src = p.image;
  elements.modalProductImage.alt = p.name;
  elements.modalProductCategory.textContent = p.category;
  elements.modalProductName.textContent = p.name;
  elements.modalProductPrice.textContent = `₹${p.price.toLocaleString('en-IN')}`;
  elements.modalProductDescription.textContent = p.description;
  
  elements.modalProductArtisan.innerHTML = `
    <span>By <mark>${p.artisan.name}</mark> &bull; ${p.artisan.location}</span>
  `;
  
  elements.modalSpecsDimensions.innerHTML = `<strong>Dimensions:</strong> ${p.specs.dimensions}`;
  elements.modalSpecsMaterials.innerHTML = `<strong>Materials:</strong> ${p.specs.materials}`;
  elements.modalSpecsCare.innerHTML = `<strong>Care:</strong> ${p.specs.care}`;
  
  elements.modalArtisanBio.innerHTML = `
    <p style="font-weight:700; margin-bottom:6px; color:var(--text-primary);">${p.artisan.name}</p>
    <p style="font-style:italic;">"${p.artisan.bio}"</p>
  `;
  
  // Revert specs tab to active
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(cont => cont.classList.remove('active'));
  document.querySelector('.tab-btn[data-tab="tab-specs"]').classList.add('active');
  document.getElementById('tab-specs').classList.add('active');
  
  elements.productModal.classList.add('open');
  elements.drawerBackdrop.classList.add('open');
  elements.html.style.overflow = 'hidden';
}

function closeProductModal() {
  elements.productModal.classList.remove('open');
  state.activeModalProductId = null;
  
  if (!elements.cartDrawer.classList.contains('open') && !elements.checkoutModal.classList.contains('open') && !elements.sidebar.classList.contains('open') && !elements.loginModal.classList.contains('open') && !elements.signupModal.classList.contains('open')) {
    elements.drawerBackdrop.classList.remove('open');
    elements.html.style.overflow = '';
  }
}
// Bind globally is done above

// --- Drawers / Sidebars UI Triggers ---
function openCartDrawer() {
  elements.cartDrawer.classList.add('open');
  elements.drawerBackdrop.classList.add('open');
  elements.html.style.overflow = 'hidden';
}

function closeCartDrawer() {
  elements.cartDrawer.classList.remove('open');
  
  if (!elements.productModal.classList.contains('open') && !elements.checkoutModal.classList.contains('open') && !elements.sidebar.classList.contains('open') && !elements.loginModal.classList.contains('open') && !elements.signupModal.classList.contains('open')) {
    elements.drawerBackdrop.classList.remove('open');
    elements.html.style.overflow = '';
  }
}

function toggleSidebar() {
  elements.sidebar.classList.toggle('collapsed');
  elements.productGrid.parentElement.classList.toggle('sidebar-collapsed');
}

function openMobileSidebar() {
  elements.sidebar.classList.add('open');
  elements.drawerBackdrop.classList.add('open');
  elements.html.style.overflow = 'hidden';
}

function closeMobileSidebar() {
  elements.sidebar.classList.remove('open');
  if (!elements.cartDrawer.classList.contains('open') && !elements.productModal.classList.contains('open')) {
    elements.drawerBackdrop.classList.remove('open');
    elements.html.style.overflow = '';
  }
}

// --- Checkout Modal Functions ---
function openCheckoutModal() {
  if (state.cart.length === 0) return;
  closeCartDrawer();
  
  const totals = calculateCartTotals();
  elements.checkoutTotalBtn.textContent = `₹${totals.total.toLocaleString('en-IN')}`;
  
  elements.checkoutModal.classList.add('open');
  elements.drawerBackdrop.classList.add('open');
  elements.html.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  elements.checkoutModal.classList.remove('open');
  
  if (!elements.productModal.classList.contains('open') && !elements.successModal.classList.contains('open')) {
    elements.drawerBackdrop.classList.remove('open');
    elements.html.style.overflow = '';
  }
}

function placeSimulatedOrder() {
  elements.checkoutModal.classList.remove('open');
  
  // Wipe cart details
  state.cart = [];
  state.promo.code = '';
  state.promo.discountPercent = 0;
  elements.promoInput.value = '';
  elements.promoFeedback.style.display = 'none';
  saveCartToStorage();
  
  // Show confirmation success modal
  elements.successModal.classList.add('open');
  elements.drawerBackdrop.classList.add('open');
  elements.html.style.overflow = 'hidden';
}

function closeSuccessModal() {
  elements.successModal.classList.remove('open');
  elements.drawerBackdrop.classList.remove('open');
  elements.html.style.overflow = '';
}

// --- Event Listeners Mapping ---
function setupEventListeners() {
  // Theme Toggles
  if (elements.themeToggle) elements.themeToggle.addEventListener('click', toggleTheme);
  if (elements.themeToggleHeader) elements.themeToggleHeader.addEventListener('click', toggleTheme);
  
  // Login / Signup Toggle Modals Triggers
  if (elements.loginToggle) elements.loginToggle.addEventListener('click', openLoginModal);
  if (elements.loginToggleMobile) elements.loginToggleMobile.addEventListener('click', openLoginModal);
  if (elements.signupToggle) elements.signupToggle.addEventListener('click', openSignupModal);
  if (elements.signupToggleMobile) elements.signupToggleMobile.addEventListener('click', openSignupModal);
  
  if (elements.loginModalClose) elements.loginModalClose.addEventListener('click', closeLoginModal);
  if (elements.signupModalClose) elements.signupModalClose.addEventListener('click', closeSignupModal);
  
  if (elements.switchToSignup) elements.switchToSignup.addEventListener('click', openSignupModal);
  if (elements.switchToLogin) elements.switchToLogin.addEventListener('click', openLoginModal);
  
  // Login Form Submission
  if (elements.loginForm) {
    elements.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-password').value;
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        elements.loginFeedback.textContent = 'Please enter a valid email address.';
        elements.loginFeedback.className = 'form-feedback error';
        return;
      }
      if (pass.length < 6) {
        elements.loginFeedback.textContent = 'Password must be at least 6 characters.';
        elements.loginFeedback.className = 'form-feedback error';
        return;
      }
      
      // Simulate login success
      state.user = { name: email.split('@')[0], email: email };
      safeStorage.setItem('vancraft_user', JSON.stringify(state.user));
      updateHeaderUserUI();
      closeLoginModal();
      showToast('Logged in successfully!', 'success');
    });
  }
  
  // Signup Form Submission
  if (elements.signupForm) {
    elements.signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const pass = document.getElementById('signup-password').value;
      
      if (name.length < 2) {
        elements.signupFeedback.textContent = 'Name must be at least 2 characters.';
        elements.signupFeedback.className = 'form-feedback error';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        elements.signupFeedback.textContent = 'Please enter a valid email address.';
        elements.signupFeedback.className = 'form-feedback error';
        return;
      }
      if (pass.length < 6) {
        elements.signupFeedback.textContent = 'Password must be at least 6 characters.';
        elements.signupFeedback.className = 'form-feedback error';
        return;
      }
      
      // Simulate signup success
      state.user = { name: name, email: email };
      safeStorage.setItem('vancraft_user', JSON.stringify(state.user));
      updateHeaderUserUI();
      closeSignupModal();
      showToast('Account created successfully!', 'success');
    });
  }
  
  // Hamburger Menu
  if (elements.hamburger) {
    elements.hamburger.addEventListener('click', () => {
      elements.hamburger.classList.toggle('active');
      elements.navMenu.classList.toggle('open');
      elements.body.classList.toggle('nav-open');
    });
  }
  
  // Close hamburger menu on link clicks
  elements.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (elements.hamburger) elements.hamburger.classList.remove('active');
      if (elements.navMenu) elements.navMenu.classList.remove('open');
      elements.body.classList.remove('nav-open');
      
      // Special routing if linking to Best Sellers
      const href = link.getAttribute('href');
      if (href === '#best-sellers-anchor') {
        e.preventDefault();
        selectCategory('Best Sellers');
      }
    });
  });
  
  // Live search
  if (elements.searchBar) {
    elements.searchBar.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      applyFilters();
    });
  }
  
  // Price range slider
  if (elements.priceSlider) {
    elements.priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      state.filters.maxPrice = val;
      elements.priceSliderValue.textContent = `₹${val.toLocaleString('en-IN')}`;
      applyFilters();
    });
  }
  
  // Click category sidebar list filters
  if (elements.sidebarCategoryList) {
    const listItems = elements.sidebarCategoryList.querySelectorAll('.category-item');
    listItems.forEach(item => {
      item.addEventListener('click', () => {
        listItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        state.filters.category = item.getAttribute('data-category');
        applyFilters();
      });
    });
  }
  
  // Sort selection
  if (elements.sortSelect) {
    elements.sortSelect.addEventListener('change', (e) => {
      state.filters.sortBy = e.target.value;
      applyFilters();
    });
  }
  
  // Reset Filters click
  if (elements.clearFilters) {
    elements.clearFilters.addEventListener('click', () => {
      state.filters.search = '';
      state.filters.maxPrice = 6000;
      state.filters.sortBy = 'featured';
      state.filters.category = 'all';
      
      if (elements.searchBar) elements.searchBar.value = '';
      if (elements.priceSlider) {
        elements.priceSlider.value = 6000;
        elements.priceSliderValue.textContent = '₹6,000';
      }
      if (elements.sortSelect) elements.sortSelect.value = 'featured';
      
      const listItems = elements.sidebarCategoryList.querySelectorAll('.category-item');
      listItems.forEach(i => i.classList.remove('active'));
      elements.sidebarCategoryList.querySelector('[data-category="all"]').classList.add('active');
      
      applyFilters();
      showToast("Filters reset successfully.", "success");
    });
  }
  
  // Sidebar toggles
  if (elements.sidebarToggle) elements.sidebarToggle.addEventListener('click', toggleSidebar);
  if (elements.mobileFilterOpen) elements.mobileFilterOpen.addEventListener('click', openMobileSidebar);
  if (elements.sidebarClose) elements.sidebarClose.addEventListener('click', closeMobileSidebar);
  
  // Cart drawer triggers
  if (elements.cartToggle) elements.cartToggle.addEventListener('click', openCartDrawer);
  if (elements.cartToggleNav) elements.cartToggleNav.addEventListener('click', openCartDrawer);
  if (elements.cartClose) elements.cartClose.addEventListener('click', closeCartDrawer);
  
  // Backdrop overlay click close all overlay structures
  if (elements.drawerBackdrop) {
    elements.drawerBackdrop.addEventListener('click', () => {
      closeCartDrawer();
      closeProductModal();
      closeCheckoutModal();
      closeSuccessModal();
      closeMobileSidebar();
      closeLoginModal();
      closeSignupModal();
    });
  }
  
  // Tabs switcher in product detail modal
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(tabName).classList.add('active');
    });
  });
  
  // Modal Quantity picker controllers
  if (elements.modalQtyDec) {
    elements.modalQtyDec.addEventListener('click', () => {
      if (state.modalQuantity > 1) {
        state.modalQuantity--;
        elements.modalQtyVal.textContent = state.modalQuantity;
      }
    });
  }
  
  if (elements.modalQtyInc) {
    elements.modalQtyInc.addEventListener('click', () => {
      const product = state.products.find(p => p.id === state.activeModalProductId);
      if (product && state.modalQuantity < product.stock) {
        state.modalQuantity++;
        elements.modalQtyVal.textContent = state.modalQuantity;
      } else if (product) {
        showToast(`Only ${product.stock} units are currently in stock.`, "warning");
      }
    });
  }
  
  // Add to cart inside Quick View modal
  if (elements.modalAddBtn) {
    elements.modalAddBtn.addEventListener('click', () => {
      if (state.activeModalProductId) {
        addToCart(state.activeModalProductId, state.modalQuantity);
        closeProductModal();
      }
    });
  }
  
  // Close modals
  if (elements.productModalClose) elements.productModalClose.addEventListener('click', closeProductModal);
  if (elements.checkoutModalClose) elements.checkoutModalClose.addEventListener('click', closeCheckoutModal);
  
  // Promo coupons logic
  if (elements.promoBtn) {
    elements.promoBtn.addEventListener('click', () => {
      const code = elements.promoInput.value.toUpperCase().trim();
      if (!code) return;
      
      if (code === 'VANCRAFT10') {
        state.promo.code = 'VANCRAFT10';
        state.promo.discountPercent = 10;
        elements.promoFeedback.textContent = 'Promo code "VANCRAFT10" applied! (10% Off)';
        elements.promoFeedback.className = 'promo-feedback success';
        updateCartUI();
        showToast('Promo code applied successfully!', 'success');
      } else if (code === 'WELCOME20') {
        state.promo.code = 'WELCOME20';
        state.promo.discountPercent = 20;
        elements.promoFeedback.textContent = 'Welcome code applied! (20% Off)';
        elements.promoFeedback.className = 'promo-feedback success';
        updateCartUI();
        showToast('Welcome code applied successfully!', 'success');
      } else {
        elements.promoFeedback.textContent = 'Invalid coupon code.';
        elements.promoFeedback.className = 'promo-feedback error';
        showToast('Invalid coupon code.', 'error');
      }
    });
  }
  
  // Cart drawer checkout click
  if (elements.checkoutBtn) elements.checkoutBtn.addEventListener('click', openCheckoutModal);
  
  // Checkout Form Submission
  if (elements.checkoutForm) {
    elements.checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = elements.checkoutForm.querySelector('.place-order-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing Secure Payment...';
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Place Secure Order';
        elements.checkoutForm.reset();
        placeSimulatedOrder();
      }, 1800);
    });
  }
  
  if (elements.successCloseBtn) elements.successCloseBtn.addEventListener('click', closeSuccessModal);
  
  // Contact Form Validation
  if (elements.contactForm) {
    elements.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[0-9+()-\s]{7,15}$/;
      
      let errors = [];
      if (name.length < 2) errors.push("Name must be at least 2 characters.");
      if (!emailPattern.test(email)) errors.push("Please enter a valid email address.");
      if (phone && !phonePattern.test(phone)) errors.push("Please enter a valid phone number.");
      if (message.length < 10) errors.push("Message must be at least 10 characters.");
      
      if (errors.length > 0) {
        elements.contactFeedback.innerHTML = `<ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>`;
        elements.contactFeedback.className = "form-feedback error";
        showToast("Please fix the validation errors in the form.", "error");
        return;
      }
      
      const submitBtn = elements.contactForm.querySelector('.btn-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        elements.contactForm.reset();
        elements.contactFeedback.innerHTML = "Thank you! Your message has been sent successfully. We will get back to you within 24 hours.";
        elements.contactFeedback.className = "form-feedback success";
        showToast("Message sent successfully!", "success");
      }, 1200);
    });
  }
  
  // Footer Newsletter form
  if (elements.newsletterForm) {
    elements.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = elements.newsletterInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        elements.newsletterFeedback.textContent = "Please enter a valid email.";
        elements.newsletterFeedback.className = "newsletter-feedback error";
        return;
      }
      
      elements.newsletterFeedback.textContent = "Subscribed successfully! Thank you.";
      elements.newsletterFeedback.className = "newsletter-feedback success";
      elements.newsletterInput.value = '';
      showToast("Thank you for subscribing!", "success");
      setTimeout(() => {
        elements.newsletterFeedback.textContent = '';
      }, 4000);
    });
  }
  
  // Back to Top button scrolling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      elements.backToTopBtn.classList.add('visible');
    } else {
      elements.backToTopBtn.classList.remove('visible');
    }
  });
  
  if (elements.backToTopBtn) {
    elements.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Hero CTA clicks scroll transitions
  if (elements.heroShopBtn) {
    elements.heroShopBtn.addEventListener('click', () => {
      scrollToSection('shop');
    });
  }
  if (elements.heroExploreBtn) {
    elements.heroExploreBtn.addEventListener('click', () => {
      scrollToSection('categories-anchor');
    });
  }
}

// Scroll to section smoothly helper with navbar sticky offset
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  
  const offset = elements.navbar ? elements.navbar.offsetHeight : 80;
  const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// --- Hero Banner Auto-Slider ---
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;
  
  let currentSlideIndex = 0;
  setInterval(() => {
    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add('active');
  }, 4000);
}

// --- Testimonials Slider Carousel ---
function initTestimonialsCarousel() {
  const slider = document.querySelector('.testimonials-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (!slider || slides.length === 0) return;
  
  let currentSlide = 0;
  let autoPlayTimer;
  
  // Setup indicators dots
  dotsContainer.innerHTML = Array.from({ length: slides.length }).map((_, i) => `
    <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i+1}"></button>
  `).join('');
  
  const dots = dotsContainer.querySelectorAll('.carousel-dot');
  
  function updateSlides() {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
      slide.classList.toggle('active', i === currentSlide);
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }
  
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, 5000);
  }
  
  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }
  
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentSlide = parseInt(e.target.getAttribute('data-index'));
      updateSlides();
      startAutoPlay();
    });
  });
  
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);
  
  updateSlides();
  startAutoPlay();
}

// --- FAQ Accordion Logic ---
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });
      
      if (!isOpen) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// --- Scroll Spy & reveal animations ---
function initScrollAnimations() {
  const sections = document.querySelectorAll('section, main');
  
  window.addEventListener('scroll', () => {
    let currentActiveId = '';
    const scrollPos = window.scrollY + (elements.navbar ? elements.navbar.offsetHeight : 80) + 50;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActiveId = section.getAttribute('id');
      }
    });
    
    elements.navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentActiveId}` || (href === '#' && currentActiveId === 'hero')) {
        link.classList.add('active');
      }
    });
  });
  
  // reveal on scroll observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // stats counting up trigger
  let statsAnimated = false;
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateCounters();
    }
  }, { threshold: 0.5 });
  
  if (elements.statsSection) {
    statsObserver.observe(elements.statsSection);
  }
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1800; // ms
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const val = Math.floor(easedProgress * target);
      
      counter.textContent = val.toLocaleString() + '+';
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString() + '+';
      }
    }
    
    requestAnimationFrame(updateCounter);
  });
}

// --- Content Protection Utilities ---
function setupContentProtection() {
  // Prevent right click context menu on product media
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('image-watermark-overlay') || e.target.closest('.product-image-wrapper')) {
      e.preventDefault();
      showToast("Image protection enabled. Right-click is disabled on product media.", "warning");
    }
  });
  
  // Prevent image drag
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  });
}

// Custom Premium Toast Notification system
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '';
  if (type === 'success') {
    icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    // Warning
    icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
  }
  
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-message">${message}</div>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => toast.classList.add('visible'), 50);
  
  // Dismiss animation
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
window.showToast = showToast;
