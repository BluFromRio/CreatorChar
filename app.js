// ============================================================
// app.js — Character Codex: CK3-Inspired Book Character Creator
// ============================================================

'use strict';

// ── CONFIG ──────────────────────────────────────────────────
// Edit these values to tune balance.
const CONFIG = {
  POINT_BUDGET: 400,          // Starting point pool
  // Optional per-category limits (null = unlimited)
  // e.g. { personality: 5, congenital: 4 }
  CAT_LIMITS: {
    personality: null,
    education: 1,             // One education "tier" per group
    lifestyle: 4,
    congenital: null,
    health: 3,
    commander: 3,
    childhood: 2,
    fame: 3,
    other: null,
  },
  // Negative cost refund cap: null = unlimited (negative traits always refund)
  // Set to e.g. 100 to cap total refunds from negative traits
  NEG_REFUND_CAP: null,
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
  personality: { label: 'Personality',  icon: '♟', order: 1 },
  education:   { label: 'Education',    icon: '📜', order: 2 },
  lifestyle:   { label: 'Lifestyle',    icon: '⚔', order: 3 },
  congenital:  { label: 'Congenital',   icon: '🧬', order: 4 },
  health:      { label: 'Health',       icon: '🩸', order: 5 },
  commander:   { label: 'Commander',    icon: '🛡', order: 6 },
  childhood:   { label: 'Childhood',    icon: '✦', order: 7 },
  fame:        { label: 'Fame & Vices', icon: '👁', order: 8 },
  other:       { label: 'Other',        icon: '◆', order: 9 },
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

function canSelect(traitId) {
  if (state.selectedTraits.has(traitId)) return true; // can always deselect
  return (
    !isBlockedByOpposites(traitId) &&
    !isBlockedByGroup(traitId) &&
    !isBlockedByCatLimit(traitId) &&
    !isBlockedByBudget(traitId)
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
    const meta = CATEGORY_META[cat] || { label: cat, icon: '◆' };
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
      <span class="cat-icon cat-icon-${cat}">${meta.icon}</span>
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
    if (isBlockedByOpposites(t.id))   reason = 'Blocked by opposite trait';
    else if (isBlockedByGroup(t.id))  reason = 'Group already selected';
    else if (isBlockedByCatLimit(t.id)) reason = 'Category limit reached';
    else if (isBlockedByBudget(t.id)) reason = 'Not enough points';
    card.title = reason;
  }

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
    if (isBlockedByOpposites(t.id))   reason = 'Blocked by opposite trait';
    else if (isBlockedByGroup(t.id))  reason = 'Group: pick one tier only';
    else if (isBlockedByBudget(t.id)) reason = 'Not enough points';
    card.title = reason;
  }
  return card;
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
      html += `<div class="summary-cat-header">${meta.icon || '◆'} ${meta.label}</div>`;
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

  let intro = `${namePart} is`;

  // Age
  if (state.age) intro += ` ${state.age} years old,`;

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
      parts.push(`${pronounWord.cap} received a ${eduTraits[0]} education.`);
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

  lines.push('');
  lines.push('── NARRATIVE ──');
  lines.push(document.getElementById('narrative-text').textContent);
  lines.push('');
  lines.push('═══════════════════════════════════════');
  lines.push(`Generated by Character Codex`);

  return lines.join('\n');
}

function exportJSON() {
  const data = {
    character: buildSaveData(),
    narrative: document.getElementById('narrative-text').textContent,
    pointsSpent: calcPointsSpent(),
    pointBudget: CONFIG.POINT_BUDGET,
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

  document.getElementById('char-name').value      = '';
  document.getElementById('char-nickname').value  = '';
  document.getElementById('char-age').value       = '';
  document.getElementById('char-pronouns').value  = '';
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
