// ============================================================
// traits_fame.js — Fame, vice, and special role trait definitions, stat modifiers, and flavor text.
// ============================================================

const FAME_TRAITS = [
  {
    "id": "drunkard",
    "label": "Drunkard",
    "category": "fame",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "temperate": -5
      }
  },
  {
    "id": "hashishiyah",
    "label": "Hashishiyah",
    "category": "fame",
    "cost": 5,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "temperate": -5
      }
  },
  {
    "id": "rakish",
    "label": "Rakish",
    "category": "fame",
    "cost": 0,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "chaste": -5
      }
  },
  {
    "id": "reclusive",
    "label": "Reclusive",
    "category": "fame",
    "cost": -5,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "gregarious": -5
      }
  },
  {
    "id": "irritable",
    "label": "Irritable",
    "category": "fame",
    "cost": 0,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "compassionate": -5,
        "gregarious": -5,
        "calm": -5
      }
  },
  {
    "id": "witch",
    "label": "Witch",
    "category": "fame",
    "cost": 10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "governor",
    "label": "Governor",
    "category": "fame",
    "cost": 40,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "talented_mage",
    "label": "Talented Mage",
    "category": "fame",
    "cost": 75,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 20,
        "shrewd": 10,
        "perceptive": 5,
        "scholar": 10,
        "lifestyle_mystic": 10
      }
  }
];

const FAME_STATS = {
  witch: { intrigue: 1, diplomacy: -1, learning: 1, intelligence: 1, arcana: 3, deception: 1 },
  governor: { stewardship: 2, diplomacy: 2, charisma: 1, persuasion: 2, intimidation: 1, insight: 1 },
  drunkard: { stewardship: -2, prowess: -2, constitution: -1, charisma: -1 },
  hashishiyah: { stewardship: -2, learning: -2, intelligence: -1 },
  rakish: { intrigue: 1, diplomacy: -1, charisma: 1, dexterity: 1, deception: 1, performance: 1 },
  reclusive: { stewardship: -1, diplomacy: -2, charisma: -2, stealth: 1 },
  irritable: { martial: -1, diplomacy: -2, prowess: 2, charisma: -1, persuasion: -1 },
  talented_mage: { learning: 2, arcana: 3, intelligence: 2, wisdom: 1 }
};

const FAME_FLAVOR = {
  irritable: 'Patience is not {name}\'s virtue. Small aggravations have a way of becoming larger ones.',
  drunkard: 'The cup is never quite empty around {name}. There is warmth in the bottle they do not always find elsewhere.',
  hashishiyah: '{name} has found a certain haze they are not in a hurry to leave. The world is softer, seen through that particular smoke.',
  rakish: '{name} has a reputation. Much of it earned. They seem oddly proud of that.',
  reclusive: '{name} prefers their own company. The world outside is loud and exhausting; within their walls, there is quiet.',
  witch: '{name} walks a path most dare not name. Whether the power is real or perceived, people treat it as the same thing.',
  governor: '{name} governs with competence. They know that administration is the quiet cousin of victory.',
  talented_mage: '{name} has refined their innate gift into something rare. Where most who carry the Affinity sense magic distantly, they have learned to shape it. The breadth of their reach is wider than most will ever know.'
};
