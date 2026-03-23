// ============================================================
// state.js — Application state object and trait lookup maps.
// Depends on: traits.js (CK3_TRAITS)
// ============================================================

'use strict';

// ── Application state ─────────────────────────────────────────
const state = {
  // Identity
  name:        '',
  nickname:    '',
  age:         '',
  pronouns:    '',
  orientation: '',
  race:        'human',

  // Appearance
  height:    170,
  weight:    50,
  skinTone:  null,     // hex string
  skinHex:   '#c68642',
  eyeColor:  null,     // label string
  hairColor: null,     // label string
  hairStyle: null,     // label string

  // Traits
  selectedTraits: new Set(),
  collapsedCats:  new Set(),

  // UI filter state
  searchQuery:    '',
  filterCost:     'all',
  filterCat:      'all',
  filterSelected: false,
};

// ── Trait lookup maps (populated by initTraitMaps) ────────────
const traitById     = {};   // id → trait object
const traitsByGroup = {};   // group id → [trait, …]
const traitsByCat   = {};   // category → [trait, …]

function initTraitMaps() {
  for (const t of CK3_TRAITS) {
    traitById[t.id] = t;

    if (!traitsByCat[t.category]) traitsByCat[t.category] = [];
    traitsByCat[t.category].push(t);

    if (t.group) {
      if (!traitsByGroup[t.group]) traitsByGroup[t.group] = [];
      traitsByGroup[t.group].push(t);
    }
  }
  // Sort grouped traits by level
  for (const g of Object.values(traitsByGroup)) {
    g.sort((a, b) => (a.level || 0) - (b.level || 0));
  }
}

function collapseAllCats() {
  state.collapsedCats.clear();
  for (const cat of Object.keys(traitsByCat)) {
    state.collapsedCats.add(cat);
  }
}
