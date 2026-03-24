// ============================================================
// traits_magic.js — Magic Affinity, Talented Mage, and all elemental trait definitions, stat modifiers, and flavor text.
// ============================================================

const MAGIC_TRAITS = [
  {
    "id": "magic_affinity",
    "label": "Magic Affinity",
    "category": "magic_elements",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": false,
    "opposites": [],
    "compat": {
        "talented_mage": 15,
        "elem_fire": 5,
        "elem_earth": 5,
        "elem_water": 5,
        "elem_wind": 5,
        "elem_light": 10,
        "elem_dark": 10,
        "elem_ice": 10,
        "elem_magma": 10,
        "elem_lightning": 10,
        "elem_nature": 10,
        "witch": 10,
        "lifestyle_mystic": 10
      }
  },
  {
    "id": "talented_mage",
    "label": "Talented Mage",
    "category": "magic_elements",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 15,
        "elem_fire": 5,
        "elem_earth": 5,
        "elem_water": 5,
        "elem_wind": 5,
        "elem_light": 10,
        "elem_dark": 10,
        "elem_ice": 10,
        "elem_magma": 10,
        "elem_lightning": 10,
        "elem_nature": 10,
        "scholar": 5,
        "lifestyle_mystic": 10
      }
  },
  {
    "id": "elem_earth",
    "label": "Earth",
    "category": "magic_elements",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 5,
        "talented_mage": 5,
        "elem_water": 10,
        "elem_magma": 10,
        "elem_nature": 10
      }
  },
  {
    "id": "elem_fire",
    "label": "Fire",
    "category": "magic_elements",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 5,
        "talented_mage": 5,
        "elem_wind": 10,
        "elem_magma": 10,
        "elem_lightning": 10
      }
  },
  {
    "id": "elem_water",
    "label": "Water",
    "category": "magic_elements",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 5,
        "talented_mage": 5,
        "elem_earth": 10,
        "elem_wind": 10,
        "elem_ice": 10,
        "elem_nature": 10
      }
  },
  {
    "id": "elem_wind",
    "label": "Wind",
    "category": "magic_elements",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 5,
        "talented_mage": 5,
        "elem_fire": 10,
        "elem_water": 10,
        "elem_ice": 10,
        "elem_lightning": 10
      }
  },
  {
    "id": "elem_ice",
    "label": "Ice",
    "category": "magic_elements",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 5,
        "talented_mage": 10,
        "elem_water": 15,
        "elem_wind": 15
      }
  },
  {
    "id": "elem_magma",
    "label": "Magma",
    "category": "magic_elements",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 5,
        "talented_mage": 10,
        "elem_fire": 15,
        "elem_earth": 15
      }
  },
  {
    "id": "elem_lightning",
    "label": "Lightning",
    "category": "magic_elements",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 5,
        "talented_mage": 10,
        "elem_fire": 15,
        "elem_wind": 15
      }
  },
  {
    "id": "elem_nature",
    "label": "Nature",
    "category": "magic_elements",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "magic_affinity": 5,
        "talented_mage": 10,
        "elem_earth": 15,
        "elem_water": 15
      }
  },
  {
    "id": "elem_light",
    "label": "Light",
    "category": "magic_elements",
    "cost": 100,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": ["elem_dark"],
    "compat": {
        "magic_affinity": 10,
        "reverent": 10,
        "just": 5,
        "zealous": 5,
        "oathbound": 5
      }
  },
  {
    "id": "elem_dark",
    "label": "Dark",
    "category": "magic_elements",
    "cost": 100,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": ["elem_light"],
    "compat": {
        "magic_affinity": 10,
        "cynical": 5,
        "sadistic": 5,
        "witch": 10,
        "calculating": 5
      }
  }
];

const MAGIC_STATS = {
  magic_affinity: { arcana: 3, learning: 1, intelligence: 1 },
  talented_mage: { arcana: 4, learning: 2, intelligence: 2, wisdom: 1 },
  elem_earth: { arcana: 2, nature: 2, constitution: 1 },
  elem_fire: { arcana: 2, intimidation: 1, athletics: 1 },
  elem_water: { arcana: 2, medicine: 1, wisdom: 1 },
  elem_wind: { arcana: 2, acrobatics: 1, dexterity: 1 },
  elem_ice: { arcana: 3, nature: 1, constitution: 1, dexterity: 1 },
  elem_magma: { arcana: 3, intimidation: 2, strength: 1 },
  elem_lightning: { arcana: 3, dexterity: 2, intimidation: 1 },
  elem_nature: { arcana: 3, nature: 2, medicine: 1, wisdom: 1 },
  elem_light: { arcana: 4, religion: 2, wisdom: 2, charisma: 1 },
  elem_dark: { arcana: 4, intrigue: 2, intimidation: 2, stealth: 1 }
};

const MAGIC_FLAVOR = {
  magic_affinity: '{name} was born with something in them that responds to the arcane. It is not power, exactly — not yet. It is the capacity for it, the receptivity. A door that opens both ways.',
  talented_mage: '{name} has a gift that goes beyond study or practice — an intuitive grasp of magical principles that takes others years to learn. Raw talent, carefully sharpened.',
  elem_earth: '{name} has bonded with the element of earth. In stone and root, in stillness and weight, they find both anchor and power. The ground answers when they call.',
  elem_fire: '{name} commands fire. Not in the reckless sense — in the way of someone who has spent time with flame and learned to respect the line between controlled and catastrophic.',
  elem_water: '{name} works with water — patient, adaptable, and quietly unstoppable. It flows where it will, and {name} has learned to guide rather than force it.',
  elem_wind: '{name} has an affinity for wind. It moves without asking permission, and {name}\'s understanding of it is equally unceremonious.',
  elem_ice: '{name} has mastered the marriage of water and wind into ice — precise, cold, and terribly effective. It takes a steady hand and a steadier temperament.',
  elem_magma: '{name} commands where earth and fire collide — molten stone and geological fury. It is not subtle. It was never meant to be.',
  elem_lightning: '{name} has bound fire and wind into lightning. Instantaneous, overwhelming, dangerous in every direction. They have learned to manage that last part, mostly.',
  elem_nature: '{name} works the deep harmony between earth and water — growth, restoration, and the long patience of living things. Nature magic does not hurry. Neither does {name}.',
  elem_light: '{name} channels light — not merely illumination but presence, clarity, and the kind of brightness that can comfort or blind in equal measure. It is a heavy thing to carry, but they carry it.',
  elem_dark: '{name} draws on darkness. Not evil in itself, but the absence of ordinary limits — shadow, depth, and the things that live beyond where common sight reaches. It suits them.'
};
