// ============================================================
// tooltip.js — Shared tooltip engine used for traits, stats,
// and race buttons. All tooltips share one DOM element.
// Depends on: state.js, traits.js (TRAIT_FLAVOR), config.js
// ============================================================

'use strict';

let _tooltipTimer = null;

function getTooltipEl() {
  return document.getElementById('trait-tooltip');
}

function getTraitFlavor(traitId) {
  const charName = state.name.trim() || 'This character';
  const template = TRAIT_FLAVOR[traitId];
  if (template) return template.replace(/\{name\}/g, charName);
  const t = traitById[traitId];
  if (!t) return '';
  const catMeta = CATEGORY_META[t.category] || { label: t.category };
  return `${charName} possesses the quality known as "${t.label}" — a ${catMeta.label.toLowerCase()} trait that colors how the world perceives them.`;
}

function showGenericTooltip(title, body, clientX, clientY) {
  const el = getTooltipEl();
  if (!el) return;
  el.innerHTML = `<div class="tooltip-title">${title}</div><div class="tooltip-body">${body}</div>`;
  el.style.visibility = 'hidden';
  el.style.left = '-9999px';
  el.classList.add('visible');
  requestAnimationFrame(() => {
    const w = el.offsetWidth, h = el.offsetHeight, pad = 14;
    let left = clientX + pad, top = clientY + pad;
    if (left + w > window.innerWidth  - pad) left = clientX - w - pad;
    if (top  + h > window.innerHeight - pad) top  = clientY - h - pad;
    el.style.left = left + 'px';
    el.style.top  = top  + 'px';
    el.style.visibility = '';
  });
}

function hideTooltip() {
  const el = getTooltipEl();
  if (el) el.classList.remove('visible');
}

// Trait hover — 800 ms delay; stays visible while cursor is inside the element
function attachTraitTooltip(el, traitId) {
  el.addEventListener('mouseenter', e => {
    clearTimeout(_tooltipTimer);
    const x = e.clientX, y = e.clientY;
    _tooltipTimer = setTimeout(() => {
      const t = traitById[traitId];
      if (t) showGenericTooltip(t.label, getTraitFlavor(traitId), x, y);
    }, 800);
  });
  el.addEventListener('mouseleave', () => { clearTimeout(_tooltipTimer); hideTooltip(); });
}

// Stat/skill hover — 600 ms delay
function attachStatTooltip(el, statKey) {
  let timer = null;
  el.style.cursor = 'help';
  el.addEventListener('mouseenter', e => {
    timer = setTimeout(() => {
      showGenericTooltip(ALL_STAT_LABELS[statKey], STAT_DESCRIPTIONS[statKey], e.clientX, e.clientY);
    }, 600);
  });
  el.addEventListener('mouseleave', () => { clearTimeout(timer); hideTooltip(); });
}

// Race button hover — 600 ms delay
function attachRaceTooltip(el, raceKey) {
  let timer = null;
  el.addEventListener('mouseenter', e => {
    timer = setTimeout(() => {
      showGenericTooltip(RACE_LABELS[raceKey], RACE_DESCRIPTIONS[raceKey], e.clientX, e.clientY);
    }, 600);
  });
  el.addEventListener('mouseleave', () => { clearTimeout(timer); hideTooltip(); });
}
