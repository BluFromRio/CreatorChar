// ============================================================
// traits_education.js — Education trait definitions, stat modifiers, and flavor text.
// ============================================================

const EDUCATION_TRAITS = [
  // ── Intrigue ─────────────────────────────────────────────────
  // Deception, manipulation, intelligence, and dangerous secrets.
  { "id": "education_intrigue_1", "label": "Intrigue: Street-Savvy",  "category": "education", "cost": 10,  "group": "education_intrigue", "level": 1, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_intrigue_2", "label": "Intrigue: Schemer",       "category": "education", "cost": 30,  "group": "education_intrigue", "level": 2, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_intrigue_3", "label": "Intrigue: Operative",     "category": "education", "cost": 60,  "group": "education_intrigue", "level": 3, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_intrigue_4", "label": "Intrigue: Spymaster",     "category": "education", "cost": 100, "group": "education_intrigue", "level": 4, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_intrigue_5", "label": "Intrigue: Shadowmaster",  "category": "education", "cost": 150, "group": "education_intrigue", "level": 5, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── Diplomacy ────────────────────────────────────────────────
  // Negotiation, courtly manners, alliance-building, and statecraft.
  { "id": "education_diplomacy_1", "label": "Diplomacy: Courtier",       "category": "education", "cost": 10,  "group": "education_diplomacy", "level": 1, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_diplomacy_2", "label": "Diplomacy: Envoy",           "category": "education", "cost": 30,  "group": "education_diplomacy", "level": 2, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_diplomacy_3", "label": "Diplomacy: Negotiator",      "category": "education", "cost": 60,  "group": "education_diplomacy", "level": 3, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_diplomacy_4", "label": "Diplomacy: Ambassador",      "category": "education", "cost": 100, "group": "education_diplomacy", "level": 4, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_diplomacy_5", "label": "Diplomacy: Grand Diplomat",  "category": "education", "cost": 150, "group": "education_diplomacy", "level": 5, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── Stewardship ──────────────────────────────────────────────
  // Land management, coin, trade, and resource administration.
  { "id": "education_stewardship_1", "label": "Stewardship: Farmhand",         "category": "education", "cost": 10,  "group": "education_stewardship", "level": 1, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_stewardship_2", "label": "Stewardship: Local Trader",      "category": "education", "cost": 30,  "group": "education_stewardship", "level": 2, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_stewardship_3", "label": "Stewardship: Town Maven",        "category": "education", "cost": 60,  "group": "education_stewardship", "level": 3, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_stewardship_4", "label": "Stewardship: Administrator",     "category": "education", "cost": 100, "group": "education_stewardship", "level": 4, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_stewardship_5", "label": "Stewardship: Golden Sovereign",  "category": "education", "cost": 150, "group": "education_stewardship", "level": 5, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── Martial ──────────────────────────────────────────────────
  // Military training, battlefield tactics, and the strategy of war.
  { "id": "education_martial_1", "label": "Martial: Footsoldier",  "category": "education", "cost": 10,  "group": "education_martial", "level": 1, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_martial_2", "label": "Martial: Sergeant",     "category": "education", "cost": 30,  "group": "education_martial", "level": 2, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_martial_3", "label": "Martial: Tactician",    "category": "education", "cost": 60,  "group": "education_martial", "level": 3, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_martial_4", "label": "Martial: Commander",    "category": "education", "cost": 100, "group": "education_martial", "level": 4, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_martial_5", "label": "Martial: Warlord",      "category": "education", "cost": 150, "group": "education_martial", "level": 5, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── Learning ─────────────────────────────────────────────────
  // Formal scholarship spanning philosophy, theology, history, and the sciences.
  { "id": "education_learning_1", "label": "Learning: Student",    "category": "education", "cost": 10,  "group": "education_learning", "level": 1, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_learning_2", "label": "Learning: Scholar",    "category": "education", "cost": 30,  "group": "education_learning", "level": 2, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_learning_3", "label": "Learning: Sage",       "category": "education", "cost": 60,  "group": "education_learning", "level": 3, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_learning_4", "label": "Learning: Luminary",   "category": "education", "cost": 100, "group": "education_learning", "level": 4, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "education_learning_5", "label": "Learning: Grand Sage", "category": "education", "cost": 150, "group": "education_learning", "level": 5, "genetic": false, "physical": false, "opposites": [], "compat": {} },
];

const EDUCATION_STATS = {
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
  education_learning_5: { intrigue: 3, learning: 10 }
};

const EDUCATION_FLAVOR = {
  // Intrigue: deception, manipulation, intelligence-gathering
  education_intrigue_1: '{name} picked up the basics through lived experience: reading people, keeping quiet, and staying out of sight. No formal schooling, just sharp instincts honed on the street.',
  education_intrigue_2: '{name} learned the craft under a mentor or through guild work. How to gather information, lie convincingly, and move through spaces without leaving a trace.',
  education_intrigue_3: '{name} received formal training in intelligence and subterfuge, likely through a spy network, a shadowy patron, or a clandestine organization. They know how the game is played.',
  education_intrigue_4: '{name} was shaped by years of covert operations and possibly mentored by a legend in the field. Few secrets survive their attention, and fewer plots proceed without their knowledge.',
  education_intrigue_5: '{name} did not merely study intrigue. They became it. Their name, where it is known at all, is spoken only in whispers by those who understand what it means.',

  // Diplomacy: negotiation, courts, alliances, statecraft
  education_diplomacy_1: '{name} was taught the basics of courtesy, etiquette, and simple negotiation, likely through a minor noble household, a finishing school, or a brief apprenticeship at court.',
  education_diplomacy_2: '{name} received formal diplomatic training, probably through a noble house or a senior diplomat\'s apprenticeship. They handle formal negotiations with confidence.',
  education_diplomacy_3: '{name} was extensively schooled in statecraft, rhetoric, and alliance-building, possibly at an academy or through years of real diplomatic postings. Complex negotiations are their territory.',
  education_diplomacy_4: '{name} achieved mastery through a distinguished career and rigorous education. They have brokered treaties, defused crises, and shaped the political landscape with well-timed words.',
  education_diplomacy_5: '{name}\'s name carries weight in every court that matters. Their career in diplomacy did not just shape agreements. It shaped history.',

  // Stewardship: land, coin, trade, resource management
  education_stewardship_1: '{name} learned the basics through practical work: managing a household, counting stock, and working land. No formal schooling, but a solid grounding in what things cost and where they go.',
  education_stewardship_2: '{name} was trained in trade and basic economics, likely through a merchant family, a guild apprenticeship, or a small-town posting. They understand inventory, negotiation, and ledgers.',
  education_stewardship_3: '{name} received formal training in resource management, economic law, and estate administration, probably at an academy or under a seasoned steward. They run operations that work.',
  education_stewardship_4: '{name} is an expert administrator, trained at an advanced level and likely with years of practical experience managing significant holdings. Struggling estates become profitable under their watch.',
  education_stewardship_5: '{name}\'s mastery of coin, land, and administration borders on the legendary. Their methods are studied and their results are cited as examples. They do not manage wealth. They command it.',

  // Martial: military, warfare, tactics, command
  education_martial_1: '{name} completed basic military training: drills, weapon handling, and unit formation. Probably from a short stint of service or a militia enrollment. They know which end of a sword to hold.',
  education_martial_2: '{name} received more formal military education, likely through an officer\'s track, a garrison posting, or years of active campaign service. Soldiers follow their orders.',
  education_martial_3: '{name} was trained in the full art of war, covering tactics, logistics, siege, and command structure. Possibly schooled at a martial academy or under a renowned general.',
  education_martial_4: '{name} is an expert commander with advanced military education and a decorated career. Their armies move with purpose, and their campaigns are studied by those who come after.',
  education_martial_5: '{name} is a legend of the field. Their name on a battle standard is worth a hundred swords. Generals who faced them wrote about it, and those who served under them still speak of it.',

  // Learning: scholarship, philosophy, theology, medicine, sciences
  education_learning_1: '{name} received basic formal schooling through a tutor, a monastery, or a local school. They can read, write, and reason. A start, and not a small one in the world they inhabit.',
  education_learning_2: '{name} pursued more serious academic study, likely at a university, a monastery, or under a learned mentor. They have read widely and know what they do not yet know.',
  education_learning_3: '{name} is deeply educated across multiple disciplines and well-regarded in scholarly circles. They may have studied abroad, written treatises, or taught at an institution.',
  education_learning_4: '{name} is a distinguished scholar with mastery across several fields of formal study. Their mind is a library with excellent organization, and others come to them for answers.',
  education_learning_5: '{name} is a living legend of scholarship. Their name carries weight in every hall of learning. The sum of what they know humbles most who encounter it.'
};
