// ============================================================
// trait_rules.js — Trait selection rules: point budget, group
// limits, category limits, opposites, magic element gating,
// compatibility scoring, and the toggleTrait action.
// Depends on: config.js, state.js, stats.js (calcPointsSpent
//             is defined here and used across the app)
// ============================================================

'use strict';

// ── Point calculation ─────────────────────────────────────────
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

// ── Blocking checks ───────────────────────────────────────────
function isBlockedByOpposites(traitId) {
  const t = traitById[traitId];
  if (!t) return false;
  for (const selId of state.selectedTraits) {
    const sel = traitById[selId];
    if (!sel) continue;
    if (sel.opposites && sel.opposites.includes(traitId)) return true;
    if (t.opposites && t.opposites.includes(selId)) return true;
  }
  return false;
}

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

function isBlockedByBudget(traitId) {
  const t = traitById[traitId];
  if (!t || t.cost === null || t.cost <= 0) return false;
  if (state.selectedTraits.has(traitId)) return false;
  return (calcPointsSpent() + t.cost) > CONFIG.POINT_BUDGET;
}

// ── Magic element enforcement ─────────────────────────────────
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

  if (!state.selectedTraits.has('magic_affinity')) return true;

  if (MAGIC_COMBO_REQS[traitId]) {
    const reqs = MAGIC_COMBO_REQS[traitId];
    if (!reqs.every(r => state.selectedTraits.has(r))) return true;
  }

  const hasTalentedMage  = state.selectedTraits.has('talented_mage');
  const selectedElements = MAGIC_ALL_ELEMENTS.filter(e => state.selectedTraits.has(e));
  const selectedBase     = MAGIC_BASE_ELEMENTS.filter(e => state.selectedTraits.has(e));
  const selectedCombo    = MAGIC_COMBO_ELEMENTS.filter(e => state.selectedTraits.has(e));
  const selectedRare     = MAGIC_RARE_ELEMENTS.filter(e => state.selectedTraits.has(e));

  if (!hasTalentedMage) {
    return selectedElements.length >= 1;
  }

  const isRare  = MAGIC_RARE_ELEMENTS.includes(traitId);
  const isBase  = MAGIC_BASE_ELEMENTS.includes(traitId);
  const isCombo = MAGIC_COMBO_ELEMENTS.includes(traitId);

  if (isRare)  return selectedElements.length >= 1;
  if (isBase)  {
    if (selectedRare.length >= 1) return true;
    if (selectedBase.length >= 2) return true;
  }
  if (isCombo) {
    if (selectedRare.length >= 1) return true;
    if (selectedCombo.length >= 1) return true;
  }
  return false;
}

// ── Magic state reconciliation ─────────────────────────────────
// Removes any magic element selections that are now invalid.
// Called after any deselection so the state is always consistent.
function reconcileMagicState() {
  const sel = state.selectedTraits;

  // Step 1: no magic_affinity → remove every magic element
  if (!sel.has('magic_affinity')) {
    for (const e of MAGIC_ALL_ELEMENTS) sel.delete(e);
    return;
  }

  // Step 2: remove combo elements whose prerequisites are no longer met
  for (const combo of MAGIC_COMBO_ELEMENTS) {
    if (!sel.has(combo)) continue;
    const reqs = MAGIC_COMBO_REQS[combo];
    if (reqs && !reqs.every(r => sel.has(r))) sel.delete(combo);
  }

  // Step 3: enforce per-talented_mage element limits
  const hasTalented = sel.has('talented_mage');

  if (!hasTalented) {
    // Without talented_mage: max 1 element total.
    // Combos can never be the sole element (they require 2 bases that can't
    // coexist under the 1-element limit), so remove them first, then trim.
    for (const e of MAGIC_COMBO_ELEMENTS) sel.delete(e);
    const remaining = MAGIC_ALL_ELEMENTS.filter(e => sel.has(e));
    for (let i = 1; i < remaining.length; i++) sel.delete(remaining[i]);
    return;
  }

  // With talented_mage:
  const selRare  = MAGIC_RARE_ELEMENTS.filter(e => sel.has(e));
  const selBase  = MAGIC_BASE_ELEMENTS.filter(e => sel.has(e));
  const selCombo = MAGIC_COMBO_ELEMENTS.filter(e => sel.has(e));

  if (selRare.length > 0) {
    // Rare elements are mutually exclusive with everything else — keep only
    // the first rare and clear all other elements.
    for (let i = 1; i < selRare.length; i++) sel.delete(selRare[i]);
    for (const e of selBase)  sel.delete(e);
    for (const e of selCombo) sel.delete(e);
    return;
  }

  // No rare: max 2 base, max 1 combo
  for (let i = 2; i < selBase.length; i++) sel.delete(selBase[i]);
  for (let i = 1; i < selCombo.length; i++) sel.delete(selCombo[i]);

  // Re-check combo prerequisites now that excess bases may have been removed
  for (const combo of MAGIC_COMBO_ELEMENTS) {
    if (!sel.has(combo)) continue;
    const reqs = MAGIC_COMBO_REQS[combo];
    if (reqs && !reqs.every(r => sel.has(r))) sel.delete(combo);
  }
}

// ── Master selection gate ─────────────────────────────────────
function canSelect(traitId) {
  if (state.selectedTraits.has(traitId)) return true; // always allow deselect
  return (
    !isBlockedByOpposites(traitId) &&
    !isBlockedByGroup(traitId) &&
    !isBlockedByCatLimit(traitId) &&
    !isBlockedByBudget(traitId) &&
    !isBlockedByMagicRules(traitId)
  );
}

// ── Compatibility score ───────────────────────────────────────
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

// ── Trait toggle ──────────────────────────────────────────────
function toggleTrait(traitId) {
  if (state.selectedTraits.has(traitId)) {
    state.selectedTraits.delete(traitId);
    reconcileMagicState();
  } else {
    if (!canSelect(traitId)) return;
    state.selectedTraits.add(traitId);
  }
  renderAll();
}
