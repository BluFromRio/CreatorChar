// ============================================================
// traits_lifestyle.js — Lifestyle trait definitions, stat modifiers, and flavor text.
// Organized into 7 prerequisite trees: Nature, Knowledge, Realm,
// Intrigue, Social, Wealth, Body.
// ============================================================

const LIFESTYLE_TRAITS = [

  // ── NATURE TREE ──────────────────────────────────────────────
  // Root
  { "id": "ls_forager",          "label": "Forager",       "category": "lifestyle", "cost": 20, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch A: Wild
  { "id": "lifestyle_hunter",    "label": "Hunter",        "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_tracker",          "label": "Tracker",       "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_beastmaster",      "label": "Beastmaster",   "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch B: Plants
  { "id": "lifestyle_gardener",  "label": "Gardener",      "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "lifestyle_herbalist", "label": "Herbalist",     "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_plant_expert",     "label": "Plant Expert",  "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── KNOWLEDGE TREE ───────────────────────────────────────────
  // Root
  { "id": "ls_student",          "label": "Student",       "category": "lifestyle", "cost": 20, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch A: Scholar
  { "id": "scholar",             "label": "Scholar",       "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_philosopher",      "label": "Philosopher",   "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_sage",             "label": "Sage",          "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch B: Spiritual
  { "id": "theologian",          "label": "Theologian",    "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_oracle",           "label": "Oracle",        "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "lifestyle_mystic",    "label": "Mystic",        "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── REALM TREE ───────────────────────────────────────────────
  // Root
  { "id": "august",              "label": "August",        "category": "lifestyle", "cost": 20, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch A: Builder
  { "id": "architect",           "label": "Architect",     "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_steward",          "label": "Steward",       "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_master_builder",   "label": "Master Builder","category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch B: Command
  { "id": "strategist",          "label": "Strategist",    "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "overseer",            "label": "Overseer",      "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_commander_ls",     "label": "Commander",     "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── INTRIGUE TREE ────────────────────────────────────────────
  // Root
  { "id": "schemer",             "label": "Schemer",       "category": "lifestyle", "cost": 20, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch A: Espionage
  { "id": "ls_plotter",          "label": "Plotter",       "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_spy_master",       "label": "Spy Master",    "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_shadow_broker",    "label": "Shadow Broker", "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch B: Coercion
  { "id": "torturer",            "label": "Torturer",      "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_interrogator",     "label": "Interrogator",  "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_dread_lord",       "label": "Dread Lord",    "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── SOCIAL TREE ──────────────────────────────────────────────
  // Root
  { "id": "lifestyle_reveler",   "label": "Reveler",       "category": "lifestyle", "cost": 20, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch A: Seduction
  { "id": "ls_charmer",          "label": "Charmer",       "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "seducer",             "label": "Seducer",       "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_courtly_lover",    "label": "Courtly Lover", "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch B: Society
  { "id": "ls_socialite",        "label": "Socialite",     "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_master_host",      "label": "Master Host",   "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_enchanter",        "label": "Enchanter",     "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── WEALTH TREE ──────────────────────────────────────────────
  // Root
  { "id": "avaricious",          "label": "Avaricious",    "category": "lifestyle", "cost": 20, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch A: Trade
  { "id": "ls_merchant",         "label": "Merchant",      "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_entrepreneur",     "label": "Entrepreneur",  "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_caravan_master",   "label": "Caravan Master","category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch B: Finance
  { "id": "ls_financier",        "label": "Financier",     "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "administrator",       "label": "Administrator", "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_magnate",          "label": "Magnate",       "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },

  // ── BODY TREE ────────────────────────────────────────────────
  // Root
  { "id": "whole_of_body",       "label": "Whole of Body", "category": "lifestyle", "cost": 20, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch A: Fitness
  { "id": "ls_hardy",            "label": "Hardy",         "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_athletic",         "label": "Athletic",      "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_peak_physique",    "label": "Peak Physique", "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  // Branch B: Medicine
  { "id": "lifestyle_physician", "label": "Physician",     "category": "lifestyle", "cost": 35, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_surgeon",          "label": "Surgeon",       "category": "lifestyle", "cost": 55, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
  { "id": "ls_master_physician", "label": "Master Physician", "category": "lifestyle", "cost": 80, "group": null, "level": null, "genetic": false, "physical": false, "opposites": [], "compat": {} },
];

const LIFESTYLE_STATS = {
  // NATURE
  lifestyle_hunter:    { prowess: 1, dexterity: 1, survival: 2, perception: 2, stealth: 1, animal_handling: 1 },
  ls_forager:          { survival: 2, nature: 2, perception: 1 },
  ls_tracker:          { survival: 2, perception: 3, stealth: 2, nature: 1 },
  ls_beastmaster:      { animal_handling: 4, nature: 2, survival: 1 },
  ls_plant_expert:     { nature: 2, survival: 1, medicine: 1 },
  lifestyle_herbalist: { nature: 2, medicine: 2, survival: 1, learning: 1 },
  lifestyle_gardener:  { nature: 3, stewardship: 2, medicine: 1 },

  // KNOWLEDGE
  ls_student:          { learning: 1, intelligence: 1 },
  scholar:             { learning: 3, intelligence: 2, history: 2, investigation: 2, arcana: 1 },
  ls_philosopher:      { learning: 2, intelligence: 2, wisdom: 2 },
  ls_sage:             { learning: 4, intelligence: 3, wisdom: 3, arcana: 1 },
  theologian:          { learning: 3, wisdom: 1, religion: 3, history: 1 },
  ls_oracle:           { wisdom: 3, religion: 2, insight: 2 },
  lifestyle_mystic:    { learning: 1, intelligence: 1, arcana: 3, religion: 2 },

  // REALM
  august:              { martial: 1, diplomacy: 2, charisma: 2, intimidation: 1 },
  architect:           { stewardship: 2, intelligence: 1, investigation: 1, history: 1 },
  ls_steward:          { stewardship: 3, diplomacy: 1, intelligence: 1 },
  ls_master_builder:   { stewardship: 4, intelligence: 2, investigation: 1 },
  strategist:          { martial: 3, diplomacy: 1, intelligence: 1, investigation: 1 },
  overseer:            { stewardship: 2, martial: 2, wisdom: 1, perception: 2 },
  ls_commander_ls:     { martial: 4, stewardship: 2, diplomacy: 1 },

  // INTRIGUE
  schemer:             { intrigue: 3, intelligence: 1, deception: 2, insight: 2 },
  ls_plotter:          { intrigue: 2, deception: 2, insight: 1 },
  ls_spy_master:       { intrigue: 3, deception: 3, stealth: 2, perception: 1 },
  ls_shadow_broker:    { intrigue: 5, deception: 4, stealth: 3, insight: 2 },
  torturer:            { prowess: 2, intimidation: 3, insight: 1 },
  ls_interrogator:     { intimidation: 3, insight: 3, deception: 1 },
  ls_dread_lord:       { intimidation: 5, intrigue: 2, prowess: 2 },

  // SOCIAL
  lifestyle_reveler:   { charisma: 1, persuasion: 1, performance: 2 },
  ls_charmer:          { charisma: 2, persuasion: 1 },
  seducer:             { charisma: 2, persuasion: 2, deception: 1, insight: 1 },
  ls_courtly_lover:    { charisma: 4, persuasion: 3, insight: 2 },
  ls_socialite:        { charisma: 2, persuasion: 2, diplomacy: 1 },
  ls_master_host:      { charisma: 3, persuasion: 2, diplomacy: 2 },
  ls_enchanter:        { charisma: 5, persuasion: 4, diplomacy: 2, insight: 2 },

  // WEALTH
  avaricious:          { stewardship: 2, investigation: 1 },
  ls_merchant:         { stewardship: 2, persuasion: 1, investigation: 1 },
  ls_entrepreneur:     { stewardship: 3, intelligence: 1, persuasion: 1 },
  ls_caravan_master:   { stewardship: 3, diplomacy: 1, survival: 1, perception: 1 },
  ls_financier:        { stewardship: 3, intelligence: 2, investigation: 2 },
  administrator:       { stewardship: 3, diplomacy: 1, intelligence: 1 },
  ls_magnate:          { stewardship: 5, intelligence: 2, diplomacy: 2 },

  // BODY
  whole_of_body:       { constitution: 2, strength: 1, dexterity: 1, athletics: 1, survival: 1 },
  ls_hardy:            { constitution: 2, strength: 1, survival: 2 },
  ls_athletic:         { constitution: 1, strength: 2, dexterity: 2, athletics: 3 },
  ls_peak_physique:    { constitution: 2, strength: 3, dexterity: 2, athletics: 4, prowess: 1 },
  lifestyle_physician: { learning: 1, intelligence: 1, medicine: 3 },
  ls_surgeon:          { medicine: 4, intelligence: 2, dexterity: 1 },
  ls_master_physician: { medicine: 5, intelligence: 3, learning: 2 },
};

const LIFESTYLE_FLAVOR = {
  // NATURE
  lifestyle_hunter:    '{name} learned the hunt early and never forgot it. They read terrain the way others read faces, and they are rarely the one caught off guard.',
  ls_forager:          '{name} knows where to look when the larder runs dry. They can feed themselves and others from land that looks empty to everyone else.',
  ls_tracker:          '{name} can follow a trail days old through bad weather. Few things move through their territory without leaving a trace they can read.',
  ls_beastmaster:      '{name} has a way with animals that goes beyond training. Creatures trust them with an ease that unsettles people who have never seen it.',
  ls_plant_expert:     '{name} has spent years learning what grows, where, and why. They know the names of things most people never notice underfoot.',
  lifestyle_herbalist: '{name} knows which roots heal and which kill. In their work, the difference matters enormously.',
  lifestyle_gardener:  '{name} finds meaning in careful cultivation. There is philosophy in pruning, and they have had time to think about it.',

  // KNOWLEDGE
  ls_student:          '{name} is in the early stages of a serious education. They are asking the right questions, which is rarer than it sounds.',
  scholar:             '{name} has buried themselves in books and emerged wiser for it. The margins of their texts are full of questions.',
  ls_philosopher:      '{name} does not just read. They interrogate every received idea, turning it over until it either holds or breaks.',
  ls_sage:             '{name} has reached the point where other scholars seek them out. Their reputation for careful, rigorous thought is well-earned.',
  theologian:          '{name} has read the holy texts more carefully than most priests and wrestled longer with what they mean.',
  ls_oracle:           '{name} speaks of things not yet seen with a certainty that is difficult to dismiss. Whether it is deep wisdom or something stranger is a matter of perspective.',
  lifestyle_mystic:    '{name} is drawn to the occult edges of the world. Whether they find truth there is a question they have stopped asking others.',

  // REALM
  august:              '{name} carries themselves with a natural authority. Rooms adjust when they enter.',
  architect:           '{name} sees what could be built where others see empty space. They dream in stone and timber.',
  ls_steward:          '{name} has learned to keep the complex machinery of a household or estate running smoothly. They know what it costs and how to make it last.',
  ls_master_builder:   '{name} has left stone monuments in their wake. Their name is on structures that will stand long after they are gone.',
  strategist:          '{name} sees the battlefield as a puzzle. Others see chaos. They see the solution.',
  overseer:            '{name} has an eye for order. They manage what needs managing and notice what others miss.',
  ls_commander_ls:     '{name} has moved armies, set sieges, and shaped outcomes. They understand war not as a single violent moment but as an extended exercise in will.',

  // INTRIGUE
  schemer:             '{name} is always thinking three moves ahead. The game is never quite over for them.',
  ls_plotter:          '{name} has learned to build plans that survive contact with real people. Nothing they arrange happens by accident.',
  ls_spy_master:       '{name} runs information the way a merchant runs goods. They know things they are not supposed to know, and they use them carefully.',
  ls_shadow_broker:    '{name} operates at a level of covert influence most people do not know exists. They do not act directly. They arrange for others to act.',
  torturer:            '{name} has extracted secrets from the stubborn. Not a comfortable thought, but an occasionally necessary one.',
  ls_interrogator:     '{name} does not rely on pain alone. They read people, apply the right pressure, and leave with what they came for.',
  ls_dread_lord:       '{name} has built a reputation for ruthlessness that does half their work before they arrive. Their name, said in the right context, is enough to end a conversation.',

  // SOCIAL
  lifestyle_reveler:   '{name} knows how to celebrate. Life is short, and they have no intention of watching it pass quietly.',
  ls_charmer:          '{name} has a way of making people feel seen. Whether that is entirely sincere is not always the point.',
  seducer:             '{name} can make hearts turn like pages. Whether they read them carefully is another matter.',
  ls_courtly_lover:    '{name} has mastered the language of desire and devotion. They speak it fluently across half a dozen courts and leave impressions that do not fade easily.',
  ls_socialite:        '{name} is at home in any gathering. They know faces, names, connections, and the things people wish others did not know.',
  ls_master_host:      '{name} throws events that people remember for years. More importantly, they use those events to accomplish things that matter.',
  ls_enchanter:        '{name} does not just charm. They reshape the social world around them through presence, timing, and an instinct for what people need to hear.',

  // WEALTH
  avaricious:          '{name} has a gift for accumulation. Coin, land, debts: they keep meticulous track of all of it.',
  ls_merchant:         '{name} has learned the rhythms of trade. They know what things are worth, who wants them, and when to move.',
  ls_entrepreneur:     '{name} does not just buy and sell. They build, restructure, and find opportunities others do not see until it is too late to enter.',
  ls_caravan_master:   '{name} has moved goods across difficult country and arrived with accounts intact. They know every toll collector, shortcut, and bad road in their territory.',
  ls_financier:        '{name} understands money at the level of systems. They move it in ways that make it multiply, and they rarely explain exactly how.',
  administrator:       '{name} has a talent for keeping the gears of things turning. Not glamorous work, but essential.',
  ls_magnate:          '{name} has accumulated a kind of wealth that functions like power. The distinction, from where they stand, is mostly academic.',

  // BODY
  whole_of_body:       '{name} is in excellent health, the kind that seems almost unfair. Their body is a well-maintained instrument.',
  ls_hardy:            '{name} endures. Cold, hunger, injury, exhaustion: these things slow other people. They keep moving.',
  ls_athletic:         '{name} is in serious physical condition. They move with a precision and ease that is immediately visible to anyone paying attention.',
  ls_peak_physique:    '{name} has pushed their body to what most people would consider its ceiling. The ceiling, for them, is still rising.',
  lifestyle_physician: '{name} has learned to read the body\'s language: fever, pulse, pallor. They can sometimes answer it.',
  ls_surgeon:          '{name} works with blades for reasons other than war. Their hands do not shake and their knowledge runs deeper than most physicians.',
  ls_master_physician: '{name} has saved lives that should not have been saveable. Their methods are studied and their failures are rare enough to still surprise them.',
};
