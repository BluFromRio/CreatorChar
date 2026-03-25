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
const MAGIC_BASE_ELEMENTS    = ['elem_earth', 'elem_fire', 'elem_water', 'elem_wind'];
const MAGIC_COMBO_ELEMENTS   = ['elem_ice', 'elem_magma', 'elem_lightning', 'elem_nature'];
const MAGIC_RARE_ELEMENTS    = ['elem_light', 'elem_dark'];
const MAGIC_SACRED_ELEMENTS  = ['elem_healing'];
const MAGIC_ALL_ELEMENTS     = [...MAGIC_BASE_ELEMENTS, ...MAGIC_COMBO_ELEMENTS, ...MAGIC_RARE_ELEMENTS, ...MAGIC_SACRED_ELEMENTS];

// Prerequisite elements required for combination/sacred elements
const MAGIC_COMBO_REQS = {
  elem_ice:       ['elem_water', 'elem_wind'],
  elem_magma:     ['elem_fire',  'elem_earth'],
  elem_lightning: ['elem_fire',  'elem_wind'],
  elem_nature:    ['elem_earth', 'elem_water'],
  elem_healing:   ['elem_light', 'elem_water'],
};

function isBlockedByMagicRules(traitId) {
  const sel = state.selectedTraits;

  // Talented Mage requires Magic Affinity
  if (traitId === 'talented_mage') {
    return !sel.has('magic_affinity');
  }

  if (!MAGIC_ALL_ELEMENTS.includes(traitId)) return false;

  // All elements require Magic Affinity
  if (!sel.has('magic_affinity')) return true;

  // ── Dark: exclusive solo path ──────────────────────────────
  // Selecting dark requires talented_mage and no other elements present
  if (traitId === 'elem_dark') {
    if (!sel.has('talented_mage')) return true;
    return MAGIC_ALL_ELEMENTS.filter(e => e !== 'elem_dark').some(e => sel.has(e));
  }
  // If dark is already selected, nothing else can be chosen
  if (sel.has('elem_dark')) return true;

  // ── Light and Healing require Talented Mage ────────────────
  if (traitId === 'elem_light' || traitId === 'elem_healing') {
    if (!sel.has('talented_mage')) return true;
  }

  // ── Light: incompatible with fire/earth/wind and all combos ─
  if (traitId === 'elem_light') {
    const lightIncompat = ['elem_fire', 'elem_earth', 'elem_wind', ...MAGIC_COMBO_ELEMENTS];
    if (lightIncompat.some(e => sel.has(e))) return true;
  }

  // ── Light path: if light is selected, only water and healing allowed ──
  if (sel.has('elem_light') && traitId !== 'elem_light') {
    if (!['elem_water', 'elem_healing'].includes(traitId)) return true;
  }

  // ── Healing: requires both light and water ─────────────────
  if (traitId === 'elem_healing') {
    if (!sel.has('elem_light') || !sel.has('elem_water')) return true;
  }

  // ── Combo/sacred prerequisite check ───────────────────────
  if (MAGIC_COMBO_REQS[traitId]) {
    if (!MAGIC_COMBO_REQS[traitId].every(r => sel.has(r))) return true;
  }

  // ── Without Talented Mage: max 1 base element, no combos ──
  if (!sel.has('talented_mage')) {
    if (MAGIC_COMBO_ELEMENTS.includes(traitId)) return true;
    const selectedBase = MAGIC_BASE_ELEMENTS.filter(e => sel.has(e));
    if (MAGIC_BASE_ELEMENTS.includes(traitId) && selectedBase.length >= 1) return true;
    return false;
  }

  // ── With Talented Mage, normal base/combo path (no rare) ──
  if (MAGIC_BASE_ELEMENTS.includes(traitId)) {
    const selectedBase = MAGIC_BASE_ELEMENTS.filter(e => sel.has(e));
    if (selectedBase.length >= 2) return true;
  }
  if (MAGIC_COMBO_ELEMENTS.includes(traitId)) {
    const selectedCombo = MAGIC_COMBO_ELEMENTS.filter(e => sel.has(e));
    if (selectedCombo.length >= 1) return true;
  }

  return false;
}

// ── Magic state reconciliation ─────────────────────────────────
// Removes any magic selections that are now invalid.
// Called after any deselection so the state is always consistent.
function reconcileMagicState() {
  const sel = state.selectedTraits;

  // Step 1: no magic_affinity → remove talented_mage and all elements
  if (!sel.has('magic_affinity')) {
    sel.delete('talented_mage');
    for (const e of MAGIC_ALL_ELEMENTS) sel.delete(e);
    return;
  }

  // Step 2: no talented_mage → remove light, dark, and healing (all require it)
  if (!sel.has('talented_mage')) {
    sel.delete('elem_light');
    sel.delete('elem_dark');
    sel.delete('elem_healing');
    // Revert to max 1 base element, no combos
    for (const e of MAGIC_COMBO_ELEMENTS) sel.delete(e);
    const selBase = MAGIC_BASE_ELEMENTS.filter(e => sel.has(e));
    for (let i = 1; i < selBase.length; i++) sel.delete(selBase[i]);
    return;
  }

  // Step 3: dark exclusivity — if dark selected, remove everything else
  if (sel.has('elem_dark')) {
    for (const e of MAGIC_ALL_ELEMENTS) {
      if (e !== 'elem_dark') sel.delete(e);
    }
    return;
  }

  // Step 4: light path cleanup
  if (sel.has('elem_light')) {
    // Fire/earth/wind and all combo elements are incompatible with light
    sel.delete('elem_fire');
    sel.delete('elem_earth');
    sel.delete('elem_wind');
    for (const e of MAGIC_COMBO_ELEMENTS) sel.delete(e);
    // Healing requires both light and water; drop healing if water is gone
    if (!sel.has('elem_water')) sel.delete('elem_healing');
    return;
  }

  // Step 5: normal path (talented_mage, no rare) — remove healing, enforce limits
  sel.delete('elem_healing');

  // Remove combo elements whose prerequisites are no longer met
  for (const combo of MAGIC_COMBO_ELEMENTS) {
    if (!sel.has(combo)) continue;
    const reqs = MAGIC_COMBO_REQS[combo];
    if (reqs && !reqs.every(r => sel.has(r))) sel.delete(combo);
  }

  // Enforce max 2 base, max 1 combo
  const selBase  = MAGIC_BASE_ELEMENTS.filter(e => sel.has(e));
  const selCombo = MAGIC_COMBO_ELEMENTS.filter(e => sel.has(e));
  for (let i = 2; i < selBase.length;  i++) sel.delete(selBase[i]);
  for (let i = 1; i < selCombo.length; i++) sel.delete(selCombo[i]);

  // Re-check combo prerequisites after base trimming
  for (const combo of MAGIC_COMBO_ELEMENTS) {
    if (!sel.has(combo)) continue;
    const reqs = MAGIC_COMBO_REQS[combo];
    if (reqs && !reqs.every(r => sel.has(r))) sel.delete(combo);
  }
}

// ── Commander tree structure and enforcement ──────────────────
// Defines the two trees, their branches, and the linear node order within each.
// Node order is prerequisite order: node[i] requires node[i-1].
const CMD_TREES = [
  {
    id: 'strategic',
    label: 'Strategic Expert',
    branches: [
      { id: 'branch_agg',  nodes: ['aggressive_attacker', 'reaver', 'logistician', 'conqueror'] },
      { id: 'branch_flex', nodes: ['flexible_leader', 'military_engineer', 'savior', 'grand_marshal'] },
      { id: 'branch_caut', nodes: ['cautious_leader', 'infiltration_specialist', 'master_ambusher', 'shadow_general'] },
      { id: 'branch_def',  nodes: ['unyielding_defender', 'holy_warrior', 'organizer', 'iron_bulwark'] },
    ],
  },
  {
    id: 'terrain',
    label: 'Terrain Expert',
    branches: [
      { id: 'branch_water',  nodes: ['water_expert', 'forder', 'navigator', 'bridge_master'] },
      { id: 'branch_open',   nodes: ['open_terrain_expert', 'desert_warrior', 'plains_rider', 'marsh_specialist'] },
      { id: 'branch_rough',  nodes: ['rough_terrain_expert', 'winter_soldier', 'highlander', 'volcanic_survivor'] },
      { id: 'branch_forest', nodes: ['forest_expert', 'jungle_stalker', 'forest_fighter', 'woodland_tracker'] },
    ],
  },
];

// Returns the tree and branch containing traitId, or null.
function _findCmdBranch(traitId) {
  for (const tree of CMD_TREES) {
    for (const branch of tree.branches) {
      const idx = branch.nodes.indexOf(traitId);
      if (idx !== -1) return { tree, branch, idx };
    }
  }
  return null;
}

function isBlockedByCommanderRules(traitId) {
  const found = _findCmdBranch(traitId);
  if (!found) return false;
  const { tree, branch, idx } = found;

  // Prerequisite: node[i] requires node[i-1]
  if (idx > 0 && !state.selectedTraits.has(branch.nodes[idx - 1])) return true;

  // Branch exclusivity: no other branch in this tree may have a selected trait
  for (const other of tree.branches) {
    if (other === branch) continue;
    if (other.nodes.some(n => state.selectedTraits.has(n))) return true;
  }
  return false;
}

// Removes downstream commander traits whose prerequisites are no longer selected.
function reconcileCommanderState() {
  const sel = state.selectedTraits;
  for (const tree of CMD_TREES) {
    for (const branch of tree.branches) {
      let prereqMissing = false;
      for (const nodeId of branch.nodes) {
        if (prereqMissing) {
          sel.delete(nodeId);
        } else if (!sel.has(nodeId)) {
          prereqMissing = true;
        }
      }
    }
  }
}

// ── Race / height trait enforcement ───────────────────────────
const RACES_HEIGHT_BLOCK = ['dwarf', 'half_dwarf'];
const RACES_HEIGHT_AUTO  = ['human', 'elf', 'half_elf'];
const HEIGHT_DWARF_MAX   = 152;  // ≤ 152 cm → under 5'0"
const HEIGHT_GIANT_MIN   = 199;  // ≥ 199 cm → over 6'6"

// Dwarves and half-dwarves cannot have the dwarf or giant congenital traits
function isBlockedByRaceRules(traitId) {
  if (traitId !== 'dwarf' && traitId !== 'giant') return false;
  return RACES_HEIGHT_BLOCK.includes(state.race);
}

// Force-assigns or removes dwarf/giant based on current race and height.
// Bypasses canSelect — direct Set manipulation like reconcileMagicState.
function reconcileHeightTraits() {
  const sel = state.selectedTraits;

  // Dwarf/Half-Dwarf: neither auto-trait applies; remove both
  if (RACES_HEIGHT_BLOCK.includes(state.race)) {
    sel.delete('dwarf');
    sel.delete('giant');
    return;
  }

  // Only Human/Elf/Half-Elf get auto-assigned
  if (!RACES_HEIGHT_AUTO.includes(state.race)) return;

  if (state.height <= HEIGHT_DWARF_MAX) {
    sel.delete('giant');
    sel.add('dwarf');
  } else if (state.height >= HEIGHT_GIANT_MIN) {
    sel.delete('dwarf');
    sel.add('giant');
  } else {
    sel.delete('dwarf');
    sel.delete('giant');
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
    !isBlockedByMagicRules(traitId) &&
    !isBlockedByRaceRules(traitId) &&
    !isBlockedByCommanderRules(traitId)
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
    reconcileCommanderState();
  } else {
    const t = traitById[traitId];
    // Triad auto-switch: if another member of this triad is selected, swap it out
    if (t && t.group && t.group.startsWith('triad_')) {
      const removed = [];
      for (const sibling of (traitsByGroup[t.group] || [])) {
        if (sibling.id !== traitId && state.selectedTraits.has(sibling.id)) {
          state.selectedTraits.delete(sibling.id);
          removed.push(sibling.id);
        }
      }
      if (!canSelect(traitId)) {
        // Budget or other hard block: restore removed siblings
        for (const id of removed) state.selectedTraits.add(id);
        return;
      }
      state.selectedTraits.add(traitId);
    } else {
      if (!canSelect(traitId)) return;
      state.selectedTraits.add(traitId);
    }
  }
  renderAll();
}
