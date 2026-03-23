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

  // Skin hex
  document.getElementById('skin-hex').addEventListener('input', e => {
    state.skinTone = e.target.value;
    state.skinHex  = e.target.value;
    document.getElementById('skin-hex-preview').style.background = e.target.value;
    renderSkinSwatches();
    renderSummary();
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

  // Initial skin preview
  document.getElementById('skin-hex-preview').style.background = state.skinHex;

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
