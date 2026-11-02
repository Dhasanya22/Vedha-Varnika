const LOGO_SRC = "Image/Logo.jpeg";
const HERO_AUTOPLAY_MS = 10000;

function ensureAuthModal() {
  if (document.querySelector("#authModal")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="auth-modal" id="authModal" aria-hidden="true" inert>
        <div class="auth-modal-backdrop" data-close-auth></div>
        <section class="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="authModalTitle">
          <button class="icon-button auth-close" type="button" data-close-auth aria-label="Close login popup">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <img class="auth-logo" src="${LOGO_SRC}" alt="Vedha Varnika - Art Meets Tradition" />
          <div>
            <p class="section-kicker">Demo Customer Access</p>
            <h2 id="authModalTitle">Login or Register</h2>
          </div>
          <div class="account-status" id="authModalStatus"></div>
          <div class="profile-actions" id="profileActions" hidden>
            <a href="track.html">Track Orders</a>
            <a href="wishlist.html">Wishlist</a>
            <a href="checkout.html">Checkout</a>
          </div>
          <p class="demo-auth-note">
            Prototype access is simulated in this browser. Passwords are neither stored nor verified;
            any 8+ character password is accepted for a registered email. Do not use a real password.
            Production authentication, payments, order tracking, and email require a protected backend.
          </p>
          <div class="auth-tabs" role="tablist" aria-label="Account forms">
            <button class="text-button is-active" type="button" data-auth-panel="login">Login</button>
            <button class="text-button" type="button" data-auth-panel="register">Register</button>
          </div>
          <form class="auth-form" id="loginForm">
            <label>
              Email
              <input name="email" type="email" autocomplete="email" required />
            </label>
            <label>
              Password
              <input name="password" type="password" autocomplete="current-password" required />
            </label>
            <button class="button-primary" type="submit">Login</button>
          </form>
          <form class="auth-form" id="registerForm" hidden>
            <label>
              Full Name
              <input name="name" type="text" autocomplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autocomplete="email" required />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" autocomplete="tel" required />
            </label>
            <label>
              Password
              <input name="password" type="password" autocomplete="new-password" minlength="8" required />
            </label>
            <label>
              Confirm Password
              <input name="confirmPassword" type="password" autocomplete="new-password" minlength="8" required />
            </label>
            <button class="button-primary" type="submit">Create Account</button>
          </form>
          <button class="button-secondary" type="button" id="logoutButton" hidden>Logout</button>
          <p class="form-note" id="authMessage" role="status"></p>
        </section>
      </div>
    `,
  );
}

ensureAuthModal();

function ensureProfileMenu() {
  const navShell = document.querySelector(".nav-shell");
  if (!navShell || document.querySelector("#profileMenu")) return;
  navShell.insertAdjacentHTML(
    "beforeend",
    `<div class="profile-menu" id="profileMenu" hidden></div>`,
  );
}

ensureProfileMenu();

function ensureStoreFeedback() {
  if (document.querySelector("#storeFeedback")) return;
  document.body.insertAdjacentHTML("afterbegin", '<p class="visually-hidden" id="storeFeedback" role="status" aria-live="polite"></p>');
}

ensureStoreFeedback();

const IMAGES = {
  blush: "assets/product-blush.png",
  ivory: "assets/product-ivory.png",
  sage: "assets/product-sage.png",
  dress: "assets/product-dress.png",
  wine: "assets/product-wine.png",
  rose: "assets/product-rose.png",
};

const DEFAULT_PRODUCTS = [
  {
    id: "kurti-blush",
    name: "Blush Handblock Kurti",
    category: "Kurtis",
    price: 1299,
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    image: IMAGES.blush,
    gallery: [IMAGES.blush, IMAGES.ivory, IMAGES.sage],
    description:
      "A soft cotton kurti with delicate floral print, gentle neckline detail, and an easy everyday fit.",
    details: "Handblock-inspired floral print, breathable cotton, side slits, and a relaxed straight silhouette.",
    material: "Cotton",
    color: "Muted Blush",
    badge: "Featured",
    featured: true,
    isNew: true,
    bestseller: true,
  },
  {
    id: "co-ord-sage",
    name: "Sage Co-ord Set",
    category: "Co-ord Sets",
    price: 2299,
    sizes: ["S", "M", "L", "XL"],
    stock: 9,
    image: IMAGES.sage,
    gallery: [IMAGES.sage, IMAGES.blush, IMAGES.ivory],
    description:
      "A relaxed two-piece set with refined embroidery notes and a composed festive-to-work silhouette.",
    details: "Includes a coordinated tunic and trousers with a polished fit for repeat occasion wear.",
    material: "Rayon blend",
    color: "Sage",
    badge: "New",
    featured: true,
    isNew: true,
    bestseller: false,
  },
  {
    id: "dress-ivory",
    name: "Ivory Gathered Dress",
    category: "Dresses",
    price: 2499,
    sizes: ["XS", "S", "M", "L"],
    stock: 7,
    image: IMAGES.dress,
    gallery: [IMAGES.dress, IMAGES.ivory, IMAGES.blush],
    description:
      "A floaty ivory dress with gathered volume, subtle sleeve shaping, and graceful movement.",
    details: "Lightweight occasion dress with a lined body, soft gathers, and a sweeping midi length.",
    material: "Viscose blend",
    color: "Ivory",
    badge: "Bestseller",
    featured: true,
    isNew: false,
    bestseller: true,
  },
  {
    id: "top-wine",
    name: "Wine Embroidered Top",
    category: "Tops",
    price: 1599,
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 13,
    image: IMAGES.wine,
    gallery: [IMAGES.wine, IMAGES.blush, IMAGES.dress],
    description:
      "A rich wine-toned top with traditional embroidery, made for denim days and festive evenings.",
    details: "Soft neckline embroidery, easy sleeves, and a hip-length shape that layers beautifully.",
    material: "Cotton silk",
    color: "Wine",
    badge: "Festive",
    featured: false,
    isNew: false,
    bestseller: true,
  },
  {
    id: "kurti-ivory",
    name: "Ivory Mirrorwork Kurti",
    category: "Kurtis",
    price: 1899,
    sizes: ["S", "M", "L"],
    stock: 5,
    image: IMAGES.ivory,
    gallery: [IMAGES.ivory, IMAGES.dress, IMAGES.sage],
    description:
      "A refined ivory kurti with fine mirrorwork accents and a straight silhouette for repeat wear.",
    details: "Subtle mirrorwork, three-quarter sleeves, and a graceful neckline for understated dressing.",
    material: "Cotton flex",
    color: "Ivory",
    badge: "Limited",
    featured: true,
    isNew: true,
    bestseller: false,
  },
  {
    id: "co-ord-rose",
    name: "Rose Garden Co-ord",
    category: "Co-ord Sets",
    price: 2699,
    sizes: ["M", "L", "XL"],
    stock: 4,
    image: IMAGES.rose,
    gallery: [IMAGES.rose, IMAGES.dress, IMAGES.sage],
    description:
      "A polished co-ord with a graceful print story, balanced proportions, and a premium finish.",
    details: "Tailored two-piece styling with a floral print, soft waistband, and elegant drape.",
    material: "Modal blend",
    color: "Rose and sage",
    badge: "Boutique",
    featured: false,
    isNew: true,
    bestseller: true,
  },
];

const STORAGE_KEYS = {
  products: "vedha_products_v3",
  cart: "vedha_cart_v3",
  orders: "vedha_orders_v3",
  users: "vedha_demo_users_v2",
  session: "vedha_demo_session_v2",
  wishlist: "vedha_wishlist_v1",
};

const STATUS_STEPS = ["Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
const SHIPPING_FEE = 99;
const FREE_SHIPPING_THRESHOLD = 999;
const CHECKOUT_RETURN_KEY = "vedha_return_checkout";
const CHECKOUT_DRAFT_KEY = "vedha_checkout_draft_v1";
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;

const ROUTES = {
  home: "index.html",
  shop: "shop.html",
  track: "track.html",
  checkout: "checkout.html",
  wishlist: "wishlist.html",
};

const state = {
  products: normalizeProducts(loadState(STORAGE_KEYS.products, DEFAULT_PRODUCTS)),
  cart: loadState(STORAGE_KEYS.cart, []),
  orders: normalizeOrders(loadState(STORAGE_KEYS.orders, [])),
  users: normalizeUsers(loadSessionState(STORAGE_KEYS.users, [])),
  wishlist: normalizeWishlist(loadState(STORAGE_KEYS.wishlist, [])),
  session: normalizeSession(loadSessionState(STORAGE_KEYS.session, null)),
  activeHeroSlide: 0,
  activeProductId: "",
  activeSize: "",
  activeImage: "",
  selectedQuantity: 1,
  authPanel: "login",
  checkoutNeedsLogin: false,
  profileMenuOpen: false,
  lastAuthFocus: null,
  lastCartFocus: null,
};

state.cart = normalizeCart(state.cart);
state.orders = state.orders.filter((order) => !(order.id === "VV-1001" && order.customer.email === "demo@vedhavarnika.com" && order.trackingCode === "DEMO-SHIP-1001"));
state.users = state.users.filter((user) => !(user.email === "demo@vedhavarnika.com" && user.authProvider === "static-demo"));
if (state.session?.email === "demo@vedhavarnika.com") state.session = null;

const elements = {
  menuToggle: document.querySelector(".menu-toggle"),
  mobileNav: document.querySelector(".mobile-nav"),
  menuBackdrop: document.querySelector("#menuBackdrop"),
  menuClose: document.querySelector(".menu-close"),
  profileMenu: document.querySelector("#profileMenu"),
  heroImage: document.querySelector(".hero-media img"),
  heroTitle: document.querySelector("#hero-title"),
  heroEyebrows: document.querySelectorAll(".hero-copy .eyebrow"),
  heroPrevious: document.querySelector(".hero-arrow-prev"),
  heroNext: document.querySelector(".hero-arrow-next"),
  heroDots: document.querySelectorAll("[data-hero-slide]"),
  categoryGrid: document.querySelector("#categoryGrid"),
  featuredGrid: document.querySelector("#featuredGrid"),
  newArrivalGrid: document.querySelector("#newArrivalGrid"),
  bestsellerGrid: document.querySelector("#bestsellerGrid"),
  productGrid: document.querySelector("#productGrid"),
  productCount: document.querySelector("#productCount"),
  filterToggle: document.querySelector("#filterToggle"),
  filtersPanel: document.querySelector("#filtersPanel"),
  categoryFilter: document.querySelector("#categoryFilter"),
  sizeFilter: document.querySelector("#sizeFilter"),
  priceFilter: document.querySelector("#priceFilter"),
  sortFilter: document.querySelector("#sortFilter"),
  searchInput: document.querySelector("#searchInput"),
  clearFilters: document.querySelector("#clearFilters"),
  searchAction: document.querySelector(".search-action"),
  accountAction: document.querySelector(".account-action"),
  authTriggers: document.querySelectorAll("[data-open-auth]"),
  authModal: document.querySelector("#authModal"),
  authDialog: document.querySelector(".auth-dialog"),
  authCloseButtons: document.querySelectorAll("[data-close-auth]"),
  wishlistAction: document.querySelector(".wishlist-action"),
  wishlistBadges: document.querySelectorAll(".wishlist-count"),
  detailSection: document.querySelector("#details"),
  wishlistGrid: document.querySelector("#wishlistGrid"),
  wishlistCount: document.querySelector("#wishlistCount"),
  cartButton: document.querySelector(".cart-button"),
  cartDrawer: document.querySelector("#cartDrawer"),
  cartItems: document.querySelector("#cartItems"),
  cartCount: document.querySelector(".cart-count"),
  cartSubtotal: document.querySelector("#cartSubtotal"),
  cartShipping: document.querySelector("#cartShipping"),
  cartTotal: document.querySelector("#cartTotal"),
  checkoutTotal: document.querySelector("#checkoutTotal"),
  checkoutSummary: document.querySelector("#checkoutSummary"),
  checkoutForm: document.querySelector("#checkoutForm"),
  checkoutMessage: document.querySelector("#checkoutMessage"),
  checkoutLink: document.querySelector("#checkoutLink"),
  closeCart: document.querySelector(".close-cart"),
  drawerBackdrop: document.querySelector("#drawerBackdrop"),
  orderConfirmation: document.querySelector("#orderConfirmation"),
  trackingForm: document.querySelector("#trackingForm"),
  trackingResult: document.querySelector("#trackingResult"),
  accountStatus: document.querySelector("#authModalStatus"),
  accountPageStatus: document.querySelector("#accountPageStatus"),
  authTabs: document.querySelector(".auth-tabs"),
  profileActions: document.querySelector("#profileActions"),
  loginForm: document.querySelector("#loginForm"),
  registerForm: document.querySelector("#registerForm"),
  resetForm: document.querySelector("#resetForm"),
  logoutButton: document.querySelector("#logoutButton"),
  authMessage: document.querySelector("#authMessage"),
  customerOrders: document.querySelector("#customerOrders"),
};

const heroSlides = [
  {
    image: "assets/fashion-hero.png",
    alt: "Full-length view of a woman in a printed ethnic suit in a heritage courtyard",
    eyebrow: ["Traditional Roots", "Modern You"],
    title: "Timeless Elegance in Every Thread",
    fit: "contain",
    position: "left center",
  },
  {
    image: IMAGES.rose,
    alt: "Three-quarter view of a woman in a printed ethnic suit and flowing dupatta",
    eyebrow: ["Effortless Drapes", "Everyday Grace"],
    title: "A Graceful Drape for Every Occasion",
    position: "50% 22%",
  },
  {
    image: IMAGES.blush,
    alt: "Close view of floral print, embroidered neckline, and fabric details on a kurti",
    eyebrow: ["Thoughtful Details", "Made to Be Loved"],
    title: "Every Detail Holds a Story",
    position: "50% 18%",
  },
  {
    image: IMAGES.sage,
    alt: "Woman wearing an embroidered sage traditional suit before a warm heritage archway",
    eyebrow: ["A Softer Statement", "Festive Poise"],
    title: "Soft Elegance for Celebrations",
    position: "50% 28%",
  },
];

const heroImagePreloads = elements.heroImage ? heroSlides.map((slide) => {
  const preload = new Image();
  preload.decoding = "async";
  preload.src = slide.image;
  return new Promise((resolve) => {
    if (preload.complete) {
      resolve();
      return;
    }
    preload.addEventListener("load", resolve, { once: true });
    preload.addEventListener("error", resolve, { once: true });
  });
}) : [];

let heroAutoplayTimer = null;
let heroTransitionVersion = 0;

function loadState(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : clone(fallback);
  } catch {
    return clone(fallback);
  }
}

function loadSessionState(key, fallback) {
  try {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : clone(fallback);
  } catch {
    return clone(fallback);
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeProducts(products) {
  const ids = new Set();
  const isValidCatalog = Array.isArray(products) && products.length > 0 && products.every((product) => {
    if (!product || typeof product !== "object" || Array.isArray(product)) return false;
    if (typeof product.id !== "string" || !product.id || ids.has(product.id)) return false;
    if (typeof product.name !== "string" || !product.name || typeof product.category !== "string" || !product.category) return false;
    if (typeof product.image !== "string" || !product.image || typeof product.description !== "string") return false;
    if (!Array.isArray(product.sizes) || !product.sizes.length || product.sizes.some((size) => typeof size !== "string" || !size)) return false;
    if (!Number.isFinite(Number(product.price)) || Number(product.price) < 0) return false;
    if (product.salePrice != null && (!Number.isFinite(Number(product.salePrice)) || Number(product.salePrice) < 0)) return false;
    if (product.originalPrice != null && (!Number.isFinite(Number(product.originalPrice)) || Number(product.originalPrice) < 0)) return false;
    if (!Number.isFinite(Number(product.stock)) || Number(product.stock) < 0) return false;
    ids.add(product.id);
    return true;
  });

  const catalog = isValidCatalog ? products : DEFAULT_PRODUCTS;
  return catalog.map((product) => {
    const gallery = Array.isArray(product.gallery)
      ? product.gallery.filter((image) => typeof image === "string" && image)
      : [];
    return {
      ...product,
      sizes: [...new Set(product.sizes)],
      gallery: gallery.length ? gallery : [product.image],
      details: typeof product.details === "string" && product.details ? product.details : product.description,
      material: typeof product.material === "string" && product.material ? product.material : "Boutique fabric",
      color: typeof product.color === "string" && product.color ? product.color : "Assorted",
      badge: typeof product.badge === "string" && product.badge ? product.badge : product.category,
      featured: Boolean(product.featured),
      isNew: Boolean(product.isNew),
      bestseller: Boolean(product.bestseller),
    };
  });
}

function normalizeOrders(orders) {
  if (!Array.isArray(orders)) return [];
  return orders.filter((order) =>
    order &&
    typeof order === "object" &&
    typeof order.id === "string" &&
    order.id &&
    order.customer &&
    typeof order.customer.email === "string" &&
    Array.isArray(order.items) &&
    order.items.every((item) =>
      item &&
      typeof item === "object" &&
      typeof item.name === "string" &&
      typeof item.size === "string" &&
      Number.isFinite(Number(item.quantity)) &&
      Number(item.quantity) > 0 &&
      Number.isFinite(Number(item.price)) &&
      Number(item.price) >= 0,
    ) &&
    Number.isFinite(Number(order.total)) &&
    Number(order.total) >= 0,
  );
}

function normalizeUsers(users) {
  if (!Array.isArray(users)) return [];
  return users
    .filter((user) =>
      user &&
      typeof user === "object" &&
      typeof user.name === "string" &&
      user.name.trim() &&
      typeof user.email === "string" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim()),
    )
    .map((user) => ({
      name: user.name.trim(),
      email: user.email.trim().toLowerCase(),
      phone: typeof user.phone === "string" ? user.phone : "",
      createdAt: typeof user.createdAt === "string" ? user.createdAt : "",
      authProvider: "static-demo",
    }));
}

function normalizeSession(session) {
  if (!session || typeof session !== "object" || Array.isArray(session) || typeof session.email !== "string") return null;
  const email = session.email.trim().toLowerCase();
  const startedAt = Date.parse(session.startedAt);
  if (!email || !Number.isFinite(startedAt)) return null;
  return { email, startedAt: new Date(startedAt).toISOString() };
}

function normalizeWishlist(items) {
  if (!Array.isArray(items)) return [];
  const seen = new Set();

  return items
    .map((item) => {
      if (typeof item === "string") return { productId: item, size: "" };
      if (item && typeof item === "object") {
        return {
          productId: String(item.productId || item.id || ""),
          size: String(item.size || ""),
        };
      }
      return null;
    })
    .filter((item) => {
      if (!item?.productId) return false;
      const key = `${item.productId}::${item.size}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function normalizeCart(items) {
  if (!Array.isArray(items)) return [];
  const normalized = [];

  items.forEach((item) => {
    if (!item || typeof item !== "object") return;
    const product = getProduct(String(item.productId || ""));
    const size = String(item.size || "");
    const quantity = Math.floor(Number(item.quantity));
    if (!product || !product.sizes.includes(size) || !Number.isFinite(quantity) || quantity < 1) return;

    const existing = normalized.find((entry) => entry.productId === product.id && entry.size === size);
    if (existing) {
      existing.quantity = Math.min(product.stock, existing.quantity + quantity);
    } else {
      normalized.push({ productId: product.id, size, quantity: Math.min(product.stock, quantity) });
    }
  });

  return normalized.filter((item) => item.quantity > 0);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(state.products));
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(state.orders));
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(normalizeWishlist(state.wishlist)));
    sessionStorage.setItem(STORAGE_KEYS.users, JSON.stringify(state.users));
    sessionStorage.setItem(STORAGE_KEYS.session, JSON.stringify(state.session));
  } catch {
    // Browser storage can be unavailable in strict privacy contexts.
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getProductPrice(product) {
  return Number(product.salePrice ?? product.price) || 0;
}

function renderProductPrice(product) {
  const price = getProductPrice(product);
  const originalPrice = Number(product.originalPrice ?? product.price) || price;
  if (originalPrice > price) {
    return `<span class="price"><del>${formatCurrency(originalPrice)}</del> ${formatCurrency(price)}</span>`;
  }
  return `<span class="price">${formatCurrency(price)}</span>`;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function on(target, eventName, handler, options) {
  if (target) target.addEventListener(eventName, handler, options);
}

function announceStoreFeedback(message) {
  const feedback = document.querySelector("#storeFeedback");
  if (feedback) feedback.textContent = message;
}

function getParams() {
  return new URLSearchParams(window.location.search);
}

function scrollToSection(selector, fallbackUrl) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (fallbackUrl) window.location.href = fallbackUrl;
}

function buildTrackUrl(orderId, email) {
  const params = new URLSearchParams({ order: orderId, email });
  return `${ROUTES.track}?${params.toString()}#track`;
}

function updateActiveNav() {
  const page = document.body.dataset.page || "";
  document.querySelectorAll("[data-nav-page]").forEach((link) => {
    const isActive = link.dataset.navPage === page;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function setMenuOpen(isOpen) {
  if (!elements.menuToggle || !elements.mobileNav) return;
  const wasOpen = elements.mobileNav.classList.contains("is-open");
  if (wasOpen === isOpen) return;

  elements.mobileNav.classList.toggle("is-open", isOpen);
  elements.menuBackdrop?.classList.toggle("is-open", isOpen);
  elements.menuToggle.classList.toggle("is-open", isOpen);
  elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
  elements.menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  elements.mobileNav.setAttribute("aria-hidden", String(!isOpen));
  elements.mobileNav.inert = !isOpen;
  document.documentElement.classList.toggle("menu-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  if (isOpen) elements.menuClose?.focus();
  else if (wasOpen) elements.menuToggle.focus();
}

function closeMenu() {
  setMenuOpen(false);
}

function toggleMenu() {
  if (!elements.menuToggle || !elements.mobileNav) return;
  closeProfileMenu();
  setMenuOpen(!elements.mobileNav.classList.contains("is-open"));
}

function closeProfileMenu() {
  state.profileMenuOpen = false;
  if (elements.profileMenu) elements.profileMenu.hidden = true;
  elements.accountAction?.setAttribute("aria-expanded", "false");
}

function toggleProfileMenu() {
  if (!getCurrentUser()) {
    openAuthModal("login");
    return;
  }
  state.profileMenuOpen = !state.profileMenuOpen;
  if (elements.profileMenu) elements.profileMenu.hidden = !state.profileMenuOpen;
  elements.accountAction?.setAttribute("aria-expanded", String(state.profileMenuOpen));
}

function openAuthModal(panel = state.authPanel || "login", message = "") {
  if (!elements.authModal) return;
  if (!elements.authModal.classList.contains("is-open")) state.lastAuthFocus = document.activeElement;
  setAuthPanel(panel);
  renderAccount();
  if (message) setAuthMessage(message, false);
  elements.authModal.classList.add("is-open");
  elements.authModal.setAttribute("aria-hidden", "false");
  elements.authModal.inert = false;
  document.documentElement.classList.add("modal-open");
  document.body.classList.add("modal-open");

  const focusTarget = elements.authModal.querySelector(".auth-form:not([hidden]) input, .auth-close");
  window.setTimeout(() => focusTarget?.focus(), 80);
}

function closeAuthModal() {
  if (!elements.authModal) return;
  const wasOpen = elements.authModal.classList.contains("is-open");
  elements.authModal.classList.remove("is-open");
  elements.authModal.setAttribute("aria-hidden", "true");
  elements.authModal.inert = true;
  document.documentElement.classList.remove("modal-open");
  document.body.classList.remove("modal-open");
  if (wasOpen && state.lastAuthFocus?.isConnected) state.lastAuthFocus.focus();
  state.lastAuthFocus = null;
}

function trapDialogFocus(dialog, event) {
  const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')]
    .filter((element) => element.getClientRects().length > 0);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;

  if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
    event.preventDefault();
    first.focus();
  }
}

function getCategories() {
  return [...new Set(state.products.map((product) => product.category))];
}

function getSizes() {
  return [...new Set(state.products.filter((product) => product.stock > 0).flatMap((product) => product.sizes))];
}

function normalizeSearchText(value) {
  return String(value)
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getProduct(productId) {
  return state.products.find((product) => product.id === productId);
}

function isSessionExpired(session) {
  if (!session?.startedAt) return true;
  const startedAt = Date.parse(session.startedAt);
  return !Number.isFinite(startedAt) || startedAt > Date.now() || Date.now() - startedAt > SESSION_DURATION_MS;
}

function getCurrentUser() {
  if (!state.session?.email) return null;
  if (isSessionExpired(state.session)) {
    state.session = null;
    saveState();
    return null;
  }
  return state.users.find((user) => user.email === state.session.email) || null;
}

function getProductStock(productId) {
  return getProduct(productId)?.stock || 0;
}

function cartKey(productId, size) {
  return `${productId}::${size}`;
}

function getSubtotal() {
  return state.cart.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product ? getProductPrice(product) * item.quantity : 0);
  }, 0);
}

function getShipping(subtotal = getSubtotal()) {
  if (!state.cart.length || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FEE;
}

function getCartTotal() {
  const subtotal = getSubtotal();
  return subtotal + getShipping(subtotal);
}

function getCartQuantity() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

function getOrdersForCurrentUser() {
  const user = getCurrentUser();
  if (!user) return [];
  return state.orders.filter((order) => order.customer.email === user.email);
}

function showHeroSlide(direction) {
  setHeroSlide(state.activeHeroSlide + direction);
}

function stopHeroAutoplay() {
  if (heroAutoplayTimer !== null) {
    window.clearInterval(heroAutoplayTimer);
    heroAutoplayTimer = null;
  }
}

function startHeroAutoplay() {
  stopHeroAutoplay();
  if (!elements.heroImage || heroSlides.length < 2 || document.hidden) return;

  heroAutoplayTimer = window.setInterval(() => {
    setHeroSlide(state.activeHeroSlide + 1, { restartAutoplay: false });
  }, HERO_AUTOPLAY_MS);
}

function setHeroSlide(index, { restartAutoplay = true } = {}) {
  if (!elements.heroImage || !elements.heroTitle || elements.heroEyebrows.length < 2) return;

  state.activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[state.activeHeroSlide];
  const transitionVersion = ++heroTransitionVersion;

  elements.heroDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === state.activeHeroSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });

  elements.heroImage.classList.add("is-changing");
  heroImagePreloads[state.activeHeroSlide].then(() => {
    if (transitionVersion !== heroTransitionVersion) return;

    elements.heroImage.src = slide.image;
    elements.heroImage.alt = slide.alt;
    elements.heroImage.dataset.fit = slide.fit || "cover";
    elements.heroImage.style.objectPosition = slide.position || "center center";
    elements.heroEyebrows[0].textContent = slide.eyebrow[0];
    elements.heroEyebrows[1].textContent = slide.eyebrow[1];
    elements.heroTitle.textContent = slide.title;
    window.requestAnimationFrame(() => {
      if (transitionVersion === heroTransitionVersion) {
        elements.heroImage.classList.remove("is-changing");
      }
    });
  });

  if (restartAutoplay) startHeroAutoplay();
}

function renderFilters() {
  if (!elements.categoryFilter || !elements.sizeFilter) return;

  const isInitialRender = elements.categoryFilter.dataset.queryInitialized !== "true";
  const params = getParams();
  const currentCategory = (isInitialRender ? params.get("category") : "") || elements.categoryFilter.value || "all";
  const currentSize = elements.sizeFilter.value || "all";
  const currentPrice = elements.priceFilter?.value || "all";
  const currentSort = (isInitialRender ? params.get("sort") : "") || elements.sortFilter?.value || "featured";

  elements.categoryFilter.innerHTML = [
    '<option value="all">All categories</option>',
    ...getCategories().map((category) => `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`),
  ].join("");

  elements.sizeFilter.innerHTML = [
    '<option value="all">All sizes</option>',
    ...getSizes().map((size) => `<option value="${escapeHTML(size)}">${escapeHTML(size)}</option>`),
  ].join("");

  elements.categoryFilter.value = getCategories().includes(currentCategory) ? currentCategory : "all";
  elements.sizeFilter.value = getSizes().includes(currentSize) ? currentSize : "all";
  if (elements.sortFilter) {
    const hasSortOption = [...elements.sortFilter.options].some((option) => option.value === currentSort);
    elements.sortFilter.value = hasSortOption ? currentSort : "featured";
  }
  elements.categoryFilter.dataset.queryInitialized = "true";
  if (elements.priceFilter) {
    const hasUnder299 = state.products.some((product) => getProductPrice(product) <= 299);
    let under299Option = elements.priceFilter.querySelector('[value="under-299"]');
    if (hasUnder299 && !under299Option) {
      under299Option = new Option("Under \u20b9299", "under-299");
      elements.priceFilter.insertBefore(under299Option, elements.priceFilter.options[1] || null);
    } else if (!hasUnder299 && under299Option) {
      under299Option.remove();
    }
    elements.priceFilter.value = [...elements.priceFilter.options].some((option) => option.value === currentPrice) ? currentPrice : "all";
  }
}

function renderCategories() {
  if (!elements.categoryGrid) return;

  const categoryCards = getCategories().map((category) => {
      const product = state.products.find((item) => item.category === category);
      const params = new URLSearchParams({ category });
      const label = category === "Co-ord Sets" ? "Co-ord" : category;
      return `
        <a class="collection-card" href="${ROUTES.shop}?${params.toString()}#shop" data-category="${escapeHTML(category)}">
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(category)} collection" />
          <span>${escapeHTML(label)} <strong aria-hidden="true">&#8594;</strong></span>
        </a>
      `;
    });

  const newArrival = [...state.products].reverse().find((product) => product.isNew);
  if (newArrival) {
    categoryCards.push(`
      <a class="collection-card" href="${ROUTES.shop}?sort=newest#shop" data-arrival="true">
        <img src="${escapeHTML(newArrival.image)}" alt="New arrival: ${escapeHTML(newArrival.name)}" />
        <span>New Arrivals <strong aria-hidden="true">&#8594;</strong></span>
      </a>
    `);
  }

  elements.categoryGrid.innerHTML = categoryCards.join("");
}

function getControlValue(control, fallback) {
  return control ? control.value : fallback;
}

function getFilteredProducts() {
  const query = normalizeSearchText(getControlValue(elements.searchInput, ""));
  const queryTerms = query ? query.split(/\s+/) : [];
  const category = getControlValue(elements.categoryFilter, "all");
  const size = getControlValue(elements.sizeFilter, "all");
  const price = getControlValue(elements.priceFilter, "all");
  const sort = getControlValue(elements.sortFilter, "featured");

  const filtered = state.products.filter((product) => {
    const searchableText = normalizeSearchText([
      product.name,
      product.category,
      product.description,
      product.details,
      product.material,
      product.color,
      product.badge,
    ].join(" "));
    const matchesQuery = queryTerms.every((term) => searchableText.includes(term));
    const matchesCategory = category === "all" || product.category === category;
    const matchesSize = size === "all" || (product.stock > 0 && product.sizes.includes(size));
    const matchesPrice =
      price === "all" ||
      (() => {
        if (price === "under-299") return getProductPrice(product) <= 299;
        const [min, max] = price.split("-").map(Number);
        const productPrice = getProductPrice(product);
        return productPrice >= min && productPrice <= max;
      })();

    return matchesQuery && matchesCategory && matchesSize && matchesPrice;
  });

  if (sort === "featured") filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
  if (sort === "newest") filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  if (sort === "price-low") filtered.sort((a, b) => getProductPrice(a) - getProductPrice(b));
  if (sort === "price-high") filtered.sort((a, b) => getProductPrice(b) - getProductPrice(a));

  return filtered;
}

function isWishlisted(productId, size = null) {
  return state.wishlist.some((item) => item.productId === productId && (size === null || item.size === size));
}

function productCard(product, options = {}) {
  const selectedSize = options.selectedSize || "";
  const selectedSizeOption = (size) => `<option value="${escapeHTML(size)}" ${size === selectedSize ? "selected" : ""}>${escapeHTML(size)}</option>`;
  const wishlistLabel = options.wishlistPage && isWishlisted(product.id, selectedSize)
    ? "Remove"
    : isWishlisted(product.id, selectedSize) ? "Saved" : "Save";
  const detailLabel = options.wishlistPage ? "View Product" : "View";
  const addLabel = options.wishlistPage ? "Add to Cart" : "Add";
  const compact = options.compact ? " product-card-compact" : "";

  return `
    <article class="product-card${compact}">
      <div class="product-image">
        <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" />
      </div>
      <div class="product-info">
        <div class="product-title-row">
          <h3>${escapeHTML(product.name)}</h3>
          ${renderProductPrice(product)}
        </div>
        <p class="product-meta">${escapeHTML(product.description)}</p>
        <label class="card-size-field">
          <span>Size</span>
          <select class="card-size-select" data-size-select aria-label="Choose size for ${escapeHTML(product.name)}">
            <option value="">Choose a size</option>
            ${product.sizes.map(selectedSizeOption).join("")}
          </select>
        </label>
        <div class="product-actions">
          <button class="button-secondary" type="button" data-detail="${escapeHTML(product.id)}">${escapeHTML(detailLabel)}</button>
          <button class="button-primary" type="button" data-add="${escapeHTML(product.id)}" data-size="${escapeHTML(selectedSize)}" ${!selectedSize || product.stock <= 0 ? "disabled" : ""}>${escapeHTML(addLabel)}</button>
          <button class="favorite-button ${isWishlisted(product.id, selectedSize) ? "is-active" : ""}" type="button" data-wishlist="${escapeHTML(product.id)}" data-wishlist-size="${escapeHTML(selectedSize)}" aria-label="${escapeHTML(wishlistLabel)} ${escapeHTML(product.name)}">
            <span aria-hidden="true">&#9825;</span>
            ${escapeHTML(wishlistLabel)}
          </button>
        </div>
      </div>
    </article>
  `;
}

function miniProductCard(product) {
  const savedEntry = state.wishlist.find((item) => item.productId === product.id);
  const isSaved = Boolean(savedEntry);
  return `
    <article class="mini-product-card">
      <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" />
      <div>
        <span class="status-pill">${escapeHTML(product.badge)}</span>
        <h3>${escapeHTML(product.name)}</h3>
        <p>${escapeHTML(product.category)} - ${renderProductPrice(product)}</p>
        <label class="card-size-field">
          <span>Size</span>
          <select class="card-size-select" data-size-select aria-label="Choose size for ${escapeHTML(product.name)}">
            <option value="">Choose a size</option>
            ${product.sizes.map((size) => `<option value="${escapeHTML(size)}">${escapeHTML(size)}</option>`).join("")}
          </select>
        </label>
        <div class="row-actions">
          <button type="button" data-detail="${escapeHTML(product.id)}">View</button>
          <button type="button" data-add="${escapeHTML(product.id)}" data-size="" disabled>Add</button>
          <button class="mini-save-button ${isSaved ? "is-active" : ""}" type="button" data-wishlist="${escapeHTML(product.id)}" data-wishlist-size="${escapeHTML(savedEntry?.size || "")}" aria-label="${isSaved ? "Remove" : "Save"} ${escapeHTML(product.name)} from wishlist">${isSaved ? "Saved" : "Save"}</button>
        </div>
      </div>
    </article>
  `;
}

function renderMerchandising() {
  const featured = state.products.filter((product) => product.featured).slice(0, 3);
  const arrivals = state.products.filter((product) => product.isNew).slice(0, 4);
  const bestsellers = state.products.filter((product) => product.bestseller).slice(0, 4);

  if (elements.featuredGrid) elements.featuredGrid.innerHTML = featured.map((product) => productCard(product, { compact: true })).join("");
  if (elements.newArrivalGrid) elements.newArrivalGrid.innerHTML = arrivals.map(miniProductCard).join("");
  if (elements.bestsellerGrid) elements.bestsellerGrid.innerHTML = bestsellers.map(miniProductCard).join("");
}

function renderProducts() {
  if (!elements.productGrid) return;

  const products = getFilteredProducts();
  if (elements.productCount) {
    elements.productCount.textContent = `${products.length} ${products.length === 1 ? "style" : "styles"}`;
  }

  if (!products.length) {
    elements.productGrid.innerHTML = '<div class="empty-state">No products match the selected filters.</div>';
    return;
  }

  elements.productGrid.innerHTML = products.map((product) => productCard(product)).join("");
}

function renderProductDetail(productId = state.activeProductId) {
  if (!elements.detailSection) return;
  if (!productId) {
    elements.detailSection.innerHTML = "";
    return;
  }

  const product = getProduct(productId);
  if (!product) {
    elements.detailSection.innerHTML = "";
    return;
  }

  state.activeProductId = product.id;
  if (!product.sizes.includes(state.activeSize)) state.activeSize = "";
  if (!product.gallery.includes(state.activeImage)) state.activeImage = product.gallery[0] || product.image;
  state.selectedQuantity = Math.min(Math.max(state.selectedQuantity, 1), Math.max(product.stock, 1));

  const wishlistButtonLabel = isWishlisted(product.id, state.activeSize) ? "Remove from Wishlist" : "Add to Wishlist";

  elements.detailSection.innerHTML = `
    <div class="detail-card">
      <div class="detail-gallery">
        <img class="detail-main-image" src="${escapeHTML(state.activeImage)}" alt="${escapeHTML(product.name)}" />
        <div class="detail-thumbnails" aria-label="Product images">
          ${product.gallery
            .map(
              (image) => `
                <button class="thumb-button ${image === state.activeImage ? "is-active" : ""}" type="button" data-detail-image="${escapeHTML(image)}" aria-label="View product image">
                  <img src="${escapeHTML(image)}" alt="" />
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
      <div class="detail-copy">
        <p class="section-kicker">${escapeHTML(product.category)}</p>
        <h2>${escapeHTML(product.name)}</h2>
        <p>${escapeHTML(product.description)}</p>
        <p>${escapeHTML(product.details)}</p>
        <div class="detail-meta">
          <span>Price ${renderProductPrice(product)}</span>
          <span>Availability <strong>Not connected</strong></span>
          <span>Fabric <strong>${escapeHTML(product.material)}</strong></span>
        </div>
        <div>
          <label class="field-label">Choose Size</label>
          <div class="size-row" aria-label="Choose size">
            ${product.sizes
              .map(
                (size) => `
                  <button class="size-pill size-option ${size === state.activeSize ? "is-active" : ""}" type="button" data-size-option="${escapeHTML(size)}">
                    ${escapeHTML(size)}
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
        <label class="quantity-field">
          Quantity
          <input type="number" min="1" max="${Math.max(product.stock, 1)}" value="${state.selectedQuantity}" data-detail-quantity ${product.stock <= 0 ? "disabled" : ""} />
        </label>
        <div class="detail-actions">
          <button class="button-primary" type="button" data-add-detail="${escapeHTML(product.id)}" ${!state.activeSize || product.stock <= 0 ? "disabled" : ""}>Add to Cart</button>
          <button class="button-secondary" type="button" data-wishlist="${escapeHTML(product.id)}" data-wishlist-size="${escapeHTML(state.activeSize)}">${escapeHTML(wishlistButtonLabel)}</button>
          <button class="button-secondary" type="button" data-open-cart>Open Cart</button>
        </div>
      </div>
    </div>
  `;
}

function renderWishlistCount() {
  const quantity = state.wishlist.length;
  elements.wishlistBadges.forEach((badge) => {
    badge.textContent = String(quantity);
    badge.setAttribute("aria-label", `${quantity} saved wishlist ${quantity === 1 ? "item" : "items"}`);
  });
  if (elements.wishlistCount) {
    elements.wishlistCount.textContent = `${quantity} ${quantity === 1 ? "saved" : "saved"}`;
  }
}

function toggleWishlist(productId, size = "") {
  state.wishlist = normalizeWishlist(state.wishlist);
  if (isWishlisted(productId, size)) {
    state.wishlist = state.wishlist.filter((item) => !(item.productId === productId && item.size === size));
  } else {
    state.wishlist.push({ productId, size });
  }

  saveState();
  announceStoreFeedback(isWishlisted(productId, size)
    ? `${getProduct(productId)?.name || "Product"} saved to your wishlist.`
    : `${getProduct(productId)?.name || "Product"} removed from your wishlist.`);
  renderWishlistCount();
  renderWishlist();
  renderProducts();
  renderMerchandising();
  renderProductDetail();
}

function renderWishlist() {
  state.wishlist = normalizeWishlist(state.wishlist).filter((item) => getProduct(item.productId));
  renderWishlistCount();
  if (!elements.wishlistGrid) return;

  const entries = state.wishlist
    .map((entry) => ({ entry, product: getProduct(entry.productId) }))
    .filter((item) => item.product);

  if (!entries.length) {
    elements.wishlistGrid.innerHTML = '<div class="empty-state">Save styles you love and revisit them before checkout.</div>';
    return;
  }

  elements.wishlistGrid.innerHTML = entries
    .map(({ entry, product }) =>
      productCard(product, {
        compact: true,
        wishlistPage: document.body.dataset.page === "wishlist",
        selectedSize: entry.size,
      }),
    )
    .join("");
}

function addToCart(productId, size, quantity = 1) {
  const product = getProduct(productId);
  if (!product || product.stock <= 0) {
    announceStoreFeedback("This style is currently unavailable.");
    return;
  }
  if (!product.sizes.includes(size)) {
    announceStoreFeedback("Choose an available size before adding this style to your cart.");
    return;
  }

  const selectedSize = size;
  const amount = Math.min(product.stock, Math.max(1, Math.floor(Number(quantity) || 1)));
  const key = cartKey(product.id, selectedSize);
  const existing = state.cart.find((item) => cartKey(item.productId, item.size) === key);
  const existingQuantity = existing ? existing.quantity : 0;
  const nextQuantity = Math.min(product.stock, existingQuantity + amount);

  if (existing) {
    existing.quantity = nextQuantity;
  } else {
    state.cart.push({ productId: product.id, size: selectedSize, quantity: Math.min(product.stock, amount) });
  }

  saveState();
  announceStoreFeedback(`${product.name}, size ${selectedSize}, added to your cart. You have ${getCartQuantity()} ${getCartQuantity() === 1 ? "item" : "items"} in your cart.`);
  renderCart();
  renderCheckoutSummary();
  openCart();
}

function updateCartItem(productId, size, delta) {
  const item = state.cart.find((entry) => entry.productId === productId && entry.size === size);
  if (!item) return;

  const stock = getProductStock(productId);
  item.quantity = Math.min(stock, item.quantity + delta);
  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => !(entry.productId === productId && entry.size === size));
  }

  saveState();
  renderCart();
  renderCheckoutSummary();
}

function removeCartItem(productId, size) {
  state.cart = state.cart.filter((entry) => !(entry.productId === productId && entry.size === size));
  saveState();
  renderCart();
  renderCheckoutSummary();
}

function renderCart() {
  const subtotal = getSubtotal();
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;
  const quantity = getCartQuantity();

  if (elements.cartCount) {
    elements.cartCount.textContent = String(quantity);
    elements.cartCount.setAttribute("aria-label", `${quantity} items in cart`);
  }
  if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatCurrency(subtotal);
  if (elements.cartShipping) elements.cartShipping.textContent = shipping ? formatCurrency(shipping) : "Free";
  if (elements.cartTotal) elements.cartTotal.textContent = formatCurrency(total);
  if (!elements.cartItems) return;

  if (!state.cart.length) {
    elements.cartItems.innerHTML = '<div class="empty-state">Your cart is empty.</div>';
    return;
  }

  elements.cartItems.innerHTML = state.cart
    .map((item) => {
      const product = getProduct(item.productId);
      if (!product) return "";
      const canIncrease = item.quantity < product.stock;
      return `
        <article class="cart-item">
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" />
          <div>
            <h3>${escapeHTML(product.name)}</h3>
            <p>${escapeHTML(item.size)} - ${formatCurrency(getProductPrice(product))}</p>
            <div class="quantity-control">
              <button class="quantity-button" type="button" data-cart-dec="${escapeHTML(product.id)}" data-size="${escapeHTML(item.size)}">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-button" type="button" data-cart-inc="${escapeHTML(product.id)}" data-size="${escapeHTML(item.size)}" ${canIncrease ? "" : "disabled"}>+</button>
              <button class="quantity-button" type="button" data-cart-remove="${escapeHTML(product.id)}" data-size="${escapeHTML(item.size)}">Remove</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function openCart() {
  if (!elements.cartDrawer || !elements.drawerBackdrop) return;
  if (!elements.cartDrawer.classList.contains("is-open")) state.lastCartFocus = document.activeElement;
  elements.cartDrawer.classList.add("is-open");
  elements.drawerBackdrop.classList.add("is-open");
  elements.cartDrawer.setAttribute("aria-hidden", "false");
  elements.cartDrawer.inert = false;
  elements.cartButton?.setAttribute("aria-expanded", "true");
  document.documentElement.classList.add("drawer-open");
  document.body.classList.add("drawer-open");
  elements.closeCart?.focus();
}

function closeCart() {
  if (!elements.cartDrawer || !elements.drawerBackdrop) return;
  const wasOpen = elements.cartDrawer.classList.contains("is-open");
  elements.cartDrawer.classList.remove("is-open");
  elements.drawerBackdrop.classList.remove("is-open");
  elements.cartDrawer.setAttribute("aria-hidden", "true");
  elements.cartDrawer.inert = true;
  elements.cartButton?.setAttribute("aria-expanded", "false");
  document.documentElement.classList.remove("drawer-open");
  document.body.classList.remove("drawer-open");
  if (wasOpen && state.lastCartFocus?.isConnected) state.lastCartFocus.focus();
  state.lastCartFocus = null;
}

function renderCheckoutSummary() {
  if (!elements.checkoutSummary && !elements.checkoutTotal) return;

  if (!state.cart.length) {
    if (elements.checkoutSummary) {
      elements.checkoutSummary.innerHTML = '<div class="empty-state">Your checkout summary will appear after you add products.</div>';
    }
    if (elements.checkoutTotal) elements.checkoutTotal.textContent = formatCurrency(0);
    return;
  }

  const subtotal = getSubtotal();
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;
  if (elements.checkoutTotal) elements.checkoutTotal.textContent = formatCurrency(total);
  if (!elements.checkoutSummary) return;

  elements.checkoutSummary.innerHTML = `
    <div class="summary-list">
      ${state.cart
        .map((item) => {
          const product = getProduct(item.productId);
          if (!product) return "";
          return `
            <div class="summary-row">
              <span>${escapeHTML(product.name)} / ${escapeHTML(item.size)} x ${item.quantity}</span>
              <strong>${formatCurrency(getProductPrice(product) * item.quantity)}</strong>
            </div>
          `;
        })
        .join("")}
      <div class="summary-row">
        <span>Subtotal</span>
        <strong>${formatCurrency(subtotal)}</strong>
      </div>
      <div class="summary-row">
        <span>Shipping</span>
        <strong>${shipping ? formatCurrency(shipping) : "Free"}</strong>
      </div>
    </div>
  `;
}

function getCheckoutDetails() {
  if (!elements.checkoutForm) return null;
  const formData = new FormData(elements.checkoutForm);
  return {
    name: formData.get("name")?.trim() || "",
    email: formData.get("email")?.trim().toLowerCase() || "",
    phone: formData.get("phone")?.trim() || "",
    city: formData.get("city")?.trim() || "",
    state: formData.get("state")?.trim() || "",
    address: formData.get("address")?.trim() || "",
    pincode: formData.get("pincode")?.trim() || "",
    paymentMethod: formData.get("paymentMethod") || "cod",
  };
}

function validateCheckoutDetails(details) {
  if (!details) return "Checkout details are unavailable.";
  const requiredFields = [
    ["name", "full name"],
    ["email", "email"],
    ["phone", "phone"],
    ["city", "city"],
    ["state", "state"],
    ["address", "address"],
    ["pincode", "pincode"],
  ];
  const missing = requiredFields.find(([key]) => !details[key]);
  if (missing) return `Please enter your ${missing[1]}.`;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) return "Enter a valid email address.";
  if (!/^[0-9]{6}$/.test(details.pincode)) return "Enter a valid 6-digit pincode.";
  if (details.phone.replace(/\D/g, "").length < 10) return "Enter a valid phone number.";
  return "";
}

function saveCheckoutDraft() {
  const details = getCheckoutDetails();
  if (!details) return;
  try {
    sessionStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(details));
  } catch {
    // Checkout draft storage is only a convenience for this static demo.
  }
}

function restoreCheckoutDraft() {
  if (!elements.checkoutForm) return;
  let details = null;
  try {
    const stored = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
    details = stored ? JSON.parse(stored) : null;
  } catch {
    details = null;
  }
  if (!details) return;

  Object.entries(details).forEach(([key, value]) => {
    if (elements.checkoutForm.elements[key] && value) {
      elements.checkoutForm.elements[key].value = value;
    }
  });
}

function validateStockBeforeCheckout() {
  for (const item of state.cart) {
    const product = getProduct(item.productId);
    if (!product) return "A product in your cart is no longer available.";
    if (item.quantity > product.stock) {
      return `${product.name} has only ${product.stock} left in stock.`;
    }
  }
  return "";
}

function getNextOrderId() {
  const highest = state.orders.reduce((max, order) => {
    const number = Number(String(order.id).replace(/\D/g, ""));
    return Number.isFinite(number) ? Math.max(max, number) : max;
  }, 1000);
  return `VV-${highest + 1}`;
}

function createOrder(customer, paymentMethod, paymentStatus) {
  const orderId = getNextOrderId();
  const subtotal = getSubtotal();
  const shipping = getShipping(subtotal);
  const items = state.cart
    .map((item) => {
      const product = getProduct(item.productId);
      if (!product) return null;
      return {
        productId: product.id,
        name: product.name,
        size: item.size,
        quantity: item.quantity,
        price: getProductPrice(product),
      };
    })
    .filter(Boolean);
  const now = new Date().toISOString();

  const order = {
    id: orderId,
    customer,
    items,
    subtotal,
    shipping,
    total: subtotal + shipping,
    status: "Demo record",
    paymentStatus,
    paymentMethod,
    trackingCode: "",
    courier: "",
    createdAt: now,
    updatedAt: now,
    trackingUrl: "",
    notifications: [],
  };

  state.orders.unshift(order);

  items.forEach((item) => {
    const product = getProduct(item.productId);
    if (product) product.stock = Math.max(0, product.stock - item.quantity);
  });

  state.cart = [];
  saveState();
  renderAll();
  return order;
}

function showOrderSuccess(order) {
  try {
    sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
    sessionStorage.removeItem(CHECKOUT_RETURN_KEY);
  } catch {
    // Static demo fallback only.
  }

  if (elements.checkoutMessage) {
    elements.checkoutMessage.className = "form-note message-success";
    elements.checkoutMessage.textContent = `Demo order ${order.id} was recorded in this browser only. It was not sent to the store.`;
  }
  if (elements.checkoutForm) elements.checkoutForm.reset();
  closeCart();

  if (!elements.orderConfirmation) return;
  elements.orderConfirmation.hidden = false;
  elements.orderConfirmation.innerHTML = `
    <div class="confirmation-card">
      <img class="confirmation-logo" src="${LOGO_SRC}" alt="Vedha Varnika - Art Meets Tradition" />
      <p class="section-kicker">Demo Order Recorded</p>
      <h2>${escapeHTML(order.id)}</h2>
      <p>Thank you, ${escapeHTML(order.customer.name)}. The demo total is ${formatCurrency(order.total)}.</p>
      <p>This record is stored only in this browser. No payment was taken and no store, email service, or courier received it.</p>
      <div class="detail-actions">
        <a class="button-primary" href="${buildTrackUrl(order.id, order.customer.email)}">Track Order</a>
        <a class="button-secondary" href="${ROUTES.shop}">Continue Shopping</a>
      </div>
    </div>
  `;
  elements.orderConfirmation.scrollIntoView({ behavior: "smooth", block: "start" });
}

function fillCheckoutFromUser(options = {}) {
  const user = getCurrentUser();
  if (!user || !elements.checkoutForm) return;

  const preserveExisting = Boolean(options.preserveExisting);
  const setValue = (name, value, force = false) => {
    const control = elements.checkoutForm.elements[name];
    if (!control) return;
    if (force || !preserveExisting || !control.value.trim()) control.value = value || "";
  };

  setValue("name", user.name);
  setValue("email", user.email, true);
  setValue("phone", user.phone);
}

function handleCheckout(event) {
  event.preventDefault();
  if (!elements.checkoutMessage || !elements.checkoutForm) return;
  elements.checkoutMessage.className = "form-note";
  elements.checkoutMessage.textContent = "";

  if (!state.cart.length) {
    elements.checkoutMessage.className = "form-note message-error";
    elements.checkoutMessage.textContent = "Add at least one product to checkout.";
    openCart();
    return;
  }

  const user = getCurrentUser();
  if (!user) {
    state.checkoutNeedsLogin = true;
    saveCheckoutDraft();
    try {
      sessionStorage.setItem(CHECKOUT_RETURN_KEY, "1");
    } catch {
      // Session storage is only a convenience for the static prototype flow.
    }
    elements.checkoutMessage.className = "form-note message-error";
    elements.checkoutMessage.textContent = "Login or register in the popup to continue. Your cart and delivery details are saved for this checkout.";
    openAuthModal("login", "Login or create a demo account to place this order.");
    return;
  }

  const details = getCheckoutDetails();
  const detailsMessage = validateCheckoutDetails(details);
  if (detailsMessage) {
    elements.checkoutMessage.className = "form-note message-error";
    elements.checkoutMessage.textContent = detailsMessage;
    return;
  }

  const stockMessage = validateStockBeforeCheckout();
  if (stockMessage) {
    elements.checkoutMessage.className = "form-note message-error";
    elements.checkoutMessage.textContent = stockMessage;
    renderCart();
    openCart();
    return;
  }

  const customer = {
    name: details.name,
    email: details.email,
    phone: details.phone,
    city: details.city,
    state: details.state,
    address: details.address,
    pincode: details.pincode,
  };
  const paymentMethod = details.paymentMethod;

  if (customer.email !== user.email) {
    elements.checkoutMessage.className = "form-note message-error";
    elements.checkoutMessage.textContent = "Use the email from your logged-in customer account for this checkout.";
    return;
  }

  if (paymentMethod === "cod") {
    const order = createOrder(customer, "Cash on Delivery", "Pending");
    showOrderSuccess(order);
    renderCustomerOrders();
  }
}

function renderTracking(order) {
  if (!elements.trackingResult) return;

  if (!order) {
    elements.trackingResult.innerHTML = '<div class="empty-state">No matching order found for that order ID and email.</div>';
    return;
  }

  if (order.status === "Cancelled") {
    elements.trackingResult.innerHTML = `
      <div class="tracking-card">
        <h3>${escapeHTML(order.id)}</h3>
        <p>This order has been cancelled.</p>
        <p><strong>Payment:</strong> ${escapeHTML(order.paymentStatus)} via ${escapeHTML(order.paymentMethod)}</p>
      </div>
    `;
    return;
  }

  const currentIndex = STATUS_STEPS.indexOf(order.status);
  let trackingLink = "";
  try {
    const courierUrl = new URL(order.trackingUrl);
    if (courierUrl.protocol === "https:") trackingLink = courierUrl.href;
  } catch {
    trackingLink = "";
  }
  const createdAt = new Date(order.createdAt);
  const createdLabel = Number.isNaN(createdAt.getTime()) ? "Not available" : createdAt.toLocaleString("en-IN");

  elements.trackingResult.innerHTML = `
    <div class="tracking-card">
      <div>
        <h3>${escapeHTML(order.id)}</h3>
        <p>${escapeHTML(order.customer.name)} - ${formatCurrency(order.total)}</p>
      </div>
      <p class="tracking-demo-note">This is a browser-only prototype order record. It has not been sent to the store, and the status timeline is not connected to fulfillment.</p>
      <div class="progress-steps">
        ${STATUS_STEPS.map(
          (status, index) => `
            <span class="progress-step ${currentIndex >= 0 && index <= currentIndex ? "is-active" : ""}">${escapeHTML(status)}</span>
          `,
        ).join("")}
      </div>
      <p><strong>Status:</strong> ${escapeHTML(order.status)}</p>
      <p><strong>Recorded:</strong> ${escapeHTML(createdLabel)}</p>
      <div>
        <strong>Items</strong>
        <ul class="tracking-order-items">
          ${(order.items || []).map((item) => `<li>${escapeHTML(item.name)} - ${escapeHTML(item.size)} - ${item.quantity} x ${formatCurrency(item.price)}</li>`).join("")}
        </ul>
      </div>
      <p><strong>Shipping:</strong> ${order.shipping ? formatCurrency(order.shipping) : "Free"}</p>
      <p><strong>Payment:</strong> ${escapeHTML(order.paymentStatus)} via ${escapeHTML(order.paymentMethod)} (demo only)</p>
      <p><strong>Courier:</strong> ${escapeHTML(order.courier || "Not assigned")}</p>
      <p><strong>Tracking number:</strong> ${escapeHTML(order.trackingCode || "Not assigned")}</p>
      ${trackingLink ? `<a class="text-link" href="${escapeHTML(trackingLink)}" target="_blank" rel="noopener noreferrer">Open courier tracking</a>` : ""}
    </div>
  `;
}

function handleTracking(event) {
  event.preventDefault();
  if (!elements.trackingForm) return;
  const formData = new FormData(elements.trackingForm);
  const orderId = String(formData.get("orderId") || "").trim().toUpperCase();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!orderId || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    elements.trackingResult.innerHTML = '<div class="empty-state">Enter an order ID and a valid checkout email address.</div>';
    return;
  }
  const order = state.orders.find((item) => item.id.toUpperCase() === orderId && item.customer.email === email);
  renderTracking(order);
}

function validateDemoPassword(password) {
  if (!password || password.length < 8) return "Use at least 8 characters for this demo password.";
  return "";
}

function startDemoSession(email) {
  state.session = {
    email,
    startedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + SESSION_DURATION_MS).toISOString(),
  };
}

function setAuthPanel(panel) {
  const activePanel = ["login", "register", "reset"].includes(panel) ? panel : "login";
  state.authPanel = activePanel;
  const forms = {
    login: elements.loginForm,
    register: elements.registerForm,
    reset: elements.resetForm,
  };

  Object.entries(forms).forEach(([name, form]) => {
    if (form) form.hidden = name !== activePanel;
  });

  if (!elements.authTabs) return;
  elements.authTabs.querySelectorAll("[data-auth-panel]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.authPanel === activePanel);
  });
}

function setAuthMessage(message, isError = false) {
  if (!elements.authMessage) return;
  if (!message) {
    elements.authMessage.className = "form-note";
    elements.authMessage.textContent = "";
    return;
  }
  elements.authMessage.className = `form-note ${isError ? "message-error" : "message-success"}`;
  elements.authMessage.textContent = message;
}

function redirectAfterAuthIfNeeded() {
  let shouldReturnToCheckout = false;
  try {
    shouldReturnToCheckout = sessionStorage.getItem(CHECKOUT_RETURN_KEY) === "1";
    sessionStorage.removeItem(CHECKOUT_RETURN_KEY);
  } catch {
    shouldReturnToCheckout = state.checkoutNeedsLogin;
  }

  state.checkoutNeedsLogin = false;

  if (shouldReturnToCheckout && state.cart.length) {
    if (elements.checkoutForm) {
      restoreCheckoutDraft();
      fillCheckoutFromUser({ preserveExisting: true });
      if (elements.checkoutMessage) {
        elements.checkoutMessage.className = "form-note message-success";
        elements.checkoutMessage.textContent = "You are signed in. Review your delivery details and place the order.";
      }
      closeAuthModal();
      elements.checkoutForm.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.href = ROUTES.checkout;
    return;
  }

  closeAuthModal();
}

function renderAccount() {
  const user = getCurrentUser();
  const authForms = [elements.loginForm, elements.registerForm, elements.resetForm].filter(Boolean);
  const loginLabel = elements.accountAction?.querySelector(".login-label");

  if (loginLabel) loginLabel.textContent = user ? "Profile" : "Login";
  if (elements.accountAction) {
    elements.accountAction.setAttribute("aria-label", user ? "Open customer menu" : "Login");
    elements.accountAction.setAttribute("title", user ? "Profile" : "Login");
  }

  if (user) {
    const statusMarkup = `
      <span class="status-pill">Logged in</span>
      <strong>${escapeHTML(user.name)}</strong>
      <span>${escapeHTML(user.email)}</span>
    `;
    if (elements.accountStatus) elements.accountStatus.innerHTML = statusMarkup;
    if (elements.accountPageStatus) elements.accountPageStatus.innerHTML = statusMarkup;
    if (elements.logoutButton) elements.logoutButton.hidden = false;
    if (elements.authTabs) elements.authTabs.hidden = true;
    if (elements.profileActions) elements.profileActions.hidden = false;
    if (elements.profileMenu) {
      elements.profileMenu.innerHTML = `
        <p class="profile-menu-kicker">Signed in as</p>
        <strong>${escapeHTML(user.name)}</strong>
        <span class="profile-menu-email">${escapeHTML(user.email)}</span>
        <a href="track.html">Track orders</a>
        <a href="wishlist.html">Wishlist</a>
        <a href="checkout.html">Checkout</a>
        <button type="button" data-profile-logout>Log out</button>
      `;
      elements.profileMenu.hidden = !state.profileMenuOpen;
    }
    authForms.forEach((form) => {
      form.hidden = true;
    });
    fillCheckoutFromUser({ preserveExisting: true });
  } else {
    const statusMarkup = `
      <span class="status-pill">Guest browsing</span>
      <span>Login is required only before final order placement.</span>
    `;
    if (elements.accountStatus) elements.accountStatus.innerHTML = statusMarkup;
    if (elements.accountPageStatus) elements.accountPageStatus.innerHTML = statusMarkup;
    if (elements.logoutButton) elements.logoutButton.hidden = true;
    if (elements.authTabs) elements.authTabs.hidden = false;
    if (elements.profileActions) elements.profileActions.hidden = true;
    closeProfileMenu();
    setAuthPanel(state.authPanel === "reset" ? "login" : state.authPanel);
  }

  renderCustomerOrders();
}

function renderCustomerOrders() {
  if (!elements.customerOrders) return;

  const user = getCurrentUser();
  if (!user) {
    elements.customerOrders.innerHTML = '<div class="empty-state">Login to view your order history.</div>';
    return;
  }

  const orders = getOrdersForCurrentUser();
  if (!orders.length) {
    elements.customerOrders.innerHTML = '<div class="empty-state">No orders yet.</div>';
    return;
  }

  elements.customerOrders.innerHTML = orders
    .map(
      (order) => `
        <article class="order-row">
          <div class="record-row-head">
            <h4>${escapeHTML(order.id)}</h4>
            <span class="status-pill">${escapeHTML(order.status)}</span>
          </div>
          <p>${order.items.map((item) => `${escapeHTML(item.name)} x ${item.quantity}`).join(", ")}</p>
          <p>${formatCurrency(order.total)} - ${escapeHTML(order.paymentStatus)}</p>
          <div class="row-actions">
            <button type="button" data-fill-tracking="${escapeHTML(order.id)}" data-email="${escapeHTML(order.customer.email)}">Track</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function handleRegister(event) {
  event.preventDefault();
  if (!elements.registerForm) return;
  const formData = new FormData(elements.registerForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim().toLowerCase();
  const phone = formData.get("phone").trim();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const passwordMessage = validateDemoPassword(password);

  if (passwordMessage) {
    setAuthMessage(passwordMessage, true);
    return;
  }

  if (password !== confirmPassword) {
    setAuthMessage("Passwords do not match.", true);
    return;
  }

  if (state.users.some((user) => user.email === email)) {
    setAuthMessage("An account with this email already exists. Please login.", true);
    setAuthPanel("login");
    return;
  }

  state.users.push({ name, email, phone, createdAt: new Date().toISOString(), authProvider: "static-demo" });
  startDemoSession(email);
  saveState();

  elements.registerForm.reset();
  setAuthMessage("Demo account created for this tab. Your cart is still saved.");
  renderAccount();
  redirectAfterAuthIfNeeded();
}

function handleLogin(event) {
  event.preventDefault();
  if (!elements.loginForm) return;
  const formData = new FormData(elements.loginForm);
  const email = formData.get("email").trim().toLowerCase();
  const password = formData.get("password");
  const passwordMessage = validateDemoPassword(password);
  const user = state.users.find((item) => item.email === email);

  if (passwordMessage) {
    setAuthMessage(passwordMessage, true);
    return;
  }

  if (!user) {
    setAuthMessage("No customer account found for this email.", true);
    return;
  }

  startDemoSession(email);
  saveState();
  elements.loginForm.reset();
  setAuthMessage("Demo login accepted for this tab. Your cart is ready for checkout.");
  renderAccount();
  redirectAfterAuthIfNeeded();
}

function handleReset(event) {
  event.preventDefault();
  setAuthMessage("Password reset requires secure backend email verification. This static demo does not store passwords.", true);
  setAuthPanel("login");
}

function handleLogout() {
  closeProfileMenu();
  state.session = null;
  saveState();
  setAuthMessage("Logged out.");
  setAuthPanel("login");
  renderAccount();
  closeAuthModal();
}

function handleProductClick(event) {
  const detailButton = event.target.closest("[data-detail]");
  const addButton = event.target.closest("[data-add]");
  const wishlistButton = event.target.closest("[data-wishlist]");

  if (detailButton) {
    if (elements.detailSection) {
      if (state.activeProductId !== detailButton.dataset.detail) {
        state.activeSize = "";
        state.selectedQuantity = 1;
      }
      renderProductDetail(detailButton.dataset.detail);
      elements.detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const params = new URLSearchParams({ product: detailButton.dataset.detail });
      window.location.href = `${ROUTES.shop}?${params.toString()}#details`;
    }
  }

  if (addButton) {
    addToCart(addButton.dataset.add, addButton.dataset.size);
  }

  if (wishlistButton) {
    toggleWishlist(wishlistButton.dataset.wishlist, wishlistButton.dataset.wishlistSize || "");
  }
}

function applyInitialPageState() {
  const params = getParams();
  const category = params.get("category");
  const productId = params.get("product");
  const query = params.get("q");
  const orderId = params.get("order") || params.get("orderId");
  const email = params.get("email");

  if (category && elements.categoryFilter && getCategories().includes(category)) {
    elements.categoryFilter.value = category;
  }

  if (query && elements.searchInput) {
    elements.searchInput.value = query;
  }

  if (productId && getProduct(productId)) {
    state.activeProductId = productId;
    state.activeImage = "";
  }

  if (orderId && email && elements.trackingForm) {
    elements.trackingForm.elements.orderId.value = orderId;
    elements.trackingForm.elements.email.value = email;
    const order = state.orders.find((item) => item.id.toUpperCase() === orderId.toUpperCase() && item.customer.email === email.toLowerCase());
    renderTracking(order);
  }
}

function renderAll() {
  renderFilters();
  renderCategories();
  renderMerchandising();
  renderProducts();
  renderProductDetail();
  renderWishlist();
  renderCart();
  renderCheckoutSummary();
  renderAccount();
}

function bindEvents() {
  on(elements.menuToggle, "click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  // The account modal can cover the header. Hand a click at the covered
  // hamburger through to the same menu toggle path instead of swallowing it.
  on(elements.authModal, "click", (event) => {
    if (!elements.authModal?.classList.contains("is-open") || !elements.menuToggle) return;
    const toggleRect = elements.menuToggle.getBoundingClientRect();
    const clickedToggle = event.clientX >= toggleRect.left && event.clientX <= toggleRect.right
      && event.clientY >= toggleRect.top && event.clientY <= toggleRect.bottom;
    if (!clickedToggle) return;

    event.preventDefault();
    event.stopPropagation();
    closeAuthModal();
    toggleMenu();
  }, true);

  on(elements.mobileNav, "click", (event) => {
    if (event.target.closest("a, [data-open-auth]")) closeMenu();
  });

  on(elements.menuClose, "click", closeMenu);
  on(elements.menuBackdrop, "click", closeMenu);

  on(document, "click", (event) => {
    if (elements.mobileNav?.classList.contains("is-open")) {
      const clickedMenu = elements.mobileNav.contains(event.target);
      const clickedToggle = elements.menuToggle?.contains(event.target);
      if (!clickedMenu && !clickedToggle) closeMenu();
    }
    if (state.profileMenuOpen && !elements.profileMenu?.contains(event.target) && !elements.accountAction?.contains(event.target)) {
      closeProfileMenu();
    }
  });

  on(document, "keydown", (event) => {
    const menuWasOpen = elements.mobileNav?.classList.contains("is-open");
    const cartWasOpen = elements.cartDrawer?.classList.contains("is-open");
    const authWasOpen = elements.authModal?.classList.contains("is-open");

    if (event.key === "Escape") {
      if (authWasOpen) closeAuthModal();
      else if (cartWasOpen) closeCart();
      else if (menuWasOpen) closeMenu();
      else closeProfileMenu();
      return;
    }

    if (event.key !== "Tab") return;
    if (authWasOpen) {
      trapDialogFocus(elements.authDialog, event);
    } else if (cartWasOpen) {
      trapDialogFocus(elements.cartDrawer, event);
    } else if (menuWasOpen) {
      trapDialogFocus(elements.mobileNav, event);
    }
  });

  on(window, "storage", (event) => {
    const sharedKeys = [STORAGE_KEYS.products, STORAGE_KEYS.cart, STORAGE_KEYS.orders, STORAGE_KEYS.wishlist];
    if (event.storageArea !== localStorage || (event.key !== null && !sharedKeys.includes(event.key))) return;

    state.products = normalizeProducts(loadState(STORAGE_KEYS.products, DEFAULT_PRODUCTS));
    state.cart = normalizeCart(loadState(STORAGE_KEYS.cart, []));
    state.orders = normalizeOrders(loadState(STORAGE_KEYS.orders, [])).filter((order) => !(order.id === "VV-1001" && order.customer.email === "demo@vedhavarnika.com" && order.trackingCode === "DEMO-SHIP-1001"));
    state.wishlist = normalizeWishlist(loadState(STORAGE_KEYS.wishlist, [])).filter((item) => getProduct(item.productId));
    renderAll();
  });

  on(elements.heroPrevious, "click", () => showHeroSlide(-1));
  on(elements.heroNext, "click", () => showHeroSlide(1));
  elements.heroDots.forEach((dot) => {
    on(dot, "click", () => setHeroSlide(Number(dot.dataset.heroSlide)));
  });
  on(document, "visibilitychange", () => {
    if (document.hidden) stopHeroAutoplay();
    else startHeroAutoplay();
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => scrollToSection(button.dataset.jump, button.dataset.fallback));
  });

  on(elements.searchAction, "click", () => {
    if (elements.searchInput) {
      scrollToSection("#shop");
      window.setTimeout(() => elements.searchInput.focus(), 350);
    } else {
      window.location.href = `${ROUTES.shop}#shop`;
    }
  });

  elements.authTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      closeMenu();
      closeProfileMenu();
      openAuthModal();
    });
  });

  on(elements.accountAction, "click", () => toggleProfileMenu());
  on(elements.profileMenu, "click", (event) => {
    if (event.target.closest("[data-profile-logout]")) handleLogout();
    else if (event.target.closest("a")) closeProfileMenu();
  });

  elements.authCloseButtons.forEach((button) => {
    button.addEventListener("click", closeAuthModal);
  });

  on(elements.wishlistAction, "click", (event) => {
    if (!elements.wishlistGrid) return;
    event.preventDefault();
    scrollToSection("#wishlist");
  });

  on(elements.categoryGrid, "click", (event) => {
    const link = event.target.closest("[data-category]");
    if (!link || !elements.categoryFilter) return;
    event.preventDefault();
    elements.categoryFilter.value = link.dataset.category;
    renderProducts();
    scrollToSection("#shop");
  });

  [elements.searchInput, elements.categoryFilter, elements.sizeFilter, elements.priceFilter, elements.sortFilter]
    .filter(Boolean)
    .forEach((control) => {
      control.addEventListener("input", renderProducts);
      control.addEventListener("change", renderProducts);
    });

  on(document, "change", (event) => {
    const sizeSelect = event.target.closest("[data-size-select]");
    if (!sizeSelect) return;
    const card = sizeSelect.closest(".product-card, .mini-product-card");
    const addButton = card?.querySelector("[data-add]");
    const wishlistButton = card?.querySelector("[data-wishlist]");
    if (addButton) {
      addButton.dataset.size = sizeSelect.value;
      addButton.disabled = !sizeSelect.value || getProduct(addButton.dataset.add)?.stock <= 0;
    }
    if (wishlistButton) {
      const isSaved = isWishlisted(wishlistButton.dataset.wishlist, sizeSelect.value);
      wishlistButton.dataset.wishlistSize = sizeSelect.value;
      wishlistButton.classList.toggle("is-active", isSaved);
      wishlistButton.setAttribute("aria-label", `${isSaved ? "Remove" : "Save"} ${getProduct(wishlistButton.dataset.wishlist)?.name || "product"} from wishlist`);
      if (wishlistButton.classList.contains("mini-save-button")) {
        wishlistButton.textContent = isSaved ? "Saved" : "Save";
      } else {
        wishlistButton.innerHTML = `<span aria-hidden="true">&#9825;</span>${isSaved ? "Saved" : "Save"}`;
      }
    }
  });

  on(elements.filterToggle, "click", () => {
    if (!elements.filtersPanel) return;
    const isOpen = elements.filtersPanel.classList.toggle("is-open");
    elements.filterToggle.setAttribute("aria-expanded", String(isOpen));
  });

  on(elements.clearFilters, "click", () => {
    if (elements.searchInput) elements.searchInput.value = "";
    if (elements.categoryFilter) elements.categoryFilter.value = "all";
    if (elements.sizeFilter) elements.sizeFilter.value = "all";
    if (elements.priceFilter) elements.priceFilter.value = "all";
    if (elements.sortFilter) elements.sortFilter.value = "featured";
    renderProducts();
  });

  [elements.productGrid, elements.featuredGrid, elements.newArrivalGrid, elements.bestsellerGrid, elements.wishlistGrid]
    .filter(Boolean)
    .forEach((container) => container.addEventListener("click", handleProductClick));

  on(elements.detailSection, "click", (event) => {
    const imageButton = event.target.closest("[data-detail-image]");
    const sizeButton = event.target.closest("[data-size-option]");
    const addButton = event.target.closest("[data-add-detail]");
    const cartButton = event.target.closest("[data-open-cart]");
    const wishlistButton = event.target.closest("[data-wishlist]");

    if (imageButton) {
      state.activeImage = imageButton.dataset.detailImage;
      renderProductDetail();
    }

    if (sizeButton) {
      state.activeSize = sizeButton.dataset.sizeOption;
      renderProductDetail();
    }

    if (addButton) addToCart(addButton.dataset.addDetail, state.activeSize, state.selectedQuantity);
    if (cartButton) openCart();
    if (wishlistButton) toggleWishlist(wishlistButton.dataset.wishlist, wishlistButton.dataset.wishlistSize || "");
  });

  on(elements.detailSection, "input", (event) => {
    const quantityInput = event.target.closest("[data-detail-quantity]");
    if (!quantityInput) return;
    const product = getProduct(state.activeProductId);
    if (!product) return;
    state.selectedQuantity = Math.min(Math.max(Math.floor(Number(quantityInput.value) || 1), 1), Math.max(product.stock, 1));
    quantityInput.value = state.selectedQuantity;
  });

  on(elements.cartButton, "click", openCart);
  on(elements.closeCart, "click", closeCart);
  on(elements.drawerBackdrop, "click", closeCart);
  on(elements.checkoutLink, "click", closeCart);

  on(elements.cartItems, "click", (event) => {
    const inc = event.target.closest("[data-cart-inc]");
    const dec = event.target.closest("[data-cart-dec]");
    const remove = event.target.closest("[data-cart-remove]");

    if (inc) updateCartItem(inc.dataset.cartInc, inc.dataset.size, 1);
    if (dec) updateCartItem(dec.dataset.cartDec, dec.dataset.size, -1);
    if (remove) removeCartItem(remove.dataset.cartRemove, remove.dataset.size);
  });

  on(elements.checkoutForm, "submit", handleCheckout);
  on(elements.trackingForm, "submit", handleTracking);

  on(elements.authTabs, "click", (event) => {
    const tab = event.target.closest("[data-auth-panel]");
    if (tab) setAuthPanel(tab.dataset.authPanel);
  });

  on(elements.registerForm, "submit", handleRegister);
  on(elements.loginForm, "submit", handleLogin);
  on(elements.resetForm, "submit", handleReset);
  on(elements.logoutButton, "click", handleLogout);

  on(elements.customerOrders, "click", (event) => {
    const button = event.target.closest("[data-fill-tracking]");
    if (!button) return;
    if (elements.trackingForm) {
      elements.trackingForm.elements.orderId.value = button.dataset.fillTracking;
      elements.trackingForm.elements.email.value = button.dataset.email;
      scrollToSection("#track");
      renderTracking(state.orders.find((order) => order.id === button.dataset.fillTracking));
      return;
    }
    window.location.href = buildTrackUrl(button.dataset.fillTracking, button.dataset.email);
  });
}

function init() {
  bindEvents();
  startHeroAutoplay();
  renderFilters();
  applyInitialPageState();
  setAuthPanel(state.authPanel);
  renderAll();
  updateActiveNav();
  restoreCheckoutDraft();
  fillCheckoutFromUser({ preserveExisting: true });

  if (window.location.hash) {
    window.setTimeout(() => scrollToSection(window.location.hash), 120);
  }

  if (getParams().get("profile") === "1") openAuthModal("login");
}

init();
