import { randomInteger } from "../utils";

test("should return 0", () => {
  const result = randomInteger(0, 0);
  expect(result).toBe(0);
});
