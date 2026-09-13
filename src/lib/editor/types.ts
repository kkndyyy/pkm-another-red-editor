export const TYPES = [
  "NORMAL",
  "FIRE",
  "WATER",
  "GRASS",
  "ELECTRIC",
  "ICE",
  "FIGHTING",
  "POISON",
  "GROUND",
  "FLYING",
  "PSYCHIC",
  "BUG",
  "ROCK",
  "GHOST",
  "DRAGON",
  "DARK",
  "STEEL",
  "FAIRY",
] as const;

export type ElementType = (typeof TYPES)[number];

export const MOVE_TARGETS = [
  "NearOther",
  "NearFoe",
  "RandomNearFoe",
  "Other",
  "AllNearFoes",
  "AllNearOthers",
  "AllFoes",
  "AllBattlers",
  "User",
  "UserOrNearAlly",
  "NearAlly",
  "UserAndAllies",
  "UserSide",
  "FoeSide",
  "BothSides",
  "None",
] as const;

export type MoveTarget = (typeof MOVE_TARGETS)[number];

export const CATEGORIES = ["Physical", "Special", "Status"] as const;
export type MoveCategory = (typeof CATEGORIES)[number];

export const ENCOUNTER_TYPES = [
  "Land",
  "LandMorning",
  "LandDay",
  "LandAfternoon",
  "LandEvening",
  "LandNight",
  "Water",
  "OldRod",
  "GoodRod",
  "SuperRod",
  "Cave",
  "RockSmash",
  "HeadbuttLow",
  "HeadbuttHigh",
  "BugContest",
] as const;

export type EncounterTypeId = (typeof ENCOUNTER_TYPES)[number];

export const EVO_METHODS = [
  "Level",
  "Item",
  "Trade",
  "TradeItem",
  "Happiness",
  "HappinessDay",
  "HappinessNight",
  "LevelMale",
  "LevelFemale",
  "LevelDay",
  "LevelNight",
  "AttackGreater",
  "AtkDefEqual",
  "DefenseGreater",
  "Location",
  "HasMove",
  "HasInParty",
  "LevelRain",
  "LevelWalk",
  "LevelUseMoveCount",
  "LevelRecoilDamage",
  "LevelDarkInParty",
  "LevelEvening",
  "HoldItem",
  "DayHoldItem",
  "NightHoldItem",
  "ItemMale",
  "ItemFemale",
  "ItemNight",
  "HappinessMoveType",
  "LocationFlag",
  "CollectItems",
  "BattleDealCriticalHit",
  "Event",
  "Silcoon",
  "Cascoon",
  "Ninjask",
  "Shedinja",
  "Beauty",
  "None",
] as const;

export type EvoMethod = (typeof EVO_METHODS)[number];

export interface LevelMove {
  level: number;
  move: string;
}

export interface WildItem {
  item: string;
  /** 야생 소지 확률 %. 게임은 50 / 5 / 1 / 100만 씁니다. */
  chance: number;
}


export interface Evolution {
  target: string;
  method: string;
  param: string;
  reverse?: boolean;
}

export interface Species {
  id: number;
  internalName: string;
  name: string;
  types: string[];
  baseStats: {
    hp: number;
    atk: number;
    def: number;
    spd: number;
    spa: number;
    spdF: number;
  };
  abilities: string[];
  hiddenAbility: string;
  levelMoves: LevelMove[];
  tutorMoves: string[];
  wildItems: WildItem[];
  evolutions: Evolution[];
  extra: Record<string, string>;
}

export interface Move {
  id: number;
  internalName: string;
  name: string;
  type: string;
  category: MoveCategory;
  power: number;
  accuracy: number;
  pp: number;
  functionCode: string;
  effectChance: number;
  priority: number;
  flags: string;
  target: string;
  description: string;
  extra: Record<string, string>;
}

export interface Ability {
  internalName: string;
  name: string;
  description: string;
}

export interface EncounterSlot {
  species: string;
  min: number;
  max: number;
  /** 슬롯 출현 확률 %. 어나더레드는 [확률, 종족, 최소, 최대] 4칸. */
  chance?: number;
}

export interface EncounterArea {
  key: string;
  mapId: number;
  version: number;
  label: string;
  stepChances: Record<string, number>;
  slots: Record<string, EncounterSlot[]>;
}

export interface ParseIssue {
  file: string;
  line?: number;
  message: string;
}

export interface WorkspaceSnapshot {
  species: Species[];
  moves: Move[];
  abilities: Ability[];
  encounters?: EncounterArea[];
  originalPokemonText: string;
  originalMovesText: string;
  sourceLabel: string;
}

export interface ValidationIssue {
  level: "error" | "warn";
  scope: "species" | "move";
  key: string;
  message: string;
}
