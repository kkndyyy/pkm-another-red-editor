import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { snapWildChance, wildItemsFromBuckets, wildItemsToBuckets } from "./wild-items.ts";

describe("wild hold items", () => {
  it("snaps custom chances to 50/5/1/100", () => {
    assert.equal(snapWildChance(100), 100);
    assert.equal(snapWildChance(80), 50);
    assert.equal(snapWildChance(50), 50);
    assert.equal(snapWildChance(20), 50);
    assert.equal(snapWildChance(19), 5);
    assert.equal(snapWildChance(5), 5);
    assert.equal(snapWildChance(3), 5);
    assert.equal(snapWildChance(2), 1);
    assert.equal(snapWildChance(1), 1);
  });

  it("collapses identical three-slot leftovers to 100%", () => {
    assert.deepEqual(wildItemsFromBuckets(["LEFTOVERS"], ["LEFTOVERS"], ["LEFTOVERS"]), [
      { item: "LEFTOVERS", chance: 100 },
    ]);
    const back = wildItemsToBuckets([{ item: "LEFTOVERS", chance: 100 }]);
    assert.deepEqual(back, {
      common: ["LEFTOVERS"],
      uncommon: ["LEFTOVERS"],
      rare: ["LEFTOVERS"],
    });
  });

  it("keeps common and uncommon separate", () => {
    const items = wildItemsFromBuckets(["STARDUST"], ["STARPIECE"], []);
    assert.deepEqual(items, [
      { item: "STARDUST", chance: 50 },
      { item: "STARPIECE", chance: 5 },
    ]);
    assert.deepEqual(wildItemsToBuckets(items), {
      common: ["STARDUST"],
      uncommon: ["STARPIECE"],
      rare: [],
    });
  });
});
