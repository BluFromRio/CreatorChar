// ============================================================
// traits.js
// ============================================================

const CK3_TRAITS = [
  {
    "id": "education_intrigue_1",
    "label": "Intrigue: Trained",
    "category": "education",
    "cost": 0,
    "group": "education_intrigue",
    "level": 1,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_intrigue_2",
    "label": "Intrigue: Competent",
    "category": "education",
    "cost": 20,
    "group": "education_intrigue",
    "level": 2,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_intrigue_3",
    "label": "Intrigue: Expert",
    "category": "education",
    "cost": 40,
    "group": "education_intrigue",
    "level": 3,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_intrigue_4",
    "label": "Intrigue: Master",
    "category": "education",
    "cost": 80,
    "group": "education_intrigue",
    "level": 4,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_intrigue_5",
    "label": "Intrigue: Legend",
    "category": "education",
    "cost": 150,
    "group": "education_intrigue",
    "level": 5,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_diplomacy_1",
    "label": "Diplomacy: Trained",
    "category": "education",
    "cost": 0,
    "group": "education_diplomacy",
    "level": 1,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_diplomacy_2",
    "label": "Diplomacy: Competent",
    "category": "education",
    "cost": 20,
    "group": "education_diplomacy",
    "level": 2,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_diplomacy_3",
    "label": "Diplomacy: Expert",
    "category": "education",
    "cost": 40,
    "group": "education_diplomacy",
    "level": 3,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_diplomacy_4",
    "label": "Diplomacy: Master",
    "category": "education",
    "cost": 80,
    "group": "education_diplomacy",
    "level": 4,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_diplomacy_5",
    "label": "Diplomacy: Legend",
    "category": "education",
    "cost": 150,
    "group": "education_diplomacy",
    "level": 5,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_stewardship_1",
    "label": "Stewardship: Trained",
    "category": "education",
    "cost": 0,
    "group": "education_stewardship",
    "level": 1,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_stewardship_2",
    "label": "Stewardship: Competent",
    "category": "education",
    "cost": 20,
    "group": "education_stewardship",
    "level": 2,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_stewardship_3",
    "label": "Stewardship: Expert",
    "category": "education",
    "cost": 40,
    "group": "education_stewardship",
    "level": 3,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_stewardship_4",
    "label": "Stewardship: Master",
    "category": "education",
    "cost": 80,
    "group": "education_stewardship",
    "level": 4,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_stewardship_5",
    "label": "Stewardship: Legend",
    "category": "education",
    "cost": 150,
    "group": "education_stewardship",
    "level": 5,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_martial_1",
    "label": "Martial: Trained",
    "category": "education",
    "cost": 0,
    "group": "education_martial",
    "level": 1,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_martial_2",
    "label": "Martial: Competent",
    "category": "education",
    "cost": 20,
    "group": "education_martial",
    "level": 2,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_martial_3",
    "label": "Martial: Expert",
    "category": "education",
    "cost": 40,
    "group": "education_martial",
    "level": 3,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_martial_4",
    "label": "Martial: Master",
    "category": "education",
    "cost": 80,
    "group": "education_martial",
    "level": 4,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_martial_5",
    "label": "Martial: Legend",
    "category": "education",
    "cost": 150,
    "group": "education_martial",
    "level": 5,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_learning_1",
    "label": "Learning: Trained",
    "category": "education",
    "cost": 0,
    "group": "education_learning",
    "level": 1,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_learning_2",
    "label": "Learning: Competent",
    "category": "education",
    "cost": 20,
    "group": "education_learning",
    "level": 2,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_learning_3",
    "label": "Learning: Expert",
    "category": "education",
    "cost": 40,
    "group": "education_learning",
    "level": 3,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_learning_4",
    "label": "Learning: Master",
    "category": "education",
    "cost": 80,
    "group": "education_learning",
    "level": 4,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "education_learning_5",
    "label": "Learning: Legend",
    "category": "education",
    "cost": 150,
    "group": "education_learning",
    "level": 5,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
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
    "id": "lustful",
    "label": "Lustful",
    "category": "personality",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "chaste"
    ],
    "compat": {
      "lustful": 30,
      "gregarious": 5,
      "lifestyle_reveler": 5,
      "seducer": 5,
      "chaste": -30,
      "celibate": -30,
      "shy": -5
    }
  },
  {
    "id": "chaste",
    "label": "Chaste",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "lustful"
    ],
    "compat": {
      "chaste": 15,
      "celibate": 15,
      "temperate": 5,
      "calm": 5,
      "lustful": -30,
      "deviant": -30,
      "lovers_pox": -5,
      "early_great_pox": -5,
      "great_pox": -5,
      "lifestyle_reveler": -5,
      "seducer": -5
    }
  },
  {
    "id": "gluttonous",
    "label": "Gluttonous",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "temperate"
    ],
    "compat": {
      "gluttonous": 15,
      "drunkard": 5,
      "greedy": 5,
      "ambitious": 5,
      "lifestyle_reveler": 15,
      "temperate": -15
    }
  },
  {
    "id": "temperate",
    "label": "Temperate",
    "category": "personality",
    "cost": 40,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "gluttonous",
      "excessive"
    ],
    "compat": {
      "temperate": 15,
      "calm": 5,
      "content": 5,
      "chaste": 5,
      "gluttonous": -15,
      "excessive": -15,
      "drunkard": -5,
      "greedy": -5,
      "lustful": -5,
      "lifestyle_reveler": -15
    }
  },
  {
    "id": "greedy",
    "label": "Greedy",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "generous"
    ],
    "compat": {
      "greedy": 5,
      "ambitious": 5,
      "generous": -30,
      "content": -15,
      "compassionate": -15
    }
  },
  {
    "id": "generous",
    "label": "Generous",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "greedy"
    ],
    "compat": {
      "generous": 30,
      "compassionate": 15,
      "content": 5,
      "forgiving": 5,
      "greedy": -30,
      "ambitious": -5
    }
  },
  {
    "id": "lazy",
    "label": "Lazy",
    "category": "personality",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "diligent"
    ],
    "compat": {
      "lazy": 15,
      "content": 5,
      "calm": 5,
      "gluttonous": 5,
      "diligent": -15,
      "ambitious": -5,
      "eccentric": -5
    }
  },
  {
    "id": "diligent",
    "label": "Diligent",
    "category": "personality",
    "cost": 40,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "diligent": 15,
      "ambitious": 5,
      "patient": 5,
      "whole_of_body": 5,
      "scholar": 5,
      "theologian": 5,
      "pensive": 5,
      "architect": 5,
      "administrator": 5,
      "avaricious": 5,
      "lazy": -15,
      "content": -5
    }
  },
  {
    "id": "wrathful",
    "label": "Wrathful",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "wrathful": 5,
      "stubborn": 5,
      "honest": 5,
      "vengeful": 5,
      "calm": -15,
      "patient": -15,
      "forgiving": -5,
      "compassionate": -5,
      "eccentric": -5
    }
  },
  {
    "id": "calm",
    "label": "Calm",
    "category": "personality",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "wrathful"
    ],
    "compat": {
      "calm": 15,
      "patient": 15,
      "chaste": 5,
      "temperate": 5,
      "lazy": 5,
      "wrathful": -30,
      "impatient": -15
    }
  },
  {
    "id": "patient",
    "label": "Patient",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "impatient"
    ],
    "compat": {
      "patient": 15,
      "calm": 15,
      "stubborn": 5,
      "temperate": 5,
      "eccentric": 5,
      "impatient": -30,
      "wrathful": -5,
      "fickle": -5
    }
  },
  {
    "id": "impatient",
    "label": "Impatient",
    "category": "personality",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "patient"
    ],
    "compat": {
      "impatient": 5,
      "wrathful": 5,
      "brave": 5,
      "patient": -15,
      "calm": -5,
      "temperate": -5,
      "eccentric": -30
    }
  },
  {
    "id": "arrogant",
    "label": "Arrogant",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "humble"
    ],
    "compat": {
      "arrogant": 5,
      "greedy": 15,
      "ambitious": 15,
      "beauty_good_1": 5,
      "beauty_good_2": 5,
      "beauty_good_3": 5,
      "humble": -15,
      "content": -15,
      "generous": -5,
      "beauty_bad_1": -5,
      "beauty_bad_2": -5,
      "beauty_bad_3": -5
    }
  },
  {
    "id": "humble",
    "label": "Humble",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "arrogant"
    ],
    "compat": {
      "humble": 30,
      "content": 5,
      "generous": 5,
      "compassionate": 5,
      "just": 5,
      "arrogant": -30,
      "greedy": -15,
      "ambitious": -15
    }
  },
  {
    "id": "deceitful",
    "label": "Deceitful",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "honest"
    ],
    "compat": {
      "deceitful": 15,
      "charming": 15,
      "ambitious": 5,
      "honest": -15,
      "just": -15,
      "trusting": -15,
      "paranoid": -5,
      "compassionate": -5,
      "eccentric": -5
    }
  },
  {
    "id": "honest",
    "label": "Honest",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "deceitful"
    ],
    "compat": {
      "honest": 30,
      "just": 15,
      "trusting": 15,
      "compassionate": 5,
      "deceitful": -30,
      "charming": -15,
      "paranoid": -15
    }
  },
  {
    "id": "craven",
    "label": "Craven",
    "category": "personality",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "brave"
    ],
    "compat": {
      "craven": 5,
      "patient": 5,
      "calm": 5,
      "content": 5,
      "brave": -15,
      "wrathful": -30,
      "sadistic": -30,
      "callous": -15,
      "impatient": -5,
      "ambitious": -5,
      "deceitful": -5
    }
  },
  {
    "id": "brave",
    "label": "Brave",
    "category": "personality",
    "cost": 40,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "craven"
    ],
    "compat": {
      "brave": 30,
      "ambitious": 15,
      "rowdy": 15,
      "gallant": 5,
      "lifestyle_blademaster": 5,
      "strategist": 5,
      "overseer": 5,
      "craven": -30,
      "lazy": -15,
      "calm": -5,
      "content": -5
    }
  },
  {
    "id": "shy",
    "label": "Shy",
    "category": "personality",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "gregarious"
    ],
    "compat": {
      "shy": 15,
      "content": 5,
      "calm": 5,
      "craven": 5,
      "chaste": 5,
      "celibate": 5,
      "eccentric": 5,
      "gregarious": -30,
      "curious": -15,
      "wrathful": -15,
      "ambitious": -5,
      "lustful": -5
    }
  },
  {
    "id": "gregarious",
    "label": "Gregarious",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "gregarious": 30,
      "curious": 15,
      "charming": 30,
      "compassionate": 15,
      "honest": 15,
      "lustful": 15,
      "lifestyle_reveler": 15,
      "diplomat": 15,
      "family_first": 15,
      "august": 15,
      "gallant": 15,
      "eccentric": 15,
      "trusting": 5,
      "shy": -15,
      "callous": -15,
      "sadistic": -15,
      "chaste": -5,
      "celibate": -5,
      "craven": -5
    }
  },
  {
    "id": "ambitious",
    "label": "Ambitious",
    "category": "personality",
    "cost": 40,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "content"
    ],
    "compat": {
      "ambitious": 5,
      "diligent": 5,
      "greedy": 5,
      "brave": 5,
      "rowdy": 5,
      "content": -15,
      "lazy": -15,
      "craven": -15,
      "generous": -5,
      "trusting": -5
    }
  },
  {
    "id": "content",
    "label": "Content",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "ambitious"
    ],
    "compat": {
      "content": 15,
      "lazy": 5,
      "calm": 5,
      "generous": 5,
      "forgiving": 5,
      "ambitious": -15,
      "diligent": -5,
      "greedy": -5,
      "brave": -5,
      "vengeful": -5
    }
  },
  {
    "id": "arbitrary",
    "label": "Arbitrary",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "eccentric": 15,
      "arbitrary": 5,
      "fickle": 5,
      "just": -15,
      "zealous": -5,
      "stubborn": -5,
      "honest": -5
    }
  },
  {
    "id": "just",
    "label": "Just",
    "category": "personality",
    "cost": 40,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "arbitrary"
    ],
    "compat": {
      "just": 30,
      "zealous": 15,
      "honest": 15,
      "compassionate": 15,
      "gallant": 15,
      "trusting": 5,
      "brave": 5,
      "arbitrary": -30,
      "deceitful": -15,
      "sadistic": -15,
      "callous": -15,
      "fickle": -5,
      "greedy": -5,
      "eccentric": -5
    }
  },
  {
    "id": "cynical",
    "label": "Cynical",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "zealous"
    ],
    "compat": {
      "cynical": 30,
      "whole_of_body": 15,
      "scholar": 15,
      "theologian": 15,
      "honest": 5,
      "intellect_good_1": 5,
      "intellect_good_2": 5,
      "intellect_good_3": 5,
      "shrewd": 5,
      "zealous": -30,
      "intellect_bad_1": -15,
      "intellect_bad_2": -15,
      "intellect_bad_3": -15,
      "trusting": -5
    }
  },
  {
    "id": "zealous",
    "label": "Zealous",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "cynical"
    ],
    "compat": {
      "zealous": 30,
      "just": 15,
      "devoted": 15,
      "ambitious": 5,
      "trusting": 5,
      "whole_of_body": 5,
      "scholar": 5,
      "theologian": 5,
      "cynical": -30,
      "craven": -15,
      "content": -5,
      "paranoid": -5,
      "drunkard": -5,
      "lifestyle_herbalist": -5,
      "lifestyle_mystic": -5,
      "eccentric": -5
    }
  },
  {
    "id": "paranoid",
    "label": "Paranoid",
    "category": "personality",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "trusting"
    ],
    "compat": {
      "paranoid": 5,
      "cynical": 5,
      "honest": 5,
      "trusting": -30,
      "forgiving": -15,
      "deceitful": -30,
      "sadistic": -30,
      "callous": -30,
      "vengeful": -30,
      "gregarious": -15,
      "lustful": -15,
      "greedy": -15,
      "ambitious": -15,
      "eccentric": -15
    }
  },
  {
    "id": "trusting",
    "label": "Trusting",
    "category": "personality",
    "cost": 10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "paranoid"
    ],
    "compat": {
      "trusting": 15,
      "honest": 15,
      "compassionate": 5,
      "paranoid": -15,
      "deceitful": -15,
      "callous": -5,
      "sadistic": -5,
      "vengeful": -5
    }
  },
  {
    "id": "compassionate",
    "label": "Compassionate",
    "category": "personality",
    "cost": 10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "callous",
      "sadistic"
    ],
    "compat": {
      "compassionate": 30,
      "generous": 30,
      "honest": 15,
      "just": 15,
      "forgiving": 15,
      "trusting": 5,
      "gregarious": 5,
      "curious": 15,
      "calm": 5,
      "patient": 5,
      "eccentric": 5,
      "callous": -30,
      "sadistic": -30,
      "deceitful": -15,
      "arbitrary": -15,
      "vengeful": -15,
      "greedy": -5,
      "paranoid": -5,
      "wrathful": -5,
      "torturer": -5
    }
  },
  {
    "id": "callous",
    "label": "Callous",
    "category": "personality",
    "cost": 40,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "compassionate",
      "sadistic"
    ],
    "compat": {
      "callous": 5,
      "arbitrary": 5,
      "compassionate": -30,
      "curious": -5,
      "generous": -30,
      "just": -15,
      "forgiving": -15,
      "trusting": -5
    }
  },
  {
    "id": "sadistic",
    "label": "Sadistic",
    "category": "personality",
    "cost": 40,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "compassionate",
      "callous"
    ],
    "compat": {
      "sadistic": 15,
      "torturer": 5,
      "callous": 5,
      "arbitrary": 5,
      "compassionate": -30,
      "generous": -30,
      "just": -15,
      "forgiving": -15,
      "trusting": -5,
      "curious": -5
    }
  },
  {
    "id": "stubborn",
    "label": "Stubborn",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "eccentric",
      "fickle"
    ],
    "compat": {
      "patient": 5,
      "forgiving": -5,
      "fickle": -5
    }
  },
  {
    "id": "fickle",
    "label": "Fickle",
    "category": "personality",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "eccentric",
      "stubborn"
    ],
    "compat": {
      "fickle": 5,
      "forgiving": 5,
      "stubborn": -15
    }
  },
  {
    "id": "eccentric",
    "label": "Eccentric",
    "category": "personality",
    "cost": 15,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "stubborn",
      "fickle"
    ],
    "compat": {
      "patient": 30,
      "arbitrary": 5,
      "shy": 5,
      "gregarious": 5,
      "compassionate": 5,
      "stubborn": -15,
      "fickle": -15,
      "zealous": -15,
      "just": -15,
      "wrathful": -15,
      "impatient": -15,
      "deceitful": -15,
      "paranoid": -15
    }
  },
  {
    "id": "vengeful",
    "label": "Vengeful",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "forgiving"
    ],
    "compat": {
      "forgiving": -30,
      "content": -15,
      "compassionate": -5
    }
  },
  {
    "id": "forgiving",
    "label": "Forgiving",
    "category": "personality",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "vengeful"
    ],
    "compat": {
      "forgiving": 30,
      "compassionate": 15,
      "honest": 15,
      "generous": 5,
      "just": 5,
      "trusting": 5,
      "gregarious": 5,
      "calm": 5,
      "patient": 5,
      "vengeful": -30,
      "callous": -15,
      "sadistic": -15,
      "deceitful": -15,
      "arbitrary": -5,
      "paranoid": -5,
      "wrathful": -5
    }
  },
  {
    "id": "selfless",
    "label": "Selfless",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "self_serving"
    ],
    "compat": {
      "selfless": 15,
      "compassionate": 15,
      "generous": 15,
      "humble": 10,
      "forgiving": 5,
      "just": 5,
      "self_serving": -30,
      "greedy": -15,
      "callous": -10,
      "arrogant": -10
    }
  },
  {
    "id": "self_serving",
    "label": "Self-serving",
    "category": "personality",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "selfless"
    ],
    "compat": {
      "self_serving": 5,
      "greedy": 15,
      "ambitious": 10,
      "arrogant": 10,
      "deceitful": 5,
      "selfless": -30,
      "compassionate": -20,
      "generous": -20,
      "just": -10,
      "humble": -10
    }
  },
  {
    "id": "excessive",
    "label": "Excessive",
    "category": "personality",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "temperate"
    ],
    "compat": {
      "gluttonous": 10,
      "drunkard": 10,
      "lustful": 5,
      "lifestyle_reveler": 10,
      "temperate": -30,
      "chaste": -10,
      "content": -5,
      "calm": -5
    }
  },
  {
    "id": "perceptive",
    "label": "Perceptive",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "oblivious"
    ],
    "compat": {
      "perceptive": 15,
      "curious": 10,
      "pensive": 10,
      "paranoid": 5,
      "shrewd": 10,
      "diligent": 5,
      "oblivious": -30,
      "trusting": -5
    }
  },
  {
    "id": "oblivious",
    "label": "Oblivious",
    "category": "personality",
    "cost": -15,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "perceptive"
    ],
    "compat": {
      "trusting": 5,
      "content": 5,
      "perceptive": -30,
      "paranoid": -15,
      "curious": -10
    }
  },
  {
    "id": "stoic",
    "label": "Stoic",
    "category": "personality",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "expressive"
    ],
    "compat": {
      "stoic": 15,
      "calm": 15,
      "patient": 10,
      "cynical": 10,
      "stubborn": 5,
      "expressive": -30,
      "zealous": -5,
      "gregarious": -10
    }
  },
  {
    "id": "expressive",
    "label": "Expressive",
    "category": "personality",
    "cost": 15,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "stoic"
    ],
    "compat": {
      "expressive": 10,
      "gregarious": 15,
      "compassionate": 10,
      "charming": 10,
      "stoic": -30,
      "calm": -10,
      "stubborn": -5
    }
  },
  {
    "id": "calculating",
    "label": "Calculating",
    "category": "personality",
    "cost": 30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "impulsive"
    ],
    "compat": {
      "calculating": 15,
      "patient": 15,
      "shrewd": 15,
      "cynical": 10,
      "ambitious": 5,
      "impulsive": -30,
      "trusting": -10,
      "honest": -5
    }
  },
  {
    "id": "impulsive",
    "label": "Impulsive",
    "category": "personality",
    "cost": -5,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "calculating"
    ],
    "compat": {
      "brave": 10,
      "wrathful": 5,
      "rowdy": 10,
      "impatient": 5,
      "calculating": -30,
      "patient": -20,
      "stubborn": -10
    }
  },
  {
    "id": "worldly",
    "label": "Worldly",
    "category": "personality",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "naive"
    ],
    "compat": {
      "worldly": 15,
      "curious": 15,
      "gregarious": 10,
      "cynical": 5,
      "lifestyle_traveler": 15,
      "naive": -30,
      "trusting": -10
    }
  },
  {
    "id": "naive",
    "label": "Naive",
    "category": "personality",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "worldly"
    ],
    "compat": {
      "trusting": 10,
      "compassionate": 5,
      "zealous": 5,
      "worldly": -30,
      "cynical": -15,
      "curious": -5
    }
  },
  {
    "id": "fateful",
    "label": "Fateful",
    "category": "personality",
    "cost": 15,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "defiant"
    ],
    "compat": {
      "fateful": 10,
      "zealous": 15,
      "content": 10,
      "humble": 5,
      "compassionate": 5,
      "defiant": -30,
      "ambitious": -10,
      "stubborn": -5
    }
  },
  {
    "id": "defiant",
    "label": "Defiant",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "fateful"
    ],
    "compat": {
      "defiant": 10,
      "brave": 10,
      "stubborn": 15,
      "ambitious": 10,
      "wrathful": 5,
      "fateful": -30,
      "content": -15,
      "humble": -5
    }
  },
  {
    "id": "oathbound",
    "label": "Oathbound",
    "category": "personality",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "oathbreaking"
    ],
    "compat": {
      "oathbound": 20,
      "honest": 20,
      "just": 15,
      "stubborn": 10,
      "zealous": 10,
      "humble": 5,
      "oathbreaking": -30,
      "deceitful": -20,
      "ambitious": -5
    }
  },
  {
    "id": "oathbreaking",
    "label": "Oathbreaking",
    "category": "personality",
    "cost": -15,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "oathbound"
    ],
    "compat": {
      "deceitful": 20,
      "ambitious": 10,
      "arrogant": 5,
      "oathbound": -30,
      "honest": -20,
      "just": -20,
      "zealous": -10
    }
  },
  {
    "id": "reverent",
    "label": "Reverent",
    "category": "personality",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "rude"
    ],
    "compat": {
      "reverent": 15,
      "zealous": 15,
      "humble": 10,
      "just": 5,
      "compassionate": 5,
      "rude": -30,
      "arrogant": -10,
      "arbitrary": -5
    }
  },
  {
    "id": "rude",
    "label": "Rude",
    "category": "personality",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [
      "reverent"
    ],
    "compat": {
      "honest": 10,
      "wrathful": 5,
      "arrogant": 5,
      "reverent": -30,
      "gregarious": -15,
      "compassionate": -10,
      "humble": -10
    }
  },
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
    "opposites": [
      "beardless_eunuch"
    ],
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
    "opposites": [
      "eunuch_1"
    ],
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
  },
  {
    "id": "beauty_bad_1",
    "label": "Homely",
    "category": "congenital",
    "cost": -10,
    "group": "beauty_bad",
    "level": 1,
    "genetic": true,
    "physical": true,
    "opposites": [
      "beauty_bad_3",
      "beauty_bad_2",
      "beauty_good_2",
      "beauty_good_1",
      "beauty_good_3"
    ],
    "compat": {}
  },
  {
    "id": "beauty_bad_2",
    "label": "Ugly",
    "category": "congenital",
    "cost": -20,
    "group": "beauty_bad",
    "level": 2,
    "genetic": true,
    "physical": true,
    "opposites": [
      "beauty_bad_1",
      "beauty_bad_3",
      "beauty_good_2",
      "beauty_good_1",
      "beauty_good_3"
    ],
    "compat": {}
  },
  {
    "id": "beauty_bad_3",
    "label": "Hideous",
    "category": "congenital",
    "cost": -30,
    "group": "beauty_bad",
    "level": 3,
    "genetic": true,
    "physical": true,
    "opposites": [
      "beauty_bad_1",
      "beauty_bad_2",
      "beauty_good_2",
      "beauty_good_1",
      "beauty_good_3"
    ],
    "compat": {}
  },
  {
    "id": "beauty_good_1",
    "label": "Comely",
    "category": "congenital",
    "cost": 40,
    "group": "beauty_good",
    "level": 1,
    "genetic": true,
    "physical": true,
    "opposites": [
      "beauty_bad_1",
      "beauty_bad_3",
      "beauty_bad_2",
      "beauty_good_2",
      "beauty_good_3"
    ],
    "compat": {}
  },
  {
    "id": "beauty_good_2",
    "label": "Attractive",
    "category": "congenital",
    "cost": 80,
    "group": "beauty_good",
    "level": 2,
    "genetic": true,
    "physical": true,
    "opposites": [
      "beauty_bad_1",
      "beauty_bad_3",
      "beauty_bad_2",
      "beauty_good_1",
      "beauty_good_3"
    ],
    "compat": {}
  },
  {
    "id": "beauty_good_3",
    "label": "Stunning",
    "category": "congenital",
    "cost": 120,
    "group": "beauty_good",
    "level": 3,
    "genetic": true,
    "physical": true,
    "opposites": [
      "beauty_bad_1",
      "beauty_bad_3",
      "beauty_bad_2",
      "beauty_good_2",
      "beauty_good_1"
    ],
    "compat": {}
  },
  {
    "id": "intellect_bad_1",
    "label": "Slow",
    "category": "congenital",
    "cost": -15,
    "group": "intellect_bad",
    "level": 1,
    "genetic": true,
    "physical": true,
    "opposites": [
      "intellect_good_3",
      "shrewd",
      "intellect_bad_3",
      "intellect_good_1",
      "intellect_good_2",
      "intellect_bad_2"
    ],
    "compat": {
      "intellect_bad_1": 15,
      "intellect_bad_2": 15,
      "intellect_bad_3": 15,
      "dull": 15,
      "intellect_good_1": -15,
      "intellect_good_2": -15,
      "intellect_good_3": -15,
      "shrewd": -15
    }
  },
  {
    "id": "intellect_bad_2",
    "label": "Dim",
    "category": "congenital",
    "cost": -30,
    "group": "intellect_bad",
    "level": 2,
    "genetic": true,
    "physical": true,
    "opposites": [
      "intellect_good_3",
      "shrewd",
      "intellect_bad_1",
      "intellect_bad_3",
      "intellect_good_1",
      "intellect_good_2"
    ],
    "compat": {
      "intellect_bad_1": 15,
      "intellect_bad_2": 15,
      "intellect_bad_3": 15,
      "dull": 15,
      "intellect_good_1": -15,
      "intellect_good_2": -15,
      "intellect_good_3": -15,
      "shrewd": -15
    }
  },
  {
    "id": "intellect_bad_3",
    "label": "Imbecile",
    "category": "congenital",
    "cost": -45,
    "group": "intellect_bad",
    "level": 3,
    "genetic": true,
    "physical": true,
    "opposites": [
      "intellect_good_3",
      "shrewd",
      "intellect_bad_1",
      "intellect_good_1",
      "intellect_good_2",
      "intellect_bad_2"
    ],
    "compat": {
      "intellect_bad_1": 15,
      "intellect_bad_2": 15,
      "intellect_bad_3": 15,
      "dull": 15,
      "intellect_good_1": -15,
      "intellect_good_2": -15,
      "intellect_good_3": -15,
      "shrewd": -15
    }
  },
  {
    "id": "intellect_good_1",
    "label": "Sharp",
    "category": "congenital",
    "cost": 80,
    "group": "intellect_good",
    "level": 1,
    "genetic": true,
    "physical": true,
    "opposites": [
      "intellect_good_3",
      "intellect_bad_1",
      "intellect_bad_3",
      "intellect_good_2",
      "intellect_bad_2"
    ],
    "compat": {
      "intellect_good_1": 15,
      "intellect_good_2": 15,
      "intellect_good_3": 15,
      "shrewd": 15,
      "intellect_bad_1": -15,
      "intellect_bad_2": -15,
      "intellect_bad_3": -15,
      "dull": -15
    }
  },
  {
    "id": "intellect_good_2",
    "label": "Quick",
    "category": "congenital",
    "cost": 160,
    "group": "intellect_good",
    "level": 2,
    "genetic": true,
    "physical": true,
    "opposites": [
      "intellect_good_3",
      "intellect_bad_1",
      "intellect_bad_3",
      "intellect_good_1",
      "intellect_bad_2"
    ],
    "compat": {
      "intellect_good_1": 15,
      "intellect_good_2": 15,
      "intellect_good_3": 15,
      "shrewd": 15,
      "intellect_bad_1": -15,
      "intellect_bad_2": -15,
      "intellect_bad_3": -15,
      "dull": -15
    }
  },
  {
    "id": "intellect_good_3",
    "label": "Genius",
    "category": "congenital",
    "cost": 240,
    "group": "intellect_good",
    "level": 3,
    "genetic": true,
    "physical": true,
    "opposites": [
      "intellect_bad_1",
      "intellect_bad_3",
      "intellect_good_1",
      "intellect_good_2",
      "intellect_bad_2"
    ],
    "compat": {
      "intellect_good_1": 15,
      "intellect_good_2": 15,
      "intellect_good_3": 15,
      "shrewd": 15,
      "intellect_bad_1": -15,
      "intellect_bad_2": -15,
      "intellect_bad_3": -15,
      "dull": -15
    }
  },
  {
    "id": "physique_bad_1",
    "label": "Weak Frame",
    "category": "congenital",
    "cost": -15,
    "group": "physique_bad",
    "level": 1,
    "genetic": true,
    "physical": true,
    "opposites": [
      "physique_good_3",
      "physique_bad_2",
      "physique_bad_3",
      "physique_good_2",
      "physique_good_1",
      "strong"
    ],
    "compat": {}
  },
  {
    "id": "physique_bad_2",
    "label": "Feeble",
    "category": "congenital",
    "cost": -30,
    "group": "physique_bad",
    "level": 2,
    "genetic": true,
    "physical": true,
    "opposites": [
      "physique_bad_1",
      "physique_good_3",
      "physique_bad_3",
      "physique_good_2",
      "physique_good_1",
      "strong"
    ],
    "compat": {}
  },
  {
    "id": "physique_bad_3",
    "label": "Frail",
    "category": "congenital",
    "cost": -45,
    "group": "physique_bad",
    "level": 3,
    "genetic": true,
    "physical": true,
    "opposites": [
      "physique_bad_1",
      "physique_good_3",
      "physique_bad_2",
      "physique_good_2",
      "physique_good_1",
      "strong"
    ],
    "compat": {}
  },
  {
    "id": "physique_good_1",
    "label": "Able",
    "category": "congenital",
    "cost": 60,
    "group": "physique_good",
    "level": 1,
    "genetic": true,
    "physical": true,
    "opposites": [
      "physique_bad_1",
      "physique_good_3",
      "physique_bad_2",
      "physique_bad_3",
      "physique_good_2",
      "spindly"
    ],
    "compat": {}
  },
  {
    "id": "physique_good_2",
    "label": "Robust",
    "category": "congenital",
    "cost": 120,
    "group": "physique_good",
    "level": 2,
    "genetic": true,
    "physical": true,
    "opposites": [
      "physique_bad_1",
      "physique_good_3",
      "physique_bad_2",
      "physique_bad_3",
      "spindly",
      "physique_good_1"
    ],
    "compat": {}
  },
  {
    "id": "physique_good_3",
    "label": "Herculean",
    "category": "congenital",
    "cost": 180,
    "group": "physique_good",
    "level": 3,
    "genetic": true,
    "physical": true,
    "opposites": [
      "physique_bad_1",
      "physique_bad_2",
      "physique_bad_3",
      "spindly",
      "physique_good_2",
      "physique_good_1"
    ],
    "compat": {}
  },
  {
    "id": "pure_blooded",
    "label": "Pure Blooded",
    "category": "congenital",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "fecund",
    "label": "Fecund",
    "category": "congenital",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [
      "infertile"
    ],
    "compat": {}
  },
  {
    "id": "strong",
    "label": "Strong",
    "category": "congenital",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": true,
    "opposites": [
      "physique_bad_1",
      "physique_bad_2",
      "physique_bad_3"
    ],
    "compat": {}
  },
  {
    "id": "shrewd",
    "label": "Shrewd",
    "category": "congenital",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": true,
    "opposites": [
      "intellect_bad_1",
      "intellect_bad_3",
      "intellect_bad_2"
    ],
    "compat": {
      "intellect_good_1": 15,
      "intellect_good_2": 15,
      "intellect_good_3": 15,
      "shrewd": 15,
      "intellect_bad_1": -15,
      "intellect_bad_2": -15,
      "intellect_bad_3": -15,
      "dull": -15
    }
  },
  {
    "id": "clubfooted",
    "label": "Clubfooted",
    "category": "congenital",
    "cost": 0,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "hunchbacked",
    "label": "Hunchbacked",
    "category": "congenital",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "lisping",
    "label": "Lisping",
    "category": "congenital",
    "cost": -5,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "stuttering",
    "label": "Stuttering",
    "category": "congenital",
    "cost": -5,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "dwarf",
    "label": "Dwarf",
    "category": "congenital",
    "cost": 0,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [
      "giant"
    ],
    "compat": {}
  },
  {
    "id": "giant",
    "label": "Giant",
    "category": "congenital",
    "cost": 20,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [
      "dwarf"
    ],
    "compat": {}
  },
  {
    "id": "inbred",
    "label": "Inbred",
    "category": "congenital",
    "cost": -30,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "weak",
    "label": "Weak",
    "category": "congenital",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": true,
    "opposites": [
      "physique_good_2",
      "physique_good_1",
      "strong",
      "physique_good_3"
    ],
    "compat": {}
  },
  {
    "id": "dull",
    "label": "Dull",
    "category": "congenital",
    "cost": -20,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": true,
    "opposites": [
      "intellect_good_1",
      "shrewd",
      "intellect_good_2",
      "intellect_good_3"
    ],
    "compat": {
      "intellect_bad_1": 15,
      "intellect_bad_2": 15,
      "intellect_bad_3": 15,
      "dull": 15,
      "intellect_good_1": -15,
      "intellect_good_2": -15,
      "intellect_good_3": -15,
      "shrewd": -15
    }
  },
  {
    "id": "spindly",
    "label": "Spindly",
    "category": "congenital",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [
      "physique_good_2",
      "physique_good_3",
      "physique_good_1"
    ],
    "compat": {}
  },
  {
    "id": "scaly",
    "label": "Scaly",
    "category": "congenital",
    "cost": 0,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "albino",
    "label": "Albino",
    "category": "congenital",
    "cost": 0,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "wheezing",
    "label": "Wheezing",
    "category": "congenital",
    "cost": -10,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "bleeder",
    "label": "Bleeder",
    "category": "congenital",
    "cost": -20,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "infertile",
    "label": "Infertile",
    "category": "congenital",
    "cost": 0,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": true,
    "opposites": [
      "fecund"
    ],
    "compat": {}
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
    "id": "logistician",
    "label": "Logistician",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "military_engineer",
    "label": "Military Engineer",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "aggressive_attacker",
    "label": "Aggressive Attacker",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "unyielding_defender",
    "label": "Unyielding Defender",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "forder",
    "label": "Forder",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "flexible_leader",
    "label": "Flexible Leader",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "desert_warrior",
    "label": "Desert Warrior",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "jungle_stalker",
    "label": "Jungle Stalker",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "reaver",
    "label": "Reaver",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "holy_warrior",
    "label": "Holy Warrior",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "open_terrain_expert",
    "label": "Open Terrain Expert",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "rough_terrain_expert",
    "label": "Rough Terrain Expert",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "forest_fighter",
    "label": "Forest Fighter",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "cautious_leader",
    "label": "Cautious Leader",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
  {
    "id": "organizer",
    "label": "Organizer",
    "category": "commander",
    "cost": 25,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {}
  },
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

  // ── Magic: Gate Traits ────────────────────────────────────
  {
    "id": "magic_affinity",
    "label": "Magic Affinity",
    "category": "congenital",
    "cost": 125,
    "group": null,
    "level": null,
    "genetic": true,
    "physical": false,
    "opposites": [],
    "compat": {
      "shrewd": 10,
      "intellect_good_1": 5, "intellect_good_2": 10, "intellect_good_3": 15,
      "lifestyle_mystic": 15, "witch": 15, "scholar": 10,
      "talented_mage": 20
    }
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
  },

  // ── Magic Elements: Base ──────────────────────────────────
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
      "magic_affinity": 5, "talented_mage": 5,
      "elem_water": 10, "elem_magma": 10, "elem_nature": 10
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
      "magic_affinity": 5, "talented_mage": 5,
      "elem_wind": 10, "elem_magma": 10, "elem_lightning": 10
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
      "magic_affinity": 5, "talented_mage": 5,
      "elem_earth": 10, "elem_wind": 10, "elem_ice": 10, "elem_nature": 10
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
      "magic_affinity": 5, "talented_mage": 5,
      "elem_fire": 10, "elem_water": 10, "elem_ice": 10, "elem_lightning": 10
    }
  },

  // ── Magic Elements: Combination ───────────────────────────
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
      "magic_affinity": 5, "talented_mage": 10,
      "elem_water": 15, "elem_wind": 15
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
      "magic_affinity": 5, "talented_mage": 10,
      "elem_fire": 15, "elem_earth": 15
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
      "magic_affinity": 5, "talented_mage": 10,
      "elem_fire": 15, "elem_wind": 15
    }
  },
  {
    "id": "elem_nature",
    "label": "Nature Element",
    "category": "magic_elements",
    "cost": 50,
    "group": null,
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "magic_affinity": 5, "talented_mage": 10,
      "elem_earth": 15, "elem_water": 15
    }
  },

  // ── Magic Elements: Rare ──────────────────────────────────
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
      "reverent": 10, "just": 5, "zealous": 5, "oathbound": 5
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
      "cynical": 5, "sadistic": 5, "witch": 10, "calculating": 5
    }
  }
];

// ============================================================
// TRAIT_STATS — stat modifiers for all three stat categories
// Keys are trait ids. Values are objects of stat deltas covering:
//   Education:    diplomacy, martial, stewardship, intrigue, learning, prowess
//   Core Stats:   strength, constitution, intelligence, wisdom, charisma
//   General Skills: athletics, acrobatics, intimidation, animal_handling, survival,
//                   arcana, history, investigation, nature, religion,
//                   insight, medicine, perception, sleight_of_hand, stealth,
//                   deception, performance, persuasion
// Only non-zero deltas are listed per trait.
// ============================================================
const TRAIT_STATS = {
  // ── Education tiers (Education stats only) ─────────────────
  education_intrigue_1: { intrigue: 2 },
  education_intrigue_2: { intrigue: 4 },
  education_intrigue_3: { intrigue: 6 },
  education_intrigue_4: { intrigue: 8 },
  education_intrigue_5: { intrigue: 10, diplomacy: 3 },

  education_diplomacy_1: { diplomacy: 2 },
  education_diplomacy_2: { diplomacy: 4 },
  education_diplomacy_3: { diplomacy: 6 },
  education_diplomacy_4: { diplomacy: 8 },
  education_diplomacy_5: { martial: 3, diplomacy: 10 },

  education_stewardship_1: { stewardship: 2 },
  education_stewardship_2: { stewardship: 4 },
  education_stewardship_3: { stewardship: 6 },
  education_stewardship_4: { stewardship: 8 },
  education_stewardship_5: { stewardship: 10, learning: 3 },

  education_martial_1: { martial: 2 },
  education_martial_2: { martial: 4 },
  education_martial_3: { martial: 6 },
  education_martial_4: { martial: 8 },
  education_martial_5: { stewardship: 3, martial: 10 },

  education_learning_1: { learning: 2 },
  education_learning_2: { learning: 4 },
  education_learning_3: { learning: 6 },
  education_learning_4: { learning: 8 },
  education_learning_5: { intrigue: 3, learning: 10 },

  // ── Lifestyle / Role traits ─────────────────────────────────
  diplomat:           { diplomacy: 3, charisma: 1, persuasion: 3 },
  august:             { martial: 1, diplomacy: 2, charisma: 2, intimidation: 1 },
  family_first:       { diplomacy: 1, insight: 1, persuasion: 1 },
  lifestyle_reveler:  { intrigue: 1, charisma: 1, performance: 2 },
  lifestyle_blademaster: { prowess: 3, strength: 2, dexterity: 2, athletics: 3 },
  lifestyle_hunter:   { prowess: 1, dexterity: 1, survival: 2, perception: 2, stealth: 1, animal_handling: 1 },
  strategist:         { martial: 3, diplomacy: 1, intelligence: 1, investigation: 1 },
  overseer:           { stewardship: 2, martial: 2, wisdom: 1, perception: 2 },
  gallant:            { martial: 2, prowess: 4, strength: 1, dexterity: 1, athletics: 2 },
  architect:          { stewardship: 2, intelligence: 1, investigation: 1, history: 1 },
  administrator:      { stewardship: 3, diplomacy: 1, intelligence: 1 },
  avaricious:         { stewardship: 2, investigation: 1 },
  schemer:            { intrigue: 5, intelligence: 1, dexterity: 1, deception: 2, insight: 2 },
  seducer:            { intrigue: 3, charisma: 2, dexterity: 1, persuasion: 2, deception: 1 },
  torturer:           { prowess: 4, intimidation: 3 },
  whole_of_body:      { constitution: 2, strength: 1, dexterity: 1, athletics: 1, survival: 1 },
  scholar:            { learning: 3, intelligence: 2, arcana: 1, history: 2, investigation: 2 },
  theologian:         { learning: 3, wisdom: 1, religion: 3, history: 1 },
  lifestyle_mystic:   { learning: 1, intelligence: 1, arcana: 3, religion: 2 },
  lifestyle_physician:{ learning: 1, intelligence: 1, medicine: 3 },
  lifestyle_herbalist:{ intrigue: 2, learning: 2, medicine: 2, nature: 2, survival: 1 },
  lifestyle_gardener: { stewardship: 2, nature: 2, animal_handling: 1 },
  lifestyle_traveler: { diplomacy: 1, survival: 2, perception: 2, nature: 1 },
  witch:              { intrigue: 1, diplomacy: -1, learning: 1, intelligence: 1, arcana: 3, deception: 1 },
  governor:           { stewardship: 2, diplomacy: 2, charisma: 1, persuasion: 2, intimidation: 1, insight: 1 },

  // ── Personality traits ─────────────────────────────────────
  lustful:      { intrigue: 2, charisma: 1, deception: 1 },
  chaste:       { learning: 2, wisdom: 1 },
  gluttonous:   { stewardship: -2, constitution: -1, survival: -1 },
  temperate:    { stewardship: 2, constitution: 1, wisdom: 1 },
  greedy:       { diplomacy: -2, investigation: 1 },
  generous:     { diplomacy: 3, charisma: 1, persuasion: 1 },
  lazy: {
    stewardship: -1, martial: -1, intrigue: -1, diplomacy: -1, learning: -1,
    constitution: -1, athletics: -1,
  },
  diligent: {
    stewardship: 3, diplomacy: 2, learning: 3,
    intelligence: 1, wisdom: 1,
  },
  wrathful:     { martial: 3, intrigue: -1, diplomacy: -1, strength: 1, intimidation: 2 },
  calm:         { intrigue: 1, diplomacy: 1, wisdom: 2, insight: 1 },
  patient:      { learning: 2, wisdom: 2, insight: 2 },
  impatient:    { learning: -2, wisdom: -1 },
  deceitful:    { intrigue: 4, diplomacy: -2, deception: 3, insight: 1 },
  honest:       { intrigue: -4, diplomacy: 2, persuasion: 1 },
  craven:       { martial: -2, intrigue: 2, prowess: -3, strength: -1, dexterity: -1, constitution: -1 },
  brave:        { martial: 2, prowess: 3, strength: 1, dexterity: 1, constitution: 1, athletics: 1, intimidation: 1 },
  shy:          { diplomacy: -2, learning: 1, charisma: -1, persuasion: -1 },
  gregarious:   { diplomacy: 2, charisma: 1, performance: 1, persuasion: 1 },
  ambitious: {
    stewardship: 1, martial: 1, intrigue: 1, diplomacy: 1, learning: 1, prowess: 1,
    charisma: 1, persuasion: 1,
  },
  content:      { intrigue: -1, learning: 2, wisdom: 1 },
  arbitrary:    { stewardship: -2, intrigue: 3, learning: -1, wisdom: -1 },
  just:         { stewardship: 2, intrigue: -3, learning: 1, wisdom: 1, insight: 1 },
  cynical:      { intrigue: 2, learning: 2, insight: 2, deception: 1 },
  zealous:      { martial: 2, wisdom: 1, religion: 3, persuasion: 1 },
  paranoid:     { intrigue: 3, diplomacy: -1, perception: 2, insight: 1 },
  trusting:     { intrigue: -2, diplomacy: 2, insight: -1 },
  compassionate:{ intrigue: -2, diplomacy: 2, insight: 2, medicine: 1, animal_handling: 1 },
  callous:      { intrigue: 2, diplomacy: -2, insight: -1 },
  sadistic:     { intrigue: 2, prowess: 4, intimidation: 2 },
  stubborn:     { stewardship: 3, constitution: 1 },
  fickle:       { stewardship: -2, intrigue: 1, diplomacy: 2, wisdom: -1, charisma: -1 },
  eccentric:    { diplomacy: -2, learning: 2, intelligence: 1 },
  vengeful:     { intrigue: 2, diplomacy: -2, prowess: 2, intimidation: 1, insight: 1 },
  forgiving:    { intrigue: -2, diplomacy: 2, learning: 1, charisma: 1, persuasion: 1 },
  rowdy:        { martial: 1, intrigue: 1, constitution: 1, intimidation: 1, performance: 1 },
  charming:     { intrigue: 1, diplomacy: 1, charisma: 2, persuasion: 2, performance: 1 },
  curious:      { diplomacy: 1, learning: 1, intelligence: 1, investigation: 2, arcana: 1 },
  pensive:      { stewardship: 1, learning: 1, wisdom: 1, insight: 2, perception: 1 },
  bossy:        { stewardship: 1, martial: 1, intimidation: 1, charisma: -1 },
  selfless:     { diplomacy: 2, charisma: 1, insight: 1, persuasion: 1 },
  self_serving: { intrigue: 2, stewardship: 1, deception: 1 },
  excessive:    { stewardship: -2, constitution: -1, wisdom: -1 },
  perceptive:   { intrigue: 1, wisdom: 1, perception: 3, insight: 2 },
  oblivious:    { wisdom: -1, perception: -2, insight: -2 },
  stoic:        { constitution: 1, wisdom: 1, insight: 1, intimidation: 1 },
  expressive:   { diplomacy: 1, charisma: 2, performance: 2, persuasion: 1 },
  calculating:  { intrigue: 2, intelligence: 1, investigation: 1, insight: 1 },
  impulsive:    { intrigue: -1, wisdom: -1, dexterity: 1, athletics: 1 },
  worldly:      { diplomacy: 2, intrigue: 1, intelligence: 1, history: 1, persuasion: 1 },
  naive:        { intrigue: -2, insight: -1, deception: -2 },
  fateful:      { wisdom: 1, religion: 1, insight: 1 },
  defiant:      { intrigue: 1, constitution: 1, strength: 1, intimidation: 1 },
  oathbound:    { stewardship: 2, diplomacy: 1, wisdom: 1, persuasion: 1 },
  oathbreaking: { intrigue: 2, diplomacy: -2, deception: 2 },
  reverent:     { diplomacy: 1, wisdom: 1, religion: 2, insight: 1 },
  rude:         { diplomacy: -2, charisma: -1, intimidation: 1 },

  // ── Vices / lifestyle flaws ────────────────────────────────
  drunkard:     { stewardship: -2, prowess: -2, constitution: -1, charisma: -1 },
  hashishiyah:  { stewardship: -2, learning: -2, intelligence: -1 },
  rakish:       { intrigue: 1, diplomacy: -1, charisma: 1, dexterity: 1, deception: 1, performance: 1 },
  reclusive:    { stewardship: -1, diplomacy: -2, charisma: -2, stealth: 1 },
  irritable:    { martial: -1, diplomacy: -2, prowess: 2, charisma: -1, persuasion: -1 },

  // ── Health / congenital ────────────────────────────────────
  scarred:        { intimidation: 1, prowess: 1 },
  beardless_eunuch: { prowess: -4, charisma: -1 },
  blind: {
    stewardship: -2, martial: -6, intrigue: -2, prowess: -10,
    dexterity: -1, perception: -4, athletics: -2,
  },
  pure_blooded:   { constitution: 1 },
  fecund:         { constitution: 1 },
  wheezing:       { constitution: -2, dexterity: -1, athletics: -2, survival: -1 },
  bleeder:        { constitution: -1 },
  albino:         { perception: 1 },

  beauty_bad_1:   { diplomacy: -1, charisma: -1 },
  beauty_bad_2:   { diplomacy: -2, charisma: -2 },
  beauty_bad_3:   { diplomacy: -3, charisma: -3 },
  beauty_good_1:  { diplomacy: 1,  charisma: 1 },
  beauty_good_2:  { diplomacy: 2,  charisma: 2 },
  beauty_good_3:  { diplomacy: 3,  charisma: 3 },

  intellect_bad_1: {
    stewardship: -2, martial: -2, intrigue: -2, diplomacy: -2, learning: -2,
    intelligence: -2, wisdom: -1,
  },
  intellect_bad_2: {
    stewardship: -4, martial: -4, intrigue: -4, diplomacy: -4, learning: -4,
    intelligence: -4, wisdom: -2,
  },
  intellect_bad_3: {
    stewardship: -8, martial: -8, intrigue: -8, diplomacy: -8, learning: -8,
    intelligence: -6, wisdom: -3,
  },
  intellect_good_1: {
    stewardship: 1, martial: 1, intrigue: 1, diplomacy: 1, learning: 1,
    intelligence: 2, wisdom: 1,
  },
  intellect_good_2: {
    stewardship: 3, martial: 3, intrigue: 3, diplomacy: 3, learning: 3,
    intelligence: 4, wisdom: 2,
  },
  intellect_good_3: {
    stewardship: 5, martial: 5, intrigue: 5, diplomacy: 5, learning: 5,
    intelligence: 6, wisdom: 3,
  },

  physique_bad_1: { prowess: -2, strength: -1, dexterity: -1, constitution: -1, athletics: -1 },
  physique_bad_2: { prowess: -4, strength: -2, dexterity: -2, constitution: -2, athletics: -2 },
  physique_bad_3: { prowess: -6, strength: -3, dexterity: -3, constitution: -3, athletics: -3 },
  physique_good_1:{ prowess: 2,  strength: 1,  dexterity: 1,  constitution: 1,  athletics: 1  },
  physique_good_2:{ prowess: 4,  strength: 2,  dexterity: 2,  constitution: 2,  athletics: 2  },
  physique_good_3:{ prowess: 8,  strength: 4,  dexterity: 3,  constitution: 3,  athletics: 4  },

  strong:     { prowess: 4, strength: 3, athletics: 2, intimidation: 1 },
  shrewd: {
    stewardship: 2, martial: 2, intrigue: 2, diplomacy: 2, learning: 2,
    intelligence: 3, wisdom: 2, investigation: 2, insight: 2,
  },
  clubfooted: { prowess: -2, dexterity: -3, athletics: -2, acrobatics: -2, stealth: -2 },
  hunchbacked:{ prowess: -2, dexterity: -1, athletics: -1, stealth: -1 },
  lisping:    { diplomacy: -2, charisma: -1, performance: -1, persuasion: -1 },
  stuttering: { diplomacy: -2, charisma: -1, performance: -1 },
  dwarf:      { prowess: -4, strength: -1, dexterity: -1, constitution: 1, stealth: 1 },
  giant:      { prowess: 6,  strength: 3,  dexterity: -1, athletics: 2,  intimidation: 2 },
  inbred: {
    stewardship: -5, martial: -5, intrigue: -5, diplomacy: -5, learning: -5, prowess: -2,
    intelligence: -2, wisdom: -2, constitution: -1,
  },
  weak:       { prowess: -2, strength: -2, constitution: -1, athletics: -1 },
  dull: {
    stewardship: -2, martial: -2, intrigue: -2, diplomacy: -2, learning: -2,
    intelligence: -2,
  },
  spindly:    { prowess: -1, strength: -1, dexterity: 1, constitution: -1 },

  // ── Commander traits ────────────────────────────────────────
  logistician:          { stewardship: 2, intelligence: 1, investigation: 1 },
  military_engineer:    { stewardship: 1, martial: 1, intelligence: 2, investigation: 1 },
  aggressive_attacker:  { martial: 2, prowess: 2, strength: 1, dexterity: 1, athletics: 1 },
  unyielding_defender:  { martial: 2, constitution: 2, strength: 1 },
  forder:               { martial: 1, athletics: 1, survival: 1 },
  flexible_leader:      { martial: 1, diplomacy: 1, wisdom: 1, insight: 1, charisma: 1 },
  desert_warrior:       { martial: 1, prowess: 1, survival: 3, perception: 1 },
  jungle_stalker:       { martial: 1, prowess: 1, dexterity: 2, stealth: 3, survival: 2, perception: 1 },
  reaver:               { martial: 2, prowess: 2, strength: 1, intimidation: 2, athletics: 1 },
  holy_warrior:         { martial: 2, prowess: 1, strength: 1, religion: 2, intimidation: 1 },
  open_terrain_expert:  { martial: 1, dexterity: 1, athletics: 1, perception: 1 },
  rough_terrain_expert: { martial: 1, survival: 2, athletics: 1 },
  forest_fighter:       { martial: 1, dexterity: 1, stealth: 2, survival: 1, nature: 1 },
  cautious_leader:      { martial: 1, diplomacy: 1, wisdom: 1, insight: 2 },
  organizer:            { stewardship: 1, martial: 1, intelligence: 1, insight: 1 },

  // ── Magic: Gate Traits ────────────────────────────────────
  magic_affinity: { learning: 2, arcana: 3, intelligence: 1, wisdom: 1 },
  talented_mage:  { learning: 2, arcana: 3, intelligence: 2, wisdom: 1 },

  // ── Magic Elements ────────────────────────────────────────
  elem_earth:     { arcana: 2, nature: 2, constitution: 1 },
  elem_fire:      { arcana: 2, intimidation: 1, athletics: 1 },
  elem_water:     { arcana: 2, medicine: 1, wisdom: 1 },
  elem_wind:      { arcana: 2, acrobatics: 1, dexterity: 1 },
  elem_ice:       { arcana: 3, nature: 1, constitution: 1, dexterity: 1 },
  elem_magma:     { arcana: 3, intimidation: 2, strength: 1 },
  elem_lightning: { arcana: 3, dexterity: 2, intimidation: 1 },
  elem_nature:    { arcana: 3, nature: 2, medicine: 1, wisdom: 1 },
  elem_light:     { arcana: 4, religion: 2, wisdom: 2, charisma: 1 },
  elem_dark:      { arcana: 4, intrigue: 2, intimidation: 2, stealth: 1 },
};