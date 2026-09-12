import {
  parseNamesKo,
  patchMessagesNames,
  patchMovesDat,
  patchSpeciesDat,
  speciesFromDat,
  type NameMaps,
} from "./gamedata.ts";
import { encountersFromDat, patchEncountersDat } from "./encounters.ts";
import { offlineGetBuf, offlineGetJson, offlinePut, type OfflineKey } from "./offline-cache.ts";
import type { Ability, EncounterArea, Move, Species } from "./types.ts";

export const datCache: {
  species: Uint8Array | null;
  moves: Uint8Array | null;
  abilities: Uint8Array | null;
  messages: Uint8Array | null;
  encounters: Uint8Array | null;
  names: NameMaps;
} = {
  species: null,
  moves: null,
  abilities: null,
  messages: null,
  encounters: null,
  names: { species: {}, moves: {}, abilities: {} },
};

export type EmbeddedBundle = {
  workspace: { species: Species[]; moves: Move[]; abilities: Ability[] };
  names: NameMaps;
  species: Uint8Array;
  moves: Uint8Array;
  abilities: Uint8Array | null;
  messages: Uint8Array | null;
  encounters: Uint8Array | null;
};

let embedded: EmbeddedBundle | null = null;

export function installEmbeddedBundle(bundle: EmbeddedBundle) {
  embedded = bundle;
  datCache.species = bundle.species;
  datCache.moves = bundle.moves;
  datCache.abilities = bundle.abilities;
  datCache.messages = bundle.messages;
  datCache.encounters = bundle.encounters;
  datCache.names = bundle.names;
}

export function hasEmbeddedBundle() {
  return embedded != null;
}

export function getEmbeddedBundle() {
  return embedded;
}

function bufFromEmbedded(key: OfflineKey): Uint8Array | null {
  if (!embedded) return null;
  if (key === "species") return embedded.species;
  if (key === "moves") return embedded.moves;
  if (key === "abilities") return embedded.abilities;
  if (key === "messages") return embedded.messages;
  if (key === "encounters") return embedded.encounters;
  return null;
}

async function fetchBuf(url: string, key: OfflineKey): Promise<Uint8Array> {
  const fromEmbed = bufFromEmbedded(key);
  if (fromEmbed) {
    void offlinePut(key, fromEmbed);
    return fromEmbed;
  }
  const online = typeof navigator === "undefined" || navigator.onLine;
  if (!online) {
    const cached = await offlineGetBuf(key);
    if (cached) return cached;
  }
  try {
    const res = await fetch(url);
    if (res.ok) {
      const buf = new Uint8Array(await res.arrayBuffer());
      void offlinePut(key, buf);
      return buf;
    }
  } catch {
    /* 오프라인 — IndexedDB */
  }
  const cached = await offlineGetBuf(key);
  if (cached) return cached;
  throw new Error(`${url} 오프라인`);
}

async function fetchJson<T>(url: string, key: OfflineKey): Promise<T> {
  if (embedded && key === "workspace") {
    void offlinePut(key, embedded.workspace);
    return embedded.workspace as T;
  }
  if (embedded && key === "names") {
    void offlinePut(key, embedded.names);
    return embedded.names as T;
  }
  const online = typeof navigator === "undefined" || navigator.onLine;
  if (!online) {
    const cached = await offlineGetJson<T>(key);
    if (cached) return cached;
  }
  try {
    const res = await fetch(url);
    if (res.ok) {
      const json = (await res.json()) as T;
      void offlinePut(key, json);
      return json;
    }
  } catch {
    /* 오프라인 */
  }
  const cached = await offlineGetJson<T>(key);
  if (cached) return cached;
  throw new Error(`${url} 오프라인`);
}

let prefetch: Promise<void> | null = null;

export function prefetchDats() {
  if (prefetch) return prefetch;
  if (embedded) {
    prefetch = Promise.resolve();
    return prefetch;
  }
  prefetch = Promise.all([
    fetchBuf("/data/species.dat", "species").then((b) => {
      datCache.species = b;
    }),
    fetchBuf("/data/moves.dat", "moves").then((b) => {
      datCache.moves = b;
    }),
    fetchBuf("/data/abilities.dat", "abilities")
      .then((b) => {
        datCache.abilities = b;
      })
      .catch(() => {}),
    fetchBuf("/data/messages_kor_core.dat", "messages")
      .then((b) => {
        datCache.messages = b;
      })
      .catch(() => {}),
    fetchBuf("/data/encounters.dat", "encounters")
      .then((b) => {
        if (!datCache.encounters) datCache.encounters = b;
      })
      .catch(() => {}),
    fetchJson<unknown>("/data/names-ko.json", "names")
      .then((j) => {
        datCache.names = parseNamesKo(j);
      })
      .catch(() => {}),
  ]).then(() => undefined);
  return prefetch;
}

type WorkspaceJson = {
  species: Species[];
  moves: Move[];
  abilities: Ability[];
};

function assembleWorkspace(
  ws: WorkspaceJson,
  encBuf: Uint8Array | null,
  specBuf: Uint8Array | null,
): {
  species: Species[];
  moves: Move[];
  abilities: Ability[];
  encounters: EncounterArea[];
} {
  if (encBuf) datCache.encounters = encBuf;
  if (specBuf) datCache.species = specBuf;
  let encounters: EncounterArea[] = [];
  if (encBuf) {
    try {
      encounters = encountersFromDat(encBuf);
    } catch {
      encounters = [];
    }
  }
  let species = (ws.species || []).map(normalizeSpecies);
  if (specBuf) {
    try {
      const fromDat = speciesFromDat(specBuf, { species: {}, moves: {}, abilities: {} });
      const wildBy = new Map(fromDat.map((s) => [s.internalName, s.wildItems || []]));
      species = species.map((s) => ({ ...s, wildItems: wildBy.get(s.internalName) || s.wildItems || [] }));
    } catch {
      /* workspace.json 그대로 */
    }
  }
  return {
    species,
    moves: ws.moves || [],
    abilities: ws.abilities || [],
    encounters,
  };
}

export async function loadBundledDat(): Promise<{
  species: Species[];
  moves: Move[];
  abilities: Ability[];
  encounters: EncounterArea[];
}> {
  if (embedded) {
    void prefetchDats();
    return assembleWorkspace(embedded.workspace, embedded.encounters, embedded.species);
  }
  const [ws, encBuf, specBuf] = await Promise.all([
    fetchJson<WorkspaceJson>("/data/workspace.json", "workspace"),
    fetchBuf("/data/encounters.dat", "encounters").catch(() => null),
    fetchBuf("/data/species.dat", "species").catch(() => null),
  ]);
  void prefetchDats();
  return assembleWorkspace(ws, encBuf, specBuf);
}

function normalizeSpecies(s: Species): Species {
  return {
    ...s,
    tutorMoves: Array.isArray(s.tutorMoves) ? s.tutorMoves : [],
    wildItems: Array.isArray(s.wildItems) ? s.wildItems : [],
  };
}

export async function ensureDats() {
  await prefetchDats();
  if (!datCache.species) datCache.species = await fetchBuf("/data/species.dat", "species");
  if (!datCache.moves) datCache.moves = await fetchBuf("/data/moves.dat", "moves");
  if (!datCache.encounters) {
    try {
      datCache.encounters = await fetchBuf("/data/encounters.dat", "encounters");
    } catch {
      /* optional */
    }
  }
}

export function setDatBytes(
  kind: "species" | "moves" | "abilities" | "messages" | "encounters",
  bytes: Uint8Array,
) {
  datCache[kind] = bytes;
  void offlinePut(kind, bytes);
}

export function exportSpeciesDat(species: Species[]): Uint8Array {
  if (!datCache.species) throw new Error("species.dat 원본이 없습니다.");
  return patchSpeciesDat(datCache.species, species);
}

export function exportMovesDat(moves: Move[]): Uint8Array {
  if (!datCache.moves) throw new Error("moves.dat 원본이 없습니다.");
  return patchMovesDat(datCache.moves, moves);
}

export function exportMessagesDat(species: Species[], moves: Move[]): Uint8Array | null {
  if (!datCache.messages) return null;
  return patchMessagesNames(datCache.messages, species, moves);
}

export function exportEncountersDat(areas: EncounterArea[]): Uint8Array {
  return patchEncountersDat(datCache.encounters, areas);
}

export function hasSpeciesDat() {
  return !!datCache.species;
}
export function hasMovesDat() {
  return !!datCache.moves;
}
export function hasEncountersDat() {
  return !!datCache.encounters;
}
