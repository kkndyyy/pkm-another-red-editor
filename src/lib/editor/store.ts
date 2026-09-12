import { useMemo } from "react";
import { create } from "zustand";
import type { Ability, EncounterArea, EncounterSlot, Move, Species, WildItem, WorkspaceSnapshot } from "./types";
import { buildSampleWorkspace } from "./sample-data";
import { parseMovesPbs, parsePokemonPbs } from "./pbs";
import { validateWorkspace } from "./validate";
import { abilitiesFromDat, movesFromDat, speciesFromDat } from "./gamedata";
import { datCache, loadBundledDat, prefetchDats, setDatBytes } from "./dat-cache";
import { buildSampleEncounters, encounterKey, encountersFromDat, newEncounterSlot } from "./encounters";
import { mapDisplayName } from "./map-names";

export type TabId = "species" | "moves" | "encounters" | "debug" | "files";

const STORAGE_KEY = "redforge-workspace-v6";
const IDB_NAME = "redforge-db";
const IDB_STORE = "workspace";

function hasWorkspace(s: { ready?: boolean; species: Species[] }) {
  return s.species.length > 50;
}

function parsePersisted(data: Partial<EditorState>): Partial<EditorState> | null {
  if (!Array.isArray(data.species) || !Array.isArray(data.moves) || data.species.length < 50) return null;
  const species = withSpeciesExtras(data.species);
  return {
    species,
    moves: data.moves,
    abilities: Array.isArray(data.abilities) ? data.abilities : [],
    encounters: Array.isArray(data.encounters) ? data.encounters : [],
    encountersIsSample: data.encountersIsSample ?? true,
    originalPokemonText: data.originalPokemonText || "",
    originalMovesText: data.originalMovesText || "",
    sourceLabel: data.sourceLabel || "저장된 작업",
    selectedSpecies: data.selectedSpecies || species[0]?.internalName || "",
    selectedMove: data.selectedMove || data.moves[0]?.internalName || "",
    selectedEncounter: data.selectedEncounter || data.encounters?.[0]?.key || "",
    tab: data.tab || "species",
    showForms: data.showForms ?? false,
    startWithAllTms: data.startWithAllTms ?? false,
    enableDebugKo: data.enableDebugKo ?? false,
    typeFilter: data.typeFilter || "",
    ready: true,
    loading: false,
    loadError: "",
  };
}

function applyPersisted(data: Partial<EditorState>, set: (p: Partial<EditorState>) => void) {
  const next = parsePersisted(data);
  if (!next) return false;
  set(next);
  return true;
}

function persistPayload(s: EditorState) {
  return {
    species: s.species,
    moves: s.moves,
    abilities: s.abilities,
    encounters: s.encounters,
    encountersIsSample: s.encountersIsSample,
    sourceLabel: s.sourceLabel,
    selectedSpecies: s.selectedSpecies,
    selectedMove: s.selectedMove,
    selectedEncounter: s.selectedEncounter,
    tab: s.tab,
    showForms: s.showForms,
    startWithAllTms: s.startWithAllTms,
    enableDebugKo: s.enableDebugKo,
    typeFilter: s.typeFilter,
  };
}

function openIdb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbWrite(value: string) {
  if (typeof indexedDB === "undefined") return;
  const db = await openIdb();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      tx.objectStore(IDB_STORE).put(value, STORAGE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

async function idbRead(): Promise<string | null> {
  if (typeof indexedDB === "undefined") return null;
  const db = await openIdb();
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const req = tx.objectStore(IDB_STORE).get(STORAGE_KEY);
      req.onsuccess = () => resolve((req.result as string) ?? null);
      req.onerror = () => reject(req.error);
    });
  } finally {
    db.close();
  }
}

let bundledJob: Promise<void> | null = null;
let bootJob: Promise<void> | null = null;
let loadGen = 0;

interface EditorState {
  species: Species[];
  moves: Move[];
  abilities: Ability[];
  encounters: EncounterArea[];
  encountersIsSample: boolean;
  originalPokemonText: string;
  originalMovesText: string;
  sourceLabel: string;
  tab: TabId;
  selectedSpecies: string;
  selectedMove: string;
  selectedEncounter: string;
  query: string;
  typeFilter: string;
  startWithAllTms: boolean;
  enableDebugKo: boolean;
  ready: boolean;
  loading: boolean;
  loadError: string;
  showForms: boolean;
  loadSample: () => void;
  loadBundled: (force?: boolean) => Promise<void>;
  importWorkspaceJson: (json: string) => boolean;
  importTexts: (pokemonText: string | null, movesText: string | null, label?: string) => string[];
  importDat: (
    parts: {
      species?: Uint8Array;
      moves?: Uint8Array;
      abilities?: Uint8Array;
      messages?: Uint8Array;
      encounters?: Uint8Array;
    },
    label?: string,
  ) => string[];
  loadSampleEncounters: () => void;
  selectSpecies: (internalName: string) => void;
  selectMove: (internalName: string) => void;
  selectEncounter: (key: string) => void;
  setTab: (tab: TabId) => void;
  setQuery: (q: string) => void;
  setTypeFilter: (t: string) => void;
  setShowForms: (v: boolean) => void;
  setStartWithAllTms: (v: boolean) => void;
  setEnableDebugKo: (v: boolean) => void;
  patchSpecies: (internalName: string, patch: Partial<Species>) => void;
  patchMove: (internalName: string, patch: Partial<Move>) => void;
  addLevelMove: (internalName: string) => void;
  removeLevelMove: (internalName: string, index: number) => void;
  patchLevelMove: (internalName: string, index: number, patch: Partial<Species["levelMoves"][number]>) => void;
  addTutorMove: (internalName: string, move: string) => void;
  removeTutorMove: (internalName: string, index: number) => void;
  addWildItem: (internalName: string, item: string, chance?: number) => void;
  removeWildItem: (internalName: string, index: number) => void;
  patchWildItem: (internalName: string, index: number, patch: Partial<WildItem>) => void;
  addEvolution: (internalName: string) => void;
  removeEvolution: (internalName: string, index: number) => void;
  patchEvolution: (internalName: string, index: number, patch: Partial<Species["evolutions"][number]>) => void;
  patchEncounter: (key: string, patch: Partial<EncounterArea>) => void;
  addEncounterArea: () => void;
  removeEncounterArea: (key: string) => void;
  addEncounterSlot: (key: string, type: string) => void;
  removeEncounterSlot: (key: string, type: string, index: number) => void;
  patchEncounterSlot: (key: string, type: string, index: number, patch: Partial<EncounterSlot>) => void;
  setEncounterTypeChance: (key: string, type: string, chance: number) => void;
  addEncounterType: (key: string, type: string) => void;
  removeEncounterType: (key: string, type: string) => void;
  hydrateFromStorage: () => boolean;
}

function withSpeciesExtras(species: Species[]): Species[] {
  return species.map((s) => ({
    ...s,
    tutorMoves: Array.isArray(s.tutorMoves) ? s.tutorMoves : [],
    wildItems: Array.isArray(s.wildItems) ? s.wildItems : [],
  }));
}

function applySnap(snap: WorkspaceSnapshot) {
  return {
    species: withSpeciesExtras(snap.species),
    moves: snap.moves,
    abilities: snap.abilities || [],
    encounters: snap.encounters || [],
    encountersIsSample: !snap.encounters?.length,
    originalPokemonText: snap.originalPokemonText,
    originalMovesText: snap.originalMovesText,
    sourceLabel: snap.sourceLabel,
    selectedSpecies: snap.species[0]?.internalName ?? "",
    selectedMove: snap.moves[0]?.internalName ?? "",
    selectedEncounter: snap.encounters?.[0]?.key ?? "",
    query: "",
  };
}

function readLocalBoot(): Partial<EditorState> | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return parsePersisted(JSON.parse(raw) as Partial<EditorState>);
  } catch {
    return null;
  }
}

const localBoot = typeof window !== "undefined" ? readLocalBoot() : null;

export const useEditor = create<EditorState>()((set, get) => ({
  species: [],
  moves: [],
  abilities: [],
  encounters: [],
  encountersIsSample: true,
  originalPokemonText: "",
  originalMovesText: "",
  sourceLabel: "불러오는 중",
  selectedSpecies: "",
  selectedMove: "",
  selectedEncounter: "",
  query: "",
  typeFilter: "",
  startWithAllTms: false,
  enableDebugKo: false,
  tab: "species" as TabId,
  ready: false,
  loading: true,
  loadError: "",
  showForms: false,
  ...(localBoot ?? {}),
  loadSample: () =>
    set({
      ...applySnap(buildSampleWorkspace()),
      encounters: buildSampleEncounters(),
      encountersIsSample: true,
      selectedEncounter: buildSampleEncounters()[0]?.key ?? "",
      tab: get().tab,
      ready: true,
      loading: false,
    }),
  loadBundled: async (force = false) => {
    if (!force && hasWorkspace(get())) {
      if (!get().ready) set({ ready: true, loading: false });
      void prefetchDats();
      return;
    }
    if (bundledJob && !force) return bundledJob;
    const gen = ++loadGen;
    const job = (async () => {
      if (!force && !hasWorkspace(get())) set({ loading: true, loadError: "" });
      try {
        const data = await loadBundledDat();
        if (gen !== loadGen) return;
        if (!force && hasWorkspace(get())) {
          set({ loading: false, ready: true });
          return;
        }
        const enc = data.encounters || [];
        const pick =
          data.species.find((s) => s.internalName === "SPRIGATITO")?.internalName ||
          get().selectedSpecies ||
          data.species[0]?.internalName ||
          "";
        set({
          species: withSpeciesExtras(data.species),
          moves: data.moves,
          abilities: data.abilities,
          encounters: enc,
          encountersIsSample: enc.length === 0,
          selectedEncounter: force ? enc[0]?.key || "" : get().selectedEncounter || enc[0]?.key || "",
          originalPokemonText: "",
          originalMovesText: "",
          sourceLabel: "어나더레드 Data",
          selectedSpecies: force ? pick : get().selectedSpecies || pick,
          selectedMove: force ? data.moves[0]?.internalName || "" : get().selectedMove || data.moves[0]?.internalName || "",
          query: force ? "" : get().query,
          ready: true,
          loading: false,
          loadError: "",
          ...(force ? { startWithAllTms: false, enableDebugKo: false, typeFilter: "" } : {}),
        });
      } catch (e) {
        if (gen !== loadGen) return;
        if (!force && hasWorkspace(get())) {
          set({
            loading: false,
            ready: true,
            loadError: e instanceof Error ? e.message : "데이터를 다시 열지 못했습니다.",
          });
          return;
        }
        const snap = buildSampleWorkspace();
        set({
          ...applySnap(snap),
          encounters: buildSampleEncounters(),
          encountersIsSample: true,
          selectedEncounter: buildSampleEncounters()[0]?.key ?? "",
          ready: true,
          loading: false,
          loadError: e instanceof Error ? e.message : "데이터를 불러오지 못했습니다.",
          sourceLabel: "샘플 데이터",
        });
      }
    })();
    bundledJob = job;
    try {
      await job;
    } finally {
      if (bundledJob === job) bundledJob = null;
    }
  },
  importWorkspaceJson: (json) => {
    try {
      const data = JSON.parse(json) as Partial<EditorState>;
      return applyPersisted(data, set);
    } catch {
      return false;
    }
  },
  importTexts: (pokemonText, movesText, label) => {
    const messages: string[] = [];
    let species = get().species;
    let moves = get().moves;
    let originalPokemonText = get().originalPokemonText;
    let originalMovesText = get().originalMovesText;
    if (pokemonText != null && pokemonText.trim()) {
      const r = parsePokemonPbs(pokemonText);
      if (r.species.length) {
        species = withSpeciesExtras(r.species);
        originalPokemonText = pokemonText.replace(/^\uFEFF/, "");
        messages.push(`종족 ${r.species.length}마리 (PBS)`);
      }
      r.issues.forEach((i) => messages.push(i.message));
    }
    if (movesText != null && movesText.trim()) {
      const r = parseMovesPbs(movesText);
      if (r.moves.length) {
        moves = r.moves;
        originalMovesText = movesText.replace(/^\uFEFF/, "");
        messages.push(`기술 ${r.moves.length}개 (PBS)`);
      }
      r.issues.forEach((i) => messages.push(i.message));
    }
    set({
      species,
      moves,
      originalPokemonText,
      originalMovesText,
      sourceLabel: label || "불러온 PBS",
      selectedSpecies: species[0]?.internalName ?? "",
      selectedMove: moves[0]?.internalName ?? "",
      query: "",
      ready: true,
      loading: false,
    });
    return messages;
  },
  importDat: (parts, label) => {
    const messages: string[] = [];
    let species = get().species;
    let moves = get().moves;
    let abilities = get().abilities;
    let encounters = get().encounters;
    let encountersIsSample = get().encountersIsSample;
    let selectedEncounter = get().selectedEncounter;
    if (parts.species) {
      setDatBytes("species", parts.species);
      species = withSpeciesExtras(speciesFromDat(parts.species, datCache.names));
      messages.push(`종족 ${species.length}마리 (species.dat)`);
    }
    if (parts.moves) {
      setDatBytes("moves", parts.moves);
      moves = movesFromDat(parts.moves, datCache.names);
      messages.push(`기술 ${moves.length}개 (moves.dat)`);
    }
    if (parts.abilities) {
      setDatBytes("abilities", parts.abilities);
      abilities = abilitiesFromDat(parts.abilities, datCache.names);
      messages.push(`특성 ${abilities.length}개`);
    }
    if (parts.messages) {
      setDatBytes("messages", parts.messages);
      messages.push("한국어 이름 테이블");
    }
    if (parts.encounters) {
      setDatBytes("encounters", parts.encounters);
      encounters = encountersFromDat(parts.encounters);
      encountersIsSample = false;
      selectedEncounter = encounters[0]?.key || "";
      messages.push(`야생 출현 ${encounters.length}곳 (encounters.dat)`);
    }
    const pick =
      species.find((s) => s.internalName === get().selectedSpecies)?.internalName ||
      species.find((s) => s.internalName === "SPRIGATITO")?.internalName ||
      species[0]?.internalName ||
      "";
    set({
      species,
      moves,
      abilities,
      encounters,
      encountersIsSample,
      selectedEncounter,
      sourceLabel: label || "불러온 Data",
      selectedSpecies: pick,
      selectedMove: moves[0]?.internalName || "",
      query: "",
      ready: true,
      loading: false,
    });
    return messages;
  },
  loadSampleEncounters: () => {
    const areas = buildSampleEncounters();
    set({
      encounters: areas,
      encountersIsSample: true,
      selectedEncounter: areas[0]?.key || "",
      tab: "encounters",
    });
  },
  selectSpecies: (internalName) => set({ selectedSpecies: internalName, tab: "species" }),
  selectMove: (internalName) => set({ selectedMove: internalName, tab: "moves" }),
  selectEncounter: (key) => set({ selectedEncounter: key, tab: "encounters" }),
  setTab: (tab) => set({ tab }),
  setQuery: (query) => set({ query }),
  setTypeFilter: (typeFilter) => set({ typeFilter }),
  setShowForms: (showForms) => set({ showForms }),
  setStartWithAllTms: (startWithAllTms) => set({ startWithAllTms }),
  setEnableDebugKo: (enableDebugKo) => set({ enableDebugKo }),
  patchSpecies: (internalName, patch) =>
    set({
      species: get().species.map((s) => (s.internalName === internalName ? { ...s, ...patch } : s)),
    }),
  patchMove: (internalName, patch) =>
    set({
      moves: get().moves.map((m) => (m.internalName === internalName ? { ...m, ...patch } : m)),
    }),
  addLevelMove: (internalName) =>
    set({
      species: get().species.map((s) =>
        s.internalName === internalName
          ? {
              ...s,
              levelMoves: [...s.levelMoves, { level: 1, move: get().moves[0]?.internalName || "TACKLE" }],
            }
          : s,
      ),
    }),
  removeLevelMove: (internalName, index) =>
    set({
      species: get().species.map((s) =>
        s.internalName === internalName
          ? { ...s, levelMoves: s.levelMoves.filter((_, i) => i !== index) }
          : s,
      ),
    }),
  patchLevelMove: (internalName, index, patch) =>
    set({
      species: get().species.map((s) =>
        s.internalName === internalName
          ? {
              ...s,
              levelMoves: s.levelMoves.map((row, i) => (i === index ? { ...row, ...patch } : row)),
            }
          : s,
      ),
    }),
  addTutorMove: (internalName, move) => {
    const id = move.trim().toUpperCase();
    if (!id) return;
    set({
      species: get().species.map((s) => {
        if (s.internalName !== internalName) return s;
        if (s.tutorMoves.includes(id)) return s;
        return { ...s, tutorMoves: [...s.tutorMoves, id] };
      }),
    });
  },
  removeTutorMove: (internalName, index) =>
    set({
      species: get().species.map((s) =>
        s.internalName === internalName
          ? { ...s, tutorMoves: s.tutorMoves.filter((_, i) => i !== index) }
          : s,
      ),
    }),
  addWildItem: (internalName, item, chance = 5) => {
    const id = item.trim().toUpperCase();
    if (!id) return;
    const n = Number(chance);
    set({
      species: get().species.map((s) => {
        if (s.internalName !== internalName) return s;
        const wildItems = Array.isArray(s.wildItems) ? s.wildItems : [];
        return {
          ...s,
          wildItems: [...wildItems, { item: id, chance: Number.isFinite(n) ? n : 5 }],
        };
      }),
    });
  },
  removeWildItem: (internalName, index) =>
    set({
      species: get().species.map((s) =>
        s.internalName === internalName
          ? { ...s, wildItems: (s.wildItems || []).filter((_, i) => i !== index) }
          : s,
      ),
    }),
  patchWildItem: (internalName, index, patch) =>
    set({
      species: get().species.map((s) =>
        s.internalName === internalName
          ? {
              ...s,
              wildItems: (s.wildItems || []).map((row, i) => (i === index ? { ...row, ...patch } : row)),
            }
          : s,
      ),
    }),
  addEvolution: (internalName) =>
    set({
      species: get().species.map((s) =>
        s.internalName === internalName
          ? { ...s, evolutions: [...s.evolutions, { target: "", method: "Level", param: "16" }] }
          : s,
      ),
    }),
  removeEvolution: (internalName, index) =>
    set({
      species: get().species.map((s) =>
        s.internalName === internalName
          ? { ...s, evolutions: s.evolutions.filter((_, i) => i !== index) }
          : s,
      ),
    }),
  patchEvolution: (internalName, index, patch) =>
    set({
      species: get().species.map((s) =>
        s.internalName === internalName
          ? {
              ...s,
              evolutions: s.evolutions.map((row, i) => (i === index ? { ...row, ...patch } : row)),
            }
          : s,
      ),
    }),
  patchEncounter: (key, patch) =>
    set({
      encounters: get().encounters.map((a) => {
        if (a.key !== key) return a;
        const next = { ...a, ...patch };
        if (patch.mapId != null && patch.label == null) {
          const oldName = mapDisplayName(a.mapId, a.version);
          if (a.label === oldName || a.label === `맵 ${a.mapId}`) {
            next.label = mapDisplayName(next.mapId, next.version);
          }
        }
        next.key = encounterKey(next.mapId, next.version);
        return next;
      }),
      selectedEncounter: (() => {
        const cur = get().encounters.find((a) => a.key === key);
        if (!cur) return get().selectedEncounter;
        const next = { ...cur, ...patch };
        return encounterKey(next.mapId, next.version);
      })(),
    }),
  addEncounterArea: () => {
    const used = new Set(get().encounters.map((a) => a.mapId));
    let mapId = 1;
    while (used.has(mapId)) mapId += 1;
    const area: EncounterArea = {
      key: encounterKey(mapId, 0),
      mapId,
      version: 0,
      label: mapDisplayName(mapId, 0),
      stepChances: { Land: 25 },
      slots: { Land: [newEncounterSlot(get().species[0]?.internalName || "PIDGEY", [], 2, 5)] },
    };
    set({
      encounters: [...get().encounters, area],
      selectedEncounter: area.key,
      encountersIsSample: false,
    });
  },
  removeEncounterArea: (key) => {
    const next = get().encounters.filter((a) => a.key !== key);
    set({
      encounters: next,
      selectedEncounter: get().selectedEncounter === key ? next[0]?.key || "" : get().selectedEncounter,
    });
  },
  addEncounterSlot: (key, type) =>
    set({
      encounters: get().encounters.map((a) => {
        if (a.key !== key) return a;
        const rows = a.slots[type] || [];
        const fallback = rows[0];
        return {
          ...a,
          slots: {
            ...a.slots,
            [type]: [
              ...rows,
              newEncounterSlot(
                get().species[0]?.internalName || "PIDGEY",
                rows,
                fallback?.min ?? 5,
                fallback?.max ?? 10,
              ),
            ],
          },
        };
      }),
    }),
  removeEncounterSlot: (key, type, index) =>
    set({
      encounters: get().encounters.map((a) => {
        if (a.key !== key) return a;
        return { ...a, slots: { ...a.slots, [type]: (a.slots[type] || []).filter((_, i) => i !== index) } };
      }),
    }),
  patchEncounterSlot: (key, type, index, patch) =>
    set({
      encounters: get().encounters.map((a) => {
        if (a.key !== key) return a;
        const rows = (a.slots[type] || []).map((row, i) => (i === index ? { ...row, ...patch } : row));
        return { ...a, slots: { ...a.slots, [type]: rows } };
      }),
    }),
  setEncounterTypeChance: (key, type, chance) =>
    set({
      encounters: get().encounters.map((a) =>
        a.key === key ? { ...a, stepChances: { ...a.stepChances, [type]: chance } } : a,
      ),
    }),
  addEncounterType: (key, type) =>
    set({
      encounters: get().encounters.map((a) => {
        if (a.key !== key) return a;
        if (a.slots[type]?.length) return a;
        return {
          ...a,
          stepChances: { ...a.stepChances, [type]: a.stepChances[type] || 21 },
          slots: { ...a.slots, [type]: [newEncounterSlot("PIDGEY", [], 5, 10)] },
        };
      }),
    }),
  removeEncounterType: (key, type) =>
    set({
      encounters: get().encounters.map((a) => {
        if (a.key !== key) return a;
        const slots = { ...a.slots };
        const stepChances = { ...a.stepChances };
        delete slots[type];
        delete stepChances[type];
        return { ...a, slots, stepChances };
      }),
    }),
  hydrateFromStorage: () => {
    try {
      if (typeof localStorage === "undefined") return false;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      return applyPersisted(JSON.parse(raw) as Partial<EditorState>, set);
    } catch {
      return false;
    }
  },
}));

export function exportWorkspaceJson(): string {
  return JSON.stringify(persistPayload(useEditor.getState()));
}

export async function bootEditor() {
  if (bootJob) return bootJob;
  bootJob = (async () => {
    const st = useEditor.getState();
    if (hasWorkspace(st)) {
      if (!st.ready) useEditor.setState({ ready: true, loading: false });
      void prefetchDats();
      return;
    }
    if (st.hydrateFromStorage()) {
      void prefetchDats();
      return;
    }
    try {
      const raw = await idbRead();
      if (raw && applyPersisted(JSON.parse(raw) as Partial<EditorState>, (p) => useEditor.setState(p))) {
        void prefetchDats();
        return;
      }
    } catch {
      /* IndexedDB 없음 */
    }
    await useEditor.getState().loadBundled();
  })();
  await bootJob;
}

export function persistEditor() {
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(flushPersist, 250);
}

export function watchPersist() {
  const unsub = useEditor.subscribe((s, p) => {
    if (!s.ready) return;
    if (
      s.species === p.species &&
      s.moves === p.moves &&
      s.encounters === p.encounters &&
      s.abilities === p.abilities &&
      s.startWithAllTms === p.startWithAllTms &&
      s.enableDebugKo === p.enableDebugKo &&
      s.selectedSpecies === p.selectedSpecies &&
      s.selectedMove === p.selectedMove &&
      s.selectedEncounter === p.selectedEncounter &&
      s.tab === p.tab &&
      s.showForms === p.showForms &&
      s.sourceLabel === p.sourceLabel
    ) {
      return;
    }
    persistEditor();
  });
  const flush = () => {
    if (persistTimer) {
      clearTimeout(persistTimer);
      persistTimer = undefined;
    }
    flushPersist();
  };
  if (typeof window !== "undefined") {
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush();
    });
  }
  return () => {
    unsub();
    if (typeof window !== "undefined") window.removeEventListener("pagehide", flush);
  };
}

let persistTimer: ReturnType<typeof setTimeout> | undefined;

function flushPersist() {
  persistTimer = undefined;
  const s = useEditor.getState();
  if (!s.ready || s.species.length < 10) return;
  let json: string;
  try {
    json = JSON.stringify(persistPayload(s));
  } catch {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, json);
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, json);
    } catch {
      /* quota — IndexedDB에만 남김 */
    }
  }
  void idbWrite(json).catch(() => {});
}

export function useIssues() {
  const species = useEditor((s) => s.species);
  const moves = useEditor((s) => s.moves);
  return useMemo(() => validateWorkspace(species, moves), [species, moves]);
}
