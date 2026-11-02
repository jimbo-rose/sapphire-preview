/* Sapphire Salt — catalogue. Prices from Ryan's economics sheet (Oct 2026).
   Items marked proposed:true are Jimmy/Claude suggestions, not Ryan's numbers. */

const SS = {
  freeShip: 45,          // Jimmy, 1 Nov: $45. A 16 oz + 4 oz ($42) is just short — the cart nudges them over
  flatShip: 6.95,        // proposed flat rate under the threshold
  subShipMin: 25,        // proposed: subscriptions ship free from one 16 oz / two 4 oz (after 10% off)
  subscribeOff: 0.10,    // proposed Subscribe & Save discount
  email: 'hello@sapphiresalt.com', // proposed address — confirm with Ryan
  expShip: 12.95,        // proposed USPS Priority option
  // discount codes (demo). At launch: Shopify Admin → Discounts, same names.
  codes: {
    WELCOME10: { label: '10% off your first order', pct: 10 },
    SALT5:     { label: '$5 off orders over $30', off: 5, min: 30 },
    FREESHIP:  { label: 'Free standard shipping', freeShip: true },
    GIFT15:    { label: '15% off gift boxes & the display', pct: 15, only: ['gift', 'display-collection'] },
  },
};

const BASE_SALT = {
  name: 'Australian Ocean Sea Salt',
  title: 'The Foundation of Every Blend',
  desc: 'Harvested from the cold coastal waters of Australia and chosen for its clean taste, natural purity and smooth culinary character. It forms the foundation of every Sapphire Salt blend — without changing the familiar experience of salt.',
};
const TAPIOCA = {
  name: 'Tapioca Starch',
  title: 'The Quiet Finishing Touch',
  desc: 'A small amount keeps the blend smooth and free-flowing by reducing natural clumping. Just enough to keep every shake effortless — without affecting the taste.',
};
const PSYLLIUM = {
  name: 'Psyllium Husk',
  title: 'Time-Honored Plant Fiber',
  desc: 'A dependable staple in traditional wellness routines. Naturally rich in soluble fiber, it has long been valued as a simple, nourishing plant-based ingredient.',
};
const TAURINE = {
  name: 'Taurine', title: 'Amino Acid',
  desc: 'An amino acid, included in a small, measured amount in every shake.',
};

const BLENDS = [
  {
    slug: 'pure', name: 'Pure Salt', short: 'Pure', sub: 'Australian Ocean Sea Salt', cat: 'pure', popular: true,
    spec: ['Australian ocean sea salt', 'Nothing added', 'No anti-caking agents', 'Glass jar', 'Walnut lid'], allergens: 'Free of the top 9 allergens',
    tag: 'Sea salt only', color: '#1E3A9E', tint: '#E8EDF8',
    line: 'Pure Australian ocean sea salt. Nothing added, nothing taken away.',
    about: 'The salt every blend starts with, on its own. Bright, pure and mineral — the everyday salt for people who just want a better one.',
    use: ['Season steaks, roasts and vegetables before cooking', 'Salt pasta water and finish salads', 'Refill your table shaker — it’s a 1:1 swap'],
    ingredients: [BASE_SALT],
  },
  {
    slug: 'gut-health', name: 'Gut Health Salt', short: 'Gut Health', sub: 'Plant Fiber Blend', cat: 'blends', group: 'fiber',
    spec: ['Psyllium', 'White chia', 'Golden flax', 'No sugar', 'No flavorings', 'Glass jar'], allergens: 'Top-9 allergen free · has chia & flax',
    tag: 'Fiber blend', color: '#3A5A24', tint: '#EEF2E4',
    line: 'Sea salt with psyllium, white chia and golden flax.',
    about: 'Three time-honored plant fibers, milled fine and blended into sea salt — so the salt you already use brings a little fiber to every meal.',
    use: ['Avocado toast, eggs and grain bowls', 'Roasted vegetables and soups', 'Anywhere you’d reach for regular salt'],
    ingredients: [BASE_SALT, PSYLLIUM,
      { name: 'White Chia Seed', title: 'Whole-Food Nutrient Support', desc: 'Milled white chia is a quiet powerhouse. With the oil gently removed, what remains is naturally concentrated in fiber and plant protein — more of what matters in a smaller amount.' },
      { name: 'Golden Flax Seed', title: 'Plant-Based Daily Balance', desc: 'Milled golden flax contributes naturally occurring fiber and plant-based nutrients long valued in traditional whole-food practices.' },
      TAPIOCA],
  },
  {
    slug: 'belly-bliss', name: 'Belly Bliss Salt', short: 'Belly Bliss', sub: 'Fiber Nourishing Blend', cat: 'blends', group: 'fiber',
    spec: ['Acacia fiber', 'Psyllium', 'L-glutamine', 'No sugar', 'No flavorings', 'Glass jar'], allergens: 'Free of the top 9 allergens',
    tag: 'Fiber + amino', color: '#A3271D', tint: '#F8EAE5',
    line: 'Sea salt with acacia fiber, psyllium and L-glutamine.',
    about: 'A smooth, gentle fiber blend. Acacia and psyllium disappear into the salt; L-glutamine rounds it out. You taste salt — that’s it.',
    use: ['Morning eggs and breakfast potatoes', 'Rice, noodles and stir-fries', 'Popcorn, fries and snacks'],
    ingredients: [BASE_SALT,
      { name: 'Acacia Fiber', title: 'Smooth Everyday Fiber', desc: 'A plant-based fiber traditionally valued for its gentle nature and smooth integration into daily routines.' },
      PSYLLIUM,
      { name: 'L-Glutamine', title: 'Amino Acid', desc: 'An amino acid included as part of the Belly Bliss blend.' },
      TAPIOCA],
  },
  {
    slug: 'restore', name: 'Restore Salt', short: 'Restore', sub: 'Daily Nourishing Blend', cat: 'blends', group: 'mineral',
    spec: ['Magnesium glycinate', 'Taurine', 'L-theanine', 'No sugar', 'No flavorings', 'Glass jar'], allergens: 'Free of the top 9 allergens',
    tag: 'Magnesium + amino', color: '#2E5573', tint: '#EAEEF3',
    line: 'Sea salt with magnesium glycinate, taurine and L-theanine.',
    about: 'Our mineral blend for the evening table. Magnesium glycinate, taurine and L-theanine, measured into the salt you already shake.',
    use: ['Dinner — roasted chicken, fish and vegetables', 'Soups, stews and sauces', 'Rim a glass for a mocktail'],
    ingredients: [BASE_SALT,
      { name: 'Magnesium Glycinate', title: 'Mineral Support', desc: 'A magnesium compound included as part of the Restore blend.' },
      TAURINE,
      { name: 'L-Theanine', title: 'Amino Acid', desc: 'An amino acid included as part of the Restore blend.' },
      TAPIOCA],
  },
  {
    slug: 'hydrate', name: 'Hydrate Salt', short: 'Hydrate', sub: 'Essential Mineral Blend', cat: 'blends', group: 'mineral',
    spec: ['Potassium', 'Magnesium', 'Taurine', 'Citrulline', 'No sugar', 'Glass jar'], allergens: 'Free of the top 9 allergens',
    tag: 'Electrolyte minerals', color: '#2F6FD0', tint: '#E5F0FB',
    line: 'Sea salt with potassium, magnesium, taurine and citrulline.',
    about: 'Sodium, potassium and magnesium together, plus taurine and citrulline. Built for active days — and still just salt on your plate.',
    use: ['Post-workout meals and salads', 'Grain bowls, tacos and eggs', 'Watermelon, citrus and cucumber'],
    ingredients: [BASE_SALT,
      { name: 'Potassium Chloride', title: 'Electrolyte Balance', desc: 'An electrolyte mineral included to complement the natural sodium of sea salt.' },
      { name: 'Magnesium Malate', title: 'Mineral Support', desc: 'A magnesium compound included as part of the Hydrate blend.' },
      TAURINE,
      { name: 'L-Citrulline', title: 'Amino Acid', desc: 'An amino acid included as part of the Hydrate blend.' },
      TAPIOCA],
  },
];

const SIZES = [   // pic: which photo the card shows for that size (img/<slug>-<pic>.jpg)
  { id: '4oz', label: '4 oz', note: 'Shaker jar', price: 14, jar: true, pic: 'card' },
  { id: '16oz', label: '16 oz', note: 'Kitchen jar', price: 28, jar: true, pic: 'card' },
  { id: 'sticks', label: 'Travel sticks', chip: 'Sticks', note: 'Box of 30 · $1.33 a stick', price: 40, pic: 'sticks-card', proposed: true },   // Jimmy, 3 Nov: 30+ only, about $1.35 a stick
  { id: 'sticks-60', label: 'Travel sticks', chip: null, note: 'Box of 60 · $1.30 a stick', price: 78, pic: 'sticks-card', proposed: true },
  { id: 'packets', label: 'Table packets', chip: 'Packets', note: 'Box of 50 · sugar-packet size', price: 15, pic: 'packets-card', proposed: true },
];
const JARS = SIZES.filter(z => z.jar);

/* the shelf, by category. Main lines first; everything else hangs off these. */
const CATS = [
  { id: 'pure', name: 'Pure Salts', line: 'One salt, nothing added. Australian ocean sea salt today; Utah and Himalayan next.' },
  { id: 'blends', name: 'Salt Blends', line: 'Pure sea salt with a few intentional ingredients. Same pinch, same taste.',
    subs: [['fiber', 'Fiber blends'], ['mineral', 'Mineral blends']] },
  { id: 'seasonings', name: 'Seasonings', soon: true, line: 'Flavored salts for the grill, the garden and the finish.',
    subs: [['grill', 'Grill & smoke'], ['herb', 'Herb & garlic'], ['bright', 'Bright & zesty'], ['finish', 'Finishing']] },
  { id: 'spices', name: 'Spices', soon: true, line: 'Peppercorns, chiles and the household staples, each priced on its own.',
    subs: [['pepper', 'Peppercorns'], ['chile', 'Chiles & paprika'], ['staple', 'Everyday staples'], ['warm', 'Warm & baking'], ['herb', 'Herbs']] },
];
/* pure salts by origin. Australian is on sale as Pure Salt; the other two are coming. */
const PURE_SALTS = [
  { slug: 'pure', name: 'Australian Ocean', sub: 'Pure Salt · on sale now', live: true },
  { slug: 'utah-salt', name: 'Utah Salt', sub: 'Great Salt Lake · solar-evaporated', color: '#A8742E',
    line: 'Salt from the brine of the Great Salt Lake, an hour from our kitchen in Park City.' },
  { slug: 'himalayan', img: 'img/himalayan-pink-salt-macro.png', imgAlt: "Illustration of layered pink rock salt with naturally broken crystalline surfaces", imgNote: "Pink rock-salt material illustration; not a mine photograph.", name: 'Himalayan Pink Salt', sub: 'Salt Range · ancient rock salt', color: '#B5636A',
    line: 'Rock salt from ancient seabed deposits, pink from its iron-rich trace minerals.' },
];

const EXTRAS = [
  { slug: 'discovery', name: 'Discovery Collection', sub: 'Pick any 5 · 15 packets', price: 15, color: '#C4A468', tint: '#F5EFE2', kind: 'packets', packet: true,
    spec: ['Pick any five', '15 packets', 'Ships free', 'Doubles welcome'],
    line: 'For you: pick any five blends, get three packets of each — 15 in all — and find your favorite.',
    about: 'Choose five blends (doubles welcome) and we send three single-serve packets of each. Try them on something simple — eggs, avocado, tomatoes — and see which earns a jar. Ships free on its own.' },
  { slug: 'kindness', name: 'Kindness Card', sub: 'For someone else · your words, 5 packets + a gift code', price: 5, color: '#C4A468', tint: '#F5EFE2', kind: 'kindness', packet: true,
    spec: ['Your words, hand-lettered', 'Five packets', 'A gift code on the back', 'Mailed for you'],
    line: 'A card in the mail with your own words on the front and five packets — one of each blend — tucked inside.',
    about: 'Write what you want them to read; we hand-letter it onto the front, and nothing else goes there. On the back, under our logo, a line of small print gives them 15% off their first jar with a code in your name — and when they use it, you get $5 toward your next order. We mail it to them, or to you to hand over.',
    referral: { off: 15, credit: 5 }, proposed: true },
  { slug: 'gift-card', name: 'Digital Gift Card', sub: 'Emailed on the day you choose', price: 50, color: '#0B1B3F', tint: '#E8ECF4', kind: 'giftcard', digital: true,
    spec: ['Any amount', 'Sent by email', 'On the day you choose', 'Never expires'],
    line: 'Any amount, sent by email with your note — on their birthday, or right now.',
    about: 'Spend it on anything in the shop. It never expires. They’ll get a beautiful email with your message and a code.' },
  { slug: 'year-of-salt', name: 'A Year of Salt & Spice', sub: 'Gift subscription · something new each month', price: 240, color: '#0B1B3F', tint: '#E8ECF4', kind: 'subgift', inclShip: true, proposed: true,
    spec: ['Twelve different jars', 'Salts, seasonings and spices', 'Shipping included', 'Prepaid'],
    plans: [{ m: 3, price: 66 }, { m: 6, price: 126 }, { m: 12, price: 240 }],
    line: 'A different salt, seasoning or spice in their mailbox every month — shipping included.',
    about: 'Each month brings a 4 oz jar of something new: a salt blend one month, a seasoning or a spice the next, with a card on how to use it. As our shelf grows, so does the year. Prepaid, so they never see a bill.' },
  { slug: 'full-table', name: 'The Full Table', sub: 'All five blends · 4 oz', price: 62, was: 70, color: '#0B1B3F', tint: '#EFEBE1', kind: 'set', proposed: true,
    spec: ['Five shaker jars', '4 oz each', 'Save $8', 'Glass and walnut'],
    line: 'All five shaker jars. Pure, Gut Health, Belly Bliss, Restore and Hydrate.',
    about: 'The whole line in shaker jars — one for every meal of the day. Save $8 against buying them one at a time.' },
  { slug: 'kitchen-set', name: 'The Kitchen Set', sub: 'All five blends · 16 oz', price: 125, was: 140, color: '#0B1B3F', tint: '#EFEBE1', kind: 'set16', proposed: true,
    spec: ['Five kitchen jars', '16 oz each', 'Save $15', 'Glass and walnut'],
    line: 'All five kitchen jars, for the cook who salts by the pinch.',
    about: 'Five 16 oz glass jars with wood lids, lined up by the stove. Save $15 against buying them one at a time.' },
  { slug: 'awaken-pepper', name: 'Awaken Pepper', sub: 'Single-origin Tellicherry · 6 oz', price: 20, color: '#1C1C1C', tint: '#EEEDEB', kind: 'pepper', proposed: true,
    spec: ['Tellicherry peppercorns', 'Single origin', 'Whole, for your mill', 'Nothing added'],
    line: 'Single-origin Tellicherry peppercorns. Awaken every bite.',
    about: 'Bold, bright Tellicherry peppercorns — the larger, riper berries left longest on the vine. The partner every Sapphire Salt deserves.' },
  { slug: 'test-kitchen', name: 'Test Kitchen 3-Pack', sub: 'Small batch · three sticks · about our cost', price: 3, color: '#2F6FD0', tint: '#E5F0FB', kind: 'test', packet: true, proposed: true,
    spec: ['Three sticks', 'About our cost', 'Three quick questions', 'Ships free'],
    now: 'Hydrate Charge', nowLine: 'Our electrolyte minerals plus a clean lift of caffeine from green tea',
    line: 'Three sticks of whatever we’re testing next, for about what they cost us. Taste it, tell us straight.',
    about: 'Before anything joins the shelf, it goes to people who’ll tell us the truth. Add a Test Kitchen pack to any order (or on its own, and it ships free). Three days later we send three questions. Your answers decide whether it launches, and testers hear first when it does.' },
  { slug: 'gift-box', name: 'The Gift Box', sub: 'Any three 4 oz jars + 3 packets', price: 49, color: '#0B1B3F', tint: '#E8ECF4', kind: 'gift', proposed: true,
    spec: ['Three jars you choose', 'Three packets', 'Gold-foil navy box', 'Free handwritten note'],
    line: 'Three shaker jars of your choice, three sample packets and a gold-foil navy box.',
    about: 'Pick any three blends. They arrive nestled in a rigid navy gift box with three bonus packets and a handwritten note — ready to hand over.' },
  { slug: 'engraved-display', name: 'The Engraved Display', sub: 'All ten jars + a walnut stand with your words', price: 299, color: '#0B1B3F', tint: '#EFEBE1', kind: 'custom', proposed: true,
    spec: ['All ten jars', 'Walnut stand', 'Three rails, your words', 'Made in Park City'],
    line: 'The full shelf, with your family name, business or logo laser-engraved into the walnut.',
    about: 'Every blend in both sizes on the walnut display stand. All three rails are yours: your words (up to 28 characters each), our usual inscription, or left blank — and the top sign can carry your logo instead (we send a proof first). Made to order in Park City in about two weeks.' },
  { slug: 'display-collection', name: 'The Display Collection', sub: 'All ten jars + walnut stand', price: 249, color: '#0B1B3F', tint: '#EFEBE1', kind: 'stand', proposed: true,
    spec: ['All ten jars', 'Walnut stand', 'Room for spares', 'Made to last'],
    line: 'Every blend in both sizes, on the same walnut stand you see in the shops.',
    about: 'Five 4 oz shakers, five 16 oz kitchen jars and the walnut display shelf, engraved Sapphire Salt and Spice · Salt With Purpose · Your Everyday Salt. Room behind the front row for spare jars. The jars alone are $210.' },
];

/* Coming soon — ideas, not products. Shown on the seasonings shelf and the shop page
   with a "notify me" form. Names, contents and timing are proposals for Ryan. */
const COMING = [
  { slug: 'ember-steak', name: 'Ember Steak Salt', sub: 'Coarse grill blend', color: '#6E2616', img: 'img/soon-ember-steak.jpg',
    line: 'Coarse sea salt, cracked pepper and garlic. Made for steaks and the grill.' },
  { slug: 'garden-herb', name: 'Garden Herb Salt', sub: 'Rosemary & thyme blend', color: '#3A562A', img: 'img/soon-garden-herb.jpg',
    line: 'Sea salt with rosemary, thyme and a little garlic. Roast chicken’s best friend.' },
  { slug: 'smoked', name: 'Smoked Sea Salt', sub: 'Applewood smoked', color: '#54381F', img: 'img/soon-smoked.jpg',
    line: 'Slow-smoked over applewood. Ribs, salmon, eggs — and caramel.' },
  { slug: 'chili-lime', name: 'Chili Lime Salt', sub: 'Bright citrus heat', color: '#B0401C', img: 'img/soon-chili-lime.jpg',
    line: 'Chili and lime for tacos, mango, popcorn and margarita rims.' },
  { slug: 'table-packets', name: 'Walnut Packet Holders', sub: 'Restaurants, cafés & your own table', color: '#5A3B22', img: 'img/caddy-card.jpg',
    line: 'Two walnut holders that match the display: one for tall stick packs, one for tabletop sachets. Each stands alone; side by side they sit flush. Restaurants: ask on the Wholesale page.' },
  { slug: 'hydrate-charge', name: 'Hydrate Charge', sub: 'Electrolytes + caffeine · stick packs', color: '#2F6FD0', icon: 'bolt',
    line: 'The Hydrate minerals with a clean lift of caffeine, in a stick for your water bottle. For early runs and long ski days.' },
  { slug: 'capsules', name: 'Hydrate Capsules', sub: 'Electrolytes in a capsule · 120 count', color: '#2F6FD0', icon: 'capsule', group: 'wellness',
    line: 'The Hydrate minerals in a plant-based capsule, for long days, travel and anywhere you’re not salting food. Glass bottle, no plastic tub.' },
  { slug: 'trace-minerals', name: 'Trace Minerals', sub: 'Mineral drops · glass dropper', color: '#2E5573', icon: 'drop', group: 'wellness',
    line: 'Concentrated ocean minerals for water, coffee or a smoothie. A few drops, no flavor added.' },
  { slug: 'creatine', name: 'Creatine', sub: 'Creatine monohydrate · nothing else', color: '#0B1B3F', icon: 'scoop', group: 'wellness',
    line: 'One ingredient, third-party tested, in a glass jar with a walnut scoop. Stirs into anything.' },
  { slug: 'protein', name: 'Clean Protein', sub: 'Short-list protein powder', color: '#5A3B22', icon: 'scoop', group: 'wellness',
    line: 'A protein with an ingredient list you can read in one breath, packed with as little plastic as we can manage.' },
  { slug: 'coffee', name: 'Sapphire Coffee', sub: 'Whole bean · with a Utah roaster', color: '#5A3B22', icon: 'coffee',
    line: 'A small-batch roast from a Utah partner — and a pinch of Pure Salt smooths the bitterness, the old diner trick.' },
  { slug: 'tea', name: 'Loose-Leaf Teas', sub: 'Morning, mineral and evening blends', color: '#3A5A24', icon: 'tea',
    line: 'Loose-leaf teas to sit beside the salts: a bright morning black, a mineral green and a calm evening herbal.' },
  { slug: 'steakhouse-kit', name: 'The Steakhouse Kit', sub: 'Steak salt · pepper · walnut cellar', color: '#3B2A1E', icon: 'kit',
    line: 'Ember Steak Salt, Awaken Pepper and a walnut salt cellar in one gift box.' },
  { slug: 'salt-cellar', name: 'Walnut Salt Cellar', sub: 'Matches the display stand', color: '#5A3B22', icon: 'cellar',
    line: 'A lidded walnut pinch bowl for the stove. Keep your blend an arm’s length away.' },
  { slug: 'tote', name: 'Market Tote', sub: 'Merch · heavy canvas', color: '#0B1B3F', icon: 'tote',
    line: 'A heavy canvas tote with the crest in gold thread. Carries the farmers market haul.' },
  { slug: 'cap', name: 'Park City Cap', sub: 'Merch · washed cotton', color: '#0B1B3F', icon: 'cap',
    line: 'A navy washed-cotton cap with a small embroidered crest.' },
  { slug: 'apron', name: 'Kitchen Apron', sub: 'Merch · linen', color: '#5A3B22', icon: 'apron',
    line: 'A linen apron with a front pocket sized for a 4 oz shaker.' },
  { slug: 'grinder', name: 'Salt Crusher & Grinder', sub: 'Walnut and ceramic', color: '#5A3B22', icon: 'grinder',
    line: 'A walnut mill with a ceramic burr that cracks coarse salt and Awaken Pepper at the table.' },
  { slug: 'dispenser', name: 'Countertop Dispenser', sub: 'Walnut · one-handed pour', color: '#5A3B22', icon: 'dispenser',
    line: 'A weighted walnut dispenser that pours a measured pinch — made for the stove side.' },
  { slug: 'olive-oil', name: 'Finishing Olive Oil', sub: 'With a partner grower', color: '#5E6B2E', icon: 'oil',
    line: 'A peppery extra-virgin finishing oil to pair with Pure Salt. Partner to be announced.' },
  { slug: 'utah-honey', name: 'Utah Raw Honey', sub: 'Local beekeepers', color: '#C08A1E', icon: 'honey',
    line: 'Raw wildflower honey from Utah hives, for toast, tea and cheese boards.' },
  { slug: 'hot-honey', name: 'Hot Honey', sub: 'Utah honey + chili', color: '#B0401C', icon: 'honey',
    line: 'Utah honey infused with chili for pizza, fried chicken and roasted carrots.' },
  { slug: 'refill', name: 'Refill & Bulk Bags', sub: 'Every blend · refill and bulk', color: '#0B1B3F', img: 'img/refill-card.jpg',
    line: 'Top up your glass jars for less, with less packaging.' },
];

/* Seasonings and spices (Drive: Product and Display Review v2). Awaken Pepper is on sale; the rest are
   packaging concepts. Gold descriptors are the label copy; little lines are proposed creative copy.
   cat: seasonings (flavored salts) or spices (peppercorns, chiles); sub: the shelf's sub-category.
   price: proposed 4 oz price, each set on its own, a little under Erewhon where margin allows (../SPICE-PRICING.md) */
const NO_PHOTO = new Set(['sweet-paprika', 'smoked-paprika', 'chili-powder', 'garlic-powder', 'onion-powder', 'cumin', 'turmeric', 'ginger', 'cinnamon', 'nutmeg', 'oregano', 'thyme', 'bay-leaves']);   // household staples: concept art until photos (IMAGE-PROMPTS.md)
const SEASONINGS = [
  { slug: 'awaken-pepper', name: 'Awaken Pepper', cat: 'spices', sub: 'pepper', gold: 'Single-origin Tellicherry peppercorns', little: 'Awaken every bite', color: '#2B2F38', live: true },
  { slug: 'ember-steak', name: 'Ember Steak Salt', cat: 'seasonings', sub: 'grill', price: 12, gold: 'Savory grilling blend', little: 'Fire up every bite', color: '#7A2E1E' },
  { slug: 'garden-herb', name: 'Garden Herb Salt', cat: 'seasonings', sub: 'herb', price: 11, gold: 'Garden herb blend', little: 'A little garden in every pinch', color: '#4A6A3C' },
  { slug: 'smoked', name: 'Smoked Sea Salt', cat: 'seasonings', sub: 'finish', price: 16, gold: 'Smoky finishing salt', little: 'A little smoke goes a long way', color: '#5E4636' },
  { slug: 'chili-lime', name: 'Chili Lime Salt', cat: 'seasonings', sub: 'bright', price: 12, gold: 'Zesty chili blend', little: 'A bright little kick', color: '#A8402A' },
  { slug: 'truffle', name: 'Truffle Salt', cat: 'seasonings', sub: 'finish', price: 18, gold: 'Earthy finishing salt', little: 'A little everyday luxury', color: '#3E4440' },
  { slug: 'garlic', name: 'Garlic Salt', cat: 'seasonings', sub: 'herb', price: 11, gold: 'Savory garlic blend', little: 'Make every pinch count', color: '#9A7A3E' },
  { slug: 'citrus', name: 'Citrus Salt', cat: 'seasonings', sub: 'bright', price: 18, gold: 'Bright citrus blend', little: 'A little sunshine in every pinch', color: '#B8902A' },
  { slug: 'white-pepper', name: 'White Pepper', cat: 'spices', sub: 'pepper', price: 11, gold: 'Mellow pepper warmth', little: 'A quiet little kick', color: '#6E6A60' },
  { slug: 'green-pepper', name: 'Green Pepper', cat: 'spices', sub: 'pepper', price: 9, gold: 'Bright pepper bite', little: 'A fresh twist on flavor', color: '#4E6B3A' },
  { slug: 'pink-pepper', name: 'Pink Pepper', cat: 'spices', sub: 'pepper', price: 15, gold: 'Delicate peppery notes', little: 'A pretty little finish', color: '#A8455E' },
  { slug: 'pepper-medley', name: 'Pepper Medley', cat: 'spices', sub: 'pepper', price: 10, gold: 'Colorful pepper medley', little: 'A little of everything', color: '#5E4A6E' },
  { slug: 'cayenne', name: 'Cayenne', cat: 'spices', sub: 'chile', price: 8, gold: 'Fiery chili heat', little: 'A little goes a long way', color: '#B2401E' },
  { slug: 'crushed-red', name: 'Crushed Red Pepper', cat: 'spices', sub: 'chile', price: 7, gold: 'Classic chili flakes', little: 'Turn up the everyday', color: '#A2321E' },
  { slug: 'chipotle', name: 'Chipotle', cat: 'spices', sub: 'chile', price: 9, gold: 'Smoky chili depth', little: 'Smoke with a little spark', color: '#7A3A24' },
  { slug: 'ancho', name: 'Ancho', cat: 'spices', sub: 'chile', price: 9, gold: 'Rich mellow chili', little: 'Big flavor, gentle warmth', color: '#6E2A22' },
  { slug: 'sweet-paprika', name: 'Sweet Paprika', cat: 'spices', sub: 'chile', price: 8, gold: 'Mild, sweet red pepper', little: 'Color in every pinch', color: '#B8432A' },
  { slug: 'smoked-paprika', name: 'Smoked Paprika', cat: 'spices', sub: 'chile', price: 9, gold: 'Oak-smoked red pepper', little: 'Campfire in a jar', color: '#8E3420' },
  { slug: 'chili-powder', name: 'Chili Powder', cat: 'spices', sub: 'chile', price: 8, gold: 'Classic chili blend', little: 'Chili night, sorted', color: '#9C3A22' },
  { slug: 'garlic-powder', name: 'Garlic Powder', cat: 'spices', sub: 'staple', price: 9, gold: 'Ground dried garlic', little: 'The everyday essential', color: '#B39A6A' },
  { slug: 'onion-powder', name: 'Onion Powder', cat: 'spices', sub: 'staple', price: 8, gold: 'Ground dried onion', little: 'Quiet, savory depth', color: '#A88F64' },
  { slug: 'cumin', name: 'Ground Cumin', cat: 'spices', sub: 'staple', price: 8, gold: 'Warm, earthy seed', little: 'Tacos’ best friend', color: '#8A6236' },
  { slug: 'turmeric', name: 'Turmeric', cat: 'spices', sub: 'staple', price: 9, gold: 'Golden ground root', little: 'A little sunshine', color: '#C58A1C' },
  { slug: 'ginger', name: 'Ground Ginger', cat: 'spices', sub: 'staple', price: 9, gold: 'Bright, warm root', little: 'A gentle bite', color: '#B98A4A' },
  { slug: 'cinnamon', name: 'Ceylon Cinnamon', cat: 'spices', sub: 'warm', price: 10, gold: 'True, delicate cinnamon', little: 'Sweet and soft', color: '#8C4A2A' },
  { slug: 'nutmeg', name: 'Nutmeg', cat: 'spices', sub: 'warm', price: 12, gold: 'Whole nutmeg for grating', little: 'Holiday in a pinch', color: '#7A5034' },
  { slug: 'oregano', name: 'Oregano', cat: 'spices', sub: 'herb', price: 8, gold: 'Mediterranean dried leaf', little: 'Pizza night', color: '#5A6B34' },
  { slug: 'thyme', name: 'Thyme', cat: 'spices', sub: 'herb', price: 8, gold: 'Dried garden thyme', little: 'Roasts and soups', color: '#6A7A44' },
  { slug: 'bay-leaves', name: 'Bay Leaves', cat: 'spices', sub: 'herb', price: 9, gold: 'Whole Turkish bay', little: 'Slow-simmer magic', color: '#4E6A3A' },
  { slug: 'jalapeno', name: 'Jalapeño', cat: 'spices', sub: 'chile', price: 10, gold: 'Bright green chili', little: 'A lively little kick', color: '#4E7A32' },
].map(x => ({ ...x, img: NO_PHOTO.has(x.slug) ? null : `img/soon-${x.slug}.jpg` }));

/* Ratings come from REVIEWS (below). With none, cards say "No reviews yet".
   Allergen lines are drafts: Ryan to confirm against each supplier's allergen statement. */
/* reviews: real ones only, after a person reads them. At launch: a Shopify reviews app (Judge.me or Okendo)
   fills this from verified orders. { stars 1–5, name, title, body, date 'YYYY-MM-DD', verified } */
const REVIEWS = {};
const ratingOf = slug => { const r = REVIEWS[slug] || []; return r.length ? { avg: r.reduce((a, x) => a + x.stars, 0) / r.length, n: r.length } : null; };
const findBlend = s => BLENDS.find(b => b.slug === s);
const findExtra = s => EXTRAS.find(e => e.slug === s);
const findComing = s => COMING.find(e => e.slug === s);

/* ---------- ingredients: one page each, permanent URLs for QR codes ----------
   ingredient.html?i=<slug>  ·  QR short link /i/<slug>  (stubs in /i/, see ../QR-CODES.md)
   "what" and "from" are plain, general facts; "how" lines are drafts for Ryan to confirm. */
const ING_INFO = {
  'Australian Ocean Sea Salt': { slug: 'australian-sea-salt', img: 'img/australian-ocean-salt-detail.png', imgNote: 'Sea-salt material illustration; not a harvest-site photograph.', kind: 'Salt', aka: ['Australian ocean sea salt', 'Australian sea salt', 'ocean sea salt', 'sea salt'],
    what: 'Sodium chloride crystallised from seawater, with the trace minerals that come with it.',
    from: 'The cold coastal waters of Australia. Harvest site and producer: Ryan to confirm.',
    how: ['Seawater evaporated by sun and wind into crystals [to confirm]', 'Washed, dried and milled to a fine, even grain [to confirm]', 'Every lot tested before blending [proposed standard]'] },
  'Psyllium Husk': { slug: 'psyllium-husk', kind: 'Plant fiber', aka: ['psyllium'],
    what: 'The outer husk of seeds from the Plantago ovata plant — a soluble fiber that has been part of kitchens and wellness routines for generations.',
    from: 'Grown mainly in India. Supplier: Ryan to confirm.' },
  'White Chia Seed': { slug: 'white-chia', kind: 'Plant fiber', aka: ['white chia', 'chia'],
    what: 'Seeds of Salvia hispanica, milled with most of the oil pressed out, leaving a fine flour rich in fiber and plant protein.',
    from: 'Chia is grown mainly in South America and Mexico. Supplier: Ryan to confirm.' },
  'Golden Flax Seed': { slug: 'golden-flax', kind: 'Plant fiber', aka: ['golden flax', 'flax'],
    what: 'Milled seeds of the golden variety of Linum usitatissimum, a whole-food source of fiber.',
    from: 'Grown in North America, among other places. Supplier: Ryan to confirm.' },
  'Acacia Fiber': { slug: 'acacia-fiber', kind: 'Plant fiber', aka: ['acacia fiber', 'acacia'],
    what: 'A soluble fiber from the dried sap of Acacia senegal trees, also known as gum arabic. It dissolves without changing taste.',
    from: 'Harvested mainly in Africa’s Sahel region. Supplier: Ryan to confirm.' },
  'L-Glutamine': { slug: 'l-glutamine', kind: 'Amino acid', aka: ['L-glutamine', 'glutamine'],
    what: 'One of the most common amino acids in the body and in protein-rich foods.',
    from: 'Typically made by fermentation. Supplier: Ryan to confirm.' },
  'Magnesium Glycinate': { slug: 'magnesium-glycinate', kind: 'Mineral', aka: ['magnesium glycinate'],
    what: 'Magnesium bound to the amino acid glycine — a gentle, well-tolerated form of magnesium.',
    from: 'Made by combining a magnesium source with glycine. Supplier: Ryan to confirm.' },
  'Taurine': { slug: 'taurine', kind: 'Amino acid', aka: ['taurine'],
    what: 'An amino acid found naturally in meat, fish and dairy, and widely used in foods and drinks.',
    from: 'Food-grade taurine is typically synthesised. Supplier: Ryan to confirm.' },
  'L-Theanine': { slug: 'l-theanine', kind: 'Amino acid', aka: ['L-theanine', 'theanine'],
    what: 'An amino acid found naturally in tea leaves.',
    from: 'Typically made by fermentation. Supplier: Ryan to confirm.' },
  'Potassium Chloride': { slug: 'potassium-chloride', kind: 'Mineral', aka: ['potassium chloride', 'potassium'],
    what: 'A naturally occurring mineral salt — the potassium counterpart of table salt, used to add potassium alongside sodium.',
    from: 'Mined from ancient mineral deposits. Supplier: Ryan to confirm.' },
  'Magnesium Malate': { slug: 'magnesium-malate', kind: 'Mineral', aka: ['magnesium malate'],
    what: 'Magnesium bound to malic acid, the compound that gives apples their tartness.',
    from: 'Made by combining a magnesium source with malic acid. Supplier: Ryan to confirm.' },
  'L-Citrulline': { slug: 'l-citrulline', kind: 'Amino acid', aka: ['L-citrulline', 'citrulline'],
    what: 'An amino acid first found in watermelon. (Ryan’s ingredient notes say Citrulline Malate — label and site must match.)',
    from: 'Typically made by fermentation. Supplier: Ryan to confirm.' },
  'Tapioca Starch': { slug: 'tapioca-starch', kind: 'Flow aid', aka: ['tapioca starch', 'tapioca'],
    what: 'A fine starch from the cassava root, used in tiny amounts so the blend pours freely instead of clumping.',
    from: 'Cassava is grown across the tropics. Supplier: Ryan to confirm.' },
};
const INGREDIENTS = [];
BLENDS.forEach(b => b.ingredients.forEach(i => {
  let ing = INGREDIENTS.find(x => x.name === i.name);
  if (!ing) { ing = { ...i, ...(ING_INFO[i.name] || {}), blends: [] }; ing.img = ing.img || `img/ingredients/${ing.slug}.jpg`; INGREDIENTS.push(ing); }
  ing.blends.push(b.slug);
}));
const findIng = s => INGREDIENTS.find(i => i.slug === s);

/* where the salt comes from — the foundation, and sources we're exploring */
const SALT_SOURCES = [
  { slug: 'australian-sea-salt', img: 'img/australian-ocean-salt-detail.png', imgAlt: "Illustration of coarse white sea-salt crystals beside clear blue brine", imgNote: "Sea-salt material illustration; not a harvest-site photograph.", name: 'Australian Ocean Sea Salt', status: 'In every blend today', now: true,
    line: 'Clean, cold-water sea salt from the Australian coast. Bright and mineral, with a smooth, familiar taste.' },
  { slug: 'himalayan', img: 'img/himalayan-pink-salt-macro.png', imgAlt: "Illustration of layered pink rock salt with naturally broken crystalline surfaces", imgNote: "Pink rock-salt material illustration; not a mine photograph.", name: 'Himalayan Pink Salt', place: 'Punjab, Pakistan', status: 'Coming soon',
    line: 'Rock salt mined from ancient seabed deposits in the Salt Range, pink from its iron-rich trace minerals.' },
  { slug: 'great-salt-lake', img: 'img/utah-bonneville-overhead-texture.png', imgAlt: "Illustration of white polygonal salt crust inspired by an overhead view of Bonneville, Utah", imgNote: "Bonneville-inspired texture; not a Great Salt Lake harvest-site photo.", name: 'Great Salt Lake Salt', place: 'Utah — our backyard', status: 'Coming soon',
    line: 'Solar-evaporated from the brine of the Great Salt Lake, an hour from our kitchen in Park City.' },
];

/* Discovery options by shelf: salts now, seasonings and spices when they launch (set available: true). */
const DISCOVERY = {   // anything sold as a single-serve packet can be picked; the price is per five
  salt: { label: 'Salts', price: 15, items: BLENDS.map(b => ({ slug: b.slug, name: b.name, tag: b.tag, color: b.color, img: `img/packet-${b.slug}.png`, available: true })) },
  seasonings: { label: 'Seasonings', price: 18, soon: true, items: SEASONINGS.filter(x => x.cat === 'seasonings').map(x => ({ slug: x.slug, name: x.name, tag: x.gold, color: x.color, img: x.img, available: false })) },
  spices: { label: 'Spices', price: 18, soon: true, items: SEASONINGS.filter(x => x.cat === 'spices').map(x => ({ slug: x.slug, name: x.name, tag: x.gold, color: x.color, img: x.slug === 'awaken-pepper' ? 'img/packet-awaken.png' : x.img, available: false })) },
};

/* the team — roles and bios to confirm; photos go in img/team/<slug>.jpg */
const TEAM = [
  { slug: 'brooklyn-sapp', name: 'Brooklyn Sapp', role: 'The face of Sapphire', face: true, photo: null,
    bio: 'Brooklyn is the face of Sapphire Salt & Spice, the Park City salt company her dad, Ryan, started. She’s who you’ll meet at markets, on our pages and in your inbox.' },
  { slug: 'ryan-sapp', name: 'Ryan Sapp', role: 'Founder', bio: 'Brooklyn’s dad. Ryan started Sapphire with one question: what if salt did a little more?' },
  { slug: 'lyndi-rose', name: 'Lyndi Rose', role: '', bio: '' },
  { slug: 'jimmy-rose', name: 'Jimmy Rose', role: '', bio: '' },
  { slug: 'open-1', name: 'Could be you', role: 'Markets & events', open: true },
  { slug: 'open-2', name: 'Could be you', role: 'Retail & restaurant sales', open: true },
];
