const DB_NAME = "redforge-offline";
const DB_VER = 1;
const STORE = "files";

export type OfflineKey =
  | "species"
  | "moves"
  | "abilities"
  | "messages"
  | "encounters"
  | "names"
  | "workspace";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function offlinePut(key: OfflineKey, value: ArrayBuffer | Uint8Array | unknown) {
  if (typeof indexedDB === "undefined") return;
  const db = await openDb();
  try {
    const payload =
      value instanceof Uint8Array
        ? value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength)
        : value;
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(payload, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

export async function offlineGetBuf(key: OfflineKey): Promise<Uint8Array | null> {
  if (typeof indexedDB === "undefined") return null;
  const db = await openDb();
  try {
    const raw = await new Promise<unknown>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    if (!raw) return null;
    if (raw instanceof ArrayBuffer) return new Uint8Array(raw);
    if (raw instanceof Uint8Array) return raw;
    if (ArrayBuffer.isView(raw)) {
      const v = raw as ArrayBufferView;
      return new Uint8Array(v.buffer.slice(v.byteOffset, v.byteOffset + v.byteLength));
    }
    return null;
  } finally {
    db.close();
  }
}

export async function offlineGetJson<T>(key: OfflineKey): Promise<T | null> {
  if (typeof indexedDB === "undefined") return null;
  const db = await openDb();
  try {
    const raw = await new Promise<unknown>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    if (!raw || typeof raw !== "object" || raw instanceof ArrayBuffer) return null;
    return raw as T;
  } finally {
    db.close();
  }
}

export async function hasOfflineBundle(): Promise<boolean> {
  const [ws, spec] = await Promise.all([offlineGetJson("workspace"), offlineGetBuf("species")]);
  return !!(ws || spec);
}
