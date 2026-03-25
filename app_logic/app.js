// ============================================================
// app.js — Entry point: event bindings and initialization.
// All logic lives in the dedicated files loaded before this.
// Depends on: all other .js files
// ============================================================

'use strict';

// ── Random character generator ────────────────────────────────
function randomizeCharacter() {
  state.selectedTraits.clear();

  // Race
  const racePool = ['human', 'human', 'human', 'elf', 'dwarf', 'half_elf', 'half_dwarf'];
  const race = racePool[Math.floor(Math.random() * racePool.length)];
  state.race = race;
  document.querySelectorAll('.race-btn').forEach(b => b.classList.toggle('selected', b.dataset.race === race));
  applyHeightCap(race);

  // Height within race cap
  const heightCap = RACE_HEIGHT_CAPS[race] || 230;
  state.height = 130 + Math.floor(Math.random() * (heightCap - 130 + 1));
  const hSlider = document.getElementById('char-height');
  hSlider.max   = heightCap;
  hSlider.value = state.height;
  document.getElementById('height-val').textContent = formatFtIn(state.height);

  // Weight
  state.weight = Math.floor(Math.random() * 101);
  document.getElementById('char-weight').value = state.weight;
  document.getElementById('weight-val').textContent = getWeightLabel(state.weight);
  document.getElementById('weight-lbs').textContent = ` · ${getWeightLbs(state.weight)} lbs`;

  // Identity
  const NAMES = ['Drew','Kyle','Agnes','Sara','Jose','Mitchell','Greta','Tristan','Owen','Evan','Levi','Alex','Lauren','Whitney','Brody','Nikolai'];
  state.name     = NAMES[Math.floor(Math.random() * NAMES.length)];
  state.nickname = '';
  state.age      = String(18 + Math.floor(Math.random() * 43));
  document.getElementById('char-name').value     = state.name;
  document.getElementById('char-nickname').value = '';
  document.getElementById('char-age').value      = state.age;

  const pronounOpts = ['he/him', 'she/her', 'they/them'];
  state.pronouns = pronounOpts[Math.floor(Math.random() * pronounOpts.length)];
  document.getElementById('char-pronouns').value = state.pronouns;
  document.getElementById('pronouns-custom-wrap').style.display = 'none';

  const orientOpts = ['', 'Heterosexual', 'Bisexual', 'Gay', 'Lesbian'];
  state.orientation = orientOpts[Math.floor(Math.random() * orientOpts.length)];
  document.getElementById('char-orientation').value = state.orientation;

  // Appearance
  const skin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)];
  state.skinTone = skin.hex; state.skinHex = skin.hex; state.skinName = '';
  document.getElementById('skin-hex').value = skin.hex;
  document.getElementById('skin-hex-preview').style.background = skin.hex;
  document.getElementById('skin-hex-name').value = '';

  const eye = EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)];
  state.eyeHex = eye.hex; state.eyeColor = eye.label; state.eyeName = '';
  document.getElementById('eye-hex').value = eye.hex;
  document.getElementById('eye-hex-preview').style.background = eye.hex;
  document.getElementById('eye-hex-name').value = '';

  const hairC = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];
  state.hairColorHex = hairC.hex; state.hairColor = hairC.label; state.hairColorName = '';
  document.getElementById('hair-color-hex').value = hairC.hex;
  document.getElementById('hair-color-hex-preview').style.background = hairC.hex;
  document.getElementById('hair-color-hex-name').value = '';

  state.hairStyle = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)];

  reconcileHeightTraits();

  // Helpers
  function shuffled(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function tryAdd(id) {
    if (canSelect(id)) { state.selectedTraits.add(id); return true; }
    return false;
  }

  // Childhood (0-2)
  const childMax = Math.floor(Math.random() * 3);
  let childAdded = 0;
  for (const t of shuffled(traitsByCat['childhood'] || [])) {
    if (childAdded >= childMax) break;
    if (tryAdd(t.id)) childAdded++;
  }

  // Personality (3-5 from distinct triads)
  const triadGroups = shuffled(
    Object.entries(traitsByGroup)
      .filter(([g]) => g.startsWith('triad_'))
      .map(([, traits]) => shuffled(traits))
  );
  const persMax = 3 + Math.floor(Math.random() * 3);
  let persAdded = 0;
  for (const triad of triadGroups) {
    if (persAdded >= persMax) break;
    for (const t of triad) { if (tryAdd(t.id)) { persAdded++; break; } }
  }

  // Education (1, biased toward lower levels)
  const eduGroups = shuffled(
    Object.entries(traitsByGroup)
      .filter(([g]) => g.startsWith('education_'))
      .map(([, traits]) => traits)
  );
  if (eduGroups.length > 0) {
    const grp = eduGroups[0];
    const r = Math.random();
    const idx = r < 0.4 ? 0 : r < 0.7 ? 1 : r < 0.9 ? 2 : Math.min(3, grp.length - 1);
    tryAdd(grp[Math.min(idx, grp.length - 1)].id);
  }

  // Lifestyle (0-3)
  const lifestyleMax = Math.floor(Math.random() * 4);
  let lifestyleAdded = 0;
  for (const t of shuffled(traitsByCat['lifestyle'] || [])) {
    if (lifestyleAdded >= lifestyleMax) break;
    if (tryAdd(t.id)) lifestyleAdded++;
  }

  // Congenital (0-2)
  const congenMax = Math.floor(Math.random() * 3);
  let congenAdded = 0;
  for (const t of shuffled(traitsByCat['congenital'] || [])) {
    if (congenAdded >= congenMax) break;
    if (tryAdd(t.id)) congenAdded++;
  }

  // Health (0-2)
  const healthMax = Math.floor(Math.random() * 3);
  let healthAdded = 0;
  for (const t of shuffled(traitsByCat['health'] || [])) {
    if (healthAdded >= healthMax) break;
    if (tryAdd(t.id)) healthAdded++;
  }

  // Magic (40% chance)
  if (Math.random() < 0.4 && tryAdd('magic_affinity')) {
    if (Math.random() < 0.6) tryAdd('talented_mage');
    const hasTM = state.selectedTraits.has('talented_mage');
    if (hasTM && Math.random() < 0.25) {
      if (Math.random() < 0.5) {
        if (tryAdd('elem_light') && tryAdd('elem_water') && Math.random() < 0.5) tryAdd('elem_healing');
      } else {
        tryAdd('elem_dark');
      }
    } else {
      const bases = shuffled([...MAGIC_BASE_ELEMENTS]);
      let basesAdded = 0;
      const maxBases = hasTM ? 2 : 1;
      for (const e of bases) {
        if (basesAdded >= maxBases) break;
        if (tryAdd(e)) basesAdded++;
      }
      if (hasTM && basesAdded >= 2 && Math.random() < 0.6) {
        for (const c of shuffled([...MAGIC_COMBO_ELEMENTS])) { if (tryAdd(c)) break; }
      }
    }
  }

  // Commander (35% chance)
  if (Math.random() < 0.35) {
    const tree   = CMD_TREES[Math.floor(Math.random() * CMD_TREES.length)];
    const branch = tree.branches[Math.floor(Math.random() * tree.branches.length)];
    if (tryAdd(branch.nodes[0])) {
      for (let i = 1; i < branch.nodes.length; i++) {
        if (Math.random() > 0.55 || !tryAdd(branch.nodes[i])) break;
      }
    }
  }

  // Fame (0-2)
  const fameMax = Math.floor(Math.random() * 3);
  let fameAdded = 0;
  for (const t of shuffled(traitsByCat['fame'] || [])) {
    if (fameAdded >= fameMax) break;
    if (tryAdd(t.id)) fameAdded++;
  }

  renderSkinSwatches();
  renderEyeSwatches();
  renderHairColorSwatches();
  renderHairStyleGrid();
  renderAll();
  showToast('Random character generated!');
}

// ── Race height cap enforcement ───────────────────────────────
function applyHeightCap(race) {
  const cap = RACE_HEIGHT_CAPS[race] || 230;
  const slider = document.getElementById('char-height');
  slider.max = cap;
  if (state.height > cap) {
    state.height = cap;
    slider.value = cap;
  }
  document.getElementById('height-val').textContent = formatFtIn(state.height);
  const hint = document.getElementById('height-cap-hint');
  if (RACE_HEIGHT_CAPS[race]) {
    hint.textContent = `Max for ${RACE_LABELS[race]}: ${formatFtIn(cap)}`;
    hint.style.display = '';
  } else {
    hint.style.display = 'none';
  }
}

// ── Event bindings ────────────────────────────────────────────
function bindEvents() {
  const idBind = (id, key) => {
    document.getElementById(id).addEventListener('input', e => {
      state[key] = e.target.value;
      renderSummary();
    });
  };
  idBind('char-name',     'name');
  idBind('char-nickname', 'nickname');
  idBind('char-age',      'age');

  // Race buttons
  document.querySelectorAll('.race-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.race-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.race = btn.dataset.race;
      applyHeightCap(state.race);
      reconcileHeightTraits();
      renderAll();
    });
    attachRaceTooltip(btn, btn.dataset.race);
  });

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

  // Orientation
  document.getElementById('char-orientation').addEventListener('change', e => {
    state.orientation = e.target.value;
    renderSummary();
  });

  // Sliders
  document.getElementById('char-height').addEventListener('input', e => {
    state.height = +e.target.value;
    document.getElementById('height-val').textContent = formatFtIn(state.height);
    reconcileHeightTraits();
    renderAll();
  });
  document.getElementById('char-weight').addEventListener('input', e => {
    state.weight = +e.target.value;
    document.getElementById('weight-val').textContent = getWeightLabel(state.weight);
    document.getElementById('weight-lbs').textContent = ` · ${getWeightLbs(state.weight)} lbs`;
    renderSummary();
  });

  // Skin custom color
  document.getElementById('skin-hex').addEventListener('input', e => {
    state.skinTone = e.target.value;
    state.skinHex  = e.target.value;
    document.getElementById('skin-hex-preview').style.background = e.target.value;
    renderSkinSwatches();
    renderSummary();
  });
  document.getElementById('skin-hex-name').addEventListener('input', e => {
    state.skinName = e.target.value;
    renderSummary();
  });

  // Eye custom color
  document.getElementById('eye-hex').addEventListener('input', e => {
    state.eyeHex   = e.target.value;
    state.eyeColor = state.eyeName || e.target.value;
    document.getElementById('eye-hex-preview').style.background = e.target.value;
    renderEyeSwatches();
    renderSummary();
  });
  document.getElementById('eye-hex-name').addEventListener('input', e => {
    state.eyeName = e.target.value;
    if (state.eyeHex) { state.eyeColor = e.target.value || state.eyeHex; renderSummary(); }
  });

  // Hair custom color
  document.getElementById('hair-color-hex').addEventListener('input', e => {
    state.hairColorHex  = e.target.value;
    state.hairColor     = state.hairColorName || e.target.value;
    document.getElementById('hair-color-hex-preview').style.background = e.target.value;
    renderHairColorSwatches();
    renderSummary();
  });
  document.getElementById('hair-color-hex-name').addEventListener('input', e => {
    state.hairColorName = e.target.value;
    if (state.hairColorHex) { state.hairColor = e.target.value || state.hairColorHex; renderSummary(); }
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
  document.getElementById('btn-random').addEventListener('click', randomizeCharacter);
  document.getElementById('btn-save').addEventListener('click', saveToLocalStorage);
  document.getElementById('btn-load').addEventListener('click', loadFromFile);
  document.getElementById('btn-reset').addEventListener('click', resetAll);

  // Narrative toggle
  document.getElementById('btn-nar-generated').addEventListener('click', () => {
    state.narrativeMode = 'generated';
    renderNarrative();
  });
  document.getElementById('btn-nar-custom').addEventListener('click', () => {
    state.narrativeMode = 'custom';
    renderNarrative();
  });
  document.getElementById('narrative-custom').addEventListener('input', e => {
    state.customNarrative = e.target.value;
  });

  // Accessibility font toggle
  document.getElementById('btn-font-toggle').addEventListener('click', () => {
    document.body.classList.toggle('font-lexend');
    document.getElementById('btn-font-toggle').classList.toggle(
      'active', document.body.classList.contains('font-lexend')
    );
  });

  // Export buttons
  document.getElementById('btn-copy').addEventListener('click', copyToClipboard);
  document.getElementById('btn-export-json').addEventListener('click', exportJSON);
  document.getElementById('btn-export-txt').addEventListener('click', exportTxt);
  document.getElementById('file-load-input').addEventListener('change', handleFileLoad);
}

// ── Init ──────────────────────────────────────────────────────
function init() {
  initTraitMaps();
  collapseAllCats();
  populateCatFilter();
  bindEvents();

  // Orientation info-tip tooltip
  const orientTip = document.getElementById('orientation-tip');
  if (orientTip) {
    let _orientTimer = null;
    const orientTitle = 'Sexual Orientation';
    const orientBody = [
      '<b>Heterosexual</b>: attraction to people of a different gender.',
      '<b>Bisexual</b>: attraction to people of one\'s own gender and other genders.',
      '<b>Gay</b>: attraction primarily to people of the same gender.',
      '<b>Lesbian</b>: a woman attracted primarily to other women.',
    ].join('<br><br>');
    orientTip.addEventListener('mouseenter', e => {
      _orientTimer = setTimeout(() => {
        showGenericTooltip(orientTitle, orientBody, e.clientX, e.clientY);
      }, 400);
    });
    orientTip.addEventListener('mouseleave', () => { clearTimeout(_orientTimer); hideTooltip(); });
  }

  // Initial body display
  document.getElementById('height-val').textContent = formatFtIn(state.height);
  document.getElementById('weight-lbs').textContent = ` · ${getWeightLbs(state.weight)} lbs`;
  applyHeightCap(state.race);

  // Initial color previews
  document.getElementById('skin-hex-preview').style.background = state.skinHex;
  document.getElementById('eye-hex-preview').style.background =
    state.eyeHex || document.getElementById('eye-hex').value;
  document.getElementById('hair-color-hex-preview').style.background =
    state.hairColorHex || document.getElementById('hair-color-hex').value;

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
