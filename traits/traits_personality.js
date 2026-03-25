// ============================================================
// traits_personality.js — Personality trait definitions organized into
// 21 Aristotelian Golden Mean triads. Each triad has a deficiency (left),
// ideal (middle), and excess (right). Traits share group: 'triad_*' for
// mutual exclusivity and auto-switching. Cost: (p)=25, (n)=-15, (z)=0.
// ============================================================

const PERSONALITY_TRAITS = [

  // ── Triad 1: Social ────────────────────────────────────────────────
  // Left: shy | Middle: gregarious | Right: eccentric
  {
    "id": "shy",
    "label": "Shy",
    "category": "personality",
    "cost": -15,
    "group": "triad_social",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "cautious": 5,
      "anxious": 5,
      "diffident": 5,
      "pensive": 5
    }
  },
  {
    "id": "gregarious",
    "label": "Gregarious",
    "category": "personality",
    "cost": 25,
    "group": "triad_social",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "charismatic": 15,
      "brave": 5,
      "ambitious": 5,
      "diplomat": 5,
      "lifestyle_reveler": 10,
      "worldly": 5
    }
  },
  {
    "id": "eccentric",
    "label": "Eccentric",
    "category": "personality",
    "cost": 0,
    "group": "triad_social",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "scholar": 5,
      "lifestyle_mystic": 5,
      "open_minded": 10,
      "curious": 5
    }
  },

  // ── Triad 2: Courage ───────────────────────────────────────────────
  // Left: craven | Middle: brave | Right: reckless
  {
    "id": "craven",
    "label": "Craven",
    "category": "personality",
    "cost": -15,
    "group": "triad_courage",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "cautious": 5,
      "anxious": 5,
      "diffident": 5
    }
  },
  {
    "id": "brave",
    "label": "Brave",
    "category": "personality",
    "cost": 25,
    "group": "triad_courage",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "ambitious": 10,
      "diligent": 5,
      "authoritative": 10,
      "composed": 5,
      "lifestyle_blademaster": 10,
      "gallant": 10,
      "strategist": 5,
      "holy_warrior": 10,
      "rowdy": 15
    }
  },
  {
    "id": "reckless",
    "label": "Reckless",
    "category": "personality",
    "cost": -15,
    "group": "triad_courage",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "aggressive_attacker": 10,
      "reaver": 5,
      "wrathful": 5,
      "impulsive": 5
    }
  },

  // ── Triad 3: Drive ─────────────────────────────────────────────────
  // Left: lazy | Middle: ambitious | Right: greedy
  {
    "id": "lazy",
    "label": "Lazy",
    "category": "personality",
    "cost": -15,
    "group": "triad_drive",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "complacent": 10,
      "content": 5,
      "gluttonous": 5
    }
  },
  {
    "id": "ambitious",
    "label": "Ambitious",
    "category": "personality",
    "cost": 25,
    "group": "triad_drive",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "brave": 10,
      "diligent": 10,
      "calculating": 10,
      "authoritative": 5,
      "conqueror": 10,
      "grand_marshal": 5,
      "bossy": 5
    }
  },
  {
    "id": "greedy",
    "label": "Greedy",
    "category": "personality",
    "cost": -15,
    "group": "triad_drive",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "deceitful": 5,
      "manipulative": 5,
      "avaricious": 10,
      "bossy": 5
    }
  },

  // ── Triad 4: Appetite ──────────────────────────────────────────────
  // Left: gluttonous | Middle: content | Right: insensible
  {
    "id": "gluttonous",
    "label": "Gluttonous",
    "category": "personality",
    "cost": -15,
    "group": "triad_appetite",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "lazy": 5,
      "lifestyle_reveler": 10
    }
  },
  {
    "id": "content",
    "label": "Content",
    "category": "personality",
    "cost": 0,
    "group": "triad_desire",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "humble": 5,
      "patient": 5,
      "composed": 5,
      "forgiving": 5,
      "whole_of_body": 5
    }
  },
  {
    "id": "insensible",
    "label": "Insensible",
    "category": "personality",
    "cost": -15,
    "group": "triad_appetite",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "stoic": 5,
      "rigid": 5,
      "winter_soldier": 5
    }
  },

  // ── Triad 5: Self-Worth ────────────────────────────────────────────
  // Left: diffident | Middle: humble | Right: arrogant
  {
    "id": "diffident",
    "label": "Diffident",
    "category": "personality",
    "cost": -15,
    "group": "triad_self_worth",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "shy": 5,
      "anxious": 10,
      "cautious": 5
    }
  },
  {
    "id": "humble",
    "label": "Humble",
    "category": "personality",
    "cost": 25,
    "group": "triad_self_worth",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "compassionate": 10,
      "honest": 10,
      "just": 5,
      "forgiving": 5,
      "content": 5,
      "well_cared_for": 5
    }
  },
  {
    "id": "arrogant",
    "label": "Arrogant",
    "category": "personality",
    "cost": -15,
    "group": "triad_self_worth",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "ambitious": 5,
      "authoritative": 5,
      "spoiled": 10
    }
  },

  // ── Triad 6: Decision ──────────────────────────────────────────────
  // Left: indecisive | Middle: calculating | Right: impulsive
  {
    "id": "indecisive",
    "label": "Indecisive",
    "category": "personality",
    "cost": -15,
    "group": "triad_decision",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "anxious": 10,
      "paranoid": 5,
      "push_over": 5
    }
  },
  {
    "id": "calculating",
    "label": "Calculating",
    "category": "personality",
    "cost": 25,
    "group": "triad_decision",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "ambitious": 10,
      "cautious": 5,
      "schemer": 10,
      "shadow_general": 5,
      "strategist": 10,
      "objective": 5,
      "cynical": 5
    }
  },
  {
    "id": "impulsive",
    "label": "Impulsive",
    "category": "personality",
    "cost": -15,
    "group": "triad_decision",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "reckless": 10,
      "wrathful": 5,
      "aggressive_attacker": 5
    }
  },

  // ── Triad 7: Desire ────────────────────────────────────────────────
  // Left: chaste | Middle: temperate | Right: lustful
  {
    "id": "chaste",
    "label": "Chaste",
    "category": "personality",
    "cost": 0,
    "group": "triad_desire",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "just": 5,
      "composed": 5,
      "theologian": 5,
      "holy_warrior": 5
    }
  },
  {
    "id": "temperate",
    "label": "Temperate",
    "category": "personality",
    "cost": 25,
    "group": "triad_appetite",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "calm": 10,
      "patient": 5,
      "whole_of_body": 5,
      "content": 5,
      "diligent": 5
    }
  },
  {
    "id": "lustful",
    "label": "Lustful",
    "category": "personality",
    "cost": 0,
    "group": "triad_desire",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "gregarious": 5,
      "lifestyle_reveler": 10,
      "seducer": 10
    }
  },

  // ── Triad 8: Composure ─────────────────────────────────────────────
  // Left: oblivious | Middle: calm | Right: anxious
  {
    "id": "oblivious",
    "label": "Oblivious",
    "category": "personality",
    "cost": -15,
    "group": "triad_composure",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "trusting": 5,
      "careless": 5
    }
  },
  {
    "id": "calm",
    "label": "Calm",
    "category": "personality",
    "cost": 25,
    "group": "triad_composure",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "patient": 15,
      "temperate": 5,
      "composed": 10,
      "cautious": 5,
      "objective": 5
    }
  },
  {
    "id": "anxious",
    "label": "Anxious",
    "category": "personality",
    "cost": -15,
    "group": "triad_composure",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "paranoid": 10,
      "indecisive": 5,
      "cautious": 5,
      "diffident": 5
    }
  },

  // ── Triad 9: Trust ─────────────────────────────────────────────────
  // Left: paranoid | Middle: cautious | Right: trusting
  {
    "id": "paranoid",
    "label": "Paranoid",
    "category": "personality",
    "cost": -15,
    "group": "triad_trust",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "anxious": 10,
      "cynical": 5,
      "shadow_general": 5,
      "schemer": 5,
      "neglected": 5
    }
  },
  {
    "id": "cautious",
    "label": "Cautious",
    "category": "personality",
    "cost": 25,
    "group": "triad_trust",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "calculating": 5,
      "patient": 10,
      "calm": 5,
      "diligent": 5,
      "cautious_leader": 15
    }
  },
  {
    "id": "trusting",
    "label": "Trusting",
    "category": "personality",
    "cost": 25,
    "group": "triad_trust",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "compassionate": 10,
      "forgiving": 10,
      "gregarious": 5,
      "honest": 5,
      "well_cared_for": 10
    }
  },

  // ── Triad 10: Work Ethic ───────────────────────────────────────────
  // Left: careless | Middle: diligent | Right: perfectionist
  {
    "id": "careless",
    "label": "Careless",
    "category": "personality",
    "cost": -15,
    "group": "triad_work_ethic",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "lazy": 5,
      "reckless": 5,
      "oblivious": 5
    }
  },
  {
    "id": "diligent",
    "label": "Diligent",
    "category": "personality",
    "cost": 25,
    "group": "triad_work_ethic",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "ambitious": 10,
      "patient": 5,
      "brave": 5,
      "whole_of_body": 5,
      "scholar": 5,
      "theologian": 5,
      "pensive": 5,
      "architect": 5,
      "administrator": 5
    }
  },
  {
    "id": "perfectionist",
    "label": "Perfectionist",
    "category": "personality",
    "cost": 0,
    "group": "triad_work_ethic",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "scholar": 5,
      "diligent": 5,
      "rigid": 5
    }
  },

  // ── Triad 11: Patience ─────────────────────────────────────────────
  // Left: impatient | Middle: patient | Right: complacent
  {
    "id": "impatient",
    "label": "Impatient",
    "category": "personality",
    "cost": -15,
    "group": "triad_patience",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "reckless": 5,
      "impulsive": 5,
      "wrathful": 5
    }
  },
  {
    "id": "patient",
    "label": "Patient",
    "category": "personality",
    "cost": 25,
    "group": "triad_patience",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "calm": 15,
      "cautious": 10,
      "diligent": 5,
      "composed": 5,
      "temperate": 5
    }
  },
  {
    "id": "complacent",
    "label": "Complacent",
    "category": "personality",
    "cost": 0,
    "group": "triad_patience",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "lazy": 10,
      "content": 5
    }
  },

  // ── Triad 12: Honesty ──────────────────────────────────────────────
  // Left: deceitful | Middle: honest | Right: easily_influenced
  {
    "id": "deceitful",
    "label": "Deceitful",
    "category": "personality",
    "cost": 25,
    "group": "triad_honesty",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "manipulative": 10,
      "calculating": 5,
      "schemer": 10,
      "seducer": 5,
      "shadow_general": 5,
      "infiltration_specialist": 5
    }
  },
  {
    "id": "honest",
    "label": "Honest",
    "category": "personality",
    "cost": 25,
    "group": "triad_honesty",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "brave": 5,
      "just": 15,
      "humble": 10,
      "compassionate": 5,
      "authoritative": 5
    }
  },
  {
    "id": "easily_influenced",
    "label": "Easily Influenced",
    "category": "personality",
    "cost": -15,
    "group": "triad_honesty",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "trusting": 5,
      "push_over": 10,
      "oblivious": 5
    }
  },

  // ── Triad 13: Presence ─────────────────────────────────────────────
  // Left: awkward | Middle: charismatic | Right: manipulative
  {
    "id": "awkward",
    "label": "Awkward",
    "category": "personality",
    "cost": -15,
    "group": "triad_presence",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "shy": 5,
      "scholar": 5,
      "pensive": 5
    }
  },
  {
    "id": "charismatic",
    "label": "Charismatic",
    "category": "personality",
    "cost": 25,
    "group": "triad_presence",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "gregarious": 15,
      "brave": 5,
      "authoritative": 10,
      "diplomat": 10,
      "august": 5,
      "grand_marshal": 5,
      "charming": 10
    }
  },
  {
    "id": "manipulative",
    "label": "Manipulative",
    "category": "personality",
    "cost": 25,
    "group": "triad_presence",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "deceitful": 10,
      "calculating": 5,
      "schemer": 15,
      "seducer": 10
    }
  },

  // ── Triad 14: Empathy ──────────────────────────────────────────────
  // Left: callous | Middle: compassionate | Right: bleeding_heart
  {
    "id": "callous",
    "label": "Callous",
    "category": "personality",
    "cost": 25,
    "group": "triad_empathy",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "calculating": 5,
      "authoritative": 5,
      "cynical": 5,
      "torturer": 10
    }
  },
  {
    "id": "compassionate",
    "label": "Compassionate",
    "category": "personality",
    "cost": 25,
    "group": "triad_empathy",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "humble": 10,
      "honest": 5,
      "just": 5,
      "forgiving": 10,
      "trusting": 10,
      "savior": 15,
      "well_cared_for": 5,
      "elem_healing": 10
    }
  },
  {
    "id": "bleeding_heart",
    "label": "Bleeding Heart",
    "category": "personality",
    "cost": 25,
    "group": "triad_empathy",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "forgiving": 5,
      "trusting": 5,
      "push_over": 10,
      "savior": 10
    }
  },

  // ── Triad 15: Authority ────────────────────────────────────────────
  // Left: push_over | Middle: authoritative | Right: wrathful
  {
    "id": "push_over",
    "label": "Push Over",
    "category": "personality",
    "cost": -15,
    "group": "triad_authority",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "bleeding_heart": 10,
      "easily_influenced": 10,
      "trusting": 5
    }
  },
  {
    "id": "authoritative",
    "label": "Authoritative",
    "category": "personality",
    "cost": 25,
    "group": "triad_authority",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "brave": 10,
      "ambitious": 5,
      "charismatic": 10,
      "august": 10,
      "conqueror": 10,
      "grand_marshal": 10,
      "iron_bulwark": 5
    }
  },
  {
    "id": "wrathful",
    "label": "Wrathful",
    "category": "personality",
    "cost": -15,
    "group": "triad_authority",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "vengeful": 10,
      "stubborn": 5,
      "reckless": 5,
      "reaver": 10
    }
  },

  // ── Triad 16: Experience ───────────────────────────────────────────
  // Left: naive | Middle: experienced | Right: worldly
  {
    "id": "naive",
    "label": "Naive",
    "category": "personality",
    "cost": -15,
    "group": "triad_experience",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "trusting": 5,
      "oblivious": 5,
      "easily_influenced": 5
    }
  },
  {
    "id": "experienced",
    "label": "Experienced",
    "category": "personality",
    "cost": 25,
    "group": "triad_experience",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "calculating": 5,
      "cautious": 5,
      "scholar": 5,
      "strategist": 5,
      "overseer": 5,
      "logistician": 5
    }
  },
  {
    "id": "worldly",
    "label": "Worldly",
    "category": "personality",
    "cost": 25,
    "group": "triad_experience",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "open_minded": 10,
      "diplomat": 10,
      "lifestyle_traveler": 15,
      "gregarious": 5
    }
  },

  // ── Triad 17: Faith ────────────────────────────────────────────────
  // Left: cynical | Middle: zealous | Right: fanatic
  {
    "id": "cynical",
    "label": "Cynical",
    "category": "personality",
    "cost": 25,
    "group": "triad_faith",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "calculating": 5,
      "objective": 5,
      "paranoid": 5,
      "elem_dark": 5,
      "schemer": 5
    }
  },
  {
    "id": "zealous",
    "label": "Zealous",
    "category": "personality",
    "cost": 25,
    "group": "triad_faith",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "brave": 5,
      "authoritative": 5,
      "theologian": 10,
      "holy_warrior": 15,
      "elem_light": 5
    }
  },
  {
    "id": "fanatic",
    "label": "Fanatic",
    "category": "personality",
    "cost": 25,
    "group": "triad_faith",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "stubborn": 5,
      "authoritative": 5,
      "theologian": 5,
      "holy_warrior": 10,
      "iron_bulwark": 5
    }
  },

  // ── Triad 18: Flexibility ──────────────────────────────────────────
  // Left: fickle | Middle: open_minded | Right: stubborn
  {
    "id": "fickle",
    "label": "Fickle",
    "category": "personality",
    "cost": 25,
    "group": "triad_flexibility",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "impulsive": 5,
      "charismatic": 5,
      "lifestyle_reveler": 5
    }
  },
  {
    "id": "open_minded",
    "label": "Open Minded",
    "category": "personality",
    "cost": 25,
    "group": "triad_flexibility",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "worldly": 10,
      "scholar": 5,
      "diplomat": 5,
      "flexible_leader": 10,
      "lifestyle_traveler": 5
    }
  },
  {
    "id": "stubborn",
    "label": "Stubborn",
    "category": "personality",
    "cost": 25,
    "group": "triad_flexibility",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "brave": 5,
      "diligent": 5,
      "unyielding_defender": 10,
      "iron_bulwark": 5
    }
  },

  // ── Triad 19: Justice ──────────────────────────────────────────────
  // Left: arbitrary | Middle: just | Right: rigid
  {
    "id": "arbitrary",
    "label": "Arbitrary",
    "category": "personality",
    "cost": 0,
    "group": "triad_justice",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "impulsive": 5,
      "cynical": 5
    }
  },
  {
    "id": "just",
    "label": "Just",
    "category": "personality",
    "cost": 25,
    "group": "triad_justice",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "honest": 15,
      "humble": 5,
      "compassionate": 5,
      "brave": 5,
      "authoritative": 5,
      "objective": 10,
      "elem_light": 5
    }
  },
  {
    "id": "rigid",
    "label": "Rigid",
    "category": "personality",
    "cost": -15,
    "group": "triad_justice",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "stubborn": 5,
      "perfectionist": 5,
      "diligent": 5,
      "fanatic": 5
    }
  },

  // ── Triad 20: Expression ───────────────────────────────────────────
  // Left: stoic | Middle: composed | Right: expressive
  {
    "id": "stoic",
    "label": "Stoic",
    "category": "personality",
    "cost": 25,
    "group": "triad_expression",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "brave": 5,
      "patient": 5,
      "calculating": 5,
      "insensible": 5
    }
  },
  {
    "id": "composed",
    "label": "Composed",
    "category": "personality",
    "cost": 25,
    "group": "triad_expression",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "calm": 10,
      "patient": 5,
      "authoritative": 5,
      "cautious": 5,
      "diplomat": 5,
      "shadow_general": 5
    }
  },
  {
    "id": "expressive",
    "label": "Expressive",
    "category": "personality",
    "cost": 25,
    "group": "triad_expression",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "charismatic": 5,
      "gregarious": 5,
      "brave": 5,
      "lifestyle_reveler": 5,
      "performance": 5
    }
  },

  // ── Triad 21: Vengeance ────────────────────────────────────────────
  // Left: vengeful | Middle: objective | Right: forgiving
  {
    "id": "vengeful",
    "label": "Vengeful",
    "category": "personality",
    "cost": -15,
    "group": "triad_vengeance",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "wrathful": 10,
      "stubborn": 5,
      "cynical": 5,
      "reaver": 5
    }
  },
  {
    "id": "objective",
    "label": "Objective",
    "category": "personality",
    "cost": 25,
    "group": "triad_vengeance",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "calculating": 5,
      "just": 10,
      "calm": 5,
      "scholar": 5,
      "strategist": 5
    }
  },
  {
    "id": "forgiving",
    "label": "Forgiving",
    "category": "personality",
    "cost": 25,
    "group": "triad_vengeance",
    "level": null,
    "genetic": false,
    "physical": false,
    "opposites": [],
    "compat": {
      "compassionate": 10,
      "humble": 5,
      "trusting": 10,
      "content": 5,
      "patient": 5
    }
  },
];

const PERSONALITY_STATS = {
  // Triad 1: Social
  shy:               { charisma: -1, diplomacy: -1, persuasion: -1 },
  gregarious:        { charisma: 2, diplomacy: 1, persuasion: 1, performance: 1 },
  eccentric:         { charisma: -1, insight: 1, intelligence: 1, arcana: 1 },

  // Triad 2: Courage
  craven:            { martial: -2, prowess: -1, athletics: -1, intimidation: -1 },
  brave:             { martial: 1, prowess: 1, athletics: 1, intimidation: 1 },
  reckless:          { martial: 1, prowess: 1, wisdom: -2, perception: -1 },

  // Triad 3: Drive
  lazy:              { stewardship: -1, martial: -1, constitution: -1, athletics: -1 },
  ambitious:         { stewardship: 1, martial: 1, intelligence: 1, charisma: 1 },
  greedy:            { stewardship: 1, intrigue: 1, diplomacy: -1 },

  // Triad 4: Appetite
  gluttonous:        { constitution: 1, charisma: -1, athletics: -1 },
  content:           { wisdom: 1, charisma: 1, constitution: 1 },
  insensible:        { constitution: -1, charisma: -1, performance: -1 },

  // Triad 5: Self-Worth
  diffident:         { charisma: -1, diplomacy: -1, persuasion: -1, intimidation: -1 },
  humble:            { wisdom: 1, diplomacy: 1, insight: 1, charisma: 1 },
  arrogant:          { charisma: 1, intimidation: 1, diplomacy: -1, wisdom: -1 },

  // Triad 6: Decision
  indecisive:        { wisdom: -1, intelligence: -1, martial: -1 },
  calculating:       { intelligence: 2, insight: 2, wisdom: 1, investigation: 1 },
  impulsive:         { athletics: 1, dexterity: 1, wisdom: -2, insight: -1 },

  // Triad 7: Desire
  chaste:            { wisdom: 1, religion: 1, constitution: 1 },
  temperate:         { wisdom: 1, constitution: 2, charisma: 1 },
  lustful:           { charisma: 1, diplomacy: 1, constitution: -1 },

  // Triad 8: Composure
  oblivious:         { perception: -2, insight: -2 },
  calm:              { wisdom: 1, charisma: 1, insight: 1, diplomacy: 1 },
  anxious:           { perception: 1, insight: 1, wisdom: -1, charisma: -1 },

  // Triad 9: Trust
  paranoid:          { perception: 2, intrigue: 1, insight: 1, diplomacy: -2, charisma: -1 },
  cautious:          { wisdom: 2, insight: 2, perception: 1 },
  trusting:          { charisma: 1, diplomacy: 1, persuasion: 1, insight: -1 },

  // Triad 10: Work Ethic
  careless:          { stewardship: -1, intelligence: -1, perception: -1 },
  diligent:          { stewardship: 1, learning: 1, intelligence: 1, investigation: 1 },
  perfectionist:     { learning: 1, intelligence: 1, investigation: 1 },

  // Triad 11: Patience
  impatient:         { martial: 1, dexterity: 1, wisdom: -1, insight: -1 },
  patient:           { wisdom: 2, insight: 1, intelligence: 1 },
  complacent:        { constitution: -1, martial: -1, wisdom: -1 },

  // Triad 12: Honesty
  deceitful:         { intrigue: 2, deception: 2, charisma: 1 },
  honest:            { charisma: 1, diplomacy: 1, persuasion: 1, wisdom: 1 },
  easily_influenced: { charisma: -1, wisdom: -1, insight: -1 },

  // Triad 13: Presence
  awkward:           { charisma: -2, diplomacy: -1, persuasion: -1 },
  charismatic:       { charisma: 3, diplomacy: 1, persuasion: 2, performance: 1 },
  manipulative:      { intrigue: 2, deception: 2, insight: 2, charisma: 1 },

  // Triad 14: Empathy
  callous:           { intrigue: 1, martial: 1, intimidation: 1, charisma: -1 },
  compassionate:     { medicine: 1, diplomacy: 1, charisma: 1, wisdom: 1, persuasion: 1 },
  bleeding_heart:    { medicine: 1, diplomacy: 1, wisdom: -1, insight: 1 },

  // Triad 15: Authority
  push_over:         { martial: -1, diplomacy: -1, intimidation: -2, charisma: -1 },
  authoritative:     { martial: 1, intimidation: 2, charisma: 1, diplomacy: 1 },
  wrathful:          { intimidation: 2, martial: 1, wisdom: -1, diplomacy: -2 },

  // Triad 16: Experience
  naive:             { insight: -1, perception: -1, intelligence: -1 },
  experienced:       { wisdom: 2, insight: 2, history: 1, intelligence: 1 },
  worldly:           { wisdom: 1, diplomacy: 1, insight: 1, survival: 1, history: 1 },

  // Triad 17: Faith
  cynical:           { intrigue: 1, intelligence: 1, insight: 1, wisdom: 1 },
  zealous:           { religion: 2, martial: 1, intimidation: 1, wisdom: 1 },
  fanatic:           { religion: 3, intimidation: 2, martial: 1, wisdom: -1 },

  // Triad 18: Flexibility
  fickle:            { dexterity: 1, charisma: 1, wisdom: -1, intelligence: -1 },
  open_minded:       { diplomacy: 1, insight: 1, wisdom: 1, learning: 1 },
  stubborn:          { constitution: 1, martial: 1, wisdom: 1, diplomacy: -1 },

  // Triad 19: Justice
  arbitrary:         { intelligence: 1 },
  just:              { wisdom: 1, diplomacy: 1, insight: 1, charisma: 1 },
  rigid:             { stewardship: 1, martial: 1, intelligence: 1, diplomacy: -1, wisdom: -1 },

  // Triad 20: Expression
  stoic:             { constitution: 1, wisdom: 1, insight: 1, charisma: -1 },
  composed:          { wisdom: 1, charisma: 1, diplomacy: 1, insight: 1 },
  expressive:        { charisma: 2, performance: 2, persuasion: 1 },

  // Triad 21: Vengeance
  vengeful:          { intrigue: 1, martial: 1, wisdom: -1, diplomacy: -1 },
  objective:         { wisdom: 2, intelligence: 1, insight: 1, investigation: 1 },
  forgiving:         { charisma: 1, diplomacy: 1, wisdom: 1 },
};

const PERSONALITY_FLAVOR = {
  // Triad 1: Social
  shy:               '{name} does not seek out company. They find crowds loud and conversation costly, and they prefer it that way.',
  gregarious:        '{name} draws people in without effort. Wherever they go, a gathering tends to follow.',
  eccentric:         '{name} operates by rules no one else quite understands. Somehow it works.',

  // Triad 2: Courage
  craven:            '{name} avoids danger with the same commitment others pursue it. Survival is its own strategy.',
  brave:             '{name} does not hesitate when hesitation would cost them. Fear is a feeling they have learned to move through.',
  reckless:          '{name} acts before the thought is finished. What looks like courage is often just a shorter fuse.',

  // Triad 3: Drive
  lazy:              '{name} finds effort exhausting in principle. They prefer to let things arrive on their own time.',
  ambitious:         '{name} does not sit still. There is always a higher position, a better outcome, a further reach. They intend to get there.',
  greedy:            '{name} wants more. More coin, more land, more of whatever is on the table. Enough is a word they use for other people.',

  // Triad 4: Appetite
  gluttonous:        '{name} has a considerable appetite. For food, comfort, pleasure, and all the things worth having in abundance.',
  content:           '{name} is not driven by lust nor are they devoid of passion, {name} is simply...content.',
  insensible:        '{name} has no real interest in pleasure or comfort. They eat to function and rest to continue. Others find this efficient, or unsettling, depending on the meal.',

  // Triad 5: Self-Worth
  diffident:         '{name} does not trust their own judgment. They second-guess what is already decided and hesitate over what is not.',
  humble:            '{name} does not carry themselves as though they are owed anything. That clarity tends to earn them more than arrogance would.',
  arrogant:          '{name} has a high opinion of their own abilities. Whether it is earned is a separate question from whether they hold it.',

  // Triad 6: Decision
  indecisive:        '{name} weighs every option until the moment for choosing has passed. The problem is not the thinking, it is committing to the answer.',
  calculating:       '{name} does not act on feeling. They measure, weigh, and choose the path most likely to succeed. Sentiment is a variable they account for and set aside.',
  impulsive:         '{name} does not wait for the full picture. They move on instinct and sort out the rest afterward.',

  // Triad 7: Desire
  chaste:            '{name} holds desire at arm\'s length. Whether this is discipline or disposition is a private matter.',
  temperate:         '{name} is not ruled by appetite. They enjoy what is good and set aside what is excessive. This makes them reliable in ways that matter.',
  lustful:           '{name} has a pronounced appetite for pleasure. They do not pretend otherwise.',

  // Triad 8: Composure
  oblivious:         '{name} misses things. Not from stupidity, but from a persistent inattention to what is right in front of them.',
  calm:              '{name} does not rattle easily. Whatever is happening, they keep their footing and think clearly. People notice this.',
  anxious:           '{name} is never quite at rest. There is always something that could go wrong, and they are usually thinking about it.',

  // Triad 9: Trust
  paranoid:          '{name} trusts no one on instinct. Every offer is a trap until proven otherwise. This has kept them safe and made them exhausting to be around.',
  cautious:          '{name} does not move without knowing the ground. They take their time, ask their questions, and do not mistake patience for cowardice.',
  trusting:          '{name} extends good faith readily and withdraws it slowly. They have been wrong before and will be wrong again. They accept this.',

  // Triad 10: Work Ethic
  careless:          '{name} is not thorough. Details escape them, work is left half-finished, and they are surprised by the consequences.',
  diligent:          '{name} finishes what they start. Every task, large or small, receives the same steady application.',
  perfectionist:     '{name} will not submit work they are not proud of. At some point this becomes obstruction, and they know it.',

  // Triad 11: Patience
  impatient:         '{name} does not wait well. Delay is a provocation, and they respond to it like one.',
  patient:           '{name} can hold still while the situation resolves itself. They have learned that most things do, given time.',
  complacent:        '{name} is not driven. Things are good enough. Change requires effort they are not particularly interested in spending.',

  // Triad 12: Honesty
  deceitful:         '{name} tells people what serves them. Truth is one option among many, and rarely the most useful one.',
  honest:            '{name} says what they mean. This earns them trust in some quarters and enemies in others. They consider both acceptable.',
  easily_influenced: '{name} is persuadable. Put the right argument in front of them and they will be convinced by it. Put the wrong one in front of them and they will be convinced by that too.',

  // Triad 13: Presence
  awkward:           '{name} never quite finds the rhythm of a room. Conversations stall, silences stretch, and they are usually the reason.',
  charismatic:       '{name} has a presence that rooms adjust to. They do not need to demand attention. It arrives on its own.',
  manipulative:      '{name} knows which words move people and is not above using them. Whether this is skill or vice depends largely on the outcome.',

  // Triad 14: Empathy
  callous:           '{name} does not linger over other people\'s difficulties. This is not cruelty. It is efficiency, or so they say.',
  compassionate:     '{name} takes other people\'s suffering seriously. It lands on them, and they do not look away from it.',
  bleeding_heart:    '{name} feels everything. Other people\'s pain lands on them as though it were their own, and it does not let go easily.',

  // Triad 15: Authority
  push_over:         '{name} has difficulty holding a line. What starts as accommodation becomes something others rely on and then exploit.',
  authoritative:     '{name} gives direction and people follow. Not through fear, but through a certainty that makes compliance feel natural.',
  wrathful:          '{name} does not absorb insults quietly. When the line is crossed, the response is immediate and rarely proportionate.',

  // Triad 16: Experience
  naive:             '{name} takes things at face value. The world is newer to them than it looks, and that gap tends to cost them.',
  experienced:       '{name} has been around long enough to know how things usually go. That knowledge is not glamorous, but it is reliable.',
  worldly:           '{name} has been places and seen how things differ from one corner of the world to the next. This changes how they read a room.',

  // Triad 17: Faith
  cynical:           '{name} does not believe in much. Not out of despair, but because the evidence has been consistently poor.',
  zealous:           '{name} holds their faith with conviction. It shapes what they do and how they justify it.',
  fanatic:           '{name} does not hold faith loosely. There is no gap between doctrine and self, and they do not see why there should be.',

  // Triad 18: Flexibility
  fickle:            '{name} changes direction easily. Commitments are provisional. Opinions shift. What seemed certain yesterday is already up for review.',
  open_minded:       '{name} does not start with a conclusion. They listen, adjust, and arrive somewhere different than they began. This is rarer than it sounds.',
  stubborn:          '{name} does not change course easily. Once decided, they hold the position, regardless of what the room says.',

  // Triad 19: Justice
  arbitrary:         '{name} applies rules when convenient and sets them aside when not. There is a logic to it, but it is entirely their own.',
  just:              '{name} cares about fairness in ways that are inconvenient and non-negotiable. They apply the same standard to themselves.',
  rigid:             '{name} believes in doing things the right way. The right way is the one they know. Variation is not improvement, it is deviation.',

  // Triad 20: Expression
  stoic:             '{name} does not show what they feel. Whatever is happening inside, the surface stays steady. This is a choice, and a costly one.',
  composed:          '{name} does not rattle outwardly. The interior may be loud, but the exterior is controlled and readable only to those paying close attention.',
  expressive:        '{name} does not conceal much. Their face, their voice, their posture: all of it is visible to anyone in the room.',

  // Triad 21: Vengeance
  vengeful:          '{name} remembers every slight and waits. The ledger is always open, and eventually, debts get paid.',
  objective:         '{name} does not let what they want cloud what is true. They follow the evidence, even when it leads somewhere uncomfortable.',
  forgiving:         '{name} does not carry grievances. This is not weakness. It is a deliberate choice about what is worth carrying.',
};
