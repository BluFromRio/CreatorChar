// ============================================================
// render_commander.js — Renders the Commander tab as two
// switchable prerequisite trees (Strategic Expert / Terrain Expert).
// Uses the same SVG-node approach as render_magic.js.
// Depends on: config.js, state.js, trait_rules.js (CMD_TREES),
//             tooltip.js, render_appearance.js (costClass, costLabel)
// ============================================================

'use strict';

// Which tree is currently shown (0 = Strategic, 1 = Terrain).
// Module-level so it survives re-renders triggered by renderAll().
let _cmdActiveTreeIdx = 0;

// SVG viewport width (shared); height varies per tree.
const CMD_VW = 760;

// Height of the SVG canvas per tree index.
const CMD_VH = [500, 500];

// Column x-positions for the 4 branches (in viewBox units).
const CMD_COL_X = [95, 285, 475, 665];

// Row y-positions per tree: both trees now have 4 levels.
const CMD_ROW_Y = [
  [55, 170, 285, 400],   // strategic
  [55, 170, 285, 400],   // terrain
];

// Returns SVG coords for a given tree/branch/level combination.
function _cmdNodePos(treeIdx, branchIdx, levelIdx) {
  return { x: CMD_COL_X[branchIdx], y: CMD_ROW_Y[treeIdx][levelIdx] };
}

// CSS tier class based on depth within a branch.
function _cmdTier(levelIdx) {
  if (levelIdx === 0) return 'cmt-root';
  if (levelIdx === 1) return 'cmt-mid';
  if (levelIdx === 2) return 'cmt-deep';
  return 'cmt-expert'; // level 3, terrain only
}

// ── Main renderer ─────────────────────────────────────────────
// container : the .cat-body div provided by renderTraitBrowser
// allCmdTraits : all trait objects in the 'commander' category
// search      : current search string (already lowercased)
// costFilter  : 'all' | 'positive' | 'negative' | 'zero'
function renderCommanderTree(container, allCmdTraits, search, costFilter) {
  const traitMap = {};
  for (const t of allCmdTraits) traitMap[t.id] = t;

  // ── Ribbon title with left/right arrows ───────────────────
  const ribbon = document.createElement('div');
  ribbon.className = 'cmd-ribbon';

  const leftBtn = document.createElement('button');
  leftBtn.className = 'cmd-arrow';
  leftBtn.setAttribute('aria-label', 'Previous tree');
  leftBtn.textContent = '◀';
  leftBtn.addEventListener('click', () => {
    _cmdActiveTreeIdx = (_cmdActiveTreeIdx - 1 + CMD_TREES.length) % CMD_TREES.length;
    renderAll();
  });

  const titleSpan = document.createElement('span');
  titleSpan.className = 'cmd-ribbon-title';
  titleSpan.textContent = CMD_TREES[_cmdActiveTreeIdx].label;

  const treeCountSpan = document.createElement('span');
  treeCountSpan.className = 'cmd-ribbon-count';
  treeCountSpan.textContent = `${_cmdActiveTreeIdx + 1} / ${CMD_TREES.length}`;

  const rightBtn = document.createElement('button');
  rightBtn.className = 'cmd-arrow';
  rightBtn.setAttribute('aria-label', 'Next tree');
  rightBtn.textContent = '▶';
  rightBtn.addEventListener('click', () => {
    _cmdActiveTreeIdx = (_cmdActiveTreeIdx + 1) % CMD_TREES.length;
    renderAll();
  });

  ribbon.appendChild(leftBtn);
  ribbon.appendChild(titleSpan);
  ribbon.appendChild(treeCountSpan);
  ribbon.appendChild(rightBtn);
  container.appendChild(ribbon);

  // ── Tier legend ───────────────────────────────────────────
  const legend = document.createElement('div');
  legend.className = 'magic-legend';
  legend.innerHTML =
    '<span class="ml-item ml-cmt-root">Branch Root</span>' +
    '<span class="ml-item ml-cmt-mid">Advanced</span>' +
    '<span class="ml-item ml-cmt-deep">Expert</span>' +
    '<span class="ml-item ml-cmt-expert">Master</span>';
  container.appendChild(legend);

  const tree   = CMD_TREES[_cmdActiveTreeIdx];
  const treeIdx = _cmdActiveTreeIdx;
  const VH      = CMD_VH[treeIdx];

  // ── Tree wrapper (relative-positioned host for SVG + nodes) ─
  const wrapper = document.createElement('div');
  wrapper.className = 'cmd-tree-wrapper';
  wrapper.style.aspectRatio = `${CMD_VW} / ${VH}`;

  // ── SVG connector lines ───────────────────────────────────
  const NS  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${CMD_VW} ${VH}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('class', 'cmd-tree-svg');

  for (let bi = 0; bi < tree.branches.length; bi++) {
    const branch = tree.branches[bi];
    for (let li = 0; li < branch.nodes.length - 1; li++) {
      const pa = _cmdNodePos(treeIdx, bi, li);
      const pb = _cmdNodePos(treeIdx, bi, li + 1);
      const bothSelected =
        state.selectedTraits.has(branch.nodes[li]) &&
        state.selectedTraits.has(branch.nodes[li + 1]);
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', pa.x); line.setAttribute('y1', pa.y);
      line.setAttribute('x2', pb.x); line.setAttribute('y2', pb.y);
      line.setAttribute('class', 'cmd-edge' + (bothSelected ? ' active' : ''));
      svg.appendChild(line);
    }
  }
  wrapper.appendChild(svg);

  // ── Nodes ─────────────────────────────────────────────────
  for (let bi = 0; bi < tree.branches.length; bi++) {
    const branch = tree.branches[bi];
    for (let li = 0; li < branch.nodes.length; li++) {
      const id = branch.nodes[li];
      const t  = traitMap[id];
      if (!t) continue;

      const pos = _cmdNodePos(treeIdx, bi, li);

      const sq = search.trim();
      const matchSearch = !sq || t.label.toLowerCase().includes(sq) || t.id.includes(sq);
      const matchCost   =
        costFilter === 'positive' ? t.cost > 0  :
        costFilter === 'negative' ? t.cost < 0  :
        costFilter === 'zero'     ? t.cost === 0 : true;

      const isSelected = state.selectedTraits.has(id);
      const isDisabled = !isSelected && !canSelect(id);
      const tier       = _cmdTier(li);

      const classes = ['magic-node', tier];
      if (isSelected)                 classes.push('selected');
      if (isDisabled)                 classes.push('disabled');
      if (!matchSearch || !matchCost) classes.push('dim');

      const node = document.createElement('div');
      node.className = classes.join(' ');
      node.style.left = `${(pos.x / CMD_VW * 100).toFixed(3)}%`;
      node.style.top  = `${(pos.y / VH   * 100).toFixed(3)}%`;

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
        if (isBlockedByCommanderRules(id)) {
          // Distinguish prereq-missing from branch-conflict
          if (li > 0 && !state.selectedTraits.has(branch.nodes[li - 1])) {
            const prereqLabel = traitMap[branch.nodes[li - 1]]
              ? traitMap[branch.nodes[li - 1]].label
              : branch.nodes[li - 1];
            reason = `Requires: ${prereqLabel}`;
          } else {
            reason = 'Another branch is already active';
          }
        } else if (isBlockedByCatLimit(id)) {
          reason = 'Commander trait limit reached (4 max)';
        } else if (isBlockedByBudget(id)) {
          reason = 'Not enough points';
        }
        if (reason) node.setAttribute('title', reason);
      }

      attachTraitTooltip(node, id);
      wrapper.appendChild(node);
    }
  }

  container.appendChild(wrapper);
}
