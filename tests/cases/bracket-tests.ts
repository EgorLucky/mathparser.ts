import test from "node:test";
import assert from "node:assert";

import { MathParser, Parameter } from "mathparser";

const parser = new MathParser();

const bracketTest = () =>
  test("brackets tests", async (t) => {
    await t.test("parse tg squared with many brackets", (t) => {
      const expression = "(((tg(x)^2)))";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      let computedResult: number;
      if (result.isSuccessfullyParsed)
        computedResult = result.expression!.computeValue([parameter]);

      const expectedResult = Math.pow(Math.tan(parameter.value), 2);

      assert.ok(result.isSuccessfullyParsed);
      assert.equal("Pow", result.expression!.name);
      assert.equal(expectedResult, computedResult!);
    });

    await t.test("parse empty with many brackets", (t) => {
      const expression = "((()))";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      assert.ok(!result.isSuccessfullyParsed);
    });
  });

export default bracketTest;
