// ============================================================
// render_traits.js — Renders the selected-trait chip strip and
// the scrollable trait browser (categories, group ladders,
// full trait cards).
// Depends on: config.js, state.js, trait_rules.js, tooltip.js,
//             render_appearance.js (costClass, costLabel)
// ============================================================

'use strict';

// ── Selected chips strip ──────────────────────────────────────
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

// ── Trait browser ─────────────────────────────────────────────
function renderTraitBrowser() {
  const browser = document.getElementById('trait-browser');
  browser.innerHTML = '';

  const search     = state.searchQuery.toLowerCase().trim();
  const costFilter = state.filterCost;
  const catFilter  = state.filterCat;
  const selOnly    = state.filterSelected;

  const cats = Object.keys(traitsByCat).sort((a, b) => {
    const oa = (CATEGORY_META[a] || {}).order || 99;
    const ob = (CATEGORY_META[b] || {}).order || 99;
    return oa - ob;
  });

  const activeCats = catFilter === 'all' ? cats : cats.filter(c => c === catFilter);

  for (const cat of activeCats) {
    const meta          = CATEGORY_META[cat] || { label: cat };
    const allTraitsInCat = traitsByCat[cat] || [];

    const filtered = allTraitsInCat.filter(t => {
      if (selOnly && !state.selectedTraits.has(t.id)) return false;
      if (search && !t.label.toLowerCase().includes(search) && !t.id.toLowerCase().includes(search)) return false;
      if (costFilter === 'positive' && !(t.cost > 0)) return false;
      if (costFilter === 'negative' && !(t.cost < 0)) return false;
      if (costFilter === 'zero'     && t.cost !== 0)  return false;
      return true;
    });

    if (filtered.length === 0) continue;

    const catEl = document.createElement('div');
    catEl.className = 'trait-category';

    const collapsed = state.collapsedCats.has(cat);

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

    const body = document.createElement('div');
    body.className = 'cat-body' + (collapsed ? ' hidden' : '');

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

// ── Trait card builders ───────────────────────────────────────
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
    card.addEventListener('click', () => toggleTrait(t.id));
  } else {
    let reason = '';
    if (isBlockedByMagicRules(t.id))    reason = 'Magic requirements not met';
    else if (isBlockedByOpposites(t.id)) reason = 'Blocked by opposite trait';
    else if (isBlockedByGroup(t.id))     reason = 'Group already selected';
    else if (isBlockedByCatLimit(t.id))  reason = 'Category limit reached';
    else if (isBlockedByBudget(t.id))    reason = 'Not enough points';
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
    if (isBlockedByMagicRules(t.id))    reason = 'Magic requirements not met';
    else if (isBlockedByOpposites(t.id)) reason = 'Blocked by opposite trait';
    else if (isBlockedByGroup(t.id))     reason = 'Group: pick one tier only';
    else if (isBlockedByBudget(t.id))    reason = 'Not enough points';
    card.title = reason;
  }

  attachTraitTooltip(card, t.id);
  return card;
}
