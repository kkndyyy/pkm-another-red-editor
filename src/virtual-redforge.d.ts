declare module "virtual:redforge-embedded" {
  import type { Ability, Move, Species } from "./lib/editor/types";
  const data: {
    workspace: { species: Species[]; moves: Move[]; abilities: Ability[] };
    names: unknown;
    species: Uint8Array;
    moves: Uint8Array;
    abilities: Uint8Array;
    messages: Uint8Array;
    encounters: Uint8Array;
  };
  export default data;
}
