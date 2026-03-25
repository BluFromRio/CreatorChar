// ============================================================
// persistence.js — Save/load (localStorage + file), export
// (JSON, TXT, clipboard), toast notifications, and resetAll.
// Depends on: config.js, state.js, stats.js, trait_rules.js,
//             render_appearance.js, render_summary.js
// ============================================================

'use strict';

// ── Toast notification ────────────────────────────────────────
function showToast(msg, type = 'success') {
  const toast = document.getElementById('copy-toast');
  toast.textContent = msg;
  toast.className = 'copy-toast show' + (type === 'error' ? ' error' : '');
  setTimeout(() => { toast.classList.remove('show', 'error'); }, type === 'error' ? 4000 : 2000);
}

// ── Save / load (localStorage) ────────────────────────────────
function buildSaveData() {
  return {
    version: 1,
    name:     state.name,
    nickname: state.nickname,
    age:      state.age,
    pronouns:    state.pronouns,
    orientation: state.orientation,
    race:        state.race,
    height:   state.height,
    weight:   state.weight,
    skinTone: state.skinTone,
    skinHex:  state.skinHex,
    skinName: state.skinName,
    eyeHex:   state.eyeHex,
    eyeColor: state.eyeColor,
    eyeName:  state.eyeName,
    hairColorHex:  state.hairColorHex,
    hairColor:     state.hairColor,
    hairColorName: state.hairColorName,
    hairStyle:   state.hairStyle,
    selectedTraits: [...state.selectedTraits],
    narrativeMode:   state.narrativeMode,
    customNarrative: state.customNarrative,
  };
}

function applySaveData(data) {
  if (!data || data.version !== 1) return;
  state.name     = data.name     || '';
  state.nickname = data.nickname || '';
  state.age      = data.age      || '';
  state.pronouns    = data.pronouns    || '';
  state.orientation = data.orientation || '';
  state.race        = data.race        || 'human';
  state.height   = data.height   || 170;
  state.weight   = data.weight   || 50;
  state.skinTone = data.skinTone || null;
  state.skinHex  = data.skinHex  || '#c68642';
  state.skinName = data.skinName || '';

  // Eye color — support old saves (eyeColor label only) and new (eyeHex + eyeName)
  state.eyeHex  = data.eyeHex  || null;
  state.eyeName = data.eyeName || '';
  if (!state.eyeHex && data.eyeColor) {
    const m = EYE_COLORS.find(e => e.label === data.eyeColor);
    if (m) state.eyeHex = m.hex;
  }
  state.eyeColor = state.eyeHex
    ? getColorDisplay(state.eyeHex, state.eyeName, EYE_COLORS)
    : null;

  // Hair color — same pattern
  state.hairColorHex  = data.hairColorHex  || null;
  state.hairColorName = data.hairColorName || '';
  if (!state.hairColorHex && data.hairColor) {
    const m = HAIR_COLORS.find(h => h.label === data.hairColor);
    if (m) state.hairColorHex = m.hex;
  }
  state.hairColor = state.hairColorHex
    ? getColorDisplay(state.hairColorHex, state.hairColorName, HAIR_COLORS)
    : null;

  state.hairStyle= data.hairStyle|| null;
  state.selectedTraits = new Set(data.selectedTraits || []);
  state.narrativeMode   = data.narrativeMode   || 'generated';
  state.customNarrative = data.customNarrative || '';
  const narTa = document.getElementById('narrative-custom');
  if (narTa) narTa.value = state.customNarrative;

  // Sync DOM inputs
  document.getElementById('char-name').value     = state.name;
  document.getElementById('char-nickname').value = state.nickname;
  document.getElementById('char-age').value      = state.age;
  document.getElementById('char-pronouns').value    = state.pronouns;
  document.getElementById('char-orientation').value = state.orientation;
  document.querySelectorAll('.race-btn').forEach(b => b.classList.toggle('selected', b.dataset.race === state.race));
  // Apply race height cap before syncing DOM
  const loadedCap = RACE_HEIGHT_CAPS[state.race] || 230;
  if (state.height > loadedCap) state.height = loadedCap;
  const heightSlider = document.getElementById('char-height');
  heightSlider.max   = loadedCap;
  heightSlider.value = state.height;
  document.getElementById('char-weight').value   = state.weight;
  document.getElementById('height-val').textContent  = formatFtIn(state.height);
  document.getElementById('weight-val').textContent  = getWeightLabel(state.weight);
  document.getElementById('weight-lbs').textContent  = ` · ${getWeightLbs(state.weight)} lbs`;
  const loadedHint = document.getElementById('height-cap-hint');
  if (RACE_HEIGHT_CAPS[state.race]) {
    loadedHint.textContent = `Max for ${RACE_LABELS[state.race]}: ${formatFtIn(loadedCap)}`;
    loadedHint.style.display = '';
  } else {
    loadedHint.style.display = 'none';
  }

  if (state.skinHex) {
    document.getElementById('skin-hex').value = state.skinHex;
    document.getElementById('skin-hex-preview').style.background = state.skinHex;
    document.getElementById('skin-hex-name').value = state.skinName;
  }
  if (state.eyeHex) {
    document.getElementById('eye-hex').value = state.eyeHex;
    document.getElementById('eye-hex-preview').style.background = state.eyeHex;
    document.getElementById('eye-hex-name').value = state.eyeName;
  }
  if (state.hairColorHex) {
    document.getElementById('hair-color-hex').value = state.hairColorHex;
    document.getElementById('hair-color-hex-preview').style.background = state.hairColorHex;
    document.getElementById('hair-color-hex-name').value = state.hairColorName;
  }

  reconcileCommanderState();
  reconcileHeightTraits();
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

// ── Export ────────────────────────────────────────────────────
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
    state.pronouns    ? `Pronouns:    ${state.pronouns}` : null,
    state.orientation ? `Orientation: ${state.orientation}` : null,
    `Race:        ${RACE_LABELS[state.race] || 'Human'}`,
    '',
    '── APPEARANCE ──',
    `Height:   ${heightCm} cm (${heightFt}′${heightIn}″)`,
    `Build:    ${getWeightLabel(state.weight)}`,
    state.skinTone  ? `Skin:     ${getColorDisplay(state.skinTone, state.skinName, SKIN_TONES)}` : null,
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
  lines.push(state.narrativeMode === 'custom'
    ? state.customNarrative
    : document.getElementById('narrative-text').textContent);
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

  const skillsByCore = {};
  for (const s of STAT_CATEGORIES.skills.stats) {
    const cs = SKILL_CORE_STAT[s];
    if (!skillsByCore[cs]) skillsByCore[cs] = {};
    skillsByCore[cs][s] = { base: jsonBase[s] ?? 0, trait_modifier: jsonDeltas[s], total: jsonTotals[s] };
  }

  const data = {
    character: buildSaveData(),
    narrative: state.narrativeMode === 'custom'
      ? state.customNarrative
      : document.getElementById('narrative-text').textContent,
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

// ── File load ─────────────────────────────────────────────────
function loadFromFile() {
  const input = document.getElementById('file-load-input');
  input.value = '';
  input.click();
}

function handleFileLoad(e) {
  const file = e.target.files[0];
  if (!file) return;

  const ext = file.name.split('.').pop().toLowerCase();
  if (ext !== 'json' && ext !== 'txt') {
    showToast('Invalid file type. Use a .json or .txt export.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onerror = () => showToast('Could not read the file.', 'error');
  reader.onload = evt => {
    if (ext === 'json') loadFromJSON(evt.target.result);
    else                loadFromTxt(evt.target.result);
  };
  reader.readAsText(file, 'utf-8');
}

function loadFromJSON(content) {
  let data;
  try { data = JSON.parse(content); }
  catch { showToast('File is not valid JSON.', 'error'); return; }

  if (!data || typeof data !== 'object' || !data.character || data.character.version !== 1) {
    showToast('Not a valid Character Codex file.', 'error');
    return;
  }

  applySaveData(data.character);
  renderSkinSwatches();
  renderEyeSwatches();
  renderHairColorSwatches();
  renderHairStyleGrid();
  renderAll();
  showToast('Character loaded!');
}

function loadFromTxt(content) {
  const lines = content.split('\n').map(l => l.trimEnd());

  const hasHeader  = lines.some(l => l.startsWith('═══'));
  const hasCharLine = lines.some(l => l.startsWith('CHARACTER:'));
  if (!hasHeader || !hasCharLine) {
    showToast('Not a valid Character Codex file.', 'error');
    return;
  }

  function extract(prefix) {
    const lp = prefix.toLowerCase();
    for (const line of lines) {
      const t = line.trim();
      if (t.toLowerCase().startsWith(lp)) {
        const ci = t.indexOf(':');
        if (ci !== -1) return t.slice(ci + 1).trim();
      }
    }
    return null;
  }

  const raceByLabel = {};
  for (const [id, label] of Object.entries(RACE_LABELS)) raceByLabel[label.toLowerCase()] = id;

  const skinByLabel = {};
  for (const s of SKIN_TONES) skinByLabel[s.label.toLowerCase()] = s.hex;

  const weightByLabel = {};
  for (const [lo, hi, label] of WEIGHT_LABELS) weightByLabel[label.toLowerCase()] = Math.round((lo + hi) / 2);

  const traitByLabel = {};
  for (const t of CK3_TRAITS) traitByLabel[t.label.toLowerCase()] = t.id;

  state.name        = extract('name')        || '';
  state.nickname    = extract('nickname')    || '';
  state.age         = extract('age')         || '';
  state.pronouns    = extract('pronouns')    || '';
  state.orientation = extract('orientation') || '';
  state.race        = raceByLabel[(extract('race') || '').toLowerCase()] || 'human';

  const heightRaw = extract('height');
  if (heightRaw) {
    const m = heightRaw.match(/(\d+)\s*cm/);
    if (m) state.height = parseInt(m[1], 10);
  }

  const buildRaw = extract('build');
  if (buildRaw) {
    const wv = weightByLabel[buildRaw.toLowerCase()];
    if (wv !== undefined) state.weight = wv;
  }

  const skinRaw = extract('skin');
  state.skinTone = skinRaw ? (skinByLabel[skinRaw.toLowerCase()] || null) : null;
  state.skinHex  = state.skinTone || '#c68642';
  state.skinName = '';

  const eyesRaw = extract('eyes') || null;
  if (eyesRaw) {
    const eyePreset = EYE_COLORS.find(e => e.label.toLowerCase() === eyesRaw.toLowerCase());
    state.eyeHex   = eyePreset ? eyePreset.hex : null;
    state.eyeName  = '';
    state.eyeColor = eyePreset ? eyePreset.label : eyesRaw;
  } else {
    state.eyeHex = null; state.eyeName = ''; state.eyeColor = null;
  }

  const hairRaw = extract('hair');
  if (hairRaw) {
    const parts = hairRaw.split(',').map(p => p.trim());
    const hairLabel = parts[0] || null;
    state.hairStyle = parts[1] || null;
    if (hairLabel) {
      const hairPreset = HAIR_COLORS.find(h => h.label.toLowerCase() === hairLabel.toLowerCase());
      state.hairColorHex  = hairPreset ? hairPreset.hex : null;
      state.hairColorName = '';
      state.hairColor     = hairPreset ? hairPreset.label : hairLabel;
    } else {
      state.hairColorHex = null; state.hairColorName = ''; state.hairColor = null;
    }
  } else {
    state.hairColorHex = null; state.hairColorName = ''; state.hairColor = null;
    state.hairStyle = null;
  }

  state.selectedTraits.clear();
  let inTraits = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('── TRAITS')) { inTraits = true; continue; }
    if (t.startsWith('── STATS'))  { inTraits = false; continue; }
    if (!inTraits) continue;
    if (t.startsWith('[') && t.endsWith(']')) continue;
    if (t.startsWith('Points used:')) continue;
    if (!t) continue;
    const m = t.match(/^(.+?)\s*\([^)]+pts\)\s*$/);
    if (m) {
      const id = traitByLabel[m[1].trim().toLowerCase()];
      if (id) state.selectedTraits.add(id);
    }
  }

  document.getElementById('char-name').value        = state.name;
  document.getElementById('char-nickname').value    = state.nickname;
  document.getElementById('char-age').value         = state.age;
  document.getElementById('char-pronouns').value    = state.pronouns;
  document.getElementById('char-orientation').value = state.orientation;
  document.querySelectorAll('.race-btn').forEach(b =>
    b.classList.toggle('selected', b.dataset.race === state.race));
  // Apply race height cap before syncing DOM
  const txtCap = RACE_HEIGHT_CAPS[state.race] || 230;
  if (state.height > txtCap) state.height = txtCap;
  const txtSlider = document.getElementById('char-height');
  txtSlider.max   = txtCap;
  txtSlider.value = state.height;
  document.getElementById('char-weight').value      = state.weight;
  document.getElementById('height-val').textContent = formatFtIn(state.height);
  document.getElementById('weight-val').textContent = getWeightLabel(state.weight);
  document.getElementById('weight-lbs').textContent = ` · ${getWeightLbs(state.weight)} lbs`;
  const txtHint = document.getElementById('height-cap-hint');
  if (RACE_HEIGHT_CAPS[state.race]) {
    txtHint.textContent = `Max for ${RACE_LABELS[state.race]}: ${formatFtIn(txtCap)}`;
    txtHint.style.display = '';
  } else {
    txtHint.style.display = 'none';
  }
  document.getElementById('skin-hex').value = state.skinHex;
  document.getElementById('skin-hex-preview').style.background = state.skinHex;
  document.getElementById('skin-hex-name').value = '';
  if (state.eyeHex) {
    document.getElementById('eye-hex').value = state.eyeHex;
    document.getElementById('eye-hex-preview').style.background = state.eyeHex;
  }
  document.getElementById('eye-hex-name').value = '';
  if (state.hairColorHex) {
    document.getElementById('hair-color-hex').value = state.hairColorHex;
    document.getElementById('hair-color-hex-preview').style.background = state.hairColorHex;
  }
  document.getElementById('hair-color-hex-name').value = '';
  const pwrap = document.getElementById('pronouns-custom-wrap');
  if (pwrap) pwrap.style.display = 'none';

  reconcileCommanderState();
  reconcileHeightTraits();
  renderSkinSwatches();
  renderEyeSwatches();
  renderHairColorSwatches();
  renderHairStyleGrid();
  renderAll();
  showToast('Character loaded from text!');
}

// ── Reset ─────────────────────────────────────────────────────
function resetAll() {
  if (!confirm('Reset all character data? This cannot be undone.')) return;
  state.name = '';
  state.nickname = '';
  state.age = '';
  state.pronouns    = '';
  state.orientation = '';
  state.race = 'human';
  state.height = 170;
  state.weight = 50;
  state.skinTone = null;
  state.skinHex  = '#c68642';
  state.skinName = '';
  state.eyeHex   = null;
  state.eyeColor = null;
  state.eyeName  = '';
  state.hairColorHex  = null;
  state.hairColor     = null;
  state.hairColorName = '';
  state.hairStyle = null;
  state.selectedTraits.clear();
  state.narrativeMode   = 'generated';
  state.customNarrative = '';
  state.searchQuery = '';
  state.filterCost = 'all';
  state.filterCat  = 'all';
  state.filterSelected = false;
  collapseAllCats();
  const rstTa = document.getElementById('narrative-custom');
  if (rstTa) rstTa.value = '';

  document.getElementById('char-name').value      = '';
  document.getElementById('char-nickname').value  = '';
  document.getElementById('char-age').value       = '';
  document.getElementById('char-pronouns').value    = '';
  document.getElementById('char-orientation').value = '';
  document.querySelectorAll('.race-btn').forEach(b => b.classList.toggle('selected', b.dataset.race === 'human'));
  document.getElementById('char-height').value    = 170;
  document.getElementById('char-height').max      = 230;
  document.getElementById('char-weight').value    = 50;
  document.getElementById('height-val').textContent  = formatFtIn(170);
  document.getElementById('weight-val').textContent  = 'Medium';
  document.getElementById('weight-lbs').textContent  = ` · ${getWeightLbs(50)} lbs`;
  document.getElementById('height-cap-hint').style.display = 'none';
  document.getElementById('trait-search').value   = '';
  document.getElementById('trait-filter-cost').value = 'all';
  document.getElementById('trait-filter-cat').value  = 'all';
  document.getElementById('trait-filter-selected').checked = false;
  document.getElementById('skin-hex').value = '#c68642';
  document.getElementById('skin-hex-preview').style.background = '#c68642';
  document.getElementById('skin-hex-name').value = '';
  document.getElementById('eye-hex-name').value = '';
  document.getElementById('hair-color-hex-name').value = '';
  document.getElementById('portrait-circle').style.borderColor = '';
  document.getElementById('portrait-initials').style.color = '';

  reconcileCommanderState();
  reconcileHeightTraits();
  renderSkinSwatches();
  renderEyeSwatches();
  renderHairColorSwatches();
  renderHairStyleGrid();
  renderAll();
}
