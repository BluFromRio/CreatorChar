// ============================================================
// traits.js — Combines all category trait files into the three
// global arrays consumed by the rest of the application.
//
// To add or edit traits, edit the relevant category file:
//   traits_education.js   traits_lifestyle.js   traits_personality.js
//   traits_congenital.js  traits_health.js      traits_childhood.js
//   traits_commander.js   traits_fame.js        traits_magic.js
//   traits_other.js
//
// Each category file exports:
//   CATEGORY_TRAITS  — array of trait definition objects
//   CATEGORY_STATS   — map of trait id → stat modifier object
//   CATEGORY_FLAVOR  — map of trait id → flavor string template
// ============================================================

// All trait definition objects (consumed by initTraitMaps in state.js)
const CK3_TRAITS = [
  ...EDUCATION_TRAITS,
  ...LIFESTYLE_TRAITS,
  ...PERSONALITY_TRAITS,
  ...CONGENITAL_TRAITS,
  ...HEALTH_TRAITS,
  ...CHILDHOOD_TRAITS,
  ...COMMANDER_TRAITS,
  ...FAME_TRAITS,
  ...MAGIC_TRAITS,
  ...OTHER_TRAITS,
];

// Stat modifier map: trait id → { statKey: delta, … }
const TRAIT_STATS = {
  ...EDUCATION_STATS,
  ...LIFESTYLE_STATS,
  ...PERSONALITY_STATS,
  ...CONGENITAL_STATS,
  ...HEALTH_STATS,
  ...CHILDHOOD_STATS,
  ...COMMANDER_STATS,
  ...FAME_STATS,
  ...MAGIC_STATS,
  ...OTHER_STATS,
};

// Hover flavor text: trait id → '{name} …' template string
const TRAIT_FLAVOR = {
  ...EDUCATION_FLAVOR,
  ...LIFESTYLE_FLAVOR,
  ...PERSONALITY_FLAVOR,
  ...CONGENITAL_FLAVOR,
  ...HEALTH_FLAVOR,
  ...CHILDHOOD_FLAVOR,
  ...COMMANDER_FLAVOR,
  ...FAME_FLAVOR,
  ...MAGIC_FLAVOR,
  ...OTHER_FLAVOR,
};
