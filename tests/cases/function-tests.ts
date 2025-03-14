import test from "node:test";
import assert from "node:assert";

import { MathParser, Parameter } from "mathparser";

const parser = new MathParser();

const functionTest = () =>
  test("function tests", async (t) => {
    await t.test("parse cos pi", (t) => {
      const expression = "cos(pi)";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      let computedResult: number;
      if (result.isSuccessfullyParsed)
        computedResult = result.expression!.computeValue([parameter]);

      const expectedResult = Math.cos(Math.PI);

      assert.ok(result.isSuccessfullyParsed);
      assert.equal("Cos", result.expression!.name);
      assert.equal(expectedResult, computedResult!);
    });
  });

export default functionTest;
