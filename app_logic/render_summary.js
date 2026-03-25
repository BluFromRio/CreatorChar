// ============================================================
// render_summary.js — Renders the character sheet: portrait,
// appearance summary, traits by category, narrative text,
// stat totals, warnings, and the master renderAll function.
// Depends on: config.js, state.js, stats.js, trait_rules.js,
//             tooltip.js, render_appearance.js
// ============================================================

'use strict';

// ── Portrait + appearance summary ────────────────────────────
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

  if (state.skinTone) {
    document.getElementById('portrait-circle').style.borderColor = state.skinTone;
    document.getElementById('portrait-initials').style.color = state.skinTone;
  }

  // Appearance rows
  const appearanceDiv = document.getElementById('appearance-summary');
  const heightCm = state.height;
  const heightFt = Math.floor(heightCm / 30.48);
  const heightIn = Math.round((heightCm / 2.54) % 12);
  const rows = [
    ['Race',        RACE_LABELS[state.race] || 'Human'],
    ['Orientation', state.orientation || '—'],
    ['Height',      `${heightCm} cm (${heightFt}′${heightIn}″)`],
    ['Build',       getWeightLabel(state.weight)],
    ['Skin',        state.skinTone ? getColorDisplay(state.skinTone, state.skinName, SKIN_TONES) : '—'],
    ['Eyes',        state.eyeColor || '—'],
    ['Hair Color',  state.hairColor || '—'],
    ['Hair Style',  state.hairStyle || '—'],
  ];
  appearanceDiv.innerHTML = rows.map(([k, v]) =>
    `<div class="summary-row"><span class="summary-key">${k}</span><span class="summary-val">${v}</span></div>`
  ).join('');

  // Traits by category
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

  renderNarrative();
  renderStatTotals();
  renderWarnings();
}

// ── Article helper ────────────────────────────────────────────
function articleFor(word) {
  return /^[aeiou]/i.test((word || '').trim()) ? 'an' : 'a';
}

// ── Narrative text ────────────────────────────────────────────
function renderNarrative() {
  const narEl  = document.getElementById('narrative-text');
  const taEl   = document.getElementById('narrative-custom');
  const btnGen = document.getElementById('btn-nar-generated');
  const btnCus = document.getElementById('btn-nar-custom');

  const isCustom = state.narrativeMode === 'custom';
  if (btnGen) btnGen.classList.toggle('active', !isCustom);
  if (btnCus) btnCus.classList.toggle('active',  isCustom);

  if (isCustom) {
    narEl.style.display = 'none';
    if (taEl) taEl.style.display = '';
    return;
  }

  narEl.style.display = '';
  if (taEl) taEl.style.display = 'none';

  const parts = [];
  const nameStr  = state.name.trim();
  const namePart = nameStr
    ? (state.nickname ? `${nameStr}, known as "${state.nickname}",` : nameStr)
    : 'This character';

  const raceLabel  = RACE_LABELS[state.race] || '';
  const pronounWord = getPronounWord();

  // Sentence 1: identity
  let intro = `${namePart} is`;
  if (raceLabel) {
    intro += ` ${articleFor(raceLabel)} ${raceLabel.toLowerCase()}`;
    if (state.age) intro += ` of ${state.age} years`;
  } else {
    if (state.age) intro += ` ${state.age} years old`;
  }
  intro += '.';
  parts.push(intro);

  // Sentence 2: physical appearance
  const bodyParts = [];
  const heightDesc = describeHeight(state.height);
  if (heightDesc) bodyParts.push(heightDesc);
  bodyParts.push(`${getWeightLabel(state.weight).toLowerCase()} in build`);
  if (state.skinTone) bodyParts.push(`${getColorDisplay(state.skinTone, state.skinName, SKIN_TONES).toLowerCase()}-skinned`);
  if (state.eyeColor) bodyParts.push(`${state.eyeColor.toLowerCase()}-eyed`);
  if (state.hairStyle || state.hairColor) {
    const hc = state.hairColor ? state.hairColor.toLowerCase() : '';
    const hs = state.hairStyle ? state.hairStyle.toLowerCase() : '';
    if (hc && hs)      bodyParts.push(`with ${hc} ${hs} hair`);
    else if (hc)       bodyParts.push(`with ${hc} hair`);
    else if (hs)       bodyParts.push(`with ${hs} hair`);
  }
  if (bodyParts.length > 0) {
    parts.push(`${pronounWord.cap} is ${bodyParts.join(', ')}.`);
  }

  // Trait sentences
  if (state.selectedTraits.size > 0) {
    const selected = [...state.selectedTraits].map(id => traitById[id]).filter(Boolean);
    const personalityTraits = selected.filter(t => t.category === 'personality').map(t => t.label.toLowerCase());
    const otherTraits       = selected.filter(t => t.category !== 'personality' && t.category !== 'education').map(t => t.label.toLowerCase());
    const eduTraits         = selected.filter(t => t.category === 'education').map(t => t.label);

    if (personalityTraits.length > 0)
      parts.push(`${pronounWord.cap} is ${listToEnglish(personalityTraits)} by nature.`);

    if (eduTraits.length > 0) {
      const label = eduTraits[0];
      parts.push(`${pronounWord.cap} received ${articleFor(label)} ${label} education.`);
    }

    if (otherTraits.length > 0)
      parts.push(`${pronounWord.cap} is also known for ${listToEnglish(otherTraits.slice(0, 4))}.`);
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
  if (p.startsWith('he'))  return { cap: 'He',   lower: 'he',   obj: 'him',  pos: 'his'   };
  if (p.startsWith('she')) return { cap: 'She',  lower: 'she',  obj: 'her',  pos: 'her'   };
  return                          { cap: 'They', lower: 'they', obj: 'them', pos: 'their' };
}

function listToEnglish(items) {
  if (!items.length) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
}

// ── Warnings ──────────────────────────────────────────────────
function renderWarnings() {
  const area     = document.getElementById('warnings-area');
  const warnings = [];

  const spent = calcPointsSpent();
  if (spent > CONFIG.POINT_BUDGET) {
    warnings.push({
      type: 'budget-warn',
      msg: `Over budget by ${spent - CONFIG.POINT_BUDGET} points! Some traits must be removed.`,
    });
  }

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

  if (warnings.length === 0) { area.style.display = 'none'; return; }
  area.style.display = '';
  area.innerHTML = warnings.map(w => `<div class="warning-item ${w.type}">${w.msg}</div>`).join('');
}

// ── Stat totals ───────────────────────────────────────────────
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
    const catHdr = document.createElement('div');
    catHdr.className = 'stat-cat-header';
    catHdr.textContent = cat.label;
    el.appendChild(catHdr);

    if (catKey === 'skills') {
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

// ── Populate category filter dropdown ────────────────────────
function populateCatFilter() {
  const sel  = document.getElementById('trait-filter-cat');
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

// ── Master render ─────────────────────────────────────────────
function renderAll() {
  renderBudget();
  renderSelectedStrip();
  renderTraitBrowser();
  renderSummary();
}
