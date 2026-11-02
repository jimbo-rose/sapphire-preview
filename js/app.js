/* Sapphire Salt — shared layout, cart and page renderers */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => '$' + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, '');
const page = document.body.dataset.page;

/* ---------- icons ---------- */
const ICON = {
  utah: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M5 2h8v5h6v15H5z"/><circle cx="10.5" cy="9.5" r="1.1" fill="currentColor" stroke="none"/></svg>',
  cart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  wave: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M12 3l3 5h-6l3-5Z"/></svg>',
  leaf: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19 14 10"/></svg>',
  jar: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="6" y="3" width="12" height="4" rx="1"/><path d="M7 7h10v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7Z"/><path d="M9 12h6v4H9z"/></svg>',
  peak: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 20 9 8l4 6 3-4 6 10H2Z"/><path d="m7.5 10.5 1.5 1 1.5-1"/></svg>',
  check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4 10-10"/></svg>',
  heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>',
  truck: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
  pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11Z"/><circle cx="12" cy="10" r="2"/></svg>',
};

/* packet illustration (no photo exists yet) */
function packetsSVG(n = 5, h = 150) {
  const cols = BLENDS.map(b => b.color);
  let out = '';
  for (let i = 0; i < n; i++) {
    const c = cols[i % 5], rot = (i - (n - 1) / 2) * 5;
    out += `<svg viewBox="0 0 62 100" style="width:${h * .62}px;max-width:18%;height:auto;transform:rotate(${rot}deg) translateY(${Math.abs(rot) * 1.2}px)">
      <path d="M4 6h54v88H4z" fill="#fff"/><path d="M4 6h54v6H4zM4 88h54v6H4z" fill="${c}" opacity=".9"/>
      <path d="M4 12h54" stroke="#ddd" stroke-dasharray="2 2"/>
      <g transform="translate(23 26)" fill="none" stroke="#B8924A" stroke-width="1.2"><path d="M8 0c4.4 0 8 3.6 8 8v14l-8 4-8-4V8c0-4.4 3.6-8 8-8Z"/><path d="M8 4 4 11l4 11 4-11-4-7Z"/></g>
      <text x="31" y="66" text-anchor="middle" font-family="Playfair Display,serif" font-size="7.5" fill="${c}">${BLENDS[i % 5].short.toUpperCase()}</text>
      <text x="31" y="76" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="4.5" letter-spacing=".6" fill="#8a7a55">SAPPHIRE SALT</text></svg>`;
  }
  return `<div class="packets">${out}</div>`;
}

/* the face of the brand: her photo when it lands in img/team/<slug>.jpg, a monogram until then */
function portrait(m, big) {
  return `<figure class="portrait${big ? ' big' : ''}">${m.photo ? `<img src="${m.photo}" alt="${m.name}">`
    : `<div class="pt-ph"><img src="img/tiara-gold.png" alt=""><span class="pt-name">${m.name}</span><small>Portrait coming</small></div>`}</figure>`;
}
function meetFace() {
  const m = TEAM.find(x => x.face);
  $$('[data-portrait]').forEach(el => el.outerHTML = portrait(m, true));
}
/* ---------- header / footer ---------- */
function layout() {
  const nav = [['shop.html', 'Shop', 'shop'], ['gifts.html', 'Gifts', 'gifts'], ['product.html?p=discovery', 'Discovery', 'start'], ['ingredients.html', 'Ingredients', 'ingredients']];
  const navR = [['process.html', 'Quality', 'process'], ['team.html', 'About', 'team'], ['wholesale.html', 'Wholesale', 'wholesale']];
  const a = ([h, t, k]) => `<a class="item${page === k ? ' on' : ''}" href="${h}">${t}</a>`;
  document.body.insertAdjacentHTML('afterbegin', `
  <div class="announce"><span class="rot on">Free shipping over <b>$${SS.freeShip}</b></span><span class="rot">Subscriptions always ship free</span><span class="rot">Pick any five blends — <b>$15</b></span><span class="rot">Made in Park City, Utah</span></div>
  <header class="site"><div class="wrap nav">
    <button class="burger" aria-label="Menu">${ICON.menu}</button>
    <nav class="left">${nav.map(a).join('')}</nav>
    <a class="brand" href="index.html" aria-label="Sapphire Salt & Spice home"><img src="img/logo-ss-stacked.png" alt="Sapphire Salt & Spice"></a>
    <div class="right">${navR.map(a).join('')}<button class="cart-btn" aria-label="Cart">${ICON.cart}<span class="count">0</span></button></div>
  </div><nav class="mobile-menu">${[...nav, ...navR, ['faq.html', 'FAQ & Contact', 'faq']].map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav></header>`);

  document.body.insertAdjacentHTML('beforeend', `
  <section class="newsletter"><div class="wrap">
    <span class="eyebrow">With purpose</span>
    <h2 style="margin-top:14px">Join the Sapphire table</h2>
    <p class="lede" style="margin:14px auto 0">Product news, ingredient stories and everyday cooking inspiration. 10% off your first order.</p>
    <form onsubmit="event.preventDefault();toast('You’re on the list — your code: WELCOME10');this.reset()"><input type="email" required placeholder="Email address" aria-label="Email address"><button class="btn">Join</button></form>
  </div></section>
  <footer class="site"><div class="wrap">
    <div class="cols">
      <div><img class="logo" src="img/logo-ss-primary-white.png" alt="Sapphire Salt & Spice"><p>Sapphire Salt & Spice brings thoughtful salts, seasonings and spices to the everyday table.</p><p class="made-ut">${ICON.utah}<span><b>Made in Utah</b>A Park City family company</span></p></div>
      <div><h4>Shop</h4>${BLENDS.map(b => `<a href="product.html?p=${b.slug}">${b.name}</a>`).join('')}<a href="product.html?p=discovery">Discovery Collection</a><a href="product.html?p=awaken-pepper">Awaken Pepper</a><a href="shop.html#soon">Coming soon</a></div>
      <div><h4>Learn</h4><a href="ingredients.html">Ingredients</a><a href="process.html">Process & Quality</a><a href="story.html">Our Story</a><a href="faq.html">FAQ</a><a href="faq.html#find">Where to buy</a><a href="contact.html?t=idea">Suggest a blend</a><a href="product.html?p=test-kitchen">Test Kitchen</a></div>
      <div><h4>Company</h4><a href="team.html">Our team</a><a href="team.html#join">Join the team</a><a href="affiliates.html">Affiliates</a><a href="wholesale.html">Wholesale</a><a href="wholesale.html#signin">Retailer sign in</a><a href="contact.html">Contact us</a><a href="#">Instagram</a></div>
      <div><h4>Help</h4><a href="policies.html#shipping">Shipping</a><a href="policies.html#returns">Returns & refunds</a><a href="policies.html#subscriptions">Subscriptions</a><a href="policies.html#military">Military & first responders</a><a href="policies.html#privacy">Privacy policy</a><a href="policies.html#choices">Your privacy choices</a><a href="policies.html#terms">Terms</a><a href="policies.html#accessibility">Accessibility</a></div>
    </div>
    <div class="legal"><span>© ${new Date().getFullYear()} Sapphire Salt L.L.C. · 875 Iron Horse Dr. Suite A, Park City, UT 84098</span><span>This salt does not supply iodide, a necessary nutrient. Not intended to diagnose, treat, cure or prevent any disease.</span></div>
  </div></footer>
  <div class="scrim"></div>
  <aside class="drawer" aria-label="Cart"><div class="top"><h3>Your cart</h3><button class="x" aria-label="Close">×</button></div>
    <div class="ship"><p class="ship-msg"></p><div class="bar"><i></i><span class="truck">${ICON.truck}</span></div><div class="ship-adds"></div></div><div class="lines"></div>
    <div class="foot"><div class="tot sm"><span>Subtotal</span><span class="sub">$0</span></div><div class="tot sm"><span>Shipping</span><span class="shp">—</span></div><div class="tot"><span>Total</span><span class="grand">$0</span></div><button class="btn block checkout">Checkout</button><button class="btn block apay" aria-label="Buy with Apple Pay"><span class="ap"></span> Pay</button>
    <p style="font-size:12px;color:var(--muted);margin:10px 0 0;text-align:center">Taxes calculated at checkout</p></div></aside>
  <div class="toast"></div>`);

  $('.burger').onclick = () => document.body.classList.toggle('menu-open');
  $('.cart-btn').onclick = openCart;
  $('.scrim').onclick = $('.drawer .x').onclick = closeCart;
  $('.checkout').onclick = () => { location.href = 'checkout.html'; };
  $('.apay').onclick = () => { location.href = 'checkout.html?express=apple'; };
}

/* ---------- cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('ss_cart') || '[]'); } catch (e) { cart = []; }
const save = () => { try { localStorage.setItem('ss_cart', JSON.stringify(cart)); } catch (e) {} renderCart(); };
let lastTap = null;   // the button that was pressed, so the grains know where to start
document.addEventListener('pointerdown', e => { const b = e.target.closest('button, .btn'); if (b) lastTap = { el: b, t: Date.now() }; }, true);
function pour(from) {   // a small arc of salt grains from the button to the bag
  const cb = $('.cart-btn'); if (!cb || calm) return 0;
  const a = from.getBoundingClientRect(), z = cb.getBoundingClientRect();
  const x0 = a.left + a.width / 2, y0 = a.top + a.height / 2, x1 = z.left + z.width / 2, y1 = z.top + z.height / 2;
  for (let i = 0; i < 12; i++) {
    const g = document.createElement('i'); g.className = 'grain'; document.body.appendChild(g);
    const dx = (Math.random() - .5) * 40, lift = 90 + Math.random() * 80, d = 520 + Math.random() * 260;
    g.animate([
      { transform: `translate(${x0 + dx}px,${y0}px) scale(1)`, opacity: 1 },
      { transform: `translate(${(x0 + x1) / 2 + dx}px,${Math.min(y0, y1) - lift}px) scale(1.1)`, opacity: 1, offset: .45 },
      { transform: `translate(${x1}px,${y1}px) scale(.4)`, opacity: .2 }],
      { duration: d, delay: i * 22, easing: 'cubic-bezier(.4,.1,.3,1)', fill: 'forwards' }).onfinish = () => g.remove();
  }
  return 640;
}
function addToCart(item) {
  const hit = cart.find(i => i.key === item.key);
  hit ? hit.qty += item.qty : cart.push(item);
  save();
  const btn = lastTap && Date.now() - lastTap.t < 1500 && lastTap.el.isConnected ? lastTap.el : null;
  const wait = btn ? pour(btn) : 0;
  if (btn && !btn.classList.contains('added')) {   // a short "Added" with a check, then back to normal
    const was = btn.innerHTML; btn.classList.add('added'); btn.innerHTML = `<span class="ok">✓</span> Added`;
    setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = was; }, 1500);
  }
  setTimeout(() => { const cb = $('.cart-btn'); cb.classList.remove('bump'); void cb.offsetWidth; cb.classList.add('bump'); openCart(); }, wait);
}
/* proposed shipping rules (SS in data.js): free over the threshold; subscriptions free from
   subShipMin; packet-only orders (Discovery, Kindness) mail flat and ship free; else a flat rate */
function shippingFor(sub) {
  if (!cart.length) return 0;
  if (sub >= SS.freeShip) return 0;
  if (cart.every(i => i.packet || i.digital || i.inclShip)) return 0;
  if (cart.some(i => /-sub$/.test(i.key)) && sub >= SS.subShipMin) return 0;
  return SS.flatShip;
}
function renderCart() {
  if (!$('.drawer')) return;   // checkout page has no drawer
  const n = cart.reduce((a, i) => a + i.qty, 0), sub = cart.reduce((a, i) => a + i.qty * i.price, 0);
  const shp = shippingFor(sub);
  $('.cart-btn .count').textContent = n; $('.cart-btn .count').style.display = n ? '' : 'none';
  shipNudge(sub, shp);
  $('.drawer .sub').textContent = money(sub);
  $('.drawer .shp').textContent = !cart.length ? '—' : shp ? money(shp) : 'Free';
  $('.drawer .grand').textContent = money(sub + shp);
  $('.lines').innerHTML = cart.length ? cart.map((i, k) => `<div class="ln"><img src="${i.img}" alt=""><div><b>${i.name}</b><small>${i.variant}</small>
    <div class="q"><button data-k="${k}" data-d="-1">−</button>${i.qty}<button data-k="${k}" data-d="1">+</button></div></div>
    <div style="text-align:right"><div>${money(i.price * i.qty)}</div><button class="rm" data-rm="${k}">Remove</button></div></div>`).join('')
    : `<div class="empty">Your cart is empty.<br><br><a class="link" href="shop.html">Shop the blends</a></div>`;
  $$('.lines [data-d]').forEach(b => b.onclick = () => { const i = cart[b.dataset.k]; i.qty += +b.dataset.d; if (i.qty < 1) cart.splice(b.dataset.k, 1); save(); });
  $$('.lines [data-rm]').forEach(b => b.onclick = () => { cart.splice(b.dataset.rm, 1); save(); });
}
/* free-shipping nudge: animated bar + one-tap add-ons that close the gap */
let wasFree = null;
function shipNudge(sub, shp) {
  const box = $('.ship'), left = SS.freeShip - sub, free = cart.length && !shp;
  const pctFill = cart.length ? (free ? 100 : Math.min(100, sub / SS.freeShip * 100)) : 0;
  box.classList.toggle('free', !!free);
  $('.bar i', box).style.width = pctFill + '%';
  $('.truck', box).style.left = `calc(${pctFill}% - 11px)`;
  $('.ship-msg', box).innerHTML = !cart.length ? `Free shipping on orders over <b>$${SS.freeShip}</b>`
    : free ? (sub >= SS.freeShip ? '<b>Free shipping unlocked.</b> Nice.' : '<b>Your order ships free.</b>')
    : `Add <b>${money(left)}</b> more to unlock free shipping`;
  // suggestions: the cheapest things that get them over the line, plus one smaller option
  let adds = [];
  if (cart.length && !free) {
    const inCart = new Set(cart.map(i => i.key.split('-')[0]));
    const pool = [
      ...BLENDS.filter(x => !inCart.has(x.slug.split('-')[0])).slice(0, 3).map(x => ({ key: `${x.slug}-4oz-once`, label: `${x.short} 4 oz`, name: x.name, variant: '4 oz shaker jar', price: SIZES[0].price, img: `img/${x.slug}-card.jpg` })),
      { key: 'discovery', label: 'Discovery', name: 'Discovery Collection', variant: 'Pick any 5 · 15 packets', price: 15, img: 'img/fan-card.jpg', packet: true },
      { key: 'kindness', label: 'Kindness pack', name: 'Kindness Collection', variant: '5 × 6 g packets', price: 5, img: 'img/fan-card.jpg', packet: true },
      ...BLENDS.filter(x => !inCart.has(x.slug.split('-')[0])).slice(0, 1).map(x => ({ key: `${x.slug}-16oz-once`, label: `${x.short} 16 oz`, name: x.name, variant: '16 oz kitchen jar', price: SIZES[1].price, img: `img/${x.slug}-card.jpg` })),
    ].filter(x => !cart.some(i => i.key === x.key));
    const over = pool.filter(x => x.price >= left).sort((a, b) => a.price - b.price);
    adds = over.slice(0, 2);
    if (adds.length < 2) adds.push(...pool.filter(x => x.price < left && !adds.includes(x)).sort((a, b) => b.price - a.price).slice(0, 2 - adds.length));
  }
  $('.ship-adds', box).innerHTML = adds.map((x, i) => `<button data-add="${i}" style="animation-delay:${.08 * i}s">+ ${x.label} <span>${money(x.price)}</span></button>`).join('');
  $$('.ship-adds [data-add]', box).forEach(btn => btn.onclick = () => { const x = adds[+btn.dataset.add]; addToCart({ key: x.key, name: x.name, variant: x.variant, price: x.price, qty: 1, img: x.img, packet: !!x.packet }); });
  wasFree = !!free;
}
const openCart = () => document.body.classList.add('open');
const closeCart = () => document.body.classList.remove('open');
function toast(msg) { const t = $('.toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2600); }

/* ---------- product card ---------- */
const CHIPS = SIZES.filter(z => z.chip !== null);   // the card shows one chip per format; the product page has every box size
const sizeAlt = (b, z) => z.jar ? `${b.name} in 4 oz and 16 oz jars` : `${b.name} ${z.label.toLowerCase()}`;
const STAR5 = n => [1, 2, 3, 4, 5].map(i => `<i class="${n >= i - .25 ? 'f' : n >= i - .75 ? 'h' : ''}">★</i>`).join('');
const starsHTML = slug => { const r = ratingOf(slug);
  return r ? `<a class="stars" href="product.html?p=${slug}#reviews" aria-label="${r.avg.toFixed(1)} out of 5, ${r.n} reviews">${STAR5(r.avg)}<span>${r.avg.toFixed(1)} (${r.n})</span></a>`
    : `<a class="stars none" href="product.html?p=${slug}#reviews"><span>No reviews yet</span></a>`; };
const strip = items => items && items.length ? `<div class="strip" aria-label="${items.join(', ')}"><div class="track">${[0, 1].map(k => `<span aria-hidden="true">${items.map(x => `<i>${x}</i>`).join('')}</span>`).join('')}</div></div>` : '';
const EYE = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18.3 10c0 2-2.5 6.7-8.3 6.7S1.7 12 1.7 10 4.2 3.3 10 3.3 18.3 8 18.3 10Z"/><circle cx="10" cy="10" r="2.5"/></svg>';
/* the card, after SALTT: a pill, quick view and quick add on hover, the allergen line, and a slow strip of what's in it */
function blendCard(b) {
  const pill = b.popular ? '★ Most popular' : 'New';
  return `<article class="card" style="--c:${b.color};--tint:${b.tint}" data-slug="${b.slug}">
    <div class="ph"><a href="product.html?p=${b.slug}" tabindex="-1"><img src="img/${b.slug}-card.jpg" alt="${sizeAlt(b, SIZES[0])}" loading="lazy"></a>
      <span class="pop${b.popular ? '' : ' new'}">${pill}</span>
      <button class="qv" type="button" aria-label="Quick view: ${b.name}">${EYE}<span>View</span></button>
      <button class="qadd" type="button">Quick add · <b>${money(SIZES[0].price)}</b></button>
      ${b.allergens ? `<span class="alg">${b.allergens}</span>` : ''}</div>
    <div class="body"><span class="tag">${b.tag}</span><h3><a href="product.html?p=${b.slug}">${b.name}</a></h3>${starsHTML(b.slug)}<p>${b.line}</p>
      <div class="chips">${CHIPS.map((s, i) => `<button class="chip${i ? '' : ' on'}" data-size="${s.id}">${s.chip || s.label}</button>`).join('')}</div>
      <div class="buy"><span class="price">${money(SIZES[0].price)}</span><button class="add">Add to cart</button></div></div>
    ${strip(b.spec && [...b.spec, b.allergens])}</article>`;
}
/* quick view: the card's essentials in a panel, without leaving the grid */
function quickView(b, size = SIZES[0]) {
  let q = $('#qv'); if (!q) { document.body.insertAdjacentHTML('beforeend', '<div id="qv" class="qv-modal" role="dialog" aria-modal="true" aria-label="Quick view" hidden><div class="qv-box"></div></div>'); q = $('#qv'); q.onclick = e => { if (e.target === q) q.hidden = true; }; }
  const box = $('.qv-box', q);
  const draw = () => {
    box.style.setProperty('--c', b.color);
    box.innerHTML = `<button class="qv-x" aria-label="Close">×</button><div class="qv-img"><img src="img/${b.slug}-${size.pic === 'card' ? 'pair' : size.pic.replace('-card', '')}.jpg" alt="${sizeAlt(b, size)}"></div>
      <div class="qv-info"><span class="tag" style="color:var(--c)">${b.tag}</span><h3>${b.name}</h3><p>${b.line}</p>
        <div class="chips">${SIZES.map(z => `<button class="chip${z.id === size.id ? ' on' : ''}" data-size="${z.id}">${z.jar ? z.label : z.label.split(' ').pop().replace(/^./, c => c.toUpperCase()) + ' · ' + z.note.split(' · ')[0].replace('Box of ', '')}</button>`).join('')}</div>
        <p class="qv-note">${size.note}</p>
        ${b.allergens ? `<p class="qv-alg">${b.allergens}</p>` : ''}
        <div class="qv-buy"><span class="price">${money(size.price)}</span><button class="btn qv-add">Add to cart</button></div>
        <a class="link" href="product.html?p=${b.slug}&size=${size.id}">Full details</a></div>`;
    $('.qv-x', box).onclick = () => q.hidden = true;
    $$('.chip', box).forEach(c => c.onclick = () => { size = SIZES.find(z => z.id === c.dataset.size); draw(); });
    $('.qv-add', box).onclick = () => { q.hidden = true; addToCart({ key: `${b.slug}-${size.id}`, name: b.name, variant: `${size.label} · ${size.note.toLowerCase()}`, price: size.price, qty: 1, img: `img/${b.slug}-${size.pic}.jpg` }); };
  };
  draw(); q.hidden = false; $('.qv-x', box).focus();
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { q.hidden = true; document.removeEventListener('keydown', esc); } });
}
function wireCards(root = document) {
  $$('.card[data-slug]', root).forEach(card => {
    const b = findBlend(card.dataset.slug); let size = SIZES[0];
    $$('.chip', card).forEach(ch => ch.onclick = () => {
      $$('.chip', card).forEach(c => c.classList.remove('on')); ch.classList.add('on');
      size = SIZES.find(s => s.id === ch.dataset.size); $('.price', card).textContent = money(size.price); $('.qadd b', card).textContent = money(size.price);
      const im = $('.ph img', card), src = `img/${b.slug}-${size.pic}.jpg`;
      if (!im.src.endsWith(src)) { im.style.opacity = 0; setTimeout(() => { im.src = src; im.alt = sizeAlt(b, size); im.style.opacity = ''; }, 160); }
    });
    $('.add', card).onclick = $('.qadd', card).onclick = () => addToCart({ key: `${b.slug}-${size.id}`, name: b.name, variant: `${size.label} · ${size.note.toLowerCase()}`, price: size.price, qty: 1, img: `img/${b.slug}-${size.pic}.jpg` });
    $('.qv', card).onclick = () => quickView(b, size);
  });
}
function extraImg(e) {
  if (e.kind === 'pepper') return `<img src="img/soon-awaken-pepper.jpg" alt="Awaken Pepper in a glass jar" style="object-position:50% 35%">`;
  if (e.kind === 'stand') return `<img src="img/stand-crop.jpg" alt="All ten jars on the walnut display stand">`;
  if (e.kind === 'custom') return engraved(['The Rose Family', 'Salt with purpose', 'Est. 2026'], 'The walnut display stand, engraved on all three rails');
  if (e.kind === 'gift') return `<img src="img/giftbox-card.jpg" alt="Three 4 oz jars in front of the navy, gold-foil Sapphire gift box">`;
  if (e.kind === 'packets') return `<img src="img/fan.jpg" alt="Sample packets of all five blends">`;
  if (e.kind === 'kindness') return `<img src="img/kindness-card.jpg" alt="A Kindness Card with five packets">`;
  if (e.kind === 'giftcard') return `<img src="img/giftcard.jpg" alt="Sapphire Salt digital gift card">`;
  if (e.kind === 'subgift') return `<img src="img/year-of-salt.jpg" alt="A Year of Salt & Spice: twelve different jars, one a month">`;
  if (e.kind === 'set') return `<img src="img/set-4oz.jpg" alt="All five blends in 4 oz shaker jars">`;
  if (e.kind === 'test') return conceptArt(e.now, 'Small batch', e.color);
  if (e.kind === 'set16') return `<img src="img/set-16oz.jpg" alt="All five blends in 16 oz kitchen jars">`;
  return packetsSVG(e.slug === 'kindness' ? 5 : 5, 130);
}
const extraThumb = e => e.kind === 'custom' ? 'img/stand-crop.jpg' : e.kind === 'kindness' ? 'img/kindness-card.jpg' : e.kind === 'giftcard' ? 'img/giftcard.jpg' : e.kind === 'subgift' ? 'img/year-of-salt.jpg' : e.kind === 'pepper' ? 'img/soon-awaken-pepper.jpg' : e.kind === 'stand' ? 'img/stand-crop.jpg' : e.kind === 'gift' ? 'img/giftbox-card.jpg' : e.kind === 'packets' ? 'img/fan-card.jpg' : e.kind === 'set' ? 'img/set-4oz.jpg' : e.kind === 'set16' ? 'img/set-16oz.jpg' : e.kind === 'test' ? 'img/tiara-gold.png' : 'img/crest-gold.png';
/* art for things we don't have a photo of yet: the product's color, the tiara and its name */
const conceptArt = (name, label, color, cls = '') => `<span class="concept-art ${cls}" style="--c:${color}"><img src="img/tiara-white.png" alt=""><b>${name}</b><small>${label}</small></span>`;
/* the stand with every rail blank, and the customer's words laid into the walnut */
const RAILS = [['Top sign', 'Sapphire Salt and Spice'], ['Middle rail', 'Salt with purpose'], ['Bottom rail', 'Your everyday salt']];
const engraved = (lines, alt) => `<span class="engr"><img src="img/stand-blank3.jpg" alt="${alt}">${lines.map((t, i) => `<em class="r${i}"${t ? '' : ' hidden'}>${t}</em>`).join('')}</span>`;
function extraCard(e) {
  return `<article class="set" style="--tint:${e.tint};--c:${e.color === '#0B1B3F' ? 'var(--navy)' : e.color}"><a class="ph" href="product.html?p=${e.slug}">${extraImg(e)}</a>
    <div class="body">${e.was ? '<span><span class="badge">Save ' + money(e.was - e.price) + '</span></span>' : ''}<h3><a href="product.html?p=${e.slug}">${e.name}</a></h3>${e.digital ? '' : starsHTML(e.slug)}
    <span class="eyebrow" style="letter-spacing:.14em">${e.sub}</span><p>${e.line}</p>
    <div class="buy" style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><span class="price">${money(e.price)}${e.was ? `<s>${money(e.was)}</s>` : ''}</span>
    <button class="add" data-extra="${e.slug}">Add to cart</button></div></div>${strip(e.spec)}</article>`;
}
function wireExtras(root = document) {
  $$('[data-extra]', root).forEach(b => b.onclick = () => { const e = findExtra(b.dataset.extra); addToCart({ key: e.slug, name: e.name, variant: e.sub, price: e.price, qty: 1, img: extraThumb(e), packet: !!e.packet }); });
}

/* ---------- coming soon ---------- */
const SOON_ICON = {
  stick: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="14" y="8" width="10" height="48" rx="2"/><rect x="27" y="8" width="10" height="48" rx="2"/><rect x="40" y="8" width="10" height="48" rx="2"/><path d="M14 14h10M27 14h10M40 14h10"/></svg>',
  kit: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="8" y="24" width="48" height="30" rx="2"/><path d="M8 32h48M32 24v30"/><path d="M32 24c-6-10-16-8-12-2 2 3 12 2 12 2s10 1 12-2c4-6-6-8-12 2Z"/></svg>',
  cellar: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 34h44c0 12-10 18-22 18S10 46 10 34Z"/><path d="M10 34c2-10 42-10 44 0"/><path d="M14 30c-2-8 6-14 18-14s20 6 18 14"/><circle cx="32" cy="14" r="2.5"/></svg>',
  pouch: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M16 12h32l4 40H12l4-40Z"/><path d="M16 18h32"/><path d="M24 34h16M26 40h12"/></svg>',
  grinder: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M24 10h16l-2 8H26l-2-8Z"/><path d="M26 18h12l3 30H23l3-30Z"/><path d="M22 48h20v6H22z"/><circle cx="32" cy="8" r="2"/></svg>',
  dispenser: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 14h28v34H18z"/><path d="M18 48l6 6h16l6-6"/><path d="M28 54v4h8v-4"/><path d="M24 24h16"/></svg>',
  oil: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M28 6h8v8h-8z"/><path d="M27 14h10l3 8v32a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V22l3-8Z"/><path d="M24 34h16"/></svg>',
  honey: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 18h24v6H20z"/><path d="M18 24h28v28a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V24Z"/><path d="M26 36l6-4 6 4v7l-6 4-6-4z"/></svg>',
  tote: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22h40l-3 32H15l-3-32Z"/><path d="M23 22c0-12 18-12 18 0"/><path d="M27 38h10"/></svg>',
  cap: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 40c0-14 9-22 20-22s20 8 20 22H12Z"/><path d="M12 40c-4 0-6 2-6 4h30"/><circle cx="32" cy="17" r="2"/></svg>',
  bolt: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="22" y="6" width="20" height="52" rx="3"/><path d="M22 13h20M22 51h20"/><path d="M34 20l-7 14h7l-3 12 9-16h-7l3-10z"/></svg>',
  coffee: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 26h34v14a12 12 0 0 1-12 12h-10a12 12 0 0 1-12-12V26Z"/><path d="M46 30h4a6 6 0 0 1 0 12h-5"/><path d="M22 10c-3 4 3 6 0 10M30 10c-3 4 3 6 0 10M38 10c-3 4 3 6 0 10"/><path d="M10 56h40"/></svg>',
  tea: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 28h36v8a16 16 0 0 1-16 16h-4a16 16 0 0 1-16-16v-8Z"/><path d="M48 32h3a5 5 0 0 1 0 10h-5"/><path d="M30 28V12"/><rect x="25" y="12" width="10" height="9" rx="1"/><path d="M26 22c4 2 0-6 8-2"/></svg>',
  capsule: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="10" y="24" width="44" height="16" rx="8" transform="rotate(-35 32 32)"/><path d="M26 22l12 20" /></svg>',
  drop: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M28 6h8v6h-8z"/><path d="M26 12h12v6H26z"/><path d="M24 18h16l2 6v30a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V24l2-6Z"/><path d="M32 34c-3 4-4 6-4 8a4 4 0 0 0 8 0c0-2-1-4-4-8Z"/></svg>',
  scoop: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 20h36v30a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6V20Z"/><path d="M12 14h40v6H12z"/><path d="M24 34c0-4 16-4 16 0s-8 6-8 6"/></svg>',
  apron: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 10h20v12l8 6v26H14V28l8-6V10Z"/><path d="M14 28l-6-4M50 28l6-4"/><path d="M24 40h16v8H24z"/></svg>',
};
function comingCard(c) {
  const ph = c.img ? `<img src="${c.img}" alt="${c.name} concept" loading="lazy">` : `<div class="soon-ic" style="color:${c.color}">${SOON_ICON[c.icon]}</div>`;
  return `<article class="soon-card" style="--c:${c.color}"><div class="ph">${ph}<span class="soon-tag">Concept</span></div>
    <div class="body"><span class="eyebrow">${c.sub}</span><h3>${c.name}</h3><p>${c.line}</p>
    <form class="notify"><input type="email" required placeholder="Your email" aria-label="Email"><button class="btn">Notify me</button></form></div>${strip(c.sub.split(' · ').concat('Coming soon'))}</article>`;
}
/* seasonings and spices on the shop page: each its own section, sub-category tabs, buy or vote */
function shelfGrid(cat) {
  const root = $('#' + cat); if (!root) return;
  const C = CATS.find(c => c.id === cat), items = SEASONINGS.filter(x => x.cat === cat);
  const want = new Set(), grid = $('.seas-grid', root), n = $('.sn-n', root);
  $('.seas-tabs', root).innerHTML = [['all', 'All'], ...C.subs].map(([k, t], i) => `<button class="${i ? '' : 'on'}" data-g="${k}">${t}</button>`).join('');
  grid.innerHTML = items.map(x => { const e = x.live && findExtra(x.slug);
    return `<article class="seas" data-g="${x.sub}" style="--c:${x.color}">
    <div class="ph">${x.img ? `<img src="${x.img}" alt="${x.name} in a small glass jar${x.live ? '' : ' (packaging concept)'}" loading="lazy">` : conceptArt(x.name, x.gold, x.color, 'tall')}${x.live ? '' : '<span class="soon-tag">Concept</span>'}</div>
    <h3>${x.name}</h3><small>${x.gold}</small>${!x.live && x.price ? `<small class="plan">Planned · ${money(x.price)} for 4 oz</small>` : ''}
    ${e ? `<a class="btn" href="product.html?p=${x.slug}">Shop · ${money(e.price)}</a>` : `<button class="want" type="button" aria-pressed="false" data-s="${x.slug}">I’d buy this</button>`}${strip([x.little, '4 oz glass jar', 'Walnut lid'])}</article>`; }).join('');
  const count = () => n.textContent = want.size ? `${want.size} picked — we’ll email you when ${want.size > 1 ? 'they land' : 'it lands'}.` : 'Tap “I’d buy this” on any you want. We’ll make the most-wanted first.';
  $$('.want', grid).forEach(b => b.onclick = () => {
    const on = !want.has(b.dataset.s); on ? want.add(b.dataset.s) : want.delete(b.dataset.s);
    b.setAttribute('aria-pressed', on); b.textContent = on ? '✓ On my list' : 'I’d buy this'; count();
  });
  $$('.seas-tabs button', root).forEach(t => t.onclick = () => {
    $$('.seas-tabs button', root).forEach(x => x.classList.toggle('on', x === t));
    $$('.seas', grid).forEach(a => a.hidden = t.dataset.g !== 'all' && a.dataset.g !== t.dataset.g);
  });
  $('.seas-notify', root).onsubmit = ev => { ev.preventDefault(); toast(want.size ? 'Thanks — you’ll hear first.' : 'Pick at least one first.'); if (want.size) ev.target.reset(); };
  count();
}
/* pure salts by origin: Australian on sale, Utah and Himalayan coming */
function pureSalts() {
  const el = $('#pure-grid'); if (!el) return;
  el.innerHTML = PURE_SALTS.map(x => x.live ? blendCard(findBlend(x.slug)).replace('<span class="tag">', `<span class="tag">${x.name} · `)
    : `<article class="soon-card salt-soon" style="--c:${x.color}"><div class="ph"><div class="grain"><img src="img/tiara-white.png" alt=""><b>${x.name}</b></div><span class="soon-tag">Coming soon</span></div>
      <div class="body"><span class="eyebrow">${x.sub}</span><h3>${x.name}</h3><p>${x.line}</p>
      <form class="notify"><input type="email" required placeholder="Your email" aria-label="Email"><button class="btn">Notify me</button></form></div></article>`).join('');
  wireCards(el); wireNotify(el);
}
function wireNotify(root = document) {
  $$('.notify', root).forEach(f => f.onsubmit = ev => { ev.preventDefault(); toast('Thanks — you’ll hear first.'); f.reset(); });
}

/* ---------- interactive shelf (home hero) ----------
   Hotspots are in each image's own pixels, turned into %. Geometry: ../assets/v2/shelf-geometry.json */
const SHELF = {
  salt: { img: 'img/hero-stand.jpg', alt: 'All five Sapphire Salt & Spice blends in both sizes on the engraved walnut display shelf',
    order: ['hydrate', 'restore', 'pure', 'gut-health', 'belly-bliss'], stand: 'display-collection', w: 1672, h: 941,
    top: { y: [172, 408], x: [[494, 618], [656, 776], [812, 930], [964, 1081], [1114, 1231]] },
    bot: { y: [462, 782], x: [[458, 634], [636, 806], [808, 980], [980, 1149], [1149, 1319]] },
    case: [298, 64, 1440, 856],
    frame: [[298, 64, 1400, 172], [298, 64, 456, 856], [1330, 130, 1440, 856], [456, 408, 1360, 462], [420, 784, 1440, 856]] },   // wood: sign, posts, shelf, base
  seasonings: { img: 'img/seasonings-stand.jpg', alt: 'Five coming-soon seasonings in small jars on a counter',
    order: ['ember-steak', 'garden-herb', 'smoked', 'chili-lime', 'truffle'], stand: null, w: 1672, h: 941,
    top: { y: [450, 926], x: [[20, 314], [354, 649], [689, 983], [1023, 1318], [1358, 1652]] }, bot: null,
    case: [0, 420, 1672, 941], frame: [] },
  spices: { img: 'img/spices-stand.jpg', alt: 'Awaken Pepper and four coming-soon spices in small jars on a counter',
    order: ['awaken-pepper', 'pink-pepper', 'pepper-medley', 'chipotle', 'cayenne'], stand: null, w: 1672, h: 941,
    top: { y: [450, 926], x: [[20, 314], [354, 649], [689, 983], [1023, 1318], [1358, 1652]] }, bot: null,
    case: [0, 420, 1672, 941], frame: [] },
};
const SHELF_COPY = {
  seasonings: { name: 'The Seasonings Shelf', sub: 'Flavored salts', bar: 'Steak, herb, smoked, chili lime, truffle and more', n: 'seven' },
  spices: { name: 'The Spices Shelf', sub: 'Peppercorns, chiles & staples', bar: `Awaken Pepper today · ${SEASONINGS.filter(x => x.cat === 'spices').length - 1} more in the works`, n: String(SEASONINGS.filter(x => x.cat === 'spices').length) },
};
function shelfItem(slug, row) {
  const b = findBlend(slug);
  if (b) { const size = row === 'top' ? SIZES[0] : SIZES[1];
    return { name: b.name, sub: b.sub, line: b.line, color: b.color, img: `img/${b.slug}-card.jpg`, href: `product.html?p=${b.slug}`, blend: b, size }; }
  const e = findExtra(slug);
  if (e && !(e.kind === 'pepper' && row === 'bot'))
    return { name: e.name, sub: e.sub, line: e.line, color: e.color, img: extraThumb(e), href: `product.html?p=${e.slug}`, extra: e };
  if (e) return { name: 'Awaken Pepper — kitchen jar', sub: 'Larger size', line: 'A refill-sized jar of Tellicherry peppercorns for the pepper mill.', color: e.color, img: 'img/spices-crop.jpg', soon: true };
  const x = SEASONINGS.find(i => i.slug === slug), c = findComing(slug);
  return { name: x.name, sub: x.gold, line: c ? c.line : `${x.gold}. ${x.little}.`, color: x.color, img: x.img, soon: true, price: x.price };
}
const pct = (v, of) => (v / of * 100).toFixed(3) + '%';
let shelfLocked = null;
function shelf(which = 'salt') {
  const S = SHELF[which], root = $('#shelf'); root.dataset.which = which; shelfLocked = null;
  const W = S.w, H = S.h;
  // each hotspot carries its own bright crop of the photo, so it can lift off the dimmed shelf
  const box = ([x0, y0, x1, y1]) => {
    const w = x1 - x0, h = y1 - y0;
    return `left:${pct(x0, W)};top:${pct(y0, H)};width:${pct(w, W)};height:${pct(h, H)};` +
      `--x:url(${new URL(S.img, location.href).href});background-size:${(W / w * 100).toFixed(2)}% ${(H / h * 100).toFixed(2)}%;` +
      `background-position:${(x0 / (W - w) * 100).toFixed(2)}% ${(y0 / (H - h) * 100).toFixed(2)}%`;
  };
  let hots = '';
  ['top', 'bot'].filter(row => S[row]).forEach(row => S.order.forEach((slug, i) => {
    const it = shelfItem(slug, row), [x0, x1] = S[row].x[i], [y0, y1] = S[row].y;
    hots += `<button class="hot" style="${box([x0, y0, x1, y1])}" data-slug="${slug}" data-row="${row}" aria-label="${it.name}${it.size ? ', ' + it.size.label : ''}"><i class="dot"></i></button>`;
  }));
  const frames = S.frame.map(f => `<span class="frame" style="left:${pct(f[0], W)};top:${pct(f[1], H)};width:${pct(f[2] - f[0], W)};height:${pct(f[3] - f[1], H)}"></span>`).join('');
  const e = S.stand && findExtra(S.stand);
  root.innerHTML = `<div class="canvas"><img class="bg" src="${S.img}" alt="${S.alt}" fetchpriority="high">
    <div class="sun" aria-hidden="true"><i class="leaves l1"></i><i class="leaves l2"></i><i class="glow"></i></div>
    <button class="hot case" style="${box(S.case)}" aria-label="${e ? 'The whole display, ' + money(e.price) : SHELF_COPY[which].name}"></button>${frames}${hots}</div>`;
  const bar = $('#whole-bar');
  bar.innerHTML = e ? `<span class="wb-l"><b>Shop the whole shelf</b><small>All ten jars + the walnut display stand</small></span><span class="wb-r">${money(e.price)} <i>→</i></span>`
    : `<span class="wb-l"><b>${SHELF_COPY[which].name.replace('The ', 'The ')}</b><small>${SHELF_COPY[which].bar}</small></span><span class="wb-r">Coming soon <i>→</i></span>`;
  const hover = matchMedia('(hover:hover)').matches;
  // only the jars react to the pointer; the whole-shelf offer lives in the panel button
  // the whole display: the gold tag on the sign, or any of the wood
  const caseEl = $('.hot.case', root);
  $$('.frame', root).concat($('#whole-bar')).forEach(el => {
    el.onclick = ev => { ev.stopPropagation(); shelfLocked = caseEl; select(caseEl, which); };
    if (matchMedia('(hover:hover)').matches) {
      el.onmouseenter = () => select(caseEl, which, true);
      el.onmouseleave = () => shelfLocked ? select(shelfLocked, which) : (root.classList.remove('focus'), caseEl.classList.remove('active'), shelfPanel(which));
    }
  });
  $$('.hot:not(.case)', root).forEach(h => {
    h.onclick = ev => { ev.stopPropagation(); shelfLocked = h; select(h, which); };
    if (hover) {
      h.onmouseenter = () => select(h, which, true);
      h.onmouseleave = () => shelfLocked ? select(shelfLocked, which) : (root.classList.remove('focus'), h.classList.remove('active'), shelfPanel(which));
    }
  });
  shelfPanel(which);
}
/* Build your five: tap blends, packets drop into the tray */
function build5() {
  const root = $('#build5'); if (!root) return;
  const picks = BLENDS.map(b => b.slug);   // starts as one of each; swap to customise
  const tray = $('.b5-tray', root), pick = $('.b5-pick', root);
  const opts = (cat) => DISCOVERY[cat].items.map(o => `<button class="b5-opt${o.available ? '' : ' soon'}" data-s="${o.slug}" style="--c:${o.color}"${o.available ? '' : ' disabled'}>
      ${o.img ? `<img src="${o.img}" alt="">` : `<i class="sw"></i>`}<span><b>${o.name}</b><small>${o.available ? o.tag : 'Coming soon'}</small></span><i class="plus">+</i><em class="n"></em></button>`).join('');
  const tabs = $('.b5-tabs', root);
  tabs.innerHTML = Object.entries(DISCOVERY).map(([k, d], i) => `<button class="${i ? '' : 'on'}" data-cat="${k}">${d.label}${d.soon ? ' <em>Soon</em>' : ''}</button>`).join('');
  pick.innerHTML = opts('salt');
  $$('button', tabs).forEach(tb => tb.onclick = () => { $$('button', tabs).forEach(x => x.classList.toggle('on', x === tb)); pick.innerHTML = opts(tb.dataset.cat); wire(); draw(); });
  const draw = (added) => {
    tray.innerHTML = [0, 1, 2, 3, 4].map(i => {
      const s = picks[i], b = s && findBlend(s);
      return b ? `<div class="slot full${i === added ? ' drop' : ''}" style="--r:${(i - 2) * 1.5}deg"><img src="img/packet-${s}.png" alt="${b.name}"><span>${b.short}</span><button aria-label="Remove ${b.name}" data-rm="${i}">×</button></div>`
        : `<div class="slot"><span>${i + 1}</span></div>`;
    }).join('');
    const n = picks.length;
    $('.b5-count b', root).textContent = n; $('.b5-prog i', root).style.width = n * 20 + '%';
    $$('.b5-opt:not(.soon)', root).forEach(o => { const c = picks.filter(x => x === o.dataset.s).length; $('.n', o).textContent = c ? '×' + c : ''; o.classList.toggle('on', c > 0); o.disabled = n >= 5; });
    const add = $('.b5-add', root); add.disabled = n !== 5;
    add.textContent = n === 5 ? 'Add my five — $15' : `Pick ${5 - n} more`;
    $$('[data-rm]', tray).forEach(x => x.onclick = () => { picks.splice(+x.dataset.rm, 1); draw(); });
  };
  const wire = () => $$('.b5-opt:not(.soon)', root).forEach(o => o.onclick = () => { if (picks.length < 5) { picks.push(o.dataset.s); draw(picks.length - 1); } });
  wire();
  $('.b5-each', root).onclick = () => { picks.length = 0; BLENDS.forEach(b => picks.push(b.slug)); draw(4); };
  $('.b5-clear', root).onclick = () => { picks.length = 0; draw(); };
  $('.b5-add', root).onclick = () => {
    const ch = BLENDS.filter(b => picks.includes(b.slug)).map(b => { const c = picks.filter(x => x === b.slug).length; return `${b.short}${c > 1 ? ' ×' + c : ''}`; });
    addToCart({ key: 'discovery-' + ch.join('-'), name: 'Discovery Collection', variant: ch.join(', '), price: 15, qty: 1, img: 'img/fan-card.jpg', packet: true });
  };
  draw();
}
function tryFive() {
  const el = $('#try5'); if (!el) return;
  el.innerHTML = `<img src="img/fan-card.jpg" alt="Sample packets of all five blends">
    <div><span class="eyebrow">New here?</span><h3>Mix & match any 5 to try — $15</h3>
      <p>Pick five blends, three packets each. Ships free.</p></div>
    <div class="t5-dots">${BLENDS.map(b => `<i style="--c:${b.color}" title="${b.name}"></i>`).join('')}</div>
    <a class="btn gold" href="product.html?p=discovery">Build your 5</a>`;
}
function shelfInfo(h, which) {
  const S = SHELF[which];
  if (!h.classList.contains('case')) return shelfItem(h.dataset.slug, h.dataset.row);
  const e = S.stand && findExtra(S.stand);
  return e ? { name: e.name, sub: e.sub, line: e.line, color: e.color, img: 'img/stand-crop.jpg', href: `product.html?p=${e.slug}`, extra: e, shop: true }
    : { name: SHELF_COPY[which].name, sub: SHELF_COPY[which].sub, line: `${which === 'spices' ? `Awaken Pepper is here now; ${SEASONINGS.filter(x => x.cat === 'spices').length - 1} more spices are` : 'Seven seasonings are'} in the works, each priced on its own. Get first word when they land.`, color: '#3B2A1E', img: `img/${which}-crop.jpg`, href: `shop.html#${which}`, soon: true };
}
function select(h, which, preview = false) {
  const root = $('#shelf');
  $$('.hot.active', root).forEach(x => x.classList.remove('active'));
  h.classList.add('active'); root.classList.add('focus');
  shelfPanel(which, shelfInfo(h, which));
  if (!preview && matchMedia('(max-width:860px)').matches) $('#shelf-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function shelfPanel(which, it) {
  const q = $('#shelf-panel');
  if (!it) {   // nothing picked yet: the five packets, so people can start right away
    q.style.setProperty('--c', 'var(--gold)'); q.classList.add('intro');
    if (which === 'salt') {
      q.innerHTML = `<div class="sp-body"><span class="eyebrow">New here?</span>
        <h3>Discover your first five</h3>
        <div class="sp-packs">${DISCOVERY.salt.items.map(x => `<figure><img src="${x.img}" alt="${x.name} packet"><figcaption>${x.name.replace(' Salt', '')}</figcaption></figure>`).join('')}</div>
        <p>Five blends, three single-serve packets of each — 15 in all — to taste on real food before you pick a jar.</p>
        <div class="freeship">${ICON.truck}<span><b>Ships free</b> — on us, at any size</span></div>
        <button class="btn gold sp-one">Add all five — $15</button>
        <a class="link" href="#build5">Or choose your own five</a></div>`;
      $('.sp-one', q).onclick = () => addToCart({ key: 'discovery-' + BLENDS.map(x => x.short).join('-'), name: 'Discovery Collection', variant: BLENDS.map(x => x.short).join(', '), price: 15, qty: 1, img: 'img/fan-card.jpg', packet: true });
    } else {
      const sp = which === 'spices';
      q.innerHTML = `<div class="sp-body"><span class="eyebrow">${sp ? 'Spices' : 'Seasonings'} Discovery · coming soon</span><h3>Five ${sp ? 'spices' : 'seasonings'} to try</h3>
        <div class="sp-packs one"><figure><img src="${sp ? 'img/packet-awaken.png' : 'img/soon-ember-steak.jpg'}" alt=""><figcaption>${sp ? 'Awaken Pepper' : 'Ember Steak Salt'}</figcaption></figure></div>
        <p>${sp ? 'Peppercorns and chiles' : 'Steak, herb, smoked, chili lime and more'} — pick any five when they land. <a class="link" href="shop.html#${which}">See all ${SHELF_COPY[which].n}</a></p>
        <form class="notify"><input type="email" required placeholder="Email for first word" aria-label="Email"><button class="btn">Notify me</button></form></div>`;
      wireNotify(q);
    }
    return;
  }
  const b = it.blend; let size = it.size;
  q.style.setProperty('--c', it.color); q.classList.remove('intro');
  q.innerHTML = `<div class="sp-img"><img src="${it.img}" alt=""></div>
    <div class="sp-body"><span class="eyebrow">${it.soon ? '<span class="soon">Coming soon</span>' : it.sub}</span><h3>${it.name}</h3><p>${it.line}</p>
      ${b ? `<div class="chips">${CHIPS.map(s => `<button class="chip${s.id === size.id ? ' on' : ''}" data-size="${s.id}">${s.chip || s.label}</button>`).join('')}</div>` : ''}
      ${it.soon && it.price ? `<p class="plan">Planned price: ${money(it.price)} for a 4 oz jar</p>` : ''}
      ${it.soon ? `<form class="notify"><input type="email" required placeholder="Email for first word" aria-label="Email"><button class="btn">Notify me</button></form>`
        : `<div class="qv-buy"><span class="price">${money(b ? size.price : it.extra.price)}</span><button class="btn add">Add to cart</button></div>`}
      <div class="sp-links">${it.href ? `<a class="link" href="${it.href}">Learn more</a>` : ''}${it.shop ? `<a class="link" href="wholesale.html">Own a shop?</a>` : ''}</div></div>`;
  $$('.chip', q).forEach(c => c.onclick = () => { $$('.chip', q).forEach(x => x.classList.remove('on')); c.classList.add('on'); size = SIZES.find(s => s.id === c.dataset.size); $('.price', q).textContent = money(size.price); });
  linkIngredients(q);
  const add = $('.add', q);
  if (add) add.onclick = () => addToCart(b
    ? { key: `${b.slug}-${size.id}-once`, name: b.name, variant: `${size.label} · ${size.note.toLowerCase()}`, price: size.price, qty: 1, img: `img/${b.slug}-${size.pic}.jpg` }
    : { key: it.extra.slug, name: it.extra.name, variant: it.extra.sub, price: it.extra.price, qty: 1, img: extraThumb(it.extra) });
  const f = $('.notify', q);
  if (f) f.onsubmit = ev => { ev.preventDefault(); toast(`Thanks — we’ll tell you when ${it.name} lands.`); f.reset(); };
}
const closeQV = () => {};

/* ---------- reviews: summary, list and a form. Nothing shows until a real, checked review exists ---------- */
function reviews(p, after) {
  const list = REVIEWS[p.slug] || [], r = ratingOf(p.slug);
  const sec = document.createElement('section'); sec.id = 'reviews'; sec.className = 'reviews wrap';
  const bars = [5, 4, 3, 2, 1].map(n => { const c = list.filter(x => x.stars === n).length; return `<div class="rv-bar"><span>${n}★</span><i><b style="width:${list.length ? c / list.length * 100 : 0}%"></b></i><span>${c}</span></div>`; }).join('');
  sec.innerHTML = `<div class="rv-head"><div><span class="eyebrow">Reviews</span><h2>${r ? `${r.avg.toFixed(1)} out of 5` : 'No ratings yet'}</h2>
      ${r ? `<div class="stars big">${STAR5(r.avg)}<span>${r.n} review${r.n > 1 ? 's' : ''}</span></div>` : `<p class="muted">${p.name} is new. Tried it? Yours could be the first review.</p>`}</div>
      <div class="rv-bars">${bars}</div><button class="btn ghost rv-open" type="button">Write a review</button></div>
    <form class="rv-form" hidden><div class="rv-pick" role="radiogroup" aria-label="Your rating">${[1, 2, 3, 4, 5].map(n => `<button type="button" role="radio" aria-checked="false" data-n="${n}" aria-label="${n} star${n > 1 ? 's' : ''}">★</button>`).join('')}</div>
      <input name="name" required placeholder="Your first name" aria-label="Your first name"><input name="title" placeholder="Headline (optional)" aria-label="Headline">
      <textarea name="body" required rows="4" placeholder="What did you put it on? How did it taste?" aria-label="Your review"></textarea>
      <button class="btn" type="submit">Send review</button><small class="muted">We read every review before it goes up, and we post the good, the bad and the salty.</small></form>
    <div class="rv-list">${list.map(x => `<article class="rv-item"><div class="stars">${STAR5(x.stars)}</div><h3>${x.title || ''}</h3><p>${x.body}</p><small>${x.name}${x.verified ? ' · Verified buyer' : ''} · ${x.date}</small></article>`).join('')}</div>`;
  after.closest('.wrap').after(sec);
  let stars = 0; const f = $('.rv-form', sec);
  $('.rv-open', sec).onclick = () => { f.hidden = !f.hidden; if (!f.hidden) $('.rv-pick button', f).focus(); };
  $$('.rv-pick button', f).forEach(b => b.onclick = () => { stars = +b.dataset.n; $$('.rv-pick button', f).forEach(x => { x.classList.toggle('on', +x.dataset.n <= stars); x.setAttribute('aria-checked', +x.dataset.n === stars); }); });
  f.onsubmit = ev => { ev.preventDefault(); if (!stars) return toast('Tap the stars to rate it first.'); f.reset(); f.hidden = true; stars = 0; $$('.rv-pick button', f).forEach(x => x.classList.remove('on')); toast('Thank you — we’ll post it once we’ve read it.'); };
  // search engines: product data, with a rating only when one exists
  const ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.line, brand: { '@type': 'Brand', name: 'Sapphire Salt & Spice' },
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: (findBlend(p.slug) ? SIZES[0].price : p.price).toFixed(2), availability: 'https://schema.org/InStock' } };
  if (r) ld.aggregateRating = { '@type': 'AggregateRating', ratingValue: r.avg.toFixed(1), reviewCount: r.n };
  const sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.textContent = JSON.stringify(ld); document.head.appendChild(sc);
  if (location.hash === '#reviews') setTimeout(() => sec.scrollIntoView(), 300);
}

/* ---------- pages ---------- */
const R = {
  home() {
    shelf('salt'); build5();
    $$('.shelf-tabs button').forEach(b => b.onclick = () => { $$('.shelf-tabs button').forEach(x => x.classList.toggle('on', x === b)); shelf(b.dataset.shelf); });
    $('#blends').innerHTML = BLENDS.map(blendCard).join(''); wireCards($('#blends'));
    $('#sets').innerHTML = ['full-table', 'kitchen-set', 'awaken-pepper'].map(s => extraCard(findExtra(s))).join(''); wireExtras($('#sets'));
    $('#packets').innerHTML = `<img src="img/packets-band.jpg" alt="Travel sticks and table packets of all five blends" loading="lazy">`;
    $('#cloud').innerHTML = [...new Map(BLENDS.flatMap(b => b.ingredients.map(i => [i.name, b.color]))).entries()]
      .map(([n, c]) => `<span style="--c:${c}"><i></i>${n}</span>`).join('');
    wireExtras();
  },
  shop() {
    pureSalts();
    $('#blends').innerHTML = BLENDS.filter(b => b.cat === 'blends').map(blendCard).join(''); wireCards($('#blends'));
    $$('#blend-tabs button').forEach(t => t.onclick = () => { $$('#blend-tabs button').forEach(x => x.classList.toggle('on', x === t));
      $$('#blends .card').forEach(c => c.hidden = t.dataset.g !== 'all' && findBlend(c.dataset.slug).group !== t.dataset.g); });
    $('#extras').innerHTML = EXTRAS.map(extraCard).join(''); wireExtras($('#extras'));
    $('#coming').innerHTML = COMING.filter(c => !SEASONINGS.some(x => x.slug === c.slug)).map(comingCard).join(''); wireNotify($('#coming'));
    shelfGrid('seasonings'); shelfGrid('spices'); wireExtras($('#test-kitchen'));
    // the category bar follows the scroll
    const bar = $$('.catbar a'), secs = bar.map(a => $(a.getAttribute('href')));
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) bar.forEach((a, i) => a.classList.toggle('on', secs[i] === en.target)); }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(x => x && io.observe(x));
  },
  product() {
    const slug = new URLSearchParams(location.search).get('p') || 'pure';
    const b = findBlend(slug), e = b ? null : findExtra(slug);
    if (!b && !e) { location.href = 'shop.html'; return; }
    const p = b || e; document.title = `${p.name} — Sapphire Salt & Spice`;
    const root = $('#pdp'); root.style.setProperty('--c', p.color); root.style.setProperty('--tint', p.tint);
    let imgs, sizeHTML = '', ingHTML = '';
    if (b) {
      imgs = [[`img/${b.slug}-pair.jpg`, ''], [`img/${b.slug}-4oz.jpg`, ''], [`img/${b.slug}-16oz.jpg`, ''], [`img/${b.slug}-sticks.jpg`, ''], [`img/${b.slug}-packets.jpg`, ''], [`img/${b.slug}-family.jpg`, ''], ['img/stand-crop.jpg', '']];
      sizeHTML = `<div class="opt-label">Size</div><div class="sizes">${SIZES.map((s, i) => `<button class="size${i ? '' : ' on'}" data-size="${s.id}"><span><b>${s.label}</b><small>${s.note}</small></span><span class="price">${money(s.price)}</span></button>`).join('')}</div>
        <div class="opt-label">Purchase</div><div class="ptype">
          <label class="on"><input type="radio" name="pt" value="once" checked> One-time purchase</label>
          <label><input type="radio" name="pt" value="sub"> Subscribe & save — ships every 2 months <span class="save">Save ${SS.subscribeOff * 100}%</span></label></div>`;
      ingHTML = b.ingredients.map(i => { const g = INGREDIENTS.find(x => x.name === i.name); return `<h4 class="wi"><img src="${g.img}" alt="" loading="lazy"><span><small>${i.title}</small><a href="ingredient.html?i=${g.slug}">${i.name}</a></span></h4><p class="no-ing">${i.desc} <a class="link sm" href="ingredient.html?i=${g.slug}">Learn more</a></p>`; }).join('') + `<p><a class="link" href="ingredients.html">All ingredients</a></p>`;
    } else {
      imgs = e.kind === 'pepper' ? [['img/awaken-pair.jpg', ''], ['img/awaken-6oz.jpg', ''], ['img/awaken-family.jpg', ''], ['img/spices-crop.jpg', '']]
        : e.kind === 'stand' ? [['img/stand-crop.jpg', ''], ['img/hero-stand.jpg', ''], ['img/stand-rear.jpg', ''], ['img/set-4oz.jpg', ''], ['img/set-16oz.jpg', '']]
        : e.kind === 'gift' ? [['img/giftbox.jpg', ''], ['img/set-4oz.jpg', ''], ['img/fan.jpg', '']]
        : e.kind === 'packets' ? [['img/fan.jpg', ''], ['img/packets-band.jpg', ''], ['img/pure-family.jpg', ''], ['img/caddy.jpg', '']]
        : e.kind === 'kindness' ? [['img/kindness-card.jpg', ''], ['img/fan.jpg', '']]
        : e.kind === 'giftcard' ? [['img/giftcard.jpg', '']]
        : e.kind === 'test' ? [['img/hydrate-sticks.jpg', ''], ['img/packets-band.jpg', '']]
        : e.kind === 'custom' ? [['engraved', ''], ['img/hero-stand.jpg', ''], ['img/lid-etch.jpg', ''], ['img/stand-rear.jpg', '']]
        : e.kind === 'subgift' ? [['img/year-of-salt.jpg', ''], ['img/seasonings-crop.jpg', ''], ['img/spices-crop.jpg', ''], ['img/set-4oz.jpg', '']] : e.kind === 'set' ? [['img/set-4oz.jpg', ''], ['img/stand-crop.jpg', '']] : e.kind === 'set16' ? [['img/set-16oz.jpg', ''], ['img/stand-crop.jpg', '']] : [['packets', '']];
    }
    if (e && e.slug === 'discovery') sizeHTML = `<div class="opt-label">Pick your five <span class="pick-n">5 of 5</span></div>
        <div class="tabs-mini"><button class="on" data-dt="salt">Salts</button><button data-dt="seasonings">Seasonings <em>Soon</em></button><button data-dt="spices">Spices <em>Soon</em></button></div>
        <div class="picker" data-dt="salt">${BLENDS.map(x => `<div class="pk" style="--c:${x.color}"><i></i><span>${x.name}</span>
          <div class="qty sm"><button data-pk="${x.slug}" data-d="-1">−</button><b data-pkv="${x.slug}">1</b><button data-pk="${x.slug}" data-d="1">+</button></div></div>`).join('')}</div>
        ${['seasonings', 'spices'].map(k => `<div class="picker" data-dt="${k}" hidden><p style="color:var(--muted);font-size:14px;margin:0 0 10px">${k === 'spices' ? 'A Spices Discovery — Awaken Pepper, pink pepper, pepper medley, chipotle, cayenne and more' : 'A Seasonings Discovery — steak, garden herb, smoked, chili lime, truffle and more'} — is coming. Proposed: any 5 for $${DISCOVERY[k].price}.</p>
          <div class="pk-soon">${DISCOVERY[k].items.map(x => `<span style="--c:${x.color}"><i></i>${x.name}</span>`).join('')}</div>
          <form class="notify"><input type="email" required placeholder="Email for first word" aria-label="Email"><button class="btn">Notify me</button></form></div>`).join('')}
        <p class="pick-note">Three packets of each pick · doubles welcome · ships free on its own</p>`;
    if (e && e.slug === 'gift-box') sizeHTML = `<div class="opt-label">Choose three blends</div><div class="gift-picks">${[0, 1, 2].map(i => `<select data-gp="${i}">${[...BLENDS, findExtra('awaken-pepper')].map((x, j) => `<option value="${x.slug}"${j === [0, 1, 4][i] ? ' selected' : ''}>${x.name}</option>`).join('')}</select>`).join('')}</div>
        <div class="opt-label">Gift note (free)</div><textarea class="gift-note" rows="3" maxlength="200" placeholder="Happy birthday — salt your eggs with this one."></textarea>`;
    if (e && e.kind === 'test') sizeHTML = `<div class="tk-now"><span class="eyebrow">Now testing</span><b>${e.now}</b><span>${e.nowLine}</span></div>
        <ol class="tk-steps"><li>We send three small-batch sticks, with your order or on their own.</li><li>Three days later, three quick questions by email.</li><li>Your answers decide if it launches. Testers hear first.</li></ol>`;
    if (e && e.kind === 'giftcard') sizeHTML = `<div class="opt-label">Amount</div><div class="chips gc-amt">${[25, 50, 100, 150].map(a => `<button class="chip${a === 50 ? ' on' : ''}" data-amt="${a}">$${a}</button>`).join('')}<label class="chip other">$<input type="number" min="10" max="500" placeholder="Other" aria-label="Other amount"></label></div>
        <div class="opt-label">Send to</div><div class="gform"><input class="g-name" placeholder="Their name"><input class="g-email" type="email" placeholder="Their email"><label>Send on <input class="g-date" type="date"></label><textarea class="g-note" rows="3" maxlength="200" placeholder="Your note"></textarea></div>`;
    if (e && e.kind === 'kindness') sizeHTML = `<div class="opt-label">Send it</div><div class="seg2"><label class="on"><input type="radio" name="to" value="them" checked> Mail it to them</label><label><input type="radio" name="to" value="me"> Send it to me</label></div>
        <div class="gform k-them"><input class="g-name" placeholder="Their name"><input class="g-addr" placeholder="Their address"></div>
        <div class="opt-label">Add a gift balance inside <small>(optional)</small></div><div class="chips k-bal">${[0, 25, 50].map(a => `<button class="chip${a ? '' : ' on'}" data-bal="${a}">${a ? '+ $' + a : 'None'}</button>`).join('')}</div>
        <div class="opt-label">Your words <small>(we hand-letter them onto the card)</small></div>
        <div class="k-ideas">${['Thinking of you today.', 'Thank you for every dinner and every laugh.', 'Welcome to the neighborhood.', 'Congratulations — so proud of you.', 'Just because you matter.'].map(t => `<button type="button" class="chip">${t}</button>`).join('')}</div>
        <textarea class="gift-note g-note" rows="4" maxlength="280" placeholder="Write it the way you’d say it."></textarea>
        <div class="gform"><input class="g-from" placeholder="Sign it from (your name)"></div>
        <div class="k-code"><b>On the back, in small print</b><span>Under our logo: 15% off their first jar with <code class="k-c">KIND-YOU</code></span><small>Your note stays on the front by itself. When they use the code, you get $5 toward your next order.</small></div>`;
    if (e && e.kind === 'subgift') sizeHTML = `<div class="opt-label">How long</div><div class="sizes">${e.plans.map((pl, i) => `<button class="size${pl.m === 12 ? ' on' : ''}" data-plan="${pl.m}"><span><b>${pl.m} months</b><small>${money(pl.price / pl.m)}/month · shipping included</small></span><span class="price">${money(pl.price)}</span></button>`).join('')}</div>
        <div class="opt-label">For</div><div class="gform"><input class="g-name" placeholder="Their name"><label>First box ships <select class="g-start">${['December', 'January', 'February', 'March'].map(m => `<option>${m}</option>`).join('')}</select></label><textarea class="g-note" rows="2" maxlength="200" placeholder="Your note on the first box"></textarea></div>`;
    const railStart = ['The Rose Family', RAILS[1][1], RAILS[2][1]];
    if (e && e.kind === 'custom') sizeHTML = `<div class="opt-label">Your engraving <small>(each rail: your words, ours, or blank · up to 28 characters)</small></div>
        <div class="rails">${RAILS.map(([n, d], i) => `<div class="rail" data-r="${i}"><span>${n}</span><div class="seg3">${[['own', 'Your words'], ['ours', 'Ours'], ['blank', 'Blank']].map(([v, t]) => `<button type="button" data-m="${v}" class="${(i ? 'ours' : 'own') === v ? 'on' : ''}">${t}</button>`).join('')}</div>
          <input class="g-engr" maxlength="28" value="${railStart[i]}" aria-label="${n} engraving"${i ? ' disabled' : ''}></div>`).join('')}
          <label class="ck2"><input type="checkbox" class="g-logo"> Put our logo on the top sign instead — we’ll email a proof first</label></div>`;
    const railText = () => $$('.rail', root).map((r, i) => { const m = $('.seg3 .on', r).dataset.m; return m === 'blank' ? '' : m === 'ours' ? RAILS[i][1] : $('input', r).value; });
    const mainImg = ([src, cls]) => src === 'engraved' ? engraved($('.rail', root) ? railText() : railStart, 'The walnut display stand, engraved').replace('class="engr"', 'class="engr big"') : src === 'packets' ? packetsSVG(5, 220) : `<img class="${cls}" src="${src}" alt="${p.name}">`;
    root.innerHTML = `
      <div class="gallery"><div class="main">${mainImg(imgs[0])}</div>
        ${imgs.length > 1 ? `<div class="thumbs">${imgs.map((im, i) => `<button class="${i ? '' : 'on'}" data-i="${i}"><img class="${im[1]}" src="${im[0] === 'engraved' ? 'img/stand-crop.jpg' : im[0]}" alt=""></button>`).join('')}</div>` : ''}</div>
      <div class="info"><div class="crumbs"><a href="shop.html">Shop</a> / ${p.name}</div>
        <h1>${p.name}</h1><div class="subt">${p.sub}</div><p class="line">${p.line}</p><p style="color:var(--muted)">${p.about}</p>
        ${b ? `<div class="swatches">${BLENDS.map(x => `<a href="product.html?p=${x.slug}" title="${x.name}" style="--sw:${x.color}" class="${x.slug === b.slug ? 'on' : ''}"></a>`).join('')}</div>` : ''}
        ${sizeHTML}
        ${e && (e.kind === 'stand' || e.kind === 'custom') ? `<a class="partner-note" href="wholesale.html#signin">Shop, café or studio? <b>Partner pricing on displays</b> is available to retail and wholesale accounts →</a>` : ''}
        ${e && (e.slug === 'discovery' || e.slug === 'kindness') ? `<div class="vs"><a class="${e.slug === 'discovery' ? 'on' : ''}" href="product.html?p=discovery"><b>Discovery · $15</b><span>For you — pick 5 blends, 15 packets</span></a><a class="${e.slug === 'kindness' ? 'on' : ''}" href="product.html?p=kindness"><b>Kindness Card · $5</b><span>For someone else — mailed, 5 packets + your note</span></a></div>` : ''}
        <div class="buyrow"><div class="qty"><button data-q="-1">−</button><span>1</span><button data-q="1">+</button></div>
          <button class="btn add-main">Add to cart — <span class="pp">${money(b ? SIZES[0].price : e.price)}</span></button></div>
        <div class="why"><div>${ICON.check} Tastes like the salt you know</div><div>${ICON.heart} Love it or your money back</div>
          <div>${ICON.utah} Made in Park City, Utah</div><div>${ICON.truck} ${e && e.digital ? 'Delivered by email' : e && (e.packet || e.inclShip) ? '<b>Ships free</b> — on us' : `Free shipping over $${SS.freeShip}`}</div></div>
        <div class="acc">
          ${b ? `<details open><summary>What’s inside</summary><div class="in">${ingHTML}</div></details>
          <details><summary>How to use</summary><div class="in"><p>Use it exactly like regular salt — same pinch, same shake.</p><ul>${b.use.map(u => `<li>${u}</li>`).join('')}</ul></div></details>` : ''}
          <details><summary>Shipping & returns</summary><div class="in"><p>Orders ship from Park City and usually arrive in about 7 business days. Free shipping on orders over $${SS.freeShip}; ${money(SS.flatShip)} below that. Subscriptions ship free, and so do Discovery and Kindness packs on their own.</p><p>If you’re not in love with it, reach out and we’ll refund you in full. Anything arrive damaged? Send us a photo and we’ll make it right.</p></div></details>
          ${b ? `<details><summary>Good to know</summary><div class="in"><p>This salt does not supply iodide, a necessary nutrient. Store dry with the lid closed. Sapphire Salt is a culinary product and is not intended to diagnose, treat, cure or prevent any disease.</p></div></details>` : ''}
        </div></div>`;
    // gallery
    $$('.thumbs button', root).forEach(t => t.onclick = () => { $$('.thumbs button', root).forEach(x => x.classList.remove('on')); t.classList.add('on'); $('.gallery .main', root).innerHTML = mainImg(imgs[t.dataset.i]); });
    // options
    let size = SIZES[0], qty = 1, sub = false;
    const unit = () => (b ? size.price : e.price) * (sub ? 1 - SS.subscribeOff : 1);
    const upd = () => { $('.pp', root).textContent = money(unit() * qty); $('.qty span', root).textContent = qty; };
    $$('.size', root).forEach(s => s.onclick = () => { $$('.size', root).forEach(x => x.classList.remove('on')); s.classList.add('on'); size = SIZES.find(z => z.id === s.dataset.size); upd();
      if (b) { const want = size.jar ? 'pair' : size.pic.replace('-card', ''), t = $$('.thumbs button', root).find(x => $('img', x).getAttribute('src') === `img/${b.slug}-${want}.jpg`); if (t) t.click(); } });
    const want = new URLSearchParams(location.search).get('size'); const sb = want && $(`.size[data-size="${want}"]`, root); if (sb) sb.click();   // QR: /p/pure-16 opens on 16 oz
    $$('.ptype input', root).forEach(r => r.onchange = () => { $$('.ptype label', root).forEach(l => l.classList.toggle('on', l.contains(r) && r.checked)); sub = r.value === 'sub'; upd(); });
    $$('[data-q]', root).forEach(q => q.onclick = () => { qty = Math.max(1, qty + +q.dataset.q); upd(); });
    // Discovery: pick five (doubles allowed)
    const picks = Object.fromEntries(BLENDS.map(x => [x.slug, 1]));
    const pickTotal = () => Object.values(picks).reduce((a, v) => a + v, 0);
    $$('[data-pk]', root).forEach(btn => btn.onclick = () => {
      const s = btn.dataset.pk, d = +btn.dataset.d;
      if (d > 0 && pickTotal() >= 5) return toast('Five picks max — take one away first.');
      picks[s] = Math.max(0, picks[s] + d); $(`[data-pkv="${s}"]`, root).textContent = picks[s];
      $('.pick-n', root).textContent = `${pickTotal()} of 5`; $('.add-main', root).disabled = pickTotal() !== 5;
    });
    $$('.tabs-mini button', root).forEach(tb => tb.onclick = () => { $$('.tabs-mini button', root).forEach(x => x.classList.toggle('on', x === tb)); $$('.picker', root).forEach(pk => pk.hidden = pk.dataset.dt !== tb.dataset.dt); });
    wireNotify(root);
    // gift builders: live price
    let gAmt = 50, kBal = 0, plan = e && e.plans ? e.plans[2] : null;
    const setPrice = v => { e.price = v; upd(); };   // upd() reads e.price, so qty changes keep the gift price
    $$('[data-amt]', root).forEach(c => c.onclick = () => { $$('.gc-amt .chip', root).forEach(x => x.classList.remove('on')); c.classList.add('on'); gAmt = +c.dataset.amt; $('.other input', root).value = ''; setPrice(gAmt); });
    const oth = $('.other input', root); if (oth) oth.oninput = () => { $$('.gc-amt .chip', root).forEach(x => x.classList.toggle('on', x.classList.contains('other'))); gAmt = Math.max(10, +oth.value || 0); setPrice(gAmt); };
    $$('[data-bal]', root).forEach(c => c.onclick = () => { $$('.k-bal .chip', root).forEach(x => x.classList.remove('on')); c.classList.add('on'); kBal = +c.dataset.bal; setPrice(5 + kBal); });
    $$('input[name=to]', root).forEach(r => r.onchange = () => { $$('.seg2 label', root).forEach(l => l.classList.toggle('on', l.contains(r) && r.checked)); $('.k-them', root).hidden = r.value !== 'them'; });
    $$('[data-plan]', root).forEach(b => b.onclick = () => { $$('[data-plan]', root).forEach(x => x.classList.remove('on')); b.classList.add('on'); plan = e.plans.find(p => p.m === +b.dataset.plan); setPrice(plan.price); });
    if (e && e.kind === 'giftcard') setPrice(50);
    // engraving: three rails, each your words, ours or blank; the preview follows
    const showRails = () => { const t = railText(); $$('.engr em', root).forEach((m, i) => { m.textContent = t[i]; m.hidden = !t[i]; }); };
    $$('.rail', root).forEach(r => {
      $$('.seg3 button', r).forEach(bt => bt.onclick = () => { $$('.seg3 button', r).forEach(x => x.classList.toggle('on', x === bt)); $('input', r).disabled = bt.dataset.m !== 'own'; if (bt.dataset.m === 'own') $('input', r).focus(); showRails(); });
      $('input', r).oninput = showRails;
    });
    // kindness: idea chips fill the note; the code carries their name
    $$('.k-ideas .chip', root).forEach(c => c.onclick = () => { const n = $('.g-note', root); n.value = c.textContent; n.focus(); });
    const gf = $('.g-from', root); if (gf) gf.oninput = () => { $('.k-c', root).textContent = 'KIND-' + ((gf.value.trim().split(/\s+/)[0] || 'you').replace(/[^a-z]/gi, '').toUpperCase().slice(0, 10) || 'YOU'); };
    if (e && e.kind === 'subgift') setPrice(plan.price);
    $('.add-main', root).onclick = () => {
      let variant = e ? e.sub : '', key = e ? e.slug : '';
      const nm = ($('.g-name', root) || {}).value || '', note = ($('.g-note', root) || {}).value || '';
      if (e && e.kind === 'custom') { const t = railText(), logo = $('.g-logo', root).checked; addToCart({ key: 'engr-' + Date.now(), name: e.name, variant: RAILS.map(([n], i) => `${n}: ${i === 0 && logo ? 'your logo (proof first)' : t[i] ? '“' + t[i] + '”' : 'blank'}`).join(' · '), price: e.price, qty, img: extraThumb(e) }); return; }
      if (e && e.kind === 'giftcard') { const d = ($('.g-date', root) || {}).value; addToCart({ key: 'gc-' + Date.now(), name: e.name, variant: `${money(gAmt)}${nm ? ' · to ' + nm : ''}${d ? ' · ' + d : ' · send now'}`, price: gAmt, qty, img: extraThumb(e), digital: true }); return; }
      if (e && e.kind === 'kindness') { const them = $('input[name=to]:checked', root).value === 'them'; addToCart({ key: 'kind-' + Date.now(), name: e.name, variant: `${them ? 'Mailed' + (nm ? ' to ' + nm : '') : 'To me'}${kBal ? ' · + ' + money(kBal) + ' balance' : ''}${note ? ' · your words' : ''} · code ${$('.k-c', root).textContent}`, price: 5 + kBal, qty, img: extraThumb(e), packet: true }); return; }
      if (e && e.kind === 'subgift') { addToCart({ key: 'yos-' + Date.now(), name: e.name, variant: `${plan.m} months${nm ? ' · for ' + nm : ''} · starts ${$('.g-start', root).value}`, price: plan.price, qty, img: extraThumb(e), inclShip: true }); return; }
      if (e && e.slug === 'discovery') { const ch = BLENDS.filter(x => picks[x.slug]).map(x => `${x.short}${picks[x.slug] > 1 ? ' ×' + picks[x.slug] : ''}`); variant = ch.join(', '); key = 'discovery-' + ch.join('-'); }
      if (e && e.slug === 'gift-box') { const ch = $$('[data-gp]', root).map(s => s.options[s.selectedIndex].text.replace(' Salt', '')); variant = ch.join(', ') + ($('.gift-note', root).value.trim() ? ' · with note' : ''); key = 'gift-' + ch.join('-') + Date.now(); }
      addToCart(b
        ? { key: `${b.slug}-${size.id}-${sub ? 'sub' : 'once'}`, name: b.name, variant: `${size.label} ${size.note.toLowerCase()}${sub ? ' · every 2 months' : ''}`, price: unit(), qty, img: `img/${b.slug}-card.jpg` }
        : { key, name: e.name, variant, price: e.price, qty, img: extraThumb(e), packet: !!e.packet });
    };
    reviews(p, root);
    // related
    $('#related').innerHTML = BLENDS.filter(x => x.slug !== slug).slice(0, 4).map(blendCard).join(''); wireCards($('#related'));
  },
  ingredients() {
    const ingUrl = i => `ingredient.html?i=${i.slug}`;
    $('#sources').innerHTML = SALT_SOURCES.map(s => `<a class="src${s.now ? ' now' : ''}" href="${s.now ? ingUrl(s) : 'ingredient.html?i=' + s.slug}">
      ${s.img ? `<figure class="source-material"><img src="${s.img}" alt="${s.imgAlt}" loading="lazy"><figcaption>${s.imgNote}</figcaption></figure>` : ''}<span class="badge">${s.status}</span><h3>${s.name}</h3>${s.place ? `<small>${s.place}</small>` : ''}<p>${s.line}</p><em>${s.now ? 'Deep dive' : 'Why we’re looking'} →</em></a>`).join('');
    const idx = $('#ing-index');   // the hero's empty stone carries the index: the page's whole point, up front
    if (idx) idx.innerHTML = [...INGREDIENTS].sort((x, y) => x.name.localeCompare(y.name)).map(i => `<a href="${ingUrl(i)}" style="--c:${findBlend(i.blends[i.blends.length - 1]).color}"><i></i>${i.name}<small>${i.kind}</small></a>`).join('');
    const kinds = ['All', ...new Set(INGREDIENTS.map(i => i.kind))];
    $('#ing-filter').innerHTML = kinds.map((k, n) => `<button class="${n ? '' : 'on'}" data-k="${k}">${k}</button>`).join('');
    const card = i => `<a class="ing-card" href="${ingUrl(i)}" data-k="${i.kind}"><span class="ing-ph"><img src="${i.img}" alt="${i.name}" loading="lazy"></span><span class="kind">${i.kind}</span><h3>${i.name}</h3><small>${i.title}</small><p>${i.what || i.desc}</p>
      <div class="bchips">${i.blends.map(s => { const b = findBlend(s); return `<i style="--c:${b.color}">${b.short}</i>`; }).join('')}</div><em>Deep dive →</em></a>`;
    $('#ing-grid').innerHTML = INGREDIENTS.map(card).join('');
    $$('#ing-filter button').forEach(btn => btn.onclick = () => {
      $$('#ing-filter button').forEach(x => x.classList.toggle('on', x === btn));
      $$('.ing-card').forEach(c => c.hidden = btn.dataset.k !== 'All' && c.dataset.k !== btn.dataset.k);
    });
    $('#matrix').innerHTML = `<thead><tr><th>Ingredient</th>${BLENDS.map(b => `<th><a href="product.html?p=${b.slug}" style="--c:${b.color}">${b.short}</a></th>`).join('')}</tr></thead>
      <tbody>${INGREDIENTS.map(i => `<tr><td><a class="mx-ing" href="${ingUrl(i)}"><img src="${i.img}" alt="" loading="lazy">${i.name}</a></td>${BLENDS.map(b => `<td>${i.blends.includes(b.slug) ? `<i style="--c:${b.color}"></i>` : ''}</td>`).join('')}</tr>`).join('')}</tbody>`;
  },
  ingredient() {
    const slug = new URLSearchParams(location.search).get('i') || 'australian-sea-salt';
    const src = SALT_SOURCES.find(s => s.slug === slug && !s.now);
    const i = findIng(slug);
    const root = $('#ing');
    if (!i && !src) { location.href = 'ingredients.html'; return; }
    if (src) {   // a salt we're exploring
      document.title = `${src.name} — Sapphire Salt & Spice`;
      root.innerHTML = `<section class="ing-hero"><div class="wrap"><div class="crumbs"><a href="ingredients.html">Ingredients</a> / ${src.name}</div>
        <span class="eyebrow">${src.status} · ${src.place}</span><h1>${src.name}</h1><p class="lede">${src.line}</p>${src.img ? `<figure class="source-material detail"><img src="${src.img}" alt="${src.imgAlt}"><figcaption>${src.imgNote}</figcaption></figure>` : ''}
        <div class="ing-facts"><div><b>Why we’re looking</b><p>${slug === 'great-salt-lake' ? 'We’re a Utah company, blending an hour from the lake. A local salt would let every jar carry a little of home.' : 'Many people love its mineral flavour and colour, and it’s a natural match for a finishing-salt blend.'}</p></div>
          <div><b>What has to be true first</b><p>The same standard as our sea salt: a lab report for every lot, clean heavy-metal results and a taste that still reads as salt.</p></div>
          <div><b>Want first word?</b><form class="notify"><input type="email" required placeholder="Your email" aria-label="Email"><button class="btn">Notify me</button></form></div></div>
        <a class="link" href="ingredients.html">All ingredients</a></div></section>`;
      wireNotify(root); return;
    }
    document.title = `${i.name} — Sapphire Salt & Spice ingredients`;
    const k = INGREDIENTS.indexOf(i), prev = INGREDIENTS[(k - 1 + INGREDIENTS.length) % INGREDIENTS.length], next = INGREDIENTS[(k + 1) % INGREDIENTS.length];
    const blends = i.blends.map(findBlend), main = blends[0];
    const isSalt = i.slug === 'australian-sea-salt';
    root.style.setProperty('--c', main.color);
    root.innerHTML = `<section class="ing-hero"><div class="wrap ing-hero-grid"><div>
        <div class="crumbs"><a href="ingredients.html">Ingredients</a> / ${i.name}</div>
        <span class="eyebrow">${i.kind} · ${i.title}</span><h1>${i.name}</h1>
        <p class="lede">${i.desc}</p>
        <div class="bchips big">${blends.map(b => `<a href="product.html?p=${b.slug}" style="--c:${b.color}">${b.name}</a>`).join('')}</div></div>
        <figure class="ing-photo"><img src="${i.img}" alt="${i.name}"><figcaption>${i.name}, on its own</figcaption></figure></div></section>
      <section style="padding-top:20px"><div class="wrap"><div class="ing-facts">
        <div><b>What it is</b><p>${i.what || i.desc}</p></div>
        <div><b>Where it comes from</b><p>${(i.from || 'Ryan to confirm.').replace(/Ryan to confirm\.?/, '<span class="draft">Ryan to confirm</span>')}</p></div>
        <div><b>Why it’s in the jar</b><p>${i.desc}</p></div>
        ${i.how ? `<div class="wide"><b>How we keep it pure</b><ol class="mini">${i.how.map(h => `<li>${h.replace(/\[(.*?)\]/, '<span class="draft">$1</span>')}</li>`).join('')}</ol></div>` : ''}
        ${isSalt ? `<div class="wide"><div class="video-ph wide-sm" role="img" aria-label="Video coming soon"><img src="img/pure-pair.jpg" alt=""><div class="vp-in"><span class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span><b>From the coast to the jar</b><small>Video coming soon</small></div></div></div>` : ''}
        <div class="wide"><b>How much is in a serving</b><p>We’ll publish exact amounts per serving here once the updated Nutrition Facts panels are final. <span class="draft">Pending label update</span></p></div>
      </div></div></section>
      <section style="padding-top:0"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Find it in</span><h2 style="margin-top:12px">${blends.length === 5 ? 'Every blend' : blends.length > 1 ? blends.length + ' of our blends' : 'One of our blends'}</h2></div><p style="color:var(--muted);margin:0;max-width:380px">${i.name} is in ${blends.map(b => b.name).join(', ').replace(/, ([^,]*)$/, ' and $1')}.</p></div>
        <div class="grid5" id="ing-blends"></div>
        <nav class="ing-nav"><a href="ingredient.html?i=${prev.slug}">← ${prev.name}</a><a href="ingredients.html">All ingredients</a><a href="ingredient.html?i=${next.slug}">${next.name} →</a></nav></div></section>`;
    $('#ing-blends').innerHTML = blends.map(blendCard).join(''); wireCards($('#ing-blends'));
  },
  wholesale() {
    // 360° stand viewer: drop 36 frames in img/360/01.jpg … 36.jpg and set SS.frames360 = 36
    const v = $('#view360'), N = SS.frames360 || 0;
    if (v && N) {
      let f = 1, x0 = null;
      v.innerHTML = `<img class="frame360" src="img/360/01.jpg" alt="The walnut display stand, drag to turn">`;
      const img = $('img', v), show = () => img.src = `img/360/${String(f).padStart(2, '0')}.jpg`;
      v.onpointerdown = e => { x0 = e.clientX; v.setPointerCapture(e.pointerId); };
      v.onpointermove = e => { if (x0 === null) return; const d = Math.round((e.clientX - x0) / 12); if (d) { f = ((f - 1 - d) % N + N) % N + 1; x0 = e.clientX; show(); } };
      v.onpointerup = () => x0 = null;
    }
    const KEY = 'ss_trade';
    const who = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
    const show = () => {
      const s = document.createElement('script'); s.src = 'js/trade.js?v=6';
      s.onload = () => { $('#gate').hidden = true; const tr = $('#trade'); tr.hidden = false; renderTrade(tr, who()); };
      document.body.appendChild(s);
    };
    $('#signin-form').onsubmit = ev => { ev.preventDefault(); try { localStorage.setItem(KEY, ev.target.email.value); } catch (e) {} show(); };
    if (who()) show();
    function renderTrade(tr, email) {
      const T = window.TRADE, pm = v => T.demo ? 'On approval' : money(v), cell = v => typeof v === 'number' ? (T.demo ? '—' : money(v)) : (v || '—');
      const skus = BLENDS.flatMap(b => JARS.map(s => ({ id: `${b.slug}-${s.id}`, name: `${b.name} · ${s.label}`, price: T.jar[s.id] })));
      tr.innerHTML = `<div class="trade-head"><div><span class="eyebrow">Retailer account</span><h2 style="margin:10px 0 4px">Welcome back</h2>
          <p style="color:var(--muted);margin:0">Signed in as ${email.replace(/</g, '')} · <a class="link" href="#" id="signout">Sign out</a></p></div>
        ${T.demo ? '<p class="draft" style="display:block;margin:0 0 16px">Public preview — partner prices are hidden. Approved retailers see real pricing here.</p>' : ''}<div class="kitcard"><span class="eyebrow">Starter Kit</span><b>${pm(T.kit.price)}</b><span>Retail value ${money(T.kit.retail)} · stand included</span>
          <a class="btn gold" href="mailto:${SS.email}?subject=${encodeURIComponent('Starter kit order')}">Order the starter kit</a></div></div>
        <h3 style="margin:34px 0 14px">Line sheet</h3>
        <table><tr><th>Item</th><th>Wholesale</th><th>Retail</th></tr>${T.lines.map(([n, w, r]) => `<tr><td>${n}</td><td>${cell(w)}</td><td>${cell(r)}</td></tr>`).join('')}</table>
        <h3 style="margin:34px 0 6px">Displays & stands</h3><p style="color:var(--muted);font-size:14px;margin:0 0 14px">Partner pricing, set from day one — not available to the public. Retail value is what the same display is worth on the shelf.</p>
        <table class="disp"><tr><th>Display</th><th>Partner price</th><th>Retail value</th><th>You save</th></tr>${(T.displays || []).map(([n, w, r, note]) => `<tr><td>${n}<small>${note}</small></td><td><b>${pm(w)}</b></td><td>${money(r)}</td><td class="save">${T.demo ? '—' : Math.round((1 - w / r) * 100) + '%'}</td></tr>`).join('')}</table>
        <p style="color:var(--muted);font-size:14px">${T.minimum}</p>
        <h3 style="margin:34px 0 14px">Quick reorder</h3>
        <form id="reorder"><div class="reorder">${skus.map(k => `<label><span>${k.name}</span><input type="number" min="0" step="1" value="0" name="${k.id}" data-p="${k.price}" inputmode="numeric"></label>`).join('')}</div>
          <div class="reorder-foot"><span>Order total <b id="rtot">$0</b></span><button class="btn">Send reorder</button></div></form>`;
      $('#signout').onclick = ev => { ev.preventDefault(); try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); };
      const f = $('#reorder'), tot = () => $$('input', f).reduce((a, i) => a + (+i.value || 0) * +i.dataset.p, 0);
      f.oninput = () => $('#rtot').textContent = money(tot());
      f.onsubmit = ev => { ev.preventDefault();
        const lines = $$('input', f).filter(i => +i.value > 0).map(i => `${i.value} × ${skus.find(k => k.id === i.name).name}`);
        if (!lines.length) return toast('Add a quantity first.');
        location.href = `mailto:${SS.email}?subject=${encodeURIComponent('Reorder from ' + email)}&body=${encodeURIComponent(lines.join('\n') + '\n\nTotal: ' + money(tot()))}`; };
    }
  },
  gifts() {
    $('#gift-grid').innerHTML = ['gift-box', 'year-of-salt', 'gift-card', 'kindness', 'engraved-display', 'display-collection', 'full-table', 'kitchen-set', 'discovery'].map(s => extraCard(findExtra(s))).join('');
    wireExtras($('#gift-grid'));
  },
  checkout() {
    if (!$('.toast')) document.body.insertAdjacentHTML('beforeend', '<div class="toast"></div>');
    const st = { code: null, method: 'std', pay: 'card' };
    const root = $('#co'), q = s => $(s, root);
    if (!cart.length) { root.innerHTML = `<div class="co-empty"><h1>Your cart is empty</h1><p>Pick a jar or try five for $15.</p><a class="btn" href="shop.html">Shop the blends</a></div>`; return; }
    const STATES = 'AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'.split(' ');
    const sums = () => {
      const sub = cart.reduce((a, i) => a + i.qty * i.price, 0);
      const c = st.code && SS.codes[st.code]; let disc = 0;
      if (c && c.pct && !c.only) disc = sub * c.pct / 100;
      if (c && c.pct && c.only) disc = cart.filter(i => c.only.some(o => i.key.startsWith(o))).reduce((a, i) => a + i.qty * i.price, 0) * c.pct / 100;
      if (c && c.off && sub >= (c.min || 0)) disc = c.off;
      const after = sub - disc;
      const std = (c && c.freeShip) ? 0 : (after >= SS.freeShip || cart.every(i => i.packet) || (cart.some(i => /-sub$/.test(i.key)) && after >= SS.subShipMin)) ? 0 : SS.flatShip;
      const ship = st.method === 'pickup' ? 0 : st.method === 'exp' ? SS.expShip : std;
      return { sub, disc, ship, std, total: after + ship };
    };
    const lines = () => cart.map(i => `<div class="co-ln"><span class="th"><img src="${i.img}" alt=""><b>${i.qty}</b></span><div><b>${i.name}</b><small>${i.variant}</small></div><span>${money(i.price * i.qty)}</span></div>`).join('');
    root.innerHTML = `
      <section class="co-main">
        <div class="express"><p>Express checkout</p><div class="xbtns">
          <button class="x apple" data-x="apple"><span class="ap"></span> Pay</button><button class="x shop" data-x="shop">shop<em>Pay</em></button>
          <button class="x gpay" data-x="google"><b>G</b> Pay</button><button class="x paypal" data-x="paypal"><i>Pay</i><i>Pal</i></button></div>
          <div class="or"><span>OR</span></div></div>
        <form id="coform" novalidate>
          <h2>Contact</h2>
          <label class="fl"><input name="email" type="email" required placeholder=" " autocomplete="email"><span>Email</span></label>
          <label class="ck"><input type="checkbox" name="news" checked> Email me with news and offers</label>
          <h2>Delivery</h2>
          <div class="seg"><label class="on"><input type="radio" name="dl" value="ship" checked> Ship</label><label><input type="radio" name="dl" value="pickup"> Pick up in Park City</label></div>
          <div class="addr">
            <label class="fl"><select name="country"><option>United States</option></select><span>Country/Region</span></label>
            <div class="two"><label class="fl"><input name="first" required placeholder=" " autocomplete="given-name"><span>First name</span></label><label class="fl"><input name="last" required placeholder=" " autocomplete="family-name"><span>Last name</span></label></div>
            <label class="fl"><input name="address" required placeholder=" " autocomplete="address-line1"><span>Address</span></label>
            <label class="fl"><input name="apt" placeholder=" " autocomplete="address-line2"><span>Apartment, suite, etc. (optional)</span></label>
            <div class="three"><label class="fl"><input name="city" required placeholder=" " autocomplete="address-level2"><span>City</span></label>
              <label class="fl"><select name="state" required><option value="">—</option>${STATES.map(s => `<option${s === 'UT' ? ' selected' : ''}>${s}</option>`).join('')}</select><span>State</span></label>
              <label class="fl"><input name="zip" required placeholder=" " inputmode="numeric" autocomplete="postal-code"><span>ZIP code</span></label></div>
            <label class="fl"><input name="phone" type="tel" placeholder=" " autocomplete="tel"><span>Phone (optional)</span></label>
          </div>
          <div class="pickup" hidden><p><b>Sapphire Salt</b><br>875 Iron Horse Dr. Suite A, Park City, UT 84098<br><small>Usually ready in 24 hours · Free</small></p></div>
          <h2 class="shiph">Shipping method</h2><div class="methods"></div>
          <h2>Payment</h2><p class="sec">All transactions are secure and encrypted.</p>
          <div class="pays">
            <label class="pay on"><input type="radio" name="pay" value="card" checked><span>Credit card</span><em class="cards"><i>VISA</i><i>MC</i><i>AMEX</i><i>DISC</i></em></label>
            <div class="cardbox"><div class="cf">Card number <small>secure field</small></div><div class="two"><div class="cf">Expiration (MM / YY)</div><div class="cf">Security code</div></div><div class="cf">Name on card</div>
              <p class="note">Card fields are Shopify’s secure, hosted inputs at launch — this demo doesn’t take card numbers.</p></div>
            <label class="pay"><input type="radio" name="pay" value="shop"><span>Shop Pay</span><em class="spay">shop<b>Pay</b></em></label>
            <label class="pay"><input type="radio" name="pay" value="paypal"><span>PayPal</span><em class="pp">PayPal</em></label>
          </div>
          <button class="btn block paynow" type="submit">Pay now</button>
          <p class="legal">By placing your order you agree to our refund policy: love it, or it’s free.</p>
        </form>
      </section>
      <aside class="co-side"><button class="co-toggle" type="button">Order summary <b class="tt"></b></button>
        <div class="co-sum">${lines()}
          <form class="code"><input name="code" placeholder="Discount code or gift card" autocomplete="off" aria-label="Discount code"><button class="btn ghost">Apply</button></form>
          <div class="code-msg"></div>
          <div class="tots"></div></div></aside>`;
    const draw = () => {
      const s = sums(), c = st.code && SS.codes[st.code];
      q('.methods').innerHTML = st.method === 'pickup' ? '' : [['std', 'Standard', 'USPS Ground Advantage · 3–7 business days', s.std], ['exp', 'Expedited', 'USPS Priority · 2–3 business days', SS.expShip]]
        .map(([v, n, d, pr]) => `<label class="m${st.method === v ? ' on' : ''}"><input type="radio" name="method" value="${v}"${st.method === v ? ' checked' : ''}><span><b>${n}</b><small>${d}</small></span><b>${pr ? money(pr) : 'FREE'}</b></label>`).join('');
      q('.shiph').hidden = st.method === 'pickup';
      $$('.methods input', root).forEach(r => r.onchange = () => { st.method = r.value; draw(); });
      const left = SS.freeShip - (s.sub - s.disc);
      q('.tots').innerHTML = `${st.code ? `<div class="chip-code"><span>🏷 ${st.code}</span><button type="button" aria-label="Remove code">×</button></div>` : ''}
        <div class="r"><span>Subtotal</span><span>${money(s.sub)}</span></div>
        ${s.disc ? `<div class="r disc"><span>Discount <small>${c.label}</small></span><span>−${money(s.disc)}</span></div>` : ''}
        <div class="r"><span>Shipping</span><span>${st.method === 'pickup' ? 'Pickup · Free' : s.ship ? money(s.ship) : 'FREE'}</span></div>
        ${st.method === 'std' && s.ship && left > 0 ? `<div class="r nudge"><span>Add ${money(left)} more for free shipping</span></div>` : ''}
        <div class="r"><span>Estimated taxes</span><span><small>calculated by Shopify</small></span></div>
        <div class="r total"><span>Total</span><span><small>USD</small> ${money(s.total)}</span></div>`;
      q('.tt').textContent = money(s.total);
      const rm = q('.chip-code button'); if (rm) rm.onclick = () => { st.code = null; q('.code-msg').textContent = ''; draw(); };
    };
    // delivery: ship vs pickup
    $$('input[name=dl]', root).forEach(r => r.onchange = () => {
      $$('.seg label', root).forEach(l => l.classList.toggle('on', l.contains(r) && r.checked));
      const pick = r.value === 'pickup'; q('.addr').hidden = pick; q('.pickup').hidden = !pick;
      $$('.addr [required]', root).forEach(i => i.disabled = pick);
      st.method = pick ? 'pickup' : 'std'; draw();
    });
    $$('input[name=pay]', root).forEach(r => r.onchange = () => { $$('.pay', root).forEach(l => l.classList.toggle('on', l.contains(r) && r.checked)); q('.cardbox').hidden = r.value !== 'card'; st.pay = r.value; });
    // discount codes
    q('.code').onsubmit = ev => {
      ev.preventDefault(); const v = ev.target.code.value.trim().toUpperCase(), c = SS.codes[v], m = q('.code-msg');
      if (!v) return;
      if (!c) { m.className = 'code-msg bad'; m.textContent = 'Enter a valid discount code'; return; }
      const sub = cart.reduce((a, i) => a + i.qty * i.price, 0);
      if (c.min && sub < c.min) { m.className = 'code-msg bad'; m.textContent = `${v} needs an order of ${money(c.min)} or more`; return; }
      if (c.only && !cart.some(i => c.only.some(o => i.key.startsWith(o)))) { m.className = 'code-msg bad'; m.textContent = `${v} is for gift boxes and the display`; return; }
      st.code = v; m.className = 'code-msg ok'; m.textContent = c.label + ' applied'; ev.target.reset(); draw();
    };
    q('.co-toggle').onclick = () => q('.co-side').classList.toggle('open');
    // pay now
    const done = (via, f) => {
      const s = sums(), n = 'SS' + (1040 + Math.floor(Math.random() * 900));
      const first = f ? f.first.value : '', addr = f && st.method !== 'pickup' ? `${f.address.value}${f.apt.value ? ', ' + f.apt.value : ''}<br>${f.city.value}, ${f.state.value} ${f.zip.value}` : f ? 'Pick up · 875 Iron Horse Dr., Park City' : `The address saved in ${via}`;
      const items = lines();
      cart = []; save();
      root.innerHTML = `<section class="co-done"><div class="tick"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg></div>
        <p class="ord">Order #${n}</p><h1>Thank you${first ? ', ' + first : ''}!</h1>
        <div class="box"><h3>Your order is confirmed</h3><p>You’ll get a confirmation email with tracking soon. Paid with ${via}.</p></div>
        <div class="box"><h3>${st.method === 'pickup' ? 'Pickup' : 'Shipping to'}</h3><p>${addr}</p></div>
        <div class="box">${items}<div class="r total"><span>Total paid</span><span>${money(s.total)}</span></div></div>
        <a class="btn" href="index.html">Continue shopping</a></section>`;
      window.scrollTo(0, 0);
    };
    q('#coform').onsubmit = ev => {
      ev.preventDefault(); const f = ev.target; let bad = null;
      $$('[required]:not(:disabled)', f).forEach(i => { const ok = i.value.trim() && (i.type !== 'email' || /.+@.+\..+/.test(i.value)); i.closest('.fl').classList.toggle('err', !ok); if (!ok && !bad) bad = i; });
      if (bad) { bad.focus(); toast('Fill in the highlighted fields.'); return; }
      const b = q('.paynow'); b.disabled = true; b.innerHTML = '<span class="spin"></span> Processing…';
      setTimeout(() => done(st.pay === 'card' ? 'card' : st.pay === 'shop' ? 'Shop Pay' : 'PayPal', f), 1400);
    };
    // express wallets: a wallet-style sheet (Shopify shows the real Apple Pay / Google Pay sheets at launch)
    const sheet = $('#paysheet');
    const wallet = kind => {
      const s = sums(), name = { apple: 'Apple Pay', google: 'Google Pay', shop: 'Shop Pay', paypal: 'PayPal' }[kind];
      sheet.hidden = false; sheet.className = 'paysheet ' + kind;
      sheet.innerHTML = `<div class="ps"><div class="ps-top"><b>${name}</b><button class="ps-x" aria-label="Cancel">Cancel</button></div>
        <div class="ps-row"><span>Card</span><span>Your saved ${kind === 'paypal' ? 'PayPal account' : 'card'}</span></div>
        <div class="ps-row"><span>Ship to</span><span>Saved address</span></div>
        <div class="ps-row"><span>Shipping</span><span>${s.std ? money(s.std) : 'Free'} · Standard</span></div>
        <div class="ps-row"><span>Contact</span><span>Saved email</span></div>
        <div class="ps-total"><span>Pay Sapphire Salt</span><b>${money(sums().sub - sums().disc + s.std)}</b></div>
        <button class="ps-go">${kind === 'apple' ? 'Confirm with Face ID' : 'Pay now'}</button><p class="ps-demo">Demo — no payment is made.</p></div>`;
      $('.ps-x', sheet).onclick = () => sheet.hidden = true;
      $('.ps-go', sheet).onclick = () => { $('.ps-go', sheet).innerHTML = '<span class="spin"></span>'; setTimeout(() => { sheet.hidden = true; st.method = 'std'; done(name); }, 1300); };
    };
    $$('.xbtns .x', root).forEach(b => b.onclick = () => wallet(b.dataset.x));
    draw();
    if (new URLSearchParams(location.search).get('express') === 'apple') wallet('apple');
  },
  team() {
    $('#team').innerHTML = TEAM.map(m => `<article class="member${m.open ? ' open' : ''}${m.face ? ' face' : ''}">
      ${m.face ? portrait(m) : `<div class="avatar">${m.open ? '+' : (m.photo ? `<img src="${m.photo}" alt="${m.name}">` : `<img class="av-gem" src="img/tiara-gold.png" alt=""><small>Photo coming</small>`)}</div>`}
      <h3>${m.name}</h3><p class="role">${m.role || '<span class="draft">Role to confirm</span>'}</p>
      ${m.open ? `<a class="link" href="#join">Apply</a>` : `<p class="bio">${m.bio || 'Bio and photo coming.'}</p>`}</article>`).join('');
    $('#roles').innerHTML = ['Blending & packing — Park City, part-time', 'Markets & events — weekends, seasonal', 'Retail & restaurant sales — commission', 'Content, photo & social — freelance']
      .map(r => `<li>${r}</li>`).join('') + '<li class="muted">Roles are examples until we post openings.</li>';
  },
  contact() {
    const show = k => { $$('.ctabs button').forEach(b => b.classList.toggle('on', b.dataset.t === k)); $$('.cpanel').forEach(p => p.hidden = p.dataset.t !== k); };
    $$('.ctabs button').forEach(b => b.onclick = () => show(b.dataset.t));
    const t0 = new URLSearchParams(location.search).get('t'); if (t0) show(t0);
    // help me choose: one question, one answer
    const Q = [['Just a better everyday salt', 'pure'], ['A little fiber in every meal', 'gut-health'], ['A smooth, gentle fiber blend', 'belly-bliss'], ['Magnesium for the evening table', 'restore'], ['Electrolyte minerals for active days', 'hydrate'], ['I can’t decide', null]];
    const hm = $('#helpme');
    hm.innerHTML = `<h3>What do you want from your salt?</h3><div class="hm-opts">${Q.map(([q, s], i) => `<button data-i="${i}">${q}</button>`).join('')}</div><div class="hm-out"></div>`;
    $$('.hm-opts button', hm).forEach(b => b.onclick = () => {
      $$('.hm-opts button', hm).forEach(x => x.classList.toggle('on', x === b));
      const s = Q[b.dataset.i][1], bl = s && findBlend(s);
      $('.hm-out', hm).innerHTML = bl ? `<div class="hm-card" style="--c:${bl.color}"><img src="img/${bl.slug}-card.jpg" alt=""><div><span class="eyebrow">Start with</span><h3>${bl.name}</h3><p>${bl.line}</p><a class="btn" href="product.html?p=${bl.slug}">Shop ${bl.short}</a> <a class="link" href="index.html#build5">or try all five for $15</a></div></div>`
        : `<div class="hm-card"><img src="img/fan-card.jpg" alt=""><div><span class="eyebrow">Start with</span><h3>Discovery Collection</h3><p>Taste all five on real food, then pick your jar. $15, ships free.</p><a class="btn" href="index.html#build5">Discover your first five</a></div></div>`;
      linkIngredients($('.hm-out', hm));
    });
  },
  story() {}, faq() {}, policies() {},
};

/* ---------- ingredient links: any ingredient named in page copy links to its page ---------- */
function linkIngredients(root = document.body) {
  if (typeof INGREDIENTS === 'undefined') return;
  const terms = INGREDIENTS.flatMap(i => [i.name, ...(i.aka || [])].map(t => [t, i.slug])).sort((a, b) => b[0].length - a[0].length);
  const rx = new RegExp('\\b(' + terms.map(([t]) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\b', 'i');
  const skip = new Set('A,BUTTON,H1,H2,H3,H4,LABEL,INPUT,TEXTAREA,SELECT,SCRIPT,STYLE,NAV,HEADER,SUMMARY,OPTION'.split(','));
  const here = new URLSearchParams(location.search).get('i');
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => {
    for (let e = n.parentElement; e && e !== root; e = e.parentElement) if (skip.has(e.tagName) || e.matches('.announce,.drawer,.eyebrow,.shelf,.b5-pick,.b5-tray,.ing-card,.matrix,.co,.toast,.no-ing')) return NodeFilter.FILTER_REJECT;
    return rx.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; } });
  const nodes = []; while (walk.nextNode()) nodes.push(walk.currentNode);
  nodes.forEach(n => {
    let m;
    while (n && (m = n.nodeValue.match(rx))) {   // every mention in the sentence
      const slug = terms.find(([t]) => t.toLowerCase() === m[1].toLowerCase())[1];
      const rest = n.splitText(m.index); const after = rest.splitText(m[1].length);
      if (slug !== here) { const a = document.createElement('a'); a.className = 'ing-link'; a.href = `ingredient.html?i=${slug}`; a.textContent = m[1]; rest.replaceWith(a); }
      n = after;
    }
  });
}

/* ---------- ambient motion: slow, quiet, always a little alive ---------- */
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
function saltDrift(el) {   // a few salt specks drifting through dark sections
  const c = document.createElement('canvas'); c.className = 'drift'; c.setAttribute('aria-hidden', 'true'); el.prepend(c);
  const ctx = c.getContext('2d'); let W, H, P = [], on = true, last = 0;
  const size = () => {
    const d = Math.min(devicePixelRatio || 1, 2); W = el.clientWidth; H = el.clientHeight;
    c.width = W * d; c.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.min(70, Math.round(W * H / 16000));
    P = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: .5 + Math.random() * 1.4,
      v: 4 + Math.random() * 8, ph: Math.random() * 6.3, gold: Math.random() < .25, tw: .4 + Math.random() * .9 }));
  };
  const tick = ts => {
    const dt = Math.min(.05, (ts - last) / 1000 || 0); last = ts;
    if (on) {
      ctx.clearRect(0, 0, W, H);
      for (const s of P) {
        s.y += s.v * dt; s.ph += dt * s.tw; s.x += Math.sin(s.ph) * 4 * dt;
        if (s.y > H + 4) { s.y = -4; s.x = Math.random() * W; }
        ctx.globalAlpha = .18 + .32 * (.5 + .5 * Math.sin(s.ph * 1.7));
        ctx.fillStyle = s.gold ? '#CDB27C' : '#F4F1EA';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
      }
    }
    requestAnimationFrame(tick);
  };
  new IntersectionObserver(e => on = e[0].isIntersecting).observe(el);
  addEventListener('resize', size); size(); requestAnimationFrame(tick);
}
function ambient() {
  // announcement bar: messages take turns
  const rots = $$('.announce .rot'); let ri = 0;
  if (rots.length > 1 && !calm) setInterval(() => { rots[ri].classList.remove('on'); ri = (ri + 1) % rots.length; rots[ri].classList.add('on'); }, 4200);
  if (calm) return;
  // sections ease up as they arrive
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('main section .wrap > *, body > section:not(.shelf-hero) .wrap > *, .page-head > *, .values .v').forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--d', (i % 4) * .07 + 's'); io.observe(el); });
}

if (page !== 'checkout') { layout(); renderCart(); }
meetFace();
(R[page] || (() => {}))(); linkIngredients(); ambient();
$$('form.sform').forEach(f => f.onsubmit = ev => {
  ev.preventDefault(); const ok = $('.form-ok', f);
  ok.textContent = `Thanks — we’ve got your ${(f.dataset.kind || 'message').toLowerCase()}. We’ll reply within two business days.`; ok.hidden = false; f.reset();
});
$$('[data-copy]').forEach(b => b.onclick = () => {
  const done = () => { b.textContent = 'Copied'; setTimeout(() => b.textContent = 'Copy', 1600); };
  try { navigator.clipboard.writeText(b.dataset.copy).then(done, () => toast(b.dataset.copy)); } catch (e) { toast(b.dataset.copy); }
});
