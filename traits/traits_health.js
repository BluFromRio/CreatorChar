// ============================================================
// traits_health.js — Health/injury trait definitions, stat modifiers, and flavor text.
// ============================================================

const HEALTH_TRAITS = [
  { "id": "balding",           "label": "Balding",                "category": "health", "cost": -5,  "group": null, "level": null, "genetic": false, "physical": true,  "opposites": [], "compat": {} },
  { "id": "beardless_eunuch",  "label": "Beardless Eunuch",       "category": "health", "cost": -15, "group": null, "level": 2,    "genetic": false, "physical": false, "opposites": ["eunuch_1"], "compat": {} },
  { "id": "blind",             "label": "Blind",                  "category": "health", "cost": -10, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "boils",             "label": "Boils / Skin Condition", "category": "health", "cost": -10, "group": null, "level": null, "genetic": false, "physical": true,  "opposites": ["unblemished"], "compat": {} },
  { "id": "diseased",          "label": "Diseased",               "category": "health", "cost": -15, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "eunuch_1",          "label": "Eunuch",                 "category": "health", "cost": -10, "group": null, "level": 1,    "genetic": false, "physical": false, "opposites": ["beardless_eunuch"], "compat": {} },
  { "id": "hard_of_hearing",   "label": "Hard of Hearing",        "category": "health", "cost": -10, "group": null, "level": null, "genetic": false, "physical": true,  "opposites": [], "compat": {} },
  { "id": "needs_glasses",     "label": "Needs Glasses",          "category": "health", "cost": -5,  "group": null, "level": null, "genetic": false, "physical": true,  "opposites": [], "compat": { "poor_eyesight": 20, "night_blind": 10 } },
  { "id": "night_blind",       "label": "Night Blind",            "category": "health", "cost": -10, "group": null, "level": null, "genetic": false, "physical": true,  "opposites": [], "compat": { "needs_glasses": 10, "poor_eyesight": 15 } },
  { "id": "poor_eyesight",     "label": "Poor Eyesight",          "category": "health", "cost": -10, "group": null, "level": null, "genetic": false, "physical": true,  "opposites": ["blind"], "compat": { "needs_glasses": 20, "night_blind": 15 } },
  { "id": "scarred",           "label": "Scarred",                "category": "health", "cost": 10,  "group": null, "level": null, "genetic": false, "physical": false, "opposites": ["unblemished"], "compat": {} },
  { "id": "unblemished",       "label": "Unblemished",            "category": "health", "cost": 15,  "group": null, "level": null, "genetic": false, "physical": true,  "opposites": ["scarred", "boils"], "compat": { "beauty_good_1": 5, "beauty_good_2": 10, "beauty_good_3": 15 } },
  { "id": "wrinkled",          "label": "Wrinkled",               "category": "health", "cost": -5,  "group": null, "level": null, "genetic": false, "physical": true,  "opposites": [], "compat": {} }
];

const HEALTH_STATS = {
  balding:         { charisma: -1 },
  beardless_eunuch:{ prowess: -4, charisma: -1 },
  blind:           { stewardship: -2, martial: -6, intrigue: -2, prowess: -10, dexterity: -1, perception: -4, athletics: -2 },
  boils:           { charisma: -2, diplomacy: -1 },
  diseased:        { constitution: -3, strength: -2, dexterity: -1, athletics: -2 },
  hard_of_hearing: { perception: -2, insight: -2 },
  needs_glasses:   { perception: -1 },
  night_blind:     { perception: -2, stealth: -2 },
  poor_eyesight:   { perception: -3, martial: -1, acrobatics: -1 },
  scarred:         { intimidation: 1, prowess: 1 },
  unblemished:     { charisma: 1, diplomacy: 1 },
  wrinkled:        { charisma: -1 }
};

const HEALTH_FLAVOR = {
  balding:         '{name} is losing their hair. They have made their peace with it, more or less.',
  beardless_eunuch:'{name} bears a smooth face and a complicated history.',
  blind:           '{name} cannot see the world as others do. They have had to carve their own place in it.',
  boils:           '{name} is afflicted with a persistent skin condition. It draws eyes, and not in ways they appreciate.',
  diseased:        '{name} carries a sickness. Some days are better than others.',
  eunuch_1:        '{name} has been cut, a political or religious act that changed the path of their life.',
  hard_of_hearing: '{name} does not catch everything the first time. They have learned to read rooms as much as words.',
  needs_glasses:   '{name} needs corrective lenses. Without them, the world is a smudge.',
  night_blind:     '{name} sees poorly in low light. They have learned to stay near candles.',
  poor_eyesight:   '{name} does not see well. Distance is a blur; details require effort.',
  scarred:         '{name} carries the marks of past conflict on their skin. Each scar is a chapter.',
  unblemished:     '{name} has remarkably clear, unmarked skin. Whatever they have been through, it has left no visible trace.',
  wrinkled:        '{name} has aged visibly. Lines map a life lived, though perhaps prematurely.'
};
