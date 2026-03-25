// ============================================================
// traits_lifestyle.js — Lifestyle trait definitions, stat modifiers, and flavor text.
// ============================================================

const LIFESTYLE_TRAITS = [
  {
    "id": "diplomat",
    "label": "Diplomat",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "diplomat": 15,
        "family_first": 15,
        "august": 15,
        "gregarious": 5,
        "shy": -5
      }
  },
  {
    "id": "family_first",
    "label": "Family First",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "diplomat": 15,
        "family_first": 15,
        "august": 15,
        "gregarious": 5,
        "shy": -5
      }
  },
  {
    "id": "august",
    "label": "August",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "diplomat": 15,
        "family_first": 15,
        "august": 15,
        "gregarious": 5,
        "shy": -5
      }
  },
  {
    "id": "lifestyle_reveler",
    "label": "Reveler",
    "category": "lifestyle",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "gregarious": 5,
        "shy": -5,
        "lustful": 5,
        "chaste": -5,
        "drunkard": 5,
        "temperate": -5,
        "gluttonous": 5
      }
  },
  {
    "id": "lifestyle_blademaster",
    "label": "Blademaster",
    "category": "lifestyle",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "brave": 5,
        "craven": -5
      }
  },
  {
    "id": "lifestyle_hunter",
    "label": "Hunter",
    "category": "lifestyle",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "brave": 5,
        "diligent": 5,
        "craven": -5,
        "lazy": -5
      }
  },
  {
    "id": "strategist",
    "label": "Strategist",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "strategist": 15,
        "overseer": 15,
        "gallant": 15,
        "brave": 5,
        "craven": -5
      }
  },
  {
    "id": "overseer",
    "label": "Overseer",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "strategist": 15,
        "overseer": 15,
        "gallant": 15,
        "brave": 5,
        "craven": -5
      }
  },
  {
    "id": "gallant",
    "label": "Gallant",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "strategist": 15,
        "overseer": 15,
        "gallant": 15,
        "brave": 5,
        "craven": -5
      }
  },
  {
    "id": "architect",
    "label": "Architect",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "architect": 15,
        "administrator": 15,
        "avaricious": 15,
        "diligent": 5,
        "lazy": -5,
        "lifestyle_gardener": 5
      }
  },
  {
    "id": "administrator",
    "label": "Administrator",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "architect": 15,
        "administrator": 15,
        "avaricious": 15,
        "diligent": 5,
        "lazy": -5
      }
  },
  {
    "id": "avaricious",
    "label": "Avaricious",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "architect": 15,
        "administrator": 15,
        "avaricious": 15,
        "diligent": 5,
        "lazy": -5
      }
  },
  {
    "id": "schemer",
    "label": "Schemer",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "schemer": 15,
        "seducer": 15,
        "torturer": 15,
        "deceitful": 5,
        "honest": -5
      }
  },
  {
    "id": "seducer",
    "label": "Seducer",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "schemer": 15,
        "seducer": 15,
        "torturer": 15,
        "deceitful": 5,
        "honest": -5
      }
  },
  {
    "id": "torturer",
    "label": "Torturer",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "schemer": 15,
        "seducer": 15,
        "torturer": 15,
        "deceitful": 5,
        "honest": -5
      }
  },
  {
    "id": "whole_of_body",
    "label": "Whole of Body",
    "category": "lifestyle",
    "cost": 75,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "whole_of_body": 15,
        "scholar": 15,
        "theologian": 15,
        "intellect_good_1": 5,
        "intellect_good_2": 5,
        "intellect_good_3": 5,
        "pensive": 5,
        "shrewd": 5,
        "diligent": 5,
        "lazy": -5,
        "intellect_bad_1": -5,
        "intellect_bad_2": -5,
        "intellect_bad_3": -5
      }
  },
  {
    "id": "scholar",
    "label": "Scholar",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "whole_of_body": 15,
        "scholar": 15,
        "theologian": 15,
        "lifestyle_gardener": 15,
        "intellect_good_1": 5,
        "intellect_good_2": 5,
        "intellect_good_3": 5,
        "pensive": 5,
        "shrewd": 5,
        "diligent": 5,
        "lazy": -5,
        "intellect_bad_1": -5,
        "intellect_bad_2": -5,
        "intellect_bad_3": -5
      }
  },
  {
    "id": "theologian",
    "label": "Theologian",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "whole_of_body": 15,
        "scholar": 15,
        "theologian": 15,
        "intellect_good_1": 5,
        "intellect_good_2": 5,
        "intellect_good_3": 5,
        "pensive": 5,
        "shrewd": 5,
        "diligent": 5,
        "lazy": -5,
        "intellect_bad_1": -5,
        "intellect_bad_2": -5,
        "intellect_bad_3": -5
      }
  },
  {
    "id": "lifestyle_mystic",
    "label": "Mystic",
    "category": "lifestyle",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "lifestyle_physician",
    "label": "Physician",
    "category": "lifestyle",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "whole_of_body": 5,
        "scholar": 5,
        "theologian": 5
      }
  },
  {
    "id": "lifestyle_herbalist",
    "label": "Herbalist",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "lifestyle_mystic": 15,
        "whole_of_body": 5,
        "scholar": 5,
        "theologian": 5,
        "zealous": -5,
        "lifestyle_gardener": 15
      }
  },
  {
    "id": "lifestyle_gardener",
    "label": "Gardener",
    "category": "lifestyle",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "lifestyle_gardener": 15,
        "lifestyle_herbalist": 15,
        "scholar": 15,
        "architect": 5
      }
  },
  {
    "id": "lifestyle_traveler",
    "label": "Traveler",
    "category": "lifestyle",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "worldly": 15,
        "curious": 15,
        "lifestyle_hunter": 10,
        "reclusive": -15
      }
  }
];

const LIFESTYLE_STATS = {
  diplomat: { diplomacy: 3, charisma: 1, persuasion: 3 },
  august: { martial: 1, diplomacy: 2, charisma: 2, intimidation: 1 },
  family_first: { diplomacy: 1, insight: 1, persuasion: 1 },
  lifestyle_reveler: { intrigue: 1, charisma: 1, performance: 2 },
  lifestyle_blademaster: { prowess: 3, strength: 2, dexterity: 2, athletics: 3 },
  lifestyle_hunter: { prowess: 1, dexterity: 1, survival: 2, perception: 2, stealth: 1, animal_handling: 1 },
  strategist: { martial: 3, diplomacy: 1, intelligence: 1, investigation: 1 },
  overseer: { stewardship: 2, martial: 2, wisdom: 1, perception: 2 },
  gallant: { martial: 2, prowess: 4, strength: 1, dexterity: 1, athletics: 2 },
  architect: { stewardship: 2, intelligence: 1, investigation: 1, history: 1 },
  administrator: { stewardship: 3, diplomacy: 1, intelligence: 1 },
  avaricious: { stewardship: 2, investigation: 1 },
  schemer: { intrigue: 5, intelligence: 1, dexterity: 1, deception: 2, insight: 2 },
  seducer: { intrigue: 3, charisma: 2, dexterity: 1, persuasion: 2, deception: 1 },
  torturer: { prowess: 4, intimidation: 3 },
  whole_of_body: { constitution: 2, strength: 1, dexterity: 1, athletics: 1, survival: 1 },
  scholar: { learning: 3, intelligence: 2, arcana: 1, history: 2, investigation: 2 },
  theologian: { learning: 3, wisdom: 1, religion: 3, history: 1 },
  lifestyle_mystic: { learning: 1, intelligence: 1, arcana: 3, religion: 2 },
  lifestyle_physician: { learning: 1, intelligence: 1, medicine: 3 },
  lifestyle_herbalist: { intrigue: 2, learning: 2, medicine: 2, nature: 2, survival: 1 },
  lifestyle_gardener: { stewardship: 2, nature: 2, animal_handling: 1 },
  lifestyle_traveler: { diplomacy: 1, survival: 2, perception: 2, nature: 1 }
};

const LIFESTYLE_FLAVOR = {
  diplomat: '{name} knows that words are sharper than swords, and far more lasting. They choose them carefully.',
  family_first: '{name} would move mountains for their family. Blood is not merely thicker than water. It is everything.',
  august: '{name} carries themselves with a natural authority. Rooms adjust when they enter.',
  lifestyle_reveler: '{name} knows how to celebrate. Life is short, and they have no intention of watching it pass quietly.',
  lifestyle_blademaster: '{name} has devoted themselves to the edge and its art. The blade is an extension of their will.',
  lifestyle_hunter: 'The hunt sharpens {name} in ways the city never could. They are patient, perceptive, and patient.',
  strategist: '{name} sees the battlefield as a puzzle. Others see chaos; they see the solution.',
  overseer: '{name} has an eye for order. They manage what needs managing and notice what others miss.',
  gallant: '{name} carries the soldier\'s craft in their bearing and the fighter\'s grace in their movement.',
  architect: '{name} sees what could be built where others see only empty space. They dream in stone and timber.',
  administrator: '{name} has a talent for keeping the gears of things turning. Not glamorous, but essential.',
  avaricious: '{name} has a gift for accumulation. Coin, land, debts: they keep meticulous track of all of it.',
  schemer: '{name} is always thinking three moves ahead. The game is never quite over for them.',
  seducer: '{name} can make hearts turn like pages. Whether they read them carefully is another matter.',
  torturer: '{name} has extracted secrets from the stubborn. Not a comfortable thought, but a useful one.',
  whole_of_body: '{name} is in excellent health, the kind that seems almost unfair. Their body is a well-maintained instrument.',
  scholar: '{name} has buried themselves in books and emerged wiser for it. The margins of their texts are full of questions.',
  theologian: '{name} wrestles with the divine. They have read the holy texts more carefully than most priests.',
  lifestyle_mystic: '{name} is drawn to the occult edges of the world. Whether they find truth there is anyone\'s guess.',
  lifestyle_physician: '{name} has learned to read the body\'s language: fever, pulse, pallor. They can sometimes answer it.',
  lifestyle_herbalist: '{name} knows which roots heal and which kill, and the difference matters enormously in their work.',
  lifestyle_gardener: '{name} finds meaning in careful cultivation. There is philosophy in pruning.',
  lifestyle_traveler: '{name} has seen more of the world than most. The road has shaped them.'
};
