import test from "node:test";
import assert from "node:assert";

import { MathParser, Parameter } from "mathparser";

const parser = new MathParser();

const productTest = () =>
  test("product tests", async (t) => {
    await t.test("parse 2.5 * cos(pi)", (t) => {
      const expression = "2.5*cos(pi)";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      let computedResult: number;
      if (result.isSuccessfullyParsed)
        computedResult = result.expression!.computeValue([parameter]);

      const expectedResult = 2.5 * Math.cos(Math.PI);

      assert.ok(result.isSuccessfullyParsed);
      assert.equal("Product", result.expression!.name);
      assert.equal(expectedResult, computedResult!);
    });

    await t.test("parse -log(2, 8)", (t) => {
      const expression = "-log(2, 8)";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      let computedResult: number;
      if (result.isSuccessfullyParsed)
        computedResult = result.expression!.computeValue([parameter]);

      const expectedResult = -Math.log(8) / Math.log(2);

      assert.ok(result.isSuccessfullyParsed);
      assert.equal("Product", result.expression!.name);
      assert.equal(expectedResult, computedResult!);
    });

    await t.test("parse product", (t) => {
      const expression =
        "2 * 0.5 * -2.5*cos(pi)* tg(x)^2 * log(-2, -8) * sin(x)*(2+3)*(cos(0)+sin(0))*(2*(x+1))";
      const parameter = new Parameter("x", 1);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      let computedResult: number;
      if (result.isSuccessfullyParsed)
        computedResult = result.expression!.computeValue([parameter]);

      const expectedResult =
        ((2 *
          0.5 *
          -2.5 *
          Math.cos(Math.PI) *
          Math.pow(Math.tan(parameter.value), 2) *
          Math.log(-8)) /
          Math.log(-2)) *
        Math.sin(parameter.value) *
        (2 + 3) *
        (Math.cos(0) + Math.sin(0)) *
        (2 * (parameter.value + 1));

      assert.ok(result.isSuccessfullyParsed);
      assert.equal("Product", result.expression!.name);
      assert.equal(expectedResult, computedResult!);
    });

    await t.test("parse product with unexisting function", (t) => {
      const expression = "2 * 0.5 * 2.5*kek(pi)* tg(x)^2 * log(2, 8) * sin(x) ";
      const parameter = new Parameter("x", 0);

      const variables = [parameter.getVariable()];

      const result = parser.tryToParse(expression, variables);

      assert.ok(!result.isSuccessfullyParsed);
    });
  });

export default productTest;
