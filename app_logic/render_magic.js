// ============================================================
// render_magic.js — Renders the Magic tab as a hub-and-spoke
// tree layout. Called by renderTraitBrowser() when the active
// category is magic_elements.
// Depends on: config.js, state.js, trait_rules.js, tooltip.js,
//             render_traits.js (costClass, costLabel, toggleTrait)
// ============================================================

'use strict';

// SVG viewBox dimensions
const MAGIC_VW = 760, MAGIC_VH = 510;

// Center coordinates for each node (in viewBox units)
const MAGIC_NODE_POS = {
  magic_affinity: { x: 380, y: 60  },
  talented_mage:  { x: 90,  y: 185 },
  elem_light:     { x: 275, y: 185 },
  elem_dark:      { x: 490, y: 185 },
  elem_fire:      { x: 100, y: 330 },
  elem_earth:     { x: 248, y: 330 },
  elem_water:     { x: 396, y: 330 },
  elem_wind:      { x: 544, y: 330 },
  elem_magma:     { x: 174, y: 453 },
  elem_nature:    { x: 322, y: 453 },
  elem_ice:       { x: 470, y: 453 },
  elem_lightning: { x: 628, y: 453 },
};

// Edges to draw between nodes
const MAGIC_EDGES = [
  ['magic_affinity', 'talented_mage'],
  ['magic_affinity', 'elem_light'],
  ['magic_affinity', 'elem_dark'],
  ['magic_affinity', 'elem_fire'],
  ['magic_affinity', 'elem_earth'],
  ['magic_affinity', 'elem_water'],
  ['magic_affinity', 'elem_wind'],
  ['elem_fire',  'elem_magma'],
  ['elem_earth', 'elem_magma'],
  ['elem_earth', 'elem_nature'],
  ['elem_water', 'elem_nature'],
  ['elem_water', 'elem_ice'],
  ['elem_wind',  'elem_ice'],
  ['elem_fire',  'elem_lightning'],
  ['elem_wind',  'elem_lightning'],
];

function _magicTier(id) {
  if (id === 'magic_affinity') return 'gateway';
  if (id === 'talented_mage')  return 'special';
  if (id === 'elem_light' || id === 'elem_dark') return 'rare';
  if (['elem_magma', 'elem_nature', 'elem_ice', 'elem_lightning'].includes(id)) return 'combo';
  return 'base';
}

// ── Main renderer ─────────────────────────────────────────────
// container: the .cat-body div
// allMagicTraits: array of trait objects in this category
// search: current search string (already lowercased)
// costFilter: 'all' | 'positive' | 'negative' | 'zero'
function renderMagicTree(container, allMagicTraits, search, costFilter) {
  const traitMap = {};
  for (const t of allMagicTraits) traitMap[t.id] = t;

  // ── Tier legend ───────────────────────────────────────────
  const legend = document.createElement('div');
  legend.className = 'magic-legend';
  legend.innerHTML =
    '<span class="ml-item ml-gateway">Gateway</span>' +
    '<span class="ml-item ml-special">Special</span>' +
    '<span class="ml-item ml-rare">Rare</span>' +
    '<span class="ml-item ml-base">Base Element</span>' +
    '<span class="ml-item ml-combo">Combination</span>';
  container.appendChild(legend);

  // ── Tree wrapper (relative-positioned host) ───────────────
  const wrapper = document.createElement('div');
  wrapper.className = 'magic-tree-wrapper';

  // ── SVG connector lines ───────────────────────────────────
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${MAGIC_VW} ${MAGIC_VH}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('class', 'magic-tree-svg');

  for (const [a, b] of MAGIC_EDGES) {
    const pa = MAGIC_NODE_POS[a], pb = MAGIC_NODE_POS[b];
    if (!pa || !pb) continue;
    const bothSelected = state.selectedTraits.has(a) && state.selectedTraits.has(b);
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', pa.x);
    line.setAttribute('y1', pa.y);
    line.setAttribute('x2', pb.x);
    line.setAttribute('y2', pb.y);
    line.setAttribute('class', 'magic-edge' + (bothSelected ? ' active' : ''));
    svg.appendChild(line);
  }
  wrapper.appendChild(svg);

  // ── Nodes ─────────────────────────────────────────────────
  for (const [id, pos] of Object.entries(MAGIC_NODE_POS)) {
    const t = traitMap[id];
    if (!t) continue;

    const sq = search.trim();
    const matchSearch = !sq || t.label.toLowerCase().includes(sq) || t.id.includes(sq);
    const matchCost =
      costFilter === 'positive' ? t.cost > 0  :
      costFilter === 'negative' ? t.cost < 0  :
      costFilter === 'zero'     ? t.cost === 0 : true;

    const isSelected = state.selectedTraits.has(id);
    const isDisabled = !isSelected && !canSelect(id);
    const tier       = _magicTier(id);

    const classes = ['magic-node', `mnt-${tier}`];
    if (isSelected)               classes.push('selected');
    if (isDisabled)               classes.push('disabled');
    if (!matchSearch || !matchCost) classes.push('dim');

    const node = document.createElement('div');
    node.className = classes.join(' ');
    node.style.left = `${(pos.x / MAGIC_VW * 100).toFixed(3)}%`;
    node.style.top  = `${(pos.y / MAGIC_VH * 100).toFixed(3)}%`;

    const nameEl = document.createElement('div');
    nameEl.className = 'mn-name';
    nameEl.textContent = t.label;
    node.appendChild(nameEl);

    const costEl = document.createElement('div');
    costEl.className = `mn-cost cost-${costClass(t.cost)}`;
    costEl.textContent = costLabel(t.cost);
    node.appendChild(costEl);

    if (!isDisabled) {
      node.addEventListener('click', () => toggleTrait(id));
    } else {
      let reason = '';
      if      (isBlockedByMagicRules(id))    reason = 'Magic Affinity required';
      else if (isBlockedByOpposites(id))     reason = 'Blocked by opposite trait';
      else if (isBlockedByCatLimit(id))      reason = 'Category limit reached';
      else if (isBlockedByBudget(id))        reason = 'Not enough points';
      if (reason) node.setAttribute('title', reason);
    }

    attachTraitTooltip(node, id);
    wrapper.appendChild(node);
  }

  container.appendChild(wrapper);
}
