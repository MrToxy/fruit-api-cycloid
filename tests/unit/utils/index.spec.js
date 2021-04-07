import { Query } from "@/utils";
import normalizeFruits from "@/utils/normalize.worker.js";

const fruits = [
  {
    taste: "bad",
  },
  {
    taste: "good",
  },
  {
    taste: "average",
  },
];

const nestedFruits = {
  fruit: {
    isFruit: true,
    taste: "good",
    yes: {
      isFruit: false,
      taste: "bad",
      id: 3,
      no: {
        isFruit: true,
        taste: "good",
        id: 4,
      },
    },
  },
};

describe("Test utility functions", () => {
  it("should filter fruits by taste", () => {
    const results = new Query(fruits).whereIn("taste", ["bad", "good"]).get();
    expect(results).toEqual([
      {
        taste: "bad",
      },
      {
        taste: "good",
      },
    ]);
  });

  it("should retrieve all valid fruits from nested object", async () => {
    const results = await normalizeFruits(nestedFruits);
    expect(results.length).toBe(1);
  });
});
