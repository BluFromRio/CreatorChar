// ============================================================
// app.js — Character Codex: CK3-Inspired Book Character Creator
// ============================================================

'use strict';

// ── CONFIG ──────────────────────────────────────────────────
// Edit these values to tune balance.
const CONFIG = {
  POINT_BUDGET: 600,          // Starting point pool
  // Optional per-category limits (null = unlimited)
  // e.g. { personality: 5, congenital: 4 }
  CAT_LIMITS: {
    personality: 5,
    education: 1,             // One education "tier" per group
    lifestyle: 4,
    congenital: null,
    health: 3,
    commander: 3,
    childhood: 2,
    fame: 3,
    magic_elements: null,     // enforced by isBlockedByMagicRules instead
    other: null,
  },
  // Negative cost refund cap: null = unlimited (negative traits always refund)
  // Set to e.g. 100 to cap total refunds from negative traits
  NEG_REFUND_CAP: null,
};

// ── RACE DATA ────────────────────────────────────────────────
// Base stat values by race — covers all three stat categories.
// Education: CK3-style (3–7 range per race). Core Stats: 1–6 range.
// Skills all start at 0 for every race (skills are built through traits).
// A few iconic racial skill bonuses are applied directly here.
const RACE_BASES = {
  human: {
    // Education — balanced
    diplomacy: 5, martial: 5, stewardship: 5, intrigue: 5, learning: 5, prowess: 5,
    // Core Stats — balanced
    strength: 3, dexterity: 3, constitution: 3, intelligence: 3, wisdom: 3, charisma: 3,
    // Skills — all 0; humans have no innate skill bias
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 0,
    arcana: 0, history: 0, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 0, sleight_of_hand: 0, stealth: 0,
    deception: 0, performance: 0, persuasion: 0,
  },
  elf: {
    // Education — agile mind, poor martial/stewardship
    diplomacy: 6, martial: 4, stewardship: 3, intrigue: 6, learning: 7, prowess: 4,
    // Core Stats — high Int/Wis/Cha/Dex, low Str/Con
    strength: 1, dexterity: 5, constitution: 2, intelligence: 5, wisdom: 4, charisma: 4,
    // Skills — keen senses and natural stealth
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 0,
    arcana: 0, history: 0, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 1, sleight_of_hand: 0, stealth: 1,
    deception: 0, performance: 0, persuasion: 0,
  },
  dwarf: {
    // Education — strong martial/stewardship, weak diplomacy/intrigue
    diplomacy: 4, martial: 6, stewardship: 7, intrigue: 3, learning: 4, prowess: 6,
    // Core Stats — high Str/Con, low Dex/Int/Cha
    strength: 5, dexterity: 2, constitution: 6, intelligence: 2, wisdom: 3, charisma: 1,
    // Skills — stonecunning gives a boost to history
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 0,
    arcana: 0, history: 1, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 0, sleight_of_hand: 0, stealth: 0,
    deception: 0, performance: 0, persuasion: 0,
  },
  half_elf: {
    // Education — balanced lean toward learning/intrigue
    diplomacy: 5, martial: 5, stewardship: 4, intrigue: 5, learning: 6, prowess: 5,
    // Core Stats — high Cha, otherwise moderate
    strength: 2, dexterity: 3, constitution: 2, intelligence: 3, wisdom: 3, charisma: 4,
    // Skills — social flexibility
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 0,
    arcana: 0, history: 0, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 0, sleight_of_hand: 0, stealth: 0,
    deception: 0, performance: 0, persuasion: 1,
  },
  half_dwarf: {
    // Education — physical lean
    diplomacy: 5, martial: 6, stewardship: 5, intrigue: 4, learning: 5, prowess: 5,
    // Core Stats — high Con/Str, low Dex
    strength: 4, dexterity: 2, constitution: 4, intelligence: 2, wisdom: 3, charisma: 2,
    // Skills — hardy survivor
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 1,
    arcana: 0, history: 0, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 0, sleight_of_hand: 0, stealth: 0,
    deception: 0, performance: 0, persuasion: 0,
  },
};

const RACE_LABELS = {
  human:      'Human',
  elf:        'Elf',
  dwarf:      'Dwarf',
  half_elf:   'Half-Elf',
  half_dwarf: 'Half-Dwarf',
};

// ── APPEARANCE DATA ─────────────────────────────────────────
const SKIN_TONES = [
  { hex: '#fde8d0', label: 'Porcelain' },
  { hex: '#f5d0a9', label: 'Ivory' },
  { hex: '#f0c090', label: 'Fair' },
  { hex: '#e8b080', label: 'Light' },
  { hex: '#d4956a', label: 'Beige' },
  { hex: '#c4845a', label: 'Sand' },
  { hex: '#b87048', label: 'Warm' },
  { hex: '#a06038', label: 'Tan' },
  { hex: '#8a5030', label: 'Caramel' },
  { hex: '#7a4028', label: 'Brown' },
  { hex: '#623020', label: 'Deep Brown' },
  { hex: '#4a2018', label: 'Dark Brown' },
  { hex: '#381408', label: 'Ebony' },
  { hex: '#200c04', label: 'Deep Ebony' },
];

const EYE_COLORS = [
  { hex: '#1a1008', label: 'Black' },
  { hex: '#3d2010', label: 'Dark Brown' },
  { hex: '#6b3820', label: 'Brown' },
  { hex: '#8b5a30', label: 'Hazel' },
  { hex: '#c08040', label: 'Amber' },
  { hex: '#6b8a30', label: 'Green' },
  { hex: '#3a6a30', label: 'Forest Green' },
  { hex: '#3060a0', label: 'Blue' },
  { hex: '#5080c0', label: 'Sky Blue' },
  { hex: '#7090b0', label: 'Steel Blue' },
  { hex: '#888888', label: 'Gray' },
  { hex: '#7070c0', label: 'Violet' },
];

const HAIR_COLORS = [
  { hex: '#0a0806', label: 'Black' },
  { hex: '#2a1a10', label: 'Dark Brown' },
  { hex: '#4a2c18', label: 'Brown' },
  { hex: '#7a4c28', label: 'Light Brown' },
  { hex: '#e0c060', label: 'Blonde' },
  { hex: '#c8a840', label: 'Dirty Blonde' },
  { hex: '#a04020', label: 'Auburn' },
  { hex: '#c03020', label: 'Red' },
  { hex: '#c0b0a0', label: 'Gray' },
  { hex: '#e8e0d8', label: 'White' },
  { hex: '#c8d0d8', label: 'Silver' },
];

const HAIR_STYLES = [
  'Bald', 'Buzz Cut', 'Short Straight', 'Short Wavy', 'Short Curly',
  'Medium Straight', 'Medium Wavy', 'Medium Curly',
  'Long Straight', 'Long Wavy', 'Long Curly',
  'Ponytail', 'High Bun', 'Low Bun', 'Half-Up',
  'Braid', 'Double Braids', 'Crown Braid',
  'Locs', 'Afro', 'Shaved Sides', 'Undercut',
];

const WEIGHT_LABELS = [
  [0,  10,  'Very Lean'],
  [11, 30,  'Lean'],
  [31, 45,  'Slender'],
  [46, 55,  'Medium'],
  [56, 70,  'Stocky'],
  [71, 85,  'Heavy'],
  [86, 100, 'Very Heavy'],
];

// ── CATEGORY DISPLAY CONFIG ─────────────────────────────────
const CATEGORY_META = {
  personality:    { label: 'Personality',     order: 1 },
  education:      { label: 'Education',       order: 2 },
  lifestyle:      { label: 'Lifestyle',       order: 3 },
  congenital:     { label: 'Congenital',      order: 4 },
  health:         { label: 'Health',          order: 5 },
  commander:      { label: 'Commander',       order: 6 },
  childhood:      { label: 'Childhood',       order: 7 },
  fame:           { label: 'Fame & Vices',    order: 8 },
  magic_elements: { label: 'Magic Elements',  order: 9 },
  other:          { label: 'Other',           order: 10 },
};

// ── STATE ────────────────────────────────────────────────────
const state = {
  // Appearance
  name:        '',
  nickname:    '',
  age:         '',
  pronouns:    '',
  height:      170,
  weight:      50,
  skinTone:    null,     // hex string
  eyeColor:    null,     // label string
  hairColor:   null,     // label string
  hairStyle:   null,     // label string
  skinHex:     '#c68642',
  race:        'human',

  // Traits
  selectedTraits: new Set(),   // Set of trait ids
  collapsedCats:  new Set(),   // collapsed category names

  // UI filter state
  searchQuery:  '',
  filterCost:   'all',
  filterCat:    'all',
  filterSelected: false,
};

// ── TRAIT INDEX ──────────────────────────────────────────────
// Build lookup maps from the CK3_TRAITS array (defined in traits.js)
const traitById   = {};
const traitsByGroup = {};
const traitsByCat   = {};

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

// ── RACE HELPER ──────────────────────────────────────────────
function getRaceBase() {
  return RACE_BASES[state.race] || RACE_BASES.human;
}

// ── POINT CALCULATION ────────────────────────────────────────
function calcPointsSpent() {
  let spent = 0;
  for (const id of state.selectedTraits) {
    const t = traitById[id];
    if (t && t.cost !== null) spent += t.cost;
  }
  return spent;
}

function getPointsRemaining() {
  return CONFIG.POINT_BUDGET - calcPointsSpent();
}

// ── OPPOSITION CHECK ────────────────────────────────────────
function isBlockedByOpposites(traitId) {
  const t = traitById[traitId];
  if (!t) return false;

  // Check if any selected trait is an opposite of this trait
  for (const selId of state.selectedTraits) {
    const sel = traitById[selId];
    if (!sel) continue;
    if (sel.opposites && sel.opposites.includes(traitId)) return true;
    // Check if this trait's opposites include selId
    if (t.opposites && t.opposites.includes(selId)) return true;
  }
  return false;
}

// Check if trait would exceed group limit (only one per group)
function isBlockedByGroup(traitId) {
  const t = traitById[traitId];
  if (!t || !t.group) return false;
  for (const selId of state.selectedTraits) {
    if (selId === traitId) continue;
    const sel = traitById[selId];
    if (sel && sel.group === t.group) return true;
  }
  return false;
}

// Check per-category limit
function isBlockedByCatLimit(traitId) {
  const t = traitById[traitId];
  if (!t) return false;
  const limit = CONFIG.CAT_LIMITS[t.category];
  if (!limit) return false;
  let count = 0;
  for (const selId of state.selectedTraits) {
    if (selId === traitId) continue;
    const sel = traitById[selId];
    if (sel && sel.category === t.category) count++;
  }
  return count >= limit;
}

// Check if adding this trait would exceed point budget
function isBlockedByBudget(traitId) {
  const t = traitById[traitId];
  if (!t || t.cost === null || t.cost <= 0) return false;
  if (state.selectedTraits.has(traitId)) return false;
  return (calcPointsSpent() + t.cost) > CONFIG.POINT_BUDGET;
}

// ── MAGIC ELEMENT ENFORCEMENT ─────────────────────────────
const MAGIC_BASE_ELEMENTS  = ['elem_earth', 'elem_fire', 'elem_water', 'elem_wind'];
const MAGIC_COMBO_ELEMENTS = ['elem_ice', 'elem_magma', 'elem_lightning', 'elem_nature'];
const MAGIC_RARE_ELEMENTS  = ['elem_light', 'elem_dark'];
const MAGIC_ALL_ELEMENTS   = [...MAGIC_BASE_ELEMENTS, ...MAGIC_COMBO_ELEMENTS, ...MAGIC_RARE_ELEMENTS];

// Prerequisite base elements required for each combination element
const MAGIC_COMBO_REQS = {
  elem_ice:       ['elem_water', 'elem_wind'],
  elem_magma:     ['elem_fire',  'elem_earth'],
  elem_lightning: ['elem_fire',  'elem_wind'],
  elem_nature:    ['elem_earth', 'elem_water'],
};

function isBlockedByMagicRules(traitId) {
  if (!MAGIC_ALL_ELEMENTS.includes(traitId)) return false;

  // All elements require Magic Affinity
  if (!state.selectedTraits.has('magic_affinity')) return true;

  // Combo elements require both base prerequisites to already be selected
  if (MAGIC_COMBO_REQS[traitId]) {
    const reqs = MAGIC_COMBO_REQS[traitId];
    if (!reqs.every(r => state.selectedTraits.has(r))) return true;
  }

  const hasTalentedMage   = state.selectedTraits.has('talented_mage');
  const selectedElements  = MAGIC_ALL_ELEMENTS.filter(e => state.selectedTraits.has(e));
  const selectedBase      = MAGIC_BASE_ELEMENTS.filter(e => state.selectedTraits.has(e));
  const selectedCombo     = MAGIC_COMBO_ELEMENTS.filter(e => state.selectedTraits.has(e));
  const selectedRare      = MAGIC_RARE_ELEMENTS.filter(e => state.selectedTraits.has(e));

  if (!hasTalentedMage) {
    // Without Talented Mage: only 1 element total allowed
    return selectedElements.length >= 1;
  }

  // With Talented Mage: allow 2 base + 1 matching combo; rare elements stay solo
  const isRare  = MAGIC_RARE_ELEMENTS.includes(traitId);
  const isBase  = MAGIC_BASE_ELEMENTS.includes(traitId);
  const isCombo = MAGIC_COMBO_ELEMENTS.includes(traitId);

  if (isRare) {
    // Rare elements cannot be combined with other elements even with Talented Mage
    return selectedElements.length >= 1;
  }
  if (isBase) {
    if (selectedRare.length >= 1) return true;   // rare already selected
    if (selectedBase.length >= 2) return true;   // already have 2 bases
  }
  if (isCombo) {
    if (selectedRare.length >= 1) return true;   // rare already selected
    if (selectedCombo.length >= 1) return true;  // only 1 combo allowed
  }
  return false;
}

function canSelect(traitId) {
  if (state.selectedTraits.has(traitId)) return true; // can always deselect
  return (
    !isBlockedByOpposites(traitId) &&
    !isBlockedByGroup(traitId) &&
    !isBlockedByCatLimit(traitId) &&
    !isBlockedByBudget(traitId) &&
    !isBlockedByMagicRules(traitId)
  );
}

// ── COMPATIBILITY SCORE ─────────────────────────────────────
function getCompatScore(traitId) {
  let score = 0;
  const t = traitById[traitId];
  if (!t) return 0;
  for (const selId of state.selectedTraits) {
    if (selId === traitId) continue;
    if (t.compat && t.compat[selId] !== undefined) score += t.compat[selId];
    const sel = traitById[selId];
    if (sel && sel.compat && sel.compat[traitId] !== undefined) score += sel.compat[traitId];
  }
  return score;
}

// ── TRAIT TOGGLE ─────────────────────────────────────────────
function toggleTrait(traitId) {
  if (state.selectedTraits.has(traitId)) {
    state.selectedTraits.delete(traitId);
  } else {
    if (!canSelect(traitId)) return; // hard block
    state.selectedTraits.add(traitId);
  }
  renderAll();
}

// ── RENDER HELPERS ───────────────────────────────────────────
function costClass(cost) {
  if (cost === null || cost === undefined) return 'null';
  if (cost > 0) return 'positive';
  if (cost < 0) return 'negative';
  return 'zero';
}

function costLabel(cost) {
  if (cost === null || cost === undefined) return '?';
  if (cost > 0) return `+${cost}`;
  return `${cost}`;
}

function getWeightLabel(val) {
  for (const [lo, hi, label] of WEIGHT_LABELS) {
    if (val >= lo && val <= hi) return label;
  }
  return 'Medium';
}

// ── RENDER: BUDGET ───────────────────────────────────────────
function renderBudget() {
  const spent    = calcPointsSpent();
  const remaining = CONFIG.POINT_BUDGET - spent;
  const pct      = Math.min(100, (spent / CONFIG.POINT_BUDGET) * 100);

  document.getElementById('points-remaining').textContent = remaining;
  document.getElementById('points-spent').textContent     = spent;
  document.getElementById('points-total').textContent     = CONFIG.POINT_BUDGET;

  const ring = document.getElementById('budget-ring');
  const bar  = document.getElementById('budget-bar');

  ring.classList.toggle('warning', pct >= 75 && pct < 95);
  ring.classList.toggle('danger',  pct >= 95);
  bar.style.width = pct + '%';
  bar.classList.toggle('over', spent > CONFIG.POINT_BUDGET);
}

// ── RENDER: APPEARANCE SWATCHES ─────────────────────────────
function renderSkinSwatches() {
  const grid = document.getElementById('skin-swatches');
  grid.innerHTML = '';
  for (const { hex, label } of SKIN_TONES) {
    const sw = document.createElement('div');
    sw.className = 'swatch' + (state.skinTone === hex ? ' selected' : '');
    sw.style.background = hex;
    sw.title = label;
    sw.addEventListener('click', () => {
      state.skinTone = hex;
      state.skinHex  = hex;
      document.getElementById('skin-hex').value = hex;
      document.getElementById('skin-hex-preview').style.background = hex;
      renderSkinSwatches();
      renderSummary();
    });
    grid.appendChild(sw);
  }
}

function renderEyeSwatches() {
  const grid = document.getElementById('eye-swatches');
  grid.innerHTML = '';
  for (const { hex, label } of EYE_COLORS) {
    const sw = document.createElement('div');
    sw.className = 'swatch' + (state.eyeColor === label ? ' selected' : '');
    sw.style.background = hex;
    sw.title = label;
    sw.addEventListener('click', () => {
      state.eyeColor = label;
      renderEyeSwatches();
      renderSummary();
    });
    grid.appendChild(sw);
  }
}

function renderHairColorSwatches() {
  const grid = document.getElementById('hair-color-swatches');
  grid.innerHTML = '';
  for (const { hex, label } of HAIR_COLORS) {
    const sw = document.createElement('div');
    sw.className = 'swatch' + (state.hairColor === label ? ' selected' : '');
    sw.style.background = hex;
    sw.title = label;
    sw.addEventListener('click', () => {
      state.hairColor = label;
      renderHairColorSwatches();
      renderSummary();
    });
    grid.appendChild(sw);
  }
}

function renderHairStyleGrid() {
  const grid = document.getElementById('hair-style-grid');
  grid.innerHTML = '';
  for (const style of HAIR_STYLES) {
    const btn = document.createElement('button');
    btn.className = 'style-btn' + (state.hairStyle === style ? ' selected' : '');
    btn.textContent = style;
    btn.addEventListener('click', () => {
      state.hairStyle = style;
      renderHairStyleGrid();
      renderSummary();
    });
    grid.appendChild(btn);
  }
}

// ── RENDER: SELECTED CHIPS STRIP ────────────────────────────
function renderSelectedStrip() {
  const chips = document.getElementById('selected-chips');
  const empty = document.getElementById('strip-empty');
  chips.innerHTML = '';

  if (state.selectedTraits.size === 0) {
    empty.style.display = '';
    return;
  }
  empty.style.display = 'none';

  for (const id of state.selectedTraits) {
    const t = traitById[id];
    if (!t) continue;
    const chip = document.createElement('span');
    chip.className = `trait-chip cost-${costClass(t.cost)}`;
    chip.innerHTML = `${t.label} <span class="chip-remove">✕</span>`;
    chip.title = `${t.label} (${costLabel(t.cost)} pts) — click to remove`;
    chip.addEventListener('click', () => toggleTrait(id));
    chips.appendChild(chip);
  }
}

// ── RENDER: TRAIT BROWSER ────────────────────────────────────
function renderTraitBrowser() {
  const browser = document.getElementById('trait-browser');
  browser.innerHTML = '';

  const search    = state.searchQuery.toLowerCase().trim();
  const costFilter = state.filterCost;
  const catFilter  = state.filterCat;
  const selOnly    = state.filterSelected;

  // Gather categories in order
  const cats = Object.keys(traitsByCat).sort((a, b) => {
    const oa = (CATEGORY_META[a] || {}).order || 99;
    const ob = (CATEGORY_META[b] || {}).order || 99;
    return oa - ob;
  });

  // If filtering to specific cat, only show that one
  const activeCats = catFilter === 'all' ? cats : cats.filter(c => c === catFilter);

  for (const cat of activeCats) {
    const meta = CATEGORY_META[cat] || { label: cat };
    const allTraitsInCat = traitsByCat[cat] || [];

    // Apply filters
    const filtered = allTraitsInCat.filter(t => {
      if (selOnly && !state.selectedTraits.has(t.id)) return false;
      if (search && !t.label.toLowerCase().includes(search) && !t.id.toLowerCase().includes(search)) return false;
      if (costFilter === 'positive' && !(t.cost > 0)) return false;
      if (costFilter === 'negative' && !(t.cost < 0)) return false;
      if (costFilter === 'zero'     && t.cost !== 0) return false;
      return true;
    });

    if (filtered.length === 0) continue;

    const catEl = document.createElement('div');
    catEl.className = 'trait-category';

    const collapsed = state.collapsedCats.has(cat);

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'cat-header' + (collapsed ? ' collapsed' : '');
    hdr.innerHTML = `
      <span class="cat-name">${meta.label}</span>
      <span class="cat-count">${filtered.length}</span>
      <span class="cat-arrow">▼</span>
    `;
    hdr.addEventListener('click', () => {
      if (state.collapsedCats.has(cat)) state.collapsedCats.delete(cat);
      else state.collapsedCats.add(cat);
      renderTraitBrowser();
    });
    catEl.appendChild(hdr);

    // Body
    const body = document.createElement('div');
    body.className = 'cat-body' + (collapsed ? ' hidden' : '');

    // Separate grouped vs ungrouped
    const groupedIds = new Set();
    const groupMap   = {};

    for (const t of filtered) {
      if (t.group) {
        groupedIds.add(t.id);
        if (!groupMap[t.group]) groupMap[t.group] = [];
        groupMap[t.group].push(t);
      }
    }

    // Render group ladders first
    const renderedGroups = new Set();
    for (const t of filtered) {
      if (!t.group || renderedGroups.has(t.group)) continue;
      renderedGroups.add(t.group);

      const groupTraits = (traitsByGroup[t.group] || []).filter(gt =>
        filtered.some(f => f.id === gt.id)
      );
      if (groupTraits.length === 0) continue;

      const groupBlock = document.createElement('div');
      groupBlock.className = 'group-block';

      const glabel = document.createElement('div');
      glabel.className = 'group-label';
      // Make a readable group label
      const gname = t.group
        .replace(/_/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      glabel.textContent = `↳ ${gname}`;
      groupBlock.appendChild(glabel);

      const ladder = document.createElement('div');
      ladder.className = 'group-ladder';

      for (const gt of groupTraits) {
        ladder.appendChild(makeLadderCard(gt));
      }
      groupBlock.appendChild(ladder);
      body.appendChild(groupBlock);
    }

    // Render ungrouped traits as full cards
    for (const t of filtered) {
      if (t.group) continue;
      body.appendChild(makeTraitCard(t));
    }

    catEl.appendChild(body);
    browser.appendChild(catEl);
  }

  if (browser.childElementCount === 0) {
    const empty = document.createElement('div');
    empty.style.cssText = 'padding:2rem;text-align:center;color:var(--text-faint);font-style:italic;';
    empty.textContent = 'No traits match your filters.';
    browser.appendChild(empty);
  }
}

function makeCostBadge(cost) {
  const span = document.createElement('span');
  span.className = `cost-badge ${costClass(cost)}`;
  span.textContent = costLabel(cost);
  return span;
}

function makeCompatDots(traitId) {
  const score = getCompatScore(traitId);
  if (score === 0 || state.selectedTraits.size === 0) return null;

  const wrap = document.createElement('div');
  wrap.className = 'compat-dots';
  wrap.title = score > 0
    ? `Compatibility: +${score} (fits well with selected traits)`
    : `Compatibility: ${score} (tension with selected traits)`;

  const dot = document.createElement('div');
  dot.className = 'compat-dot ' + (score > 0 ? 'good' : 'warn');
  wrap.appendChild(dot);
  return wrap;
}

function makeTraitCard(t) {
  const isSelected = state.selectedTraits.has(t.id);
  const isDisabled = !isSelected && !canSelect(t.id);

  const card = document.createElement('div');
  card.className = 'trait-card'
    + (isSelected ? ' selected' : '')
    + (isDisabled ? ' disabled' : '');

  card.appendChild(makeCostBadge(t.cost));

  const info = document.createElement('div');
  info.className = 'trait-info';
  info.innerHTML = `
    <div class="trait-name">${t.label}</div>
    <div class="trait-id">${t.id}</div>
  `;
  card.appendChild(info);

  const dots = makeCompatDots(t.id);
  if (dots) card.appendChild(dots);

  if (!isDisabled) {
    card.addEventListener('click', () => {
      toggleTrait(t.id);
    });
  } else {
    // Show why disabled on hover
    let reason = '';
    if (isBlockedByMagicRules(t.id))  reason = 'Magic requirements not met';
    else if (isBlockedByOpposites(t.id))   reason = 'Blocked by opposite trait';
    else if (isBlockedByGroup(t.id))  reason = 'Group already selected';
    else if (isBlockedByCatLimit(t.id)) reason = 'Category limit reached';
    else if (isBlockedByBudget(t.id)) reason = 'Not enough points';
    card.title = reason;
  }

  attachTraitTooltip(card, t.id);
  return card;
}

function makeLadderCard(t) {
  const isSelected = state.selectedTraits.has(t.id);
  const isDisabled = !isSelected && !canSelect(t.id);

  const card = document.createElement('div');
  card.className = 'ladder-card'
    + (isSelected ? ' selected' : '')
    + (isDisabled ? ' disabled' : '');

  const costSp = document.createElement('span');
  costSp.style.cssText = `font-family:var(--font-heading);font-size:0.65rem;color:${
    t.cost > 0 ? 'var(--green-light)' : t.cost < 0 ? '#e07070' : 'var(--text-faint)'
  }`;
  costSp.textContent = costLabel(t.cost);

  card.innerHTML = `<span class="trait-name" style="font-size:0.78rem">${t.label}</span>`;
  card.appendChild(costSp);

  if (!isDisabled) {
    card.addEventListener('click', () => toggleTrait(t.id));
  } else {
    let reason = '';
    if (isBlockedByMagicRules(t.id))  reason = 'Magic requirements not met';
    else if (isBlockedByOpposites(t.id))   reason = 'Blocked by opposite trait';
    else if (isBlockedByGroup(t.id))  reason = 'Group: pick one tier only';
    else if (isBlockedByBudget(t.id)) reason = 'Not enough points';
    card.title = reason;
  }

  attachTraitTooltip(card, t.id);
  return card;
}

// ── TRAIT FLAVOR TEXT ────────────────────────────────────────
// Values are strings with {name} replaced at display time.
const TRAIT_FLAVOR = {
  // Education — Intrigue
  education_intrigue_1: '{name} has learned the basics of reading rooms and keeping secrets. A foothold in the shadowy arts.',
  education_intrigue_2: '{name} is no novice in the art of subterfuge. They can read between lines and leave none of their own.',
  education_intrigue_3: '{name} has honed intrigue into a skill few can match. They know who is watching, and who is lying.',
  education_intrigue_4: '{name} commands the shadows with ease. Few schemes unfold without their awareness, or participation.',
  education_intrigue_5: '{name} is a legend in the game of whispers and knives. They did not just learn intrigue — they became it.',
  // Education — Diplomacy
  education_diplomacy_1: '{name} knows the basics of courtesy and negotiation. A start.',
  education_diplomacy_2: '{name} handles negotiations with growing confidence. They leave most tables satisfied.',
  education_diplomacy_3: '{name} is a skilled diplomat — able to defuse tension and forge alliances others thought impossible.',
  education_diplomacy_4: '{name} has mastered the art of the deal, the treaty, and the carefully worded letter.',
  education_diplomacy_5: "{name}'s diplomatic reputation precedes them. They have talked their way out of wars and into legacies.",
  // Education — Stewardship
  education_stewardship_1: '{name} knows the basics of managing a household\'s needs. Someone has to count the grain.',
  education_stewardship_2: '{name} handles resources with growing capability. Nothing goes to waste under their watch.',
  education_stewardship_3: '{name} runs a tight operation. Ledgers balance; supply chains hold; expenses are accounted for.',
  education_stewardship_4: '{name} has mastered the administration of resources. They can make a struggling estate profitable.',
  education_stewardship_5: '{name} is a legend of stewardship. Their mastery of coin and management borders on the miraculous.',
  // Education — Martial
  education_martial_1: '{name} has had basic military training. They know which end of a sword to hold — mostly.',
  education_martial_2: '{name} has a competent grasp of warfare and its demands. Soldiers follow their lead.',
  education_martial_3: '{name} understands tactics, logistics, and the art of the campaign. They are a credible commander.',
  education_martial_4: '{name} commands with expertise. Their armies move with purpose and strike with precision.',
  education_martial_5: '{name} is a martial legend. Their name on the field is worth a hundred swords.',
  // Education — Learning
  education_learning_1: '{name} has had an education — not a grand one, but a start. They read; they question.',
  education_learning_2: '{name} has studied enough to know what they do not know. That is its own kind of wisdom.',
  education_learning_3: '{name} is well-read, well-spoken, and well-regarded in learned circles.',
  education_learning_4: '{name} has mastered multiple fields of knowledge. Their mind is a library with excellent organization.',
  education_learning_5: '{name} is a scholar of legendary stature. The sum of their learning humbles most who meet them.',
  // Personality
  lustful: '{name} is drawn to passion and desire — wherever they walk, hearts follow, and sometimes get broken along the way.',
  chaste: '{name} holds firm to a life of restraint. Whether out of principle or devotion, the flesh holds little temptation for them.',
  gluttonous: 'The finest foods, the fullest cups — {name} never learned the art of enough. A character trait that warms the heart and strains the purse.',
  temperate: '{name} drinks from life in measured sips. Self-discipline is their quiet superpower.',
  greedy: 'Gold speaks first with {name}. Every deal has a price, and they have already calculated theirs.',
  generous: '{name} gives freely — of coin, of time, of warmth. The world is a little brighter for it.',
  lazy: 'Why do today what can be done never? {name} has mastered the art of the comfortable pause.',
  diligent: '{name} does not rest when work remains. Their candles burn late, and their callouses run deep.',
  wrathful: 'Push {name} too far and the calm breaks like a storm. Their anger, when it comes, is not soon forgotten.',
  calm: '{name} weathers every tempest with the patience of old stone. Rarely flustered, rarely shaken.',
  patient: '{name} waits. And waits. And when the moment arrives, they are ready.',
  impatient: 'Waiting is a kind of torture for {name}. The world never moves fast enough for their liking.',
  arrogant: '{name} knows they are exceptional — and is not shy about it. Others may find it grating. {name} calls it honesty.',
  humble: '{name} does not seek the spotlight. They let their deeds speak, quietly and without fanfare.',
  deceitful: '{name} wears many faces. They are not dishonest out of malice perhaps — but the truth is a tool they use sparingly.',
  honest: '{name} speaks plainly, sometimes to a fault. What you see is what you get.',
  craven: "When danger looms, {name}'s feet find themselves eager for the door. Call it survival instinct; others call it cowardice.",
  brave: '{name} walks into the dark without checking for candles first. Courage, or perhaps a lack of imagination.',
  shy: '{name} takes time to warm to strangers. Beneath the quiet, there is often more than meets the eye.',
  gregarious: '{name} never met a room they could not work. Conversation is their native language.',
  ambitious: '{name} eyes every horizon with hunger. Where others see a ceiling, they see a floor.',
  content: '{name} does not chase the wind. They have found peace with who they are and where they stand.',
  arbitrary: "{name}'s decisions can seem unpredictable. They march to a rhythm others can't quite hear.",
  just: '{name} believes in balance. Right and wrong are not abstractions to them — they are standards to be lived by.',
  cynical: '{name} has seen too much to be surprised. The world is what it is, and they are not fooled by its kindnesses.',
  zealous: '{name} is deeply devoted to their faith. Perhaps the light of their god shines brightly on them — or perhaps it burns a little.',
  paranoid: '{name} trusts carefully — perhaps too carefully. Every shadow hides a dagger in their mind.',
  trusting: '{name} sees the good in people, even when they probably should not. An admirable quality, if sometimes a dangerous one.',
  compassionate: "{name} feels the weight of others' suffering. It is not always easy to carry, but they carry it anyway.",
  callous: "{name} does not lose sleep over others' troubles. They have learned to separate emotion from necessity.",
  sadistic: "{name} finds a certain satisfaction in others' pain. A dark corner of the soul that does not get much sunlight.",
  stubborn: '{name} once makes up their mind, kingdoms could not move them. Whether that is strength or flaw depends on the day.',
  fickle: '{name} changes course like wind changes direction — often and without warning. Adaptable, some say. Unreliable, say others.',
  eccentric: '{name} defies easy description. They live by their own logic, and occasionally it is brilliant.',
  vengeful: '{name} does not forget. An offense made against them is quietly filed away and never discarded.',
  forgiving: '{name} lets go of grievances, though not always easily. They believe in second chances.',
  selfless: '{name} gives without tallying the cost. The needs of others weigh heavier than their own, and they have never resented it.',
  self_serving: '{name} tends to their own interests first. It is not malice — it is simply their nature, and a practical one at that.',
  excessive: '{name} does not know when to stop. Whatever they pursue, they pursue with a thoroughness that borders on too much.',
  perceptive: '{name} sees what others miss. The faint tells, the hesitated breath, the slight shift of weight — all filed away quietly.',
  oblivious: '{name} moves through the world with a certain comfortable unawareness. What they do not notice cannot trouble them.',
  stoic: '{name} does not wear their heart on their sleeve. They endure, they persevere, and they rarely show the cost.',
  expressive: '{name} wears every feeling plainly. There is no reading between the lines — what they feel, you will know.',
  calculating: '{name} measures before they cut. Every decision is a puzzle considered carefully before the pieces fall.',
  impulsive: '{name} acts, then thinks. It has served them sometimes. Other times, they are still living with the consequences.',
  worldly: '{name} has moved in enough circles to understand how the world works. Experience does not lie.',
  naive: '{name} has not yet been properly disappointed by the world. There is something almost beautiful in that.',
  fateful: '{name} believes the path was laid before they arrived. They do not resist destiny — they try to read it.',
  defiant: '{name} does not accept what others say must be. Limits, fates, edicts — all of them feel like challenges to them.',
  oathbound: '{name} does not give their word lightly. And when they do, they mean every syllable of it.',
  oathbreaking: '{name} understands that vows are made under circumstances that change. Principles, for them, have flexibility built in.',
  reverent: '{name} carries a deep respect for what came before. Tradition, people, the sacred — they do not treat these things lightly.',
  rude: '{name} says what they mean, and means what they say, at full volume and without ceremony. It is not always welcome.',
  rowdy: '{name} brings the energy of a thunderstorm to any gathering. Not always invited back, but rarely forgotten.',
  charming: '{name} has a way with people. A smile, a word, and the room tilts in their favor.',
  curious: '{name} always wants to know what is around the next corner. Questions follow them like a loyal hound.',
  pensive: '{name} lives much of life inside their own head. Still waters run deep.',
  bossy: '{name} knows how things should be done, and they are not above telling you — at length.',
  irritable: "Patience is not {name}'s virtue. Small aggravations have a way of becoming larger ones.",
  // Lifestyle
  drunkard: 'The cup is never quite empty around {name}. There is warmth in the bottle they do not always find elsewhere.',
  hashishiyah: '{name} has found a certain haze they are not in a hurry to leave. The world is softer, seen through that particular smoke.',
  rakish: '{name} has a reputation. Much of it earned. They seem oddly proud of that.',
  reclusive: '{name} prefers their own company. The world outside is loud and exhausting; within their walls, there is quiet.',
  diplomat: '{name} knows that words are sharper than swords, and far more lasting. They choose them carefully.',
  family_first: '{name} would move mountains for their family. Blood is not merely thicker than water — it is everything.',
  august: '{name} carries themselves with a natural authority. Rooms adjust when they enter.',
  lifestyle_reveler: '{name} knows how to celebrate. Life is short, and they have no intention of watching it pass quietly.',
  lifestyle_blademaster: '{name} has devoted themselves to the edge and its art. The blade is an extension of their will.',
  lifestyle_hunter: 'The hunt sharpens {name} in ways the city never could. They are patient, perceptive, and patient.',
  strategist: '{name} sees the battlefield as a puzzle. Others see chaos; they see the solution.',
  overseer: '{name} has an eye for order. They manage what needs managing and notice what others miss.',
  gallant: '{name} carries the soldier\'s craft in their bearing and the fighter\'s grace in their movement.',
  architect: '{name} sees what could be built where others see only empty space. They dream in stone and timber.',
  administrator: '{name} has a talent for keeping the gears of things turning. Not glamorous — essential.',
  avaricious: '{name} has a gift for accumulation. Coin, land, debts — they keep meticulous track of all of it.',
  schemer: '{name} is always thinking three moves ahead. The game is never quite over for them.',
  seducer: '{name} can make hearts turn like pages. Whether they read them carefully is another matter.',
  torturer: '{name} has extracted secrets from the stubborn. Not a comfortable thought, but a useful one.',
  whole_of_body: '{name} is in excellent health — the kind that seems almost unfair. Their body is a well-maintained instrument.',
  scholar: '{name} has buried themselves in books and emerged wiser for it. The margins of their texts are full of questions.',
  theologian: '{name} wrestles with the divine. They have read the holy texts more carefully than most priests.',
  lifestyle_mystic: '{name} is drawn to the occult edges of the world. Whether they find truth there is anyone\'s guess.',
  lifestyle_physician: "{name} has learned to read the body's language — fever, pulse, pallor. They can sometimes answer it.",
  lifestyle_herbalist: '{name} knows which roots heal and which kill, and the difference matters enormously in their work.',
  lifestyle_gardener: '{name} finds meaning in careful cultivation. There is philosophy in pruning.',
  lifestyle_traveler: '{name} has seen more of the world than most. The road has shaped them.',
  witch: '{name} walks a path most dare not name. Whether the power is real or perceived, people treat it as the same thing.',
  governor: '{name} governs with competence. They know that administration is the quiet cousin of victory.',
  // Congenital & Physical
  beauty_bad_1: '{name} is plain in appearance — which means people often underestimate them. That can be its own advantage.',
  beauty_bad_2: "{name}'s looks draw attention for the wrong reasons. They have learned to lead with everything else.",
  beauty_bad_3: '{name} bears a difficult countenance. The world is not always kind about it.',
  beauty_good_1: '{name} is easy on the eyes — a fact that opens certain doors.',
  beauty_good_2: '{name} turns heads. Beauty like theirs is hard to ignore, which can be a blessing and a burden.',
  beauty_good_3: '{name} is striking. The kind of face that gets written about in letters.',
  intellect_bad_1: "{name}'s thoughts come slowly. They are not fast, but sometimes thoroughness wins the day.",
  intellect_bad_2: '{name} struggles to grasp what others find obvious. Life requires more patience — both from and with them.',
  intellect_bad_3: '{name} has significant intellectual limitations. Others have been known to take advantage of that.',
  intellect_good_1: '{name} catches on quickly. They are sharper than they usually let on.',
  intellect_good_2: '{name} is clearly gifted. Their mind moves with unusual efficiency.',
  intellect_good_3: '{name} has an extraordinary mind. Those around them know it; some find it unnerving.',
  physique_bad_1: '{name} is not built for hardship. They find physical demands taxing in ways others do not.',
  physique_bad_2: "{name}'s body is fragile in notable ways. They manage, but not without effort.",
  physique_bad_3: '{name} is physically weak. They compensate with everything else they have.',
  physique_good_1: '{name} is above average in strength and health. Their body serves them well.',
  physique_good_2: '{name} is notably strong — the kind of strong you notice when they work or fight.',
  physique_good_3: '{name} has been blessed with an exceptional physique. Built for whatever the world demands.',
  pure_blooded: '{name} comes from a line that has been carefully maintained. Their heritage runs clear.',
  fecund: '{name} is remarkably fertile — a fact that has shaped many plans around them, with or without their consent.',
  strong: '{name} possesses uncommon physical strength. It is not something they are shy about putting to use.',
  shrewd: '{name} has a mind for angles. They read situations and people with uncanny accuracy.',
  clubfooted: "{name} carries the mark of clubfoot. It has slowed their body, but rarely their resolve.",
  hunchbacked: '{name} bears a hunch that the world has tried to define them by. They have other ideas.',
  lisping: '{name} speaks with a lisp — a quirk that some find charming, others condescending about. They have learned to navigate.',
  stuttering: "{name}'s words sometimes catch in the throat. It has never stopped them from speaking their mind.",
  dwarf: '{name} is a dwarf among others — different by measure, not by worth.',
  giant: '{name} stands above the crowd in literal terms. It is hard to be overlooked when you tower over the room.',
  inbred: 'The bloodline that produced {name} was perhaps kept too close. There are... complications.',
  weak: '{name} lacks physical robustness. They are not built for the fight, but that is not the only kind of strength.',
  dull: "{name}'s mind works against them at times. Life requires more patience — both from and with them.",
  spindly: '{name} is slight in form, almost fragile-looking. Do not let it fool you.',
  scaly: '{name} bears skin with an unusual texture — something between ordinary and uncanny.',
  albino: '{name} lacks pigment — pale as milk, white-haired, a subject of whispers in certain circles.',
  wheezing: "{name}'s lungs have never been their strongest feature. Every season is a negotiation.",
  bleeder: "{name}'s blood does not clot as it should. Minor wounds become greater concerns.",
  infertile: '{name} cannot bear children. Whether they grieve this, accept it, or see it as freedom is their story to tell.',
  // Health
  scarred: '{name} carries the marks of past conflict on their skin. Each scar is a chapter.',
  eunuch_1: '{name} has been cut — a political or religious act that changed the path of their life.',
  beardless_eunuch: '{name} bears a smooth face and a complicated history.',
  blind: '{name} cannot see the world as others do. They have had to carve their own place in it.',
  // Commander
  logistician: '{name} ensures supplies reach the right place at the right time. The unseen backbone of any campaign.',
  military_engineer: '{name} builds siege engines and fortress plans. They see war as a problem of design.',
  aggressive_attacker: '{name} presses the fight before the enemy finds its footing. Momentum is their weapon.',
  unyielding_defender: '{name} does not break easy. They hold lines others would have abandoned.',
  forder: '{name} has learned to move armies through rivers and difficult terrain without losing half of them along the way.',
  flexible_leader: '{name} adapts to the battlefield\'s demands. A style that cannot be read is hard to counter.',
  desert_warrior: '{name} has learned to fight where others wilt. The desert shapes those who survive it.',
  jungle_stalker: '{name} knows how to vanish and strike in dense terrain. Patience and silence are their weapons.',
  reaver: '{name} fights with a brutality that leaves impressions — not the diplomatic kind.',
  holy_warrior: '{name} fights with faith as a second shield. Whether that makes them stronger or only more certain is a matter of perspective.',
  open_terrain_expert: '{name} excels on open ground — cavalry charges, pitched battles, wide engagements.',
  rough_terrain_expert: '{name} uses broken ground to their advantage. Uneven fields favor the prepared.',
  forest_fighter: '{name} knows how to use trees as cover and shadows as allies.',
  cautious_leader: '{name} does not rush. They fight only when the odds are tilted firmly in their favor.',
  organizer: '{name} ensures the army arrives fed, organized, and on time. That wins more battles than heroics.',
  // Magic
  magic_affinity: '{name} carries something not everyone is born with — an innate attunement to the forces beneath the surface of the world. Magic does not feel foreign to them. It feels like speaking a language they already knew.',
  talented_mage: '{name} has refined their innate gift into something rare. Where most who carry the Affinity sense magic distantly, they have learned to shape it. The breadth of their reach is wider than most will ever know.',
  elem_earth: '{name} has bonded with the element of earth. In stone and root, in stillness and weight, they find both anchor and power. The ground answers when they call.',
  elem_fire: '{name} commands fire. Not in the reckless sense — in the way of someone who has spent time with flame and learned to respect the line between controlled and catastrophic.',
  elem_water: "{name} works with water — patient, adaptable, and quietly unstoppable. It flows where it will, and {name} has learned to guide rather than force it.",
  elem_wind: "{name} has an affinity for wind. It moves without asking permission, and {name}'s understanding of it is equally unceremonious.",
  elem_ice: '{name} has mastered the marriage of water and wind into ice — precise, cold, and terribly effective. It takes a steady hand and a steadier temperament.',
  elem_magma: "{name} commands where earth and fire collide — molten stone and geological fury. It is not subtle. It was never meant to be.",
  elem_lightning: '{name} has bound fire and wind into lightning. Instantaneous, overwhelming, dangerous in every direction. They have learned to manage that last part, mostly.',
  elem_nature: '{name} works the deep harmony between earth and water — growth, restoration, and the long patience of living things. Nature magic does not hurry. Neither does {name}.',
  elem_light: '{name} channels light — not merely illumination but presence, clarity, and the kind of brightness that can comfort or blind in equal measure. It is a heavy thing to carry, but they carry it.',
  elem_dark: '{name} draws on darkness. Not evil in itself, but the absence of ordinary limits — shadow, depth, and the things that live beyond where common sight reaches. It suits them.',
};

// ── TRAIT TOOLTIP SYSTEM ─────────────────────────────────────
let _tooltipTimer = null;

function getTooltipEl() {
  return document.getElementById('trait-tooltip');
}

function getTraitFlavor(traitId) {
  const charName = state.name.trim() || 'This character';
  const template = TRAIT_FLAVOR[traitId];
  if (template) return template.replace(/\{name\}/g, charName);
  // Generic fallback using trait label and category
  const t = traitById[traitId];
  if (!t) return '';
  const catMeta = CATEGORY_META[t.category] || { label: t.category };
  return `${charName} possesses the quality known as "${t.label}" — a ${catMeta.label.toLowerCase()} trait that colors how the world perceives them.`;
}

// ── SHARED TOOLTIP ENGINE ────────────────────────────────────
// All hover tooltips (traits, stats, races) use the same DOM element
// and the same positioning logic.

function showGenericTooltip(title, body, clientX, clientY) {
  const el = getTooltipEl();
  if (!el) return;
  el.innerHTML = `<div class="tooltip-title">${title}</div><div class="tooltip-body">${body}</div>`;
  el.style.visibility = 'hidden';
  el.style.left = '-9999px';
  el.classList.add('visible');
  requestAnimationFrame(() => {
    const w = el.offsetWidth, h = el.offsetHeight, pad = 14;
    let left = clientX + pad, top = clientY + pad;
    if (left + w > window.innerWidth  - pad) left = clientX - w - pad;
    if (top  + h > window.innerHeight - pad) top  = clientY - h - pad;
    el.style.left = left + 'px';
    el.style.top  = top  + 'px';
    el.style.visibility = '';
  });
}

function hideTooltip() {
  const el = getTooltipEl();
  if (el) el.classList.remove('visible');
}

// Trait hover: 1-second delay, resets on mouse movement
function attachTraitTooltip(el, traitId) {
  el.addEventListener('mouseenter', e => {
    clearTimeout(_tooltipTimer);
    const x = e.clientX, y = e.clientY;
    _tooltipTimer = setTimeout(() => {
      const t = traitById[traitId];
      if (t) showGenericTooltip(t.label, getTraitFlavor(traitId), x, y);
    }, 1000);
  });
  el.addEventListener('mousemove', e => {
    clearTimeout(_tooltipTimer);
    hideTooltip();
    const x = e.clientX, y = e.clientY;
    _tooltipTimer = setTimeout(() => {
      const t = traitById[traitId];
      if (t) showGenericTooltip(t.label, getTraitFlavor(traitId), x, y);
    }, 1000);
  });
  el.addEventListener('mouseleave', () => { clearTimeout(_tooltipTimer); hideTooltip(); });
}

// Stat/skill hover: 600 ms delay (informational, faster is friendlier)
function attachStatTooltip(el, statKey) {
  let timer = null;
  el.style.cursor = 'help';
  el.addEventListener('mouseenter', e => {
    timer = setTimeout(() => {
      showGenericTooltip(ALL_STAT_LABELS[statKey], STAT_DESCRIPTIONS[statKey], e.clientX, e.clientY);
    }, 600);
  });
  el.addEventListener('mouseleave', () => { clearTimeout(timer); hideTooltip(); });
}

// Race button hover: 600 ms delay
function attachRaceTooltip(el, raceKey) {
  let timer = null;
  el.addEventListener('mouseenter', e => {
    timer = setTimeout(() => {
      showGenericTooltip(RACE_LABELS[raceKey], RACE_DESCRIPTIONS[raceKey], e.clientX, e.clientY);
    }, 600);
  });
  el.addEventListener('mouseleave', () => { clearTimeout(timer); hideTooltip(); });
}

// ── RENDER: SUMMARY ─────────────────────────────────────────
function renderSummary() {
  // Portrait
  const name = state.name.trim() || '—';
  const initials = state.name.trim()
    ? state.name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  document.getElementById('portrait-name-display').textContent = name;
  document.getElementById('portrait-initials').textContent = initials;

  const sub = [
    state.nickname ? `"${state.nickname}"` : '',
    state.age ? `Age ${state.age}` : '',
    state.pronouns ? `(${state.pronouns})` : '',
  ].filter(Boolean).join(' · ');
  document.getElementById('portrait-subtitle-display').textContent = sub;

  // Skin preview on portrait
  if (state.skinTone) {
    document.getElementById('portrait-circle').style.borderColor = state.skinTone;
    document.getElementById('portrait-initials').style.color = state.skinTone;
  }

  // Appearance summary
  const appearanceDiv = document.getElementById('appearance-summary');
  const heightCm = state.height;
  const heightFt = Math.floor(heightCm / 30.48);
  const heightIn = Math.round((heightCm / 2.54) % 12);
  const rows = [
    ['Race',        RACE_LABELS[state.race] || 'Human'],
    ['Height',      `${heightCm} cm (${heightFt}′${heightIn}″)`],
    ['Build',       getWeightLabel(state.weight)],
    ['Skin',        state.skinTone ? getSkinLabel(state.skinTone) : '—'],
    ['Eyes',        state.eyeColor || '—'],
    ['Hair Color',  state.hairColor || '—'],
    ['Hair Style',  state.hairStyle || '—'],
  ];
  appearanceDiv.innerHTML = rows.map(([k, v]) =>
    `<div class="summary-row"><span class="summary-key">${k}</span><span class="summary-val">${v}</span></div>`
  ).join('');

  // Traits summary grouped by category
  const traitsDiv = document.getElementById('traits-summary');
  if (state.selectedTraits.size === 0) {
    traitsDiv.innerHTML = '<span style="color:var(--text-faint);font-style:italic">No traits selected</span>';
  } else {
    const byCat = {};
    for (const id of state.selectedTraits) {
      const t = traitById[id];
      if (!t) continue;
      if (!byCat[t.category]) byCat[t.category] = [];
      byCat[t.category].push(t);
    }
    let html = '';
    for (const [cat, traits] of Object.entries(byCat)) {
      const meta = CATEGORY_META[cat] || { label: cat };
      html += `<div class="summary-cat-header">${meta.label}</div>`;
      for (const t of traits) {
        const cc = costClass(t.cost);
        const dotColor = cc === 'positive' ? 'var(--green-good)' : cc === 'negative' ? 'var(--crimson)' : 'var(--border-mid)';
        html += `<div class="summary-trait-item">
          <span class="trait-dot" style="background:${dotColor}"></span>
          <span>${t.label}</span>
          <span style="margin-left:auto;font-size:0.72rem;color:var(--text-faint)">${costLabel(t.cost)}</span>
        </div>`;
      }
    }
    traitsDiv.innerHTML = html;
  }

  // Narrative
  renderNarrative();

  // Stat totals
  renderStatTotals();

  // Warnings
  renderWarnings();
}

function getSkinLabel(hex) {
  const match = SKIN_TONES.find(s => s.hex === hex);
  return match ? match.label : hex;
}

// ── RENDER: NARRATIVE TEXT ───────────────────────────────────
function renderNarrative() {
  const narEl = document.getElementById('narrative-text');

  const parts = [];

  // Name intro
  const namePart = state.name.trim()
    ? (state.nickname ? `${state.name.trim()} — known as "${state.nickname}" —` : state.name.trim())
    : 'This character';

  const raceLabel = RACE_LABELS[state.race] || '';
  let intro = `${namePart} is`;
  if (raceLabel && state.race !== 'rat') {
    if (raceLabel && state.race == 'dwarf' || raceLabel && state.race == 'elf') {
      intro += ` an ${raceLabel.toLowerCase()}`;
    }
    else {
      intro += ` a ${raceLabel.toLowerCase()}`;
    }
    if (state.age) intro += ` of ${state.age} years,`;
  } else {
    if (state.age) intro += ` ${state.age} years old,`;
  }

  // Pronouns hint
  const pronounWord = getPronounWord();

  // Physical description
  const bodyParts = [];
  const heightDesc = describeHeight(state.height);
  if (heightDesc) bodyParts.push(heightDesc);

  const buildDesc = getWeightLabel(state.weight).toLowerCase();
  bodyParts.push(`${buildDesc} in build`);

  if (state.skinTone) bodyParts.push(`${getSkinLabel(state.skinTone).toLowerCase()}-skinned`);
  if (state.eyeColor) bodyParts.push(`${state.eyeColor.toLowerCase()}-eyed`);

  if (state.hairStyle || state.hairColor) {
    const hc = state.hairColor ? state.hairColor.toLowerCase() : '';
    const hs = state.hairStyle ? state.hairStyle.toLowerCase() : '';
    if (hc && hs) bodyParts.push(`with ${hc} ${hs} hair`);
    else if (hc)  bodyParts.push(`with ${hc} hair`);
    else if (hs)  bodyParts.push(`with ${hs} hair`);
  }

  if (bodyParts.length > 0) {
    intro += ' ' + bodyParts.join(', ') + '.';
  } else {
    intro += ' yet to be fully described.';
  }

  parts.push(intro);

  // Trait description
  if (state.selectedTraits.size > 0) {
    const selected = [...state.selectedTraits].map(id => traitById[id]).filter(Boolean);

    const personalityTraits = selected.filter(t => t.category === 'personality').map(t => t.label.toLowerCase());
    const otherTraits = selected.filter(t => t.category !== 'personality' && t.category !== 'education').map(t => t.label.toLowerCase());
    const eduTraits = selected.filter(t => t.category === 'education').map(t => t.label);

    if (personalityTraits.length > 0) {
      parts.push(`${pronounWord.cap} is ${listToEnglish(personalityTraits)} by nature.`);
    }

    if (eduTraits.length > 0) {
      if (eduTraits[0].includes('Intrigue')) {
        parts.push(`${pronounWord.cap} received an ${eduTraits[0]} education.`);
      }
      else {
        parts.push(`${pronounWord.cap} received a ${eduTraits[0]} education.`);
      }
    }

    if (otherTraits.length > 0) {
      const known = otherTraits.slice(0, 4);
      parts.push(`${pronounWord.cap} is known for being ${listToEnglish(known)}.`);
    }
  }

  narEl.textContent = parts.join(' ');
}

function describeHeight(cm) {
  if (cm <= 150) return 'very short';
  if (cm <= 163) return 'short';
  if (cm <= 178) return 'average height';
  if (cm <= 190) return 'tall';
  return 'exceptionally tall';
}

function getPronounWord() {
  const p = (state.pronouns || '').toLowerCase();
  if (p.startsWith('he')) return { cap: 'He', lower: 'he', obj: 'him', pos: 'his' };
  if (p.startsWith('she')) return { cap: 'She', lower: 'she', obj: 'her', pos: 'her' };
  return { cap: 'They', lower: 'they', obj: 'them', pos: 'their' };
}

function listToEnglish(items) {
  if (!items.length) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
}

// ── RENDER: WARNINGS ─────────────────────────────────────────
function renderWarnings() {
  const area = document.getElementById('warnings-area');
  const warnings = [];

  const spent = calcPointsSpent();
  if (spent > CONFIG.POINT_BUDGET) {
    warnings.push({
      type: 'budget-warn',
      msg: `Over budget by ${spent - CONFIG.POINT_BUDGET} points! Some traits must be removed.`,
    });
  }

  // Compatibility warnings for selected traits
  const checked = new Set();
  for (const idA of state.selectedTraits) {
    for (const idB of state.selectedTraits) {
      if (idA >= idB || checked.has(idA + idB)) continue;
      checked.add(idA + idB);
      const tA = traitById[idA];
      if (!tA) continue;
      const score = tA.compat[idB];
      if (score !== undefined && score < -15) {
        const tB = traitById[idB];
        warnings.push({
          type: 'compat-warn',
          msg: `Tension: "${tA.label}" and "${tB ? tB.label : idB}" are a poor fit.`,
        });
      }
    }
  }

  if (warnings.length === 0) {
    area.style.display = 'none';
    return;
  }

  area.style.display = '';
  area.innerHTML = warnings.map(w =>
    `<div class="warning-item ${w.type}">${w.msg}</div>`
  ).join('');
}

// ── STAT SYSTEM ───────────────────────────────────────────────
// Three-category structure: Education, Core Stats, General Skills.
//
// Design note — Prowess:
//   Prowess lives only in Education (CK3-style individual combat skill).
//   Strength and Constitution serve as the physical Core Stat equivalents.
//   Skills like Athletics and Intimidation bridge the two systems.
//   There is intentionally no duplicate Prowess in Core Stats.

const STAT_CATEGORIES = {
  education: {
    label: 'Education',
    stats: ['diplomacy', 'martial', 'stewardship', 'intrigue', 'learning', 'prowess'],
  },
  core: {
    label: 'Core Stats',
    stats: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
  },
  skills: {
    label: 'General Skills',
    // Listed in core-stat order for display grouping (see SKILL_CORE_STAT)
    stats: [
      'athletics', 'intimidation',                                         // strength
      'acrobatics', 'sleight_of_hand', 'stealth',                         // dexterity
      'animal_handling', 'survival',                                       // constitution
      'arcana', 'history', 'investigation', 'nature', 'religion',          // intelligence
      'insight', 'medicine', 'perception',                                 // wisdom
      'deception', 'performance', 'persuasion',                            // charisma
    ],
  },
};

// Each skill maps to one governing core stat (used for UI sub-grouping)
const SKILL_CORE_STAT = {
  athletics:       'strength',
  intimidation:    'strength',
  acrobatics:      'dexterity',
  sleight_of_hand: 'dexterity',
  stealth:         'dexterity',
  animal_handling: 'constitution',
  survival:        'constitution',
  arcana:          'intelligence',
  history:         'intelligence',
  investigation:   'intelligence',
  nature:          'intelligence',
  religion:        'intelligence',
  insight:         'wisdom',
  medicine:        'wisdom',
  perception:      'wisdom',
  deception:       'charisma',
  performance:     'charisma',
  persuasion:      'charisma',
};

// Flat label map for every stat across all three categories
const ALL_STAT_LABELS = {
  diplomacy: 'Diplomacy',   martial: 'Martial',       stewardship: 'Stewardship',
  intrigue: 'Intrigue',     learning: 'Learning',      prowess: 'Prowess',
  strength: 'Strength',     dexterity: 'Dexterity',       constitution: 'Constitution',
  intelligence: 'Intelligence', wisdom: 'Wisdom',           charisma: 'Charisma',
  athletics: 'Athletics',   acrobatics: 'Acrobatics',  intimidation: 'Intimidation',
  animal_handling: 'Animal Handling', survival: 'Survival',
  arcana: 'Arcana',         history: 'History',        investigation: 'Investigation',
  nature: 'Nature',         religion: 'Religion',
  insight: 'Insight',       medicine: 'Medicine',      perception: 'Perception',
  sleight_of_hand: 'Sleight of Hand', stealth: 'Stealth',
  deception: 'Deception',   performance: 'Performance', persuasion: 'Persuasion',
};

// Short description shown when hovering a stat or skill name
const STAT_DESCRIPTIONS = {
  diplomacy:       'How well this character navigates politics, negotiation, and the management of alliances.',
  martial:         'How well this character commands themselves and others on the battlefield.',
  stewardship:     'How effectively this character manages resources, estates, and economic affairs.',
  intrigue:        "This character's aptitude for secrecy, manipulation, and the gathering of information.",
  learning:        "The breadth of this character's scholarly knowledge and their capacity to grow it.",
  prowess:         "This character's individual combat skill and physical effectiveness in direct conflict.",
  strength:        'Raw physical power — how hard this character hits, how much they carry, and how imposing they are.',
  dexterity:       'Agility, reflexes, and precision of movement — how nimbly this character navigates the world and avoids danger.',
  constitution:    'Physical resilience and endurance — how long this character can push before their body gives out.',
  intelligence:    'Mental acuity and reasoning — how quickly and deeply this character processes information.',
  wisdom:          'Perceptiveness and intuition — how well this character reads situations, people, and the world around them.',
  charisma:        'Force of personality — how naturally this character commands attention, inspires trust, or sows persuasion.',
  athletics:       'Feats of physical exertion: climbing, swimming, jumping, and sustained effort under strain.',
  acrobatics:      'Balance, agility, and controlled movement — precision of body over raw power.',
  intimidation:    'Coercing or frightening others through presence, threat, or display of force.',
  animal_handling: 'Calming, commanding, or understanding the behavior of animals.',
  survival:        'Navigating the wilds, finding food and shelter, tracking, and enduring harsh conditions.',
  arcana:          'Knowledge of magic, spells, and the arcane forces that run beneath the surface of things.',
  history:         'Recall and understanding of past events, lineages, notable figures, and eras gone by.',
  investigation:   'Finding clues, connecting evidence, and uncovering what is hidden or disguised.',
  nature:          'Knowledge of plants, beasts, weather, and the natural world beyond civilization.',
  religion:        'Understanding of faith, divine lore, holy rites, and the theology behind different beliefs.',
  insight:         'Reading people — detecting lies, sensing mood, and understanding intent beneath the surface.',
  medicine:        'Tending wounds, understanding illness, and caring for those whose bodies have failed them.',
  perception:      'Noticing what others miss — sights, sounds, and small details in the environment.',
  sleight_of_hand: 'Quick, subtle manipulation with the hands: palming objects, picking locks, delicate concealment.',
  stealth:         'Moving without being seen or heard, hiding in plain sight, passing unnoticed.',
  deception:       'Misleading, lying, and constructing convincing untruths.',
  performance:     'Captivating an audience through storytelling, music, theater, or performed art.',
  persuasion:      'Influencing others through reasoned argument, earnest appeal, or social charm.',
};

// Flavor text shown when hovering a race button
const RACE_DESCRIPTIONS = {
  human:      'Adaptable and ambitious by nature, humans spread across the world with remarkable ease. Neither the longest-lived nor the mightiest, they compensate with drive, diversity, and resilience. Balanced across all disciplines.',
  elf:        'Ancient and perceptive, elves are scholars of the subtle — attuned to magic, beauty, and the long view of history. Their senses are keen and their patience vast. Strong in Intelligence, Wisdom, and Learning; slight of body.',
  dwarf:      'Stout in body and immovable in will, dwarves endure where others break. Masters of craft and war alike, they carry the weight of ancestral tradition with pride. Strong in Constitution, Strength, and Stewardship.',
  half_elf:   'Born between worlds, half-elves carry the curiosity of elvenkind and the warmth of humanity. Socially fluid and quick-witted, they rarely feel fully at home anywhere — and have learned to thrive everywhere. Strong in Charisma.',
  half_dwarf: 'Hardier than most humans yet more flexible than their dwarven kin, half-dwarves are natural survivors. Equally at home beside a forge or a mountain pass. Strong in Constitution and Strength.',
};

// Legacy aliases — old code referencing STAT_ORDER / STAT_LABELS still works
const STAT_ORDER  = STAT_CATEGORIES.education.stats;
const STAT_LABELS = ALL_STAT_LABELS;

function calcStatTotals() {
  const totals = { ...getRaceBase() };
  for (const id of state.selectedTraits) {
    const modifiers = TRAIT_STATS[id];
    if (!modifiers) continue;
    for (const [stat, delta] of Object.entries(modifiers)) {
      if (totals[stat] !== undefined) totals[stat] += delta;
    }
  }
  return totals;
}

function calcStatDeltas() {
  // Initialize every stat across all three categories to 0
  const deltas = {};
  for (const cat of Object.values(STAT_CATEGORIES)) {
    for (const s of cat.stats) deltas[s] = 0;
  }
  for (const id of state.selectedTraits) {
    const modifiers = TRAIT_STATS[id];
    if (!modifiers) continue;
    for (const [stat, delta] of Object.entries(modifiers)) {
      if (stat in deltas) deltas[stat] += delta;
    }
  }
  return deltas;
}

// ── RENDER: STAT TOTALS ──────────────────────────────────────
function makeStatRow(statKey, total, delta, base) {
  const row = document.createElement('div');
  row.className = 'stat-row' + (delta !== 0 ? ' modified' : '');

  const nameEl = document.createElement('span');
  nameEl.className = 'stat-name';
  nameEl.textContent = ALL_STAT_LABELS[statKey] || statKey;
  if (STAT_DESCRIPTIONS[statKey]) attachStatTooltip(nameEl, statKey);

  const valEl = document.createElement('span');
  valEl.className = 'stat-value'
    + (total > base ? ' above-base' : total < base ? ' below-base' : '');
  valEl.textContent = total;

  const deltaEl = document.createElement('span');
  deltaEl.className = 'stat-delta' + (delta > 0 ? ' pos' : delta < 0 ? ' neg' : '');
  deltaEl.textContent = delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : '';

  row.appendChild(nameEl);
  row.appendChild(valEl);
  row.appendChild(deltaEl);
  return row;
}

function renderStatTotals() {
  const el = document.getElementById('stat-totals');
  if (!el) return;

  const totals = calcStatTotals();
  const deltas = calcStatDeltas();
  const base   = getRaceBase();

  el.innerHTML = '';

  for (const [catKey, cat] of Object.entries(STAT_CATEGORIES)) {
    // Category header
    const catHdr = document.createElement('div');
    catHdr.className = 'stat-cat-header';
    catHdr.textContent = cat.label;
    el.appendChild(catHdr);

    if (catKey === 'skills') {
      // Group skills by governing core stat
      const groups = {};
      for (const skill of cat.stats) {
        const cs = SKILL_CORE_STAT[skill];
        if (!groups[cs]) groups[cs] = [];
        groups[cs].push(skill);
      }
      for (const coreKey of STAT_CATEGORIES.core.stats) {
        if (!groups[coreKey]) continue;
        const subHdr = document.createElement('div');
        subHdr.className = 'stat-skill-group';
        subHdr.textContent = ALL_STAT_LABELS[coreKey];
        el.appendChild(subHdr);
        for (const skill of groups[coreKey]) {
          el.appendChild(makeStatRow(skill, totals[skill], deltas[skill], base[skill] ?? 0));
        }
      }
    } else {
      for (const stat of cat.stats) {
        el.appendChild(makeStatRow(stat, totals[stat], deltas[stat], base[stat] ?? 0));
      }
    }
  }
}

// ── RENDER ALL ────────────────────────────────────────────────
function renderAll() {
  renderBudget();
  renderSelectedStrip();
  renderTraitBrowser();
  renderSummary();
}

// ── POPULATE CATEGORY FILTER DROPDOWN ───────────────────────
function populateCatFilter() {
  const sel = document.getElementById('trait-filter-cat');
  const cats = Object.keys(traitsByCat).sort((a, b) => {
    const oa = (CATEGORY_META[a] || {}).order || 99;
    const ob = (CATEGORY_META[b] || {}).order || 99;
    return oa - ob;
  });
  for (const cat of cats) {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = (CATEGORY_META[cat] || { label: cat }).label;
    sel.appendChild(opt);
  }
}

// ── SAVE / LOAD ──────────────────────────────────────────────
function buildSaveData() {
  return {
    version: 1,
    name:     state.name,
    nickname: state.nickname,
    age:      state.age,
    pronouns: state.pronouns,
    race:     state.race,
    height:   state.height,
    weight:   state.weight,
    skinTone: state.skinTone,
    skinHex:  state.skinHex,
    eyeColor:    state.eyeColor,
    hairColor:   state.hairColor,
    hairStyle:   state.hairStyle,
    selectedTraits: [...state.selectedTraits],
  };
}

function applySaveData(data) {
  if (!data || data.version !== 1) return;
  state.name     = data.name     || '';
  state.nickname = data.nickname || '';
  state.age      = data.age      || '';
  state.pronouns = data.pronouns || '';
  state.race     = data.race     || 'human';
  state.height   = data.height   || 170;
  state.weight   = data.weight   || 50;
  state.skinTone = data.skinTone || null;
  state.skinHex  = data.skinHex  || '#c68642';
  state.eyeColor = data.eyeColor || null;
  state.hairColor= data.hairColor|| null;
  state.hairStyle= data.hairStyle|| null;
  state.selectedTraits = new Set(data.selectedTraits || []);

  // Sync DOM inputs
  document.getElementById('char-name').value     = state.name;
  document.getElementById('char-nickname').value = state.nickname;
  document.getElementById('char-age').value      = state.age;
  document.getElementById('char-pronouns').value = state.pronouns;
  document.querySelectorAll('.race-btn').forEach(b => b.classList.toggle('selected', b.dataset.race === state.race));
  document.getElementById('char-height').value   = state.height;
  document.getElementById('char-weight').value   = state.weight;
  document.getElementById('height-val').textContent = `${state.height} cm`;
  document.getElementById('weight-val').textContent = getWeightLabel(state.weight);

  if (state.skinHex) {
    document.getElementById('skin-hex').value = state.skinHex;
    document.getElementById('skin-hex-preview').style.background = state.skinHex;
  }
}

function saveToLocalStorage() {
  try {
    localStorage.setItem('char_codex_save', JSON.stringify(buildSaveData()));
    showToast('Character saved!');
  } catch (e) {
    showToast('Save failed.');
  }
}

function loadFromLocalStorage() {
  try {
    const raw = localStorage.getItem('char_codex_save');
    if (!raw) { showToast('No save found.'); return; }
    applySaveData(JSON.parse(raw));
    renderSkinSwatches();
    renderEyeSwatches();
    renderHairColorSwatches();
    renderHairStyleGrid();
    renderAll();
    showToast('Character loaded!');
  } catch (e) {
    showToast('Load failed.');
  }
}

// ── EXPORT ───────────────────────────────────────────────────
function buildTextSummary() {
  const name = state.name.trim() || 'Unnamed';
  const heightCm = state.height;
  const heightFt = Math.floor(heightCm / 30.48);
  const heightIn = Math.round((heightCm / 2.54) % 12);

  const lines = [
    '═══════════════════════════════════════',
    `CHARACTER: ${name}${state.nickname ? ` "${state.nickname}"` : ''}`,
    '═══════════════════════════════════════',
    '',
    '── IDENTITY ──',
    `Name:     ${name}`,
    state.nickname ? `Nickname: ${state.nickname}` : null,
    state.age       ? `Age:      ${state.age}` : null,
    state.pronouns  ? `Pronouns: ${state.pronouns}` : null,
    `Race:     ${RACE_LABELS[state.race] || 'Human'}`,
    '',
    '── APPEARANCE ──',
    `Height:   ${heightCm} cm (${heightFt}′${heightIn}″)`,
    `Build:    ${getWeightLabel(state.weight)}`,
    state.skinTone  ? `Skin:     ${getSkinLabel(state.skinTone)}` : null,
    state.eyeColor  ? `Eyes:     ${state.eyeColor}` : null,
    state.hairColor ? `Hair:     ${state.hairColor}${state.hairStyle ? ', ' + state.hairStyle : ''}` : null,
    '',
    '── TRAITS ──',
  ].filter(l => l !== null);

  if (state.selectedTraits.size > 0) {
    const byCat = {};
    for (const id of state.selectedTraits) {
      const t = traitById[id];
      if (!t) continue;
      if (!byCat[t.category]) byCat[t.category] = [];
      byCat[t.category].push(t);
    }
    for (const [cat, traits] of Object.entries(byCat)) {
      const meta = CATEGORY_META[cat] || { label: cat };
      lines.push(`  [${meta.label.toUpperCase()}]`);
      for (const t of traits) {
        lines.push(`    ${t.label} (${costLabel(t.cost)} pts)`);
      }
    }
    lines.push('');
    lines.push(`Points used: ${calcPointsSpent()} / ${CONFIG.POINT_BUDGET}`);
  } else {
    lines.push('  No traits selected.');
  }

  // Stat totals — three categories
  const txtTotals = calcStatTotals();
  const txtDeltas = calcStatDeltas();

  function txtStatLine(statKey) {
    const total = txtTotals[statKey];
    const delta = txtDeltas[statKey];
    const deltaStr = delta > 0 ? ` (+${delta})` : delta < 0 ? ` (${delta})` : '';
    return `    ${(ALL_STAT_LABELS[statKey] + ':').padEnd(20)}${total}${deltaStr}`;
  }

  lines.push('');
  lines.push(`── STATS — Race: ${RACE_LABELS[state.race] || 'Human'} ──`);

  lines.push('  Education:');
  for (const s of STAT_CATEGORIES.education.stats) lines.push(txtStatLine(s));

  lines.push('  Core Stats:');
  for (const s of STAT_CATEGORIES.core.stats) lines.push(txtStatLine(s));

  lines.push('  General Skills:');
  const skillGroups = {};
  for (const s of STAT_CATEGORIES.skills.stats) {
    const cs = SKILL_CORE_STAT[s];
    if (!skillGroups[cs]) skillGroups[cs] = [];
    skillGroups[cs].push(s);
  }
  for (const cs of STAT_CATEGORIES.core.stats) {
    if (!skillGroups[cs]) continue;
    lines.push(`    [${ALL_STAT_LABELS[cs]}]`);
    for (const s of skillGroups[cs]) lines.push('  ' + txtStatLine(s));
  }

  lines.push('');
  lines.push('── NARRATIVE ──');
  lines.push(document.getElementById('narrative-text').textContent);
  lines.push('');
  lines.push('═══════════════════════════════════════');
  lines.push(`Generated by Character Codex`);

  return lines.join('\n');
}

function exportJSON() {
  const jsonTotals = calcStatTotals();
  const jsonDeltas = calcStatDeltas();
  const jsonBase   = getRaceBase();

  function buildCatExport(statList) {
    const out = {};
    for (const s of statList) {
      out[s] = { base: jsonBase[s] ?? 0, trait_modifier: jsonDeltas[s], total: jsonTotals[s] };
    }
    return out;
  }

  // Build skills grouped by core stat
  const skillsByCore = {};
  for (const s of STAT_CATEGORIES.skills.stats) {
    const cs = SKILL_CORE_STAT[s];
    if (!skillsByCore[cs]) skillsByCore[cs] = {};
    skillsByCore[cs][s] = { base: jsonBase[s] ?? 0, trait_modifier: jsonDeltas[s], total: jsonTotals[s] };
  }

  const data = {
    character: buildSaveData(),
    narrative: document.getElementById('narrative-text').textContent,
    pointsSpent: calcPointsSpent(),
    pointBudget: CONFIG.POINT_BUDGET,
    stats: {
      race:          RACE_LABELS[state.race] || 'Human',
      education:     buildCatExport(STAT_CATEGORIES.education.stats),
      core_stats:    buildCatExport(STAT_CATEGORIES.core.stats),
      general_skills: skillsByCore,
    },
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${(state.name || 'character').replace(/\s+/g, '_').toLowerCase()}_codex.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportTxt() {
  const text = buildTextSummary();
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${(state.name || 'character').replace(/\s+/g, '_').toLowerCase()}_codex.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function copyToClipboard() {
  const text = buildTextSummary();
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!')).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied!');
  });
}

function showToast(msg) {
  const toast = document.getElementById('copy-toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ── RESET ────────────────────────────────────────────────────
function resetAll() {
  if (!confirm('Reset all character data? This cannot be undone.')) return;
  state.name = '';
  state.nickname = '';
  state.age = '';
  state.pronouns = '';
  state.race = 'human';
  state.height = 170;
  state.weight = 50;
  state.skinTone = null;
  state.skinHex = '#c68642';
  state.eyeColor = null;
  state.hairColor = null;
  state.hairStyle = null;
  state.selectedTraits.clear();
  state.searchQuery = '';
  state.filterCost = 'all';
  state.filterCat  = 'all';
  state.filterSelected = false;
  collapseAllCats();

  document.getElementById('char-name').value      = '';
  document.getElementById('char-nickname').value  = '';
  document.getElementById('char-age').value       = '';
  document.getElementById('char-pronouns').value  = '';
  document.querySelectorAll('.race-btn').forEach(b => b.classList.toggle('selected', b.dataset.race === 'human'));
  document.getElementById('char-height').value    = 170;
  document.getElementById('char-weight').value    = 50;
  document.getElementById('height-val').textContent = '170 cm';
  document.getElementById('weight-val').textContent = 'Medium';
  document.getElementById('trait-search').value   = '';
  document.getElementById('trait-filter-cost').value = 'all';
  document.getElementById('trait-filter-cat').value  = 'all';
  document.getElementById('trait-filter-selected').checked = false;
  document.getElementById('skin-hex').value = '#c68642';
  document.getElementById('skin-hex-preview').style.background = '#c68642';
  document.getElementById('portrait-circle').style.borderColor = '';
  document.getElementById('portrait-initials').style.color = '';

  renderSkinSwatches();
  renderEyeSwatches();
  renderHairColorSwatches();
  renderHairStyleGrid();
  renderAll();
}

// ── EVENT BINDINGS ────────────────────────────────────────────
function bindEvents() {
  // Identity inputs
  const idBind = (id, key) => {
    document.getElementById(id).addEventListener('input', e => {
      state[key] = e.target.value;
      renderSummary();
    });
  };
  idBind('char-name',     'name');
  idBind('char-nickname', 'nickname');
  idBind('char-age',      'age');

  // Race buttons
  document.querySelectorAll('.race-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.race-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.race = btn.dataset.race;
      renderSummary();
    });
    attachRaceTooltip(btn, btn.dataset.race);
  });

  // Pronouns
  document.getElementById('char-pronouns').addEventListener('change', e => {
    const val = e.target.value;
    if (val === 'custom') {
      document.getElementById('pronouns-custom-wrap').style.display = '';
      state.pronouns = '';
    } else {
      document.getElementById('pronouns-custom-wrap').style.display = 'none';
      state.pronouns = val;
    }
    renderSummary();
  });
  document.getElementById('char-pronouns-custom').addEventListener('input', e => {
    state.pronouns = e.target.value;
    renderSummary();
  });

  // Sliders
  document.getElementById('char-height').addEventListener('input', e => {
    state.height = +e.target.value;
    document.getElementById('height-val').textContent = `${state.height} cm`;
    renderSummary();
  });
  document.getElementById('char-weight').addEventListener('input', e => {
    state.weight = +e.target.value;
    document.getElementById('weight-val').textContent = getWeightLabel(state.weight);
    renderSummary();
  });

  // Skin hex
  document.getElementById('skin-hex').addEventListener('input', e => {
    state.skinTone = e.target.value;
    state.skinHex  = e.target.value;
    document.getElementById('skin-hex-preview').style.background = e.target.value;
    renderSkinSwatches(); // re-render to show custom as not selected
    renderSummary();
  });

  // Trait filters
  document.getElementById('trait-search').addEventListener('input', e => {
    state.searchQuery = e.target.value;
    renderTraitBrowser();
  });
  document.getElementById('trait-filter-cost').addEventListener('change', e => {
    state.filterCost = e.target.value;
    renderTraitBrowser();
  });
  document.getElementById('trait-filter-cat').addEventListener('change', e => {
    state.filterCat = e.target.value;
    renderTraitBrowser();
  });
  document.getElementById('trait-filter-selected').addEventListener('change', e => {
    state.filterSelected = e.target.checked;
    renderTraitBrowser();
  });

  // Header buttons
  document.getElementById('btn-save').addEventListener('click', saveToLocalStorage);
  document.getElementById('btn-load').addEventListener('click', loadFromLocalStorage);
  document.getElementById('btn-reset').addEventListener('click', resetAll);

  // Export buttons
  document.getElementById('btn-copy').addEventListener('click', copyToClipboard);
  document.getElementById('btn-export-json').addEventListener('click', exportJSON);
  document.getElementById('btn-export-txt').addEventListener('click', exportTxt);
}

// ── INIT ─────────────────────────────────────────────────────
function init() {
  initTraitMaps();
  collapseAllCats();
  populateCatFilter();
  bindEvents();

  // Initial skin preview
  document.getElementById('skin-hex-preview').style.background = state.skinHex;

  // Render all appearance swatches
  renderSkinSwatches();
  renderEyeSwatches();
  renderHairColorSwatches();
  renderHairStyleGrid();

  // Try to load saved state silently
  try {
    const raw = localStorage.getItem('char_codex_save');
    if (raw) {
      applySaveData(JSON.parse(raw));
      renderSkinSwatches();
      renderEyeSwatches();
      renderHairColorSwatches();
      renderHairStyleGrid();
    }
  } catch (e) { /* ignore */ }

  renderAll();
}

document.addEventListener('DOMContentLoaded', init);
