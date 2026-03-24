// ============================================================
// traits_childhood.js — Childhood event trait definitions, stat modifiers, and flavor text.
// ============================================================

const CHILDHOOD_TRAITS = [
  {
    "id": "rowdy",
    "label": "Rowdy",
    "category": "childhood",
    "cost": 5,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "rowdy": 30,
        "brave": 30,
        "ambitious": 30,
        "bossy": 5,
        "curious": 5,
        "pensive": -5,
        "craven": -5,
        "calm": -5
      }
  },
  {
    "id": "charming",
    "label": "Charming",
    "category": "childhood",
    "cost": 5,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "charming": 5,
        "gregarious": 15,
        "deceitful": 5,
        "ambitious": 5,
        "bossy": 5,
        "curious": -15,
        "honest": -15,
        "content": -15,
        "just": -15,
        "shy": -30
      }
  },
  {
    "id": "curious",
    "label": "Curious",
    "category": "childhood",
    "cost": 5,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "curious": 30,
        "gregarious": 15,
        "compassionate": 15,
        "rowdy": 15,
        "charming": 5,
        "shy": -30,
        "callous": -15,
        "sadistic": -15,
        "deceitful": -5
      }
  },
  {
    "id": "pensive",
    "label": "Pensive",
    "category": "childhood",
    "cost": 5,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "pensive": 30,
        "whole_of_body": 30,
        "scholar": 30,
        "theologian": 30,
        "diligent": 5,
        "intellect_good_1": 5,
        "intellect_good_2": 5,
        "intellect_good_3": 5,
        "shrewd": 5,
        "rowdy": -15,
        "bossy": -5,
        "lazy": -5
      }
  },
  {
    "id": "bossy",
    "label": "Bossy",
    "category": "childhood",
    "cost": 5,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
        "bossy": 5,
        "ambitious": 5,
        "greedy": 5,
        "rowdy": 5,
        "content": -5,
        "pensive": -5
      }
  },
  {
    "id": "childhood_orphan",
    "label": "Orphan",
    "category": "childhood",
    "cost": 0,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": ["well_cared_for"],
    "compat": {
        "defiant": 10,
        "stubborn": 5,
        "brave": 5,
        "self_serving": 10,
        "well_cared_for": -30,
        "spoiled": -20
      }
  },
  {
    "id": "neglected",
    "label": "Neglected",
    "category": "childhood",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": ["well_cared_for", "spoiled"],
    "compat": {
        "defiant": 5,
        "cynical": 10,
        "paranoid": 5,
        "well_cared_for": -30,
        "spoiled": -25
      }
  },
  {
    "id": "spoiled",
    "label": "Spoiled",
    "category": "childhood",
    "cost": -5,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": ["neglected", "childhood_orphan"],
    "compat": {
        "arrogant": 15,
        "lazy": 10,
        "greedy": 10,
        "gullible": 5,
        "neglected": -25,
        "childhood_orphan": -20
      }
  },
  {
    "id": "well_cared_for",
    "label": "Well Cared For",
    "category": "childhood",
    "cost": 10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": ["neglected", "childhood_orphan"],
    "compat": {
        "compassionate": 10,
        "trusting": 10,
        "content": 10,
        "humble": 5,
        "neglected": -30,
        "childhood_orphan": -20
      }
  }
];

const CHILDHOOD_STATS = {
  rowdy: { martial: 1, intrigue: 1, constitution: 1, intimidation: 1, performance: 1 },
  charming: { intrigue: 1, diplomacy: 1, charisma: 2, persuasion: 2, performance: 1 },
  curious: { diplomacy: 1, learning: 1, intelligence: 1, investigation: 2, arcana: 1 },
  pensive: { stewardship: 1, learning: 1, wisdom: 1, insight: 2, perception: 1 },
  bossy:           { stewardship: 1, martial: 1, intimidation: 1, charisma: -1 },
  childhood_orphan:{ intrigue: 1, survival: 1, constitution: 1 },
  neglected:       { intrigue: 1, diplomacy: -1, wisdom: -1 },
  spoiled:         { charisma: 1, diplomacy: -1, constitution: -1 },
  well_cared_for:  { constitution: 1, wisdom: 1, charisma: 1 }
};

const CHILDHOOD_FLAVOR = {
  rowdy: '{name} brings the energy of a thunderstorm to any gathering. Not always invited back, but rarely forgotten.',
  charming: '{name} has a way with people. A smile, a word, and the room tilts in their favor.',
  curious: '{name} always wants to know what is around the next corner. Questions follow them like a loyal hound.',
  pensive: '{name} lives much of life inside their own head. Still waters run deep.',
  bossy:           '{name} knows how things should be done, and they are not above telling you — at length.',
  childhood_orphan:'{name} lost their parents early. They learned to manage before they were ready, and they have been managing ever since.',
  neglected:       '{name} was not looked after as they should have been. They grew up largely on their own terms — which had costs.',
  spoiled:         '{name} had most things handed to them growing up. They are still adjusting to a world that does not.',
  well_cared_for:  '{name} had a solid upbringing — stable, attentive, and kind. That foundation shows.'
};
