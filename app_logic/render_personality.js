// ============================================================
// render_personality.js — Renders personality traits as three
// paged SVG layouts using the same magic-node system as
// render_magic.js and render_commander.js.
// Each page shows 7 triads as horizontal rows: left | mid | right.
// Depends on: config.js, state.js, trait_rules.js, tooltip.js,
//             render_appearance.js (costClass, costLabel)
// ============================================================

'use strict';

let _persActivePage = 0;

const PERS_VW = 760;
const PERS_VH = 480;

// X position for each column: deficiency | ideal | excess
const PERS_COL_X = { left: 120, mid: 380, right: 640 };

// Y positions for 7 rows per page
const PERS_ROW_Y = [50, 117, 184, 251, 318, 385, 452];

// 21 triads split across 3 pages of 7
const PERSONALITY_TRIADS = [
  { group: 'triad_social',      left: 'shy',        mid: 'gregarious',    right: 'eccentric'         },
  { group: 'triad_courage',     left: 'craven',     mid: 'brave',         right: 'reckless'          },
  { group: 'triad_drive',       left: 'lazy',       mid: 'ambitious',     right: 'greedy'            },
  { group: 'triad_appetite',    left: 'gluttonous', mid: 'temperate',     right: 'insensible'        },
  { group: 'triad_self_worth',  left: 'diffident',  mid: 'humble',        right: 'arrogant'          },
  { group: 'triad_decision',    left: 'indecisive', mid: 'calculating',   right: 'impulsive'         },
  { group: 'triad_desire',      left: 'chaste',     mid: 'content',       right: 'lustful'           },
  { group: 'triad_composure',   left: 'oblivious',  mid: 'calm',          right: 'anxious'           },
  { group: 'triad_trust',       left: 'paranoid',   mid: 'cautious',      right: 'trusting'          },
  { group: 'triad_work_ethic',  left: 'careless',   mid: 'diligent',      right: 'perfectionist'     },
  { group: 'triad_patience',    left: 'impatient',  mid: 'patient',       right: 'complacent'        },
  { group: 'triad_honesty',     left: 'deceitful',  mid: 'honest',        right: 'easily_influenced' },
  { group: 'triad_presence',    left: 'awkward',    mid: 'charismatic',   right: 'manipulative'      },
  { group: 'triad_empathy',     left: 'callous',    mid: 'compassionate', right: 'bleeding_heart'    },
  { group: 'triad_authority',   left: 'push_over',  mid: 'authoritative', right: 'wrathful'          },
  { group: 'triad_experience',  left: 'naive',      mid: 'experienced',   right: 'worldly'           },
  { group: 'triad_faith',       left: 'cynical',    mid: 'zealous',       right: 'fanatic'           },
  { group: 'triad_flexibility', left: 'fickle',     mid: 'open_minded',   right: 'stubborn'          },
  { group: 'triad_justice',     left: 'arbitrary',  mid: 'just',          right: 'rigid'             },
  { group: 'triad_expression',  left: 'stoic',      mid: 'composed',      right: 'expressive'        },
  { group: 'triad_vengeance',   left: 'vengeful',   mid: 'objective',     right: 'forgiving'         },
];

const PERS_PAGES = [
  PERSONALITY_TRIADS.slice(0,  7),
  PERSONALITY_TRIADS.slice(7,  14),
  PERSONALITY_TRIADS.slice(14, 21),
];

const PERS_PAGE_LABELS = ['Page 1', 'Page 2', 'Page 3'];

// ── Main renderer ─────────────────────────────────────────────
function renderPersonalityTriads(container, allTraits, search, costFilter) {
  const traitMap = {};
  for (const t of allTraits) traitMap[t.id] = t;

  // ── Ribbon ────────────────────────────────────────────────
  const ribbon = document.createElement('div');
  ribbon.className = 'cmd-ribbon';

  const leftBtn = document.createElement('button');
  leftBtn.className = 'cmd-arrow';
  leftBtn.setAttribute('aria-label', 'Previous page');
  leftBtn.textContent = '◀';
  leftBtn.addEventListener('click', () => {
    _persActivePage = (_persActivePage - 1 + PERS_PAGES.length) % PERS_PAGES.length;
    renderAll();
  });

  const titleSpan = document.createElement('span');
  titleSpan.className = 'cmd-ribbon-title';
  titleSpan.textContent = 'Personality';

  const countSpan = document.createElement('span');
  countSpan.className = 'cmd-ribbon-count';
  countSpan.textContent = `${_persActivePage + 1} / ${PERS_PAGES.length}`;

  const rightBtn = document.createElement('button');
  rightBtn.className = 'cmd-arrow';
  rightBtn.setAttribute('aria-label', 'Next page');
  rightBtn.textContent = '▶';
  rightBtn.addEventListener('click', () => {
    _persActivePage = (_persActivePage + 1) % PERS_PAGES.length;
    renderAll();
  });

  ribbon.appendChild(leftBtn);
  ribbon.appendChild(titleSpan);
  ribbon.appendChild(countSpan);
  ribbon.appendChild(rightBtn);
  container.appendChild(ribbon);

  // ── Legend ────────────────────────────────────────────────
  const legend = document.createElement('div');
  legend.className = 'magic-legend';
  legend.innerHTML =
    '<span class="ml-item ml-pnt-pos">Positive (+25)</span>' +
    '<span class="ml-item ml-pnt-zero">Neutral (±0)</span>' +
    '<span class="ml-item ml-pnt-neg">Flaw (-15)</span>';
  container.appendChild(legend);

  const page = PERS_PAGES[_persActivePage];

  // ── Tree wrapper ──────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.className = 'pers-tree-wrapper';
  wrapper.style.aspectRatio = `${PERS_VW} / ${PERS_VH}`;

  // ── SVG edges ─────────────────────────────────────────────
  const NS  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${PERS_VW} ${PERS_VH}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('class', 'pers-tree-svg');

  for (let ri = 0; ri < page.length; ri++) {
    const triad  = page[ri];
    const y      = PERS_ROW_Y[ri];
    const lx     = PERS_COL_X.left;
    const mx     = PERS_COL_X.mid;
    const rx     = PERS_COL_X.right;

    const lSel = state.selectedTraits.has(triad.left);
    const mSel = state.selectedTraits.has(triad.mid);
    const rSel = state.selectedTraits.has(triad.right);

    const lineL = document.createElementNS(NS, 'line');
    lineL.setAttribute('x1', lx); lineL.setAttribute('y1', y);
    lineL.setAttribute('x2', mx); lineL.setAttribute('y2', y);
    lineL.setAttribute('class', 'pers-edge' + (lSel || mSel ? ' active' : ''));
    svg.appendChild(lineL);

    const lineR = document.createElementNS(NS, 'line');
    lineR.setAttribute('x1', mx); lineR.setAttribute('y1', y);
    lineR.setAttribute('x2', rx); lineR.setAttribute('y2', y);
    lineR.setAttribute('class', 'pers-edge' + (mSel || rSel ? ' active' : ''));
    svg.appendChild(lineR);
  }

  wrapper.appendChild(svg);

  // ── Nodes ─────────────────────────────────────────────────
  for (let ri = 0; ri < page.length; ri++) {
    const triad = page[ri];
    const y     = PERS_ROW_Y[ri];

    for (const [side, id] of [['left', triad.left], ['mid', triad.mid], ['right', triad.right]]) {
      const t = traitMap[id];
      if (!t) continue;

      const x = PERS_COL_X[side];

      const sq          = search.trim();
      const matchSearch = !sq || t.label.toLowerCase().includes(sq) || t.id.includes(sq);
      const matchCost   =
        costFilter === 'positive' ? t.cost > 0  :
        costFilter === 'negative' ? t.cost < 0  :
        costFilter === 'zero'     ? t.cost === 0 : true;

      const isSelected = state.selectedTraits.has(id);
      const groupPeers = traitsByGroup[t.group] || [];
      // Triad-locked: another group member is selected — clicking auto-switches
      const triLocked  = !isSelected && groupPeers.some(p => p.id !== id && state.selectedTraits.has(p.id));
      const isDisabled = !isSelected && !triLocked && !canSelect(id);

      const costTier = t.cost > 0 ? 'pnt-pos' : t.cost < 0 ? 'pnt-neg' : 'pnt-zero';

      const classes = ['magic-node', costTier];
      if (isSelected)                   classes.push('selected');
      if (isDisabled)                   classes.push('disabled');
      if (triLocked)                    classes.push('pers-tri-locked');
      if (!matchSearch || !matchCost)   classes.push('dim');

      const node = document.createElement('div');
      node.className = classes.join(' ');
      node.style.left = `${(x / PERS_VW * 100).toFixed(3)}%`;
      node.style.top  = `${(y / PERS_VH * 100).toFixed(3)}%`;

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
        if (isBlockedByBudget(id))         reason = 'Not enough points';
        else if (isBlockedByCatLimit(id))  reason = 'Category limit reached (5)';
        else if (isBlockedByOpposites(id)) reason = 'Blocked by opposite trait';
        if (reason) node.setAttribute('title', reason);
      }

      attachTraitTooltip(node, id);
      wrapper.appendChild(node);
    }
  }

  container.appendChild(wrapper);
}
