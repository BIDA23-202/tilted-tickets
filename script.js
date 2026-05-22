// ============================================================
// TILTED TICKETS — script.js
// Vanilla JS SPA | ICT205 BAC 2026
// ============================================================

// ── 1. GLOBAL STATE ─────────────────────────────────────────
const STATE = {
  user: { id: 'user-demo', name: 'Demo Customer', email: 'demo@tilted.bw', phone: '+26772300000', nationalId: '123456789' },
  organizer: { id: 'org-demo', name: 'Tilted Organizer', email: 'organizer@tilted.bw' },
  currentRole: 'customer', // 'customer' | 'organizer'
  cart: [],
  orders: [],
  tickets: [],
  paymentMode: 'success', // 'success' | 'failure'
  checkout: { eventId: null, tierId: null, quantity: 1, paymentMethod: 'Orange Money', promoCode: '' },
  events: [
    {
      id: 'evt-gimf-2026',
      title: 'Gaborone International Music Festival',
      description: 'A full-night music festival at the National Stadium with local stars, regional guests, food stalls and QR gate entry.',
      organizerName: 'Tilted Live',
      date: '2026-09-07', time: '17:00',
      venue: 'National Stadium', city: 'Gaborone',
      category: 'Music', posterColor: '#4f46e5',
      posterImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=300&fit=crop&q=80',
      highlights: ['Live regional acts', 'VIP pit access', 'Cashless food court'],
      ticketTiers: [
        { id: 'early', name: 'Early Bird', price: 180, originalPrice: 220, qty: 200, remaining: 120, perks: ['Early entry', 'Discounted price'], earlyBirdEnd: '2026-08-10' },
        { id: 'general', name: 'General', price: 250, qty: 800, remaining: 650, perks: ['Standard access'] },
        { id: 'vip', name: 'VIP Pit', price: 650, qty: 150, remaining: 90, perks: ['VIP pit', 'Fast-track entry', 'Private bar'] }
      ],
      featured: true, trending: true, campus: false, weekendEvent: true, status: 'published'
    },
    {
      id: 'evt-comedy-night',
      title: 'Botswana Comedy Night',
      description: 'Stand-up comedy at Maitisong Theatre featuring Botswana headliners and rising acts from the local scene.',
      organizerName: 'Maitisong Live',
      date: '2026-07-18', time: '19:30',
      venue: 'Maitisong Theatre', city: 'Gaborone',
      category: 'Comedy', posterColor: '#06b6d4',
      posterImage: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&h=300&fit=crop&q=80',
      highlights: ['Reserved seating', 'Local headliners', 'Photo wall'],
      ticketTiers: [
        { id: 'standard', name: 'Standard', price: 150, qty: 220, remaining: 87, perks: ['Main hall access'] },
        { id: 'front', name: 'Front Row', price: 280, qty: 50, remaining: 18, perks: ['Front-row seating', 'Priority entry'] }
      ],
      featured: true, trending: true, campus: false, weekendEvent: true, status: 'published'
    },
    {
      id: 'evt-ub-tech',
      title: 'UB Innovation & Tech Showcase',
      description: 'University teams pitch apps, data tools and campus products in a one-day innovation event.',
      organizerName: 'UB Innovation Hub',
      date: '2026-06-20', time: '09:00',
      venue: 'UB Indoor Sports Arena', city: 'Gaborone',
      category: 'Campus', posterColor: '#7c3aed',
      posterImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop&q=80',
      highlights: ['Startup booths', 'Pitch sessions', 'Recruiter corner'],
      ticketTiers: [
        { id: 'student', name: 'Student', price: 40, qty: 400, remaining: 260, perks: ['Expo access'] },
        { id: 'network', name: 'Networking Pass', price: 120, qty: 100, remaining: 61, perks: ['Networking session', 'Pitch finals seating'] }
      ],
      featured: true, trending: false, campus: true, weekendEvent: false, status: 'published'
    },
    {
      id: 'evt-derby',
      title: 'Township Derby: GU vs Rollers',
      description: 'A fierce local football derby with digital gate validation and reserved grandstand options.',
      organizerName: 'Botswana Premier Events',
      date: '2026-08-01', time: '15:00',
      venue: 'National Stadium', city: 'Gaborone',
      category: 'Sports', posterColor: '#f59e0b',
      posterImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=300&fit=crop&q=80',
      highlights: ['Digital turnstile check-in', 'Family stand tickets', 'VIP lounge'],
      ticketTiers: [
        { id: 'terrace', name: 'Terrace', price: 90, qty: 3000, remaining: 1400, perks: ['Open stand'] },
        { id: 'grand', name: 'Grandstand', price: 180, qty: 1200, remaining: 480, perks: ['Covered seating'] },
        { id: 'vip', name: 'VIP Lounge', price: 500, qty: 140, remaining: 35, perks: ['Lounge access', 'Refreshments'] }
      ],
      featured: false, trending: true, campus: false, weekendEvent: true, status: 'published'
    },
    {
      id: 'evt-play',
      title: 'Maitisong Theatre: Nna Ga Ke',
      description: 'A sharp Setswana stage production about identity, pressure and family expectations.',
      organizerName: 'Maitisong Theatre',
      date: '2026-06-28', time: '18:30',
      venue: 'Maitisong Theatre', city: 'Gaborone',
      category: 'Theatre', posterColor: '#ec4899',
      posterImage: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=300&fit=crop&q=80',
      highlights: ['Local cast', 'Post-show talkback', 'Assigned seats'],
      ticketTiers: [
        { id: 'regular', name: 'Regular', price: 120, qty: 180, remaining: 92, perks: ['Standard seating'] },
        { id: 'patron', name: 'Patron', price: 260, qty: 30, remaining: 11, perks: ['Best seats', 'Artist meet-and-greet'] }
      ],
      featured: false, trending: false, campus: false, weekendEvent: true, status: 'published'
    },
    {
      id: 'evt-craft-beer',
      title: 'Botswana Craft Beer & Braai Festival',
      description: 'An outdoor braai and craft beverage event with live DJs, tasting stations and premium lounges.',
      organizerName: 'BBS Festivals',
      date: '2026-09-19', time: '13:00',
      venue: 'Fairgrounds Open Park', city: 'Gaborone',
      category: 'Food', posterColor: '#16a34a',
      posterImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop&q=80',
      highlights: ['Braai village', 'Tasting tokens', 'Sunset set'],
      ticketTiers: [
        { id: 'entry', name: 'Entry', price: 220, qty: 600, remaining: 310, perks: ['Festival access'] },
        { id: 'taster', name: 'Taster Pack', price: 350, qty: 220, remaining: 104, perks: ['Festival access', '4 tasting tokens'] },
        { id: 'lounge', name: 'Lounge', price: 580, qty: 80, remaining: 29, perks: ['Lounge seating', '6 tokens', 'Fast queue'] }
      ],
      featured: true, trending: false, campus: false, weekendEvent: false, status: 'published'
    },
    {
      id: 'evt-leadership',
      title: 'Corporate Leadership Summit',
      description: 'A one-day summit for managers, founders and HR leads discussing execution, culture and growth.',
      organizerName: 'BW Executive Forum',
      date: '2026-10-02', time: '08:00',
      venue: 'Masa Square Conference Centre', city: 'Gaborone',
      category: 'Business', posterColor: '#334155',
      posterImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=300&fit=crop&q=80',
      highlights: ['Breakfast networking', 'Panel sessions', 'Certificate'],
      ticketTiers: [
        { id: 'delegate', name: 'Delegate', price: 950, qty: 250, remaining: 173, perks: ['Conference access', 'Lunch', 'Certificate'] },
        { id: 'premium', name: 'Premium Table', price: 1500, qty: 60, remaining: 27, perks: ['Front seating', 'Lounge access', 'Priority registration'] }
      ],
      featured: false, trending: false, campus: false, weekendEvent: false, status: 'published'
    },
    {
      id: 'evt-bac-expo',
      title: 'BAC Campus Entrepreneurship Expo',
      description: 'Student founders, side hustlers and small businesses show what they are building on campus.',
      organizerName: 'Botswana Accountancy College',
      date: '2026-06-14', time: '10:00',
      venue: 'BAC Main Hall', city: 'Gaborone',
      category: 'Expo', posterColor: '#14b8a6',
      posterImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=300&fit=crop&q=80',
      highlights: ['Pitch booth prizes', 'Student-made brands', 'Campus networking'],
      ticketTiers: [
        { id: 'student', name: 'Student', price: 30, qty: 350, remaining: 218, perks: ['Expo floor access'] },
        { id: 'supporter', name: 'Supporter', price: 80, qty: 120, remaining: 57, perks: ['Expo access', 'Pitch finals seating'] }
      ],
      featured: false, trending: true, campus: true, weekendEvent: true, status: 'published'
    },
    {
      id: 'evt-ftown-food',
      title: 'Francistown Street Food Night Market',
      description: 'A night market with food trucks, local brands, DJs and family-friendly outdoor seating.',
      organizerName: 'Northside Markets',
      date: '2026-07-04', time: '16:00',
      venue: 'Old Stadium Grounds', city: 'Francistown',
      category: 'Food', posterColor: '#fb7185',
      posterImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=300&fit=crop&q=80',
      highlights: ['Food trucks', 'Night market', 'Local makers'],
      ticketTiers: [
        { id: 'entry', name: 'Entry', price: 60, qty: 900, remaining: 520, perks: ['Entry access'] },
        { id: 'vip', name: 'VIP Deck', price: 220, qty: 100, remaining: 44, perks: ['Deck seating', 'Welcome drink'] }
      ],
      featured: false, trending: false, campus: false, weekendEvent: true, status: 'published'
    },
    {
      id: 'evt-maun-jazz',
      title: 'Maun Sunset Jazz by the River',
      description: 'An intimate sunset jazz evening in Maun with premium seating and a calm riverside setup.',
      organizerName: 'Okavango Evenings',
      date: '2026-08-22', time: '17:30',
      venue: 'Riverside Gardens', city: 'Maun',
      category: 'Music', posterColor: '#0ea5e9',
      posterImage: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=300&fit=crop&q=80',
      highlights: ['Sunset jazz set', 'Premium seating', 'Curated food stalls'],
      ticketTiers: [
        { id: 'general', name: 'General', price: 200, qty: 300, remaining: 166, perks: ['Open seating'] },
        { id: 'gold', name: 'Gold Circle', price: 420, qty: 70, remaining: 22, perks: ['Front seating', 'Welcome platter'] }
      ],
      featured: true, trending: false, campus: false, weekendEvent: false, status: 'published'
    },
    {
      id: 'evt-afrobeats',
      title: 'Gaborone Afrobeats Night',
      description: 'High-energy Afrobeats at Capital Square with DJs from Botswana, Zimbabwe and South Africa.',
      organizerName: 'Capital Square Events',
      date: '2026-07-25', time: '20:00',
      venue: 'Capital Square Rooftop', city: 'Gaborone',
      category: 'Music', posterColor: '#7c3aed',
      posterImage: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=600&h=300&fit=crop&q=80',
      highlights: ['Outdoor dance floor', 'Live DJ sets', 'VIP table service'],
      ticketTiers: [
        { id: 'general', name: 'General', price: 120, qty: 500, remaining: 322, perks: ['Dance floor access'] },
        { id: 'vip', name: 'VIP Table', price: 450, qty: 60, remaining: 28, perks: ['Reserved table', 'Bottle service', 'Fast entry'] }
      ],
      featured: true, trending: true, campus: false, weekendEvent: true, status: 'published'
    },
    {
      id: 'evt-bac-hackathon',
      title: 'BAC 24-Hour Hackathon',
      description: 'Students compete to build a working tech product in 24 hours. Cash prizes and internship offers for top 3 teams.',
      organizerName: 'Botswana Accountancy College',
      date: '2026-07-11', time: '08:00',
      venue: 'BAC ICT Lab', city: 'Gaborone',
      category: 'Campus', posterColor: '#4f46e5',
      posterImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop&q=80',
      highlights: ['Cash prizes', 'Internship offers', 'Mentor support'],
      ticketTiers: [
        { id: 'participant', name: 'Participant', price: 0, qty: 80, remaining: 44, perks: ['Full participation', 'Meals included'] },
        { id: 'spectator', name: 'Spectator', price: 30, qty: 200, remaining: 134, perks: ['Watch finals pitch'] }
      ],
      featured: false, trending: true, campus: true, weekendEvent: false, status: 'published'
    },
    {
      id: 'evt-lobatse-sport',
      title: 'Lobatse Community Sports Day',
      description: 'A full-day community sports event with football, volleyball and athletics at Lobatse grounds.',
      organizerName: 'Lobatse Community Trust',
      date: '2026-09-27', time: '08:30',
      venue: 'Lobatse Sports Grounds', city: 'Lobatse',
      category: 'Sports', posterColor: '#16a34a',
      posterImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=300&fit=crop&q=80',
      highlights: ['Multi-sport event', 'Family friendly', 'Vendor stalls'],
      ticketTiers: [
        { id: 'family', name: 'Family Pass', price: 80, qty: 400, remaining: 256, perks: ['All-day access', 'Family of 4'] },
        { id: 'vip', name: 'VIP Stand', price: 200, qty: 80, remaining: 43, perks: ['Covered stand', 'Refreshments'] }
      ],
      featured: false, trending: false, campus: false, weekendEvent: true, status: 'published'
    },
    {
      id: 'evt-palapye-biz',
      title: 'Palapye Business Breakfast',
      description: 'An early-morning business networking event for SME owners, managers and entrepreneurs from the Central District.',
      organizerName: 'Central Business Forum',
      date: '2026-08-13', time: '07:30',
      venue: 'Cresta Marakanelo', city: 'Palapye',
      category: 'Business', posterColor: '#334155',
      posterImage: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=300&fit=crop&q=80',
      highlights: ['Breakfast included', 'Networking session', 'Speaker panel'],
      ticketTiers: [
        { id: 'delegate', name: 'Delegate', price: 350, qty: 120, remaining: 77, perks: ['Breakfast', 'Speaker access', 'Certificate'] }
      ],
      featured: false, trending: false, campus: false, weekendEvent: false, status: 'published'
    }
  ]
};

// ── 2. PERSISTENCE ───────────────────────────────────────────
const STORAGE_KEY = 'tiltedTicketsV2';

function saveState() {
  try {
    const toSave = { cart: STATE.cart, orders: STATE.orders, tickets: STATE.tickets, currentRole: STATE.currentRole, paymentMode: STATE.paymentMode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch(e) { /* private mode — silently ignore */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.cart) STATE.cart = saved.cart;
    if (saved.orders) STATE.orders = saved.orders;
    if (saved.tickets) STATE.tickets = saved.tickets;
    if (saved.currentRole) STATE.currentRole = saved.currentRole;
    if (saved.paymentMode) STATE.paymentMode = saved.paymentMode;
  } catch(e) { /* corrupted storage — ignore and use defaults */ }
}

function resetState() {
  STATE.cart = [];
  STATE.orders = [];
  STATE.tickets = [];
  STATE.currentRole = 'customer';
  STATE.paymentMode = 'success';
  // Reset event stock to defaults
  STATE.events.forEach(ev => {
    ev.ticketTiers.forEach(t => { t.remaining = t.qty; });
  });
  try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
  console.log('[TT] State reset complete');
}

// ── 3. HELPERS ───────────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const bwp = n => `BWP ${Number(n).toFixed(2)}`;
const uid = () => Math.random().toString(36).slice(2, 9).toUpperCase();
const orderNo = () => `TT-${Math.floor(100000 + Math.random() * 900000)}`;
const findEvent = id => STATE.events.find(e => e.id === id);
const findTier = (event, tierId) => event.ticketTiers.find(t => t.id === tierId);
const minPrice = event => Math.min(...event.ticketTiers.map(t => t.price));
const formatDate = (d, t) => {
  const dt = new Date(`${d}T${t || '00:00'}`);
  return dt.toLocaleDateString('en-BW', { day: 'numeric', month: 'short', year: 'numeric' }) + (t ? ` at ${t}` : '');
};

// ── 4. TOAST NOTIFICATIONS ───────────────────────────────────
function toast(msg, type = 'info') {
  const container = $('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// ── 5. ROUTING (SPA view switcher) ───────────────────────────
function showView(viewId) {
  console.log(`[TT] Navigating to: ${viewId}`);
  $$('.view').forEach(v => v.classList.remove('active'));
  const target = $(viewId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  } else {
    console.warn(`[TT] View not found: ${viewId}`);
  }
  // Update active nav link
  $$('.nav-link[data-view]').forEach(a => {
    a.classList.toggle('active', a.dataset.view === viewId);
  });
  // Render view content
  if (viewId === 'view-home')       renderHome();
  if (viewId === 'view-events')     renderEvents();
  if (viewId === 'view-cart')       renderCart();
  if (viewId === 'view-dashboard')  renderDashboard();
  if (viewId === 'view-organizer')  renderOrganizer();
  if (viewId === 'view-checkout')   renderCheckout();
  if (viewId === 'view-confirm')    renderConfirmation();
}

// ── 6. HEADER / CART COUNT ────────────────────────────────────
function renderHeaderCartCount() {
  const badge = $('cartCount');
  if (badge) badge.textContent = STATE.cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateRoleUI() {
  const roleBtn = $('roleIndicator');
  if (roleBtn) roleBtn.textContent = STATE.currentRole === 'organizer' ? 'Organizer mode' : 'Customer mode';
}

// ── 7. CART FUNCTIONS ─────────────────────────────────────────
function addToCart(eventId, tierId, qty = 1) {
  const event = findEvent(eventId);
  if (!event) return;
  const tier = findTier(event, tierId);
  if (!tier) return;
  if (tier.remaining < qty) { toast('Not enough tickets remaining.', 'error'); return; }

  const existing = STATE.cart.find(i => i.eventId === eventId && i.tierId === tierId);
  if (existing) {
    existing.qty += qty;
  } else {
    STATE.cart.push({ id: uid(), eventId, tierId, tierName: tier.name, eventTitle: event.title, eventDate: event.date, eventTime: event.time, venue: event.venue, city: event.city, price: tier.price, qty });
  }
  saveState();
  renderHeaderCartCount();
  toast(`${tier.name} ticket added to cart.`, 'success');
  console.log('[TT] addToCart:', eventId, tierId, qty, '| Cart total:', STATE.cart.length);
}

function removeFromCart(cartItemId) {
  STATE.cart = STATE.cart.filter(i => i.id !== cartItemId);
  saveState();
  renderHeaderCartCount();
  renderCart();
  toast('Item removed from cart.', 'info');
  console.log('[TT] removeFromCart:', cartItemId);
}

function updateCartQty(cartItemId, delta) {
  const item = STATE.cart.find(i => i.id === cartItemId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveState();
  renderHeaderCartCount();
  renderCart();
}

function getCartSubtotal() { return STATE.cart.reduce((sum, i) => sum + i.price * i.qty, 0); }
function getCartServiceFee() { return Math.round(getCartSubtotal() * 0.07 * 100) / 100; }
function getCartTxFee() { return Math.round(getCartSubtotal() * 0.03 * 100) / 100; }
function getCartDiscount() {
  return STATE.checkout.promoCode === 'TILTED2026' ? Math.round(getCartSubtotal() * 0.15 * 100) / 100 : 0;
}
function getCartTotal() { return getCartSubtotal() + getCartServiceFee() + getCartTxFee() - getCartDiscount(); }

// ── 8. QR CANVAS ─────────────────────────────────────────────
function drawQR(canvas, text) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = 140;
  canvas.width = size; canvas.height = size;
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, size, size);
  const bytes = [...text].map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('').split('');
  const cell = 10;
  let i = 0;
  for (let y = 0; y < size; y += cell) {
    for (let x = 0; x < size; x += cell) {
      ctx.fillStyle = bytes[i++ % bytes.length] === '1' ? '#1e1b4b' : '#ffffff';
      ctx.fillRect(x, y, cell, cell);
    }
  }
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.strokeRect(0, 0, size, size);
}

// ── 9. GENERATE TICKETS FROM ORDER ───────────────────────────
function generateTicketsFromOrder(order) {
  const tickets = [];
  order.items.forEach(item => {
    for (let i = 0; i < item.qty; i++) {
      tickets.push({
        id: uid(),
        code: `TT-${uid()}`,
        orderId: order.id,
        eventId: item.eventId,
        eventTitle: item.eventTitle,
        eventDate: item.eventDate,
        eventTime: item.eventTime,
        venue: item.venue,
        city: item.city,
        tierName: item.tierName,
        price: item.price,
        attendeeName: STATE.user.name,
        purchaserId: STATE.user.id,
        checkedIn: false,
        checkedInAt: null,
        createdAt: new Date().toISOString()
      });
    }
  });
  return tickets;
}

// ── 10. COMPLETE CHECKOUT ─────────────────────────────────────
function completeCheckout() {
  if (STATE.cart.length === 0) { toast('Your cart is empty.', 'error'); return; }

  // Deduct stock
  STATE.cart.forEach(item => {
    const event = findEvent(item.eventId);
    if (event) {
      const tier = findTier(event, item.tierId);
      if (tier) tier.remaining = Math.max(0, tier.remaining - item.qty);
    }
  });

  const order = {
    id: uid(),
    orderNumber: orderNo(),
    purchaserId: STATE.user.id,
    purchaserName: STATE.user.name,
    purchaserEmail: STATE.user.email,
    items: [...STATE.cart],
    subtotal: getCartSubtotal(),
    serviceFee: getCartServiceFee(),
    txFee: getCartTxFee(),
    discount: getCartDiscount(),
    total: getCartTotal(),
    paymentMethod: STATE.checkout.paymentMethod,
    promoCode: STATE.checkout.promoCode,
    createdAt: new Date().toISOString()
  };

  const newTickets = generateTicketsFromOrder(order);
  STATE.orders.unshift(order);
  STATE.tickets.push(...newTickets);
  STATE.cart = [];
  STATE.checkout.promoCode = '';

  saveState();
  renderHeaderCartCount();
  console.log('[TT] Order complete:', order.orderNumber, '| Tickets generated:', newTickets.length);
  toast(`Order ${order.orderNumber} confirmed! ${newTickets.length} ticket(s) issued.`, 'success');
  showView('view-confirm');
}

// ── 11. RENDER: HOME ─────────────────────────────────────────
function renderHome() {
  const featured = STATE.events.filter(e => e.featured && e.status === 'published').slice(0, 6);
  const trending = STATE.events.filter(e => e.trending && e.status === 'published').slice(0, 4);
  const campus   = STATE.events.filter(e => e.campus && e.status === 'published').slice(0, 3);
  const weekend  = STATE.events.filter(e => e.weekendEvent && e.status === 'published').slice(0, 3);

  const featuredEl = $('featuredEvents');
  if (featuredEl) featuredEl.innerHTML = featured.map(eventCard).join('');

  const trendEl = $('trendingEvents');
  if (trendEl) trendEl.innerHTML = trending.map(smallCard).join('');

  const campEl = $('campusEvents');
  if (campEl) campEl.innerHTML = campus.map(smallCard).join('');

  const wkndEl = $('weekendEvents');
  if (wkndEl) wkndEl.innerHTML = weekend.map(smallCard).join('');

  const heroSold = $('heroSold');
  if (heroSold) heroSold.textContent = STATE.tickets.length;

  const heroEvents = $('heroEvents');
  if (heroEvents) heroEvents.textContent = STATE.events.filter(e => e.status === 'published').length;

  const heroCities = $('heroCities');
  if (heroCities) heroCities.textContent = new Set(STATE.events.map(e => e.city)).size;
}

// ── 12. EVENT CARD TEMPLATES ─────────────────────────────────
function eventCard(ev) {
  const sold = ev.ticketTiers.every(t => t.remaining <= 0);
  const lowest = findTier(ev, ev.ticketTiers.reduce((a, b) => a.price < b.price ? a : b).id);
  const pct = Math.round((lowest.remaining / lowest.qty) * 100);
  const fillClass = pct <= 15 ? 'critical' : pct <= 35 ? 'low' : '';
  const attendees = STATE.tickets.filter(t => t.eventId === ev.id).length;
  const imgStyle = ev.posterImage
    ? `background-image:url(${ev.posterImage});background-size:cover;background-position:center`
    : `background:linear-gradient(135deg,${ev.posterColor},#06b6d4)`;

  return `
  <article class="event-card card">
    <div class="poster" style="${imgStyle}">
      <span class="poster-badge">${ev.category}</span>
      ${ev.featured ? '<span class="poster-badge-right">Featured</span>' : ''}
    </div>
    <div class="event-body">
      <h3>${ev.title}</h3>
      <div class="event-meta">
        <span>📅 ${formatDate(ev.date, ev.time)}</span>
        <span>📍 ${ev.venue}, ${ev.city}</span>
      </div>
      ${attendees > 0 ? `<div class="attending-badge"><span class="attending-dot"></span>${attendees} attending</div>` : ''}
      <div class="capacity-wrap">
        <div class="capacity-label"><span>${sold ? 'Sold out' : pct <= 15 ? `Only ${lowest.remaining} left!` : `${lowest.remaining} remaining`}</span><span>${pct}%</span></div>
        <div class="capacity-bar"><div class="capacity-fill ${fillClass}" style="width:${pct}%"></div></div>
      </div>
      <div class="price-row">
        <strong>From ${bwp(minPrice(ev))}</strong>
        <span class="tag ${sold ? 'tag-sold' : 'tag-avail'}">${sold ? 'Sold out' : 'Available'}</span>
      </div>
      <div class="card-actions">
        <button class="btn btn-primary" data-action="view-event" data-event-id="${ev.id}">View event</button>
        ${!sold ? `<button class="btn btn-secondary" data-action="quick-add" data-event-id="${ev.id}" data-tier-id="${ev.ticketTiers[0].id}">Add to cart</button>` : ''}
      </div>
    </div>
  </article>`;
}

function smallCard(ev) {
  return `
  <div class="small-card">
    <div>
      <strong>${ev.title}</strong>
      <div class="muted">${ev.city} · ${formatDate(ev.date, ev.time)}</div>
      <div class="muted">From ${bwp(minPrice(ev))}</div>
    </div>
    <button class="btn btn-ghost btn-sm" data-action="view-event" data-event-id="${ev.id}">Open</button>
  </div>`;
}

// ── 13. RENDER: EVENT DETAIL ─────────────────────────────────
function renderEventDetail(eventId) {
  const ev = findEvent(eventId);
  if (!ev) { toast('Event not found.', 'error'); return; }

  const detailEl = $('view-event-detail');
  if (!detailEl) return;

  const imgStyle = ev.posterImage
    ? `background:linear-gradient(to bottom,rgba(0,0,0,.35),rgba(0,0,0,.65)),url(${ev.posterImage});background-size:cover;background-position:center`
    : `background:linear-gradient(135deg,${ev.posterColor},#06b6d4)`;

  const related = STATE.events.filter(e => e.id !== eventId && e.category === ev.category).slice(0, 3);

  detailEl.innerHTML = `
    <button class="btn btn-ghost back-btn" data-action="go" data-view="view-events">← Back to events</button>
    <div class="detail-layout">
      <div>
        <div class="detail-banner" style="${imgStyle}">
          <span class="pill pill-light">${ev.category}</span>
          <h1>${ev.title}</h1>
          <p>${ev.organizerName} · ${formatDate(ev.date, ev.time)} · ${ev.venue}, ${ev.city}</p>
        </div>
        <div class="card" style="margin-top:16px">
          <h3>About this event</h3>
          <p class="muted">${ev.description}</p>
          <div class="perks">${ev.highlights.map(h => `<span class="tag">${h}</span>`).join('')}</div>
        </div>
        ${related.length ? `<div class="card" style="margin-top:16px"><h3>Related events</h3><div class="stack">${related.map(smallCard).join('')}</div></div>` : ''}
      </div>
      <div>
        <div class="card">
          <h3>Select your tickets</h3>
          ${ev.ticketTiers.map(t => {
            const sold = t.remaining <= 0;
            const pct = Math.round((t.remaining / t.qty) * 100);
            const ebEnd = t.earlyBirdEnd ? `<div class="countdown-badge">⏳ Early bird ends ${formatDate(t.earlyBirdEnd)}</div>` : '';
            return `
            <div class="tier-row ${sold ? 'tier-sold' : ''}">
              <div>
                <strong>${t.name}</strong> — ${bwp(t.price)}
                ${t.originalPrice ? `<span class="muted line-through">${bwp(t.originalPrice)}</span>` : ''}
                <div class="perks">${t.perks.map(p => `<span class="tag">${p}</span>`).join('')}</div>
                ${ebEnd}
                <div class="capacity-bar" style="margin-top:6px"><div class="capacity-fill ${pct<=15?'critical':pct<=35?'low':''}" style="width:${pct}%"></div></div>
                <small class="muted">${sold ? 'Sold out' : `${t.remaining} of ${t.qty} remaining`}</small>
              </div>
              ${!sold ? `
              <div class="tier-actions">
                <div class="qty-wrap">
                  <button class="qty-btn" data-action="tier-qty" data-tier-id="${t.id}" data-delta="-1">−</button>
                  <span class="qty-display" id="qty-${t.id}">1</span>
                  <button class="qty-btn" data-action="tier-qty" data-tier-id="${t.id}" data-delta="1">+</button>
                </div>
                <button class="btn btn-primary btn-sm" data-action="add-tier" data-event-id="${ev.id}" data-tier-id="${t.id}">Add to cart</button>
              </div>` : `<span class="tag tag-sold">Sold out</span>`}
            </div>`;
          }).join('')}
        </div>
        <div class="card" style="margin-top:16px">
          <button class="btn btn-primary wide" data-action="go" data-view="view-cart">View cart & checkout</button>
          <button class="btn btn-ghost wide" style="margin-top:10px" data-action="share-event" data-event-id="${ev.id}">Share event</button>
        </div>
      </div>
    </div>`;

  showView('view-event-detail');
}

// ── 14. RENDER: EVENTS LISTING ───────────────────────────────
function renderEvents(filter = {}) {
  let events = STATE.events.filter(e => e.status === 'published');
  if (filter.search) {
    const q = filter.search.toLowerCase();
    events = events.filter(e => `${e.title} ${e.city} ${e.venue} ${e.category}`.toLowerCase().includes(q));
  }
  if (filter.category) events = events.filter(e => e.category === filter.category);
  if (filter.city)     events = events.filter(e => e.city === filter.city);
  if (filter.price === 'low')  events = events.filter(e => minPrice(e) < 200);
  if (filter.price === 'mid')  events = events.filter(e => minPrice(e) >= 200 && minPrice(e) <= 400);
  if (filter.price === 'high') events = events.filter(e => minPrice(e) > 400);

  const grid = $('eventsGrid');
  if (!grid) return;
  grid.innerHTML = events.length ? events.map(eventCard).join('') : '<div class="empty-state">No events match your filters. <button class="btn btn-ghost btn-sm" data-action="clear-filters">Clear filters</button></div>';

  // Populate filter dropdowns
  populateDropdown('filterCategory', [...new Set(STATE.events.map(e => e.category))]);
  populateDropdown('filterCity',     [...new Set(STATE.events.map(e => e.city))]);
}

function populateDropdown(id, options) {
  const el = $(id);
  if (!el || el.options.length > 1) return; // already populated
  options.forEach(opt => {
    const o = document.createElement('option');
    o.value = opt; o.textContent = opt;
    el.appendChild(o);
  });
}

// ── 15. RENDER: CART ─────────────────────────────────────────
function renderCart() {
  const wrap = $('cartWrap');
  if (!wrap) return;

  if (STATE.cart.length === 0) {
    wrap.innerHTML = `
      <div class="empty-state">
        <p>Your cart is empty.</p>
        <button class="btn btn-primary" data-action="go" data-view="view-events">Browse events</button>
      </div>`;
    return;
  }

  const itemsHTML = STATE.cart.map(item => `
    <div class="cart-item card">
      <div>
        <strong>${item.eventTitle}</strong>
        <div class="muted">${item.tierName} · ${formatDate(item.eventDate, item.eventTime)}</div>
        <div class="muted">${item.venue}, ${item.city}</div>
        <div style="margin-top:6px"><strong>${bwp(item.price)}</strong> × ${item.qty} = <strong>${bwp(item.price * item.qty)}</strong></div>
      </div>
      <div class="cart-item-actions">
        <div class="qty-wrap">
          <button class="qty-btn" data-action="cart-qty" data-cart-id="${item.id}" data-delta="-1">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="cart-qty" data-cart-id="${item.id}" data-delta="1">+</button>
        </div>
        <button class="btn btn-danger btn-sm" data-action="remove-cart" data-cart-id="${item.id}">Remove</button>
      </div>
    </div>`).join('');

  const sub = getCartSubtotal(), svc = getCartServiceFee(), tx = getCartTxFee(), disc = getCartDiscount(), total = getCartTotal();

  wrap.innerHTML = `
    <div class="cart-layout">
      <div class="stack">${itemsHTML}</div>
      <div class="card cart-summary">
        <h3>Order summary</h3>
        <div class="summary-row"><span>Subtotal</span><strong>${bwp(sub)}</strong></div>
        <div class="summary-row"><span>Service fee (7%)</span><strong>${bwp(svc)}</strong></div>
        <div class="summary-row"><span>Transaction fee (3%)</span><strong>${bwp(tx)}</strong></div>
        ${disc > 0 ? `<div class="summary-row success-text"><span>Promo discount</span><strong>- ${bwp(disc)}</strong></div>` : ''}
        <div class="summary-row total-row"><span>Total</span><strong>${bwp(total)}</strong></div>
        <div style="margin-top:14px;display:flex;gap:8px">
          <input id="promoInput" type="text" placeholder="Promo code" value="${STATE.checkout.promoCode}" style="flex:1" />
          <button class="btn btn-ghost" data-action="apply-promo">Apply</button>
        </div>
        <div style="margin-top:12px">
          <label style="display:flex;align-items:center;gap:8px;color:var(--muted);font-size:.9rem">
            <select id="paymentMethod" style="flex:1">
              <option ${STATE.checkout.paymentMethod==='Orange Money'?'selected':''}>Orange Money</option>
              <option ${STATE.checkout.paymentMethod==='MyZaka'?'selected':''}>MyZaka</option>
              <option ${STATE.checkout.paymentMethod==='Bank Card'?'selected':''}>Bank Card</option>
              <option ${STATE.checkout.paymentMethod==='Cash Deposit'?'selected':''}>Cash Deposit</option>
            </select>
          </label>
        </div>
        <button class="btn btn-primary wide" style="margin-top:16px" data-action="confirm-payment">
          Confirm Payment · ${bwp(total)}
        </button>
        <small class="muted" style="display:block;text-align:center;margin-top:8px">Use promo TILTED2026 for 15% off</small>
      </div>
    </div>`;
}

// ── 16. RENDER: CONFIRMATION ──────────────────────────────────
function renderConfirmation() {
  const wrap = $('confirmWrap');
  if (!wrap) return;

  const lastOrder = STATE.orders[0];
  if (!lastOrder) { wrap.innerHTML = '<div class="empty-state">No recent order found.</div>'; return; }

  const orderTickets = STATE.tickets.filter(t => t.orderId === lastOrder.id);

  wrap.innerHTML = `
    <div class="card stack">
      <span class="pill">Payment confirmed</span>
      <h2>Order ${lastOrder.orderNumber}</h2>
      <p class="muted">A confirmation notice has been sent to ${lastOrder.purchaserEmail}. Your tickets are ready below.</p>
      <div class="summary-row"><span>Payment method</span><strong>${lastOrder.paymentMethod}</strong></div>
      <div class="summary-row"><span>Total paid</span><strong>${bwp(lastOrder.total)}</strong></div>
      <div class="inline-actions">
        <button class="btn btn-secondary" data-action="go" data-view="view-dashboard">Go to My Tickets</button>
        <button class="btn btn-ghost" onclick="window.print()">Print tickets</button>
      </div>
      <div class="tickets-grid">
        ${orderTickets.map(t => `
        <div class="ticket-card card">
          <span class="pill">${t.tierName}</span>
          <h3>${t.eventTitle}</h3>
          <div class="muted">${formatDate(t.eventDate, t.eventTime)} · ${t.venue}</div>
          <div class="ticket-code">${t.code}</div>
          <canvas id="qr-${t.id}" class="qr-canvas"></canvas>
          <div class="muted">${t.attendeeName}</div>
        </div>`).join('')}
      </div>
    </div>`;

  setTimeout(() => {
    orderTickets.forEach(t => drawQR($(`qr-${t.id}`), `${t.code}|${t.eventId}|${t.attendeeName}`));
  }, 60);
}

// ── 17. RENDER: CUSTOMER DASHBOARD ───────────────────────────
function renderDashboard() {
  const wrap = $('dashboardWrap');
  if (!wrap) return;

  const now = new Date();
  const myTickets = STATE.tickets.filter(t => t.purchaserId === STATE.user.id);
  const upcoming = myTickets.filter(t => new Date(`${t.eventDate}T${t.eventTime}`) >= now);
  const past     = myTickets.filter(t => new Date(`${t.eventDate}T${t.eventTime}`) < now);
  const totalSpent = STATE.orders.filter(o => o.purchaserId === STATE.user.id).reduce((s, o) => s + o.total, 0);

  const ticketRow = t => `
    <div class="ticket-item">
      <div>
        <strong>${t.eventTitle}</strong>
        <div class="muted">${t.tierName} · ${formatDate(t.eventDate, t.eventTime)} · ${t.city}</div>
        <div class="ticket-code">${t.code}</div>
        ${t.checkedIn ? '<span class="tag tag-used">Checked in</span>' : '<span class="tag tag-avail">Valid for entry</span>'}
      </div>
      <button class="btn btn-ghost btn-sm" data-action="open-ticket" data-ticket-id="${t.id}">View QR</button>
    </div>`;

  wrap.innerHTML = `
    <div class="stats-grid">
      <div class="metric"><span class="muted">Tickets owned</span><strong>${myTickets.length}</strong></div>
      <div class="metric"><span class="muted">Upcoming events</span><strong>${upcoming.length}</strong></div>
      <div class="metric"><span class="muted">Past events</span><strong>${past.length}</strong></div>
      <div class="metric"><span class="muted">Total spent</span><strong>${bwp(totalSpent)}</strong></div>
    </div>
    <div class="dashboard-grid">
      <div class="card">
        <h3>Upcoming tickets (${upcoming.length})</h3>
        ${upcoming.length ? upcoming.map(ticketRow).join('') : '<div class="empty-state">No upcoming tickets. <button class="btn btn-ghost btn-sm" data-action="go" data-view="view-events">Browse events</button></div>'}
      </div>
      <div class="card">
        <h3>Past events (${past.length})</h3>
        ${past.length ? past.map(ticketRow).join('') : '<div class="empty-state">No past events yet.</div>'}
      </div>
    </div>
    <div class="card" style="margin-top:16px">
      <h3>Purchase history</h3>
      ${STATE.orders.filter(o => o.purchaserId === STATE.user.id).length
        ? STATE.orders.filter(o => o.purchaserId === STATE.user.id).map(o => `
          <div class="history-row">
            <div><strong>${o.orderNumber}</strong> <span class="muted">— ${o.items.map(i=>i.eventTitle).join(', ')}</span></div>
            <div class="muted">${new Date(o.createdAt).toLocaleDateString()} · ${o.paymentMethod}</div>
            <strong>${bwp(o.total)}</strong>
          </div>`).join('')
        : '<div class="empty-state">No purchases yet.</div>'
      }
    </div>`;
}

// ── 18. TICKET MODAL ─────────────────────────────────────────
function openTicketModal(ticketId) {
  const t = STATE.tickets.find(tk => tk.id === ticketId);
  if (!t) return;
  const modal = $('ticketModal');
  const body  = $('modalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <span class="pill">${t.checkedIn ? 'Checked in' : 'Valid for entry'}</span>
    <h2>${t.eventTitle}</h2>
    <div class="muted">${t.tierName} · ${formatDate(t.eventDate, t.eventTime)}</div>
    <div class="muted">${t.venue}, ${t.city}</div>
    <div class="ticket-code" style="margin:14px 0">${t.code}</div>
    <canvas id="modal-qr" class="qr-canvas"></canvas>
    <div class="muted" style="margin-top:10px">${t.attendeeName}</div>`;

  modal.classList.remove('hidden');
  setTimeout(() => drawQR($('modal-qr'), `${t.code}|${t.eventId}|${t.attendeeName}`), 30);
}

// ── 19. RENDER: ORGANIZER DASHBOARD ──────────────────────────
function renderOrganizer() {
  const wrap = $('organizerWrap');
  if (!wrap) return;

  const totalSold    = STATE.tickets.length;
  const totalRevenue = STATE.tickets.reduce((s, t) => s + t.price, 0);
  const checkedIn    = STATE.tickets.filter(t => t.checkedIn).length;
  const payout       = totalRevenue * 0.9;

  const evStats = STATE.events.filter(e => e.status === 'published').map(ev => {
    const sold = STATE.tickets.filter(t => t.eventId === ev.id).length;
    const checkedInCount = STATE.tickets.filter(t => t.eventId === ev.id && t.checkedIn).length;
    const capacity = ev.ticketTiers.reduce((s, t) => s + t.qty, 0);
    const revenue  = STATE.tickets.filter(t => t.eventId === ev.id).reduce((s, t) => s + t.price, 0);
    return { ev, sold, capacity, revenue, checkedInCount };
  });

  wrap.innerHTML = `
    <div class="stats-grid stats-5">
      <div class="metric"><span class="muted">Total events</span><strong>${STATE.events.length}</strong></div>
      <div class="metric"><span class="muted">Tickets sold</span><strong>${totalSold}</strong></div>
      <div class="metric"><span class="muted">Revenue</span><strong>${bwp(totalRevenue)}</strong></div>
      <div class="metric"><span class="muted">Checked in</span><strong>${checkedIn}</strong></div>
      <div class="metric"><span class="muted">Your payout (90%)</span><strong>${bwp(payout)}</strong></div>
    </div>
    <div class="dashboard-grid" style="margin-top:20px">
      <div class="card">
        <h3>Event performance</h3>
        <div class="stack">
          ${evStats.map(({ ev, sold, capacity, revenue, checkedInCount }) => `
          <div class="organizer-row">
            <div>
              <strong>${ev.title}</strong>
              <div class="muted">${ev.city} · ${formatDate(ev.date, ev.time)}</div>
              <div class="capacity-bar" style="margin-top:6px"><div class="capacity-fill" style="width:${Math.round(sold/capacity*100)}%"></div></div>
              <small class="muted">${sold} sold / ${capacity} capacity · ${bwp(revenue)} revenue · ${checkedInCount} checked in</small>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <h3>Ticket validation</h3>
        <p class="muted">Enter a ticket code to check in an attendee at the gate.</p>
        <div class="stack">
          <input id="validateInput" placeholder="Enter ticket code e.g. TT-AB12CD3" />
          <div class="inline-actions">
            <button class="btn btn-primary" data-action="validate-ticket">Validate</button>
            <button class="btn btn-secondary" data-action="scan-latest">Scan latest ticket</button>
          </div>
          <div id="validationResult"></div>
        </div>
        <div style="margin-top:20px">
          <h3>Recent sales</h3>
          <div class="stack">
            ${STATE.orders.length ? STATE.orders.slice(0, 6).map(o => `
            <div class="organizer-row">
              <strong>${o.orderNumber}</strong>
              <div class="muted">${o.purchaserName} · ${o.items.map(i=>i.eventTitle).join(', ')}</div>
              <div class="muted">${o.paymentMethod} · ${bwp(o.total)}</div>
            </div>`).join('') : '<div class="empty-state">No orders yet.</div>'}
          </div>
        </div>
      </div>
    </div>`;
}

// ── 20. TICKET VALIDATION ─────────────────────────────────────
function validateTicketCode(code) {
  const result = $('validationResult');
  if (!result) return;
  const ticket = STATE.tickets.find(t => t.code === code.trim());
  if (!ticket) {
    result.innerHTML = '<div class="validation-state invalid">✗ INVALID — Ticket not found</div>';
    toast('Ticket not found.', 'error');
    return;
  }
  if (ticket.checkedIn) {
    result.innerHTML = `<div class="validation-state used">⚠ ALREADY USED — Checked in at ${ticket.checkedInAt}</div><div class="muted">${ticket.attendeeName} · ${ticket.tierName}</div>`;
    toast('Ticket already used.', 'info');
    return;
  }
  ticket.checkedIn = true;
  ticket.checkedInAt = new Date().toLocaleString();
  saveState();
  result.innerHTML = `<div class="validation-state valid">✓ VALID — Checked in successfully</div><div class="muted">${ticket.attendeeName} · ${ticket.tierName} · ${ticket.eventTitle}</div>`;
  toast(`${ticket.attendeeName} checked in.`, 'success');
  console.log('[TT] Ticket validated:', code);
}

// ── 21. RENDER: CHECKOUT (redirect to cart) ───────────────────
function renderCheckout() { renderCart(); }

// ── 22. DEMO PANEL ────────────────────────────────────────────
function toggleDemoPanel() {
  const panel = $('demoPanel');
  const btn   = $('demoPanelToggle');
  if (!panel) return;
  const open = panel.classList.toggle('demo-open');
  if (btn) btn.textContent = open ? 'Hide Demo Panel ✕' : 'Demo Panel ⚡';
  console.log('[TT] Demo panel:', open ? 'opened' : 'closed');
}

function demoFillUser() {
  STATE.user = { id: 'user-demo', name: 'Demo Customer', email: 'demo@tilted.bw', phone: '+26772300000', nationalId: '123456789' };
  saveState();
  toast('Demo user loaded: demo@tilted.bw', 'success');
  console.log('[TT] Demo user filled');
}

function demoAddToCart() {
  STATE.cart = [];
  addToCart('evt-gimf-2026', 'general', 2);
  addToCart('evt-comedy-night', 'front', 1);
  showView('view-cart');
  toast('2 events added to cart.', 'success');
}

function demoSimulateOrder() {
  STATE.cart = [];
  addToCart('evt-gimf-2026', 'vip', 1);
  STATE.checkout.paymentMethod = 'Orange Money';
  STATE.checkout.promoCode = 'TILTED2026';
  completeCheckout();
}

function demoReset() {
  resetState();
  renderHeaderCartCount();
  renderHome();
  showView('view-home');
  toast('Demo fully reset.', 'info');
}

function demoJumpCustomer() {
  STATE.currentRole = 'customer';
  updateRoleUI();
  saveState();
  showView('view-dashboard');
  toast('Switched to Customer mode.', 'info');
}

function demoJumpOrganizer() {
  STATE.currentRole = 'organizer';
  updateRoleUI();
  saveState();
  showView('view-organizer');
  toast('Switched to Organizer mode.', 'info');
}

function demoForceSuccess() { STATE.paymentMode = 'success'; saveState(); toast('Payment mode: SUCCESS', 'success'); }
function demoForceFailure() { STATE.paymentMode = 'failure'; saveState(); toast('Payment mode: FAILURE (next payment will fail)', 'error'); }

// ── 23. GLOBAL EVENT DELEGATION ──────────────────────────────
// ONE listener on document — all buttons use data-action
document.addEventListener('click', function(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const action  = btn.dataset.action;
  const eventId = btn.dataset.eventId;
  const tierId  = btn.dataset.tierId;
  const view    = btn.dataset.view;
  const cartId  = btn.dataset.cartId;
  const ticketId= btn.dataset.ticketId;
  const delta   = parseInt(btn.dataset.delta || '0', 10);

  console.log(`[TT] Action: ${action}`, btn.dataset);

  switch (action) {
    case 'go':
      showView(view);
      break;
    case 'view-event':
      renderEventDetail(eventId);
      break;
    case 'quick-add':
      addToCart(eventId, tierId, 1);
      break;
    case 'add-tier': {
      const qtyEl = $(`qty-${tierId}`);
      const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      addToCart(eventId, tierId, qty);
      break;
    }
    case 'tier-qty': {
      const qtyEl = $(`qty-${tierId}`);
      if (qtyEl) {
        const cur = parseInt(qtyEl.textContent, 10);
        qtyEl.textContent = Math.max(1, cur + delta);
      }
      break;
    }
    case 'cart-qty':
      updateCartQty(cartId, delta);
      break;
    case 'remove-cart':
      removeFromCart(cartId);
      break;
    case 'apply-promo': {
      const input = $('promoInput');
      if (input) STATE.checkout.promoCode = input.value.trim().toUpperCase();
      renderCart();
      toast(STATE.checkout.promoCode === 'TILTED2026' ? '15% discount applied!' : 'Invalid promo code.', STATE.checkout.promoCode === 'TILTED2026' ? 'success' : 'error');
      break;
    }
    case 'confirm-payment': {
      const pmEl = $('paymentMethod');
      if (pmEl) STATE.checkout.paymentMethod = pmEl.value;
      if (STATE.paymentMode === 'failure') { toast('Payment failed. Retry or switch method.', 'error'); return; }
      const payBtn = btn;
      payBtn.disabled = true;
      payBtn.innerHTML = '<span class="spinner"></span>Processing...';
      setTimeout(() => { payBtn.disabled = false; completeCheckout(); }, 1800);
      break;
    }
    case 'open-ticket':
      openTicketModal(ticketId);
      break;
    case 'validate-ticket': {
      const input = $('validateInput');
      if (input) validateTicketCode(input.value);
      break;
    }
    case 'scan-latest': {
      const latest = STATE.tickets[STATE.tickets.length - 1];
      if (!latest) { toast('No tickets sold yet.', 'error'); return; }
      const inp = $('validateInput');
      if (inp) inp.value = latest.code;
      validateTicketCode(latest.code);
      break;
    }
    case 'share-event':
      if (navigator.clipboard) navigator.clipboard.writeText(location.href.split('#')[0] + '#event-' + eventId);
      toast('Share link copied to clipboard.', 'info');
      break;
    case 'clear-filters':
      clearFilters();
      break;
    case 'demo-toggle':   toggleDemoPanel(); break;
    case 'demo-user':     demoFillUser(); break;
    case 'demo-cart':     demoAddToCart(); break;
    case 'demo-order':    demoSimulateOrder(); break;
    case 'demo-reset':    demoReset(); break;
    case 'demo-customer': demoJumpCustomer(); break;
    case 'demo-organizer':demoJumpOrganizer(); break;
    case 'demo-success':  demoForceSuccess(); break;
    case 'demo-failure':  demoForceFailure(); break;
    case 'close-modal': {
      const modal = $('ticketModal');
      if (modal) modal.classList.add('hidden');
      break;
    }
    case 'dark-toggle':
      document.body.classList.toggle('dark');
      break;
    default:
      console.log('[TT] Unhandled action:', action);
  }
});

// ── 24. SEARCH & FILTER WIRING ────────────────────────────────
function getFilters() {
  return {
    search:   ($('filterSearch')   || {}).value || '',
    category: ($('filterCategory') || {}).value || '',
    city:     ($('filterCity')     || {}).value || '',
    price:    ($('filterPrice')    || {}).value || ''
  };
}

function clearFilters() {
  ['filterSearch','filterCategory','filterCity','filterPrice'].forEach(id => { const el = $(id); if(el) el.value=''; });
  renderEvents();
}

// ── 25. HOME SEARCH ───────────────────────────────────────────
function bindHomeSearch() {
  const btn = $('homeSearchBtn');
  if (btn) btn.addEventListener('click', () => {
    const q = ($('homeSearchInput') || {}).value || '';
    const cat = ($('homeCategoryFilter') || {}).value || '';
    const city = ($('homeCityFilter') || {}).value || '';
    showView('view-events');
    setTimeout(() => {
      const fs = $('filterSearch'); if(fs) fs.value = q;
      const fc = $('filterCategory'); if(fc) fc.value = cat;
      const fci = $('filterCity'); if(fci) fci.value = city;
      renderEvents(getFilters());
    }, 50);
  });
}

// ── 26. NAV LINK WIRING ───────────────────────────────────────
function bindNavLinks() {
  $$('.nav-link[data-view]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      showView(a.dataset.view);
    });
  });
}

// ── 27. FILTER LIVE WIRING ────────────────────────────────────
function bindFilters() {
  ['filterSearch','filterCategory','filterCity','filterPrice'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', () => renderEvents(getFilters()));
  });
}

// ── 28. MODAL CLOSE ON BACKDROP ───────────────────────────────
function bindModal() {
  const modal = $('ticketModal');
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
}

// ── 29. HOME CATEGORY/CITY DROPDOWN POPULATION ───────────────
function populateHomeDropdowns() {
  const cats  = [...new Set(STATE.events.map(e => e.category))];
  const cities = [...new Set(STATE.events.map(e => e.city))];
  ['homeCategoryFilter', 'filterCategory'].forEach(id => {
    const el = $(id); if (!el) return;
    cats.forEach(c => { const o = document.createElement('option'); o.value=c; o.textContent=c; el.appendChild(o); });
  });
  ['homeCityFilter', 'filterCity'].forEach(id => {
    const el = $(id); if (!el) return;
    cities.forEach(c => { const o = document.createElement('option'); o.value=c; o.textContent=c; el.appendChild(o); });
  });
}

// ── 30. INIT ─────────────────────────────────────────────────
function initApp() {
  console.log('[TT] Tilted Tickets initialising...');
  loadState();
  populateHomeDropdowns();
  bindNavLinks();
  bindFilters();
  bindHomeSearch();
  bindModal();
  renderHeaderCartCount();
  updateRoleUI();
  renderHome();
  showView('view-home');
  console.log('[TT] Init complete. Events:', STATE.events.length, '| Tickets:', STATE.tickets.length);
}

document.addEventListener('DOMContentLoaded', initApp);
