/* Public preview: partner prices are hidden. Approved retailers see real pricing after sign-in. */
window.TRADE = {
  demo: true,
  kit: { price: 0, retail: 654 },
  jar: { '4oz': 0, '16oz': 0 },
  lines: [
    ['4 oz jar, any blend', 0, 14], ['16 oz jar, any blend', 0, 28], ['Discovery Collection', 0, 15],
    ['Kindness Card', 'Included in kit', 5], ['Walnut display stand', 'Included in kit', null],
  ],
  displays: [
    ['The Display Collection — all ten jars + walnut stand', 0, 299, 'Sells to the public at $249'],
    ['The Engraved Display — your shop name or logo', 0, 339, 'Engraving and proof included'],
    ['Walnut display stand, empty', 0, 89, 'Holds 5 × 4 oz + 5 × 16 oz, extra jars on the back shelf'],
    ['Walnut tabletop module, empty', 0, 39, 'Any of five: sachets, sticks, napkins, menu sign or 4 oz jar; magnets join them'],
  ],
  minimum: 'Terms shared with approved retail partners.',
};
