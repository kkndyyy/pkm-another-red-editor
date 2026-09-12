import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { l as require_react_dom, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCcw, c as FolderOpen, i as Search, l as Download, n as Trash2, o as Plus, r as Smartphone, s as HardDrive, u as CloudOff } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BouaY-Ye.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var TYPES = [
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
	"FAIRY"
];
var CATEGORIES = [
	"Physical",
	"Special",
	"Status"
];
var ENCOUNTER_TYPES = [
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
	"BugContest"
];
var EVO_METHODS = [
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
	"None"
];
var WILD_CHANCE_PRESETS = [
	{
		value: 100,
		label: "항상 100%"
	},
	{
		value: 50,
		label: "흔함 50%"
	},
	{
		value: 5,
		label: "드묾 5%"
	},
	{
		value: 1,
		label: "희귀 1%"
	}
];
function snapWildChance(n) {
	const v = Number(n);
	if (!Number.isFinite(v) || v >= 100) return 100;
	if (v >= 20) return 50;
	if (v >= 3) return 5;
	return 1;
}
function uniqueIds(ids) {
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const raw of ids) {
		const id = raw.trim().toUpperCase();
		if (!id || seen.has(id)) continue;
		seen.add(id);
		out.push(id);
	}
	return out;
}
/** 세 칸이 모두 같은 도구 하나면 게임에서 100%. */
function wildItemsFromBuckets(common, uncommon, rare) {
	const c = uniqueIds(common);
	const u = uniqueIds(uncommon);
	const r = uniqueIds(rare);
	if (c.length === 1 && u.length === 1 && r.length === 1 && c[0] === u[0] && u[0] === r[0]) return [{
		item: c[0],
		chance: 100
	}];
	const out = [];
	for (const item of c) out.push({
		item,
		chance: 50
	});
	for (const item of u) out.push({
		item,
		chance: 5
	});
	for (const item of r) out.push({
		item,
		chance: 1
	});
	return out;
}
function wildItemsToBuckets(items) {
	const common = [];
	const uncommon = [];
	const rare = [];
	const always = [];
	for (const row of items || []) {
		const id = (row.item || "").trim().toUpperCase();
		if (!id) continue;
		const chance = snapWildChance(row.chance);
		if (chance >= 100) always.push(id);
		else if (chance >= 50) common.push(id);
		else if (chance >= 5) uncommon.push(id);
		else rare.push(id);
	}
	if (always.length) {
		const all = uniqueIds(always);
		return {
			common: uniqueIds([...all, ...common]),
			uncommon: uniqueIds([...all, ...uncommon]),
			rare: uniqueIds([...all, ...rare])
		};
	}
	return {
		common: uniqueIds(common),
		uncommon: uniqueIds(uncommon),
		rare: uniqueIds(rare)
	};
}
var SPECIES_KEY_ORDER = [
	"Name",
	"InternalName",
	"Type1",
	"Type2",
	"BaseStats",
	"GenderRate",
	"GrowthRate",
	"BaseEXP",
	"EffortPoints",
	"Rareness",
	"Happiness",
	"Abilities",
	"HiddenAbility",
	"Moves",
	"EggMoves",
	"TutorMoves",
	"WildItemCommon",
	"WildItemUncommon",
	"WildItemRare",
	"Compatibility",
	"StepsToHatch",
	"Height",
	"Weight",
	"Color",
	"Shape",
	"Habitat",
	"Kind",
	"Pokedex",
	"Generation",
	"Evolutions"
];
var MOVE_KEY_ORDER = [
	"Name",
	"Type",
	"Category",
	"Power",
	"Accuracy",
	"TotalPP",
	"Target",
	"Priority",
	"FunctionCode",
	"EffectChance",
	"Flags",
	"Description"
];
function stripBom(text) {
	return text.replace(/^\uFEFF/, "");
}
function parseSections(text) {
	const lines = stripBom(text).replace(/\r\n/g, "\n").split("\n");
	const out = [];
	let cur = null;
	for (const raw of lines) {
		const line = raw.trim();
		if (!line || line.startsWith("#")) continue;
		const sec = line.match(/^\[([^\]]+)\]$/);
		if (sec) {
			cur = {
				id: sec[1].trim(),
				fields: {},
				order: []
			};
			out.push(cur);
			continue;
		}
		if (!cur) continue;
		const eq = line.indexOf("=");
		if (eq < 1) continue;
		const key = line.slice(0, eq).trim();
		const val = line.slice(eq + 1).trim();
		if (!(key in cur.fields)) cur.order.push(key);
		cur.fields[key] = val;
	}
	return out;
}
function splitList(v) {
	if (!v) return [];
	return v.split(",").map((s) => s.trim()).filter(Boolean);
}
function parseMovesField(v) {
	const parts = splitList(v);
	const moves = [];
	for (let i = 0; i + 1 < parts.length; i += 2) {
		const level = Number(parts[i]);
		const move = parts[i + 1];
		if (!move) continue;
		moves.push({
			level: Number.isFinite(level) ? level : 1,
			move: move.toUpperCase()
		});
	}
	return moves;
}
function parseEvolutions(v) {
	const parts = splitList(v);
	const evo = [];
	for (let i = 0; i + 2 < parts.length; i += 3) evo.push({
		target: parts[i].toUpperCase(),
		method: parts[i + 1],
		param: parts[i + 2]
	});
	return evo;
}
function parseStats(v) {
	const n = splitList(v).map((x) => Number(x) || 0);
	return {
		hp: n[0] ?? 1,
		atk: n[1] ?? 1,
		def: n[2] ?? 1,
		spd: n[3] ?? 1,
		spa: n[4] ?? 1,
		spdF: n[5] ?? 1
	};
}
var KNOWN_SPECIES = /* @__PURE__ */ new Set([
	"Name",
	"InternalName",
	"Type1",
	"Type2",
	"BaseStats",
	"Abilities",
	"HiddenAbility",
	"Moves",
	"TutorMoves",
	"WildItemCommon",
	"WildItemUncommon",
	"WildItemRare",
	"Evolutions"
]);
var KNOWN_MOVE = /* @__PURE__ */ new Set([
	"Name",
	"InternalName",
	"Type",
	"Category",
	"Power",
	"BaseDamage",
	"Accuracy",
	"TotalPP",
	"PP",
	"Target",
	"Priority",
	"FunctionCode",
	"EffectChance",
	"Flags",
	"Description"
]);
function parsePokemonPbs(text) {
	const issues = [];
	const species = [];
	const sections = parseSections(text);
	if (sections.length === 0 && text.trim() && !text.includes("[")) issues.push({
		file: "pokemon.txt",
		message: "섹션 헤더 [번호]가 없습니다."
	});
	for (const sec of sections) {
		const id = Number(sec.id);
		if (!Number.isFinite(id)) issues.push({
			file: "pokemon.txt",
			message: `종족 섹션 ID가 숫자가 아닙니다: ${sec.id}`
		});
		const extra = {};
		for (const [k, v] of Object.entries(sec.fields)) if (!KNOWN_SPECIES.has(k)) extra[k] = v;
		const types = [sec.fields.Type1, sec.fields.Type2].filter(Boolean);
		species.push({
			id: Number.isFinite(id) ? id : species.length + 1,
			internalName: (sec.fields.InternalName || `SPECIES_${sec.id}`).toUpperCase(),
			name: sec.fields.Name || sec.fields.InternalName || sec.id,
			types: types.length ? types.map((t) => t.toUpperCase()) : ["NORMAL"],
			baseStats: parseStats(sec.fields.BaseStats),
			abilities: splitList(sec.fields.Abilities).map((a) => a.toUpperCase()),
			hiddenAbility: (sec.fields.HiddenAbility || "").toUpperCase(),
			levelMoves: parseMovesField(sec.fields.Moves),
			tutorMoves: splitList(sec.fields.TutorMoves).map((a) => a.toUpperCase()),
			wildItems: wildItemsFromBuckets(splitList(sec.fields.WildItemCommon), splitList(sec.fields.WildItemUncommon), splitList(sec.fields.WildItemRare)),
			evolutions: parseEvolutions(sec.fields.Evolutions),
			extra
		});
	}
	return {
		species,
		issues
	};
}
function asCategory(v) {
	const c = (v || "Physical").replace(/^[a-z]/, (s) => s.toUpperCase());
	if (CATEGORIES.includes(c)) return c;
	if (c === "Phys") return "Physical";
	if (c === "Spec") return "Special";
	return "Status";
}
function parseMovesPbs(text) {
	const issues = [];
	const trimmed = stripBom(text).trim();
	if (!trimmed) return {
		moves: [],
		issues
	};
	if (/^\s*\[/m.test(trimmed)) {
		const sections = parseSections(text);
		const moves = [];
		let i = 1;
		for (const sec of sections) {
			const extra = {};
			for (const [k, v] of Object.entries(sec.fields)) if (!KNOWN_MOVE.has(k)) extra[k] = v;
			const power = Number(sec.fields.Power ?? sec.fields.BaseDamage ?? 0) || 0;
			moves.push({
				id: Number(sec.fields.ID) || i,
				internalName: (sec.fields.InternalName || sec.id).toUpperCase(),
				name: sec.fields.Name || sec.id,
				type: (sec.fields.Type || "NORMAL").toUpperCase(),
				category: asCategory(sec.fields.Category),
				power,
				accuracy: Number(sec.fields.Accuracy ?? 100) || 0,
				pp: Number(sec.fields.TotalPP ?? sec.fields.PP ?? 10) || 1,
				functionCode: sec.fields.FunctionCode || "None",
				effectChance: Number(sec.fields.EffectChance ?? 0) || 0,
				priority: Number(sec.fields.Priority ?? 0) || 0,
				flags: sec.fields.Flags || "",
				target: sec.fields.Target || "NearOther",
				description: stripQuotes(sec.fields.Description || ""),
				extra
			});
			i += 1;
		}
		return {
			moves,
			issues
		};
	}
	const moves = [];
	const lines = stripBom(text).replace(/\r\n/g, "\n").split("\n");
	let lineNo = 0;
	for (const raw of lines) {
		lineNo += 1;
		const line = raw.trim();
		if (!line || line.startsWith("#")) continue;
		const cols = splitCsv(line);
		if (cols.length < 8) {
			issues.push({
				file: "moves.txt",
				line: lineNo,
				message: "CSV 열이 부족합니다."
			});
			continue;
		}
		moves.push({
			id: Number(cols[0]) || moves.length + 1,
			internalName: (cols[1] || `MOVE_${cols[0]}`).toUpperCase(),
			name: cols[2] || cols[1] || "",
			functionCode: cols[3] || "None",
			power: Number(cols[4]) || 0,
			type: (cols[5] || "NORMAL").toUpperCase(),
			category: asCategory(cols[6]),
			accuracy: Number(cols[7]) || 0,
			pp: Number(cols[8]) || 1,
			effectChance: Number(cols[9]) || 0,
			target: cols[10] || "00",
			priority: Number(cols[11]) || 0,
			flags: cols[12] || "",
			description: stripQuotes(cols[13] || ""),
			extra: {}
		});
	}
	return {
		moves,
		issues
	};
}
function stripQuotes(s) {
	return s.replace(/^"(.*)"$/s, "$1");
}
function splitCsv(line) {
	const out = [];
	let cur = "";
	let inQ = false;
	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (inQ) {
			if (ch === "\"" && line[i + 1] === "\"") {
				cur += "\"";
				i += 1;
			} else if (ch === "\"") inQ = false;
			else cur += ch;
		} else if (ch === "\"") inQ = true;
		else if (ch === ",") {
			out.push(cur.trim());
			cur = "";
		} else cur += ch;
	}
	out.push(cur.trim());
	return out;
}
function serializePokemonPbs(species) {
	return `# 레드포지 — pokemon.txt (Pokémon Essentials PBS)\n${species.map((s) => {
		const extra = { ...s.extra };
		delete extra.TutorMoves;
		delete extra.WildItemCommon;
		delete extra.WildItemUncommon;
		delete extra.WildItemRare;
		const buckets = wildItemsToBuckets(s.wildItems);
		const fields = {
			Name: s.name,
			InternalName: s.internalName,
			Type1: s.types[0] || "NORMAL",
			...s.types[1] ? { Type2: s.types[1] } : {},
			BaseStats: [
				s.baseStats.hp,
				s.baseStats.atk,
				s.baseStats.def,
				s.baseStats.spd,
				s.baseStats.spa,
				s.baseStats.spdF
			].join(","),
			Abilities: s.abilities.filter(Boolean).join(","),
			...s.hiddenAbility ? { HiddenAbility: s.hiddenAbility } : {},
			Moves: s.levelMoves.map((m) => `${m.level},${m.move}`).join(","),
			...s.tutorMoves?.length ? { TutorMoves: s.tutorMoves.join(",") } : {},
			...buckets.common.length ? { WildItemCommon: buckets.common.join(",") } : {},
			...buckets.uncommon.length ? { WildItemUncommon: buckets.uncommon.join(",") } : {},
			...buckets.rare.length ? { WildItemRare: buckets.rare.join(",") } : {},
			...s.evolutions.length ? { Evolutions: s.evolutions.map((e) => `${e.target},${e.method},${e.param}`).join(",") } : {},
			...extra
		};
		const body = [...SPECIES_KEY_ORDER.filter((k) => k in fields && fields[k]), ...Object.keys(fields).filter((k) => !SPECIES_KEY_ORDER.includes(k))].map((k) => `${k}=${fields[k]}`).join("\n");
		return `[${s.id}]\n${body}`;
	}).join("\n\n")}\n`;
}
function serializeMovesPbs(moves) {
	return `# 레드포지 — moves.txt (Pokémon Essentials PBS)\n${moves.map((m) => {
		const fields = {
			Name: m.name,
			Type: m.type,
			Category: m.category,
			Power: String(m.power),
			Accuracy: String(m.accuracy),
			TotalPP: String(m.pp),
			Target: m.target || "NearOther",
			Priority: String(m.priority),
			FunctionCode: m.functionCode || "None",
			EffectChance: String(m.effectChance),
			Flags: m.flags,
			Description: m.description,
			...m.extra
		};
		const body = [...MOVE_KEY_ORDER.filter((k) => k in fields && fields[k] !== ""), ...Object.keys(fields).filter((k) => !MOVE_KEY_ORDER.includes(k) && fields[k] !== "")].map((k) => `${k} = ${fields[k]}`).join("\n");
		return `[${m.internalName}]\n${body}`;
	}).join("\n\n")}\n`;
}
function bst(s) {
	const b = s.baseStats;
	return b.hp + b.atk + b.def + b.spd + b.spa + b.spdF;
}
function sp(id, internalName, name, types, stats, abilities, hidden, moves, evo = [], extra = {}) {
	return {
		id,
		internalName,
		name,
		types,
		baseStats: {
			hp: stats[0],
			atk: stats[1],
			def: stats[2],
			spd: stats[3],
			spa: stats[4],
			spdF: stats[5]
		},
		abilities,
		hiddenAbility: hidden,
		levelMoves: moves.map(([level, move]) => ({
			level,
			move
		})),
		tutorMoves: [],
		wildItems: [],
		evolutions: evo.map(([target, method, param]) => ({
			target,
			method,
			param
		})),
		extra
	};
}
function mv(id, internalName, name, type, category, power, accuracy, pp, functionCode, effectChance, description, extra = {}) {
	return {
		id,
		internalName,
		name,
		type,
		category,
		power,
		accuracy,
		pp,
		functionCode,
		effectChance,
		priority: extra.priority ?? 0,
		flags: extra.flags ?? (category === "Status" ? "b" : "abef"),
		target: extra.target ?? "NearOther",
		description,
		extra: {}
	};
}
var SAMPLE_ABILITIES = [
	{
		internalName: "OVERGROW",
		name: "심록",
		description: "HP가 줄면 풀 기술의 위력이 올라간다."
	},
	{
		internalName: "BLAZE",
		name: "맹화",
		description: "HP가 줄면 불꽃 기술의 위력이 올라간다."
	},
	{
		internalName: "TORRENT",
		name: "급류",
		description: "HP가 줄면 물 기술의 위력이 올라간다."
	},
	{
		internalName: "STATIC",
		name: "정전기",
		description: "접촉한 상대를 마비시킬 때가 있다."
	},
	{
		internalName: "LIGHTNINGROD",
		name: "피뢰침",
		description: "전기 기술을 끌어모아 특공을 올린다."
	},
	{
		internalName: "CHLOROPHYLL",
		name: "엽록소",
		description: "맑은 날 스피드가 올라간다."
	},
	{
		internalName: "SOLARPOWER",
		name: "선파워",
		description: "맑은 날 특공이 오르지만 HP가 줄어든다."
	},
	{
		internalName: "INTIMIDATE",
		name: "위협",
		description: "등장하면 상대의 공격을 떨어뜨린다."
	},
	{
		internalName: "GUTS",
		name: "근성",
		description: "상태 이상일 때 공격이 올라간다."
	},
	{
		internalName: "PROTEAN",
		name: "변환자재",
		description: "기술을 쓰면 그 타입으로 변한다."
	},
	{
		internalName: "LIBERO",
		name: "리베로",
		description: "기술을 쓰면 그 타입으로 변한다."
	},
	{
		internalName: "LONGREACH",
		name: "원격",
		description: "접촉 기술도 접촉하지 않은 것으로 친다."
	},
	{
		internalName: "TECHNICIAN",
		name: "테크니션",
		description: "위력 60 이하 기술의 위력이 올라간다."
	},
	{
		internalName: "ADAPTABILITY",
		name: "적응력",
		description: "자속 보정이 더 강해진다."
	},
	{
		internalName: "LEVITATE",
		name: "부유",
		description: "땅 타입 기술을 받지 않는다."
	},
	{
		internalName: "PRESSURE",
		name: "프레셔",
		description: "상대의 PP를 더 많이 줄인다."
	},
	{
		internalName: "INNERFOCUS",
		name: "정신력",
		description: "풀죽지 않는다."
	},
	{
		internalName: "SWIFTSSWIM",
		name: "쓱쓱",
		description: "비 오는 날 스피드가 올라간다."
	},
	{
		internalName: "SWIFTSWIM",
		name: "쓱쓱",
		description: "비 오는 날 스피드가 올라간다."
	},
	{
		internalName: "THICKFAT",
		name: "두꺼운지방",
		description: "불꽃·얼음 기술의 데미지를 줄인다."
	},
	{
		internalName: "CUTECHARM",
		name: "헤롱헤롱바디",
		description: "접촉한 상대를 헤롱헤롱하게 만들 때가 있다."
	},
	{
		internalName: "SYNCHRONIZE",
		name: "싱크로",
		description: "상태 이상을 상대에게 옮긴다."
	},
	{
		internalName: "TRACE",
		name: "트레이스",
		description: "상대의 특성을 복사한다."
	},
	{
		internalName: "TELEPATHY",
		name: "텔레파시",
		description: "아군의 공격을 받지 않는다."
	},
	{
		internalName: "MAGICGUARD",
		name: "매직가드",
		description: "공격 이외의 데미지를 입지 않는다."
	},
	{
		internalName: "FLASHFIRE",
		name: "타오르는불꽃",
		description: "불꽃 기술을 무효로 하고 위력을 올린다."
	},
	{
		internalName: "DROUGHT",
		name: "가뭄",
		description: "등장하면 날씨를 맑게 만든다."
	},
	{
		internalName: "DRIZZLE",
		name: "잔비",
		description: "등장하면 비를 내리게 한다."
	},
	{
		internalName: "SANDSTREAM",
		name: "모래날림",
		description: "등장하면 모래바람을 일으킨다."
	},
	{
		internalName: "SNOWWARNING",
		name: "눈퍼뜨리기",
		description: "등장하면 눈을 내리게 한다."
	},
	{
		internalName: "MOXIE",
		name: "자기과신",
		description: "상대를 쓰러뜨리면 공격이 올라간다."
	},
	{
		internalName: "SHEERFORCE",
		name: "우격다짐",
		description: "부가효과를 포기하고 위력을 올린다."
	},
	{
		internalName: "TINTEDLENS",
		name: "색안경",
		description: "효과가 별로인 기술의 위력을 올린다."
	},
	{
		internalName: "TINTED_LENS",
		name: "색안경",
		description: "효과가 별로인 기술의 위력을 올린다."
	},
	{
		internalName: "COMPOUNDEYES",
		name: "복안",
		description: "기술의 명중률이 올라간다."
	},
	{
		internalName: "KEENEYE",
		name: "날카로운눈",
		description: "명중률이 떨어지지 않는다."
	},
	{
		internalName: "RUNAWAY",
		name: "도주",
		description: "야생 포켓몬에게서 반드시 도망친다."
	},
	{
		internalName: "PICKUP",
		name: "픽업",
		description: "배틀이 끝나면 도구를 줍는다."
	},
	{
		internalName: "LIMBER",
		name: "유연",
		description: "마비되지 않는다."
	},
	{
		internalName: "BATTLEARMOR",
		name: "전투무장",
		description: "급소에 맞지 않는다."
	},
	{
		internalName: "STURDY",
		name: "옹골참",
		description: "한 방에 쓰러지지 않는다."
	},
	{
		internalName: "ROCKHEAD",
		name: "돌머리",
		description: "반동 데미지를 입지 않는다."
	},
	{
		internalName: "MULTISCALE",
		name: "멀티스케일",
		description: "HP가 가득일 때 데미지를 줄인다."
	},
	{
		internalName: "REGENERATOR",
		name: "재생력",
		description: "교체하면 HP를 조금 회복한다."
	}
];
var SAMPLE_MOVES = [
	mv(1, "TACKLE", "몸통박치기", "NORMAL", "Physical", 40, 100, 35, "None", 0, "온몸으로 상대에게 부딪쳐 공격한다."),
	mv(2, "GROWL", "울음소리", "NORMAL", "Status", 0, 100, 40, "LowerTargetAtk1", 100, "귀여운 울음소리로 상대의 공격을 떨어뜨린다.", { flags: "b" }),
	mv(3, "SCRATCH", "할퀴기", "NORMAL", "Physical", 40, 100, 35, "None", 0, "단단한 발톱으로 상대를 할퀴어 공격한다."),
	mv(4, "LEER", "째려보기", "NORMAL", "Status", 0, 100, 30, "LowerTargetDef1", 100, "날카로운 눈초리로 상대의 방어를 떨어뜨린다.", { flags: "b" }),
	mv(5, "EMBER", "불꽃세례", "FIRE", "Special", 40, 100, 25, "BurnChance", 10, "작은 불꽃을 상대에게 발사한다. 화상 상태가 될 때가 있다."),
	mv(6, "WATERGUN", "물대포", "WATER", "Special", 40, 100, 25, "None", 0, "물을 상대에게 발사하여 공격한다.", { flags: "bef" }),
	mv(7, "VINEWHIP", "덩굴채찍", "GRASS", "Physical", 45, 100, 25, "None", 0, "채찍처럼 휘감아 공격한다."),
	mv(8, "LEAFAGE", "나뭇잎", "GRASS", "Physical", 40, 100, 40, "None", 0, "나뭇잎을 상대에게 부딪친다."),
	mv(9, "POUND", "막치기", "NORMAL", "Physical", 40, 100, 35, "None", 0, "긴 꼬리나 손 등으로 상대를 때려 공격한다."),
	mv(10, "QUICKATTACK", "전광석화", "NORMAL", "Physical", 40, 100, 30, "None", 0, "눈에 보이지 않는 굉장한 속도로 상대에게 돌진한다.", { priority: 1 }),
	mv(11, "THUNDERSHOCK", "전기쇼크", "ELECTRIC", "Special", 40, 100, 30, "ParalyzeChance", 10, "전기 자극을 상대에게 날린다. 마비 상태가 될 때가 있다.", { flags: "bef" }),
	mv(12, "THUNDERBOLT", "10만볼트", "ELECTRIC", "Special", 90, 100, 15, "ParalyzeChance", 10, "강한 전격을 상대에게 날린다. 마비 상태가 될 때가 있다.", { flags: "bef" }),
	mv(13, "THUNDERWAVE", "전기자석파", "ELECTRIC", "Status", 0, 90, 20, "ParalyzeTarget", 100, "약한 전격을 날려 상대를 마비시킨다.", { flags: "b" }),
	mv(14, "FLAMETHROWER", "화염방사", "FIRE", "Special", 90, 100, 15, "BurnChance", 10, "세찬 불꽃을 상대에게 발사한다. 화상 상태가 될 때가 있다.", { flags: "bef" }),
	mv(15, "SURF", "파도타기", "WATER", "Special", 90, 100, 15, "None", 0, "큰 파도로 자신의 주위에 있는 포켓몬을 공격한다.", {
		flags: "bef",
		target: "AllNearOthers"
	}),
	mv(16, "SOLARBEAM", "솔라빔", "GRASS", "Special", 120, 100, 10, "None", 0, "1턴째에 빛을 가득 모아 2턴째에 발사한다.", { flags: "bef" }),
	mv(17, "RAZORLEAF", "잎날가르기", "GRASS", "Physical", 55, 95, 25, "None", 0, "잎사귀를 날려 상대를 베어 공격한다. 급소에 맞기 쉽다."),
	mv(18, "BUBBLE", "거품", "WATER", "Special", 40, 100, 30, "LowerTargetSpd1", 10, "거품을 상대에게 부딪친다. 스피드가 떨어질 때가 있다.", { flags: "bef" }),
	mv(19, "WATERPULSE", "물의파동", "WATER", "Special", 60, 100, 20, "ConfuseChance", 20, "물의 진동을 상대에게 가하여 공격한다. 혼란시킬 때가 있다.", { flags: "bef" }),
	mv(20, "NIGHTSLASH", "깜짝베기", "DARK", "Physical", 70, 100, 15, "None", 0, "순간적으로 틈을 노려 베어 공격한다. 급소에 맞기 쉽다."),
	mv(21, "SHADOWBALL", "섀도볼", "GHOST", "Special", 80, 100, 15, "LowerTargetSpdF1", 20, "검은 그림자의 덩어리를 내던진다. 특방이 떨어질 때가 있다.", { flags: "bef" }),
	mv(22, "PSYCHIC", "사이코키네시스", "PSYCHIC", "Special", 90, 100, 10, "LowerTargetSpdF1", 10, "강한 염동력을 상대에게 보내어 공격한다.", { flags: "bef" }),
	mv(23, "ICEBEAM", "냉동빔", "ICE", "Special", 90, 100, 10, "FreezeChance", 10, "냉동빔을 상대에게 발사한다. 얼음 상태가 될 때가 있다.", { flags: "bef" }),
	mv(24, "BLIZZARD", "눈보라", "ICE", "Special", 110, 70, 5, "FreezeChance", 10, "세찬 눈보라를 상대에게 내뿜는다.", { flags: "bef" }),
	mv(25, "EARTHQUAKE", "지진", "GROUND", "Physical", 100, 100, 10, "None", 0, "지진의 충격으로 자신의 주위에 있는 포켓몬을 공격한다.", {
		flags: "e",
		target: "AllNearOthers"
	}),
	mv(26, "STONEEDGE", "스톤에지", "ROCK", "Physical", 100, 80, 5, "None", 0, "뾰족한 바위를 상대에게 꿰뚫는다. 급소에 맞기 쉽다."),
	mv(27, "CLOSECOMBAT", "인파이트", "FIGHTING", "Physical", 120, 100, 5, "None", 0, "방심하고 혼신의 힘으로 공격한다. 자신의 방어와 특방이 떨어진다."),
	mv(28, "AERIALACE", "제비반환", "FLYING", "Physical", 60, 0, 20, "AlwaysHit", 0, "빠른 속도로 상대를 농락하여 벤다. 공격은 반드시 명중한다."),
	mv(29, "BRAVEBIRD", "브레이브버드", "FLYING", "Physical", 120, 100, 15, "RecoilThird", 0, "날개를 접어 저공비행으로 돌격한다. 자신도 데미지를 입는다."),
	mv(30, "DRACOMETEOR", "용성군", "DRAGON", "Special", 130, 90, 5, "None", 0, "하늘의 성스러운 힘을 상대에게 떨어뜨린다. 자신의 특공이 크게 떨어진다.", { flags: "bef" }),
	mv(31, "DARKPULSE", "악의파동", "DARK", "Special", 80, 100, 15, "FlinchChance", 20, "악의 아우라를 내뿜는다. 상대를 풀죽게 만들 때가 있다.", { flags: "bef" }),
	mv(32, "MOONBLAST", "문포스", "FAIRY", "Special", 95, 100, 15, "LowerTargetSpa1", 30, "달의 힘을 빌려 상대를 공격한다. 특공이 떨어질 때가 있다.", { flags: "bef" }),
	mv(33, "DAZZLINGGLEAM", "매지컬샤인", "FAIRY", "Special", 80, 100, 10, "None", 0, "강력한 빛을 내어 상대를 공격한다.", {
		flags: "bef",
		target: "AllNearOthers"
	}),
	mv(34, "IRONTAIL", "아이언테일", "STEEL", "Physical", 100, 75, 15, "LowerTargetDef1", 30, "단단한 꼬리로 때려부순다. 방어가 떨어질 때가 있다."),
	mv(35, "FLASHCANNON", "러스터캐논", "STEEL", "Special", 80, 100, 10, "LowerTargetSpdF1", 10, "빛의 덩어리를 상대에게 발사한다.", { flags: "bef" }),
	mv(36, "SLUDGEBOMB", "오물폭탄", "POISON", "Special", 90, 100, 10, "PoisonChance", 30, "더러운 오물을 상대에게 내던진다. 독 상태가 될 때가 있다.", { flags: "bef" }),
	mv(37, "TOXIC", "맹독", "POISON", "Status", 0, 90, 10, "BadlyPoisonTarget", 100, "상대를 맹독 상태로 만든다.", { flags: "b" }),
	mv(38, "SWORDSDANCE", "칼춤", "NORMAL", "Status", 0, 0, 20, "RaiseUserAtk2", 100, "싸움의 춤을 추며 기세를 높여 공격을 크게 올린다.", {
		flags: "b",
		target: "User"
	}),
	mv(39, "CALMMIND", "명상", "PSYCHIC", "Status", 0, 0, 20, "None", 0, "마음을 가라앉혀 특공과 특방을 올린다.", {
		flags: "b",
		target: "User"
	}),
	mv(40, "RECOVER", "HP회복", "NORMAL", "Status", 0, 0, 5, "HealUserHalfOfTotalHP", 100, "체력을 최대 HP의 절반만큼 회복한다.", {
		flags: "b",
		target: "User"
	}),
	mv(41, "PROTECT", "방어", "NORMAL", "Status", 0, 0, 10, "None", 0, "상대의 공격을 받지 않는다. 연속으로 쓰면 실패하기 쉽다.", {
		flags: "",
		target: "User",
		priority: 4
	}),
	mv(42, "SUBSTITUTE", "대타출동", "NORMAL", "Status", 0, 0, 10, "None", 0, "자신의 HP를 조금 깎아 분신을 만든다.", {
		flags: "b",
		target: "User"
	}),
	mv(43, "U_TURN", "유턴", "BUG", "Physical", 70, 100, 20, "SwitchOutUser", 0, "공격한 뒤 다른 포켓몬과 교체한다."),
	mv(44, "VOLTSWITCH", "볼트체인지", "ELECTRIC", "Special", 70, 100, 20, "SwitchOutUser", 0, "공격한 뒤 다른 포켓몬과 교체한다.", { flags: "bef" }),
	mv(45, "LEAFSTORM", "리프스톰", "GRASS", "Special", 130, 90, 5, "None", 0, "날카로운 잎으로 상대를 둘러싼다. 자신의 특공이 크게 떨어진다.", { flags: "bef" }),
	mv(46, "GIGAIMPACT", "기가임팩트", "NORMAL", "Physical", 150, 90, 5, "None", 0, "모든 힘을 상대에게 부딪친다. 다음 턴은 움직일 수 없다."),
	mv(47, "HYPERBEAM", "파괴광선", "NORMAL", "Special", 150, 90, 5, "None", 0, "강한 광선을 상대에게 발사한다. 다음 턴은 움직일 수 없다.", { flags: "bef" }),
	mv(48, "DOUBLEKICK", "두번치기", "FIGHTING", "Physical", 30, 100, 30, "HitTwoTimes", 0, "2개의 다리로 상대를 걷어차 공격한다. 2회 연속으로 쓴다."),
	mv(49, "PINMISSILE", "바늘미사일", "BUG", "Physical", 25, 95, 20, "MultiHit", 0, "날카로운 침을 상대에게 발사하여 2~5회 연속으로 쓴다.", { flags: "bef" }),
	mv(50, "SLEEPPOWDER", "수면가루", "GRASS", "Status", 0, 75, 15, "SleepTarget", 100, "잠이 오는 가루를 상대에게 잔뜩 뿌려 잠들게 한다.", { flags: "b" }),
	mv(51, "FLOWERTRICK", "트릭플라워", "GRASS", "Physical", 70, 0, 10, "AlwaysHit", 0, "장식한 꽃다발로 공격한다. 반드시 명중하고 급소에 맞기 쉽다."),
	mv(52, "PYROBALL", "화염볼", "FIRE", "Physical", 120, 90, 5, "BurnChance", 10, "작은 돌을 발로 차 불타는 볼로 만든다."),
	mv(53, "WATERSHURIKEN", "물수리검", "WATER", "Special", 15, 100, 20, "MultiHit", 0, "점액으로 만든 수리검으로 2~5회 연속 공격한다. 반드시 선제 공격할 수 있다.", {
		priority: 1,
		flags: "bef"
	}),
	mv(54, "SUCKERPUNCH", "기습", "DARK", "Physical", 70, 100, 5, "None", 0, "상대보다 먼저 공격한다. 상대가 공격 기술을 쓰지 않으면 실패한다.", { priority: 1 }),
	mv(55, "NASTYPLOT", "나쁜음모", "DARK", "Status", 0, 0, 20, "None", 0, "나쁜 일을 생각해서 머리를 자극해 특공을 크게 올린다.", {
		flags: "b",
		target: "User"
	}),
	mv(56, "SPIRITSHACKLE", "그림자꿰매기", "GHOST", "Physical", 80, 100, 10, "None", 0, "상대의 그림자를 꿰매어 공격한다. 상대는 도망칠 수 없게 된다.", { flags: "bef" })
];
var SAMPLE_SPECIES = [
	sp(1, "BULBASAUR", "이상해씨", ["GRASS", "POISON"], [
		45,
		49,
		49,
		45,
		65,
		65
	], ["OVERGROW"], "CHLOROPHYLL", [
		[1, "TACKLE"],
		[1, "GROWL"],
		[7, "VINEWHIP"],
		[13, "RAZORLEAF"],
		[20, "SLEEPPOWDER"],
		[32, "SLUDGEBOMB"],
		[45, "SOLARBEAM"]
	], [[
		"IVYSAUR",
		"Level",
		"16"
	]], {
		GrowthRate: "Parabolic",
		BaseEXP: "64",
		Rareness: "45"
	}),
	sp(2, "IVYSAUR", "이상해풀", ["GRASS", "POISON"], [
		60,
		62,
		63,
		60,
		80,
		80
	], ["OVERGROW"], "CHLOROPHYLL", [
		[1, "TACKLE"],
		[1, "GROWL"],
		[7, "VINEWHIP"],
		[13, "RAZORLEAF"],
		[20, "SLEEPPOWDER"],
		[39, "SLUDGEBOMB"],
		[50, "SOLARBEAM"]
	], [[
		"VENUSAUR",
		"Level",
		"32"
	]]),
	sp(3, "VENUSAUR", "이상해꽃", ["GRASS", "POISON"], [
		80,
		82,
		83,
		80,
		100,
		100
	], ["OVERGROW"], "CHLOROPHYLL", [
		[1, "VINEWHIP"],
		[1, "GROWL"],
		[13, "RAZORLEAF"],
		[20, "SLEEPPOWDER"],
		[39, "SLUDGEBOMB"],
		[53, "SOLARBEAM"],
		[60, "LEAFSTORM"]
	]),
	sp(4, "CHARMANDER", "파이리", ["FIRE"], [
		39,
		52,
		43,
		65,
		60,
		50
	], ["BLAZE"], "SOLARPOWER", [
		[1, "SCRATCH"],
		[1, "GROWL"],
		[7, "EMBER"],
		[16, "FLAMETHROWER"],
		[40, "GIGAIMPACT"]
	], [[
		"CHARMELEON",
		"Level",
		"16"
	]]),
	sp(5, "CHARMELEON", "리자드", ["FIRE"], [
		58,
		64,
		58,
		80,
		80,
		65
	], ["BLAZE"], "SOLARPOWER", [
		[1, "SCRATCH"],
		[7, "EMBER"],
		[20, "FLAMETHROWER"],
		[48, "GIGAIMPACT"]
	], [[
		"CHARIZARD",
		"Level",
		"36"
	]]),
	sp(6, "CHARIZARD", "리자몽", ["FIRE", "FLYING"], [
		78,
		84,
		78,
		100,
		109,
		85
	], ["BLAZE"], "SOLARPOWER", [
		[1, "EMBER"],
		[1, "SCRATCH"],
		[20, "FLAMETHROWER"],
		[36, "AERIALACE"],
		[54, "BRAVEBIRD"],
		[62, "GIGAIMPACT"]
	]),
	sp(7, "SQUIRTLE", "꼬부기", ["WATER"], [
		44,
		48,
		65,
		43,
		50,
		64
	], ["TORRENT"], "SWIFTSWIM", [
		[1, "TACKLE"],
		[1, "TAILWHIP".replace("TAILWHIP", "GROWL")],
		[8, "WATERGUN"],
		[15, "WATERPULSE"],
		[33, "SURF"]
	], [[
		"WARTORTLE",
		"Level",
		"16"
	]]),
	sp(8, "WARTORTLE", "어니부기", ["WATER"], [
		59,
		63,
		80,
		58,
		65,
		80
	], ["TORRENT"], "SWIFTSWIM", [
		[1, "TACKLE"],
		[8, "WATERGUN"],
		[15, "WATERPULSE"],
		[40, "SURF"]
	], [[
		"BLASTOISE",
		"Level",
		"36"
	]]),
	sp(9, "BLASTOISE", "거북왕", ["WATER"], [
		79,
		83,
		100,
		78,
		85,
		105
	], ["TORRENT"], "SWIFTSWIM", [
		[1, "WATERGUN"],
		[15, "WATERPULSE"],
		[40, "SURF"],
		[56, "HYPERBEAM"],
		[62, "ICEBEAM"]
	]),
	sp(25, "PIKACHU", "피카츄", ["ELECTRIC"], [
		35,
		55,
		40,
		90,
		50,
		50
	], ["STATIC"], "LIGHTNINGROD", [
		[1, "QUICKATTACK"],
		[1, "GROWL"],
		[4, "THUNDERSHOCK"],
		[15, "THUNDERWAVE"],
		[26, "THUNDERBOLT"],
		[45, "VOLTSWITCH"]
	], [[
		"RAICHU",
		"Item",
		"THUNDERSTONE"
	]]),
	sp(26, "RAICHU", "라이츄", ["ELECTRIC"], [
		60,
		90,
		55,
		110,
		90,
		80
	], ["STATIC"], "LIGHTNINGROD", [
		[1, "THUNDERSHOCK"],
		[1, "QUICKATTACK"],
		[1, "THUNDERBOLT"],
		[1, "THUNDERWAVE"]
	]),
	sp(94, "GENGAR", "팬텀", ["GHOST", "POISON"], [
		60,
		65,
		60,
		110,
		130,
		75
	], ["LEVITATE"], "LEVITATE", [
		[1, "SHADOWBALL"],
		[1, "SLUDGEBOMB"],
		[1, "SUCKERPUNCH"],
		[12, "TOXIC"],
		[28, "DARKPULSE"],
		[40, "NASTYPLOT"],
		[48, "SHADOWBALL"]
	]),
	sp(130, "GYARADOS", "갸라도스", ["WATER", "FLYING"], [
		95,
		125,
		79,
		81,
		60,
		100
	], ["INTIMIDATE"], "MOXIE", [
		[1, "TACKLE"],
		[20, "BITE".replace("BITE", "LEER")],
		[25, "WATERPULSE"],
		[32, "SURF"],
		[41, "ICEBEAM"],
		[52, "HYPERBEAM"],
		[60, "EARTHQUAKE"]
	]),
	sp(133, "EEVEE", "이브이", ["NORMAL"], [
		55,
		55,
		50,
		55,
		45,
		65
	], ["RUNAWAY", "ADAPTABILITY"], "ANTICIPATION".replace("ANTICIPATION", "CUTECHARM"), [
		[1, "TACKLE"],
		[1, "GROWL"],
		[10, "QUICKATTACK"],
		[20, "BITE".replace("BITE", "TACKLE")],
		[33, "GIGAIMPACT"]
	], [
		[
			"VAPOREON",
			"Item",
			"WATERSTONE"
		],
		[
			"JOLTEON",
			"Item",
			"THUNDERSTONE"
		],
		[
			"FLAREON",
			"Item",
			"FIRESTONE"
		]
	]),
	sp(134, "VAPOREON", "샤미드", ["WATER"], [
		130,
		65,
		60,
		65,
		110,
		95
	], ["WATERABSORB".replace("WATERABSORB", "TORRENT")], "HYDRATION".replace("HYDRATION", "SWIFTSWIM"), [
		[1, "WATERGUN"],
		[1, "TACKLE"],
		[20, "WATERPULSE"],
		[33, "SURF"],
		[45, "ICEBEAM"],
		[50, "RECOVER"]
	]),
	sp(135, "JOLTEON", "쥬피썬더", ["ELECTRIC"], [
		65,
		65,
		60,
		130,
		110,
		95
	], ["VOLTABSORB".replace("VOLTABSORB", "STATIC")], "QUICKFEET".replace("QUICKFEET", "LIGHTNINGROD"), [
		[1, "THUNDERSHOCK"],
		[1, "QUICKATTACK"],
		[20, "THUNDERWAVE"],
		[33, "THUNDERBOLT"],
		[45, "VOLTSWITCH"],
		[50, "PINMISSILE"]
	]),
	sp(136, "FLAREON", "부스터", ["FIRE"], [
		65,
		130,
		60,
		65,
		95,
		110
	], ["FLASHFIRE"], "GUTS", [
		[1, "EMBER"],
		[1, "TACKLE"],
		[20, "QUICKATTACK"],
		[33, "FLAMETHROWER"],
		[45, "GIGAIMPACT"]
	]),
	sp(149, "DRAGONITE", "망나뇽", ["DRAGON", "FLYING"], [
		91,
		134,
		95,
		80,
		100,
		100
	], ["INNERFOCUS"], "MULTISCALE", [
		[1, "TACKLE"],
		[20, "AERIALACE"],
		[35, "AQUATAIL".replace("AQUATAIL", "SURF")],
		[41, "DRACOMETEOR"],
		[50, "HYPERBEAM"],
		[61, "OUTRAGE".replace("OUTRAGE", "GIGAIMPACT")]
	]),
	sp(150, "MEWTWO", "뮤츠", ["PSYCHIC"], [
		106,
		110,
		90,
		130,
		154,
		90
	], ["PRESSURE"], "UNNERVE".replace("UNNERVE", "INNERFOCUS"), [
		[1, "PSYCHIC"],
		[1, "SHADOWBALL"],
		[1, "RECOVER"],
		[22, "CALMMIND"],
		[40, "AURASPHERE".replace("AURASPHERE", "CLOSECOMBAT")],
		[50, "PSYCHIC"],
		[70, "HYPERBEAM"]
	]),
	sp(151, "MEW", "뮤", ["PSYCHIC"], [
		100,
		100,
		100,
		100,
		100,
		100
	], ["SYNCHRONIZE"], "SYNCHRONIZE", [
		[1, "POUND"],
		[10, "PSYCHIC"],
		[20, "CALMMIND"],
		[30, "SHADOWBALL"],
		[40, "AURA".replace("AURA", "DAZZLINGGLEAM")],
		[50, "RECOVER"],
		[70, "HYPERBEAM"]
	]),
	sp(197, "UMBREON", "블래키", ["DARK"], [
		95,
		65,
		110,
		65,
		60,
		130
	], ["SYNCHRONIZE"], "INNERFOCUS", [
		[1, "TACKLE"],
		[1, "GROWL"],
		[20, "DARKPULSE"],
		[33, "TOXIC"],
		[40, "MOONBLAST"],
		[50, "RECOVER"]
	]),
	sp(282, "GARDEVOIR", "가디안", ["PSYCHIC", "FAIRY"], [
		68,
		65,
		65,
		80,
		125,
		115
	], ["SYNCHRONIZE", "TRACE"], "TELEPATHY", [
		[1, "GROWL"],
		[1, "POUND"],
		[18, "PSYCHIC"],
		[26, "DAZZLINGGLEAM"],
		[34, "CALMMIND"],
		[48, "MOONBLAST"],
		[56, "HYPERBEAM"]
	]),
	sp(448, "LUCARIO", "루카리오", ["FIGHTING", "STEEL"], [
		70,
		110,
		70,
		90,
		115,
		70
	], ["STEADFAST".replace("STEADFAST", "INNERFOCUS"), "INNERFOCUS"], "JUSTIFIED".replace("JUSTIFIED", "GUTS"), [
		[1, "QUICKATTACK"],
		[1, "METALCLAW".replace("METALCLAW", "SCRATCH")],
		[12, "DOUBLEKICK"],
		[24, "FLASHCANNON"],
		[36, "CLOSECOMBAT"],
		[48, "SWORDSDANCE"],
		[60, "GIGAIMPACT"]
	]),
	sp(658, "GRENINJA", "개굴닌자", ["WATER", "DARK"], [
		72,
		95,
		67,
		122,
		103,
		71
	], ["TORRENT"], "PROTEAN", [
		[1, "POUND"],
		[1, "GROWL"],
		[5, "WATERGUN"],
		[14, "QUICKATTACK"],
		[21, "WATERPULSE"],
		[33, "NIGHTSLASH"],
		[42, "WATERSHURIKEN"],
		[56, "SURF"],
		[70, "HYDROPUMP".replace("HYDROPUMP", "DARKPULSE")]
	], [], {
		Kind: "시노비포켓몬",
		Pokedex: "수행을 쌓아 닌자의 경지에 도달했다. 물로 만든 수리검은 철판도 가른다."
	}),
	sp(724, "DECIDUEYE", "모부기로", ["GRASS", "GHOST"], [
		78,
		107,
		75,
		70,
		100,
		100
	], ["OVERGROW"], "LONGREACH", [
		[1, "TACKLE"],
		[1, "GROWL"],
		[1, "LEAFAGE"],
		[16, "RAZORLEAF"],
		[28, "SUCKERPUNCH"],
		[36, "SPIRITSHACKLE"],
		[48, "LEAFSTORM"],
		[55, "BRAVEBIRD"]
	]),
	sp(813, "SCORBUNNY", "염버니", ["FIRE"], [
		50,
		71,
		40,
		69,
		40,
		40
	], ["BLAZE"], "LIBERO", [
		[1, "TACKLE"],
		[1, "GROWL"],
		[6, "EMBER"],
		[12, "QUICKATTACK"],
		[24, "DOUBLEKICK"],
		[36, "FLAMETHROWER"]
	], [[
		"RABOOT",
		"Level",
		"16"
	]], { Kind: "토끼포켓몬" }),
	sp(814, "RABOOT", "래비풋", ["FIRE"], [
		65,
		86,
		60,
		94,
		55,
		60
	], ["BLAZE"], "LIBERO", [
		[1, "TACKLE"],
		[6, "EMBER"],
		[12, "QUICKATTACK"],
		[24, "DOUBLEKICK"],
		[36, "FLAMETHROWER"],
		[48, "PYROBALL"]
	], [[
		"CINDERACE",
		"Level",
		"35"
	]]),
	sp(815, "CINDERACE", "에이스번", ["FIRE"], [
		80,
		116,
		75,
		119,
		65,
		75
	], ["BLAZE"], "LIBERO", [
		[1, "EMBER"],
		[1, "QUICKATTACK"],
		[12, "DOUBLEKICK"],
		[24, "U_TURN"],
		[38, "PYROBALL"],
		[54, "GIGAIMPACT"],
		[62, "FLAMETHROWER"]
	]),
	sp(906, "SPRIGATITO", "나오하", ["GRASS", "DARK"], [
		40,
		61,
		54,
		65,
		45,
		45
	], ["OVERGROW"], "PROTEAN", [
		[1, "SCRATCH"],
		[1, "GROWL"],
		[7, "LEAFAGE"],
		[13, "QUICKATTACK"],
		[18, "BITE".replace("BITE", "SUCKERPUNCH")],
		[25, "NIGHTSLASH"]
	], [[
		"FLORAGATO",
		"Level",
		"16"
	]], {
		Kind: "풀고양이포켓몬",
		Pokedex: "어나더레드 스타팅. 풀과 악 타입을 함께 지닌다. 변환자재로 타입을 바꿔 싸운다."
	}),
	sp(907, "FLORAGATO", "나로테", ["GRASS", "DARK"], [
		61,
		80,
		63,
		83,
		60,
		63
	], ["OVERGROW"], "PROTEAN", [
		[1, "SCRATCH"],
		[7, "LEAFAGE"],
		[13, "QUICKATTACK"],
		[20, "SUCKERPUNCH"],
		[28, "NIGHTSLASH"],
		[38, "FLOWERTRICK"]
	], [[
		"MEOWSCARADA",
		"Level",
		"36"
	]]),
	sp(908, "MEOWSCARADA", "마스카나", ["GRASS", "DARK"], [
		76,
		110,
		70,
		123,
		81,
		70
	], ["OVERGROW"], "PROTEAN", [
		[1, "LEAFAGE"],
		[1, "SUCKERPUNCH"],
		[16, "NIGHTSLASH"],
		[28, "U_TURN"],
		[36, "FLOWERTRICK"],
		[48, "LEAFSTORM"],
		[56, "NASTYPLOT"]
	]),
	sp(656, "FROAKIE", "개굴마리", ["WATER"], [
		41,
		56,
		40,
		71,
		62,
		44
	], ["TORRENT"], "PROTEAN", [
		[1, "POUND"],
		[1, "GROWL"],
		[5, "WATERGUN"],
		[10, "QUICKATTACK"],
		[21, "WATERPULSE"]
	], [[
		"FROGADIER",
		"Level",
		"16"
	]]),
	sp(657, "FROGADIER", "개굴반장", ["WATER"], [
		54,
		63,
		52,
		97,
		83,
		56
	], ["TORRENT"], "PROTEAN", [
		[1, "POUND"],
		[5, "WATERGUN"],
		[14, "QUICKATTACK"],
		[21, "WATERPULSE"],
		[33, "NIGHTSLASH"]
	], [[
		"GRENINJA",
		"Level",
		"36"
	]]),
	sp(4481, "RIOLU", "리오르", ["FIGHTING"], [
		40,
		70,
		40,
		60,
		35,
		40
	], ["STEADFAST".replace("STEADFAST", "INNERFOCUS"), "INNERFOCUS"], "PRANKSTER".replace("PRANKSTER", "GUTS"), [
		[1, "QUICKATTACK"],
		[1, "GROWL"],
		[8, "DOUBLEKICK"],
		[24, "SCREECH".replace("SCREECH", "LEER")],
		[32, "CLOSECOMBAT"]
	], [[
		"LUCARIO",
		"Happiness",
		"220"
	]])
];
SAMPLE_SPECIES[SAMPLE_SPECIES.length - 1].id = 447;
SAMPLE_SPECIES[SAMPLE_SPECIES.length - 1].internalName = "RIOLU";
var sprigSample = SAMPLE_SPECIES.find((s) => s.internalName === "SPRIGATITO");
if (sprigSample) sprigSample.tutorMoves = [
	"U_TURN",
	"GIGADRAIN",
	"ENERGYBALL",
	"ACROBATICS",
	"GRASSKNOT"
];
function buildSampleWorkspace() {
	const species = SAMPLE_SPECIES;
	const moves = SAMPLE_MOVES;
	return {
		species,
		moves,
		abilities: SAMPLE_ABILITIES,
		originalPokemonText: serializePokemonPbs(species),
		originalMovesText: serializeMovesPbs(moves),
		sourceLabel: "샘플 데이터 (어나더레드 스타일 스타팅 포함)"
	};
}
function validateWorkspace(species, moves) {
	const issues = [];
	const moveIds = new Set(moves.map((m) => m.internalName));
	const specIds = new Set(species.map((s) => s.internalName));
	const seenSpec = /* @__PURE__ */ new Set();
	const seenMove = /* @__PURE__ */ new Set();
	const seenNum = /* @__PURE__ */ new Set();
	for (const s of species) {
		const key = s.internalName;
		if (seenSpec.has(key)) issues.push({
			level: "error",
			scope: "species",
			key,
			message: `내부ID 중복: ${key}`
		});
		seenSpec.add(key);
		if (seenNum.has(s.id) && !s.internalName.includes("_")) issues.push({
			level: "warn",
			scope: "species",
			key,
			message: `번호 중복: ${s.id}`
		});
		seenNum.add(s.id);
		if (!s.name.trim()) issues.push({
			level: "error",
			scope: "species",
			key,
			message: "이름이 비어 있습니다."
		});
		for (const [stat, v] of Object.entries(s.baseStats)) if (v < 1 || v > 255) issues.push({
			level: "error",
			scope: "species",
			key,
			message: `종족값 ${stat}는 1~255여야 합니다 (${v}).`
		});
		const total = bst(s);
		if (total > 1200) issues.push({
			level: "warn",
			scope: "species",
			key,
			message: `종족값 합 ${total}이 비정상적으로 높습니다.`
		});
		for (const mv of s.levelMoves) {
			if (!moveIds.has(mv.move)) issues.push({
				level: "error",
				scope: "species",
				key,
				message: `없는 기술 ${mv.move} (Lv.${mv.level})`
			});
			if (mv.level < -1 || mv.level > 100) issues.push({
				level: "error",
				scope: "species",
				key,
				message: `기술 레벨 ${mv.level}은 -1~100이어야 합니다.`
			});
		}
		for (const tm of s.tutorMoves || []) if (tm && !moveIds.has(tm)) issues.push({
			level: "error",
			scope: "species",
			key,
			message: `기술머신에 없는 기술 ${tm}`
		});
		for (const row of s.wildItems || []) {
			if (!row.item) issues.push({
				level: "error",
				scope: "species",
				key,
				message: "소지 도구가 비어 있습니다."
			});
			const c = Number(row.chance);
			if (!Number.isFinite(c) || c < 1 || c > 100) issues.push({
				level: "error",
				scope: "species",
				key,
				message: `소지 확률 ${row.chance}은 1~100이어야 합니다.`
			});
			else if (![
				1,
				5,
				50,
				100
			].includes(c)) issues.push({
				level: "warn",
				scope: "species",
				key,
				message: `소지 확률 ${c}%는 저장 시 50·5·1·100 중 가까운 값으로 바뀝니다.`
			});
		}
		for (const e of s.evolutions) {
			if (e.target && !specIds.has(e.target)) issues.push({
				level: "error",
				scope: "species",
				key,
				message: `진화 대상 ${e.target}이 도감에 없습니다.`
			});
			if (e.method === "Level") {
				const n = Number(e.param);
				if (!Number.isFinite(n) || n < 1 || n > 100) issues.push({
					level: "error",
					scope: "species",
					key,
					message: `진화 레벨 ${e.param}이 유효하지 않습니다.`
				});
			}
		}
	}
	for (const m of moves) {
		const key = m.internalName;
		if (seenMove.has(key)) issues.push({
			level: "error",
			scope: "move",
			key,
			message: `기술 내부ID 중복: ${key}`
		});
		seenMove.add(key);
		if (!m.name.trim()) issues.push({
			level: "error",
			scope: "move",
			key,
			message: "기술 이름이 비어 있습니다."
		});
		if (m.pp < 1 || m.pp > 40) issues.push({
			level: m.pp === 0 ? "error" : "warn",
			scope: "move",
			key,
			message: `PP ${m.pp} (권장 1~40)`
		});
		if (m.accuracy < 0 || m.accuracy > 100) issues.push({
			level: "error",
			scope: "move",
			key,
			message: `명중 ${m.accuracy}은 0~100이어야 합니다.`
		});
		if (m.power === 0 && m.category !== "Status") issues.push({
			level: "warn",
			scope: "move",
			key,
			message: "위력 0인데 물리/특수입니다. 변화기로 바꾸는 것을 권장합니다."
		});
		if (m.power > 0 && m.category === "Status") issues.push({
			level: "warn",
			scope: "move",
			key,
			message: "변화기인데 위력이 있습니다."
		});
		if (m.effectChance < 0 || m.effectChance > 255) issues.push({
			level: "error",
			scope: "move",
			key,
			message: `부가효과 확률 ${m.effectChance}은 0~255여야 합니다.`
		});
	}
	return issues;
}
function issuesFor(issues, scope, key) {
	return issues.filter((i) => i.scope === scope && i.key === key);
}
/** Ruby Marshal 4.8 (RGSS / Pokémon Essentials .dat). */
var RSymbol = class {
	name;
	constructor(name) {
		this.name = name;
	}
};
var RString = class {
	value;
	utf8;
	extra;
	constructor(value, utf8 = true, extra = []) {
		this.value = value;
		this.utf8 = utf8;
		this.extra = extra;
	}
};
var RArray = class {
	items;
	constructor(items) {
		this.items = items;
	}
};
var RHash = class {
	entries;
	constructor(entries) {
		this.entries = entries;
	}
};
var RObject = class {
	className;
	ivars;
	constructor(className, ivars) {
		this.className = className;
		this.ivars = ivars;
	}
};
var T = {
	NIL: 48,
	TRUE: 84,
	FALSE: 70,
	FIXNUM: 105,
	ARRAY: 91,
	SYMBOL: 58,
	STRING: 34,
	IVAR: 73,
	HASH: 123,
	FLOAT: 102,
	BIGNUM: 108,
	SYMLINK: 59,
	LINK: 64,
	OBJECT: 111,
	USERDEF: 117,
	USRMARSHAL: 85,
	CLASS: 99,
	MODULE: 109,
	REGEXP: 47,
	HASH_DEF: 125
};
var Reader = class {
	pos = 0;
	symbols = [];
	objects = [];
	constructor(buf) {
		this.buf = buf;
	}
	buf;
	u8() {
		if (this.pos >= this.buf.length) throw new Error("marshal: unexpected end");
		return this.buf[this.pos++];
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
	read(inIvar = false) {
		const token = this.u8();
		let objectIndex = null;
		if (token === T.CLASS || token === T.MODULE || token === T.FLOAT || token === T.BIGNUM || token === T.STRING || token === T.REGEXP || token === T.ARRAY || token === T.HASH || token === T.HASH_DEF || token === T.OBJECT || token === T.USERDEF || token === T.USRMARSHAL) {
			objectIndex = this.objects.length;
			this.objects.push(null);
		}
		let result = null;
		if (token === T.NIL) result = null;
		else if (token === T.TRUE) result = true;
		else if (token === T.FALSE) result = false;
		else if (token === T.IVAR) result = this.read(true);
		else if (token === T.STRING) result = this.blob();
		else if (token === T.SYMBOL) {
			const sym = new RSymbol(new TextDecoder("utf-8").decode(this.blob()));
			this.symbols.push(sym);
			result = sym;
		} else if (token === T.SYMLINK) result = this.symbols[this.long()];
		else if (token === T.FIXNUM) result = this.long();
		else if (token === T.ARRAY) {
			const n = this.long();
			const items = [];
			result = new RArray(items);
			if (objectIndex != null) this.objects[objectIndex] = result;
			for (let i = 0; i < n; i++) items.push(this.read());
		} else if (token === T.HASH || token === T.HASH_DEF) {
			const n = this.long();
			const entries = [];
			result = new RHash(entries);
			if (objectIndex != null) this.objects[objectIndex] = result;
			for (let i = 0; i < n; i++) entries.push([this.read(), this.read()]);
			if (token === T.HASH_DEF) this.read();
		} else if (token === T.FLOAT) {
			const raw = new TextDecoder("utf-8").decode(this.blob()).split("\0")[0];
			result = Number(raw);
		} else if (token === T.BIGNUM) {
			const sign = this.u8() === 43 ? 1 : -1;
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
		} else if (token === T.LINK) result = this.objects[this.long()] ?? null;
		else if (token === T.OBJECT) {
			const cls = this.read();
			if (!(cls instanceof RSymbol)) throw new Error("marshal: object class");
			const ivars = this.readAttributes();
			result = new RObject(cls.name, ivars);
		} else if (token === T.MODULE || token === T.CLASS) result = new RObject(new TextDecoder("utf-8").decode(this.blob()), []);
		else throw new Error(`marshal: unknown token 0x${token.toString(16)} at ${this.pos - 1}`);
		if (inIvar) {
			const attributes = this.readAttributes();
			if (token === T.STRING || result instanceof Uint8Array) {
				const utf8 = attributes.some(([k, v]) => k === "E" && v === true);
				const bytes = result instanceof Uint8Array ? result : /* @__PURE__ */ new Uint8Array();
				result = new RString(new TextDecoder(utf8 ? "utf-8" : "latin1").decode(bytes), utf8, attributes.filter(([k]) => k !== "E" && k !== "encoding"));
			} else if (result instanceof RObject) result.ivars.push(...attributes);
		}
		if (objectIndex != null) this.objects[objectIndex] = result;
		return result;
	}
	readAttributes() {
		const n = this.long();
		const attrs = [];
		for (let i = 0; i < n; i++) {
			const name = this.read();
			const value = this.read();
			const key = name instanceof RSymbol ? name.name : String(name);
			attrs.push([key, value]);
		}
		return attrs;
	}
};
var Writer = class {
	chunks = [];
	symbols = /* @__PURE__ */ new Map();
	objects = /* @__PURE__ */ new Map();
	u8(n) {
		this.chunks.push(n & 255);
	}
	sbyte(n) {
		this.u8(n < 0 ? n + 256 : n);
	}
	long(obj) {
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
		} else if (n < 0) n += factor;
		const sign = obj < 0 ? -size : size;
		this.sbyte(sign);
		for (let i = 0; i < size; i++) {
			this.u8(n % 256);
			n = Math.floor(n / 256);
		}
	}
	blob(bytes) {
		this.long(bytes.length);
		for (let i = 0; i < bytes.length; i++) this.chunks.push(bytes[i]);
	}
	text(s) {
		this.blob(new TextEncoder().encode(s));
	}
	mustWrite(obj) {
		const existing = this.objects.get(obj);
		if (existing != null) {
			this.u8(T.LINK);
			this.long(existing);
			return false;
		}
		this.objects.set(obj, this.objects.size);
		return true;
	}
	write(obj) {
		if (obj === null) this.u8(T.NIL);
		else if (obj === true) this.u8(T.TRUE);
		else if (obj === false) this.u8(T.FALSE);
		else if (typeof obj === "number") {
			if (Number.isInteger(obj) && Math.abs(obj) < 2 ** 30) {
				this.u8(T.FIXNUM);
				this.long(obj);
			} else if (Number.isInteger(obj)) {
				this.u8(T.BIGNUM);
				this.u8(obj < 0 ? 45 : 43);
				let n = Math.abs(obj);
				const words = [];
				while (n > 0) {
					words.push(n % 65536);
					n = Math.floor(n / 65536);
				}
				if (words.length === 0) words.push(0);
				this.long(words.length);
				for (const w of words) {
					this.u8(w & 255);
					this.u8(w >> 8 & 255);
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
		} else throw new Error(`marshal: cannot dump ${obj}`);
	}
	writeSymbol(obj) {
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
	writeRubyString(obj) {
		if (!this.mustWrite(obj)) return;
		const encoded = new TextEncoder().encode(obj.value);
		this.u8(T.IVAR);
		this.u8(T.STRING);
		this.blob(encoded);
		const attrs = [["E", obj.utf8], ...obj.extra];
		this.writeAttributes(attrs);
	}
	writeAttributes(attrs) {
		this.long(attrs.length);
		for (const [k, v] of attrs) {
			this.writeSymbol(new RSymbol(k));
			this.write(v);
		}
	}
	bytes() {
		return Uint8Array.from(this.chunks);
	}
};
function marshalLoad(buf) {
	if (buf[0] !== 4 || buf[1] !== 8) throw new Error("marshal: not 4.8");
	return new Reader(buf.subarray(2)).read();
}
function marshalDump(obj) {
	const w = new Writer();
	w.u8(4);
	w.u8(8);
	w.write(obj);
	return w.bytes();
}
function isHash(v) {
	return v instanceof RHash;
}
function isObject(v) {
	return v instanceof RObject;
}
function isArray(v) {
	return v instanceof RArray;
}
function symName(v) {
	if (v instanceof RSymbol) return v.name;
	if (v instanceof RString) return v.value;
	if (typeof v === "string") return v;
	return "";
}
function asString(v) {
	if (v instanceof RString) return v.value;
	if (v instanceof RSymbol) return v.name;
	if (typeof v === "string") return v;
	if (v == null) return "";
	return String(v);
}
function asNumber(v) {
	return typeof v === "number" ? v : 0;
}
function ivar(obj, name) {
	const row = obj.ivars.find(([k]) => k === name);
	return row ? row[1] : null;
}
function setIvar(obj, name, value) {
	const i = obj.ivars.findIndex(([k]) => k === name);
	if (i >= 0) obj.ivars[i] = [name, value];
	else obj.ivars.push([name, value]);
}
function rstr(s) {
	return new RString(s, true);
}
function rsym(name) {
	return new RSymbol(name);
}
function hashGet(h, name) {
	for (const [k, v] of h.entries) if (symName(k) === name) return v;
}
function hashSet(h, key, value) {
	const name = symName(key);
	const i = h.entries.findIndex(([k]) => symName(k) === name);
	if (i >= 0) h.entries[i] = [h.entries[i][0], value];
	else h.entries.push([key, value]);
}
var STAT_KEYS = [
	"HP",
	"ATTACK",
	"DEFENSE",
	"SPEED",
	"SPECIAL_ATTACK",
	"SPECIAL_DEFENSE"
];
var CAT = [
	"Physical",
	"Special",
	"Status"
];
var LEVELISH = /^(Level|LevelMale|LevelFemale|LevelDay|LevelNight|LevelMorning|LevelAfternoon|LevelEvening|LevelRain|LevelWalk|LevelUseMoveCount|LevelRecoilDamage|LevelDarkInParty|Beauty)/;
function parseNamesKo(json) {
	const o = json || {};
	return {
		species: o.species || {},
		moves: o.moves || {},
		abilities: o.abilities || {},
		forms: o.forms || {}
	};
}
function displayName(en, map) {
	return map && map[en] || en;
}
function listOfSyms(v) {
	if (!isArray(v)) return [];
	return v.items.map((x) => symName(x)).filter(Boolean);
}
function numHash(v) {
	const out = {};
	if (!isHash(v)) return out;
	for (const [k, val] of v.entries) out[symName(k)] = asNumber(val);
	return out;
}
function speciesFromDat(bytes, names) {
	const root = marshalLoad(bytes);
	if (!isHash(root)) throw new Error("species.dat 형식이 아닙니다.");
	const out = [];
	let dex = 0;
	for (const [, val] of root.entries) {
		if (!isObject(val)) continue;
		const internalName = symName(ivar(val, "@id")) || symName(ivar(val, "@species"));
		const form = asNumber(ivar(val, "@form"));
		if (form === 0) dex += 1;
		const en = asString(ivar(val, "@real_name")) || internalName;
		const formEn = asString(ivar(val, "@real_form_name"));
		let name = displayName(en, names.species);
		if (formEn) {
			const formKo = displayName(formEn, names.forms);
			if (formKo && formKo !== name) name = `${name} (${formKo})`;
		}
		const types = listOfSyms(ivar(val, "@types"));
		const stats = numHash(ivar(val, "@base_stats"));
		const abilities = listOfSyms(ivar(val, "@abilities"));
		const hidden = listOfSyms(ivar(val, "@hidden_abilities"));
		const tutorMoves = listOfSyms(ivar(val, "@tutor_moves"));
		const wildItems = wildItemsFromBuckets(listOfSyms(ivar(val, "@wild_item_common")), listOfSyms(ivar(val, "@wild_item_uncommon")), listOfSyms(ivar(val, "@wild_item_rare")));
		const movesRaw = ivar(val, "@moves");
		const levelMoves = [];
		if (isArray(movesRaw)) for (const row of movesRaw.items) {
			if (!isArray(row) || row.items.length < 2) continue;
			levelMoves.push({
				level: asNumber(row.items[0]),
				move: symName(row.items[1])
			});
		}
		const evoRaw = ivar(val, "@evolutions");
		const evolutions = [];
		if (isArray(evoRaw)) for (const row of evoRaw.items) {
			if (!isArray(row) || row.items.length < 2) continue;
			const param = row.items[2];
			evolutions.push({
				target: symName(row.items[0]),
				method: symName(row.items[1]) || "None",
				param: param == null ? "" : param instanceof RSymbol ? param.name : String(asNumber(param) || asString(param)),
				reverse: row.items[3] === true
			});
		}
		out.push({
			id: dex,
			internalName,
			name,
			types: types.length ? types : ["NORMAL"],
			baseStats: {
				hp: stats.HP || 1,
				atk: stats.ATTACK || 1,
				def: stats.DEFENSE || 1,
				spd: stats.SPEED || 1,
				spa: stats.SPECIAL_ATTACK || 1,
				spdF: stats.SPECIAL_DEFENSE || 1
			},
			abilities,
			hiddenAbility: hidden[0] || "",
			levelMoves,
			tutorMoves,
			wildItems,
			evolutions,
			extra: {
				realName: en,
				form: String(form),
				formName: formEn
			}
		});
	}
	return out;
}
function movesFromDat(bytes, names) {
	const root = marshalLoad(bytes);
	if (!isHash(root)) throw new Error("moves.dat 형식이 아닙니다.");
	const out = [];
	let i = 1;
	for (const [, val] of root.entries) {
		if (!isObject(val)) continue;
		const internalName = symName(ivar(val, "@id"));
		const en = asString(ivar(val, "@real_name")) || internalName;
		const catN = asNumber(ivar(val, "@category"));
		const flagsRaw = ivar(val, "@flags");
		const flags = isArray(flagsRaw) ? flagsRaw.items.map((x) => asString(x)).filter(Boolean).join(",") : asString(flagsRaw);
		out.push({
			id: i++,
			internalName,
			name: displayName(en, names.moves),
			type: symName(ivar(val, "@type")) || "NORMAL",
			category: CAT[catN] ?? "Status",
			power: asNumber(ivar(val, "@power")),
			accuracy: asNumber(ivar(val, "@accuracy")),
			pp: asNumber(ivar(val, "@total_pp")) || 1,
			functionCode: asString(ivar(val, "@function_code")) || "None",
			effectChance: asNumber(ivar(val, "@effect_chance")),
			priority: asNumber(ivar(val, "@priority")),
			flags,
			target: symName(ivar(val, "@target")) || "NearOther",
			description: asString(ivar(val, "@real_description")),
			extra: { realName: en }
		});
	}
	return out;
}
function abilitiesFromDat(bytes, names) {
	const root = marshalLoad(bytes);
	if (!isHash(root)) return [];
	const out = [];
	for (const [, val] of root.entries) {
		if (!isObject(val)) continue;
		const internalName = symName(ivar(val, "@id"));
		const en = asString(ivar(val, "@real_name")) || internalName;
		out.push({
			internalName,
			name: displayName(en, names.abilities),
			description: asString(ivar(val, "@real_description"))
		});
	}
	return out;
}
function flagList(flags) {
	return new RArray(flags.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean).map((p) => rstr(p)));
}
function evoParam(method, param, original) {
	if (!param) return null;
	if (original instanceof RSymbol && original.name === param) return original;
	if (typeof original === "number" && String(original) === param) return original;
	if (LEVELISH.test(method) || /^-?\d+$/.test(param)) {
		const n = Number(param);
		if (Number.isFinite(n)) return n;
	}
	return rsym(param);
}
function patchSpeciesDat(bytes, species) {
	const root = marshalLoad(bytes);
	if (!isHash(root)) throw new Error("species.dat 형식이 아닙니다.");
	const byId = new Map(species.map((s) => [s.internalName, s]));
	for (const [key, val] of root.entries) {
		if (!isObject(val)) continue;
		const id = symName(key) || symName(ivar(val, "@id"));
		const s = byId.get(id);
		if (!s) continue;
		setIvar(val, "@types", new RArray(s.types.filter(Boolean).map((t) => rsym(t))));
		const stats = ivar(val, "@base_stats");
		if (isHash(stats)) {
			hashSet(stats, rsym("HP"), s.baseStats.hp);
			hashSet(stats, rsym("ATTACK"), s.baseStats.atk);
			hashSet(stats, rsym("DEFENSE"), s.baseStats.def);
			hashSet(stats, rsym("SPEED"), s.baseStats.spd);
			hashSet(stats, rsym("SPECIAL_ATTACK"), s.baseStats.spa);
			hashSet(stats, rsym("SPECIAL_DEFENSE"), s.baseStats.spdF);
		} else setIvar(val, "@base_stats", new RHash(STAT_KEYS.map((k) => {
			const map = {
				HP: s.baseStats.hp,
				ATTACK: s.baseStats.atk,
				DEFENSE: s.baseStats.def,
				SPEED: s.baseStats.spd,
				SPECIAL_ATTACK: s.baseStats.spa,
				SPECIAL_DEFENSE: s.baseStats.spdF
			};
			return [rsym(k), map[k]];
		})));
		setIvar(val, "@abilities", new RArray(s.abilities.filter(Boolean).map((a) => rsym(a))));
		setIvar(val, "@hidden_abilities", new RArray(s.hiddenAbility ? [rsym(s.hiddenAbility)] : []));
		setIvar(val, "@moves", new RArray(s.levelMoves.map((m) => new RArray([m.level, rsym(m.move)]))));
		setIvar(val, "@tutor_moves", new RArray([...new Set((s.tutorMoves || []).map((m) => m.trim().toUpperCase()).filter(Boolean))].map((m) => rsym(m))));
		const buckets = wildItemsToBuckets(s.wildItems);
		setIvar(val, "@wild_item_common", new RArray(buckets.common.map((id) => rsym(id))));
		setIvar(val, "@wild_item_uncommon", new RArray(buckets.uncommon.map((id) => rsym(id))));
		setIvar(val, "@wild_item_rare", new RArray(buckets.rare.map((id) => rsym(id))));
		const origEvo = ivar(val, "@evolutions");
		const origRows = isArray(origEvo) ? origEvo.items : [];
		setIvar(val, "@evolutions", new RArray(s.evolutions.map((e, i) => {
			const prev = origRows[i];
			const prevItems = isArray(prev) ? prev.items : [];
			const param = evoParam(e.method, e.param, prevItems[2] ?? null);
			const reverse = e.reverse ?? prevItems[3] === true;
			return new RArray([
				rsym(e.target),
				rsym(e.method),
				param,
				reverse
			]);
		})));
		const real = s.extra.realName || asString(ivar(val, "@real_name"));
		if (real) setIvar(val, "@real_name", rstr(real));
	}
	return marshalDump(root);
}
function patchMovesDat(bytes, moves) {
	const root = marshalLoad(bytes);
	if (!isHash(root)) throw new Error("moves.dat 형식이 아닙니다.");
	const byId = new Map(moves.map((m) => [m.internalName, m]));
	for (const [key, val] of root.entries) {
		if (!isObject(val)) continue;
		const id = symName(key) || symName(ivar(val, "@id"));
		const m = byId.get(id);
		if (!m) continue;
		setIvar(val, "@type", rsym(m.type));
		setIvar(val, "@category", CAT.indexOf(m.category));
		setIvar(val, "@power", m.power);
		setIvar(val, "@accuracy", m.accuracy);
		setIvar(val, "@total_pp", m.pp);
		setIvar(val, "@function_code", rstr(m.functionCode || "None"));
		setIvar(val, "@effect_chance", m.effectChance);
		setIvar(val, "@priority", m.priority);
		setIvar(val, "@target", rsym(m.target || "NearOther"));
		if (isArray(ivar(val, "@flags")) || m.flags.includes(",")) setIvar(val, "@flags", flagList(m.flags));
		else setIvar(val, "@flags", rstr(m.flags));
		if (m.description) setIvar(val, "@real_description", rstr(m.description));
		const real = m.extra.realName || asString(ivar(val, "@real_name"));
		if (real) setIvar(val, "@real_name", rstr(real));
	}
	return marshalDump(root);
}
function patchMessagesNames(bytes, species, moves) {
	const root = marshalLoad(bytes);
	if (!isArray(root)) return bytes;
	const specMap = root.items[1];
	const moveMap = root.items[5];
	if (isHash(specMap)) for (const s of species) {
		const en = s.extra.realName;
		if (!en || !s.name) continue;
		const base = s.extra.formName ? s.name.replace(/ \([^)]+\)$/, "") : s.name;
		if (base === en) continue;
		if (asString(hashGet(specMap, en) ?? null) !== base) hashSet(specMap, specMap.entries.find(([k]) => asString(k) === en)?.[0] ?? rstr(en), rstr(base));
	}
	if (isHash(moveMap)) for (const m of moves) {
		const en = m.extra.realName;
		if (!en || !m.name || m.name === en) continue;
		if (asString(hashGet(moveMap, en) ?? null) !== m.name) hashSet(moveMap, moveMap.entries.find(([k]) => asString(k) === en)?.[0] ?? rstr(en), rstr(m.name));
	}
	return marshalDump(root);
}
function looksLikeMarshal(buf) {
	return buf.length >= 2 && buf[0] === 4 && buf[1] === 8;
}
function classifyDat(name, path, buf) {
	const n = `${path} ${name}`.toLowerCase();
	if (!looksLikeMarshal(buf)) return null;
	if (n.includes("encounter")) return "encounters";
	if (n.includes("species") && !n.includes("metric")) return "species";
	if (n.includes("moves") || /(^|[\\/])moves\.dat$/.test(n)) return "moves";
	if (n.includes("abilit")) return "abilities";
	if (n.includes("messages") && n.includes("kor") && n.includes("core")) return "messages";
	if (n.includes("messages_kor_core")) return "messages";
	try {
		const root = marshalLoad(buf);
		if (isHash(root) && root.entries[0]) {
			const v = root.entries[0][1];
			if (isObject(v)) {
				if (v.className.includes("Encounter")) return "encounters";
				if (v.className.includes("Species")) return "species";
				if (v.className.includes("Move") && !v.className.includes("Species")) return "moves";
				if (v.className.includes("Ability")) return "abilities";
			}
		}
		if (isArray(root) && root.items.length >= 6 && isHash(root.items[1]) && isHash(root.items[5])) return "messages";
	} catch {
		return null;
	}
	return null;
}
/** 어나더레드 맵 번호 → 게임에 나오는 장소 이름. */
var ANOTHER_RED_MAP_NAMES = {
	4: "상록시티",
	5: "상록시티 연못",
	7: "갈색시티",
	10: "1번도로",
	11: "2번도로",
	12: "3번도로",
	14: "디그다의 굴",
	16: "8번도로",
	17: "4번도로",
	18: "달맞이산",
	19: "달맞이산 지하1층",
	20: "달맞이산 지하2층",
	22: "5번도로",
	23: "6번도로",
	24: "7번도로",
	25: "12번도로",
	26: "9번도로",
	27: "10번도로",
	29: "돌산터널",
	30: "돌산터널 지하1층",
	31: "11번도로",
	32: "노랑시티",
	33: "13번도로",
	34: "14번도로",
	36: "15번도로",
	37: "16번도로",
	38: "17번도로",
	39: "18번도로",
	40: "19번수로",
	42: "20번수로",
	43: "쌍둥이섬",
	44: "쌍둥이섬 지하1층",
	45: "쌍둥이섬 지하2층",
	46: "쌍둥이섬 지하3층",
	47: "쌍둥이섬 지하4층",
	48: "21번수로",
	49: "22번도로",
	50: "23번도로",
	51: "24번도로",
	55: "태초마을",
	58: "연분홍시티",
	59: "홍련섬",
	70: "상록숲",
	79: "홍련 해역",
	80: "홍련 해역 북쪽",
	81: "21번수로 연안",
	82: "19번수로 먼바다",
	83: "20번수로 먼바다",
	84: "연분홍 해역",
	85: "갈색시티 해역",
	86: "소용돌이섬 해역",
	88: "담청 해역",
	89: "상록숲 지하기지",
	91: "절구산 지하1층",
	92: "절구산 지하2층",
	97: "금빛수로",
	98: "은빛산 초입",
	99: "26번도로",
	100: "은빛산 동굴",
	101: "28번도로",
	102: "은빛산",
	104: "너도밤나무숲",
	105: "자연공원",
	106: "30번도로",
	107: "어둠의 동굴 동쪽",
	108: "31번도로",
	109: "32번도로",
	110: "연결동굴",
	111: "연결동굴 지하1층",
	112: "연결동굴 지하2층",
	113: "34번도로",
	114: "35번도로",
	115: "36번도로",
	116: "37번도로",
	117: "38번도로",
	118: "39번도로",
	119: "42번도로",
	120: "40번수로",
	122: "41번수로",
	123: "소용돌이섬",
	124: "소용돌이섬 지하1층",
	125: "소용돌이섬 지하2층",
	127: "43번도로",
	128: "동성폭포",
	129: "동성폭포 내부",
	130: "44번도로",
	131: "45번도로",
	132: "담청수로",
	133: "리틀알로라 외곽",
	134: "얼음샛길",
	135: "얼음샛길 지하1층",
	136: "얼음샛길 지하2층",
	137: "얼음샛길 지하3층",
	138: "46번도로",
	139: "어둠의 동굴",
	140: "47번도로",
	144: "분노의호수",
	145: "담청시티",
	153: "포켓몬의 쉼터 2층",
	178: "포켓몬의 쉼터 3층",
	185: "무인발전소",
	238: "숨겨진 정원",
	240: "폐 건설장",
	241: "리틀알로라",
	242: "사파리존 들판",
	243: "사파리존 늪지",
	244: "사파리존 타이가",
	245: "사파리존 사막",
	248: "뜨거운 동굴",
	251: "깊은 바다 동굴",
	354: "용의굴",
	370: "알프의 유적",
	376: "울트라스페이스",
	378: "존재하지 않는 과거",
	379: "존재할 수 없는 미래",
	391: "존재하지 않는 과거",
	392: "존재할 수 없는 미래",
	393: "울트라스페이스"
};
function mapDisplayName(mapId, version = 0) {
	const base = ANOTHER_RED_MAP_NAMES[mapId];
	if (!base) return version ? `맵 ${mapId} (v${version})` : `맵 ${mapId}`;
	return version ? `${base} (v${version})` : base;
}
function encounterKey(mapId, version) {
	return `${mapId}:${version}`;
}
function newEncounterSlot(species, existing, min = 5, max = 10) {
	const leftover = 100 - existing.reduce((sum, row) => sum + (row.chance ?? 0), 0);
	return {
		species,
		min,
		max,
		chance: leftover > 0 ? leftover : 1
	};
}
function slotFromRow(row) {
	if (!isArray(row) || row.items.length < 1) return null;
	const a = row.items;
	const firstSym = a[0] instanceof RSymbol ? a[0].name : symName(a[0]);
	const secondSym = a[1] instanceof RSymbol ? a[1].name : a.length > 1 ? symName(a[1]) : "";
	if (typeof a[0] === "number" && secondSym) return {
		chance: asNumber(a[0]),
		species: secondSym,
		min: asNumber(a[2]) || 1,
		max: asNumber(a[3]) || asNumber(a[2]) || 1
	};
	const species = firstSym || secondSym;
	if (!species) return null;
	return {
		species,
		min: asNumber(a[1]) || 1,
		max: asNumber(a[2]) || asNumber(a[1]) || 1
	};
}
function parseId(key, obj) {
	const id = ivar(obj, "@id");
	if (isArray(id) && id.items.length >= 1) return {
		mapId: asNumber(id.items[0]),
		version: asNumber(id.items[1]) || 0
	};
	if (id instanceof RSymbol) {
		const m = id.name.match(/^(\d+)_(\d+)$/);
		if (m) return {
			mapId: Number(m[1]),
			version: Number(m[2]) || 0
		};
	}
	if (key instanceof RSymbol) {
		const m = key.name.match(/^(\d+)_(\d+)$/);
		if (m) return {
			mapId: Number(m[1]),
			version: Number(m[2]) || 0
		};
	}
	if (isArray(key) && key.items.length >= 1) return {
		mapId: asNumber(key.items[0]),
		version: asNumber(key.items[1]) || 0
	};
	return {
		mapId: asNumber(ivar(obj, "@map")) || asNumber(key),
		version: asNumber(ivar(obj, "@version")) || 0
	};
}
function encountersFromDat(bytes) {
	const root = marshalLoad(bytes);
	if (!isHash(root)) throw new Error("encounters.dat 형식이 아닙니다.");
	const out = [];
	for (const [key, val] of root.entries) {
		if (!isObject(val)) continue;
		const { mapId, version } = parseId(key, val);
		const chancesRaw = ivar(val, "@step_chances");
		const stepChances = {};
		if (isHash(chancesRaw)) for (const [k, v] of chancesRaw.entries) stepChances[symName(k) || String(asNumber(k))] = asNumber(v);
		const typesRaw = ivar(val, "@types");
		const slots = {};
		if (isHash(typesRaw)) for (const [k, v] of typesRaw.entries) {
			const t = symName(k);
			if (!t || !isArray(v)) continue;
			slots[t] = v.items.map(slotFromRow).filter((s) => !!s);
		}
		out.push({
			key: encounterKey(mapId, version),
			mapId,
			version,
			label: mapDisplayName(mapId, version),
			stepChances,
			slots
		});
	}
	out.sort((a, b) => a.mapId - b.mapId || a.version - b.version);
	return out;
}
function usesChance(slots) {
	return Object.values(slots).some((rows) => rows.some((s) => s.chance != null));
}
function slotsValue(slots, withChance) {
	return new RArray(slots.map((s) => withChance ? new RArray([
		s.chance ?? 0,
		rsym(s.species),
		s.min,
		s.max
	]) : new RArray([
		rsym(s.species),
		s.min,
		s.max
	])));
}
function chancesHash(chances) {
	return new RHash(Object.entries(chances).filter(([, n]) => n > 0).map(([k, v]) => [rsym(k), v]));
}
function typesHash(slots, withChance) {
	return new RHash(Object.entries(slots).filter(([, rows]) => rows.length).map(([k, rows]) => [rsym(k), slotsValue(rows, withChance)]));
}
function makeObject(area) {
	const withChance = usesChance(area.slots);
	return new RObject("GameData::Encounter", [
		["@id", rsym(`${area.mapId}_${area.version}`)],
		["@map", area.mapId],
		["@version", area.version],
		["@step_chances", chancesHash(area.stepChances)],
		["@types", typesHash(area.slots, withChance)]
	]);
}
function hashKey(area) {
	return rsym(`${area.mapId}_${area.version}`);
}
function dumpEncountersDat(areas) {
	return marshalDump(new RHash(areas.map((a) => [hashKey(a), makeObject(a)])));
}
function patchEncountersDat(original, areas) {
	if (!original) return dumpEncountersDat(areas);
	try {
		const root = marshalLoad(original);
		if (!isHash(root)) return dumpEncountersDat(areas);
		const byKey = new Map(areas.map((a) => [a.key, a]));
		const seen = /* @__PURE__ */ new Set();
		const next = [];
		for (const [key, val] of root.entries) {
			if (!isObject(val)) {
				next.push([key, val]);
				continue;
			}
			const { mapId, version } = parseId(key, val);
			const k = encounterKey(mapId, version);
			const area = byKey.get(k);
			if (!area) continue;
			seen.add(k);
			const withChance = usesChance(area.slots);
			setIvar(val, "@step_chances", chancesHash(area.stepChances));
			setIvar(val, "@types", typesHash(area.slots, withChance));
			next.push([key, val]);
		}
		for (const area of areas) {
			if (seen.has(area.key)) continue;
			next.push([hashKey(area), makeObject(area)]);
		}
		return marshalDump(new RHash(next));
	} catch {
		return dumpEncountersDat(areas);
	}
}
function buildSampleEncounters() {
	const land = (rows) => rows.map(([species, min, max, chance]) => ({
		species,
		min,
		max,
		...chance != null ? { chance } : {}
	}));
	const route = (mapId, label, chance, rows, extra) => ({
		key: encounterKey(mapId, 0),
		mapId,
		version: 0,
		label,
		stepChances: {
			Land: chance,
			...extra?.stepChances || {}
		},
		slots: {
			Land: land(rows),
			...extra?.slots || {}
		}
	});
	return [route(10, "1번도로", 25, [
		[
			"PIDGEY",
			2,
			5,
			20
		],
		[
			"RATTATA",
			2,
			5,
			20
		],
		[
			"CATERPIE",
			3,
			4,
			10
		],
		[
			"WEEDLE",
			3,
			4,
			10
		],
		[
			"SPRIGATITO",
			4,
			5,
			2
		]
	]), route(11, "2번도로", 25, [
		[
			"PIDGEY",
			3,
			6,
			20
		],
		[
			"RATTATA",
			3,
			6,
			20
		],
		[
			"ODDISH",
			4,
			6,
			10
		],
		[
			"NIDORANfE",
			4,
			5,
			10
		],
		[
			"NIDORANmA",
			4,
			5,
			10
		]
	])];
}
var DB_NAME = "redforge-offline";
var DB_VER = 1;
var STORE = "files";
function openDb() {
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
async function offlinePut(key, value) {
	if (typeof indexedDB === "undefined") return;
	const db = await openDb();
	try {
		const payload = value instanceof Uint8Array ? value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength) : value;
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.objectStore(STORE).put(payload, key);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	} finally {
		db.close();
	}
}
async function offlineGetBuf(key) {
	if (typeof indexedDB === "undefined") return null;
	const db = await openDb();
	try {
		const raw = await new Promise((resolve, reject) => {
			const req = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => reject(req.error);
		});
		if (!raw) return null;
		if (raw instanceof ArrayBuffer) return new Uint8Array(raw);
		if (raw instanceof Uint8Array) return raw;
		if (ArrayBuffer.isView(raw)) {
			const v = raw;
			return new Uint8Array(v.buffer.slice(v.byteOffset, v.byteOffset + v.byteLength));
		}
		return null;
	} finally {
		db.close();
	}
}
async function offlineGetJson(key) {
	if (typeof indexedDB === "undefined") return null;
	const db = await openDb();
	try {
		const raw = await new Promise((resolve, reject) => {
			const req = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => reject(req.error);
		});
		if (!raw || typeof raw !== "object" || raw instanceof ArrayBuffer) return null;
		return raw;
	} finally {
		db.close();
	}
}
var datCache = {
	species: null,
	moves: null,
	abilities: null,
	messages: null,
	encounters: null,
	names: {
		species: {},
		moves: {},
		abilities: {}
	}
};
var embedded = null;
function hasEmbeddedBundle() {
	return embedded != null;
}
function bufFromEmbedded(key) {
	if (!embedded) return null;
	if (key === "species") return embedded.species;
	if (key === "moves") return embedded.moves;
	if (key === "abilities") return embedded.abilities;
	if (key === "messages") return embedded.messages;
	if (key === "encounters") return embedded.encounters;
	return null;
}
async function fetchBuf(url, key) {
	const fromEmbed = bufFromEmbedded(key);
	if (fromEmbed) {
		offlinePut(key, fromEmbed);
		return fromEmbed;
	}
	if (!(typeof navigator === "undefined" || navigator.onLine)) {
		const cached = await offlineGetBuf(key);
		if (cached) return cached;
	}
	try {
		const res = await fetch(url);
		if (res.ok) {
			const buf = new Uint8Array(await res.arrayBuffer());
			offlinePut(key, buf);
			return buf;
		}
	} catch {}
	const cached = await offlineGetBuf(key);
	if (cached) return cached;
	throw new Error(`${url} 오프라인`);
}
async function fetchJson(url, key) {
	if (embedded && key === "workspace") {
		offlinePut(key, embedded.workspace);
		return embedded.workspace;
	}
	if (embedded && key === "names") {
		offlinePut(key, embedded.names);
		return embedded.names;
	}
	if (!(typeof navigator === "undefined" || navigator.onLine)) {
		const cached = await offlineGetJson(key);
		if (cached) return cached;
	}
	try {
		const res = await fetch(url);
		if (res.ok) {
			const json = await res.json();
			offlinePut(key, json);
			return json;
		}
	} catch {}
	const cached = await offlineGetJson(key);
	if (cached) return cached;
	throw new Error(`${url} 오프라인`);
}
var prefetch = null;
function prefetchDats() {
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
		fetchBuf("/data/abilities.dat", "abilities").then((b) => {
			datCache.abilities = b;
		}).catch(() => {}),
		fetchBuf("/data/messages_kor_core.dat", "messages").then((b) => {
			datCache.messages = b;
		}).catch(() => {}),
		fetchBuf("/data/encounters.dat", "encounters").then((b) => {
			if (!datCache.encounters) datCache.encounters = b;
		}).catch(() => {}),
		fetchJson("/data/names-ko.json", "names").then((j) => {
			datCache.names = parseNamesKo(j);
		}).catch(() => {})
	]).then(() => void 0);
	return prefetch;
}
function assembleWorkspace(ws, encBuf, specBuf) {
	if (encBuf) datCache.encounters = encBuf;
	if (specBuf) datCache.species = specBuf;
	let encounters = [];
	if (encBuf) try {
		encounters = encountersFromDat(encBuf);
	} catch {
		encounters = [];
	}
	let species = (ws.species || []).map(normalizeSpecies);
	if (specBuf) try {
		const fromDat = speciesFromDat(specBuf, {
			species: {},
			moves: {},
			abilities: {}
		});
		const wildBy = new Map(fromDat.map((s) => [s.internalName, s.wildItems || []]));
		species = species.map((s) => ({
			...s,
			wildItems: wildBy.get(s.internalName) || s.wildItems || []
		}));
	} catch {}
	return {
		species,
		moves: ws.moves || [],
		abilities: ws.abilities || [],
		encounters
	};
}
async function loadBundledDat() {
	if (embedded) {
		prefetchDats();
		return assembleWorkspace(embedded.workspace, embedded.encounters, embedded.species);
	}
	const [ws, encBuf, specBuf] = await Promise.all([
		fetchJson("/data/workspace.json", "workspace"),
		fetchBuf("/data/encounters.dat", "encounters").catch(() => null),
		fetchBuf("/data/species.dat", "species").catch(() => null)
	]);
	prefetchDats();
	return assembleWorkspace(ws, encBuf, specBuf);
}
function normalizeSpecies(s) {
	return {
		...s,
		tutorMoves: Array.isArray(s.tutorMoves) ? s.tutorMoves : [],
		wildItems: Array.isArray(s.wildItems) ? s.wildItems : []
	};
}
async function ensureDats() {
	await prefetchDats();
	if (!datCache.species) datCache.species = await fetchBuf("/data/species.dat", "species");
	if (!datCache.moves) datCache.moves = await fetchBuf("/data/moves.dat", "moves");
	if (!datCache.encounters) try {
		datCache.encounters = await fetchBuf("/data/encounters.dat", "encounters");
	} catch {}
}
function setDatBytes(kind, bytes) {
	datCache[kind] = bytes;
	offlinePut(kind, bytes);
}
function exportSpeciesDat(species) {
	if (!datCache.species) throw new Error("species.dat 원본이 없습니다.");
	return patchSpeciesDat(datCache.species, species);
}
function exportMovesDat(moves) {
	if (!datCache.moves) throw new Error("moves.dat 원본이 없습니다.");
	return patchMovesDat(datCache.moves, moves);
}
function exportMessagesDat(species, moves) {
	if (!datCache.messages) return null;
	return patchMessagesNames(datCache.messages, species, moves);
}
function exportEncountersDat(areas) {
	return patchEncountersDat(datCache.encounters, areas);
}
var STORAGE_KEY = "redforge-workspace-v6";
var IDB_NAME = "redforge-db";
var IDB_STORE = "workspace";
function hasWorkspace(s) {
	return s.species.length > 50;
}
function parsePersisted(data) {
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
		loadError: ""
	};
}
function applyPersisted(data, set) {
	const next = parsePersisted(data);
	if (!next) return false;
	set(next);
	return true;
}
function persistPayload(s) {
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
		typeFilter: s.typeFilter
	};
}
function openIdb() {
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
async function idbWrite(value) {
	if (typeof indexedDB === "undefined") return;
	const db = await openIdb();
	try {
		await new Promise((resolve, reject) => {
			const tx = db.transaction(IDB_STORE, "readwrite");
			tx.objectStore(IDB_STORE).put(value, STORAGE_KEY);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	} finally {
		db.close();
	}
}
async function idbRead() {
	if (typeof indexedDB === "undefined") return null;
	const db = await openIdb();
	try {
		return await new Promise((resolve, reject) => {
			const req = db.transaction(IDB_STORE, "readonly").objectStore(IDB_STORE).get(STORAGE_KEY);
			req.onsuccess = () => resolve(req.result ?? null);
			req.onerror = () => reject(req.error);
		});
	} finally {
		db.close();
	}
}
var bundledJob = null;
var bootJob = null;
var loadGen = 0;
function withSpeciesExtras(species) {
	return species.map((s) => ({
		...s,
		tutorMoves: Array.isArray(s.tutorMoves) ? s.tutorMoves : [],
		wildItems: Array.isArray(s.wildItems) ? s.wildItems : []
	}));
}
function applySnap(snap) {
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
		query: ""
	};
}
function readLocalBoot() {
	try {
		if (typeof localStorage === "undefined") return null;
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return parsePersisted(JSON.parse(raw));
	} catch {
		return null;
	}
}
var localBoot = typeof window !== "undefined" ? readLocalBoot() : null;
var useEditor = create()((set, get) => ({
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
	tab: "species",
	ready: false,
	loading: true,
	loadError: "",
	showForms: false,
	...localBoot ?? {},
	loadSample: () => set({
		...applySnap(buildSampleWorkspace()),
		encounters: buildSampleEncounters(),
		encountersIsSample: true,
		selectedEncounter: buildSampleEncounters()[0]?.key ?? "",
		tab: get().tab,
		ready: true,
		loading: false
	}),
	loadBundled: async (force = false) => {
		if (!force && hasWorkspace(get())) {
			if (!get().ready) set({
				ready: true,
				loading: false
			});
			prefetchDats();
			return;
		}
		if (bundledJob && !force) return bundledJob;
		const gen = ++loadGen;
		const job = (async () => {
			if (!force && !hasWorkspace(get())) set({
				loading: true,
				loadError: ""
			});
			try {
				const data = await loadBundledDat();
				if (gen !== loadGen) return;
				if (!force && hasWorkspace(get())) {
					set({
						loading: false,
						ready: true
					});
					return;
				}
				const enc = data.encounters || [];
				const pick = data.species.find((s) => s.internalName === "SPRIGATITO")?.internalName || get().selectedSpecies || data.species[0]?.internalName || "";
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
					...force ? {
						startWithAllTms: false,
						enableDebugKo: false,
						typeFilter: ""
					} : {}
				});
			} catch (e) {
				if (gen !== loadGen) return;
				if (!force && hasWorkspace(get())) {
					set({
						loading: false,
						ready: true,
						loadError: e instanceof Error ? e.message : "데이터를 다시 열지 못했습니다."
					});
					return;
				}
				set({
					...applySnap(buildSampleWorkspace()),
					encounters: buildSampleEncounters(),
					encountersIsSample: true,
					selectedEncounter: buildSampleEncounters()[0]?.key ?? "",
					ready: true,
					loading: false,
					loadError: e instanceof Error ? e.message : "데이터를 불러오지 못했습니다.",
					sourceLabel: "샘플 데이터"
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
			return applyPersisted(JSON.parse(json), set);
		} catch {
			return false;
		}
	},
	importTexts: (pokemonText, movesText, label) => {
		const messages = [];
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
			loading: false
		});
		return messages;
	},
	importDat: (parts, label) => {
		const messages = [];
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
		const pick = species.find((s) => s.internalName === get().selectedSpecies)?.internalName || species.find((s) => s.internalName === "SPRIGATITO")?.internalName || species[0]?.internalName || "";
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
			loading: false
		});
		return messages;
	},
	loadSampleEncounters: () => {
		const areas = buildSampleEncounters();
		set({
			encounters: areas,
			encountersIsSample: true,
			selectedEncounter: areas[0]?.key || "",
			tab: "encounters"
		});
	},
	selectSpecies: (internalName) => set({
		selectedSpecies: internalName,
		tab: "species"
	}),
	selectMove: (internalName) => set({
		selectedMove: internalName,
		tab: "moves"
	}),
	selectEncounter: (key) => set({
		selectedEncounter: key,
		tab: "encounters"
	}),
	setTab: (tab) => set({ tab }),
	setQuery: (query) => set({ query }),
	setTypeFilter: (typeFilter) => set({ typeFilter }),
	setShowForms: (showForms) => set({ showForms }),
	setStartWithAllTms: (startWithAllTms) => set({ startWithAllTms }),
	setEnableDebugKo: (enableDebugKo) => set({ enableDebugKo }),
	patchSpecies: (internalName, patch) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		...patch
	} : s) }),
	patchMove: (internalName, patch) => set({ moves: get().moves.map((m) => m.internalName === internalName ? {
		...m,
		...patch
	} : m) }),
	addLevelMove: (internalName) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		levelMoves: [...s.levelMoves, {
			level: 1,
			move: get().moves[0]?.internalName || "TACKLE"
		}]
	} : s) }),
	removeLevelMove: (internalName, index) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		levelMoves: s.levelMoves.filter((_, i) => i !== index)
	} : s) }),
	patchLevelMove: (internalName, index, patch) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		levelMoves: s.levelMoves.map((row, i) => i === index ? {
			...row,
			...patch
		} : row)
	} : s) }),
	addTutorMove: (internalName, move) => {
		const id = move.trim().toUpperCase();
		if (!id) return;
		set({ species: get().species.map((s) => {
			if (s.internalName !== internalName) return s;
			if (s.tutorMoves.includes(id)) return s;
			return {
				...s,
				tutorMoves: [...s.tutorMoves, id]
			};
		}) });
	},
	removeTutorMove: (internalName, index) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		tutorMoves: s.tutorMoves.filter((_, i) => i !== index)
	} : s) }),
	addWildItem: (internalName, item, chance = 5) => {
		const id = item.trim().toUpperCase();
		if (!id) return;
		const n = Number(chance);
		set({ species: get().species.map((s) => {
			if (s.internalName !== internalName) return s;
			const wildItems = Array.isArray(s.wildItems) ? s.wildItems : [];
			return {
				...s,
				wildItems: [...wildItems, {
					item: id,
					chance: Number.isFinite(n) ? n : 5
				}]
			};
		}) });
	},
	removeWildItem: (internalName, index) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		wildItems: (s.wildItems || []).filter((_, i) => i !== index)
	} : s) }),
	patchWildItem: (internalName, index, patch) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		wildItems: (s.wildItems || []).map((row, i) => i === index ? {
			...row,
			...patch
		} : row)
	} : s) }),
	addEvolution: (internalName) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		evolutions: [...s.evolutions, {
			target: "",
			method: "Level",
			param: "16"
		}]
	} : s) }),
	removeEvolution: (internalName, index) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		evolutions: s.evolutions.filter((_, i) => i !== index)
	} : s) }),
	patchEvolution: (internalName, index, patch) => set({ species: get().species.map((s) => s.internalName === internalName ? {
		...s,
		evolutions: s.evolutions.map((row, i) => i === index ? {
			...row,
			...patch
		} : row)
	} : s) }),
	patchEncounter: (key, patch) => set({
		encounters: get().encounters.map((a) => {
			if (a.key !== key) return a;
			const next = {
				...a,
				...patch
			};
			if (patch.mapId != null && patch.label == null) {
				const oldName = mapDisplayName(a.mapId, a.version);
				if (a.label === oldName || a.label === `맵 ${a.mapId}`) next.label = mapDisplayName(next.mapId, next.version);
			}
			next.key = encounterKey(next.mapId, next.version);
			return next;
		}),
		selectedEncounter: (() => {
			const cur = get().encounters.find((a) => a.key === key);
			if (!cur) return get().selectedEncounter;
			const next = {
				...cur,
				...patch
			};
			return encounterKey(next.mapId, next.version);
		})()
	}),
	addEncounterArea: () => {
		const used = new Set(get().encounters.map((a) => a.mapId));
		let mapId = 1;
		while (used.has(mapId)) mapId += 1;
		const area = {
			key: encounterKey(mapId, 0),
			mapId,
			version: 0,
			label: mapDisplayName(mapId, 0),
			stepChances: { Land: 25 },
			slots: { Land: [newEncounterSlot(get().species[0]?.internalName || "PIDGEY", [], 2, 5)] }
		};
		set({
			encounters: [...get().encounters, area],
			selectedEncounter: area.key,
			encountersIsSample: false
		});
	},
	removeEncounterArea: (key) => {
		const next = get().encounters.filter((a) => a.key !== key);
		set({
			encounters: next,
			selectedEncounter: get().selectedEncounter === key ? next[0]?.key || "" : get().selectedEncounter
		});
	},
	addEncounterSlot: (key, type) => set({ encounters: get().encounters.map((a) => {
		if (a.key !== key) return a;
		const rows = a.slots[type] || [];
		const fallback = rows[0];
		return {
			...a,
			slots: {
				...a.slots,
				[type]: [...rows, newEncounterSlot(get().species[0]?.internalName || "PIDGEY", rows, fallback?.min ?? 5, fallback?.max ?? 10)]
			}
		};
	}) }),
	removeEncounterSlot: (key, type, index) => set({ encounters: get().encounters.map((a) => {
		if (a.key !== key) return a;
		return {
			...a,
			slots: {
				...a.slots,
				[type]: (a.slots[type] || []).filter((_, i) => i !== index)
			}
		};
	}) }),
	patchEncounterSlot: (key, type, index, patch) => set({ encounters: get().encounters.map((a) => {
		if (a.key !== key) return a;
		const rows = (a.slots[type] || []).map((row, i) => i === index ? {
			...row,
			...patch
		} : row);
		return {
			...a,
			slots: {
				...a.slots,
				[type]: rows
			}
		};
	}) }),
	setEncounterTypeChance: (key, type, chance) => set({ encounters: get().encounters.map((a) => a.key === key ? {
		...a,
		stepChances: {
			...a.stepChances,
			[type]: chance
		}
	} : a) }),
	addEncounterType: (key, type) => set({ encounters: get().encounters.map((a) => {
		if (a.key !== key) return a;
		if (a.slots[type]?.length) return a;
		return {
			...a,
			stepChances: {
				...a.stepChances,
				[type]: a.stepChances[type] || 21
			},
			slots: {
				...a.slots,
				[type]: [newEncounterSlot("PIDGEY", [], 5, 10)]
			}
		};
	}) }),
	removeEncounterType: (key, type) => set({ encounters: get().encounters.map((a) => {
		if (a.key !== key) return a;
		const slots = { ...a.slots };
		const stepChances = { ...a.stepChances };
		delete slots[type];
		delete stepChances[type];
		return {
			...a,
			slots,
			stepChances
		};
	}) }),
	hydrateFromStorage: () => {
		try {
			if (typeof localStorage === "undefined") return false;
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return false;
			return applyPersisted(JSON.parse(raw), set);
		} catch {
			return false;
		}
	}
}));
function exportWorkspaceJson() {
	return JSON.stringify(persistPayload(useEditor.getState()));
}
async function bootEditor() {
	if (bootJob) return bootJob;
	bootJob = (async () => {
		const st = useEditor.getState();
		if (hasWorkspace(st)) {
			if (!st.ready) useEditor.setState({
				ready: true,
				loading: false
			});
			prefetchDats();
			return;
		}
		if (st.hydrateFromStorage()) {
			prefetchDats();
			return;
		}
		try {
			const raw = await idbRead();
			if (raw && applyPersisted(JSON.parse(raw), (p) => useEditor.setState(p))) {
				prefetchDats();
				return;
			}
		} catch {}
		await useEditor.getState().loadBundled();
	})();
	await bootJob;
}
function persistEditor() {
	if (persistTimer) clearTimeout(persistTimer);
	persistTimer = setTimeout(flushPersist, 250);
}
function watchPersist() {
	const unsub = useEditor.subscribe((s, p) => {
		if (!s.ready) return;
		if (s.species === p.species && s.moves === p.moves && s.encounters === p.encounters && s.abilities === p.abilities && s.startWithAllTms === p.startWithAllTms && s.enableDebugKo === p.enableDebugKo && s.selectedSpecies === p.selectedSpecies && s.selectedMove === p.selectedMove && s.selectedEncounter === p.selectedEncounter && s.tab === p.tab && s.showForms === p.showForms && s.sourceLabel === p.sourceLabel) return;
		persistEditor();
	});
	const flush = () => {
		if (persistTimer) {
			clearTimeout(persistTimer);
			persistTimer = void 0;
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
var persistTimer;
function flushPersist() {
	persistTimer = void 0;
	const s = useEditor.getState();
	if (!s.ready || s.species.length < 10) return;
	let json;
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
		} catch {}
	}
	idbWrite(json).catch(() => {});
}
function useIssues() {
	const species = useEditor((s) => s.species);
	const moves = useEditor((s) => s.moves);
	return (0, import_react.useMemo)(() => validateWorkspace(species, moves), [species, moves]);
}
var DATA_PATHS = [
	"/",
	"/favicon.svg",
	"/data/species.dat",
	"/data/moves.dat",
	"/data/abilities.dat",
	"/data/encounters.dat",
	"/data/messages_kor_core.dat",
	"/data/names-ko.json",
	"/data/workspace.json",
	"/redforge-offline.zip"
];
function shouldCacheUrl(href) {
	try {
		const u = new URL(href, window.location.origin);
		if (u.origin !== window.location.origin) return false;
		const p = u.pathname;
		if (p.startsWith("/@") || p.startsWith("/node_modules") || p.startsWith("/src/")) return false;
		if (p.startsWith("/api/") || p.startsWith("/auth/")) return false;
		return true;
	} catch {
		return false;
	}
}
function collectCacheUrls() {
	const urls = new Set(DATA_PATHS.map((p) => new URL(p, window.location.origin).href));
	document.querySelectorAll("script[src], link[href]").forEach((el) => {
		const href = el.getAttribute("src") || el.getAttribute("href");
		if (!href) return;
		try {
			const abs = new URL(href, window.location.origin);
			if (shouldCacheUrl(abs.href)) urls.add(abs.href);
		} catch {}
	});
	if (typeof performance !== "undefined") {
		for (const entry of performance.getEntriesByType("resource")) if (shouldCacheUrl(entry.name)) urls.add(entry.name);
	}
	return [...urls];
}
async function postCacheUrls(urls) {
	if (!("serviceWorker" in navigator)) return;
	try {
		(await navigator.serviceWorker.ready).active?.postMessage({
			type: "CACHE_URLS",
			urls
		});
	} catch {}
}
async function warmOfflineCache() {
	let cached = 0;
	const urls = collectCacheUrls();
	if ("caches" in window) try {
		const cache = await caches.open("redforge-offline-v2");
		await Promise.all(urls.map(async (u) => {
			try {
				const res = await fetch(u, { credentials: "same-origin" });
				if (res.ok) {
					await cache.put(u, res.clone());
					cached += 1;
				}
			} catch {}
		}));
	} catch {}
	await postCacheUrls(urls);
	if (typeof navigator.storage?.persist === "function") navigator.storage.persist();
	return { cached };
}
function registerOfflineWorker() {
	if (typeof window === "undefined") return;
	if (window.location.protocol === "file:") return;
	if (hasEmbeddedBundle()) return;
	if (!("serviceWorker" in navigator)) {
		warmOfflineCache();
		return;
	}
	const host = window.location.hostname;
	const local = host === "localhost" || host === "127.0.0.1";
	const afterReady = () => {
		window.setTimeout(() => {
			warmOfflineCache();
		}, 400);
	};
	if (local) {
		afterReady();
		return;
	}
	navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).then((reg) => {
		reg.update();
		afterReady();
	}).catch(() => {
		afterReady();
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-fg)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30", className),
		...props
	});
}
var TYPE_KO = {
	NORMAL: "노말",
	FIRE: "불꽃",
	WATER: "물",
	GRASS: "풀",
	ELECTRIC: "전기",
	ICE: "얼음",
	FIGHTING: "격투",
	POISON: "독",
	GROUND: "땅",
	FLYING: "비행",
	PSYCHIC: "에스퍼",
	BUG: "벌레",
	ROCK: "바위",
	GHOST: "고스트",
	DRAGON: "드래곤",
	DARK: "악",
	STEEL: "강철",
	FAIRY: "페어리"
};
function typeQueryHit(types, typeFilter, q) {
	const list = Array.isArray(types) ? types : [types];
	if (typeFilter && !list.includes(typeFilter)) return false;
	if (!q) return true;
	return list.some((t) => t.toLowerCase().includes(q) || (TYPE_KO[t] || "").includes(q));
}
var TYPE_TONE = {
	NORMAL: "var(--type-normal)",
	FIRE: "var(--type-fire)",
	WATER: "var(--type-water)",
	GRASS: "var(--type-grass)",
	ELECTRIC: "var(--type-electric)",
	ICE: "var(--type-ice)",
	FIGHTING: "var(--type-fighting)",
	POISON: "var(--type-poison)",
	GROUND: "var(--type-ground)",
	FLYING: "var(--type-flying)",
	PSYCHIC: "var(--type-psychic)",
	BUG: "var(--type-bug)",
	ROCK: "var(--type-rock)",
	GHOST: "var(--type-ghost)",
	DRAGON: "var(--type-dragon)",
	DARK: "var(--type-dark)",
	STEEL: "var(--type-steel)",
	FAIRY: "var(--type-fairy)"
};
var STAT_LABELS = [
	{
		key: "hp",
		label: "HP"
	},
	{
		key: "atk",
		label: "공격"
	},
	{
		key: "def",
		label: "방어"
	},
	{
		key: "spa",
		label: "특공"
	},
	{
		key: "spdF",
		label: "특방"
	},
	{
		key: "spd",
		label: "스피드"
	}
];
var CATEGORY_KO = {
	Physical: "물리",
	Special: "특수",
	Status: "변화"
};
var EVO_KO = {
	Level: "레벨",
	Item: "도구",
	Trade: "통신교환",
	TradeItem: "도구교환",
	Happiness: "친밀도",
	HappinessDay: "친밀도(낮)",
	HappinessNight: "친밀도(밤)",
	LevelMale: "레벨(수컷)",
	LevelFemale: "레벨(암컷)",
	LevelDay: "레벨(낮)",
	LevelNight: "레벨(밤)",
	AttackGreater: "공격>방어",
	AtkDefEqual: "공격=방어",
	DefenseGreater: "방어>공격",
	Location: "장소",
	HasMove: "기술보유",
	HasInParty: "파티보유",
	LevelRain: "비오는날 레벨",
	LevelWalk: "일정 걸음 레벨",
	LevelUseMoveCount: "기술 사용 횟수",
	LevelRecoilDamage: "반동 누적",
	LevelDarkInParty: "악타입 파티",
	LevelEvening: "저녁 레벨",
	HoldItem: "도구 소지",
	DayHoldItem: "낮 도구소지",
	NightHoldItem: "밤 도구소지",
	ItemMale: "도구(수컷)",
	ItemFemale: "도구(암컷)",
	ItemNight: "도구(밤)",
	HappinessMoveType: "친밀도+타입기술",
	LocationFlag: "장소 플래그",
	CollectItems: "도구 수집",
	BattleDealCriticalHit: "급소 배틀",
	Event: "이벤트",
	Silcoon: "실쿤",
	Cascoon: "카스쿤",
	Ninjask: "아이스크",
	Shedinja: "껍질몬",
	Beauty: "아름다움",
	None: "없음"
};
var FUNCTION_CODES = [
	{
		code: "None",
		label: "부가효과 없음 (데미지만)"
	},
	{
		code: "SleepTarget",
		label: "상대를 잠들게 함"
	},
	{
		code: "PoisonTarget",
		label: "독을 남김"
	},
	{
		code: "BadlyPoisonTarget",
		label: "맹독"
	},
	{
		code: "BurnTarget",
		label: "화상을 남김"
	},
	{
		code: "ParalyzeTarget",
		label: "마비를 남김"
	},
	{
		code: "FreezeTarget",
		label: "얼림"
	},
	{
		code: "FlinchTarget",
		label: "풀죽게 함"
	},
	{
		code: "ConfuseTarget",
		label: "혼란"
	},
	{
		code: "BurnChance",
		label: "확률 화상"
	},
	{
		code: "ParalyzeChance",
		label: "확률 마비"
	},
	{
		code: "PoisonChance",
		label: "확률 독"
	},
	{
		code: "FreezeChance",
		label: "확률 얼음"
	},
	{
		code: "FlinchChance",
		label: "확률 풀죽음"
	},
	{
		code: "ConfuseChance",
		label: "확률 혼란"
	},
	{
		code: "LowerTargetAtk1",
		label: "상대 공격 1단계 하락"
	},
	{
		code: "LowerTargetDef1",
		label: "상대 방어 1단계 하락"
	},
	{
		code: "LowerTargetSpd1",
		label: "상대 스피드 1단계 하락"
	},
	{
		code: "LowerTargetSpa1",
		label: "상대 특공 1단계 하락"
	},
	{
		code: "LowerTargetSpdF1",
		label: "상대 특방 1단계 하락"
	},
	{
		code: "LowerTargetAcc1",
		label: "상대 명중 1단계 하락"
	},
	{
		code: "RaiseUserAtk1",
		label: "자신 공격 1단계 상승"
	},
	{
		code: "RaiseUserDef1",
		label: "자신 방어 1단계 상승"
	},
	{
		code: "RaiseUserSpd1",
		label: "자신 스피드 1단계 상승"
	},
	{
		code: "RaiseUserSpa1",
		label: "자신 특공 1단계 상승"
	},
	{
		code: "RaiseUserSpdF1",
		label: "자신 특방 1단계 상승"
	},
	{
		code: "RaiseUserAtk2",
		label: "자신 공격 2단계 상승"
	},
	{
		code: "RaiseUserSpd2",
		label: "자신 스피드 2단계 상승"
	},
	{
		code: "MultiHit",
		label: "2~5회 연속"
	},
	{
		code: "HitTwoTimes",
		label: "2회 연속"
	},
	{
		code: "RecoilThird",
		label: "반동 1/3"
	},
	{
		code: "RecoilFourth",
		label: "반동 1/4"
	},
	{
		code: "RecoilHalf",
		label: "반동 1/2"
	},
	{
		code: "HealUserHalfOfTotalHP",
		label: "최대 HP 절반 회복"
	},
	{
		code: "DrainTargetHPHalf",
		label: "준 데미지의 절반 흡수"
	},
	{
		code: "OHKO",
		label: "일격기"
	},
	{
		code: "AlwaysHit",
		label: "필중"
	},
	{
		code: "PriorityHit",
		label: "선공 (우선도 필드 사용)"
	},
	{
		code: "SwitchOutUser",
		label: "사용 후 교체"
	},
	{
		code: "FixedDamage",
		label: "고정 데미지"
	}
];
var FLAG_HELP = "a=접촉  b=방어영향  e=스니치  f=거울  k=킹실드  n=가드교체";
var ENCOUNTER_TYPE_KO = {
	Land: "풀숲",
	LandDay: "풀숲(낮)",
	LandNight: "풀숲(밤)",
	LandMorning: "풀숲(아침)",
	LandAfternoon: "풀숲(오후)",
	LandEvening: "풀숲(저녁)",
	Water: "물가",
	OldRod: "낡은낚싯대",
	GoodRod: "좋은낚싯대",
	SuperRod: "대단한낚싯대",
	Cave: "동굴",
	RockSmash: "바위깨기",
	HeadbuttLow: "박치기(약)",
	HeadbuttHigh: "박치기(강)",
	BugContest: "곤충채집"
};
/** 야생 소지·진화·배틀 도구 한글 이름. 검색용. */
var ITEM_KO = {
	ABSORBBULB: "흡수의구슬",
	ADRENALINEORB: "기합의부적",
	AGUAVBERRY: "아바열매",
	AIRBALLOON: "풍선",
	APICOTBERRY: "규살열매",
	ASSAULTVEST: "돌격조끼",
	ASPEARBERRY: "시마열매",
	BABIRIBERRY: "바리비열매",
	BERRYJUICE: "나무열매쥬스",
	BIGMUSHROOM: "큰버섯",
	BIGNUGGET: "큰금구슬",
	BIGPEARL: "큰진주",
	BIGROOT: "큰뿌리",
	BINDINGBAND: "조임밴드",
	BLACKAUGURITE: "검은휘석",
	BLACKBELT: "검은띠",
	BLACKGLASSES: "검은안경",
	BLACKSLUDGE: "검은진흙",
	BLUKBERRY: "블리열매",
	BOOSTERENERGY: "부스트에너지",
	BRIGHTPOWDER: "반짝가루",
	CELLBATTERY: "충전지",
	CHARCOAL: "목탄",
	CHARTIBERRY: "루미열매",
	CHERIBERRY: "버치열매",
	CHESTOBERRY: "유루열매",
	CHILANBERRY: "치리열매",
	CHIPPEDPOT: "이빠진포트",
	CHOICEBAND: "구애머리띠",
	CHOICESCARF: "구애스카프",
	CHOICESPECS: "구애안경",
	CHOPLEBERRY: "로플열매",
	CLEANSETAG: "순결의부적",
	CLEARAMULET: "맑은부적",
	COBABERRY: "바코열매",
	COLBURBERRY: "마코열매",
	COVERTCLOAK: "은밀망토",
	CRACKEDPOT: "깨진포트",
	CUSTAPBERRY: "커스열매",
	DAMPROCK: "축축한바위",
	DAWNSTONE: "각성의돌",
	DEEPSEASCALE: "심해의비늘",
	DEEPSEATOOTH: "심해의이빨",
	DESTINYKNOT: "빨간실",
	DRAGONFANG: "용의이빨",
	DRAGONSCALE: "용의비늘",
	DUBIOUSDISC: "괴상한패치",
	DUSKSTONE: "어둠의돌",
	EJECTBUTTON: "탈출버튼",
	EJECTPACK: "탈출팩",
	ELECTIRIZER: "에레키부스터",
	ELECTRICSEED: "일렉트릭시드",
	ENIGMABERRY: "의문열매",
	EVIOLITE: "진화의휘석",
	EXPERTBELT: "달인의띠",
	EVERSTONE: "변함없는돌",
	FIGYBERRY: "무화열매",
	FIRESTONE: "불꽃의돌",
	FLAMEORB: "화염구슬",
	FLOATSTONE: "가벼운돌",
	FOCUSBAND: "기합의머리띠",
	FOCUSSASH: "기합의띠",
	GALARICACUFF: "가라르커프스",
	GALARICAWREATH: "가라르리스",
	GANLONBERRY: "용아열매",
	GRASSYSEED: "그래스시드",
	GRIPCLAW: "끈기손톱",
	HABANBERRY: "하반열매",
	HARDSTONE: "딱딱한돌",
	HEARTSCALE: "하트비늘",
	HEATROCK: "뜨거운바위",
	HEAVYDUTYBOOTS: "방진부츠",
	HONEY: "달콤한꿀",
	IAPAPABERRY: "파야열매",
	ICESTONE: "얼음의돌",
	ICYROCK: "차가운바위",
	IRONBALL: "검은철구",
	JABOCABERRY: "자보카열매",
	KASIBBERRY: "수불열매",
	KEBIABERRY: "으름열매",
	KINGSROCK: "왕의징표석",
	LAGGINGTAIL: "느림보꼬리",
	LANSATBERRY: "랑사열매",
	LEADERSCREST: "두목의증표",
	LEAFSTONE: "리프의돌",
	LEEK: "대파",
	LEFTOVERS: "먹다남은음식",
	LEPPABERRY: "과라열매",
	LIECHIBERRY: "리리열매",
	LIFEORB: "생명의구슬",
	LIGHTBALL: "전기구슬",
	LIGHTCLAY: "빛의점토",
	LINKINGCORD: "연결의끈",
	LOADEDICE: "깨뜨린주사위",
	LUCKYEGG: "행복의알",
	LUCKYPUNCH: "럭키펀치",
	LUMBERRY: "리샘열매",
	LUMINOUSMOSS: "빛이끼",
	MACHOBRACE: "교정보조용",
	MAGMARIZER: "마그마부스터",
	MAGNET: "자석",
	MAGOBERRY: "마고열매",
	MALICIOUSARMOR: "저주받은갑옷",
	MARANGABERRY: "마르열매",
	MASTERPIECETEACUP: "걸작찻잔",
	MAXREVIVE: "기력의덩어리",
	MENTALHERB: "멘탈허브",
	METALALLOY: "복합금속",
	METALCOAT: "금속코트",
	METALPOWDER: "금속파우더",
	METRONOME: "메트로놈",
	MICLEBERRY: "미클열매",
	MIRACLESEED: "기적의씨",
	MIRRORHERB: "거울허브",
	MISTYSEED: "미스트시드",
	MOOMOOMILK: "튼튼밀크",
	MOONSTONE: "달의돌",
	MUSCLEBAND: "힘의머리띠",
	MYSTICWATER: "신비의물방울",
	NEVERMELTICE: "녹지않는얼음",
	NORMALGEM: "노말주얼",
	NUGGET: "금구슬",
	OCCABERRY: "오카열매",
	ODDINCENSE: "괴상한향로",
	ORANBERRY: "오랭열매",
	OVALSTONE: "동글동글돌",
	PASSHOBERRY: "또뽀열매",
	PAYAPABERRY: "야파열매",
	PEARL: "진주",
	PEATBLOCK: "피트블록",
	PECHABERRY: "도봉열매",
	PERSIMBERRY: "시몬열매",
	PETAYABERRY: "야타비열매",
	PINKNECTAR: "연분홍꿀",
	POISONBARB: "독바늘",
	POTION: "상처약",
	POWERANKLET: "파워앵클릿",
	POWERBAND: "파워밴드",
	POWERBELT: "파워벨트",
	POWERBRACER: "파워리스트",
	POWERHERB: "파워풀허브",
	POWERLENS: "파워렌즈",
	POWERWEIGHT: "파워웨이트",
	PRETTYFEATHER: "고운날개",
	PRISMSCALE: "고운비늘",
	PROTECTIVEPADS: "방호패드",
	PROTECTOR: "프로텍터",
	PSYCHICSEED: "사이코시드",
	PUNCHINGGLOVE: "펀치글러브",
	PURPLENECTAR: "연보라꿀",
	QUICKCLAW: "선제공의손톱",
	QUICKPOWDER: "스피드파우더",
	RAZORCLAW: "예리한손톱",
	RAZORFANG: "예리한이빨",
	RAWSTBERRY: "과사열매",
	REAPERCLOTH: "영계의천",
	REDCARD: "레드카드",
	REDNECTAR: "다홍꿀",
	REVIVE: "기력의조각",
	RINDOBERRY: "린드열매",
	RINGTARGET: "겨냥표적",
	ROCKYHELMET: "울퉁불퉁멧",
	ROOMSERVICE: "룸서비스",
	ROSELIBERRY: "로셀열매",
	ROWAPBERRY: "애슈열매",
	RUSTEDSHIELD: "녹슨방패",
	RUSTEDSWORD: "녹슨검",
	SACHET: "향기주머니",
	SACREDASH: "성스러운분말",
	SAFETYGOGGLES: "방진고글",
	SALACBERRY: "캄라열매",
	SCOPELENS: "초점렌즈",
	SCROLLOFDARKNESS: "악의두루마리",
	SCROLLOFWATERS: "물의두루마리",
	SHARPBEAK: "예리한부리",
	SHEDSHELL: "아름다운허물",
	SHELLBELL: "조개껍질방울",
	SHINYSTONE: "빛의돌",
	SHUCABERRY: "슈카열매",
	SILKSCARF: "실크스카프",
	SILVERPOWDER: "은빛가루",
	SITRUSBERRY: "자뭉열매",
	SMOKEBALL: "연막탄",
	SMOOTHROCK: "보송보송바위",
	SNOWBALL: "눈덩이",
	SOFTSAND: "부드러운모래",
	SPELLTAG: "저주의부적",
	STARDUST: "별의모래",
	STARFBERRY: "스타열매",
	STARPIECE: "별의조각",
	STICKYBARB: "끈적끈적바늘",
	SUNSTONE: "태양의돌",
	SWEETAPPLE: "달콤한사과",
	SYRUPYAPPLE: "꿀맛사과",
	TANGABERRY: "리체열매",
	TARTAPPLE: "새콤한사과",
	TERRAINEXTENDER: "그라운드코트",
	THICKCLUB: "굵은뼈",
	THROATSPRAY: "목스프레이",
	THUNDERSTONE: "천둥의돌",
	TINYMUSHROOM: "작은버섯",
	TOXICORB: "맹독구슬",
	TWISTEDSPOON: "휘어진스푼",
	UNREMARKABLETEACUP: "범작찻잔",
	UPGRADE: "업그레이드",
	UTILITYUMBRELLA: "무지개날개",
	WACANBERRY: "초나열매",
	WATERSTONE: "물의돌",
	WEAKNESSPOLICY: "약점보험",
	WHIPPEDDREAM: "휘핑팝",
	WHITEHERB: "하양허브",
	WIDELENS: "광각렌즈",
	WIKIBERRY: "위키열매",
	WISEGLASSES: "박식안경",
	YACHEBERRY: "플카열매",
	YELLOWNECTAR: "연노랑꿀",
	ZOOMLENS: "줌렌즈",
	AUSPICIOUSARMOR: "축복받은갑옷"
};
function itemNameKo(id) {
	const key = (id || "").trim().toUpperCase();
	return ITEM_KO[key] || key;
}
function itemOptions(extra = []) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const id of [...Object.keys(ITEM_KO), ...extra]) {
		const value = id.trim().toUpperCase();
		if (!value || seen.has(value)) continue;
		seen.add(value);
		out.push({
			value,
			label: itemNameKo(value),
			hint: value
		});
	}
	out.sort((a, b) => a.label.localeCompare(b.label, "ko"));
	return out;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-[opacity,transform,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:opacity-90",
			outline: "border border-[var(--color-border-strong)] bg-transparent text-[var(--color-fg)] hover:bg-[var(--color-raised)]",
			ghost: "text-[var(--color-muted)] hover:bg-[var(--color-raised)] hover:text-[var(--color-fg)]",
			subtle: "bg-[var(--color-raised)] text-[var(--color-fg)] hover:bg-[var(--color-surface)]"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function NativeSelect({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30", className),
		...props,
		children
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("flex flex-col gap-1.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium tracking-wide text-[var(--color-muted)]",
			children: label
		}), children]
	});
}
function TypeChip({ type, className }) {
	const tone = TYPE_TONE[type] ?? "var(--type-normal)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-6 min-w-11 items-center justify-center rounded-full px-2 text-[11px] font-medium tracking-wide text-[#0c0a0a]", className),
		style: { background: tone },
		children: TYPE_KO[type] ?? type
	});
}
function TypeFilter({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-1 overflow-x-auto px-3 pb-2",
		children: TYPES.map((t) => {
			const on = value === t;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": on,
				"aria-label": `${TYPE_KO[t]} 타입`,
				onClick: () => onChange(on ? "" : t),
				className: cn("h-8 shrink-0 rounded-full px-2.5 text-[11px] font-medium tracking-wide text-[#0c0a0a] transition-[box-shadow,opacity] duration-150", on ? "ring-2 ring-[var(--color-accent)] ring-offset-1 ring-offset-[var(--color-bg)]" : "opacity-75 hover:opacity-100"),
				style: { background: TYPE_TONE[t] ?? "var(--type-normal)" },
				children: TYPE_KO[t]
			}, t);
		})
	});
}
function StatBars({ species }) {
	const total = bst(species);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium tracking-wide text-[var(--color-muted)]",
				children: "종족값"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-sm tabular-nums text-[var(--color-fg)]",
				children: ["합 ", total]
			})]
		}), STAT_LABELS.map(({ key, label }) => {
			const v = species.baseStats[key];
			const pct = Math.min(100, v / 180 * 100);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[52px_1fr_40px] items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-[var(--color-muted)]",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 overflow-hidden rounded-full bg-[var(--color-bg)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "stat-fill h-full rounded-full bg-[var(--color-accent)]",
							style: {
								width: `${pct}%`,
								opacity: .45 + v / 255 * .55
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-right font-mono text-xs tabular-nums",
						children: v
					})
				]
			}, key);
		})]
	});
}
var closeOpen = null;
function SearchSelect({ value, onChange, options, placeholder = "이름 · ID 검색", allowEmpty = false, emptyLabel = "없음", emptyValue = "", "aria-label": ariaLabel }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [hi, setHi] = (0, import_react.useState)(0);
	const [box, setBox] = (0, import_react.useState)({
		top: 0,
		left: 0,
		width: 0
	});
	const inputRef = (0, import_react.useRef)(null);
	const listRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const setters = (0, import_react.useRef)({
		setOpen,
		setQ
	});
	setters.current = {
		setOpen,
		setQ
	};
	const selfClose = (0, import_react.useRef)(() => {
		setters.current.setOpen(false);
		setters.current.setQ("");
		if (closeOpen === selfClose.current) closeOpen = null;
	});
	const display = options.find((o) => o.value === value)?.label || (value && value !== emptyValue ? value : "");
	const filtered = (0, import_react.useMemo)(() => {
		const pool = (allowEmpty ? [{
			value: emptyValue,
			label: emptyLabel
		}] : []).concat(options);
		const needle = q.trim().toLowerCase();
		return (needle ? pool.filter((o) => o.label.toLowerCase().includes(needle) || o.value.toLowerCase().includes(needle) || o.hint && o.hint.toLowerCase().includes(needle)) : pool).slice(0, 80);
	}, [
		q,
		options,
		allowEmpty,
		emptyLabel,
		emptyValue
	]);
	function measure() {
		const el = inputRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		setBox({
			top: r.bottom + 4,
			left: r.left,
			width: r.width
		});
	}
	(0, import_react.useLayoutEffect)(() => {
		if (!open) return;
		measure();
		const onWin = () => measure();
		window.addEventListener("resize", onWin);
		window.addEventListener("scroll", onWin, true);
		return () => {
			window.removeEventListener("resize", onWin);
			window.removeEventListener("scroll", onWin, true);
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		setHi(0);
	}, [q, open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		(listRef.current?.querySelector("[data-hi='true']"))?.scrollIntoView({ block: "nearest" });
	}, [
		hi,
		filtered,
		open
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onDoc(e) {
			const t = e.target;
			if (wrapRef.current?.contains(t) || listRef.current?.contains(t)) return;
			selfClose.current();
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, [open]);
	function openList(nextQ) {
		if (closeOpen && closeOpen !== selfClose.current) closeOpen();
		const el = inputRef.current;
		if (el) {
			const r = el.getBoundingClientRect();
			setBox({
				top: r.bottom + 4,
				left: r.left,
				width: r.width
			});
		}
		setQ(nextQ);
		setOpen(true);
		closeOpen = selfClose.current;
	}
	function pick(next) {
		onChange(next);
		setQ("");
		setOpen(false);
		if (closeOpen === selfClose.current) closeOpen = null;
	}
	function onKeyDown(e) {
		if (e.key === "Backspace") {
			e.stopPropagation();
			if (!open) openList(display);
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			if (!open) openList(q);
			setHi((n) => Math.min(Math.max(filtered.length - 1, 0), n + 1));
			return;
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			setHi((n) => Math.max(0, n - 1));
			return;
		}
		if (e.key === "Enter") {
			e.preventDefault();
			const hit = filtered[hi];
			if (hit) pick(hit.value);
			else if (q.trim()) pick((options.find((o) => o.value.toLowerCase() === q.trim().toLowerCase()) || options.find((o) => o.label === q.trim()))?.value ?? q.trim().toUpperCase());
			return;
		}
		if (e.key === "Escape") {
			setOpen(false);
			setQ("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			"aria-label": ariaLabel,
			"aria-expanded": open,
			"aria-autocomplete": "list",
			autoComplete: "off",
			spellCheck: false,
			role: "combobox",
			value: open ? q : display,
			placeholder,
			onChange: (e) => {
				openList(e.target.value);
			},
			onFocus: () => {
				if (!open) openList("");
			},
			onBlur: () => {
				window.setTimeout(() => {
					if (wrapRef.current?.contains(document.activeElement) || listRef.current?.contains(document.activeElement)) return;
					selfClose.current();
				}, 0);
			},
			onKeyDown,
			className: "h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-fg)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
		}), open && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: listRef,
			role: "listbox",
			style: {
				top: box.top,
				left: box.left,
				width: Math.max(box.width, 160)
			},
			className: "fixed z-50 max-h-64 overflow-y-auto rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1",
			children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 py-2 text-sm text-[var(--color-muted)]",
				children: "검색 결과가 없습니다."
			}), filtered.map((o, i) => {
				const active = i === hi;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					tabIndex: -1,
					role: "option",
					"aria-selected": o.value === value,
					"data-hi": active ? "true" : "false",
					onMouseEnter: () => setHi(i),
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => pick(o.value),
					className: cn("flex w-full items-baseline gap-2 rounded-[var(--radius-xs)] px-3 py-2 text-left text-sm", active ? "bg-[var(--color-raised)]" : "hover:bg-[var(--color-raised)]/60"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 truncate",
						children: o.label
					}), o.hint && o.hint !== o.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 font-mono text-xs text-[var(--color-subtle)]",
						children: o.hint
					})]
				}, `${o.value}-${i}`);
			})]
		}), document.body)]
	});
}
function SpeciesPanel() {
	const species = useEditor((s) => s.species);
	const moves = useEditor((s) => s.moves);
	const selected = useEditor((s) => s.selectedSpecies);
	const query = useEditor((s) => s.query);
	const selectSpecies = useEditor((s) => s.selectSpecies);
	const patchSpecies = useEditor((s) => s.patchSpecies);
	const addLevelMove = useEditor((s) => s.addLevelMove);
	const removeLevelMove = useEditor((s) => s.removeLevelMove);
	const patchLevelMove = useEditor((s) => s.patchLevelMove);
	const addEvolution = useEditor((s) => s.addEvolution);
	const removeEvolution = useEditor((s) => s.removeEvolution);
	const patchEvolution = useEditor((s) => s.patchEvolution);
	const abilities = useEditor((s) => s.abilities);
	const showForms = useEditor((s) => s.showForms);
	const setShowForms = useEditor((s) => s.setShowForms);
	const typeFilter = useEditor((s) => s.typeFilter);
	const setTypeFilter = useEditor((s) => s.setTypeFilter);
	const addTutorMove = useEditor((s) => s.addTutorMove);
	const removeTutorMove = useEditor((s) => s.removeTutorMove);
	const addWildItem = useEditor((s) => s.addWildItem);
	const removeWildItem = useEditor((s) => s.removeWildItem);
	const patchWildItem = useEditor((s) => s.patchWildItem);
	const issues = useIssues();
	const abilityList = abilities.length ? abilities : SAMPLE_ABILITIES;
	const [tmQuery, setTmQuery] = (0, import_react.useState)("");
	const q = query.trim().toLowerCase();
	const list = species.filter((s) => {
		const isForm = /_\d+$/.test(s.internalName);
		if (!showForms && isForm && !q) return false;
		if (!typeQueryHit(s.types, typeFilter, "")) return false;
		if (!q) return true;
		if (s.name.toLowerCase().includes(q) || s.internalName.toLowerCase().includes(q) || String(s.id).includes(q) || typeQueryHit(s.types, "", q)) return true;
		return (s.wildItems || []).some((w) => {
			const id = (w.item || "").toLowerCase();
			const ko = itemNameKo(w.item).toLowerCase();
			return id.includes(q) || ko.includes(q);
		});
	});
	const current = species.find((s) => s.internalName === selected) ?? list[0];
	const mine = current ? issuesFor(issues, "species", current.internalName) : [];
	const moveOptions = (0, import_react.useMemo)(() => moves.map((m) => ({
		value: m.internalName,
		label: m.name,
		hint: m.internalName
	})), [moves]);
	const abilityOptions = (0, import_react.useMemo)(() => abilityList.map((a) => ({
		value: a.internalName,
		label: a.name,
		hint: a.internalName
	})), [abilityList]);
	const holdOptions = (0, import_react.useMemo)(() => itemOptions((current?.wildItems || []).map((w) => w.item)), [current?.wildItems]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex max-h-64 min-h-0 flex-col overflow-hidden border-b border-[var(--color-border)] lg:max-h-none lg:overflow-visible lg:border-r lg:border-b-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 p-3 text-xs text-[var(--color-muted)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						list.length,
						" / ",
						species.length
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: showForms,
							onChange: (e) => setShowForms(e.target.checked),
							className: "size-3.5 accent-[var(--color-accent)]"
						}), "폼 포함"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeFilter, {
					value: typeFilter,
					onChange: setTypeFilter
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-y-auto",
					children: list.map((s) => {
						const active = current?.internalName === s.internalName;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => selectSpecies(s.internalName),
							className: `flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition-colors duration-150 ${active ? "border-[var(--color-accent)] bg-[var(--color-raised)]" : "border-transparent hover:bg-[var(--color-raised)]/60"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-10 font-mono text-xs tabular-nums text-[var(--color-subtle)]",
									children: String(s.id).padStart(3, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm font-medium",
										children: s.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-mono text-[11px] text-[var(--color-subtle)]",
										children: s.internalName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:flex gap-1",
									children: s.types.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeChip, { type: t }, t))
								})
							]
						}, s.internalName);
					})
				})
			]
		}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 overflow-y-auto p-4 sm:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl flex-col gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs text-[var(--color-subtle)]",
								children: ["No.", current.id]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold tracking-tight",
								children: current.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xs text-[var(--color-muted)]",
								children: current.internalName
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: current.types.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeChip, { type: t }, t))
						})]
					}),
					mine.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-raised)] px-4 py-3 text-sm",
						children: mine.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: i.level === "error" ? "text-[var(--color-danger)]" : "text-[var(--color-warn)]",
							children: [
								i.level === "error" ? "오류" : "주의",
								" · ",
								i.message
							]
						}, idx))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "번호",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: current.id,
									onChange: (e) => patchSpecies(current.internalName, { id: Number(e.target.value) || 0 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "이름",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: current.name,
									onChange: (e) => patchSpecies(current.internalName, { name: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "내부 ID",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: current.internalName,
									className: "font-mono uppercase",
									onChange: (e) => patchSpecies(current.internalName, { internalName: e.target.value.toUpperCase() })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "숨겨진 특성",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
									value: current.hiddenAbility,
									onChange: (v) => patchSpecies(current.internalName, { hiddenAbility: v }),
									options: abilityOptions,
									allowEmpty: true,
									emptyLabel: "없음",
									"aria-label": "숨겨진 특성"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "타입 1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: current.types[0] || "NORMAL",
									onChange: (e) => patchSpecies(current.internalName, { types: [e.target.value, current.types[1]].filter(Boolean) }),
									children: TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: TYPE_KO[t]
									}, t))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "타입 2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
									value: current.types[1] || "",
									onChange: (e) => patchSpecies(current.internalName, { types: e.target.value ? [current.types[0] || "NORMAL", e.target.value] : [current.types[0] || "NORMAL"] }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "없음"
									}), TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: TYPE_KO[t]
									}, t))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "특성 1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
									value: current.abilities[0] || "",
									onChange: (v) => {
										const next = [...current.abilities];
										next[0] = v;
										patchSpecies(current.internalName, { abilities: next.filter(Boolean) });
									},
									options: abilityOptions,
									"aria-label": "특성 1"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "특성 2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
									value: current.abilities[1] || "",
									onChange: (v) => {
										const a0 = current.abilities[0] || abilityList[0].internalName;
										patchSpecies(current.internalName, { abilities: v ? [a0, v] : [a0] });
									},
									options: abilityOptions,
									allowEmpty: true,
									emptyLabel: "없음",
									"aria-label": "특성 2"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-6 lg:grid-cols-[1fr_220px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
							children: [STAT_LABELS.map(({ key, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									max: 255,
									value: current.baseStats[key],
									onChange: (e) => patchSpecies(current.internalName, { baseStats: {
										...current.baseStats,
										[key]: Math.max(0, Number(e.target.value) || 0)
									} })
								})
							}, key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-end rounded-[var(--radius-md)] bg-[var(--color-raised)] px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-[var(--color-muted)]",
									children: "합계"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xl tabular-nums",
									children: bst(current)
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBars, { species: current })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "레벨업 기술"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: () => addLevelMove(current.internalName),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "추가"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [current.levelMoves.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--color-muted)]",
							children: "아직 배우는 기술이 없습니다."
						}), current.levelMoves.map((row, i) => {
							const mv = moves.find((m) => m.internalName === row.move);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] p-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: -1,
										max: 100,
										value: row.level,
										"aria-label": "레벨",
										onChange: (e) => patchLevelMove(current.internalName, i, { level: Number(e.target.value) || 0 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
										value: row.move,
										onChange: (v) => patchLevelMove(current.internalName, i, { move: v }),
										options: moveOptions,
										"aria-label": "기술"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [mv && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeChip, { type: mv.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "icon",
											className: "size-11",
											"aria-label": "삭제",
											onClick: () => removeLevelMove(current.internalName, i),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})
								]
							}, i);
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 flex items-center justify-between gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-medium",
								children: ["기술머신", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 font-mono text-xs text-[var(--color-subtle)]",
									children: (current.tutorMoves || []).length
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-xs text-[var(--color-muted)]",
							children: "기술머신·비전머신·기술레코드·기술가르침으로 배울 수 있는 기술입니다."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_160px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
								value: "",
								onChange: (v) => {
									if (v) addTutorMove(current.internalName, v);
								},
								options: moveOptions.filter((o) => !(current.tutorMoves || []).includes(o.value)),
								placeholder: "기술머신으로 배울 기술 검색",
								"aria-label": "기술머신 추가"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: tmQuery,
								onChange: (e) => setTmQuery(e.target.value),
								placeholder: "목록 필터",
								"aria-label": "기술머신 목록 필터"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [(current.tutorMoves || []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-[var(--color-muted)]",
								children: "기술머신으로 배우는 기술이 없습니다."
							}), (current.tutorMoves || []).map((move, i) => ({
								move,
								i
							})).filter(({ move }) => {
								const n = tmQuery.trim().toLowerCase();
								if (!n) return true;
								const mv = moves.find((m) => m.internalName === move);
								return move.toLowerCase().includes(n) || (mv?.name || "").toLowerCase().includes(n) || (TYPE_KO[mv?.type || ""] || "").includes(n);
							}).map(({ move, i }) => {
								const mv = moves.find((m) => m.internalName === move);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] px-3 py-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 flex-1 truncate text-sm",
											children: mv?.name || move
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden font-mono text-[11px] text-[var(--color-subtle)] sm:inline",
											children: move
										}),
										mv && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeChip, { type: mv.type }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "icon",
											className: "size-11",
											"aria-label": "기술머신 삭제",
											onClick: () => removeTutorMove(current.internalName, i),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})
									]
								}, `${move}-${i}`);
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 flex items-center justify-between gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-medium",
								children: ["소지 도구", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 font-mono text-xs text-[var(--color-subtle)]",
									children: (current.wildItems || []).length
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-xs text-[var(--color-muted)]",
							children: "야생에서 만날 때 들고 나오는 도구입니다. 게임 확률은 흔함 50% · 드묾 5% · 희귀 1%이며, 같은 도구를 항상으로 두면 100%입니다."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
								value: "",
								onChange: (v) => {
									if (v) addWildItem(current.internalName, v, 5);
								},
								options: holdOptions,
								placeholder: "소지 도구 검색 · 추가",
								"aria-label": "소지 도구 추가"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [(current.wildItems || []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-[var(--color-muted)]",
								children: "야생에서 도구를 들고 나오지 않습니다."
							}), (current.wildItems || []).map((row, i) => {
								const chance = snapWildChance(row.chance);
								const extraChance = ![
									1,
									5,
									50,
									100
								].includes(Number(row.chance));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] p-2 sm:grid-cols-[minmax(0,1fr)_160px_auto]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
											value: row.item,
											onChange: (v) => patchWildItem(current.internalName, i, { item: v }),
											options: holdOptions,
											"aria-label": "소지 도구"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
											value: String(extraChance ? row.chance : chance),
											onChange: (e) => patchWildItem(current.internalName, i, { chance: Number(e.target.value) || 5 }),
											"aria-label": "소지 확률",
											children: [extraChance && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: row.chance,
												children: [
													row.chance,
													"% → ",
													chance,
													"%로 저장"
												]
											}), WILD_CHANCE_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: p.value,
												children: p.label
											}, p.value))]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "icon",
											className: "size-11",
											"aria-label": "소지 도구 삭제",
											onClick: () => removeWildItem(current.internalName, i),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})
									]
								}, `${row.item}-${i}`);
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium",
								children: "진화"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => addEvolution(current.internalName),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "추가"]
							})]
						}),
						current.evolutions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--color-muted)]",
							children: "진화하지 않습니다."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-2",
							children: current.evolutions.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] p-2 sm:grid-cols-[1fr_140px_120px_auto]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										list: "redforge-species",
										value: row.target,
										className: "font-mono",
										placeholder: "진화 대상 ID",
										onChange: (e) => patchEvolution(current.internalName, i, { target: e.target.value.toUpperCase() })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
										value: row.method,
										onChange: (e) => patchEvolution(current.internalName, i, { method: e.target.value }),
										children: [!EVO_METHODS.includes(row.method) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: row.method,
											children: row.method
										}), EVO_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: m,
											children: EVO_KO[m] ?? m
										}, m))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: row.param,
										placeholder: row.method === "Level" ? "레벨" : "값",
										onChange: (e) => patchEvolution(current.internalName, i, { param: e.target.value })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [row.reverse && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] tracking-wide text-[var(--color-subtle)]",
											children: "역"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "icon",
											"aria-label": "진화 삭제",
											onClick: () => removeEvolution(current.internalName, i),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})
								]
							}, i))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
						id: "redforge-species",
						children: species.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.internalName,
							children: s.name
						}, s.internalName))
					})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-10 text-sm text-[var(--color-muted)]",
			children: "종족이 없습니다."
		})]
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-fg)] outline-none transition-[border-color] duration-150 placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30", className),
		...props
	});
}
function MovePanel() {
	const moves = useEditor((s) => s.moves);
	const species = useEditor((s) => s.species);
	const selected = useEditor((s) => s.selectedMove);
	const query = useEditor((s) => s.query);
	const typeFilter = useEditor((s) => s.typeFilter);
	const setTypeFilter = useEditor((s) => s.setTypeFilter);
	const selectMove = useEditor((s) => s.selectMove);
	const selectSpecies = useEditor((s) => s.selectSpecies);
	const patchMove = useEditor((s) => s.patchMove);
	const issues = useIssues();
	const q = query.trim().toLowerCase();
	const list = moves.filter((m) => {
		if (!typeQueryHit(m.type, typeFilter, "")) return false;
		if (!q) return true;
		return m.name.toLowerCase().includes(q) || m.internalName.toLowerCase().includes(q) || typeQueryHit(m.type, "", q);
	});
	const current = moves.find((m) => m.internalName === selected) ?? list[0];
	const mine = current ? issuesFor(issues, "move", current.internalName) : [];
	const learners = current ? species.filter((s) => s.levelMoves.some((lm) => lm.move === current.internalName)) : [];
	const tmLearners = current ? species.filter((s) => (s.tutorMoves || []).includes(current.internalName) && !/_\d+$/.test(s.internalName)) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex max-h-64 min-h-0 flex-col overflow-hidden border-b border-[var(--color-border)] lg:max-h-none lg:border-r lg:border-b-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 text-xs text-[var(--color-muted)]",
					children: [
						list.length,
						" / ",
						moves.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeFilter, {
					value: typeFilter,
					onChange: setTypeFilter
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-y-auto",
					children: list.map((m) => {
						const active = current?.internalName === m.internalName;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => selectMove(m.internalName),
							className: `flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition-colors duration-150 ${active ? "border-[var(--color-accent)] bg-[var(--color-raised)]" : "border-transparent hover:bg-[var(--color-raised)]/60"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeChip, { type: m.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-medium",
									children: m.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block font-mono text-[11px] text-[var(--color-subtle)]",
									children: [
										CATEGORY_KO[m.category],
										" · ",
										m.power || "—",
										" / ",
										m.accuracy || "필중"
									]
								})]
							})]
						}, m.internalName);
					})
				})
			]
		}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 overflow-y-auto p-4 sm:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl flex-col gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeChip, { type: current.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-[var(--color-muted)]",
								children: CATEGORY_KO[current.category]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-semibold tracking-tight",
							children: current.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-[var(--color-muted)]",
							children: current.internalName
						})
					] }),
					mine.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-raised)] px-4 py-3 text-sm",
						children: mine.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: i.level === "error" ? "text-[var(--color-danger)]" : "text-[var(--color-warn)]",
							children: [
								i.level === "error" ? "오류" : "주의",
								" · ",
								i.message
							]
						}, idx))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "이름",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: current.name,
									onChange: (e) => patchMove(current.internalName, { name: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "내부 ID",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "font-mono uppercase",
									value: current.internalName,
									onChange: (e) => patchMove(current.internalName, { internalName: e.target.value.toUpperCase() })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "타입",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: current.type,
									onChange: (e) => patchMove(current.internalName, { type: e.target.value }),
									children: TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: TYPE_KO[t]
									}, t))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "분류",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									value: current.category,
									onChange: (e) => patchMove(current.internalName, { category: e.target.value }),
									children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: CATEGORY_KO[c]
									}, c))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "위력",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									max: 250,
									value: current.power,
									onChange: (e) => patchMove(current.internalName, { power: Number(e.target.value) || 0 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "명중 (0 = 필중)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									max: 100,
									value: current.accuracy,
									onChange: (e) => patchMove(current.internalName, { accuracy: Number(e.target.value) || 0 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "PP",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									max: 64,
									value: current.pp,
									onChange: (e) => patchMove(current.internalName, { pp: Number(e.target.value) || 0 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "우선도",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: -7,
									max: 7,
									value: current.priority,
									onChange: (e) => patchMove(current.internalName, { priority: Number(e.target.value) || 0 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "부가효과",
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
									value: FUNCTION_CODES.some((f) => f.code === current.functionCode) ? current.functionCode : "__custom",
									onChange: (e) => {
										if (e.target.value === "__custom") return;
										patchMove(current.internalName, { functionCode: e.target.value });
									},
									children: [FUNCTION_CODES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: f.code,
										children: f.label
									}, f.code)), !FUNCTION_CODES.some((f) => f.code === current.functionCode) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: "__custom",
										children: ["원본 코드: ", current.functionCode]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "부가효과 코드 (고급)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "font-mono",
									value: current.functionCode,
									onChange: (e) => patchMove(current.internalName, { functionCode: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "부가효과 확률 %",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									max: 255,
									value: current.effectChance,
									onChange: (e) => patchMove(current.internalName, { effectChance: Number(e.target.value) || 0 })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: `플래그  ${FLAG_HELP}`,
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "font-mono",
									value: current.flags,
									onChange: (e) => patchMove(current.internalName, { flags: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "설명",
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: current.description,
									onChange: (e) => patchMove(current.internalName, { description: e.target.value })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3 text-sm font-medium",
						children: "레벨업으로 배우는 종족"
					}), learners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--color-muted)]",
						children: "레벨업으로 배우는 종족이 없습니다."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [learners.slice(0, 36).map((s) => {
							const lv = s.levelMoves.find((lm) => lm.move === current.internalName)?.level;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => selectSpecies(s.internalName),
								className: "rounded-full border border-[var(--color-border)] bg-[var(--color-raised)] px-3 py-1.5 text-sm hover:border-[var(--color-accent)]",
								children: [s.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1.5 font-mono text-xs text-[var(--color-subtle)]",
									children: ["Lv.", lv]
								})]
							}, s.internalName);
						}), learners.length > 36 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "self-center text-xs text-[var(--color-subtle)]",
							children: ["+", learners.length - 36]
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3 text-sm font-medium",
						children: "기술머신으로 배우는 종족"
					}), tmLearners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--color-muted)]",
						children: "기술머신으로 배우는 종족이 없습니다."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [tmLearners.slice(0, 36).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => selectSpecies(s.internalName),
							className: "rounded-full border border-[var(--color-border)] bg-[var(--color-raised)] px-3 py-1.5 text-sm hover:border-[var(--color-accent)]",
							children: s.name
						}, s.internalName)), tmLearners.length > 36 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "self-center text-xs text-[var(--color-subtle)]",
							children: ["+", tmLearners.length - 36]
						})]
					})] })
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-10 text-sm text-[var(--color-muted)]",
			children: "기술이 없습니다."
		})]
	});
}
var CRC_TABLE = (() => {
	const t = /* @__PURE__ */ new Uint32Array(256);
	for (let i = 0; i < 256; i++) {
		let c = i;
		for (let k = 0; k < 8; k++) c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
		t[i] = c >>> 0;
	}
	return t;
})();
function crc32(data) {
	let c = 4294967295;
	for (let i = 0; i < data.length; i++) c = CRC_TABLE[(c ^ data[i]) & 255] ^ c >>> 8;
	return (c ^ 4294967295) >>> 0;
}
function zipStore(files) {
	const enc = new TextEncoder();
	const locals = [];
	const centrals = [];
	let offset = 0;
	for (const f of files) {
		const name = enc.encode(f.name.replace(/\\/g, "/"));
		const data = typeof f.data === "string" ? enc.encode(f.data) : f.data;
		const crc = crc32(data);
		const local = new Uint8Array(30 + name.length);
		const lv = new DataView(local.buffer);
		lv.setUint32(0, 67324752, true);
		lv.setUint16(4, 20, true);
		lv.setUint32(14, crc, true);
		lv.setUint32(18, data.length, true);
		lv.setUint32(22, data.length, true);
		lv.setUint16(26, name.length, true);
		local.set(name, 30);
		locals.push(local, data);
		const central = new Uint8Array(46 + name.length);
		const cv = new DataView(central.buffer);
		cv.setUint32(0, 33639248, true);
		cv.setUint16(4, 20, true);
		cv.setUint16(6, 20, true);
		cv.setUint32(16, crc, true);
		cv.setUint32(20, data.length, true);
		cv.setUint32(24, data.length, true);
		cv.setUint16(28, name.length, true);
		cv.setUint32(42, offset, true);
		central.set(name, 46);
		centrals.push(central);
		offset += local.length + data.length;
	}
	const centralSize = centrals.reduce((n, b) => n + b.length, 0);
	const eocd = /* @__PURE__ */ new Uint8Array(22);
	const ev = new DataView(eocd.buffer);
	ev.setUint32(0, 101010256, true);
	ev.setUint16(8, files.length, true);
	ev.setUint16(10, files.length, true);
	ev.setUint32(12, centralSize, true);
	ev.setUint32(16, offset, true);
	const total = offset + centralSize + 22;
	const out = new Uint8Array(total);
	let p = 0;
	for (const b of locals) {
		out.set(b, p);
		p += b.length;
	}
	for (const b of centrals) {
		out.set(b, p);
		p += b.length;
	}
	out.set(eocd, p);
	return out;
}
var DEBUG_KIND_KO = {
	debug: "F9 디버그",
	pokemon: "포켓몬 디버그",
	battle: "배틀 디버그",
	battle_pokemon: "배틀 포켓몬"
};
var DEBUG_GROUP_KO = {
	main: "메인",
	field_menu: "필드 설정",
	battle_menu: "배틀 설정",
	pokemon_menu: "포켓몬 설정",
	shadow_pokemon_menu: "그림자 포켓몬",
	items_menu: "도구 설정",
	player_menu: "플레이어 설정",
	pbs_editors_menu: "PBS 편집",
	editors_menu: "기타 편집",
	files_menu: "파일 설정",
	hp_status_menu: "HP/상태",
	level_stats: "레벨/능력치",
	contest_stats: "콘테스트 능력",
	moves: "기술",
	species_and_form: "종족/폼",
	cosmetic: "외형",
	ownership: "어버이",
	shadow_pkmn: "그림자 포켓몬",
	battlers: "배틀러",
	trainers: "트레이너",
	field: "필드 효과"
};
var DEBUG_ITEMS = [
	{
		id: "field_menu",
		kind: "debug",
		parent: "main",
		en: "Field options...",
		ko: "필드 설정...",
		descEn: "Warp to maps, edit switches/variables, use the PC, edit Day Care, etc.",
		descKo: "맵 이동, 스위치/변수, PC, 키우미집 등을 다룹니다."
	},
	{
		id: "warp",
		kind: "debug",
		parent: "field_menu",
		en: "Warp to map",
		ko: "맵으로 이동",
		descEn: "Instantly warp to another map of your choice.",
		descKo: "선택한 맵의 통행 가능한 칸으로 즉시 이동합니다."
	},
	{
		id: "use_pc",
		kind: "debug",
		parent: "field_menu",
		en: "Use PC",
		ko: "PC 사용",
		descEn: "Use a PC to access Pokémon storage and player's PC.",
		descKo: "포켓몬 보관함과 플레이어 PC를 엽니다."
	},
	{
		id: "switches",
		kind: "debug",
		parent: "field_menu",
		en: "Switches",
		ko: "스위치",
		descEn: "Edit all Game Switches (except Script Switches).",
		descKo: "스크립트 스위치를 제외한 게임 스위치를 고칩니다."
	},
	{
		id: "variables",
		kind: "debug",
		parent: "field_menu",
		en: "Variables",
		ko: "변수",
		descEn: "Edit all Game Variables. Can set them to numbers or text.",
		descKo: "게임 변수를 숫자나 텍스트로 고칩니다."
	},
	{
		id: "safari_zone_and_bug_contest",
		kind: "debug",
		parent: "field_menu",
		en: "Safari Zone and Bug-Catching Contest",
		ko: "사파리존·곤충채집",
		descEn: "Edit steps/time remaining and number of usable Poké Balls.",
		descKo: "남은 걸음/시간과 사용 가능한 볼 개수를 고칩니다."
	},
	{
		id: "edit_field_effects",
		kind: "debug",
		parent: "field_menu",
		en: "Change field effects",
		ko: "필드 효과 변경",
		descEn: "Edit Repel steps, Strength and Flash usage, and Black/White Flute effects.",
		descKo: "리펠 걸음, 괴력·플래시, 검은/하얀 플루트 효과를 고칩니다."
	},
	{
		id: "refresh_map",
		kind: "debug",
		parent: "field_menu",
		en: "Refresh map",
		ko: "맵 새로고침",
		descEn: "Make all events on this map, and common events, refresh themselves.",
		descKo: "이 맵의 이벤트와 공통 이벤트를 다시 검사합니다."
	},
	{
		id: "day_care",
		kind: "debug",
		parent: "field_menu",
		en: "Day Care",
		ko: "키우미집",
		descEn: "View Pokémon in the Day Care and edit them.",
		descKo: "키우미집의 포켓몬을 보고 고칩니다."
	},
	{
		id: "storage_wallpapers",
		kind: "debug",
		parent: "field_menu",
		en: "Toggle storage wallpapers",
		ko: "박스 벽지",
		descEn: "Unlock and lock special wallpapers used in Pokémon storage.",
		descKo: "보관함 특수 벽지를 잠그거나 해제합니다."
	},
	{
		id: "skip_credits",
		kind: "debug",
		parent: "field_menu",
		en: "Skip credits",
		ko: "엔딩 스킵",
		descEn: "Toggle whether credits can be ended early by pressing the Use input.",
		descKo: "엔딩 크레딧을 결정 키로 건너뛸 수 있는지 바꿉니다."
	},
	{
		id: "battle_menu",
		kind: "debug",
		parent: "main",
		en: "Battle options...",
		ko: "배틀 설정...",
		descEn: "Start battles, reset this map's trainers, ready rematches, edit roamers, etc.",
		descKo: "배틀 테스트, 이 맵 트레이너 리셋, 배회 포켓몬 등을 다룹니다."
	},
	{
		id: "test_wild_battle",
		kind: "debug",
		parent: "battle_menu",
		en: "Test wild battle",
		ko: "야생 배틀 테스트",
		descEn: "Start a single battle against a wild Pokémon. You choose the species/level.",
		descKo: "종족과 레벨을 골라 야생 포켓몬과 한 마리 배틀을 시작합니다."
	},
	{
		id: "test_wild_battle_advanced",
		kind: "debug",
		parent: "battle_menu",
		en: "Test wild battle advanced",
		ko: "야생 배틀 고급",
		descEn: "Start a battle against 1 or more wild Pokémon. Battle size is your choice.",
		descKo: "여러 야생 포켓몬과, 원하는 배틀 인원으로 싸웁니다."
	},
	{
		id: "test_trainer_battle",
		kind: "debug",
		parent: "battle_menu",
		en: "Test trainer battle",
		ko: "트레이너 배틀 테스트",
		descEn: "Start a single battle against a trainer of your choice.",
		descKo: "선택한 트레이너와 배틀을 시작합니다."
	},
	{
		id: "test_trainer_battle_advanced",
		kind: "debug",
		parent: "battle_menu",
		en: "Test trainer battle advanced",
		ko: "트레이너 배틀 고급",
		descEn: "Start a battle against 1 or more trainers with a battle size of your choice.",
		descKo: "여러 트레이너와, 원하는 배틀 인원으로 싸웁니다."
	},
	{
		id: "encounter_version",
		kind: "debug",
		parent: "battle_menu",
		en: "Set wild encounters version",
		ko: "야생 출현 버전",
		descEn: "Choose which version of wild encounters should be used.",
		descKo: "야생 출현 테이블 버전을 고릅니다."
	},
	{
		id: "roamers",
		kind: "debug",
		parent: "battle_menu",
		en: "Roaming Pokémon",
		ko: "배회 포켓몬",
		descEn: "Toggle and edit all roaming Pokémon.",
		descKo: "배회 포켓몬의 상태와 위치를 고칩니다."
	},
	{
		id: "reset_trainers",
		kind: "debug",
		parent: "battle_menu",
		en: "Reset map's trainers",
		ko: "이 맵 트레이너 리셋",
		descEn: "Turn off Self Switches A and B for all events with \"Trainer\" in their name.",
		descKo: "이름에 Trainer가 있는 이벤트의 셀프 스위치 A/B를 끕니다."
	},
	{
		id: "toggle_exp_all",
		kind: "debug",
		parent: "battle_menu",
		en: "Toggle Exp. All's effect",
		ko: "경험치나누기 효과",
		descEn: "Toggle Exp. All's effect of giving Exp. to non-participants.",
		descKo: "배틀에 내보내지 않은 포켓몬에게도 경험치를 줄지 바꿉니다."
	},
	{
		id: "toggle_logging",
		kind: "debug",
		parent: "battle_menu",
		en: "Toggle logging of battle messages",
		ko: "배틀 로그 기록",
		descEn: "Record debug logs for battles in Data/debuglog.txt.",
		descKo: "배틀 디버그 로그를 Data/debuglog.txt에 남깁니다."
	},
	{
		id: "pokemon_menu",
		kind: "debug",
		parent: "main",
		en: "Pokémon options...",
		ko: "포켓몬 설정...",
		descEn: "Heal the party, give Pokémon, fill/empty PC storage, etc.",
		descKo: "파티 회복, 포켓몬 추가, 박스 채우기/비우기 등을 다룹니다."
	},
	{
		id: "heal_party",
		kind: "debug",
		parent: "pokemon_menu",
		en: "Heal party",
		ko: "파티 회복",
		descEn: "Fully heal the HP/status/PP of all Pokémon in the party.",
		descKo: "파티의 HP·상태·PP를 모두 회복합니다."
	},
	{
		id: "add_pokemon",
		kind: "debug",
		parent: "pokemon_menu",
		en: "Add Pokémon",
		ko: "포켓몬 추가",
		descEn: "Give yourself a Pokémon of a chosen species/level. Goes to PC if party is full.",
		descKo: "종족과 레벨을 골라 받습니다. 파티가 가득하면 박스로 갑니다."
	},
	{
		id: "fill_boxes",
		kind: "debug",
		parent: "pokemon_menu",
		en: "Fill storage boxes",
		ko: "박스 채우기",
		descEn: "Puts one Pokémon of each species (at Level 50) in storage.",
		descKo: "모든 종족을 레벨 50으로 박스에 한 마리씩 넣습니다."
	},
	{
		id: "clear_boxes",
		kind: "debug",
		parent: "pokemon_menu",
		en: "Clear storage boxes",
		ko: "박스 비우기",
		descEn: "Remove all Pokémon in storage.",
		descKo: "보관함의 포켓몬을 모두 지웁니다."
	},
	{
		id: "give_demo_party",
		kind: "debug",
		parent: "pokemon_menu",
		en: "Give demo party",
		ko: "데모 파티",
		descEn: "Give yourself a predefined party of Pokémon.",
		descKo: "미리 정해 둔 파티를 받습니다."
	},
	{
		id: "quick_hatch_party_eggs",
		kind: "debug",
		parent: "pokemon_menu",
		en: "Quick hatch all party eggs",
		ko: "파티 알 바로 부화",
		descEn: "Make all eggs in the party require only one more step to hatch.",
		descKo: "파티의 알이 한 걸음만 더 걸으면 부화하게 합니다."
	},
	{
		id: "open_storage",
		kind: "debug",
		parent: "pokemon_menu",
		en: "Access Pokémon storage",
		ko: "포켓몬 보관함",
		descEn: "Open the Pokémon storage screen.",
		descKo: "포켓몬 보관함 화면을 엽니다."
	},
	{
		id: "shadow_pokemon_menu",
		kind: "debug",
		parent: "pokemon_menu",
		en: "Shadow Pokémon options...",
		ko: "그림자 포켓몬...",
		descEn: "Snag Machine and purification.",
		descKo: "스내그머신과 정화를 다룹니다."
	},
	{
		id: "toggle_snag_machine",
		kind: "debug",
		parent: "shadow_pokemon_menu",
		en: "Toggle Snag Machine",
		ko: "스내그머신",
		descEn: "Toggle all Poké Balls being able to catch Shadow Pokémon.",
		descKo: "모든 볼로 그림자 포켓몬을 잡을 수 있는지 바꿉니다."
	},
	{
		id: "toggle_purify_chamber_access",
		kind: "debug",
		parent: "shadow_pokemon_menu",
		en: "Toggle Purify Chamber access",
		ko: "정화장치 사용",
		descEn: "Toggle access to the Purify Chamber via the PC.",
		descKo: "PC에서 정화장치를 쓸 수 있는지 바꿉니다."
	},
	{
		id: "purify_chamber",
		kind: "debug",
		parent: "shadow_pokemon_menu",
		en: "Use Purify Chamber",
		ko: "정화장치 열기",
		descEn: "Open the Purify Chamber for Shadow Pokémon purification.",
		descKo: "그림자 포켓몬 정화장치를 엽니다."
	},
	{
		id: "relic_stone",
		kind: "debug",
		parent: "shadow_pokemon_menu",
		en: "Use Relic Stone",
		ko: "성스러운 돌",
		descEn: "Choose a Shadow Pokémon to show to the Relic Stone for purification.",
		descKo: "그림자 포켓몬을 성스러운 돌에 보여 정화합니다."
	},
	{
		id: "items_menu",
		kind: "debug",
		parent: "main",
		en: "Item options...",
		ko: "도구 설정...",
		descEn: "Give and take items.",
		descKo: "도구를 넣거나 빼니다."
	},
	{
		id: "add_item",
		kind: "debug",
		parent: "items_menu",
		en: "Add item",
		ko: "도구 추가",
		descEn: "Choose an item and a quantity of it to add to the Bag.",
		descKo: "도구와 개수를 골라 가방에 넣습니다."
	},
	{
		id: "fill_bag",
		kind: "debug",
		parent: "items_menu",
		en: "Fill Bag",
		ko: "가방 채우기",
		descEn: "Empties the Bag and then fills it with a certain number of every item.",
		descKo: "가방을 비운 뒤 모든 도구를 넣은 개수만큼 채웁니다."
	},
	{
		id: "empty_bag",
		kind: "debug",
		parent: "items_menu",
		en: "Empty Bag",
		ko: "가방 비우기",
		descEn: "Remove all items from the Bag.",
		descKo: "가방의 도구를 모두 지웁니다."
	},
	{
		id: "player_menu",
		kind: "debug",
		parent: "main",
		en: "Player options...",
		ko: "플레이어 설정...",
		descEn: "Set money, badges, Pokédexes, player's appearance and name, etc.",
		descKo: "돈, 배지, 도감, 주인공 외형과 이름 등을 다룹니다."
	},
	{
		id: "set_money",
		kind: "debug",
		parent: "player_menu",
		en: "Set money",
		ko: "소지금 설정",
		descEn: "Edit how much money, Game Corner Coins and Battle Points you have.",
		descKo: "돈, 동전, BP를 고칩니다."
	},
	{
		id: "set_badges",
		kind: "debug",
		parent: "player_menu",
		en: "Set Gym Badges",
		ko: "배지 설정",
		descEn: "Toggle possession of each Gym Badge.",
		descKo: "체육관 배지 보유를 바꿉니다."
	},
	{
		id: "toggle_running_shoes",
		kind: "debug",
		parent: "player_menu",
		en: "Toggle running shoes",
		ko: "러닝슈즈",
		descEn: "Toggle possession of running shoes.",
		descKo: "러닝슈즈 보유를 바꿉니다."
	},
	{
		id: "toggle_pokedex",
		kind: "debug",
		parent: "player_menu",
		en: "Toggle Pokédex and Regional Dexes",
		ko: "도감 설정",
		descEn: "Toggle possession of the Pokédex, and edit Regional Dex accessibility.",
		descKo: "도감 보유와 지역 도감 개방을 바꿉니다."
	},
	{
		id: "toggle_pokegear",
		kind: "debug",
		parent: "player_menu",
		en: "Toggle Pokégear",
		ko: "포켓기어",
		descEn: "Toggle possession of the Pokégear.",
		descKo: "포켓기어 보유를 바꿉니다."
	},
	{
		id: "edit_phone_contacts",
		kind: "debug",
		parent: "player_menu",
		en: "Edit phone and contacts",
		ko: "전화·연락처",
		descEn: "Edit properties of the phone and of contacts registered in it.",
		descKo: "전화와 등록된 연락처를 고칩니다."
	},
	{
		id: "toggle_box_link",
		kind: "debug",
		parent: "player_menu",
		en: "Toggle access to storage from party screen",
		ko: "파티에서 박스 열기",
		descEn: "Toggle access to storage from the party screen.",
		descKo: "파티 화면에서 보관함을 열 수 있는지 바꿉니다."
	},
	{
		id: "set_player_character",
		kind: "debug",
		parent: "player_menu",
		en: "Set player character",
		ko: "주인공 캐릭터",
		descEn: "Edit the player's character, as defined in \"metadata.txt\".",
		descKo: "주인공 캐릭터를 바꿉니다."
	},
	{
		id: "change_outfit",
		kind: "debug",
		parent: "player_menu",
		en: "Set player outfit",
		ko: "의상 번호",
		descEn: "Edit the player's outfit number.",
		descKo: "주인공 의상 번호를 바꿉니다."
	},
	{
		id: "rename_player",
		kind: "debug",
		parent: "player_menu",
		en: "Set player name",
		ko: "이름 변경",
		descEn: "Rename the player.",
		descKo: "주인공 이름을 바꿉니다."
	},
	{
		id: "random_id",
		kind: "debug",
		parent: "player_menu",
		en: "Randomize player ID",
		ko: "ID 무작위",
		descEn: "Generate a random new ID for the player.",
		descKo: "플레이어 ID를 무작위로 다시 만듭니다."
	},
	{
		id: "pbs_editors_menu",
		kind: "debug",
		parent: "main",
		en: "PBS file editors...",
		ko: "PBS 편집...",
		descEn: "Edit information in the PBS files.",
		descKo: "PBS 파일의 데이터를 고칩니다. 배포본에는 PBS가 없을 수 있습니다."
	},
	{
		id: "set_map_connections",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit map_connections.txt",
		ko: "맵 연결 편집",
		descEn: "Connect maps using a visual interface. Can also edit map encounters/metadata.",
		descKo: "맵 연결을 시각적으로 고칩니다."
	},
	{
		id: "set_encounters",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit encounters.txt",
		ko: "출현 편집",
		descEn: "Edit the wild Pokémon that can be found on maps, and how they are encountered.",
		descKo: "맵의 야생 출현을 고칩니다."
	},
	{
		id: "set_trainers",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit trainers.txt",
		ko: "트레이너 편집",
		descEn: "Edit individual trainers, their Pokémon and items.",
		descKo: "트레이너와 포켓몬·도구를 고칩니다."
	},
	{
		id: "set_trainer_types",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit trainer_types.txt",
		ko: "트레이너 타입 편집",
		descEn: "Edit the properties of trainer types.",
		descKo: "트레이너 타입 속성을 고칩니다."
	},
	{
		id: "set_map_metadata",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit map_metadata.txt",
		ko: "맵 메타데이터",
		descEn: "Edit map metadata.",
		descKo: "맵 메타데이터를 고칩니다."
	},
	{
		id: "set_metadata",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit metadata.txt",
		ko: "전역 메타데이터",
		descEn: "Edit global metadata and player character metadata.",
		descKo: "전역·주인공 메타데이터를 고칩니다."
	},
	{
		id: "set_items",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit items.txt",
		ko: "도구 데이터 편집",
		descEn: "Edit item data.",
		descKo: "도구 데이터를 고칩니다."
	},
	{
		id: "set_species",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit pokemon.txt",
		ko: "종족 데이터 편집",
		descEn: "Edit Pokémon species data.",
		descKo: "종족 데이터를 고칩니다."
	},
	{
		id: "position_sprites",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit pokemon_metrics.txt",
		ko: "스프라이트 위치",
		descEn: "Reposition Pokémon sprites in battle.",
		descKo: "배틀 스프라이트 위치를 고칩니다."
	},
	{
		id: "auto_position_sprites",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Auto-set pokemon_metrics.txts",
		ko: "스프라이트 위치 자동",
		descEn: "Automatically reposition all Pokémon sprites in battle. Don't use lightly.",
		descKo: "배틀 스프라이트 위치를 자동으로 맞춥니다."
	},
	{
		id: "set_pokedex_lists",
		kind: "debug",
		parent: "pbs_editors_menu",
		en: "Edit regional_dexes.txt",
		ko: "지역도감 편집",
		descEn: "Create, rearrange and delete Regional Pokédex lists.",
		descKo: "지역 도감 목록을 만듭니다."
	},
	{
		id: "editors_menu",
		kind: "debug",
		parent: "main",
		en: "Other editors...",
		ko: "기타 편집...",
		descEn: "Edit battle animations, terrain tags, map data, etc.",
		descKo: "배틀 애니메이션, 지형 태그 등을 고칩니다."
	},
	{
		id: "animation_editor",
		kind: "debug",
		parent: "editors_menu",
		en: "Battle animation editor",
		ko: "배틀 애니메이션 편집",
		descEn: "Edit the battle animations.",
		descKo: "배틀 애니메이션을 고칩니다."
	},
	{
		id: "animation_organiser",
		kind: "debug",
		parent: "editors_menu",
		en: "Battle animation organiser",
		ko: "배틀 애니메이션 정리",
		descEn: "Rearrange/add/delete battle animations.",
		descKo: "배틀 애니메이션을 정리합니다."
	},
	{
		id: "import_animations",
		kind: "debug",
		parent: "editors_menu",
		en: "Import all battle animations",
		ko: "애니메이션 가져오기",
		descEn: "Import all battle animations from the \"Animations\" folder.",
		descKo: "Animations 폴더에서 가져옵니다."
	},
	{
		id: "export_animations",
		kind: "debug",
		parent: "editors_menu",
		en: "Export all battle animations",
		ko: "애니메이션 내보내기",
		descEn: "Export all battle animations individually to the \"Animations\" folder.",
		descKo: "Animations 폴더로 내보냅니다."
	},
	{
		id: "set_terrain_tags",
		kind: "debug",
		parent: "editors_menu",
		en: "Edit terrain tags",
		ko: "지형 태그",
		descEn: "Edit the terrain tags of tiles in tilesets. Required for tags 8+.",
		descKo: "타일셋의 지형 태그를 고칩니다."
	},
	{
		id: "fix_invalid_tiles",
		kind: "debug",
		parent: "editors_menu",
		en: "Fix invalid tiles",
		ko: "잘못된 타일 수정",
		descEn: "Scans all maps and erases non-existent tiles.",
		descKo: "없는 타일을 지웁니다."
	},
	{
		id: "files_menu",
		kind: "debug",
		parent: "main",
		en: "Files options...",
		ko: "파일 설정...",
		descEn: "Compile, generate PBS files, translations, Mystery Gifts, etc.",
		descKo: "컴파일, PBS 생성, 번역, 이상한 소포 등을 다룹니다."
	},
	{
		id: "compile_data",
		kind: "debug",
		parent: "files_menu",
		en: "Compile data",
		ko: "데이터 컴파일",
		descEn: "Fully compile all data.",
		descKo: "데이터를 다시 컴파일합니다."
	},
	{
		id: "create_pbs_files",
		kind: "debug",
		parent: "files_menu",
		en: "Create PBS file(s)",
		ko: "PBS 파일 만들기",
		descEn: "Choose one or all PBS files and create it.",
		descKo: "PBS 파일을 만듭니다."
	},
	{
		id: "rename_files",
		kind: "debug",
		parent: "files_menu",
		en: "Rename outdated files",
		ko: "옛 파일 이름 바꾸기",
		descEn: "Check for files with outdated names and rename/move them. Can alter map data.",
		descKo: "옛 파일 이름을 바꿉니다."
	},
	{
		id: "extract_text",
		kind: "debug",
		parent: "files_menu",
		en: "Extract text for translation",
		ko: "번역용 텍스트 추출",
		descEn: "Extract all text in the game to text files for translating.",
		descKo: "번역용 텍스트를 뽑습니다."
	},
	{
		id: "compile_text",
		kind: "debug",
		parent: "files_menu",
		en: "Compile translated text",
		ko: "번역 텍스트 컴파일",
		descEn: "Import text files and convert them into a language file.",
		descKo: "번역 텍스트를 언어 파일로 만듭니다."
	},
	{
		id: "mystery_gift",
		kind: "debug",
		parent: "files_menu",
		en: "Manage Mystery Gifts",
		ko: "이상한 소포",
		descEn: "Edit and enable/disable Mystery Gifts.",
		descKo: "이상한 소포를 고칩니다."
	},
	{
		id: "reload_system_cache",
		kind: "debug",
		parent: "files_menu",
		en: "Reload system cache",
		ko: "캐시 다시 읽기",
		descEn: "Refreshes the system's file cache. Use if you change a file while playing.",
		descKo: "파일 캐시를 다시 읽습니다."
	},
	{
		id: "hp_status_menu",
		kind: "pokemon",
		parent: "main",
		en: "HP/status...",
		ko: "HP/상태..."
	},
	{
		id: "set_hp",
		kind: "pokemon",
		parent: "hp_status_menu",
		en: "Set HP",
		ko: "HP 설정"
	},
	{
		id: "set_status",
		kind: "pokemon",
		parent: "hp_status_menu",
		en: "Set status",
		ko: "상태이상 설정"
	},
	{
		id: "full_heal",
		kind: "pokemon",
		parent: "hp_status_menu",
		en: "Fully heal",
		ko: "완전 회복"
	},
	{
		id: "heal_hp_status",
		kind: "pokemon",
		parent: "hp_status_menu",
		en: "Heal HP and status",
		ko: "HP·상태 회복"
	},
	{
		id: "make_fainted",
		kind: "pokemon",
		parent: "hp_status_menu",
		en: "Make fainted",
		ko: "기절시키기"
	},
	{
		id: "set_pokerus",
		kind: "pokemon",
		parent: "hp_status_menu",
		en: "Set Pokérus",
		ko: "포켓러스"
	},
	{
		id: "level_stats",
		kind: "pokemon",
		parent: "main",
		en: "Level/stats...",
		ko: "레벨/능력치..."
	},
	{
		id: "set_level",
		kind: "pokemon",
		parent: "level_stats",
		en: "Set level",
		ko: "레벨 설정"
	},
	{
		id: "set_exp",
		kind: "pokemon",
		parent: "level_stats",
		en: "Set Exp",
		ko: "경험치 설정"
	},
	{
		id: "hidden_values",
		kind: "pokemon",
		parent: "level_stats",
		en: "EV/IV/personal ID...",
		ko: "노력치/개체값/ID..."
	},
	{
		id: "set_happiness",
		kind: "pokemon",
		parent: "level_stats",
		en: "Set happiness",
		ko: "친밀도"
	},
	{
		id: "contest_stats",
		kind: "pokemon",
		parent: "level_stats",
		en: "Contest stats...",
		ko: "콘테스트 능력..."
	},
	{
		id: "set_beauty",
		kind: "pokemon",
		parent: "contest_stats",
		en: "Set Beauty",
		ko: "아름다움"
	},
	{
		id: "set_cool",
		kind: "pokemon",
		parent: "contest_stats",
		en: "Set Cool",
		ko: "근사함"
	},
	{
		id: "set_cute",
		kind: "pokemon",
		parent: "contest_stats",
		en: "Set Cute",
		ko: "귀여움"
	},
	{
		id: "set_smart",
		kind: "pokemon",
		parent: "contest_stats",
		en: "Set Smart",
		ko: "슬기로움"
	},
	{
		id: "set_tough",
		kind: "pokemon",
		parent: "contest_stats",
		en: "Set Tough",
		ko: "강인함"
	},
	{
		id: "set_sheen",
		kind: "pokemon",
		parent: "contest_stats",
		en: "Set Sheen",
		ko: "윤기"
	},
	{
		id: "moves",
		kind: "pokemon",
		parent: "main",
		en: "Moves...",
		ko: "기술..."
	},
	{
		id: "teach_move",
		kind: "pokemon",
		parent: "moves",
		en: "Teach move",
		ko: "기술 가르치기"
	},
	{
		id: "forget_move",
		kind: "pokemon",
		parent: "moves",
		en: "Forget move",
		ko: "기술 지우기"
	},
	{
		id: "reset_moves",
		kind: "pokemon",
		parent: "moves",
		en: "Reset moves",
		ko: "기술 초기화"
	},
	{
		id: "set_move_pp",
		kind: "pokemon",
		parent: "moves",
		en: "Set move PP",
		ko: "PP 설정"
	},
	{
		id: "set_initial_moves",
		kind: "pokemon",
		parent: "moves",
		en: "Reset initial moves",
		ko: "초기 기술로"
	},
	{
		id: "set_item",
		kind: "pokemon",
		parent: "main",
		en: "Set item",
		ko: "지닌 도구"
	},
	{
		id: "set_ability",
		kind: "pokemon",
		parent: "main",
		en: "Set ability",
		ko: "특성"
	},
	{
		id: "set_nature",
		kind: "pokemon",
		parent: "main",
		en: "Set nature",
		ko: "성격"
	},
	{
		id: "set_gender",
		kind: "pokemon",
		parent: "main",
		en: "Set gender",
		ko: "성별"
	},
	{
		id: "species_and_form",
		kind: "pokemon",
		parent: "main",
		en: "Species/form...",
		ko: "종족/폼..."
	},
	{
		id: "set_form",
		kind: "pokemon",
		parent: "species_and_form",
		en: "Set form",
		ko: "폼 설정"
	},
	{
		id: "set_species_pkmn",
		kind: "pokemon",
		parent: "species_and_form",
		en: "Set species",
		ko: "종족 설정"
	},
	{
		id: "cosmetic",
		kind: "pokemon",
		parent: "main",
		en: "Cosmetic info...",
		ko: "외형..."
	},
	{
		id: "set_shininess",
		kind: "pokemon",
		parent: "cosmetic",
		en: "Set shininess",
		ko: "색이 다른"
	},
	{
		id: "set_pokeball",
		kind: "pokemon",
		parent: "cosmetic",
		en: "Set Poké Ball",
		ko: "몬스터볼"
	},
	{
		id: "set_ribbons",
		kind: "pokemon",
		parent: "cosmetic",
		en: "Set ribbons",
		ko: "리본"
	},
	{
		id: "set_nickname",
		kind: "pokemon",
		parent: "cosmetic",
		en: "Set nickname",
		ko: "닉네임"
	},
	{
		id: "ownership",
		kind: "pokemon",
		parent: "cosmetic",
		en: "Ownership...",
		ko: "어버이..."
	},
	{
		id: "set_discardable",
		kind: "pokemon",
		parent: "main",
		en: "Set discardable",
		ko: "놓아주기 가능"
	},
	{
		id: "set_egg",
		kind: "pokemon",
		parent: "main",
		en: "Set egg",
		ko: "알 설정"
	},
	{
		id: "shadow_pkmn",
		kind: "pokemon",
		parent: "main",
		en: "Shadow Pkmn...",
		ko: "그림자 포켓몬..."
	},
	{
		id: "mystery_gift_pkmn",
		kind: "pokemon",
		parent: "main",
		en: "Mystery Gift",
		ko: "이상한 소포"
	},
	{
		id: "duplicate",
		kind: "pokemon",
		parent: "main",
		en: "Duplicate",
		ko: "복제"
	},
	{
		id: "delete",
		kind: "pokemon",
		parent: "main",
		en: "Delete",
		ko: "삭제"
	},
	{
		id: "battlers",
		kind: "battle",
		parent: "main",
		en: "Battlers...",
		ko: "배틀러...",
		descEn: "Look at Pokémon in battle and change their properties.",
		descKo: "배틀 중인 포켓몬을 보고 고칩니다."
	},
	{
		id: "list_player_battlers",
		kind: "battle",
		parent: "battlers",
		en: "Player-side battlers",
		ko: "아군 배틀러",
		descEn: "Edit Pokémon on the player's side of battle.",
		descKo: "아군 쪽 포켓몬을 고칩니다."
	},
	{
		id: "list_foe_battlers",
		kind: "battle",
		parent: "battlers",
		en: "Foe-side battlers",
		ko: "상대 배틀러",
		descEn: "Edit Pokémon on the opposing side of battle.",
		descKo: "상대 쪽 포켓몬을 고칩니다."
	},
	{
		id: "speed_order",
		kind: "battle",
		parent: "battlers",
		en: "View battler speed order",
		ko: "스피드 순서",
		descEn: "Show all battlers in order from fastest to slowest.",
		descKo: "빠른 순으로 배틀러를 보여 줍니다."
	},
	{
		id: "pokemon_teams",
		kind: "battle",
		parent: "main",
		en: "Pokémon teams",
		ko: "포켓몬 파티",
		descEn: "Look at and edit all Pokémon in each team.",
		descKo: "양쪽 파티를 보고 고칩니다."
	},
	{
		id: "trainers",
		kind: "battle",
		parent: "main",
		en: "Trainer options...",
		ko: "트레이너 설정...",
		descEn: "Variables that apply to trainers.",
		descKo: "트레이너에게 걸리는 설정을 다룹니다."
	},
	{
		id: "trainer_items",
		kind: "battle",
		parent: "trainers",
		en: "NPC trainer items",
		ko: "NPC 도구",
		descEn: "View and change the items each NPC trainer has access to.",
		descKo: "NPC 트레이너 도구를 고칩니다."
	},
	{
		id: "mega_evolution",
		kind: "battle",
		parent: "trainers",
		en: "Mega Evolution",
		ko: "메가진화",
		descEn: "Whether each trainer is allowed to Mega Evolve.",
		descKo: "메가진화 가능 여부를 바꿉니다."
	},
	{
		id: "field",
		kind: "battle",
		parent: "main",
		en: "Field effects...",
		ko: "필드 효과...",
		descEn: "Effects that apply to the whole battlefield.",
		descKo: "배틀필드 전체에 걸리는 효과를 다룹니다."
	},
	{
		id: "weather",
		kind: "battle",
		parent: "field",
		en: "Weather",
		ko: "날씨",
		descEn: "Set weather and duration.",
		descKo: "날씨와 지속 턴을 정합니다."
	},
	{
		id: "terrain",
		kind: "battle",
		parent: "field",
		en: "Terrain",
		ko: "필드",
		descEn: "Set terrain and duration.",
		descKo: "필드와 지속 턴을 정합니다."
	},
	{
		id: "environment_time",
		kind: "battle",
		parent: "field",
		en: "Environment/time",
		ko: "환경/시간",
		descEn: "Set the battle's environment and time of day.",
		descKo: "배틀 환경과 시간을 정합니다."
	},
	{
		id: "backdrop",
		kind: "battle",
		parent: "field",
		en: "Backdrop names",
		ko: "배경 이름",
		descEn: "Set the names of the backdrop and base graphics.",
		descKo: "배경·바닥 그래픽 이름을 정합니다."
	},
	{
		id: "set_field_effects",
		kind: "battle",
		parent: "field",
		en: "Other field effects...",
		ko: "기타 필드 효과...",
		descEn: "View/set other effects that apply to the whole battlefield.",
		descKo: "그 외 필드 효과를 고칩니다."
	},
	{
		id: "player_side",
		kind: "battle",
		parent: "field",
		en: "Player's side effects...",
		ko: "아군 사이드 효과...",
		descEn: "Effects that apply to the side the player is on.",
		descKo: "아군 사이드 효과를 고칩니다."
	},
	{
		id: "opposing_side",
		kind: "battle",
		parent: "field",
		en: "Foe's side effects...",
		ko: "상대 사이드 효과...",
		descEn: "Effects that apply to the opposing side.",
		descKo: "상대 사이드 효과를 고칩니다."
	},
	{
		id: "position_effects",
		kind: "battle",
		parent: "field",
		en: "Battler position effects...",
		ko: "자리 효과...",
		descEn: "Effects that apply to individual battler positions.",
		descKo: "자리마다 걸리는 효과를 고칩니다."
	},
	{
		id: "bp_hp_status",
		kind: "battle_pokemon",
		parent: "main",
		en: "HP/status...",
		ko: "HP/상태..."
	},
	{
		id: "bp_set_hp",
		kind: "battle_pokemon",
		parent: "hp_status_menu",
		en: "Set HP",
		ko: "HP 설정"
	},
	{
		id: "bp_set_status",
		kind: "battle_pokemon",
		parent: "hp_status_menu",
		en: "Set status",
		ko: "상태이상 설정"
	},
	{
		id: "bp_full_heal",
		kind: "battle_pokemon",
		parent: "hp_status_menu",
		en: "Fully heal",
		ko: "완전 회복"
	},
	{
		id: "bp_level_stats",
		kind: "battle_pokemon",
		parent: "main",
		en: "Stats/level...",
		ko: "능력치/레벨..."
	},
	{
		id: "bp_set_stat_stages",
		kind: "battle_pokemon",
		parent: "level_stats",
		en: "Set stat stages",
		ko: "능력 랭크"
	},
	{
		id: "bp_set_stat_values",
		kind: "battle_pokemon",
		parent: "level_stats",
		en: "Set stat values",
		ko: "능력치 값"
	},
	{
		id: "bp_set_types",
		kind: "battle_pokemon",
		parent: "main",
		en: "Set types",
		ko: "타입 설정"
	},
	{
		id: "bp_set_effects",
		kind: "battle_pokemon",
		parent: "main",
		en: "Set effects",
		ko: "효과 설정"
	}
];
var DEBUG_EXTRA_KO = {
	Debug: "디버그",
	"Open the debug menu.": "디버그 메뉴를 엽니다.",
	"Do what with {1}?": "{1}을(를) 어떻게 할까요?",
	"Your Pokémon were fully healed.": "포켓몬을 모두 회복했습니다.",
	"Added {1} to party.": "{1}을(를) 파티에 넣었습니다.",
	"Added {1} to Pokémon storage.": "{1}을(를) 보관함에 넣었습니다.",
	"Couldn't add Pokémon because party and storage are full.": "파티와 보관함이 가득 차 넣을 수 없습니다.",
	"Storage boxes were filled with one Pokémon of each species.": "모든 종족을 박스에 한 마리씩 넣었습니다.",
	"The storage boxes were cleared.": "보관함을 비웠습니다.",
	"All Trainers on this map were reset.": "이 맵의 트레이너를 리셋했습니다.",
	"This command can't be used here.": "여기에서는 쓸 수 없습니다.",
	"Enabled Exp. All's effect.": "경험치나누기 효과를 켰습니다.",
	"Disabled Exp. All's effect.": "경험치나누기 효과를 껐습니다.",
	"Gave {1}x {2}.": "{2}을(를) {1}개 넣었습니다.",
	"Choose the number of items.": "개수를 고르세요.",
	"Add how many {1}?": "{1}을(를) 몇 개 넣을까요?",
	"Set the Pokémon's level.": "포켓몬의 레벨을 정하세요.",
	"You aren't in the Safari Zone or a Bug-Catching Contest!": "사파리존이나 곤충채집 중이 아닙니다.",
	"You're not in a dark map!": "어두운 맵이 아닙니다.",
	"No Pokémon were chosen, cannot start battle.": "포켓몬을 고르지 않아 배틀을 시작할 수 없습니다.",
	"You only have one Pokémon.": "포켓몬이 한 마리뿐입니다.",
	"Credits can be skipped when played in future.": "다음 엔딩부터 건너뛸 수 있습니다.",
	"Credits cannot be skipped when next played.": "다음 엔딩은 건너뛸 수 없습니다.",
	"There are no special wallpapers defined.": "특수 벽지가 없습니다.",
	"No description available": "설명이 없습니다.",
	"<No description available>": "<설명 없음>",
	"Search for what?": "무엇을 찾을까요?",
	CANCEL: "취소",
	Cancel: "취소",
	"Money: ${1}": "돈: {1}원",
	"Coins: {1}": "동전: {1}",
	"Battle Points: {1}": "BP: {1}",
	"ADD ITEM": "도구 추가",
	"ADD POKÉMON": "포켓몬 추가",
	"Choose a Pokémon.": "포켓몬을 고르세요.",
	"The map will refresh.": "맵을 새로고칩니다.",
	"(결과 없음)": "(결과 없음)",
	"Give yourself 6 preset Pokémon. They overwrite the current party.": "정해 둔 6마리를 받습니다. 지금 파티를 덮어씁니다.",
	"Make all eggs in the party require just one more step to hatch.": "파티의 알이 한 걸음만 더 걸으면 부화하게 합니다.",
	"Opens the Pokémon storage boxes in Organize Boxes mode.": "정리 모드로 보관함을 엽니다.",
	"Shadow Pokémon": "그림자 포켓몬"
};
function debugKoMap() {
	const m = { ...DEBUG_EXTRA_KO };
	for (const item of DEBUG_ITEMS) {
		m[item.en] = item.ko;
		if (item.descEn && item.descKo) m[item.descEn] = item.descKo;
	}
	return m;
}
function debugMatch(item, q) {
	const n = q.trim().toLowerCase();
	if (!n) return true;
	const blob = [
		item.ko,
		item.en,
		item.descKo,
		item.descEn,
		item.id,
		DEBUG_KIND_KO[item.kind],
		DEBUG_GROUP_KO[item.parent] || ""
	].join(" ").toLowerCase();
	if (blob.includes(n)) return true;
	const tokens = n.split(/\s+/).filter(Boolean);
	if (tokens.length > 1 && tokens.every((t) => blob.includes(t))) return true;
	const compact = (s) => s.toLowerCase().replace(/[\s:._\-()/]/g, "");
	return compact(blob).includes(compact(n));
}
var META$1 = `Name       = Redforge Debug KO
Version    = 1.1
Essentials = 19,20,21
Credits    = 레드포지
`;
function rubyQuote(s) {
	return `"${s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/#/g, "\\#")}"`;
}
function byEnRuby() {
	return Object.entries(debugKoMap()).map(([k, v]) => `    ${rubyQuote(k)} => ${rubyQuote(v)}`).join(",\n");
}
function buildScript() {
	return `#===============================================================================
# 레드포지 — 디버그 메뉴 한글화 + 검색
# 이 폴더를 Plugins 안에 두고, 게임을 끌 때 Ctrl을 누른 채로 실행하세요.
# F9 디버그 / 포켓몬 디버그 / 배틀 디버그, 종족·기술·도구 목록에서
# F 키(또는 점프 위)로 한글 이름·영문 ID·번호를 검색합니다.
#===============================================================================

module RedforgeDebug
  BY_EN = {
${byEnRuby()}
  }

  def self.tr(msg)
    return msg if !msg.is_a?(String)
    BY_EN[msg] || msg
  end

  def self.match?(text, query)
    return true if query.nil? || query == ""
    s = text.to_s.downcase
    q = query.to_s.downcase.strip
    return true if q == ""
    return true if s.include?(q)
    tokens = q.split(/\\s+/).reject { |t| t == "" }
    return true if tokens.length > 1 && tokens.all? { |t| s.include?(t) }
    s2 = s.gsub(/[\\s:\\._\\-\\/\\(\\)]/, "")
    q2 = q.gsub(/[\\s:\\._\\-\\/\\(\\)]/, "")
    return true if q2 != "" && s2.include?(q2)
    false
  end

  def self.search_key?
    begin
      return true if Input.respond_to?(:triggerex?) && Input.triggerex?(:F)
    rescue
    end
    begin
      return true if Input.respond_to?(:triggerex?) && Input.triggerex?(0x46)
    rescue
    end
    begin
      return true if defined?(Input::SPECIAL) && Input.trigger?(Input::SPECIAL)
    rescue
    end
    return true if defined?(Input::JUMPUP) && Input.trigger?(Input::JUMPUP)
    false
  end

  def self.prompt_query(current)
    current = "" if current.nil?
    ret = pbMessageFreeText(_INTL("검색 (이름·번호·ID)"), current.to_s, false, 40)
    return ret.to_s
  end

  def self.apply_handlers
    menus = [:debug_menu, :pokemon_debug_menu, :battle_debug_menu,
             :battle_pokemon_debug_menu, :pause_menu]
    menus.each { |menu| rewrite_menu(menu) }
  end

  def self.rewrite_menu(menu)
    return if !defined?(MenuHandlers)
    if MenuHandlers.respond_to?(:each)
      MenuHandlers.each(menu) { |id, hash| apply_hash(id, hash) }
      return
    end
    MenuHandlers.class_variables.each do |cv|
      val = MenuHandlers.class_variable_get(cv)
      next if !val.is_a?(Hash) || !val[menu]
      data = val[menu]
      if data.respond_to?(:each)
        data.each do |id, hash|
          apply_hash(id, hash) if hash.is_a?(Hash)
        end
      end
      break
    end
  rescue
  end

  def self.apply_hash(_id, hash)
    return if !hash.is_a?(Hash)
    if hash["name"].is_a?(String) && BY_EN[hash["name"]]
      hash["name"] = BY_EN[hash["name"]]
    end
    if hash["description"].is_a?(String) && BY_EN[hash["description"]]
      hash["description"] = BY_EN[hash["description"]]
    end
  end
end

#-------------------------------------------------------------------------------
# 아직 번역되지 않은 디버그 문구를 한글로
#-------------------------------------------------------------------------------
if defined?(_INTL) && !defined?(_rf_old_INTL)
  alias _rf_old_INTL _INTL
  def _INTL(msg, *args)
    key = msg.to_s
    if RedforgeDebug::BY_EN[key]
      return _rf_old_INTL(RedforgeDebug::BY_EN[key], *args)
    end
    _rf_old_INTL(msg, *args)
  end
end

RedforgeDebug.apply_handlers

if defined?(MenuHandlers)
  MenuHandlers.add(:debug_menu, :redforge_search, {
    "name"        => "검색...",
    "parent"      => :main,
    "description" => "한글 이름, 영문 ID, 번호로 이 메뉴를 찾습니다. 목록에서도 F 키로 검색할 수 있습니다.",
    "always_show" => true,
    "effect"      => proc {
      pbMessage("디버그 메뉴와 포켓몬·기술·도구 목록에서 F 키(또는 점프 위)를 누르세요.\\n검색어를 입력하면 해당하는 항목만 남습니다.\\n취소 키를 누르면 검색이 지워집니다.")
    }
  })
end

#-------------------------------------------------------------------------------
# 디버그 메뉴 목록 필터
#-------------------------------------------------------------------------------
class CommandMenuList
  attr_accessor :filter_query

  unless method_defined?(:_rf_list)
    alias _rf_list list
  end
  def list
    ret = _rf_list
    q = @filter_query.to_s
    return ret if q.strip == ""
    ret.select { |name| RedforgeDebug.match?(name, q) }
  end

  unless method_defined?(:_rf_getCommand)
    alias _rf_getCommand getCommand
  end
  def getCommand(index)
    q = @filter_query.to_s
    return _rf_getCommand(index) if q.strip == ""
    count = 0
    @commands.each do |cmd|
      next if cmd[1] != @currentList
      next if !RedforgeDebug.match?(cmd[2], q) && !RedforgeDebug.match?(cmd[0].to_s, q) && !RedforgeDebug.match?(cmd[3].to_s, q)
      return cmd[0] if count == index
      count += 1
    end
    return nil
  end

  unless method_defined?(:_rf_getDesc)
    alias _rf_getDesc getDesc
  end
  def getDesc(index)
    q = @filter_query.to_s
    return _rf_getDesc(index) if q.strip == ""
    count = 0
    @commands.each do |cmd|
      next if cmd[1] != @currentList
      next if !RedforgeDebug.match?(cmd[2], q) && !RedforgeDebug.match?(cmd[0].to_s, q) && !RedforgeDebug.match?(cmd[3].to_s, q)
      if count == index
        return cmd[3] if cmd[3]
        break
      end
      count += 1
    end
    return _INTL("설명 없음")
  end
end

def rf_debug_pick_command(commands, sprites)
  cmdwindow = sprites["cmdwindow"]
  refresh = true
  loop do
    oldindex = cmdwindow.index
    cmdwindow.update
    if refresh || cmdwindow.index != oldindex
      desc = commands.getDesc(cmdwindow.index)
      q = commands.filter_query.to_s.strip
      if sprites["textbox"]
        sprites["textbox"].text = q != "" ? ("[" + q + "] " + desc.to_s) : desc.to_s
      end
      refresh = false
    end
    Graphics.update
    Input.update
    if RedforgeDebug.search_key?
      pbPlayDecisionSE
      commands.filter_query = RedforgeDebug.prompt_query(commands.filter_query)
      cmdwindow.commands = commands.list
      cmdwindow.index = 0
      refresh = true
    elsif Input.trigger?(Input::BACK)
      if commands.filter_query.to_s.strip != ""
        commands.filter_query = ""
        cmdwindow.commands = commands.list
        cmdwindow.index = 0
        refresh = true
      else
        parent = commands.getParent
        if parent
          pbPlayCancelSE
          commands.currentList = parent[0]
          commands.filter_query = ""
          cmdwindow.commands = commands.list
          cmdwindow.index = parent[1]
          refresh = true
        else
          return -1
        end
      end
    elsif Input.trigger?(Input::USE)
      return cmdwindow.index
    end
  end
end

alias _rf_pbDebugMenu pbDebugMenu if !defined?(_rf_pbDebugMenu)
def pbDebugMenu(show_all = true)
  commands = CommandMenuList.new
  commands.filter_query = ""
  MenuHandlers.each_available(:debug_menu) do |option, hash, name|
    next if !show_all && !hash["always_show"].nil? && !hash["always_show"]
    if hash["description"].is_a?(Proc)
      description = hash["description"].call
    elsif !hash["description"].nil?
      description = _INTL(hash["description"])
    end
    commands.add(option, hash, name, description)
  end
  viewport = Viewport.new(0, 0, Graphics.width, Graphics.height)
  viewport.z = 99999
  sprites = {}
  sprites["textbox"] = pbCreateMessageWindow
  sprites["textbox"].letterbyletter = false
  sprites["cmdwindow"] = Window_CommandPokemonEx.new(commands.list)
  cmdwindow = sprites["cmdwindow"]
  cmdwindow.x        = 0
  cmdwindow.y        = 0
  cmdwindow.width    = Graphics.width
  cmdwindow.height   = Graphics.height - sprites["textbox"].height
  cmdwindow.viewport = viewport
  cmdwindow.visible  = true
  sprites["textbox"].text = commands.getDesc(cmdwindow.index)
  pbFadeInAndShow(sprites)
  loop do
    ret = rf_debug_pick_command(commands, sprites)
    break if ret < 0
    cmd = commands.getCommand(ret)
    if cmd == :redforge_search
      pbPlayDecisionSE
      commands.filter_query = RedforgeDebug.prompt_query(commands.filter_query)
      cmdwindow.commands = commands.list
      cmdwindow.index = 0
      next
    end
    if commands.hasSubMenu?(cmd)
      pbPlayDecisionSE
      commands.currentList = cmd
      commands.filter_query = ""
      cmdwindow.commands = commands.list
      cmdwindow.index = 0
    elsif cmd == :warp
      return if MenuHandlers.call(:debug_menu, cmd, "effect", sprites, viewport)
    else
      MenuHandlers.call(:debug_menu, cmd, "effect")
    end
  end
  pbPlayCloseMenuSE
  pbFadeOutAndHide(sprites)
  pbDisposeMessageWindow(sprites["textbox"])
  pbDisposeSpriteHash(sprites)
  viewport.dispose
end

if defined?(Battle::DebugMixin)
  module Battle::DebugMixin
    alias _rf_pbBattleDebug pbBattleDebug if !method_defined?(:_rf_pbBattleDebug)
    def pbBattleDebug(battle, show_all = true)
      commands = CommandMenuList.new
      commands.filter_query = ""
      MenuHandlers.each_available(:battle_debug_menu) do |option, hash, name|
        next if !show_all && !hash["always_show"].nil? && !hash["always_show"]
        if hash["description"].is_a?(Proc)
          description = hash["description"].call
        elsif !hash["description"].nil?
          description = _INTL(hash["description"])
        end
        commands.add(option, hash, name, description)
      end
      viewport = Viewport.new(0, 0, Graphics.width, Graphics.height)
      viewport.z = 99999
      sprites = {}
      sprites["textbox"] = pbCreateMessageWindow
      sprites["textbox"].letterbyletter = false
      sprites["cmdwindow"] = Window_CommandPokemonEx.new(commands.list)
      cmdwindow = sprites["cmdwindow"]
      cmdwindow.x        = 0
      cmdwindow.y        = 0
      cmdwindow.width    = Graphics.width / 2
      cmdwindow.height   = Graphics.height - sprites["textbox"].height
      cmdwindow.viewport = viewport
      cmdwindow.visible  = true
      sprites["textbox"].text = commands.getDesc(cmdwindow.index)
      loop do
        ret = rf_debug_pick_command(commands, sprites)
        break if ret < 0
        cmd = commands.getCommand(ret)
        if commands.hasSubMenu?(cmd)
          pbPlayDecisionSE
          commands.currentList = cmd
          commands.filter_query = ""
          cmdwindow.commands = commands.list
          cmdwindow.index = 0
        else
          MenuHandlers.call(:battle_debug_menu, cmd, "effect", battle)
        end
      end
      pbPlayCloseMenuSE
      pbDisposeMessageWindow(sprites["textbox"])
      pbDisposeSpriteHash(sprites)
      viewport.dispose
    end
  end
end

if defined?(PokemonDebugMixin)
  module PokemonDebugMixin
    alias _rf_pbPokemonDebug pbPokemonDebug if !method_defined?(:_rf_pbPokemonDebug)
    def pbPokemonDebug(pkmn, pkmnid, heldpoke = nil, settingUpBattle = false)
      commands = CommandMenuList.new
      commands.filter_query = ""
      MenuHandlers.each_available(:pokemon_debug_menu) do |option, hash, name|
        next if settingUpBattle && !hash["always_show"].nil? && !hash["always_show"]
        commands.add(option, hash, name)
      end
      command = 0
      loop do
        names = commands.list
        shown = [_INTL("검색...")] + names
        command = pbShowCommands(_INTL("{1}을(를) 어떻게 할까요?", pkmn.name), shown, command)
        if command < 0
          parent = commands.getParent
          break if !parent
          commands.currentList = parent[0]
          commands.filter_query = ""
          command = parent[1]
        elsif command == 0
          commands.filter_query = RedforgeDebug.prompt_query(commands.filter_query)
          command = 0
        else
          cmd = commands.getCommand(command - 1)
          if commands.hasSubMenu?(cmd)
            commands.currentList = cmd
            commands.filter_query = ""
            command = 0
          elsif MenuHandlers.call(:pokemon_debug_menu, cmd, "effect", pkmn, pkmnid, heldpoke, settingUpBattle, self)
            break
          end
        end
      end
    end
  end
end

#-------------------------------------------------------------------------------
# 종족/기술/도구 등 디버그 목록 검색 (pbChooseList)
#-------------------------------------------------------------------------------
alias _rf_pbCommandsSortable pbCommandsSortable if !defined?(_rf_pbCommandsSortable)
def pbCommandsSortable(cmdwindow, commands, cmdIfCancel, defaultindex = -1, sortable = false)
  full = []
  commands.each_with_index { |c, i| full.push([c, i]) }
  query = ""
  shown = full
  apply = proc {
    q = query.to_s
    shown = []
    full.each do |pair|
      if q.strip == "" || RedforgeDebug.match?(pair[0], q)
        shown.push(pair)
      end
    end
    if shown.length == 0
      cmdwindow.commands = [_INTL("(결과 없음)")]
    else
      texts = []
      shown.each { |pair| texts.push(pair[0]) }
      cmdwindow.commands = texts
    end
    cmdwindow.index = 0
  }
  cmdwindow.commands = commands
  cmdwindow.index    = defaultindex if defaultindex >= 0
  cmdwindow.x        = 0
  cmdwindow.y        = 0
  cmdwindow.width    = Graphics.width / 2 if cmdwindow.width < Graphics.width / 2
  cmdwindow.height   = Graphics.height
  cmdwindow.z        = 99999
  cmdwindow.active   = true
  command = [0, -1]
  loop do
    Graphics.update
    Input.update
    cmdwindow.update
    if RedforgeDebug.search_key?
      pbPlayDecisionSE
      query = RedforgeDebug.prompt_query(query)
      apply.call
    elsif Input.trigger?(Input::ACTION) && sortable
      pair = shown[cmdwindow.index]
      command = [1, pair ? pair[1] : 0]
      break
    elsif Input.trigger?(Input::BACK)
      if query.to_s.strip != ""
        query = ""
        apply.call
      else
        command = [0, (cmdIfCancel > 0) ? cmdIfCancel - 1 : cmdIfCancel]
        break
      end
    elsif Input.trigger?(Input::USE)
      pair = shown[cmdwindow.index]
      if pair
        command = [0, pair[1]]
      else
        command = [0, (cmdIfCancel > 0) ? cmdIfCancel - 1 : cmdIfCancel]
      end
      break
    end
  end
  cmdwindow.active = false
  return command
end

#-------------------------------------------------------------------------------
# 에디터 리스트 (도구 추가, 맵 이동 등)
#-------------------------------------------------------------------------------
alias _rf_pbListScreen pbListScreen if !defined?(_rf_pbListScreen)
def pbListScreen(title, lister)
  viewport = Viewport.new(0, 0, Graphics.width, Graphics.height)
  viewport.z = 99999
  list = pbListWindow([])
  list.viewport = viewport
  list.z        = 2
  titlewin = Window_UnformattedTextPokemon.newWithSize(
    title, Graphics.width / 2, 0, Graphics.width / 2, 64, viewport
  )
  titlewin.z = 2
  lister.setViewport(viewport)
  commands = lister.commands
  if commands.length == 0
    value = lister.value(-1)
    lister.dispose
    titlewin.dispose
    list.dispose
    viewport.dispose
    return value
  end
  full = []
  commands.each_with_index { |c, i| full.push([c, i]) }
  query = ""
  shown = full
  apply = proc {
    q = query.to_s
    shown = []
    full.each do |pair|
      shown.push(pair) if q.strip == "" || RedforgeDebug.match?(pair[0], q)
    end
    if shown.length == 0
      list.commands = [_INTL("(결과 없음)")]
    else
      texts = []
      shown.each { |pair| texts.push(pair[0]) }
      list.commands = texts
    end
    list.index = 0
  }
  list.commands = commands
  list.index    = lister.startIndex
  selected = list.index
  orig = proc {
    pair = shown[list.index]
    pair ? pair[1] : -1
  }
  loop do
    Graphics.update
    Input.update
    list.update
    oi = orig.call
    if oi != selected
      lister.refresh(oi) if oi >= 0
      selected = oi
    end
    if RedforgeDebug.search_key?
      pbPlayDecisionSE
      query = RedforgeDebug.prompt_query(query)
      apply.call
      selected = -1
    elsif Input.trigger?(Input::BACK)
      if query.to_s.strip != ""
        query = ""
        apply.call
        selected = -1
      else
        selected = -1
        break
      end
    elsif Input.trigger?(Input::USE)
      selected = orig.call
      break
    end
  end
  value = lister.value(selected)
  lister.dispose
  titlewin.dispose
  list.dispose
  viewport.dispose
  Input.update
  return value
end

alias _rf_pbListScreenBlock pbListScreenBlock if !defined?(_rf_pbListScreenBlock)
def pbListScreenBlock(title, lister)
  viewport = Viewport.new(0, 0, Graphics.width, Graphics.height)
  viewport.z = 99999
  list = pbListWindow([], Graphics.width / 2)
  list.viewport = viewport
  list.z        = 2
  titlewin = Window_UnformattedTextPokemon.newWithSize(
    title, Graphics.width / 2, 0, Graphics.width / 2, 64, viewport
  )
  titlewin.z = 2
  lister.setViewport(viewport)
  commands = lister.commands
  if commands.length == 0
    value = lister.value(-1)
    lister.dispose
    titlewin.dispose
    list.dispose
    viewport.dispose
    return value
  end
  full = []
  rebuild = proc {
    commands = lister.commands
    full = []
    commands.each_with_index { |c, i| full.push([c, i]) }
  }
  rebuild.call
  query = ""
  shown = full
  apply = proc {
    q = query.to_s
    shown = []
    full.each do |pair|
      shown.push(pair) if q.strip == "" || RedforgeDebug.match?(pair[0], q)
    end
    if shown.length == 0
      list.commands = [_INTL("(결과 없음)")]
    else
      texts = []
      shown.each { |pair| texts.push(pair[0]) }
      list.commands = texts
    end
    list.index = 0
  }
  list.commands = commands
  list.index = lister.startIndex
  selected = list.index
  orig = proc {
    pair = shown[list.index]
    pair ? pair[1] : -1
  }
  loop do
    Graphics.update
    Input.update
    list.update
    oi = orig.call
    if oi != selected
      lister.refresh(oi) if oi >= 0
      selected = oi
    end
    if RedforgeDebug.search_key?
      pbPlayDecisionSE
      query = RedforgeDebug.prompt_query(query)
      apply.call
      selected = -1
    elsif Input.trigger?(Input::ACTION)
      yield(Input::ACTION, lister.value(orig.call))
      rebuild.call
      query = ""
      apply.call
    elsif Input.trigger?(Input::BACK)
      if query.to_s.strip != ""
        query = ""
        apply.call
        selected = -1
      else
        break
      end
    elsif Input.trigger?(Input::USE)
      yield(Input::USE, lister.value(orig.call))
      rebuild.call
      query = ""
      apply.call
    end
  end
  lister.dispose
  titlewin.dispose
  list.dispose
  viewport.dispose
  Input.update
end
`;
}
function buildDebugKoPluginZip() {
	return zipStore([{
		name: "Plugins/Redforge Debug KO/meta.txt",
		data: META$1
	}, {
		name: "Plugins/Redforge Debug KO/001_DebugKo.rb",
		data: buildScript()
	}]);
}
var META = `Name       = Redforge All TMs
Version    = 1.0
Essentials = 19,20,21
Credits    = 레드포지
`;
var SCRIPT = `#===============================================================================
# 레드포지 — 새 게임을 시작하면 모든 기술머신(TM/HM/TR)을 가방에 넣습니다.
# 이 폴더를 게임의 Plugins 안에 두고 게임을 다시 시작하세요.
# 이미 진행 중인 세이브에는 적용되지 않습니다. 새 게임을 시작해야 합니다.
#===============================================================================
EventHandlers.add(:on_new_game, :redforge_give_all_tms, proc {
  GameData::Item.each do |item|
    machine = false
    machine ||= item.is_TM? if item.respond_to?(:is_TM?)
    machine ||= item.is_HM? if item.respond_to?(:is_HM?)
    machine ||= item.is_TR? if item.respond_to?(:is_TR?)
    machine ||= item.is_machine? if item.respond_to?(:is_machine?)
    next unless machine
    begin
      next if $bag.quantity(item.id) > 0
    rescue
    end
    $bag.add(item.id, 1)
  end
})
`;
function buildAllTmsPluginZip() {
	return zipStore([{
		name: "Plugins/Redforge All TMs/meta.txt",
		data: META
	}, {
		name: "Plugins/Redforge All TMs/001_GiveAllTMs.rb",
		data: SCRIPT
	}]);
}
function useInstallPrompt() {
	const [installEvt, setInstallEvt] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const onInstall = (e) => {
			e.preventDefault();
			setInstallEvt(e);
		};
		window.addEventListener("beforeinstallprompt", onInstall);
		return () => window.removeEventListener("beforeinstallprompt", onInstall);
	}, []);
	return {
		installEvt,
		promptInstall: () => {
			if (!installEvt) return;
			installEvt.prompt();
			setInstallEvt(null);
		}
	};
}
function downloadOfflinePack() {
	const a = document.createElement("a");
	a.href = "/redforge-offline.zip";
	a.download = "레드포지-오프라인.zip";
	document.body.appendChild(a);
	a.click();
	a.remove();
	toast.success("압축을 풀고 start.bat 또는 index.html을 더블클릭하세요. 인터넷이 없는 PC에서도 실행됩니다.");
}
function OfflineBadge() {
	const [online, setOnline] = (0, import_react.useState)(true);
	const [ready, setReady] = (0, import_react.useState)(false);
	const { installEvt, promptInstall } = useInstallPrompt();
	const portable = hasEmbeddedBundle();
	(0, import_react.useEffect)(() => {
		const on = () => setOnline(true);
		const off = () => setOnline(false);
		setOnline(navigator.onLine);
		window.addEventListener("online", on);
		window.addEventListener("offline", off);
		const check = () => {
			if (!("caches" in window)) return;
			caches.keys().then((keys) => setReady(keys.some((k) => k.startsWith("redforge-offline")))).catch(() => {});
		};
		check();
		const t = window.setTimeout(check, 1200);
		return () => {
			window.removeEventListener("online", on);
			window.removeEventListener("offline", off);
			window.clearTimeout(t);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			portable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 rounded-[var(--radius-xs)] bg-[var(--color-raised)] px-2 py-1 text-[11px] text-[var(--color-ok)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "size-3" }), "인터넷 없이 실행 중"]
			}),
			!portable && !online && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 rounded-[var(--radius-xs)] bg-[var(--color-raised)] px-2 py-1 text-[11px] text-[var(--color-warn)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, { className: "size-3" }), "오프라인"]
			}),
			!portable && online && ready && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "hidden items-center gap-1 text-[11px] text-[var(--color-subtle)] sm:inline-flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "size-3" }), "이 기기 저장됨"]
			}),
			installEvt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "inline-flex h-8 items-center gap-1 rounded-[var(--radius-sm)] bg-[var(--color-raised)] px-2 text-[11px] font-medium text-[var(--color-fg)]",
				onClick: promptInstall,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-3" }), "홈 화면에 추가"]
			})
		]
	});
}
function OfflineSetupCard() {
	const [online, setOnline] = (0, import_react.useState)(true);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const { installEvt, promptInstall } = useInstallPrompt();
	const portable = hasEmbeddedBundle();
	(0, import_react.useEffect)(() => {
		const on = () => setOnline(true);
		const off = () => setOnline(false);
		setOnline(navigator.onLine);
		window.addEventListener("online", on);
		window.addEventListener("offline", off);
		if ("caches" in window) caches.keys().then((keys) => setReady(keys.some((k) => k.startsWith("redforge-offline")))).catch(() => {});
		return () => {
			window.removeEventListener("online", on);
			window.removeEventListener("offline", off);
		};
	}, []);
	async function saveHere() {
		setBusy(true);
		setNote("");
		try {
			const { cached } = await warmOfflineCache();
			setReady(true);
			setNote(cached > 0 ? `이 기기에 ${cached}개 파일을 저장했습니다. 같은 브라우저에서는 인터넷이 없어도 열립니다.` : "작업 내용은 이미 이 기기에 남습니다.");
		} catch {
			setNote("저장에 실패했습니다. 인터넷이 연결된 상태에서 한 번 더 눌러 주세요.");
		} finally {
			setBusy(false);
		}
	}
	if (portable) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-[var(--color-subtle)]",
				children: "인터넷 없이 실행 중"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-xl font-semibold",
				children: "이 폴더만 있으면 됩니다"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-[var(--color-muted)]",
				children: "어나더레드 데이터가 이 파일 안에 들어 있습니다. 인터넷에 연결하지 않아도 종족·기술·야생을 고치고 .dat와 플러그인을 저장할 수 있습니다."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-[var(--color-subtle)]",
				children: "인터넷이 없는 PC"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-xl font-semibold",
				children: "USB · 다른 컴퓨터용 패키지"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-[var(--color-muted)]",
				children: [
					"에디터와 어나더레드 데이터가 통째로 들어 있는 zip입니다. 압축을 풀고",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[var(--color-fg)]",
						children: "start.bat"
					}),
					" 또는",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[var(--color-fg)]",
						children: "index.html"
					}),
					"을 더블클릭하면, 인터넷이 전혀 없는 곳에서도 실행됩니다."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: downloadOfflinePack,
						className: "inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3 text-sm font-medium text-[var(--color-accent-fg)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "오프라인 에디터 받기"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void saveHere(),
						className: "inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-raised)] px-3 text-sm font-medium text-[var(--color-fg)] disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "size-4" }), busy ? "저장 중…" : ready ? "이 브라우저에 다시 저장" : "이 브라우저에 저장"]
					}),
					installEvt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: promptInstall,
						className: "inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-raised)] px-3 text-sm font-medium text-[var(--color-fg)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" }), "홈 화면에 추가"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-4 space-y-2 text-sm text-[var(--color-muted)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. 「오프라인 에디터 받기」로 zip을 받아 USB나 폴더에 둡니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. 인터넷이 없는 PC에서 압축을 풀고 start.bat을 더블클릭합니다. Chrome 또는 Edge가 열립니다." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "3. 빈 화면이면 start-server.bat을 실행하고, 검은 창은 닫지 마세요." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: online ? "같은 브라우저에서만 쓰려면 「이 브라우저에 저장」을 한 번 누르면 됩니다." : "지금 오프라인입니다. 이전에 저장해 두었다면 이 창에서 그대로 작업하면 됩니다." })
				]
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-[var(--color-ok)]",
				children: note
			})
		]
	});
}
function downloadBytes$1(filename, data) {
	const copy = new ArrayBuffer(data.byteLength);
	new Uint8Array(copy).set(data);
	const blob = new Blob([copy], { type: "application/octet-stream" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function downloadText(filename, text) {
	const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function classifyPbs(name, path, text) {
	const n = `${path} ${name}`.toLowerCase();
	if (n.includes("pokemonform")) return null;
	if (/(^|[\\/])pokemon\.txt$/.test(n) || n.includes("pokemon.txt") || n.includes("pokedex")) return "pokemon";
	if (/(^|[\\/])moves\.txt$/.test(n) || n.includes("move") && n.endsWith(".txt")) return "moves";
	if (text.includes("[") && /InternalName|BaseStats|Type1/i.test(text)) return "pokemon";
	if (/FunctionCode|TotalPP|Category/i.test(text) || /^[0-9]+,[A-Z]/m.test(text)) return "moves";
	return null;
}
function FilesPanel() {
	const fileInput = (0, import_react.useRef)(null);
	const dirInput = (0, import_react.useRef)(null);
	const [dropHint, setDropHint] = (0, import_react.useState)(false);
	const species = useEditor((s) => s.species);
	const moves = useEditor((s) => s.moves);
	const encounters = useEditor((s) => s.encounters);
	const encountersIsSample = useEditor((s) => s.encountersIsSample);
	const startWithAllTms = useEditor((s) => s.startWithAllTms);
	const setStartWithAllTms = useEditor((s) => s.setStartWithAllTms);
	const enableDebugKo = useEditor((s) => s.enableDebugKo);
	const setEnableDebugKo = useEditor((s) => s.setEnableDebugKo);
	const sourceLabel = useEditor((s) => s.sourceLabel);
	const importTexts = useEditor((s) => s.importTexts);
	const importDat = useEditor((s) => s.importDat);
	const importWorkspaceJson = useEditor((s) => s.importWorkspaceJson);
	const loadBundled = useEditor((s) => s.loadBundled);
	const issues = useIssues();
	const errors = issues.filter((i) => i.level === "error");
	const warns = issues.filter((i) => i.level === "warn");
	async function ingestFiles(files) {
		const list = Array.from(files);
		let poke = null;
		let mv = null;
		const dats = {};
		const msgs = [];
		for (const f of list) {
			const path = "webkitRelativePath" in f && f.webkitRelativePath || f.name;
			const buf = new Uint8Array(await f.arrayBuffer());
			if (/\.json$/i.test(f.name)) {
				const jsonText = new TextDecoder("utf-8").decode(buf);
				if (importWorkspaceJson(jsonText)) {
					msgs.push("작업 백업을 열었습니다");
					continue;
				}
			}
			const datKind = classifyDat(f.name, path, buf);
			if (datKind) {
				dats[datKind] = buf;
				continue;
			}
			const text = new TextDecoder("utf-8").decode(buf);
			const kind = classifyPbs(f.name, path, text);
			if (kind === "pokemon") poke = text;
			if (kind === "moves") mv = text;
		}
		if (dats.species || dats.moves || dats.abilities || dats.messages || dats.encounters) msgs.push(...importDat(dats, "불러온 Data"));
		if (poke || mv) msgs.push(...importTexts(poke, mv, "불러온 텍스트"));
		if (!msgs.length) {
			const names = list.slice(0, 8).map((f) => f.name).join(", ");
			toast.error(`PBS 폴더는 배포본에 없습니다. 게임 안의 Data 폴더(species.dat, moves.dat, encounters.dat)를 넣어 주세요.${names ? ` 받은 파일: ${names}` : ""}`);
			return;
		}
		toast.success(msgs.join(" · "));
	}
	function savePlugin() {
		downloadBytes$1("RedforgeAllTMs.zip", buildAllTmsPluginZip());
		toast.success("플러그인을 저장했습니다. 게임 폴더에 압축을 풀면 Plugins/Redforge All TMs가 생깁니다.");
	}
	function saveDebugPlugin() {
		downloadBytes$1("RedforgeDebugKO.zip", buildDebugKoPluginZip());
		toast.success("디버그 한글·검색 플러그인을 저장했습니다. 게임 폴더에 압축을 푼 뒤 Ctrl을 누른 채로 실행하세요.");
	}
	async function saveDat(kind) {
		if (kind !== "encounters" && errors.length) {
			toast.error("오류를 고친 뒤 저장하세요.");
			return;
		}
		try {
			await ensureDats();
			if (kind === "species") {
				downloadBytes$1("species.dat", exportSpeciesDat(species));
				toast.success("species.dat 저장 — 게임 Data 폴더에 덮어쓰세요.");
			} else if (kind === "moves") {
				downloadBytes$1("moves.dat", exportMovesDat(moves));
				toast.success("moves.dat 저장 — 게임 Data 폴더에 덮어쓰세요.");
			} else if (kind === "encounters") {
				if (!encounters.length) {
					toast.error("저장할 야생 출현이 없습니다.");
					return;
				}
				downloadBytes$1("encounters.dat", exportEncountersDat(encounters));
				toast.success(encountersIsSample ? "encounters.dat 저장 — 샘플 맵 번호가 게임과 다를 수 있습니다. Data에 덮어쓰기 전에 확인하세요." : "encounters.dat 저장 — 게임 Data 폴더에 덮어쓰세요.");
			} else {
				const bytes = exportMessagesDat(species, moves);
				if (!bytes) {
					toast.error("한국어 이름 파일이 없습니다.");
					return;
				}
				downloadBytes$1("messages_kor_core.dat", bytes);
				toast.success("messages_kor_core.dat 저장");
			}
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "저장에 실패했습니다.");
		}
	}
	async function saveBoth() {
		if (errors.length) {
			toast.error("오류를 고친 뒤 저장하세요.");
			return;
		}
		try {
			await ensureDats();
			downloadBytes$1("species.dat", exportSpeciesDat(species));
			window.setTimeout(() => downloadBytes$1("moves.dat", exportMovesDat(moves)), 350);
			let delay = 700;
			if (encounters.length) {
				window.setTimeout(() => downloadBytes$1("encounters.dat", exportEncountersDat(encounters)), delay);
				delay += 350;
			}
			if (startWithAllTms) {
				window.setTimeout(() => savePlugin(), delay);
				delay += 350;
			}
			if (enableDebugKo) window.setTimeout(() => saveDebugPlugin(), delay);
			toast.success("게임에 넣을 파일을 저장합니다. Data 폴더에 .dat를 덮어쓰세요.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "저장에 실패했습니다.");
		}
	}
	function savePbs() {
		downloadText("pokemon.txt", serializePokemonPbs(species));
		window.setTimeout(() => downloadText("moves.txt", serializeMovesPbs(moves)), 350);
		toast.message("텍스트 백업입니다. 게임은 이 파일을 읽지 않습니다. Data의 .dat만 덮어쓰세요.");
	}
	function saveWorkspaceBackup() {
		try {
			downloadText("redforge-workspace.json", exportWorkspaceJson());
			toast.success("작업 백업을 저장했습니다. 나중에 파일로 다시 넣을 수 있습니다.");
		} catch {
			toast.error("백업을 만들지 못했습니다.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-0 flex-1 overflow-y-auto p-4 sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-3xl flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "파일"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-[var(--color-muted)]",
					children: [
						"어나더레드 배포본에는 PBS 폴더가 없습니다. 종족·기술 값은 게임 폴더",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[var(--color-fg)]",
							children: "Data/species.dat"
						}),
						",",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[var(--color-fg)]",
							children: "Data/moves.dat"
						}),
						"에 들어 있습니다. 야생 출현은",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[var(--color-fg)]",
							children: "Data/encounters.dat"
						}),
						"입니다."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineSetupCard, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-[var(--color-subtle)]",
							children: "지금 열린 데이터"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl font-semibold",
							children: sourceLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-sm tabular-nums text-[var(--color-muted)]",
							children: [
								"종족 ",
								species.length,
								" · 기술 ",
								moves.length,
								" · 야생 ",
								encounters.length,
								"곳"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-[var(--color-muted)]",
							children: "이미 게임 데이터가 열려 있습니다. 종족·기술·야생 탭에서 바로 고치고, 아래에서 .dat만 저장하면 됩니다."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-[var(--color-subtle)]",
							children: "게임 플러그인"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 flex cursor-pointer items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: startWithAllTms,
								onChange: (e) => setStartWithAllTms(e.target.checked),
								className: "mt-1 size-4 accent-[var(--color-accent)]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: "게임 시작 시 모든 기술머신 보유"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm text-[var(--color-muted)]",
								children: "새 게임을 시작하면 TM·HM·TR을 가방에 넣습니다. 이미 진행 중인 세이브에는 적용되지 않습니다."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 flex cursor-pointer items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: enableDebugKo,
								onChange: (e) => setEnableDebugKo(e.target.checked),
								className: "mt-1 size-4 accent-[var(--color-accent)]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: "디버그 메뉴 한글 · 검색"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm text-[var(--color-muted)]",
								children: "F9 디버그를 한글로 바꾸고, 메뉴·포켓몬·기술·도구 목록에서 F 키로 검색합니다."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: startWithAllTms ? "default" : "outline",
								onClick: savePlugin,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "기술머신 플러그인"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: enableDebugKo ? "default" : "outline",
								onClick: saveDebugPlugin,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "디버그 플러그인"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-[var(--color-subtle)]",
							children: "체크한 항목은 「게임에 넣을 파일」을 누를 때 zip으로 함께 내려갑니다. 게임 폴더에 압축을 푼 뒤 Ctrl을 누른 채로 실행하세요."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-sm text-[var(--color-muted)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "1. 종족·기술·야생 탭에서 값을 고칩니다. 파일을 다시 넣을 필요 없습니다." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "2. 아래 버튼으로 .dat를 저장합니다. 기술머신이나 디버그 한글을 켰으면 플러그인 zip도 함께 내려갑니다." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"3. 게임을 종료한 다음",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[var(--color-fg)]",
								children: "Data"
							}),
							" 폴더에 같은 이름으로 덮어쓰고, 플러그인은 게임 폴더에 압축을 푼 뒤 Ctrl을 누른 채로 다시 켭니다."
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onDragOver: (e) => {
						e.preventDefault();
						setDropHint(true);
					},
					onDragLeave: () => setDropHint(false),
					onDrop: (e) => {
						e.preventDefault();
						setDropHint(false);
						if (e.dataTransfer.files.length) ingestFiles(e.dataTransfer.files);
					},
					className: `rounded-[var(--radius-lg)] border border-dashed p-5 text-center transition-colors duration-150 ${dropHint ? "border-[var(--color-accent)] bg-[var(--color-raised)]" : "border-[var(--color-border-strong)]"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--color-muted)]",
							children: "다른 버전을 쓰려면 게임의 Data 폴더만 넣습니다. 필요한 파일은 species.dat, moves.dat, encounters.dat입니다."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap justify-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => fileInput.current?.click(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-4" }), "파일 불러오기"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => dirInput.current?.click(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-4" }), "Data 폴더"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "ghost",
									onClick: () => {
										loadBundled(true).then(() => toast.message("어나더레드 원본으로 되돌렸습니다."));
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "원본으로 리셋"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInput,
							type: "file",
							accept: ".dat,.txt,.pbs,.json,text/plain,application/json",
							multiple: true,
							className: "hidden",
							onChange: (e) => {
								if (e.target.files) ingestFiles(e.target.files);
								e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							className: "hidden",
							multiple: true,
							onChange: (e) => {
								if (e.target.files) ingestFiles(e.target.files);
								e.target.value = "";
							},
							ref: (node) => {
								dirInput.current = node;
								if (node) node.webkitdirectory = true;
							}
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "검증"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-sm tabular-nums text-[var(--color-muted)]",
							children: [
								"종족 ",
								species.length,
								" · 기술 ",
								moves.length,
								" · 야생 ",
								encounters.length,
								" · 오류 ",
								errors.length,
								" · 주의 ",
								warns.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 max-h-36 space-y-1 overflow-y-auto text-sm",
							children: [issues.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-[var(--color-ok)]",
								children: "저장해도 됩니다."
							}), issues.slice(0, 40).map((issue, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: issue.level === "error" ? "text-[var(--color-danger)]" : "text-[var(--color-warn)]",
								children: [
									"[",
									issue.scope === "species" ? "종족" : "기술",
									" ",
									issue.key,
									"] ",
									issue.message
								]
							}, idx))]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "게임에 넣을 파일"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-[var(--color-muted)]",
							children: "저장한 파일을 게임 폴더의 Data에 덮어씁니다. 이름은 그대로 species.dat, moves.dat, encounters.dat이어야 합니다. PBS txt는 게임이 읽지 않습니다."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									onClick: () => void saveBoth(),
									disabled: species.length === 0 || moves.length === 0,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "게임에 넣을 파일"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => void saveDat("species"),
									disabled: species.length === 0,
									children: "species.dat만"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => void saveDat("moves"),
									disabled: moves.length === 0,
									children: "moves.dat만"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: () => void saveDat("encounters"),
									disabled: encounters.length === 0,
									children: "encounters.dat만"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									onClick: () => void saveDat("messages"),
									children: "한국어 이름"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "텍스트 백업 (선택)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-[var(--color-muted)]",
							children: "개발용 pokemon.txt / moves.txt입니다. 배포된 게임은 이 파일을 쓰지 않으니 Data의 .dat만 덮어쓰세요."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								onClick: savePbs,
								disabled: species.length === 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "pokemon.txt + moves.txt"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								onClick: saveWorkspaceBackup,
								disabled: species.length === 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "작업 JSON 백업"]
							})]
						})
					]
				})
			]
		})
	});
}
function slotShare(chance, total) {
	if (!total || chance == null) return null;
	const pct = chance / total * 100;
	const rounded = Math.round(pct * 10) / 10;
	return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
function EncounterPanel() {
	const species = useEditor((s) => s.species);
	const encounters = useEditor((s) => s.encounters);
	const isSample = useEditor((s) => s.encountersIsSample);
	const selected = useEditor((s) => s.selectedEncounter);
	const query = useEditor((s) => s.query);
	const selectEncounter = useEditor((s) => s.selectEncounter);
	const loadSampleEncounters = useEditor((s) => s.loadSampleEncounters);
	const patchEncounter = useEditor((s) => s.patchEncounter);
	const addEncounterArea = useEditor((s) => s.addEncounterArea);
	const removeEncounterArea = useEditor((s) => s.removeEncounterArea);
	const addEncounterSlot = useEditor((s) => s.addEncounterSlot);
	const removeEncounterSlot = useEditor((s) => s.removeEncounterSlot);
	const patchEncounterSlot = useEditor((s) => s.patchEncounterSlot);
	const setEncounterTypeChance = useEditor((s) => s.setEncounterTypeChance);
	const addEncounterType = useEditor((s) => s.addEncounterType);
	const removeEncounterType = useEditor((s) => s.removeEncounterType);
	const q = query.trim().toLowerCase();
	const list = encounters.filter((a) => {
		if (!q) return true;
		if (a.label.toLowerCase().includes(q) || String(a.mapId).includes(q) || a.key.includes(q)) return true;
		return Object.values(a.slots).some((rows) => rows.some((r) => {
			const sp = species.find((s) => s.internalName === r.species);
			return r.species.toLowerCase().includes(q) || (sp?.name || "").toLowerCase().includes(q);
		}));
	});
	const current = encounters.find((a) => a.key === selected) ?? list[0];
	const types = current ? Object.keys(current.slots) : [];
	const [kind, setKind] = (0, import_react.useState)(types[0] || "Land");
	const activeKind = current && current.slots[kind] ? kind : types[0] || "Land";
	const rows = current?.slots[activeKind] || [];
	const totalChance = rows.reduce((sum, r) => sum + (r.chance ?? 0), 0);
	const speciesOptions = (0, import_react.useMemo)(() => species.map((s) => ({
		value: s.internalName,
		label: s.name,
		hint: s.internalName
	})), [species]);
	const unusedTypes = ENCOUNTER_TYPES.filter((t) => current && !current.slots[t]);
	if (encounters.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold",
				children: "야생 출현"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-[var(--color-muted)]",
				children: "출현 데이터가 없습니다. 게임 Data의 encounters.dat를 넣거나 샘플 도로로 구성을 연습할 수 있습니다."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap justify-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				onClick: () => loadSampleEncounters(),
				children: "샘플 도로 불러오기"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				onClick: () => addEncounterArea(),
				children: "빈 맵 추가"
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex max-h-64 min-h-0 flex-col overflow-hidden border-b border-[var(--color-border)] lg:max-h-none lg:border-r lg:border-b-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 p-3 text-xs text-[var(--color-muted)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					list.length,
					" / ",
					encounters.length
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: () => addEncounterArea(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "장소"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: list.map((a) => {
					const active = current?.key === a.key;
					const n = Object.values(a.slots).reduce((sum, r) => sum + r.length, 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => selectEncounter(a.key),
						className: `flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition-colors duration-150 ${active ? "border-[var(--color-accent)] bg-[var(--color-raised)]" : "border-transparent hover:bg-[var(--color-raised)]/60"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm font-medium",
								children: a.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block truncate text-[11px] text-[var(--color-subtle)]",
								children: [
									n,
									"마리 · ",
									Object.keys(a.slots).map((t) => ENCOUNTER_TYPE_KO[t] || t).join(" · ")
								]
							})]
						})
					}, a.key);
				})
			})]
		}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 overflow-y-auto p-4 sm:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl flex-col gap-6",
				children: [
					isSample && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-raised)] px-4 py-3 text-sm text-[var(--color-muted)]",
						children: "샘플 도로입니다. 실제 출현을 고치려면 파일 탭에서 원본으로 리셋하거나 encounters.dat를 넣으세요."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-[var(--color-subtle)]",
							children: ["맵 ", current.mapId]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold tracking-tight",
							children: current.label
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => removeEncounterArea(current.key),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "이 장소 삭제"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "장소 이름",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: current.label,
									onChange: (e) => patchEncounter(current.key, { label: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "맵 번호",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 1,
									value: current.mapId,
									onChange: (e) => patchEncounter(current.key, { mapId: Math.max(1, Number(e.target.value) || 1) })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "버전",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									value: current.version,
									onChange: (e) => patchEncounter(current.key, { version: Math.max(0, Number(e.target.value) || 0) })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: types.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setKind(t),
							className: `h-9 rounded-full px-3 text-sm ${activeKind === t ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "bg-[var(--color-raised)] text-[var(--color-muted)] hover:text-[var(--color-fg)]"}`,
							children: [ENCOUNTER_TYPE_KO[t] || t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1.5 font-mono text-[11px] opacity-80",
								children: current.slots[t]?.length || 0
							})]
						}, t))
					}),
					unusedTypes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
							value: "",
							onChange: (e) => {
								if (e.target.value) {
									addEncounterType(current.key, e.target.value);
									setKind(e.target.value);
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "출현 종류 추가"
							}), unusedTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t,
								children: ENCOUNTER_TYPE_KO[t] || t
							}, t))]
						})
					}),
					types.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-end justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: `${ENCOUNTER_TYPE_KO[activeKind] || activeKind} 발걸음 확률`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										max: 100,
										value: current.stepChances[activeKind] ?? 0,
										onChange: (e) => setEncounterTypeChance(current.key, activeKind, Number(e.target.value) || 0)
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: () => addEncounterSlot(current.key, activeKind),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "슬롯"]
									}), types.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => {
											removeEncounterType(current.key, activeKind);
											setKind(types.find((t) => t !== activeKind) || "Land");
										},
										children: "이 종류 삭제"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[var(--color-subtle)]",
								children: ["슬롯 확률은 상대 비율입니다. 합이 100이면 퍼센트와 같고, 게임은 합계 대비로 뽑습니다.", totalChance > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 font-mono text-[var(--color-muted)]",
									children: ["합계 ", totalChance]
								})]
							}),
							rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-[var(--color-muted)]",
								children: "이 종류의 출현이 없습니다."
							}),
							rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden grid-cols-[minmax(0,1fr)_4.5rem_4.5rem_4.5rem_auto] gap-2 px-2 text-[11px] text-[var(--color-subtle)] sm:grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "포켓몬" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "확률" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "최소" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "최대" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
								]
							}),
							rows.map((row, i) => {
								const sp = species.find((s) => s.internalName === row.species);
								const share = slotShare(row.chance, totalChance);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem_4.5rem_auto] items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-raised)] p-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchSelect, {
											value: row.species,
											onChange: (v) => patchEncounterSlot(current.key, activeKind, i, { species: v }),
											options: speciesOptions,
											"aria-label": "출현 포켓몬"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												min: 0,
												max: 1e3,
												value: row.chance ?? 0,
												"aria-label": "출현 확률",
												onChange: (e) => patchEncounterSlot(current.key, activeKind, i, { chance: Math.max(0, Number(e.target.value) || 0) })
											}), share != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "mt-0.5 text-center font-mono text-[10px] text-[var(--color-subtle)]",
												children: [share, "%"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 1,
											max: 100,
											value: row.min,
											"aria-label": "최소 레벨",
											onChange: (e) => patchEncounterSlot(current.key, activeKind, i, { min: Number(e.target.value) || 1 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 1,
											max: 100,
											value: row.max,
											"aria-label": "최대 레벨",
											onChange: (e) => patchEncounterSlot(current.key, activeKind, i, { max: Number(e.target.value) || 1 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [sp?.types[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeChip, { type: sp.types[0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "ghost",
												size: "icon",
												className: "size-11",
												"aria-label": "슬롯 삭제",
												onClick: () => removeEncounterSlot(current.key, activeKind, i),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})]
										})
									]
								}, `${row.species}-${i}`);
							})
						]
					})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-10 text-sm text-[var(--color-muted)]",
			children: "출현 장소가 없습니다."
		})]
	});
}
var KINDS = [
	"debug",
	"pokemon",
	"battle",
	"battle_pokemon"
];
function downloadBytes(filename, data) {
	const copy = new ArrayBuffer(data.byteLength);
	new Uint8Array(copy).set(data);
	const blob = new Blob([copy], { type: "application/octet-stream" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function DebugPanel() {
	const query = useEditor((s) => s.query);
	const enableDebugKo = useEditor((s) => s.enableDebugKo);
	const setEnableDebugKo = useEditor((s) => s.setEnableDebugKo);
	const [kind, setKind] = (0, import_react.useState)("debug");
	const [parent, setParent] = (0, import_react.useState)("main");
	const q = query.trim();
	const searching = q.length > 0;
	const filtered = (0, import_react.useMemo)(() => {
		if (searching) return DEBUG_ITEMS.filter((item) => debugMatch(item, q));
		return DEBUG_ITEMS.filter((item) => item.kind === kind && item.parent === parent);
	}, [
		kind,
		parent,
		q,
		searching
	]);
	const groups = (0, import_react.useMemo)(() => {
		return ["main", ...[...new Set(DEBUG_ITEMS.filter((item) => item.kind === kind).map((item) => item.parent))].filter((id) => id !== "main")];
	}, [kind]);
	function savePlugin() {
		downloadBytes("RedforgeDebugKO.zip", buildDebugKoPluginZip());
		toast.success("디버그 한글·검색 플러그인을 저장했습니다. 게임 폴더에 압축을 푼 뒤 Ctrl을 누른 채로 실행하세요.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex max-h-64 min-h-0 flex-col overflow-hidden border-b border-[var(--color-border)] lg:max-h-none lg:border-r lg:border-b-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1 p-3",
				children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setKind(k);
						setParent("main");
					},
					className: `h-9 rounded-full px-3 text-sm ${kind === k && !searching ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "bg-[var(--color-raised)] text-[var(--color-muted)] hover:text-[var(--color-fg)]"}`,
					children: DEBUG_KIND_KO[k]
				}, k))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto",
				children: groups.map((g) => {
					const active = !searching && parent === g;
					const n = DEBUG_ITEMS.filter((item) => item.kind === kind && item.parent === g).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setParent(g),
						className: `flex w-full items-center justify-between gap-2 border-l-2 px-3 py-2.5 text-left ${active ? "border-[var(--color-accent)] bg-[var(--color-raised)]" : "border-transparent hover:bg-[var(--color-raised)]/60"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm font-medium",
							children: DEBUG_GROUP_KO[g] || g
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px] text-[var(--color-subtle)]",
							children: n
						})]
					}, g);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 overflow-y-auto p-4 sm:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-3xl flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-[var(--color-subtle)]",
								children: "게임 F9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold tracking-tight",
								children: "디버그 메뉴"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-[var(--color-muted)]",
								children: "게임 안 디버그 화면을 한글로 바꾸고, 메뉴와 포켓몬·기술·도구 목록에서 F 키로 검색합니다. 위 검색창에서 메뉴 이름을 미리 찾아볼 수 있습니다."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: enableDebugKo ? "default" : "outline",
							onClick: savePlugin,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "플러그인"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: enableDebugKo,
							onChange: (e) => setEnableDebugKo(e.target.checked),
							className: "mt-1 size-4 accent-[var(--color-accent)]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: "게임에 디버그 한글 · 검색 넣기"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-[var(--color-muted)]",
							children: "켜 두면 파일 탭에서 게임에 넣을 파일을 저장할 때 이 플러그인도 함께 내려갑니다. 게임 폴더에 압축을 푼 뒤 Ctrl을 누른 채로 실행하세요. F9 메뉴가 한글이 되고, F 키로 검색합니다."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-[var(--color-subtle)]",
						children: searching ? `"${q}" · ${filtered.length}개` : `${DEBUG_KIND_KO[kind]} · ${DEBUG_GROUP_KO[parent] || parent} · ${filtered.length}개`
					}),
					filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--color-muted)]",
						children: "검색 결과가 없습니다. 한글 이름이나 영문 메뉴명으로 찾아 보세요."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-md)] bg-[var(--color-raised)] px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: item.ko
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[11px] text-[var(--color-subtle)]",
										children: item.en
									})]
								}),
								item.descKo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-[var(--color-muted)]",
									children: item.descKo
								}),
								searching && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[11px] text-[var(--color-subtle)]",
									children: [
										DEBUG_KIND_KO[item.kind],
										" · ",
										DEBUG_GROUP_KO[item.parent] || item.parent
									]
								})
							]
						}, `${item.kind}-${item.id}`))
					})
				]
			})
		})]
	});
}
var TABS = [
	{
		id: "species",
		label: "종족"
	},
	{
		id: "moves",
		label: "기술"
	},
	{
		id: "encounters",
		label: "야생"
	},
	{
		id: "debug",
		label: "디버그"
	},
	{
		id: "files",
		label: "파일"
	}
];
function AppShell() {
	const hydrateFromStorage = useEditor((s) => s.hydrateFromStorage);
	const loadBundled = useEditor((s) => s.loadBundled);
	(0, import_react.useEffect)(() => {
		registerOfflineWorker();
		bootEditor();
		return watchPersist();
	}, [hydrateFromStorage, loadBundled]);
	const tab = useEditor((s) => s.tab);
	const setTab = useEditor((s) => s.setTab);
	const query = useEditor((s) => s.query);
	const setQuery = useEditor((s) => s.setQuery);
	const sourceLabel = useEditor((s) => s.sourceLabel);
	const ready = useEditor((s) => s.ready);
	const hasData = useEditor((s) => s.species.length > 50);
	const loadError = useEditor((s) => s.loadError);
	const errN = useIssues().filter((i) => i.level === "error").length;
	const stayed = (0, import_react.useRef)(false);
	const showEditor = ready || hasData;
	if (showEditor) stayed.current = true;
	const visible = showEditor || stayed.current;
	const placeholder = tab === "species" ? "번호 · 이름 · 타입 · 도구" : tab === "moves" ? "기술 이름 · 타입" : tab === "debug" ? "메뉴 · 한글 · 영문" : "도로 · 맵 · 포켓몬";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-[var(--color-bg)] text-[var(--color-fg)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-center",
				toastOptions: { className: "redforge-toast" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-bg)]/92 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-[var(--radius-xs)] bg-[var(--color-accent)] text-[var(--color-accent-fg)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 24 24",
									className: "size-4",
									fill: "none",
									"aria-hidden": true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M4 18h16M7 18V9l5-5 5 5v9",
										stroke: "currentColor",
										strokeWidth: "1.7"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M10 18v-4h4v4",
										stroke: "currentColor",
										strokeWidth: "1.7"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-lg font-semibold leading-tight tracking-tight",
								children: "레드포지"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-wide text-[var(--color-muted)]",
								children: "PBS 없이 Data 파일을 고칩니다"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex rounded-[var(--radius-md)] bg-[var(--color-raised)] p-1",
							children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setTab(t.id),
								className: `h-9 rounded-[var(--radius-sm)] px-3 text-sm font-medium transition-colors duration-150 ${tab === t.id ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"}`,
								children: t.label
							}, t.id))
						}),
						tab !== "files" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-[12rem] flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--color-subtle)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder,
								className: "pl-9"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-3 text-xs text-[var(--color-muted)]",
							children: [
								errN > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[var(--color-danger)]",
									children: ["오류 ", errN]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden max-w-[14rem] truncate sm:inline",
									children: sourceLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineBadge, {})
							]
						})
					]
				})
			}),
			!visible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center gap-3 p-10 text-sm text-[var(--color-muted)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-[var(--color-fg)]",
						children: "어나더레드 데이터를 열고 있습니다"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "PBS 폴더는 배포본에 없습니다. Data/species.dat · moves.dat를 읽습니다." }),
					loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[var(--color-danger)]",
						children: loadError
					})
				]
			}),
			visible && tab === "species" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpeciesPanel, {}),
			visible && tab === "moves" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovePanel, {}),
			visible && tab === "encounters" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncounterPanel, {}),
			visible && tab === "debug" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebugPanel, {}),
			visible && tab === "files" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilesPanel, {})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
