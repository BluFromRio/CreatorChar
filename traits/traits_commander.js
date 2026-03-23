// ============================================================
// traits_commander.js — Commander/military trait definitions, stat modifiers, and flavor text.
// ============================================================

const COMMANDER_TRAITS = [
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
  }
];

const COMMANDER_STATS = {
  logistician: { stewardship: 2, intelligence: 1, investigation: 1 },
  military_engineer: { stewardship: 1, martial: 1, intelligence: 2, investigation: 1 },
  aggressive_attacker: { martial: 2, prowess: 2, strength: 1, dexterity: 1, athletics: 1 },
  unyielding_defender: { martial: 2, constitution: 2, strength: 1 },
  forder: { martial: 1, athletics: 1, survival: 1 },
  flexible_leader: { martial: 1, diplomacy: 1, wisdom: 1, insight: 1, charisma: 1 },
  desert_warrior: { martial: 1, prowess: 1, survival: 3, perception: 1 },
  jungle_stalker: { martial: 1, prowess: 1, dexterity: 2, stealth: 3, survival: 2, perception: 1 },
  reaver: { martial: 2, prowess: 2, strength: 1, intimidation: 2, athletics: 1 },
  holy_warrior: { martial: 2, prowess: 1, strength: 1, religion: 2, intimidation: 1 },
  open_terrain_expert: { martial: 1, dexterity: 1, athletics: 1, perception: 1 },
  rough_terrain_expert: { martial: 1, survival: 2, athletics: 1 },
  forest_fighter: { martial: 1, dexterity: 1, stealth: 2, survival: 1, nature: 1 },
  cautious_leader: { martial: 1, diplomacy: 1, wisdom: 1, insight: 2 },
  organizer: { stewardship: 1, martial: 1, intelligence: 1, insight: 1 }
};

const COMMANDER_FLAVOR = {
  logistician: '{name} ensures supplies reach the right place at the right time. The unseen backbone of any campaign.',
  military_engineer: '{name} builds siege engines and fortress plans. They see war as a problem of design.',
  aggressive_attacker: '{name} presses the fight before the enemy finds its footing. Momentum is their weapon.',
  unyielding_defender: '{name} does not break easy. They hold lines others would have abandoned.',
  forder: '{name} has learned to move armies through rivers and difficult terrain without losing half of them along the way.',
  flexible_leader: '{name} adapts to the battlefield\'s demands. A style that cannot be read is hard to counter.',
  desert_warrior: '{name} has learned to fight where others wilt. The desert shapes those who survive it.',
  jungle_stalker: '{name} knows how to vanish and strike in dense terrain. Patience and silence are their weapons.',
  reaver: '{name} fights with a brutality that leaves impressions — not the diplomatic kind.',
  holy_warrior: '{name} fights with faith as a second shield. Whether that makes them stronger or only more certain is a matter of perspective.',
  open_terrain_expert: '{name} excels on open ground — cavalry charges, pitched battles, wide engagements.',
  rough_terrain_expert: '{name} uses broken ground to their advantage. Uneven fields favor the prepared.',
  forest_fighter: '{name} knows how to use trees as cover and shadows as allies.',
  cautious_leader: '{name} does not rush. They fight only when the odds are tilted firmly in their favor.',
  organizer: '{name} ensures the army arrives fed, organized, and on time. That wins more battles than heroics.'
};
