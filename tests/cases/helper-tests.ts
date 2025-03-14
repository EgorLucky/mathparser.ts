import test from "node:test";
import assert from "node:assert";

import {
  computeMathExpressionValue,
  MathParser,
  tryParseMathExpressionString,
} from "mathparser";

const parser = new MathParser();

const helperTest = () =>
  test("helper tests", async (t) => {
    await t.test("helper test", (t) => {
      const expression = "x+y+2*z";
      const x = 0;
      const y = 20;
      const z = 1.1;

      const result = tryParseMathExpressionString(expression, "x", "y", "z");

      let computedResult: number;
      if (result.isSuccessfullyParsed)
        computedResult = computeMathExpressionValue(
          result.expression!,
          x,
          y,
          z
        );

      const expectedResult = x + y + 2 * z;

      assert.ok(result.isSuccessfullyParsed);
      assert.equal("Sum", result.expression!.name);
      assert.equal(expectedResult, computedResult!);
    });

    await t.test("helper test rest parameters", (t) => {
      const expression = "x+y+2*z";
      const x = 0;
      const y = 20;
      const z = 1.1;

      const result = tryParseMathExpressionString(
        expression,
        ...["x", "y", "z"]
      );

      let computedResult: number;
      if (result.isSuccessfullyParsed)
        computedResult = computeMathExpressionValue(
          result.expression!,
          ...[x, y, z]
        );

      const expectedResult = x + y + 2 * z;

      assert.ok(result.isSuccessfullyParsed);
      assert.equal("Sum", result.expression!.name);
      assert.equal(expectedResult, computedResult!);
    });
  });

export default helperTest;
