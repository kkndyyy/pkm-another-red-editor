/** Ruby Marshal 4.8 (RGSS / Pokémon Essentials .dat). */

export class RSymbol {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class RString {
  value: string;
  utf8: boolean;
  extra: [string, RValue][];
  constructor(value: string, utf8 = true, extra: [string, RValue][] = []) {
    this.value = value;
    this.utf8 = utf8;
    this.extra = extra;
  }
}

export class RArray {
  items: RValue[];
  constructor(items: RValue[]) {
    this.items = items;
  }
}

export class RHash {
  entries: [RValue, RValue][];
  constructor(entries: [RValue, RValue][]) {
    this.entries = entries;
  }
}

export class RObject {
  className: string;
  ivars: [string, RValue][];
  constructor(className: string, ivars: [string, RValue][]) {
    this.className = className;
    this.ivars = ivars;
  }
}

export type RValue = null | boolean | number | RSymbol | RString | RArray | RHash | RObject | Uint8Array;

const T = {
  NIL: 0x30, // 0
  TRUE: 0x54, // T
  FALSE: 0x46, // F
  FIXNUM: 0x69, // i
  ARRAY: 0x5b, // [
  SYMBOL: 0x3a, // :
  STRING: 0x22, // "
  IVAR: 0x49, // I
  HASH: 0x7b, // {
  FLOAT: 0x66, // f
  BIGNUM: 0x6c, // l
  SYMLINK: 0x3b, // ;
  LINK: 0x40, // @
  OBJECT: 0x6f, // o
  USERDEF: 0x75, // u
  USRMARSHAL: 0x55, // U
  CLASS: 0x63, // c
  MODULE: 0x6d, // m
  REGEXP: 0x2f, // /
  HASH_DEF: 0x7d, // }
};

class Reader {
  pos = 0;
  symbols: RSymbol[] = [];
  objects: RValue[] = [];
  constructor(buf: Uint8Array) {
    this.buf = buf;
  }
  buf: Uint8Array;

  u8() {
    if (this.pos >= this.buf.length) throw new Error("marshal: unexpected end");
    return this.buf[this.pos++]!;
  }
  sbyte() {
    const u = this.u8();
    return u > 127 ? u - 256 : u;
  }
  ubyte() {
    return this.u8();
  }
  long() {
    const length = this.sbyte();
    if (length === 0) return 0;
    if (length > 5 && length < 128) return length - 5;
    if (length < -5 && length > -129) return length + 5;
    let result = 0;
    let factor = 1;
    const n = Math.abs(length);
    for (let i = 0; i < n; i++) {
      result += this.ubyte() * factor;
      factor *= 256;
    }
    if (length < 0) result -= factor;
    return result;
  }
  blob() {
    const size = this.long();
    const slice = this.buf.subarray(this.pos, this.pos + size);
    this.pos += size;
    return slice;
  }

  read(inIvar = false): RValue {
    const token = this.u8();
    let objectIndex: number | null = null;
    if (
      token === T.CLASS ||
      token === T.MODULE ||
      token === T.FLOAT ||
      token === T.BIGNUM ||
      token === T.STRING ||
      token === T.REGEXP ||
      token === T.ARRAY ||
      token === T.HASH ||
      token === T.HASH_DEF ||
      token === T.OBJECT ||
      token === T.USERDEF ||
      token === T.USRMARSHAL
    ) {
      objectIndex = this.objects.length;
      this.objects.push(null);
    }

    let result: RValue = null;

    if (token === T.NIL) result = null;
    else if (token === T.TRUE) result = true;
    else if (token === T.FALSE) result = false;
    else if (token === T.IVAR) result = this.read(true);
    else if (token === T.STRING) result = this.blob();
    else if (token === T.SYMBOL) {
      const name = new TextDecoder("utf-8").decode(this.blob());
      const sym = new RSymbol(name);
      this.symbols.push(sym);
      result = sym;
    } else if (token === T.SYMLINK) {
      result = this.symbols[this.long()]!;
    } else if (token === T.FIXNUM) result = this.long();
    else if (token === T.ARRAY) {
      const n = this.long();
      const items: RValue[] = [];
      result = new RArray(items);
      if (objectIndex != null) this.objects[objectIndex] = result;
      for (let i = 0; i < n; i++) items.push(this.read());
    } else if (token === T.HASH || token === T.HASH_DEF) {
      const n = this.long();
      const entries: [RValue, RValue][] = [];
      result = new RHash(entries);
      if (objectIndex != null) this.objects[objectIndex] = result;
      for (let i = 0; i < n; i++) entries.push([this.read(), this.read()]);
      if (token === T.HASH_DEF) this.read(); // default
    } else if (token === T.FLOAT) {
      const raw = new TextDecoder("utf-8").decode(this.blob()).split("\0")[0]!;
      result = Number(raw);
    } else if (token === T.BIGNUM) {
      const sign = this.u8() === 0x2b ? 1 : -1;
      const words = this.long();
      let n = 0;
      let factor = 1;
      for (let i = 0; i < words; i++) {
        const lo = this.ubyte();
        const hi = this.ubyte();
        n += (lo + hi * 256) * factor;
        factor *= 65536;
      }
      result = n * sign;
    } else if (token === T.LINK) {
      result = this.objects[this.long()] ?? null;
    } else if (token === T.OBJECT) {
      const cls = this.read();
      if (!(cls instanceof RSymbol)) throw new Error("marshal: object class");
      const ivars = this.readAttributes();
      result = new RObject(cls.name, ivars);
    } else if (token === T.MODULE || token === T.CLASS) {
      const name = new TextDecoder("utf-8").decode(this.blob());
      result = new RObject(name, []);
    } else {
      throw new Error(`marshal: unknown token 0x${token.toString(16)} at ${this.pos - 1}`);
    }

    if (inIvar) {
      const attributes = this.readAttributes();
      if (token === T.STRING || result instanceof Uint8Array) {
        const utf8 = attributes.some(([k, v]) => k === "E" && v === true);
        const bytes = result instanceof Uint8Array ? result : new Uint8Array();
        const text = new TextDecoder(utf8 ? "utf-8" : "latin1").decode(bytes);
        const extra = attributes.filter(([k]) => k !== "E" && k !== "encoding");
        result = new RString(text, utf8, extra);
      } else if (result instanceof RObject) {
        result.ivars.push(...attributes);
      }
    }

    if (objectIndex != null) this.objects[objectIndex] = result;
    return result;
  }

  readAttributes(): [string, RValue][] {
    const n = this.long();
    const attrs: [string, RValue][] = [];
    for (let i = 0; i < n; i++) {
      const name = this.read();
      const value = this.read();
      const key = name instanceof RSymbol ? name.name : String(name);
      attrs.push([key, value]);
    }
    return attrs;
  }
}

class Writer {
  chunks: number[] = [];
  symbols = new Map<string, number>();
  objects = new Map<object, number>();

  u8(n: number) {
    this.chunks.push(n & 255);
  }
  sbyte(n: number) {
    this.u8(n < 0 ? n + 256 : n);
  }
  long(obj: number) {
    if (obj === 0) {
      this.u8(0);
      return;
    }
    if (obj > 0 && obj < 123) {
      this.sbyte(obj + 5);
      return;
    }
    if (obj < 0 && obj > -124) {
      this.sbyte(obj - 5);
      return;
    }
    let size = Math.ceil(Math.abs(obj).toString(2).length / 8);
    if (size > 5) throw new Error("marshal: int too long");
    let n = obj;
    const factor = 256 ** size;
    if (n < 0 && n === -factor) {
      size -= 1;
      n += factor / 256;
    } else if (n < 0) {
      n += factor;
    }
    const sign = obj < 0 ? -size : size;
    this.sbyte(sign);
    for (let i = 0; i < size; i++) {
      this.u8(n % 256);
      n = Math.floor(n / 256);
    }
  }
  blob(bytes: Uint8Array) {
    this.long(bytes.length);
    for (let i = 0; i < bytes.length; i++) this.chunks.push(bytes[i]!);
  }
  text(s: string) {
    this.blob(new TextEncoder().encode(s));
  }

  mustWrite(obj: object): boolean {
    const existing = this.objects.get(obj);
    if (existing != null) {
      this.u8(T.LINK);
      this.long(existing);
      return false;
    }
    this.objects.set(obj, this.objects.size);
    return true;
  }

  write(obj: RValue) {
    if (obj === null) this.u8(T.NIL);
    else if (obj === true) this.u8(T.TRUE);
    else if (obj === false) this.u8(T.FALSE);
    else if (typeof obj === "number") {
      if (Number.isInteger(obj) && Math.abs(obj) < 2 ** 30) {
        this.u8(T.FIXNUM);
        this.long(obj);
      } else if (Number.isInteger(obj)) {
        this.u8(T.BIGNUM);
        this.u8(obj < 0 ? 0x2d : 0x2b);
        let n = Math.abs(obj);
        const words: number[] = [];
        while (n > 0) {
          words.push(n % 65536);
          n = Math.floor(n / 65536);
        }
        if (words.length === 0) words.push(0);
        this.long(words.length);
        for (const w of words) {
          this.u8(w & 255);
          this.u8((w >> 8) & 255);
        }
      } else {
        this.u8(T.FLOAT);
        this.text(String(obj));
      }
    } else if (obj instanceof RSymbol) this.writeSymbol(obj);
    else if (obj instanceof RString) this.writeRubyString(obj);
    else if (obj instanceof Uint8Array) {
      this.u8(T.STRING);
      this.blob(obj);
    } else if (obj instanceof RArray) {
      if (!this.mustWrite(obj)) return;
      this.u8(T.ARRAY);
      this.long(obj.items.length);
      for (const x of obj.items) this.write(x);
    } else if (obj instanceof RHash) {
      if (!this.mustWrite(obj)) return;
      this.u8(T.HASH);
      this.long(obj.entries.length);
      for (const [k, v] of obj.entries) {
        this.write(k);
        this.write(v);
      }
    } else if (obj instanceof RObject) {
      if (!this.mustWrite(obj)) return;
      this.u8(T.OBJECT);
      this.writeSymbol(new RSymbol(obj.className));
      this.writeAttributes(obj.ivars);
    } else {
      throw new Error(`marshal: cannot dump ${obj}`);
    }
  }

  writeSymbol(obj: RSymbol) {
    const idx = this.symbols.get(obj.name);
    if (idx != null) {
      this.u8(T.SYMLINK);
      this.long(idx);
      return;
    }
    this.u8(T.SYMBOL);
    this.symbols.set(obj.name, this.symbols.size);
    this.text(obj.name);
  }

  writeRubyString(obj: RString) {
    if (!this.mustWrite(obj)) return;
    const encoded = new TextEncoder().encode(obj.value);
    this.u8(T.IVAR);
    this.u8(T.STRING);
    this.blob(encoded);
    const attrs: [string, RValue][] = [["E", obj.utf8], ...obj.extra];
    this.writeAttributes(attrs);
  }

  writeAttributes(attrs: [string, RValue][]) {
    this.long(attrs.length);
    for (const [k, v] of attrs) {
      this.writeSymbol(new RSymbol(k));
      this.write(v);
    }
  }

  bytes() {
    return Uint8Array.from(this.chunks);
  }
}

export function marshalLoad(buf: Uint8Array): RValue {
  if (buf[0] !== 0x04 || buf[1] !== 0x08) throw new Error("marshal: not 4.8");
  const r = new Reader(buf.subarray(2));
  return r.read();
}

export function marshalDump(obj: RValue): Uint8Array {
  const w = new Writer();
  w.u8(0x04);
  w.u8(0x08);
  w.write(obj);
  return w.bytes();
}

export function isHash(v: RValue): v is RHash {
  return v instanceof RHash;
}
export function isObject(v: RValue): v is RObject {
  return v instanceof RObject;
}
export function isArray(v: RValue): v is RArray {
  return v instanceof RArray;
}

export function symName(v: RValue): string {
  if (v instanceof RSymbol) return v.name;
  if (v instanceof RString) return v.value;
  if (typeof v === "string") return v;
  return "";
}

export function asString(v: RValue): string {
  if (v instanceof RString) return v.value;
  if (v instanceof RSymbol) return v.name;
  if (typeof v === "string") return v;
  if (v == null) return "";
  return String(v);
}

export function asNumber(v: RValue): number {
  return typeof v === "number" ? v : 0;
}

export function ivar(obj: RObject, name: string): RValue {
  const row = obj.ivars.find(([k]) => k === name);
  return row ? row[1] : null;
}

export function setIvar(obj: RObject, name: string, value: RValue) {
  const i = obj.ivars.findIndex(([k]) => k === name);
  if (i >= 0) obj.ivars[i] = [name, value];
  else obj.ivars.push([name, value]);
}

export function rstr(s: string) {
  return new RString(s, true);
}

export function rsym(name: string) {
  return new RSymbol(name);
}

export function hashGet(h: RHash, name: string): RValue | undefined {
  for (const [k, v] of h.entries) {
    if (symName(k) === name) return v;
  }
  return undefined;
}

export function hashSet(h: RHash, key: RValue, value: RValue) {
  const name = symName(key);
  const i = h.entries.findIndex(([k]) => symName(k) === name);
  if (i >= 0) h.entries[i] = [h.entries[i]![0], value];
  else h.entries.push([key, value]);
}
