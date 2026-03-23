// ============================================================
// traits_health.js — Health/injury trait definitions, stat modifiers, and flavor text.
// ============================================================

const HEALTH_TRAITS = [
  {
    "id": "scarred",
    "label": "Scarred",
    "category": "health",
    "cost": 10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "eunuch_1",
    "label": "Eunuch",
    "category": "health",
    "cost": -10,
    "group": null,
    "level": 1,
    "genetic": false,
    "physical": false,
    "opposites": ["beardless_eunuch"],
    "compat": {}
  },
  {
    "id": "beardless_eunuch",
    "label": "Beardless Eunuch",
    "category": "health",
    "cost": -15,
    "group": null,
    "level": 2,
    "genetic": false,
    "physical": false,
    "opposites": ["eunuch_1"],
    "compat": {}
  },
  {
    "id": "blind",
    "label": "Blind",
    "category": "health",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  }
];

const HEALTH_STATS = {
  scarred: { intimidation: 1, prowess: 1 },
  beardless_eunuch: { prowess: -4, charisma: -1 },
  blind: { stewardship: -2, martial: -6, intrigue: -2, prowess: -10, dexterity: -1, perception: -4, athletics: -2 }
};

const HEALTH_FLAVOR = {
  scarred: '{name} carries the marks of past conflict on their skin. Each scar is a chapter.',
  eunuch_1: '{name} has been cut — a political or religious act that changed the path of their life.',
  beardless_eunuch: '{name} bears a smooth face and a complicated history.',
  blind: '{name} cannot see the world as others do. They have had to carve their own place in it.'
};
