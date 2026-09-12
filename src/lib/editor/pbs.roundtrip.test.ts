import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseMovesPbs, parsePokemonPbs, serializeMovesPbs, serializePokemonPbs } from "./pbs.ts";
import { buildSampleWorkspace } from "./sample-data.ts";

describe("pbs roundtrip", () => {
  it("parses serialized sample species", () => {
    const snap = buildSampleWorkspace();
    const text = serializePokemonPbs(snap.species);
    const { species, issues } = parsePokemonPbs(text);
    assert.equal(issues.length, 0);
    assert.equal(species.length, snap.species.length);
    const sprig = species.find((s) => s.internalName === "SPRIGATITO");
    assert.ok(sprig);
    assert.equal(sprig!.name, "나오하");
    assert.deepEqual(sprig!.types, ["GRASS", "DARK"]);
    assert.equal(sprig!.evolutions[0]?.method, "Level");
    assert.equal(sprig!.evolutions[0]?.param, "16");
    const text2 = serializePokemonPbs(
      snap.species.map((s) =>
        s.internalName === "SPRIGATITO" ? { ...s, tutorMoves: ["U_TURN", "GIGADRAIN"] } : s,
      ),
    );
    const again = parsePokemonPbs(text2);
    assert.deepEqual(
      again.species.find((s) => s.internalName === "SPRIGATITO")?.tutorMoves,
      ["U_TURN", "GIGADRAIN"],
    );
    const withHold = serializePokemonPbs(
      snap.species.map((s) =>
        s.internalName === "SPRIGATITO"
          ? { ...s, wildItems: [{ item: "MIRACLESEED", chance: 5 }] }
          : s,
      ),
    );
    const hold = parsePokemonPbs(withHold);
    assert.deepEqual(hold.species.find((s) => s.internalName === "SPRIGATITO")?.wildItems, [
      { item: "MIRACLESEED", chance: 5 },
    ]);
    assert.match(withHold, /WildItemUncommon=MIRACLESEED/);
  });

  it("parses serialized sample moves", () => {
    const snap = buildSampleWorkspace();
    const text = serializeMovesPbs(snap.moves);
    const { moves, issues } = parseMovesPbs(text);
    assert.equal(issues.length, 0);
    const pyro = moves.find((m) => m.internalName === "PYROBALL");
    assert.ok(pyro);
    assert.equal(pyro!.power, 120);
    assert.equal(pyro!.type, "FIRE");
  });

  it("parses csv moves", () => {
    const csv = `1,TACKLE,몸통박치기,None,40,NORMAL,Physical,100,35,0,00,0,abef,"온몸으로 부딪친다."`;
    const { moves } = parseMovesPbs(csv);
    assert.equal(moves[0]?.internalName, "TACKLE");
    assert.equal(moves[0]?.pp, 35);
  });
});
