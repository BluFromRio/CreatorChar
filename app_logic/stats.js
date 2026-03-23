// ============================================================
// stats.js — Stat category definitions, labels, descriptions,
// and calculation functions.
// Depends on: config.js (RACE_BASES), state.js (state),
//             traits.js (TRAIT_STATS)
// ============================================================

'use strict';

// ── Three-category stat structure ────────────────────────────
const STAT_CATEGORIES = {
  education: {
    label: 'Education',
    stats: ['diplomacy', 'martial', 'stewardship', 'intrigue', 'learning', 'prowess'],
  },
  core: {
    label: 'Core Stats',
    stats: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
  },
  skills: {
    label: 'General Skills',
    stats: [
      'athletics', 'intimidation',
      'acrobatics', 'sleight_of_hand', 'stealth',
      'animal_handling', 'survival',
      'arcana', 'history', 'investigation', 'nature', 'religion',
      'insight', 'medicine', 'perception',
      'deception', 'performance', 'persuasion',
    ],
  },
};

// Each skill maps to one governing core stat (for UI grouping)
const SKILL_CORE_STAT = {
  athletics:       'strength',
  intimidation:    'strength',
  acrobatics:      'dexterity',
  sleight_of_hand: 'dexterity',
  stealth:         'dexterity',
  animal_handling: 'constitution',
  survival:        'constitution',
  arcana:          'intelligence',
  history:         'intelligence',
  investigation:   'intelligence',
  nature:          'intelligence',
  religion:        'intelligence',
  insight:         'wisdom',
  medicine:        'wisdom',
  perception:      'wisdom',
  deception:       'charisma',
  performance:     'charisma',
  persuasion:      'charisma',
};

// Flat label map for every stat across all three categories
const ALL_STAT_LABELS = {
  diplomacy: 'Diplomacy',   martial: 'Martial',       stewardship: 'Stewardship',
  intrigue: 'Intrigue',     learning: 'Learning',      prowess: 'Prowess',
  strength: 'Strength',     dexterity: 'Dexterity',    constitution: 'Constitution',
  intelligence: 'Intelligence', wisdom: 'Wisdom',      charisma: 'Charisma',
  athletics: 'Athletics',   acrobatics: 'Acrobatics',  intimidation: 'Intimidation',
  animal_handling: 'Animal Handling', survival: 'Survival',
  arcana: 'Arcana',         history: 'History',        investigation: 'Investigation',
  nature: 'Nature',         religion: 'Religion',
  insight: 'Insight',       medicine: 'Medicine',      perception: 'Perception',
  sleight_of_hand: 'Sleight of Hand', stealth: 'Stealth',
  deception: 'Deception',   performance: 'Performance', persuasion: 'Persuasion',
};

// Hover descriptions for each stat
const STAT_DESCRIPTIONS = {
  diplomacy:       'How well this character navigates politics, negotiation, and the management of alliances.',
  martial:         'How well this character commands themselves and others on the battlefield.',
  stewardship:     'How effectively this character manages resources, estates, and economic affairs.',
  intrigue:        "This character's aptitude for secrecy, manipulation, and the gathering of information.",
  learning:        "The breadth of this character's scholarly knowledge and their capacity to grow it.",
  prowess:         "This character's individual combat skill and physical effectiveness in direct conflict.",
  strength:        'Raw physical power — how hard this character hits, how much they carry, and how imposing they are.',
  dexterity:       'Agility, reflexes, and precision of movement — how nimbly this character navigates the world and avoids danger.',
  constitution:    'Physical resilience and endurance — how long this character can push before their body gives out.',
  intelligence:    'Mental acuity and reasoning — how quickly and deeply this character processes information.',
  wisdom:          'Perceptiveness and intuition — how well this character reads situations, people, and the world around them.',
  charisma:        'Force of personality — how naturally this character commands attention, inspires trust, or sows persuasion.',
  athletics:       'Feats of physical exertion: climbing, swimming, jumping, and sustained effort under strain.',
  acrobatics:      'Balance, agility, and controlled movement — precision of body over raw power.',
  intimidation:    'Coercing or frightening others through presence, threat, or display of force.',
  animal_handling: 'Calming, commanding, or understanding the behavior of animals.',
  survival:        'Navigating the wilds, finding food and shelter, tracking, and enduring harsh conditions.',
  arcana:          'Knowledge of magic, spells, and the arcane forces that run beneath the surface of things.',
  history:         'Recall and understanding of past events, lineages, notable figures, and eras gone by.',
  investigation:   'Finding clues, connecting evidence, and uncovering what is hidden or disguised.',
  nature:          'Knowledge of plants, beasts, weather, and the natural world beyond civilization.',
  religion:        'Understanding of faith, divine lore, holy rites, and the theology behind different beliefs.',
  insight:         'Reading people — detecting lies, sensing mood, and understanding intent beneath the surface.',
  medicine:        'Tending wounds, understanding illness, and caring for those whose bodies have failed them.',
  perception:      'Noticing what others miss — sights, sounds, and small details in the environment.',
  sleight_of_hand: 'Quick, subtle manipulation with the hands: palming objects, picking locks, delicate concealment.',
  stealth:         'Moving without being seen or heard, hiding in plain sight, passing unnoticed.',
  deception:       'Misleading, lying, and constructing convincing untruths.',
  performance:     'Captivating an audience through storytelling, music, theater, or performed art.',
  persuasion:      'Influencing others through reasoned argument, earnest appeal, or social charm.',
};

// Legacy aliases
const STAT_ORDER  = STAT_CATEGORIES.education.stats;
const STAT_LABELS = ALL_STAT_LABELS;

// ── Stat calculation functions ────────────────────────────────
function getRaceBase() {
  return RACE_BASES[state.race] || RACE_BASES.human;
}

function calcStatTotals() {
  const totals = { ...getRaceBase() };
  for (const id of state.selectedTraits) {
    const modifiers = TRAIT_STATS[id];
    if (!modifiers) continue;
    for (const [stat, delta] of Object.entries(modifiers)) {
      if (totals[stat] !== undefined) totals[stat] += delta;
    }
  }
  return totals;
}

function calcStatDeltas() {
  const deltas = {};
  for (const cat of Object.values(STAT_CATEGORIES)) {
    for (const s of cat.stats) deltas[s] = 0;
  }
  for (const id of state.selectedTraits) {
    const modifiers = TRAIT_STATS[id];
    if (!modifiers) continue;
    for (const [stat, delta] of Object.entries(modifiers)) {
      if (stat in deltas) deltas[stat] += delta;
    }
  }
  return deltas;
}
