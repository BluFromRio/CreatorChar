// ============================================================
// render_education.js — Education discipline track renderer.
// Displays each discipline as a labelled horizontal progression
// with an Untrained anchor and five selectable level nodes.
// Depends on: state.js, trait_rules.js, tooltip.js
// ============================================================

'use strict';

const EDU_TRACK_ORDER = ['stewardship', 'diplomacy', 'martial', 'learning', 'intrigue'];

const EDU_TRACK_META = {
  stewardship: {
    label:       'Stewardship',
    icon:        '⚖',
    description: 'Land management, trade, economics, and the administration of resources and coin.',
  },
  diplomacy: {
    label:       'Diplomacy',
    icon:        '🕊',
    description: 'Negotiation, courtly manners, alliance-building, and the art of the well-timed word.',
  },
  martial: {
    label:       'Martial',
    icon:        '⚔',
    description: 'Military training, battlefield tactics, unit command, and the strategy of organized warfare.',
  },
  learning: {
    label:       'Learning',
    icon:        '📖',
    description: 'Formal scholarship spanning philosophy, theology, history, medicine, and the sciences.',
  },
  intrigue: {
    label:       'Intrigue',
    icon:        '🗝',
    description: 'Deception, manipulation, intelligence-gathering, and the keeping of dangerous secrets.',
  },
};

// Evocative sublabels shown beneath each level node (index 0 = level 1)
const EDU_LEVEL_SUBLABELS = {
  stewardship: ['Basic land and household management', 'Guild trade and basic economics', 'Estate administration and resource law', 'Advanced stewardship; profitable domains', 'Legendary mastery of coin and administration'],
  diplomacy:   ['Minor court etiquette and basic negotiation', 'Formal diplomatic training; mission-ready', 'Skilled statecraft and alliance-building', 'Master of courts, treaties, and political leverage', 'A living legend; their word shapes nations'],
  martial:     ['Basic drills, weapons, and unit formation', 'Officer-track training; leads small units', 'Full tactical training; credible battlefield commander', 'Expert command; campaigns studied by others', 'A legend of war; their name wins battles'],
  learning:    ['Basic literacy and reasoning; a tutor or school', 'University or monastery study; reads widely', 'Deep multi-discipline scholarship; respected in circles', 'Distinguished mastery; others come to them', 'A living library; their learning is legendary'],
  intrigue:    ['Street-level instinct; no formal schooling', 'Mentor or guild training in subterfuge', 'Formal operative training via network or patron', 'Years of covert operations; commands shadows', 'A legend of shadows; name spoken only in whispers'],
};

function renderEducationTracks(body, allTraits, search, costFilter) {
  // Intro strip
  const intro = document.createElement('div');
  intro.className = 'edu-intro';
  intro.innerHTML = `
    <span class="edu-intro-rule">No selection</span> means your character had no formal education in that discipline.
    <span class="edu-intro-rule">Level 1 (10 pts)</span> reflects basic schooling, a tutor, or an apprenticeship.
    Each level up represents deeper study, better mentors, and more years invested.
  `;
  body.appendChild(intro);

  for (const discipline of EDU_TRACK_ORDER) {
    const meta   = EDU_TRACK_META[discipline];
    const group  = `education_${discipline}`;
    const traits = [...(traitsByGroup[group] || [])].sort((a, b) => (a.level || 0) - (b.level || 0));
    if (traits.length === 0) continue;

    const section = document.createElement('div');
    section.className = 'edu-track';

    // Track header
    const hdr = document.createElement('div');
    hdr.className = 'edu-track-hdr';
    hdr.innerHTML = `
      <span class="edu-track-name">${meta.label}</span>
      <span class="edu-track-desc">${meta.description}</span>
    `;
    section.appendChild(hdr);

    // Node row
    const row = document.createElement('div');
    row.className = 'edu-node-row';

    // Static "Untrained" anchor — not clickable, always visible
    const untrained = document.createElement('div');
    untrained.className = 'edu-node edu-untrained';
    untrained.innerHTML = `
      <div class="edu-node-lvl">No education</div>
      <div class="edu-node-title">Untrained</div>
      <div class="edu-node-sub">No formal study</div>
    `;
    row.appendChild(untrained);

    for (let i = 0; i < traits.length; i++) {
      row.appendChild(_eduArrow());
      row.appendChild(makeEduNode(traits[i], i, discipline, search, costFilter));
    }

    section.appendChild(row);
    body.appendChild(section);
  }
}

function _eduArrow() {
  const arrow = document.createElement('div');
  arrow.className = 'edu-arrow';
  return arrow;
}

function makeEduNode(t, idx, discipline, search, costFilter) {
  const isSelected = state.selectedTraits.has(t.id);
  const isDisabled = !isSelected && !canSelect(t.id);
  const isDim = !isSelected && (
    (search      && !t.label.toLowerCase().includes(search) && !t.id.toLowerCase().includes(search)) ||
    (costFilter === 'positive' && !(t.cost > 0)) ||
    (costFilter === 'negative' && !(t.cost < 0)) ||
    (costFilter === 'zero'     &&   t.cost !== 0)
  );

  const node = document.createElement('div');
  node.className = `edu-node edu-tier-${t.level}`
    + (isSelected ? ' selected' : '')
    + (isDisabled ? ' disabled' : '')
    + (isDim      ? ' dim'      : '');

  // Extract just the evocative title after "Discipline: "
  const colonIdx = t.label.indexOf(':');
  const title = colonIdx !== -1 ? t.label.slice(colonIdx + 1).trim() : t.label;

  const sublabels = EDU_LEVEL_SUBLABELS[discipline] || [];
  const sub = sublabels[idx] || '';

  const costStr = `+${t.cost} pts`;

  node.innerHTML = `
    <div class="edu-node-lvl">Level ${t.level} &middot; ${costStr}</div>
    <div class="edu-node-title">${title}</div>
    <div class="edu-node-sub">${sub}</div>
  `;

  if (!isDisabled) {
    node.addEventListener('click', () => toggleTrait(t.id));
  }

  attachTraitTooltip(node, t.id);
  return node;
}
