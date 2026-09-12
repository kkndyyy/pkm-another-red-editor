import embedded from "virtual:redforge-embedded";
import { parseNamesKo } from "./gamedata.ts";
import { installEmbeddedBundle } from "./dat-cache.ts";

export function installEmbeddedData() {
  installEmbeddedBundle({
    workspace: embedded.workspace,
    names: parseNamesKo(embedded.names),
    species: embedded.species,
    moves: embedded.moves,
    abilities: embedded.abilities,
    messages: embedded.messages,
    encounters: embedded.encounters,
  });
}
