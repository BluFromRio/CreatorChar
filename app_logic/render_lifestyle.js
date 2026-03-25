// ============================================================
// render_lifestyle.js — Renders the Lifestyle tab as 7 switchable
// prerequisite trees. Each tree has a root node at the top centre
// and two independent branches descending left and right.
// Depends on: config.js, state.js, trait_rules.js (LIFESTYLE_TREES),
//             tooltip.js, render_appearance.js (costClass, costLabel)
// ============================================================

'use strict';

// Which tree is currently shown.
let _lftActiveTreeIdx = 0;

// SVG viewport dimensions.
const LFT_VW = 760;
const LFT_VH = 500;

// Node positions (in viewBox units).
// Root: centred at top. Branch A: left column. Branch B: right column.
const LFT_ROOT_X  = 380;
const LFT_ROOT_Y  = 50;
const LFT_COL_X   = [185, 575];          // [branchA_x, branchB_x]
const LFT_ROW_Y   = [165, 290, 415];     // y for depth 0, 1, 2 within a branch

// CSS tier class by node role.
function _lftTier(role, depth) {
  if (role === 'root')   return 'lft-root';
  if (depth === 0)       return 'lft-branch';
  if (depth === 1)       return 'lft-mid';
  return 'lft-deep';
}

// ── Main renderer ─────────────────────────────────────────────
function renderLifestyleTree(container, allLifestyleTraits, search, costFilter) {
  const traitMap = {};
  for (const t of allLifestyleTraits) traitMap[t.id] = t;

  // ── Ribbon ────────────────────────────────────────────────
  const ribbon = document.createElement('div');
  ribbon.className = 'cmd-ribbon';

  const leftBtn = document.createElement('button');
  leftBtn.className = 'cmd-arrow';
  leftBtn.setAttribute('aria-label', 'Previous tree');
  leftBtn.textContent = '◀';
  leftBtn.addEventListener('click', () => {
    _lftActiveTreeIdx = (_lftActiveTreeIdx - 1 + LIFESTYLE_TREES.length) % LIFESTYLE_TREES.length;
    renderAll();
  });

  const titleSpan = document.createElement('span');
  titleSpan.className = 'cmd-ribbon-title';
  titleSpan.textContent = LIFESTYLE_TREES[_lftActiveTreeIdx].label;

  const countSpan = document.createElement('span');
  countSpan.className = 'cmd-ribbon-count';
  countSpan.textContent = `${_lftActiveTreeIdx + 1} / ${LIFESTYLE_TREES.length}`;

  const rightBtn = document.createElement('button');
  rightBtn.className = 'cmd-arrow';
  rightBtn.setAttribute('aria-label', 'Next tree');
  rightBtn.textContent = '▶';
  rightBtn.addEventListener('click', () => {
    _lftActiveTreeIdx = (_lftActiveTreeIdx + 1) % LIFESTYLE_TREES.length;
    renderAll();
  });

  ribbon.appendChild(leftBtn);
  ribbon.appendChild(titleSpan);
  ribbon.appendChild(countSpan);
  ribbon.appendChild(rightBtn);
  container.appendChild(ribbon);

  // ── Tier legend ───────────────────────────────────────────
  const legend = document.createElement('div');
  legend.className = 'magic-legend';
  legend.innerHTML =
    '<span class="ml-item ml-lft-root">Root</span>' +
    '<span class="ml-item ml-lft-branch">Branch</span>' +
    '<span class="ml-item ml-lft-mid">Advanced</span>' +
    '<span class="ml-item ml-lft-deep">Master</span>';
  container.appendChild(legend);

  const tree = LIFESTYLE_TREES[_lftActiveTreeIdx];

  // ── Tree wrapper ──────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.className = 'cmd-tree-wrapper';
  wrapper.style.aspectRatio = `${LFT_VW} / ${LFT_VH}`;

  // ── SVG connector lines ───────────────────────────────────
  const NS  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${LFT_VW} ${LFT_VH}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('class', 'cmd-tree-svg');

  // Root → branch[0] first node
  for (let bi = 0; bi < tree.branches.length; bi++) {
    const branch   = tree.branches[bi];
    const branchX  = LFT_COL_X[bi];
    const rootSel  = state.selectedTraits.has(tree.root);
    const firstSel = state.selectedTraits.has(branch.nodes[0]);

    const rootLine = document.createElementNS(NS, 'line');
    rootLine.setAttribute('x1', LFT_ROOT_X);
    rootLine.setAttribute('y1', LFT_ROOT_Y);
    rootLine.setAttribute('x2', branchX);
    rootLine.setAttribute('y2', LFT_ROW_Y[0]);
    rootLine.setAttribute('class', 'cmd-edge' + (rootSel && firstSel ? ' active' : ''));
    svg.appendChild(rootLine);

    // Sequential lines within branch
    for (let di = 0; di < branch.nodes.length - 1; di++) {
      const bothSel =
        state.selectedTraits.has(branch.nodes[di]) &&
        state.selectedTraits.has(branch.nodes[di + 1]);
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', branchX);
      line.setAttribute('y1', LFT_ROW_Y[di]);
      line.setAttribute('x2', branchX);
      line.setAttribute('y2', LFT_ROW_Y[di + 1]);
      line.setAttribute('class', 'cmd-edge' + (bothSel ? ' active' : ''));
      svg.appendChild(line);
    }
  }
  wrapper.appendChild(svg);

  // ── Helper: build a node div ──────────────────────────────
  function makeNode(id, role, depth, bi) {
    const t = traitMap[id];
    if (!t) return null;

    const sq          = search.trim();
    const matchSearch = !sq || t.label.toLowerCase().includes(sq) || t.id.includes(sq);
    const matchCost   =
      costFilter === 'positive' ? t.cost > 0  :
      costFilter === 'negative' ? t.cost < 0  :
      costFilter === 'zero'     ? t.cost === 0 : true;

    const isSelected = state.selectedTraits.has(id);
    const isDisabled = !isSelected && !canSelect(id);
    const tier       = _lftTier(role, depth);

    const classes = ['magic-node', tier];
    if (isSelected)                 classes.push('selected');
    if (isDisabled)                 classes.push('disabled');
    if (!matchSearch || !matchCost) classes.push('dim');

    const node = document.createElement('div');
    node.className = classes.join(' ');

    let px, py;
    if (role === 'root') {
      px = LFT_ROOT_X;
      py = LFT_ROOT_Y;
    } else {
      px = LFT_COL_X[bi];
      py = LFT_ROW_Y[depth];
    }
    node.style.left = `${(px / LFT_VW * 100).toFixed(3)}%`;
    node.style.top  = `${(py / LFT_VH * 100).toFixed(3)}%`;

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
      if (isBlockedByLifestyleRules(id)) {
        const found = _findLifestyleBranch(id);
        if (found && found.role === 'branch') {
          if (!state.selectedTraits.has(found.tree.root)) {
            const rootTrait = traitMap[found.tree.root];
            reason = `Requires: ${rootTrait ? rootTrait.label : found.tree.root}`;
          } else if (found.idx > 0 && !state.selectedTraits.has(found.branch.nodes[found.idx - 1])) {
            const prereqId    = found.branch.nodes[found.idx - 1];
            const prereqTrait = traitMap[prereqId];
            reason = `Requires: ${prereqTrait ? prereqTrait.label : prereqId}`;
          }
        }
      } else if (isBlockedByCatLimit(id)) {
        reason = 'Lifestyle trait limit reached';
      } else if (isBlockedByBudget(id)) {
        reason = 'Not enough points';
      }
      if (reason) node.setAttribute('title', reason);
    }

    attachTraitTooltip(node, id);
    return node;
  }

  // ── Root node ─────────────────────────────────────────────
  const rootNode = makeNode(tree.root, 'root', -1, -1);
  if (rootNode) wrapper.appendChild(rootNode);

  // ── Branch nodes ──────────────────────────────────────────
  for (let bi = 0; bi < tree.branches.length; bi++) {
    const branch = tree.branches[bi];
    for (let di = 0; di < branch.nodes.length; di++) {
      const n = makeNode(branch.nodes[di], 'branch', di, bi);
      if (n) wrapper.appendChild(n);
    }
  }

  container.appendChild(wrapper);
}
