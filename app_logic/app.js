// ============================================================
// app.js — Entry point: event bindings and initialization.
// All logic lives in the dedicated files loaded before this.
// Depends on: all other .js files
// ============================================================

'use strict';

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
      renderSummary();
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
    document.getElementById('height-val').textContent = `${state.height} cm`;
    renderSummary();
  });
  document.getElementById('char-weight').addEventListener('input', e => {
    state.weight = +e.target.value;
    document.getElementById('weight-val').textContent = getWeightLabel(state.weight);
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
  document.getElementById('btn-save').addEventListener('click', saveToLocalStorage);
  document.getElementById('btn-load').addEventListener('click', loadFromFile);
  document.getElementById('btn-reset').addEventListener('click', resetAll);

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
      '<b>Heterosexual</b> — attraction to people of a different gender.',
      '<b>Bisexual</b> — attraction to people of one\'s own gender and other genders.',
      '<b>Gay</b> — attraction primarily to people of the same gender.',
      '<b>Lesbian</b> — a woman attracted primarily to other women.',
    ].join('<br><br>');
    orientTip.addEventListener('mouseenter', e => {
      _orientTimer = setTimeout(() => {
        showGenericTooltip(orientTitle, orientBody, e.clientX, e.clientY);
      }, 400);
    });
    orientTip.addEventListener('mouseleave', () => { clearTimeout(_orientTimer); hideTooltip(); });
  }

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
