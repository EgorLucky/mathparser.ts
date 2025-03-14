import test from "node:test";
import assert from "node:assert";

import { MathParser, Parameter } from "mathparser";

const parser = new MathParser();

const fractionTest = () =>
  test("fraction tests", async (t) => {
    await t.test("parse fraction", (t) => {
      const expression = "1/2/3/4/x";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      let computedResult: number;
      if (result.isSuccessfullyParsed)
        computedResult = result.expression!.computeValue([parameter]);

      const expectedResult = 1 / 2 / 3 / 4 / parameter.value;

      assert.ok(result.isSuccessfullyParsed);
      assert.equal("Fraction", result.expression!.name);
      assert.equal(expectedResult, computedResult!);
    });
  });

export default fractionTest;
