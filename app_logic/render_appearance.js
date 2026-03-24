// ============================================================
// render_appearance.js — Renders the point budget bar and all
// appearance swatch/style grids (skin, eyes, hair).
// Depends on: config.js, state.js, stats.js (calcPointsSpent)
// ============================================================

'use strict';

// ── Shared render helpers ─────────────────────────────────────
function costClass(cost) {
  if (cost === null || cost === undefined) return 'null';
  if (cost > 0) return 'positive';
  if (cost < 0) return 'negative';
  return 'zero';
}

function costLabel(cost) {
  if (cost === null || cost === undefined) return '?';
  if (cost > 0) return `+${cost}`;
  return `${cost}`;
}

function getWeightLabel(val) {
  for (const [lo, hi, label] of WEIGHT_LABELS) {
    if (val >= lo && val <= hi) return label;
  }
  return 'Medium';
}

function getSkinLabel(hex) {
  const match = SKIN_TONES.find(s => s.hex === hex);
  return match ? match.label : hex;
}

// Returns the best display name for a color: custom name > preset label > hex value
function getColorDisplay(hex, customName, presets) {
  if (customName) return customName;
  const match = presets.find(p => p.hex === hex);
  return match ? match.label : (hex || '—');
}

// ── Budget bar ────────────────────────────────────────────────
function renderBudget() {
  const spent     = calcPointsSpent();
  const remaining = CONFIG.POINT_BUDGET - spent;
  const pct       = Math.min(100, (spent / CONFIG.POINT_BUDGET) * 100);

  document.getElementById('points-remaining').textContent = remaining;
  document.getElementById('points-spent').textContent     = spent;
  document.getElementById('points-total').textContent     = CONFIG.POINT_BUDGET;

  const ring = document.getElementById('budget-ring');
  const bar  = document.getElementById('budget-bar');

  ring.classList.toggle('warning', pct >= 75 && pct < 95);
  ring.classList.toggle('danger',  pct >= 95);
  bar.style.width = pct + '%';
  bar.classList.toggle('over', spent > CONFIG.POINT_BUDGET);
}

// ── Appearance swatch grids ───────────────────────────────────
function renderSkinSwatches() {
  const grid = document.getElementById('skin-swatches');
  grid.innerHTML = '';
  for (const { hex, label } of SKIN_TONES) {
    const sw = document.createElement('div');
    sw.className = 'swatch' + (state.skinTone === hex ? ' selected' : '');
    sw.style.background = hex;
    sw.title = label;
    sw.addEventListener('click', () => {
      state.skinTone = hex;
      state.skinHex  = hex;
      state.skinName = '';
      document.getElementById('skin-hex').value = hex;
      document.getElementById('skin-hex-preview').style.background = hex;
      document.getElementById('skin-hex-name').value = '';
      renderSkinSwatches();
      renderSummary();
    });
    grid.appendChild(sw);
  }
  // Show active ring on custom preview when a non-preset color is selected
  const isCustomSkin = state.skinTone && !SKIN_TONES.some(s => s.hex === state.skinTone);
  document.getElementById('skin-hex-preview').classList.toggle('active', isCustomSkin);
}

function renderEyeSwatches() {
  const grid = document.getElementById('eye-swatches');
  grid.innerHTML = '';
  for (const { hex, label } of EYE_COLORS) {
    const sw = document.createElement('div');
    sw.className = 'swatch' + (state.eyeHex === hex ? ' selected' : '');
    sw.style.background = hex;
    sw.title = label;
    sw.addEventListener('click', () => {
      state.eyeHex   = hex;
      state.eyeName  = '';
      state.eyeColor = label;
      document.getElementById('eye-hex').value = hex;
      document.getElementById('eye-hex-preview').style.background = hex;
      document.getElementById('eye-hex-name').value = '';
      renderEyeSwatches();
      renderSummary();
    });
    grid.appendChild(sw);
  }
  // Show active ring on custom preview when a non-preset color is selected
  const isCustomEye = state.eyeHex && !EYE_COLORS.some(e => e.hex === state.eyeHex);
  document.getElementById('eye-hex-preview').classList.toggle('active', isCustomEye);
}

function renderHairColorSwatches() {
  const grid = document.getElementById('hair-color-swatches');
  grid.innerHTML = '';
  for (const { hex, label } of HAIR_COLORS) {
    const sw = document.createElement('div');
    sw.className = 'swatch' + (state.hairColorHex === hex ? ' selected' : '');
    sw.style.background = hex;
    sw.title = label;
    sw.addEventListener('click', () => {
      state.hairColorHex  = hex;
      state.hairColorName = '';
      state.hairColor     = label;
      document.getElementById('hair-color-hex').value = hex;
      document.getElementById('hair-color-hex-preview').style.background = hex;
      document.getElementById('hair-color-hex-name').value = '';
      renderHairColorSwatches();
      renderSummary();
    });
    grid.appendChild(sw);
  }
  // Show active ring on custom preview when a non-preset color is selected
  const isCustomHair = state.hairColorHex && !HAIR_COLORS.some(h => h.hex === state.hairColorHex);
  document.getElementById('hair-color-hex-preview').classList.toggle('active', isCustomHair);
}

function renderHairStyleGrid() {
  const grid = document.getElementById('hair-style-grid');
  grid.innerHTML = '';
  for (const style of HAIR_STYLES) {
    const btn = document.createElement('button');
    btn.className = 'style-btn' + (state.hairStyle === style ? ' selected' : '');
    btn.textContent = style;
    btn.addEventListener('click', () => {
      state.hairStyle = style;
      renderHairStyleGrid();
      renderSummary();
    });
    grid.appendChild(btn);
  }
}
