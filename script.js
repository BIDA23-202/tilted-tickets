
const App = (() => {
  const views = [...document.querySelectorAll('.view')];
  const toastContainer = document.getElementById('toastContainer');
  const modal = document.getElementById('ticketModal');
  const modalBody = document.getElementById('modalBody');
  const storageKey = 'tiltedTicketsStateV1';
  const fallback = { ok: true };
  let memoryState = null;

  const defaultState = {
    currentUser: null,
    paymentMode: 'success',
    checkout: { eventId:null, tierId:null, quantity:1, attendeeDetails:[], purchaser:{}, promoCode:'', discount:0, paymentMethod:'Orange Money', specialRequests:'' },
    events: [
      {id:'evt-gimf-2026',posterImage:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=300&fit=crop&q=80',title:'Gaborone International Music Festival',description:'A full-night music festival at the National Stadium with local stars, regional guests, food stalls and QR gate entry.',organizerId:'org-main',organizerName:'Tilted Live',date:'2026-09-07',time:'17:00',venue:'National Stadium',city:'Gaborone',category:'Music',posterColor:'#4f46e5',highlights:['Live regional acts','VIP pit access','Cashless food court'],ticketTiers:[{id:'early',name:'Early Bird',price:180,originalPrice:220,quantityTotal:200,quantityRemaining:120,perks:['Early entry','Discounted price'],earlyBirdEnd:'2026-08-10'},{id:'general',name:'General',price:250,quantityTotal:800,quantityRemaining:650,perks:['Standard access']},{id:'vip',name:'VIP Pit',price:650,quantityTotal:150,quantityRemaining:90,perks:['VIP pit','Fast-track entry','Private bar']}],featured:true,trending:true,campus:false,weekendHighlight:true,status:'published'},
      {id:'evt-comedy-night',posterImage:'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&h=300&fit=crop&q=80',title:'Botswana Comedy Night',description:'Stand-up comedy at Maitisong Theatre featuring Botswana headliners and rising acts from the local scene.',organizerId:'org-main',organizerName:'Maitisong Live',date:'2026-07-18',time:'19:30',venue:'Maitisong Theatre',city:'Gaborone',category:'Comedy',posterColor:'#06b6d4',highlights:['Reserved seating','Local headliners','Photo wall'],ticketTiers:[{id:'standard',name:'Standard',price:150,quantityTotal:220,quantityRemaining:87,perks:['Main hall access']},{id:'front',name:'Front Row',price:280,quantityTotal:50,quantityRemaining:18,perks:['Front-row seating','Priority entry']}],featured:true,trending:true,campus:false,weekendHighlight:true,status:'published'},
      {id:'evt-ub-tech',posterImage:'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop&q=80',title:'UB Innovation & Tech Showcase',description:'University teams pitch apps, data tools and campus products in a one-day innovation event.',organizerId:'org-main',organizerName:'University of Botswana Innovation Hub',date:'2026-06-20',time:'09:00',venue:'UB Indoor Sports Arena',city:'Gaborone',category:'Campus',posterColor:'#7c3aed',highlights:['Startup booths','Pitch sessions','Recruiter corner'],ticketTiers:[{id:'student',name:'Student',price:40,quantityTotal:400,quantityRemaining:260,perks:['Expo access']},{id:'network',name:'Networking Pass',price:120,quantityTotal:100,quantityRemaining:61,perks:['Networking session','Pitch finals seating']}],featured:true,trending:false,campus:true,weekendHighlight:false,status:'published'},
      {id:'evt-derby',posterImage:'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=300&fit=crop&q=80',title:'Township Derby: GU vs Rollers',description:'A fierce local football derby with digital gate validation and reserved grandstand options.',organizerId:'org-main',organizerName:'Botswana Premier Events',date:'2026-08-01',time:'15:00',venue:'National Stadium',city:'Gaborone',category:'Sports',posterColor:'#f59e0b',highlights:['Digital turnstile check-in','Family stand tickets','VIP lounge'],ticketTiers:[{id:'terrace',name:'Terrace',price:90,quantityTotal:3000,quantityRemaining:1400,perks:['Open stand']},{id:'grand',name:'Grandstand',price:180,quantityTotal:1200,quantityRemaining:480,perks:['Covered seating']},{id:'vip',name:'VIP Lounge',price:500,quantityTotal:140,quantityRemaining:35,perks:['Lounge access','Refreshments']}],featured:false,trending:true,campus:false,weekendHighlight:true,status:'published'},
      {id:'evt-play',posterImage:'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=300&fit=crop&q=80',title:'Maitisong Theatre: Nna Ga Ke',description:'A sharp Setswana stage production about identity, pressure and family expectations.',organizerId:'org-main',organizerName:'Maitisong Theatre',date:'2026-06-28',time:'18:30',venue:'Maitisong Theatre',city:'Gaborone',category:'Theatre',posterColor:'#ec4899',highlights:['Local cast','Post-show talkback','Assigned seats'],ticketTiers:[{id:'regular',name:'Regular',price:120,quantityTotal:180,quantityRemaining:92,perks:['Standard seating']},{id:'patron',name:'Patron',price:260,quantityTotal:30,quantityRemaining:11,perks:['Best seats','Artist meet-and-greet']}],featured:false,trending:false,campus:false,weekendHighlight:true,status:'published'},
      {id:'evt-craft-beer',posterImage:'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop&q=80',title:'Botswana Craft Beer & Braai Festival',description:'An outdoor braai and craft beverage event with live DJs, tasting stations and premium lounges.',organizerId:'org-main',organizerName:'BBS Festivals',date:'2026-09-19',time:'13:00',venue:'Fairgrounds Open Park',city:'Gaborone',category:'Food',posterColor:'#16a34a',highlights:['Braai village','Tasting tokens','Sunset set'],ticketTiers:[{id:'entry',name:'Entry',price:220,quantityTotal:600,quantityRemaining:310,perks:['Festival access']},{id:'taster',name:'Taster Pack',price:350,quantityTotal:220,quantityRemaining:104,perks:['Festival access','4 tasting tokens']},{id:'lounge',name:'Lounge',price:580,quantityTotal:80,quantityRemaining:29,perks:['Lounge seating','6 tokens','Fast queue']}],featured:true,trending:false,campus:false,weekendHighlight:false,status:'published'},
      {id:'evt-leadership',posterImage:'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=300&fit=crop&q=80',title:'Corporate Leadership Summit',description:'A one-day summit for managers, founders and HR leads discussing execution, culture and growth.',organizerId:'org-main',organizerName:'BW Executive Forum',date:'2026-10-02',time:'08:00',venue:'Masa Square Conference Centre',city:'Gaborone',category:'Business',posterColor:'#0f172a',highlights:['Breakfast networking','Panel sessions','Certificate of attendance'],ticketTiers:[{id:'delegate',name:'Delegate',price:950,quantityTotal:250,quantityRemaining:173,perks:['Conference access','Lunch','Certificate']},{id:'premium',name:'Premium Table',price:1500,quantityTotal:60,quantityRemaining:27,perks:['Front seating','Lounge access','Priority registration']}],featured:false,trending:false,campus:false,weekendHighlight:false,status:'published'},
      {id:'evt-bac-expo',posterImage:'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=300&fit=crop&q=80',title:'BAC Campus Entrepreneurship Expo',description:'Student founders, side hustlers and small businesses show what they are building on campus.',organizerId:'org-main',organizerName:'Botswana Accountancy College',date:'2026-06-14',time:'10:00',venue:'BAC Main Hall',city:'Gaborone',category:'Expo',posterColor:'#14b8a6',highlights:['Pitch booth prizes','Student-made brands','Campus networking'],ticketTiers:[{id:'student',name:'Student',price:30,quantityTotal:350,quantityRemaining:218,perks:['Expo floor access']},{id:'supporter',name:'Supporter',price:80,quantityTotal:120,quantityRemaining:57,perks:['Expo access','Pitch finals seating']}],featured:false,trending:true,campus:true,weekendHighlight:true,status:'published'},
      {id:'evt-ftown-food',posterImage:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=300&fit=crop&q=80',title:'Francistown Street Food Night Market',description:'A night market with food trucks, local brands, DJs and family-friendly outdoor seating.',organizerId:'org-main',organizerName:'Northside Markets',date:'2026-07-04',time:'16:00',venue:'Old Stadium Grounds',city:'Francistown',category:'Food',posterColor:'#fb7185',highlights:['Food trucks','Night market','Local makers'],ticketTiers:[{id:'entry',name:'Entry',price:60,quantityTotal:900,quantityRemaining:520,perks:['Entry access']},{id:'vip',name:'VIP Deck',price:220,quantityTotal:100,quantityRemaining:44,perks:['Deck seating','Welcome drink']}],featured:false,trending:false,campus:false,weekendHighlight:true,status:'published'},
      {id:'evt-maun-jazz',posterImage:'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&h=300&fit=crop&q=80',title:'Maun Sunset Jazz by the River',description:'An intimate sunset jazz evening in Maun with premium seating and a calm riverside setup.',organizerId:'org-main',organizerName:'Okavango Evenings',date:'2026-08-22',time:'17:30',venue:'Riverside Gardens',city:'Maun',category:'Music',posterColor:'#0ea5e9',highlights:['Sunset jazz set','Premium seating','Curated food stalls'],ticketTiers:[{id:'general',name:'General',price:200,quantityTotal:300,quantityRemaining:166,perks:['Open seating']},{id:'gold',name:'Gold Circle',price:420,quantityTotal:70,quantityRemaining:22,perks:['Front seating','Welcome platter']}],featured:true,trending:false,campus:false,weekendHighlight:false,status:'published'}
    
      {id:'evt-gabs-afronight',posterImage:'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?w=600&h=300&fit=crop&q=80',title:'Gaborone Afrobeats Night',description:'A high-energy Afrobeats night at Capital Square featuring DJs from Botswana, Zimbabwe and South Africa, with an outdoor dance floor and VIP tables.',organizerId:'org-main',organizerName:'Capital Square Events',date:'2026-07-25',time:'20:00',venue:'Capital Square Rooftop',city:'Gaborone',category:'Music',posterColor:'#7c3aed',highlights:['Outdoor dance floor','Live DJ sets','VIP table service'],ticketTiers:[{id:'general',name:'General',price:120,quantityTotal:500,quantityRemaining:322,perks:['Dance floor access']},{id:'vip',name:'VIP Table',price:450,quantityTotal:60,quantityRemaining:28,perks:['Reserved table','Bottle service','Fast entry']}],featured:true,trending:true,campus:false,weekendHighlight:true,status:'published'},
      {id:'evt-palapye-biz',posterImage:'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=300&fit=crop&q=80',title:'Palapye Business Breakfast',description:'An early-morning business networking event for SME owners, managers and entrepreneurs from the Central District.',organizerId:'org-main',organizerName:'Central Business Forum',date:'2026-08-13',time:'07:30',venue:'Cresta Marakanelo',city:'Palapye',category:'Business',posterColor:'#0f172a',highlights:['Breakfast included','Networking session','Speaker panel'],ticketTiers:[{id:'delegate',name:'Delegate',price:350,quantityTotal:120,quantityRemaining:77,perks:['Breakfast','Speaker access','Certificate']}],featured:false,trending:false,campus:false,weekendHighlight:false,status:'published'},
      {id:'evt-bac-hackathon',posterImage:'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop&q=80',title:'BAC 24-Hour Hackathon',description:'Students from BAC and partner institutions compete to build a working tech product in 24 hours. Cash prizes and internship offers for the top 3 teams.',organizerId:'org-main',organizerName:'Botswana Accountancy College',date:'2026-07-11',time:'08:00',venue:'BAC ICT Lab',city:'Gaborone',category:'Campus',posterColor:'#4f46e5',highlights:['Cash prizes','Internship offers','Mentor support'],ticketTiers:[{id:'participant',name:'Participant',price:0,quantityTotal:80,quantityRemaining:44,perks:['Full participation','Meals included']},{id:'spectator',name:'Spectator',price:30,quantityTotal:200,quantityRemaining:134,perks:['Watch finals pitch']}],featured:false,trending:true,campus:true,weekendHighlight:false,status:'published'},
      {id:'evt-lobatse-sport',posterImage:'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=300&fit=crop&q=80',title:'Lobatse Community Sports Day',description:'A full-day community sports event with football, volleyball and athletics at Lobatse grounds. Free entry for families with school children.',organizerId:'org-main',organizerName:'Lobatse Community Trust',date:'2026-09-27',time:'08:30',venue:'Lobatse Sports Grounds',city:'Lobatse',category:'Sports',posterColor:'#16a34a',highlights:['Multi-sport event','Family friendly','Vendor stalls'],ticketTiers:[{id:'family',name:'Family Pass',price:80,quantityTotal:400,quantityRemaining:256,perks:['All-day access','Family of 4']},{id:'vip',name:'VIP Stand',price:200,quantityTotal:80,quantityRemaining:43,perks:['Covered stand','Refreshments']}],featured:false,trending:false,campus:false,weekendHighlight:true,status:'published'},
    ],
    users: [
      {id:'user-demo',role:'customer',name:'Demo Customer',email:'demo@tilted.bw',password:'demo123',phone:'+26772300000',nationalId:'123456789'},
      {id:'org-demo',role:'organizer',name:'Tilted Organizer',email:'organizer@tilted.bw',password:'org123',phone:'+26771333000',nationalId:'ORG-001'}
    ],
    orders: [],
    tickets: []
  };

  const qs = s => document.querySelector(s);
  const qsa = s => [...document.querySelectorAll(s)];
  const copy = obj => JSON.parse(JSON.stringify(obj));
  const rand = n => Math.random().toString(36).slice(2,2+n).toUpperCase();

  const store = {
    load(){
      try{const raw = localStorage.getItem(storageKey); if(raw) return JSON.parse(raw);}
      catch(e){ document.getElementById('storageStatus').textContent='Private mode: memory only'; }
      if(memoryState) return memoryState;
      return copy(defaultState);
    },
    save(state){
      memoryState = copy(state);
      try{ localStorage.setItem(storageKey, JSON.stringify(state)); }
      catch(e){ fallback.ok = false; document.getElementById('storageStatus').textContent='Private mode: memory only'; }
    },
    reset(){ memoryState = copy(defaultState); try{localStorage.removeItem(storageKey);}catch(e){} return copy(defaultState); }
  };

  let state = store.load();

  const helpers = {
    price(n){ return `BWP ${Number(n).toFixed(2)}`; },
    date(d,t){ return new Date(`${d}T${t||'00:00'}`).toLocaleString('en-BW',{dateStyle:'medium',timeStyle:t?'short':undefined}); },
    minPrice(event){ return Math.min(...event.ticketTiers.map(t=>t.price)); },
    findEvent(id){ return state.events.find(e=>e.id===id); },
    findTier(event, tierId){ return event.ticketTiers.find(t=>t.id===tierId); },
    orderTotal(order){ return order.subtotal + order.serviceFee + order.transactionFee - order.discount; },
    slug(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-'); },
    uid(prefix='id'){ return `${prefix}-${rand(6)}`; },
    orderNo(){ return `TT-${Math.floor(100000 + Math.random()*900000)}`; },
    phoneValid(v){ return /^(\+267|00267|267)?[0-9]{7,8}$/.test(String(v).replace(/[\s\-]/g,'')); },
    idValid(v){ return String(v).trim().length >= 6; }
  };


  const capacityBar = (tier) => {
    const pct = Math.round((tier.quantityRemaining / tier.quantityTotal) * 100);
    const fillClass = pct <= 15 ? 'critical' : pct <= 35 ? 'low' : '';
    const label = tier.quantityRemaining <= 0 ? 'Sold out' : pct <= 15 ? `Only ${tier.quantityRemaining} left!` : `${tier.quantityRemaining} of ${tier.quantityTotal} remaining`;
    return `<div class="capacity-wrap"><div class="capacity-label"><span>${label}</span><span>${pct}%</span></div><div class="capacity-bar"><div class="capacity-fill ${fillClass}" style="width:${pct}%"></div></div></div>`;
  };

  const attendingCount = (eventId) => {
    const count = state.tickets.filter(t => t.eventId === eventId).length;
    if(count === 0) return '';
    return `<div class="attending-badge"><span class="attending-dot"></span>${count} ${count === 1 ? 'person' : 'people'} attending</div>`;
  };

  const earlyBirdCountdown = (tier) => {
    if(!tier.earlyBirdEnd) return '';
    const diff = new Date(tier.earlyBirdEnd) - new Date();
    if(diff <= 0) return '';
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    return `<div class="countdown-badge">⏳ Early bird ends in ${days}d ${hrs}h</div>`;
  };

  const notify = (msg,type='info') => {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    toastContainer.appendChild(el);
    setTimeout(()=>el.remove(),3000);
  };

  const route = (id) => {
    views.forEach(v=>v.classList.toggle('active', v.id===id));
    qsa('.nav-link').forEach(a=>a.classList.toggle('active', a.dataset.route===id));
    window.location.hash = id;
    if(id==='customer-dashboard') renderCustomerDashboard();
    if(id==='my-tickets') renderTickets();
    if(id==='purchase-history') renderHistory();
    if(id==='organizer-dashboard') renderOrganizerDashboard();
    if(id==='sales-analytics') renderAnalytics();
    if(id==='ticket-validation') renderValidationSetup();
  };

  const persist = () => store.save(state);

  function seedSelects(){
    const categories = [...new Set(state.events.map(e=>e.category))];
    const cities = [...new Set(state.events.map(e=>e.city))];
    ['homeCategory','categoryFilter'].forEach(id=>{
      const el = qs(`#${id}`); if(!el) return; el.innerHTML = '<option value="">All categories</option>' + categories.map(c=>`<option>${c}</option>`).join('');
    });
    ['homeCity','cityFilter'].forEach(id=>{
      const el = qs(`#${id}`); if(!el) return; el.innerHTML = '<option value="">All cities</option>' + cities.map(c=>`<option>${c}</option>`).join('');
    });
  }

  function eventCard(event, compact=false){
    const soldOut = event.ticketTiers.every(t=>t.quantityRemaining<=0);
    return `
      <article class="card event-card">
        <div class="poster" style="${event.posterImage ? 'background-image:url(' + event.posterImage + ');background-size:cover;background-position:center;' : 'background:linear-gradient(135deg,' + event.posterColor + ',#06b6d4)'}">
          <span class="poster-badge">${event.category}</span>
        </div>
        <div class="event-body">
          <h3>${event.title}</h3>
          <div class="event-meta"><span>${helpers.date(event.date,event.time)}</span><span>${event.venue}</span><span>${event.city}</span></div>
          ${compact ? '' : `<p class="muted">${event.description.slice(0,110)}...</p>`}
          ${attendingCount(event.id)}
          <div class="capacity-wrap">${capacityBar(event.ticketTiers.reduce((min,t)=>t.quantityRemaining < min.quantityRemaining ? t : min, event.ticketTiers[0]))}</div>
          <div class="price-row"><strong>From ${helpers.price(helpers.minPrice(event))}</strong><span class="tag">${soldOut?'Sold out':'Available'}</span></div>
          <div class="inline-actions" style="margin-top:12px"><button class="btn btn-primary" onclick="App.openEvent('${event.id}')">View event</button><button class="btn btn-ghost" onclick="App.toggleFavorite('${event.id}')">Save</button></div>
        </div>
      </article>`;
  }

  function smallCard(event){
    return `<div class="list-card"><strong>${event.title}</strong><div class="muted">${event.city} · ${helpers.date(event.date,event.time)}</div><div class="price-row"><span>From ${helpers.price(helpers.minPrice(event))}</span><button class="btn btn-ghost" onclick="App.openEvent('${event.id}')">Open</button></div></div>`;
  }

  function renderHome(){
    qs('#featuredEvents').innerHTML = state.events.filter(e=>e.featured).slice(0,6).map(eventCard).join('');
    qs('#trendingEvents').innerHTML = state.events.filter(e=>e.trending).map(smallCard).join('');
    qs('#weekendEvents').innerHTML = state.events.filter(e=>e.weekendHighlight).map(smallCard).join('');
    qs('#campusEvents').innerHTML = state.events.filter(e=>e.campus).map(smallCard).join('');
    qs('#heroEvents').textContent = state.events.filter(e=>e.status==='published').length;
    qs('#heroCities').textContent = new Set(state.events.map(e=>e.city)).size;
    qs('#heroSold').textContent = state.tickets.length;
  }

  function applyEventFilters(prefix=''){
    const search = qs(prefix+'searchInput')?.value?.toLowerCase() || qs('#homeSearch').value.toLowerCase();
    const category = qs(prefix+'categoryFilter')?.value || qs('#homeCategory').value;
    const city = qs(prefix+'cityFilter')?.value || qs('#homeCity').value;
    const dateMode = qs('#dateFilter')?.value || '';
    const priceMode = qs(prefix+'priceFilter')?.value || qs('#homePrice').value;
    let events = state.events.filter(e=>e.status==='published');
    if(search) events = events.filter(e => `${e.title} ${e.venue} ${e.city}`.toLowerCase().includes(search));
    if(category) events = events.filter(e => e.category===category);
    if(city) events = events.filter(e => e.city===city);
    if(dateMode==='weekend') events = events.filter(e => e.weekendHighlight);
    if(dateMode==='month') events = events.filter(e => new Date(e.date).getMonth()===new Date().getMonth());
    if(priceMode==='low') events = events.filter(e => helpers.minPrice(e) < 200);
    if(priceMode==='mid') events = events.filter(e => helpers.minPrice(e) >= 200 && helpers.minPrice(e) <= 400);
    if(priceMode==='high') events = events.filter(e => helpers.minPrice(e) > 400);
    qs('#eventsGrid').innerHTML = events.length ? events.map(eventCard).join('') : '<div class="empty">No events match your filters.</div>';
    route('events');
  }

  function renderEventDetail(id){
    const event = helpers.findEvent(id);
    if(!event){ qs('#eventDetailContainer').innerHTML='<div class="card empty"><h3>Event not found</h3><p>This event may have been removed or the link is incorrect.</p><button class="btn btn-primary" onclick="App.go(\'events\')">Browse all events</button></div>'; route('event-detail'); return; }
    const related = state.events.filter(e=>e.id!==id && e.category===event.category).slice(0,3);
    const selectedTier = state.checkout.eventId===id ? state.checkout.tierId : event.ticketTiers[0].id;
    const q = state.checkout.eventId===id ? state.checkout.quantity : 1;
    const detail = `
      <div class="detail-hero">
        <div class="detail-banner" style="${event.posterImage ? 'background:linear-gradient(to bottom,rgba(0,0,0,.35),rgba(0,0,0,.65)),url(' + event.posterImage + ');background-size:cover;background-position:center;' : 'background:linear-gradient(135deg,' + event.posterColor + ',#06b6d4)'}">
          <span class="pill" style="background:rgba(255,255,255,.18);color:#fff">${event.category}</span>
          <h1>${event.title}</h1>
          <p>${event.organizerName} · ${helpers.date(event.date,event.time)} · ${event.venue}, ${event.city}</p>
        </div>
        <div class="card">
          <h2>Book your ticket</h2>
          <p class="muted">Choose a tier, set quantity, and continue to the 3-step checkout.</p>
          ${event.ticketTiers.map(t => {
            const sold = t.quantityRemaining<=0;
            const early = earlyBirdCountdown(t);
            return `<div class="ticket-tier ${selectedTier===t.id?'selected':''}">
              <div>
                <strong>${t.name}</strong>
                <div>${helpers.price(t.price)} ${t.originalPrice?`<span class="muted">was ${helpers.price(t.originalPrice)}</span>`:''}</div>
                <div class="perks">${t.perks.map(p=>`<span class="tag">${p}</span>`).join('')}</div>
                ${early}
                ${capacityBar(t)}
              </div>
              <button class="btn ${selectedTier===t.id?'btn-primary':'btn-ghost'}" onclick="App.selectTier('${event.id}','${t.id}')" ${sold?'disabled':''}>${sold?'Sold out':'Select'}</button>
            </div>`;
          }).join('')}
          <div class="qty-wrap"><button class="qty-btn" onclick="App.changeQty(-1)">−</button><strong id="qtyDisplay">${q}</strong><button class="qty-btn" onclick="App.changeQty(1)">+</button></div>
          <div style="margin-top:14px" class="summary-row"><span>Live total</span><strong id="detailLiveTotal">${helpers.price(helpers.findTier(event, selectedTier).price * q)}</strong></div>
          <div class="inline-actions" style="margin-top:16px"><button class="btn btn-primary" onclick="App.startCheckout('${event.id}')">Continue</button><button class="btn btn-ghost" onclick="App.shareEvent('${event.id}')">Share</button></div>
        </div>
      </div>
      <div class="grid cols-2" style="margin-top:20px">
        <div class="card">
          <h3>About this event</h3>
          <p>${event.description}</p>
          <div class="perks">${event.highlights.map(h=>`<span class="tag">${h}</span>`).join('')}</div>
        </div>
        <div class="card">
          <h3>Related events</h3>
          <div class="stack">${related.length?related.map(smallCard).join(''):'<div class="empty">No related events found.</div>'}</div>
        </div>
      </div>`;
    qs('#eventDetailContainer').innerHTML = detail;
    route('event-detail');
  }

  function selectTier(eventId, tierId){
    state.checkout.eventId = eventId; state.checkout.tierId = tierId; if(!state.checkout.quantity) state.checkout.quantity=1;
    persist(); renderEventDetail(eventId);
  }

  function changeQty(delta){
    const event = helpers.findEvent(state.checkout.eventId); if(!event) return;
    const tier = helpers.findTier(event, state.checkout.tierId || event.ticketTiers[0].id);
    state.checkout.quantity = Math.max(1, Math.min((state.checkout.quantity||1)+delta, Math.max(1,tier.quantityRemaining)));
    persist(); qs('#qtyDisplay') && (qs('#qtyDisplay').textContent = state.checkout.quantity); qs('#detailLiveTotal') && (qs('#detailLiveTotal').textContent = helpers.price(tier.price*state.checkout.quantity));
  }

  function startCheckout(eventId){
    const event = helpers.findEvent(eventId);
    if(!event) return;
    state.checkout.eventId = eventId;
    if(!state.checkout.tierId) state.checkout.tierId = event.ticketTiers[0].id;
    renderCheckout1(); route('checkout-1'); persist();
  }

  function getCheckoutNumbers(){
    const event = helpers.findEvent(state.checkout.eventId); const tier = helpers.findTier(event, state.checkout.tierId);
    const subtotal = tier.price * state.checkout.quantity;
    const serviceFee = +(subtotal * 0.07).toFixed(2);
    const transactionFee = +(subtotal * 0.03).toFixed(2);
    const discount = state.checkout.promoCode === 'TILTED2026' ? +(subtotal * 0.15).toFixed(2) : 0;
    return {event,tier,subtotal,serviceFee,transactionFee,discount,total:+(subtotal+serviceFee+transactionFee-discount).toFixed(2)};
  }

  function renderSummary(targetId){
    const {event,tier,subtotal,serviceFee,transactionFee,discount,total} = getCheckoutNumbers();
    qs(targetId).innerHTML = `
      <h3>Order summary</h3>
      <div class="summary-row"><span>Event</span><strong>${event.title}</strong></div>
      <div class="summary-row"><span>Tier</span><strong>${tier.name}</strong></div>
      <div class="summary-row"><span>Quantity</span><strong>${state.checkout.quantity}</strong></div>
      <div class="summary-row"><span>Subtotal</span><strong>${helpers.price(subtotal)}</strong></div>
      <div class="summary-row"><span>Service fee</span><strong>${helpers.price(serviceFee)}</strong></div>
      <div class="summary-row"><span>Transaction fee</span><strong>${helpers.price(transactionFee)}</strong></div>
      <div class="summary-row"><span>Discount</span><strong>- ${helpers.price(discount)}</strong></div>
      <div class="summary-row total-row"><span>Total</span><strong>${helpers.price(total)}</strong></div>`;
  }

  function renderCheckout1(){
    const {event,tier} = getCheckoutNumbers();
    qs('#checkout1Form').innerHTML = `
      <h2>Step 1: Ticket details</h2>
      <form id="checkoutStep1" class="stack">
        <input name="purchaserName" placeholder="Purchaser full name" value="${state.currentUser?.name||''}" required>
        <input name="email" type="email" placeholder="Email" value="${state.currentUser?.email||''}" required>
        <input name="phone" placeholder="Botswana phone" value="${state.currentUser?.phone||''}" required>
        <input name="nationalId" placeholder="Botswana ID" value="${state.currentUser?.nationalId||''}" required>
        <label class="switch-row"><span>Same attendee details for all tickets</span><input name="sameAsPurchaser" type="checkbox" checked></label>
        <textarea name="specialRequests" rows="3" placeholder="Special requests (optional)">${state.checkout.specialRequests||''}</textarea>
        <div class="inline-actions"><button type="button" class="btn btn-ghost" onclick="App.changeQty(-1)">- Qty</button><button type="button" class="btn btn-ghost" onclick="App.changeQty(1)">+ Qty</button><span class="pill">${state.checkout.quantity} × ${tier.name}</span></div>
        <button class="btn btn-primary" type="submit">Continue to payment</button>
      </form>`;
    renderSummary('#checkoutSummary1');
    qs('#checkoutStep1').onsubmit = (e)=>{
      e.preventDefault();
      const fd = new FormData(e.target);
      const purchaser = Object.fromEntries(fd.entries());
      if(!helpers.phoneValid(purchaser.phone)){ notify('Use a valid Botswana phone number.', 'error'); return; }
      if(!helpers.idValid(purchaser.nationalId)){ notify('Botswana ID looks too short.', 'error'); return; }
      state.checkout.purchaser = purchaser;
      state.checkout.specialRequests = purchaser.specialRequests || '';
      if(purchaser.sameAsPurchaser === 'on'){
        state.checkout.attendeeDetails = Array.from({length:state.checkout.quantity}, (_,i)=>({name:purchaser.purchaserName,email:purchaser.email,phone:purchaser.phone,nationalId:purchaser.nationalId, sequence:i+1}));
      } else {
        const stored = state.checkout.attendeeDetails || [];
        state.checkout.attendeeDetails = Array.from({length:state.checkout.quantity}, (_,i)=>stored[i] || {name:purchaser.purchaserName,email:purchaser.email,phone:purchaser.phone,nationalId:purchaser.nationalId, sequence:i+1});
      }
      persist(); renderCheckout2(); route('checkout-2');
    };
  }

  function renderCheckout2(){
    qs('#checkout2Form').innerHTML = `
      <button class="checkout-back" onclick="App.goBack('checkout-1')">← Back to ticket details</button>
      <h2>Step 2: Payment</h2>
      <form id="checkoutStep2" class="stack">
        <select name="paymentMethod"><option>Orange Money</option><option>MyZaka</option><option>Bank Card</option><option>Cash Deposit Reference</option></select>
        <input name="promoCode" placeholder="Promo code" value="${state.checkout.promoCode||''}">
        <label class="switch-row"><span>I accept the ticket terms and refund policy</span><input name="terms" type="checkbox" required></label>
        <button class="btn btn-primary" type="submit">Process payment</button>
        <small class="muted">Secure styling only. Payment is simulated for demo use.</small>
      </form>`;
    renderSummary('#checkoutSummary2');
    qs('#checkoutStep2').onsubmit = (e)=>{
      e.preventDefault();
      const fd = new FormData(e.target);
      state.checkout.paymentMethod = fd.get('paymentMethod');
      state.checkout.promoCode = String(fd.get('promoCode')||'').trim();
      persist(); renderSummary('#checkoutSummary2');
      const btn = e.target.querySelector('button[type="submit"]');
      btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>Processing payment...';
      setTimeout(()=>{
        btn.disabled = false; btn.innerHTML = 'Process payment';
        if(state.paymentMode==='failure'){ notify('Payment failed. Retry or change method.', 'error'); return; }
        completeOrder();
      }, 1800);
    };
  }

  function makeQrData(ticket){ return `${ticket.code}|${ticket.eventId}|${ticket.attendeeName}|${ticket.status}`; }
  function drawQr(canvas, text){
    const ctx = canvas.getContext('2d'); const size = 160; canvas.width=size; canvas.height=size;
    ctx.fillStyle='#fff'; ctx.fillRect(0,0,size,size);
    const bytes = [...text].reduce((a,c)=>a.concat(c.charCodeAt(0).toString(2).padStart(8,'0').split('')),[]);
    const cell = 10; let i=0;
    for(let y=0;y<size;y+=cell){ for(let x=0;x<size;x+=cell){ const bit = bytes[i++ % bytes.length]==='1'; ctx.fillStyle = bit ? '#111827' : '#ffffff'; ctx.fillRect(x,y,cell,cell); }}
    ctx.strokeStyle='#cbd5e1'; ctx.strokeRect(0,0,size,size);
  }

  function completeOrder(){
    const {event,tier,subtotal,serviceFee,transactionFee,discount,total} = getCheckoutNumbers();
    if(tier.quantityRemaining < state.checkout.quantity){ notify('Not enough stock left for that tier.', 'error'); return; }
    tier.quantityRemaining -= state.checkout.quantity;
    const orderId = helpers.uid('ord');
    const orderNumber = helpers.orderNo();
    const attendeeDetails = state.checkout.attendeeDetails;
    const buyer = state.currentUser || {id:'guest-demo',name:state.checkout.purchaser.purchaserName,email:state.checkout.purchaser.email,phone:state.checkout.purchaser.phone,nationalId:state.checkout.purchaser.nationalId,role:'customer'};
    if(!state.currentUser){
      state.currentUser = {id:helpers.uid('user'), role:'customer', name:buyer.name, email:buyer.email, phone:buyer.phone, nationalId:buyer.nationalId};
      state.users.push({...state.currentUser, password:'demo-pass'});
    }
    const tickets = attendeeDetails.map((a,idx)=>({id:helpers.uid('tkt'), code:`TT-${rand(6)}`, orderId, eventId:event.id, eventTitle:event.title, attendeeName:a.name, attendeeEmail:a.email, tierName:tier.name, purchaserId:state.currentUser.id, date:event.date, time:event.time, venue:event.venue, city:event.city, status:'valid', used:false, checkedInAt:null, createdAt:new Date().toISOString(), sequence:idx+1}));
    state.tickets.push(...tickets);
    state.orders.unshift({id:orderId, orderNumber, purchaserId:state.currentUser.id, purchaserName:state.currentUser.name, purchaserEmail:state.currentUser.email, eventId:event.id, eventTitle:event.title, organizerId:event.organizerId, tierId:tier.id, tierName:tier.name, quantity:state.checkout.quantity, paymentMethod:state.checkout.paymentMethod, subtotal, serviceFee, transactionFee, discount, total, status:'paid', createdAt:new Date().toISOString(), tickets:tickets.map(t=>t.id)});
    persist();
    renderConfirmation(orderId);
    notify('Payment successful. Tickets issued instantly.', 'success');
    renderHome();
    route('checkout-3');
  }

  function renderConfirmation(orderId){
    const order = state.orders.find(o=>o.id===orderId); const tickets = state.tickets.filter(t=>t.orderId===orderId);
    qs('#confirmationWrap').innerHTML = `
      <div class="card stack">
        <span class="pill">Payment received</span>
        <h2>Order ${order.orderNumber}</h2>
        <p>Email confirmation notice: sent to ${order.purchaserEmail}. Add-to-wallet buttons are mock actions for presentation only.</p>
        <div class="summary-row"><span>Event</span><strong>${order.eventTitle}</strong></div>
        <div class="summary-row"><span>Total paid</span><strong>${helpers.price(order.total)}</strong></div>
        <div class="inline-actions"><button class="btn btn-secondary" onclick="App.downloadTickets('${orderId}')">Print / Download</button><button class="btn btn-ghost" data-route-btn="my-tickets" onclick="App.go('my-tickets')">Go to My Tickets</button><button class="btn btn-ghost">Add to wallet</button></div>
        <div class="card-grid">${tickets.map(ticketCard).join('')}</div>
      </div>`;
    setTimeout(()=>tickets.forEach(t=>{const c=qs(`#qr-${t.id}`); c && drawQr(c, makeQrData(t));}), 50);
  }

  function ticketCard(ticket){
    return `<div class="card ticket-card"><span class="pill">${ticket.tierName}</span><h3>${ticket.eventTitle}</h3><div class="muted">${helpers.date(ticket.date,ticket.time)} · ${ticket.venue}, ${ticket.city}</div><div class="ticket-code" style="margin:10px 0">${ticket.code}</div><div class="canvas-wrap"><canvas id="qr-${ticket.id}" class="qr"></canvas><div><strong>${ticket.attendeeName}</strong><div class="muted">Status: ${ticket.used?'Checked in':'Valid for entry'}</div><button class="btn btn-ghost" style="margin-top:10px" onclick="App.openTicket('${ticket.id}')">Open ticket</button></div></div></div>`;
  }

  function renderCustomerDashboard(){
    const user = state.currentUser;
    if(!user || user.role!=='customer'){ qs('#customerStats').innerHTML='<div class="empty">Login as a customer to see your dashboard.</div>'; qs('#upcomingTickets').innerHTML=''; qs('#recentOrders').innerHTML=''; return; }
    const tickets = state.tickets.filter(t=>t.purchaserId===user.id);
    const orders = state.orders.filter(o=>o.purchaserId===user.id);
    qs('#customerHello').textContent = `Logged in as ${user.name}`;
    qs('#customerStats').innerHTML = [
      ['Tickets owned', tickets.length],['Upcoming events', new Set(tickets.map(t=>t.eventId)).size],['Total spent', helpers.price(orders.reduce((a,b)=>a+b.total,0))],['Used tickets', tickets.filter(t=>t.used).length]
    ].map(([k,v])=>`<div class="metric"><span class="muted">${k}</span><strong>${v}</strong></div>`).join('');
    qs('#upcomingTickets').innerHTML = tickets.length ? tickets.slice(0,4).map(t=>`<div class="ticket-item"><strong>${t.eventTitle}</strong><div class="muted">${t.attendeeName} · ${helpers.date(t.date,t.time)}</div><div class="inline-actions"><span class="ticket-code">${t.code}</span><button class="btn btn-ghost" onclick="App.openTicket('${t.id}')">View</button></div></div>`).join('') : '<div class="empty">No tickets yet. Buy one from the Events page.</div>';
    qs('#recentOrders').innerHTML = orders.length ? orders.slice(0,5).map(o=>`<div class="history-card"><strong>${o.eventTitle}</strong><div class="muted">${o.orderNumber} · ${new Date(o.createdAt).toLocaleString()}</div><div class="price-row"><span>${o.quantity} tickets</span><strong>${helpers.price(o.total)}</strong></div></div>`).join('') : '<div class="empty">Your purchase history is empty.</div>';
  }

  function renderTickets(){
    const user = state.currentUser;
    if(!user || user.role!=='customer'){ qs('#ticketsWrap').innerHTML='<div class="empty">Login as a customer to view tickets.</div>'; return; }
    const tickets = state.tickets.filter(t=>t.purchaserId===user.id);
    qs('#ticketsWrap').innerHTML = tickets.length ? tickets.map(ticketCard).join('') : '<div class="empty">No tickets yet.</div>';
    setTimeout(()=>tickets.forEach(t=>{const c=qs(`#qr-${t.id}`); c && drawQr(c, makeQrData(t));}), 50);
  }

  function renderHistory(){
    const user = state.currentUser;
    if(!user || user.role!=='customer'){ qs('#historyWrap').innerHTML='<div class="empty">Login as a customer to view history.</div>'; return; }
    const orders = state.orders.filter(o=>o.purchaserId===user.id);
    qs('#historyWrap').innerHTML = orders.length ? orders.map(o=>`<div class="history-card"><div class="section-header"><strong>${o.eventTitle}</strong><span class="ticket-code">${o.orderNumber}</span></div><div class="summary-row"><span>Payment</span><strong>${o.paymentMethod}</strong></div><div class="summary-row"><span>Quantity</span><strong>${o.quantity}</strong></div><div class="summary-row"><span>Total</span><strong>${helpers.price(o.total)}</strong></div><div class="summary-row"><span>Date</span><strong>${new Date(o.createdAt).toLocaleString()}</strong></div></div>`).join('') : '<div class="empty">No purchases completed yet.</div>';
  }

  function renderOrganizerDashboard(){
    const user = state.currentUser;
    if(!user || user.role!=='organizer'){ qs('#organizerStats').innerHTML='<div class="empty">Login as organizer to view the dashboard.</div>'; qs('#organizerEvents').innerHTML=''; qs('#organizerRecent').innerHTML=''; return; }
    const events = state.events.filter(e=>e.organizerId==='org-main' || e.organizerId===user.id);
    const orders = state.orders.filter(o=>events.some(e=>e.id===o.eventId));
    const tickets = state.tickets.filter(t=>events.some(e=>e.id===t.eventId));
    const sold = tickets.length;
    const remaining = events.reduce((sum,e)=>sum + e.ticketTiers.reduce((a,t)=>a+t.quantityRemaining,0),0);
    const revenue = orders.reduce((sum,o)=>sum+o.total,0);
    const attendance = tickets.length ? Math.round((tickets.filter(t=>t.used).length / tickets.length) * 100) : 0;
    const tierCounts = {};
    tickets.forEach(t=>tierCounts[t.tierName]=(tierCounts[t.tierName]||0)+1);
    const popular = Object.entries(tierCounts).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'No sales yet';
    const projected30d = revenue > 0 ? helpers.price(revenue * 1.3) : 'N/A';
    const growthNote = revenue > 0 ? '<span class="growth-badge">+30% proj. 30d</span>' : '';
    qs('#organizerStats').innerHTML = [
      ['Tickets sold', sold],
      ['Tickets remaining', remaining],
      ['Revenue', helpers.price(revenue) + (growthNote ? ' ' + growthNote : '')],
      ['Attendance rate', attendance + '%'],
      ['Popular tier', popular],
    ].map(([k,v])=>`<div class="metric"><span class="muted">${k}</span><strong>${v}</strong></div>`).join('');
    qs('#organizerEvents').innerHTML = events.map(e=>`<div class="organizer-row"><strong>${e.title}</strong><div class="muted">${e.city} · ${helpers.date(e.date,e.time)}</div><div class="price-row"><span>${e.status}</span><button class="btn btn-ghost" onclick="App.editEvent('${e.id}')">Edit</button></div></div>`).join('');
    qs('#organizerRecent').innerHTML = orders.length ? orders.slice(0,6).map(o=>`<div class="organizer-row"><strong>${o.orderNumber}</strong><div class="muted">${o.purchaserName} bought ${o.quantity} for ${o.eventTitle}</div><div class="price-row"><span>${o.paymentMethod}</span><strong>${helpers.price(o.total)}</strong></div></div>`).join('') : '<div class="empty">No purchases yet.</div>';
  }

  function renderAnalytics(){
    const user = state.currentUser;
    if(!user || user.role!=='organizer'){ qs('#analyticsWrap').innerHTML='<div class="empty">Organizer login required.</div>'; return; }
    const events = state.events.filter(e=>e.organizerId==='org-main' || e.organizerId===user.id);
    const orders = state.orders.filter(o=>events.some(e=>e.id===o.eventId));
    const attendees = state.tickets.filter(t=>events.some(e=>e.id===t.eventId));
    const byEvent = events.map(e=>{
      const evOrders = orders.filter(o=>o.eventId===e.id); const rev = evOrders.reduce((a,b)=>a+b.total,0); const sold = attendees.filter(t=>t.eventId===e.id).length; const checked = attendees.filter(t=>t.eventId===e.id && t.used).length;
      return `<div class="card"><h3>${e.title}</h3><div class="summary-row"><span>Sold</span><strong>${sold}</strong></div><div class="summary-row"><span>Revenue</span><strong>${helpers.price(rev)}</strong></div><div class="summary-row"><span>Checked in</span><strong>${checked}</strong></div><div class="summary-row"><span>Payout summary</span><strong>${helpers.price(rev*0.9)}</strong></div><div class="inline-actions" style="margin-top:12px"><button class="btn btn-ghost" onclick="App.exportCsv('${e.id}')">Export CSV</button><button class="btn btn-ghost" onclick="App.openAttendees('${e.id}')">Attendees</button></div></div>`;
    }).join('');
    qs('#analyticsWrap').innerHTML = byEvent || '<div class="empty">No analytics yet.</div>';
  }

  function renderValidationSetup(){
    const select = qs('#validationEvent');
    const events = state.events.filter(e=>e.status==='published');
    select.innerHTML = events.map(e=>`<option value="${e.id}">${e.title}</option>`).join('');
    qs('#validationResult').innerHTML = '<div class="validation-box empty">No scan yet.</div>';
  }

  function validateTicket(code, eventId){
    const ticket = state.tickets.find(t=>t.code===code.trim());
    let stateKey='invalid', text='Ticket not found.';
    if(ticket){
      if(ticket.eventId!==eventId){ stateKey='wrong'; text='Ticket belongs to a different event.'; }
      else if(ticket.used){ stateKey='used'; text='Ticket already used.'; }
      else { stateKey='valid'; text='Ticket accepted and checked in.'; ticket.used=true; ticket.checkedInAt=new Date().toISOString(); persist(); }
    }
    const labelMap = {valid:'VALID', invalid:'INVALID', used:'ALREADY USED', wrong:'WRONG EVENT'};
    qs('#validationResult').innerHTML = `<div class="validation-box stack"><span class="validation-state ${stateKey}">${labelMap[stateKey]}</span><div>${text}</div>${ticket?`<div class="summary-row"><span>Attendee</span><strong>${ticket.attendeeName}</strong></div><div class="summary-row"><span>Tier</span><strong>${ticket.tierName}</strong></div><div class="summary-row"><span>Code</span><strong class="ticket-code">${ticket.code}</strong></div><div class="summary-row"><span>Timestamp</span><strong>${new Date().toLocaleString()}</strong></div>`:''}</div>`;
    if(stateKey==='valid') notify('Ticket validated successfully.', 'success');
    if(stateKey!=='valid') notify(text, stateKey==='invalid'?'error':'info');
    renderOrganizerDashboard();
  }

  function openTicket(ticketId){
    const ticket = state.tickets.find(t=>t.id===ticketId); if(!ticket) return;
    modal.classList.remove('hidden');
    modalBody.innerHTML = `<div class="stack"><span class="pill">${ticket.used?'Checked in':'Ready for entry'}</span><h2>${ticket.eventTitle}</h2><div class="ticket-code">${ticket.code}</div><div class="summary-row"><span>Attendee</span><strong>${ticket.attendeeName}</strong></div><div class="summary-row"><span>Tier</span><strong>${ticket.tierName}</strong></div><div class="summary-row"><span>Venue</span><strong>${ticket.venue}, ${ticket.city}</strong></div><div class="canvas-wrap"><canvas id="modalQr" class="qr"></canvas><div><div class="muted">Present this code at the gate.</div><button class="btn btn-secondary" onclick="App.printTicket('${ticket.id}')">Print ticket</button></div></div></div>`;
    setTimeout(()=>drawQr(qs('#modalQr'), makeQrData(ticket)), 20);
  }

  function downloadTickets(orderId){ window.print(); }
  function printTicket(ticketId){ window.print(); }
  function shareEvent(eventId){ navigator.clipboard?.writeText(location.href.split('#')[0]+'#event-'+eventId); notify('Share link copied.', 'info'); }
  function toggleFavorite(eventId){ notify('Saved to favorites in this demo session.', 'info'); }
  function go(id){ route(id); }
  function goBack(id){ route(id); }
  function exportCsv(eventId){
    const tickets = state.tickets.filter(t=>t.eventId===eventId);
    const csv = ['code,attendeeName,tierName,status,checkedInAt', ...tickets.map(t=>`${t.code},${t.attendeeName},${t.tierName},${t.used?'used':'valid'},${t.checkedInAt||''}`)].join('
');
    const blob = new Blob([csv], {type:'text/csv'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `attendees-${eventId}.csv`; a.click();
    notify('CSV exported.', 'success');
  }
  function openAttendees(eventId){
    const event = helpers.findEvent(eventId); const tickets = state.tickets.filter(t=>t.eventId===eventId);
    modal.classList.remove('hidden');
    modalBody.innerHTML = `<h2>${event.title} attendees</h2><div class="stack">${tickets.length?tickets.map(t=>`<div class="ticket-item"><strong>${t.attendeeName}</strong><div class="muted">${t.tierName} · ${t.code}</div><div class="price-row"><span>${t.used?'Checked in':'Not checked in'}</span><button class="btn btn-ghost" onclick="App.validateQuick('${t.code}','${eventId}')">Check in</button></div></div>`).join(''):'<div class="empty">No attendees yet.</div>'}</div>`;
  }
  function validateQuick(code,eventId){ validateTicket(code,eventId); }

  function authUpdate(){
    const btn = qs('#authAction');
    if(state.currentUser){ btn.textContent = `Logout (${state.currentUser.role})`; btn.onclick = ()=>{ state.currentUser=null; persist(); authUpdate(); notify('Logged out.','info'); route('home'); renderCustomerDashboard(); renderOrganizerDashboard(); }; }
    else { btn.textContent='Login'; btn.onclick = ()=>route('login'); }
  }

  function bindForms(){
    qs('#loginForm').onsubmit = (e)=>{
      e.preventDefault();
      const fd = new FormData(e.target); const email = fd.get('email'); const password = fd.get('password'); const role = fd.get('role');
      const user = state.users.find(u=>u.email===email && u.password===password && u.role===role);
      if(!user){ notify('Invalid credentials.', 'error'); return; }
      state.currentUser = {...user}; persist(); authUpdate(); notify(`Logged in as ${role}.`, 'success'); route(role==='organizer'?'organizer-dashboard':'customer-dashboard');
    };
    qs('#registerForm').onsubmit = (e)=>{
      e.preventDefault(); const fd = new FormData(e.target); const data = Object.fromEntries(fd.entries());
      if(!helpers.phoneValid(data.phone)){ notify('Enter a valid Botswana phone number.', 'error'); return; }
      const newUser = {id:helpers.uid('user'), role:'customer', ...data}; state.users.push(newUser); state.currentUser = {...newUser}; persist(); authUpdate(); notify('Customer account created.', 'success'); route('customer-dashboard');
    };
    qs('#createEventForm').onsubmit = (e)=>{
      e.preventDefault(); const fd = new FormData(e.target); const data = Object.fromEntries(fd.entries());
      const event = {id:'evt-'+helpers.slug(data.title)+'-'+rand(4).toLowerCase(), title:data.title, description:data.description, organizerId:state.currentUser?.id || 'org-main', organizerName:data.organizerName, date:data.date, time:data.time, venue:data.venue, city:data.city, category:data.category, posterColor:data.posterColor, highlights:['Published from organizer portal','Browser-only prototype','Ready for QR sales'], ticketTiers:[{id:'general',name:data.tierName,price:Number(data.tierPrice),quantityTotal:Number(data.tierQty),quantityRemaining:Number(data.tierQty),perks:['Standard access']}], featured:false,trending:false,campus:data.category==='Campus',weekendHighlight:false,status:data.publishNow?'published':'draft'};
      state.events.unshift(event); persist(); seedSelects(); renderHome(); applyEventFilters('#'); notify('Event created.', 'success'); route('organizer-dashboard');
    };
  }

  function bindUI(){
    qsa('[data-route-btn]').forEach(b=>b.addEventListener('click', ()=>route(b.dataset.routeBtn)));
    qsa('.nav-link').forEach(a=>a.addEventListener('click', e=>{e.preventDefault(); route(a.dataset.route);}));
    qs('#homeFilterBtn').onclick = ()=>applyEventFilters('#');
    ['searchInput','categoryFilter','cityFilter','dateFilter','priceFilter'].forEach(id=>qs('#'+id).addEventListener('input', ()=>applyEventFilters('#')));
    qs('#clearFilters').onclick = ()=>{ ['searchInput','categoryFilter','cityFilter','dateFilter','priceFilter'].forEach(id=>qs('#'+id).value=''); applyEventFilters('#'); };
    qs('#organizerQuickLogin').onclick = ()=>{ state.currentUser = {...state.users.find(u=>u.email==='organizer@tilted.bw')}; persist(); authUpdate(); route('organizer-dashboard'); notify('Organizer demo loaded.', 'success'); };
    qs('#validateTicketBtn').onclick = ()=>validateTicket(qs('#validationCode').value, qs('#validationEvent').value);
    qs('#scanLatestBtn').onclick = ()=>{
      const latest = state.tickets[0]; if(!latest){ notify('No sold tickets available yet.','error'); return; }
      qs('#validationCode').value = latest.code; qs('#validationEvent').value = latest.eventId; validateTicket(latest.code, latest.eventId);
    };
    qs('#darkToggle').onclick = ()=>{ document.body.classList.toggle('dark'); };
    qs('#closeModal').onclick = ()=>modal.classList.add('hidden');
    modal.addEventListener('click', e=>{ if(e.target===modal) modal.classList.add('hidden'); });
  }

  function demoControls(){
    qs('#demoToggle').onclick = ()=> qs('#demoPanel').classList.toggle('collapsed');
    qs('#autofillCheckoutBtn').onclick = ()=>{
      if(!state.checkout.eventId){ state.checkout.eventId = state.events[0].id; state.checkout.tierId = state.events[0].ticketTiers[0].id; }
      state.checkout.quantity = 2;
      state.checkout.promoCode = 'TILTED2026';
      state.checkout.purchaser = {purchaserName:'Demo Buyer', email:'demo@tilted.bw', phone:'+26772300000', nationalId:'123456789'};
      state.checkout.attendeeDetails = [{name:'Demo Buyer',email:'demo@tilted.bw',phone:'72300000',nationalId:'123456789'},{name:'Friend Guest',email:'friend@tilted.bw',phone:'71234567',nationalId:'223456789'}];
      persist(); notify('Checkout data autofilled.', 'info'); renderCheckout1(); route('checkout-1');
    };
    qs('#simulatePurchaseBtn').onclick = ()=>{
      state.currentUser = {...state.users.find(u=>u.email==='demo@tilted.bw')};
      const ev = state.events[0]; state.checkout.eventId = ev.id; state.checkout.tierId = ev.ticketTiers[0].id; state.checkout.quantity = 1; state.checkout.paymentMethod='Orange Money'; state.checkout.promoCode=''; state.checkout.purchaser={purchaserName:'Demo Customer',email:'demo@tilted.bw',phone:'+26772300000',nationalId:'123456789'}; state.checkout.attendeeDetails=[{name:'Demo Customer',email:'demo@tilted.bw',phone:'+26772300000',nationalId:'123456789'}];
      completeOrder(); authUpdate();
    };
    qs('#jumpCustomerBtn').onclick = ()=>{ state.currentUser = {...state.users.find(u=>u.email==='demo@tilted.bw')}; persist(); authUpdate(); route('customer-dashboard'); };
    qs('#jumpOrganizerBtn').onclick = ()=>{ state.currentUser = {...state.users.find(u=>u.email==='organizer@tilted.bw')}; persist(); authUpdate(); route('organizer-dashboard'); };
    qs('#forceSuccessBtn').onclick = ()=>{ state.paymentMode='success'; persist(); notify('Payment mode set to success.','success'); };
    qs('#forceFailureBtn').onclick = ()=>{ state.paymentMode='failure'; persist(); notify('Payment mode set to failure.','info'); };
    qs('#soldOutBtn').onclick = ()=>{ state.events[0].ticketTiers.forEach(t=>t.quantityRemaining=0); persist(); renderHome(); applyEventFilters('#'); notify('First event set to sold out.','info'); };
    qs('#resetDemoBtn').onclick = ()=>{ state = store.reset(); seedSelects(); renderHome(); applyEventFilters('#'); authUpdate(); notify('Demo reset complete.','success'); route('home'); };
  }

  function openEvent(id){ renderEventDetail(id); }
  function editEvent(id){ openEvent(id); }

  function init(){
    seedSelects(); renderHome(); applyEventFilters('#'); bindForms(); bindUI(); demoControls(); authUpdate();
    const initial = location.hash.replace('#','') || 'home'; if(qs('#'+initial)) route(initial);
  }

  return { init, openEvent, selectTier, changeQty, startCheckout, toggleFavorite, shareEvent, go, goBack, openTicket, printTicket, downloadTickets, exportCsv, openAttendees, validateQuick, editEvent };
})();

document.addEventListener('DOMContentLoaded', App.init);
window.App = App;
