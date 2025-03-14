import test from "node:test";
import assert from "node:assert";

import { MathParser, Parameter } from "mathparser";

const parser = new MathParser();

const sumTest = () =>
  test("sum tests", async (t) => {
    await t.test("parse sum", (t) => {
      const expression = "2 + 0.5 + 2.5*cos(pi) - log(2, 8) + sin(x) + tg(x)^2";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      let computedResult: number;
      if (result.isSuccessfullyParsed)
        computedResult = result.expression!.computeValue([parameter]);

      const expectedResult =
        2 +
        0.5 +
        2.5 * Math.cos(Math.PI) -
        Math.log(8) / Math.log(2) +
        Math.sin(parameter.value) +
        Math.pow(Math.tan(parameter.value), 2);

      assert.ok(result.isSuccessfullyParsed);
      assert.equal("Sum", result.expression!.name);
      assert.equal(expectedResult, computedResult!);
    });

    await t.test("parse sum with many pluses in the end", (t) => {
      const expression =
        "2 + 0.5 + 2.5*cos(pi) - log(2, 8) + sin(x) + tg(x)^2++++++";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      assert.ok(!result.isSuccessfullyParsed);
    });

    await t.test('parse sum with many "f" letters in the end', (t) => {
      const expression =
        "2 + 0.5 + 2.5*cos(pi) - log(2, 8) + sin(x) + tg(x)^2fffffff";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      assert.ok(!result.isSuccessfullyParsed);
    });

    await t.test("parse sum with unexist expression", (t) => {
      const expression =
        "2 + 0.5 + 2.5*cos(pi) - log(2, 8) + sin(x) + unexistng(x)^2";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      assert.ok(!result.isSuccessfullyParsed);
    });
  });

export default sumTest;
