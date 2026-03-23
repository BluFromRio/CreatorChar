// ============================================================
// config.js — Global configuration, race data, appearance data,
// and category metadata. Edit here to tune balance and options.
// ============================================================

'use strict';

// ── Point budget and per-category limits ─────────────────────
const CONFIG = {
  POINT_BUDGET: 600,
  // Optional per-category limits (null = unlimited)
  CAT_LIMITS: {
    personality: 5,
    education: 1,
    lifestyle: 4,
    congenital: null,
    health: 3,
    commander: 3,
    childhood: 2,
    fame: 3,
    magic_elements: null,     // enforced by isBlockedByMagicRules
    other: null,
  },
  // Negative cost refund cap: null = unlimited
  NEG_REFUND_CAP: null,
};

// ── Race base stats ───────────────────────────────────────────
const RACE_BASES = {
  human: {
    diplomacy: 5, martial: 5, stewardship: 5, intrigue: 5, learning: 5, prowess: 5,
    strength: 3, dexterity: 3, constitution: 3, intelligence: 3, wisdom: 3, charisma: 3,
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 0,
    arcana: 0, history: 0, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 0, sleight_of_hand: 0, stealth: 0,
    deception: 0, performance: 0, persuasion: 0,
  },
  elf: {
    diplomacy: 6, martial: 4, stewardship: 3, intrigue: 6, learning: 7, prowess: 4,
    strength: 1, dexterity: 5, constitution: 2, intelligence: 5, wisdom: 4, charisma: 4,
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 0,
    arcana: 0, history: 0, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 1, sleight_of_hand: 0, stealth: 1,
    deception: 0, performance: 0, persuasion: 0,
  },
  dwarf: {
    diplomacy: 4, martial: 6, stewardship: 7, intrigue: 3, learning: 4, prowess: 6,
    strength: 5, dexterity: 2, constitution: 6, intelligence: 2, wisdom: 3, charisma: 1,
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 0,
    arcana: 0, history: 1, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 0, sleight_of_hand: 0, stealth: 0,
    deception: 0, performance: 0, persuasion: 0,
  },
  half_elf: {
    diplomacy: 5, martial: 5, stewardship: 4, intrigue: 5, learning: 6, prowess: 5,
    strength: 2, dexterity: 3, constitution: 2, intelligence: 3, wisdom: 3, charisma: 4,
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 0,
    arcana: 0, history: 0, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 0, sleight_of_hand: 0, stealth: 0,
    deception: 0, performance: 0, persuasion: 1,
  },
  half_dwarf: {
    diplomacy: 5, martial: 6, stewardship: 5, intrigue: 4, learning: 5, prowess: 5,
    strength: 4, dexterity: 2, constitution: 4, intelligence: 2, wisdom: 3, charisma: 2,
    athletics: 0, acrobatics: 0, intimidation: 0,
    animal_handling: 0, survival: 1,
    arcana: 0, history: 0, investigation: 0, nature: 0, religion: 0,
    insight: 0, medicine: 0, perception: 0, sleight_of_hand: 0, stealth: 0,
    deception: 0, performance: 0, persuasion: 0,
  },
};

const RACE_LABELS = {
  human:      'Human',
  elf:        'Elf',
  dwarf:      'Dwarf',
  half_elf:   'Half-Elf',
  half_dwarf: 'Half-Dwarf',
};

const RACE_DESCRIPTIONS = {
  human:      'Adaptable and ambitious by nature, humans spread across the world with remarkable ease. Neither the longest-lived nor the mightiest, they compensate with drive, diversity, and resilience. Balanced across all disciplines.',
  elf:        'Ancient and perceptive, elves are scholars of the subtle — attuned to magic, beauty, and the long view of history. Their senses are keen and their patience vast. Strong in Intelligence, Wisdom, and Learning; slight of body.',
  dwarf:      'Stout in body and immovable in will, dwarves endure where others break. Masters of craft and war alike, they carry the weight of ancestral tradition with pride. Strong in Constitution, Strength, and Stewardship.',
  half_elf:   'Born between worlds, half-elves carry the curiosity of elvenkind and the warmth of humanity. Socially fluid and quick-witted, they rarely feel fully at home anywhere — and have learned to thrive everywhere. Strong in Charisma.',
  half_dwarf: 'Hardier than most humans yet more flexible than their dwarven kin, half-dwarves are natural survivors. Equally at home beside a forge or a mountain pass. Strong in Constitution and Strength.',
};

// ── Appearance option data ────────────────────────────────────
const SKIN_TONES = [
  { hex: '#fde8d0', label: 'Porcelain' },
  { hex: '#f5d0a9', label: 'Ivory' },
  { hex: '#f0c090', label: 'Fair' },
  { hex: '#e8b080', label: 'Light' },
  { hex: '#d4956a', label: 'Beige' },
  { hex: '#c4845a', label: 'Sand' },
  { hex: '#b87048', label: 'Warm' },
  { hex: '#a06038', label: 'Tan' },
  { hex: '#8a5030', label: 'Caramel' },
  { hex: '#7a4028', label: 'Brown' },
  { hex: '#623020', label: 'Deep Brown' },
  { hex: '#4a2018', label: 'Dark Brown' },
  { hex: '#381408', label: 'Ebony' },
  { hex: '#200c04', label: 'Deep Ebony' },
];

const EYE_COLORS = [
  { hex: '#1a1008', label: 'Black' },
  { hex: '#3d2010', label: 'Dark Brown' },
  { hex: '#6b3820', label: 'Brown' },
  { hex: '#8b5a30', label: 'Hazel' },
  { hex: '#c08040', label: 'Amber' },
  { hex: '#6b8a30', label: 'Green' },
  { hex: '#3a6a30', label: 'Forest Green' },
  { hex: '#3060a0', label: 'Blue' },
  { hex: '#5080c0', label: 'Sky Blue' },
  { hex: '#7090b0', label: 'Steel Blue' },
  { hex: '#888888', label: 'Gray' },
  { hex: '#7070c0', label: 'Violet' },
];

const HAIR_COLORS = [
  { hex: '#0a0806', label: 'Black' },
  { hex: '#2a1a10', label: 'Dark Brown' },
  { hex: '#4a2c18', label: 'Brown' },
  { hex: '#7a4c28', label: 'Light Brown' },
  { hex: '#e0c060', label: 'Blonde' },
  { hex: '#c8a840', label: 'Dirty Blonde' },
  { hex: '#a04020', label: 'Auburn' },
  { hex: '#c03020', label: 'Red' },
  { hex: '#c0b0a0', label: 'Gray' },
  { hex: '#e8e0d8', label: 'White' },
  { hex: '#c8d0d8', label: 'Silver' },
];

const HAIR_STYLES = [
  'Bald', 'Buzz Cut', 'Short Straight', 'Short Wavy', 'Short Curly',
  'Medium Straight', 'Medium Wavy', 'Medium Curly',
  'Long Straight', 'Long Wavy', 'Long Curly',
  'Ponytail', 'High Bun', 'Low Bun', 'Half-Up',
  'Braid', 'Double Braids', 'Crown Braid',
  'Locs', 'Afro', 'Shaved Sides', 'Undercut',
];

const WEIGHT_LABELS = [
  [0,  10,  'Very Lean'],
  [11, 30,  'Lean'],
  [31, 45,  'Slender'],
  [46, 55,  'Medium'],
  [56, 70,  'Stocky'],
  [71, 85,  'Heavy'],
  [86, 100, 'Very Heavy'],
];

// ── Category display metadata ─────────────────────────────────
const CATEGORY_META = {
  personality:    { label: 'Personality',     order: 1 },
  education:      { label: 'Education',       order: 2 },
  lifestyle:      { label: 'Lifestyle',       order: 3 },
  congenital:     { label: 'Congenital',      order: 4 },
  health:         { label: 'Health',          order: 5 },
  commander:      { label: 'Commander',       order: 6 },
  childhood:      { label: 'Childhood',       order: 7 },
  fame:           { label: 'Fame & Vices',    order: 8 },
  magic_elements: { label: 'Magic Elements',  order: 9 },
  other:          { label: 'Other',           order: 10 },
};
