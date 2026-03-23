// ============================================================
// traits_other.js — Miscellaneous trait definitions, stat modifiers, and flavor text.
// ============================================================

const OTHER_TRAITS = [
  {
    "id": "lifestyle_traveler",
    "label": "Traveler",
    "category": "other",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  }
];

const OTHER_STATS = {
  lifestyle_traveler: { diplomacy: 1, survival: 2, perception: 2, nature: 1 }
};

const OTHER_FLAVOR = {
  lifestyle_traveler: '{name} has seen more of the world than most. The road has shaped them.'
};
