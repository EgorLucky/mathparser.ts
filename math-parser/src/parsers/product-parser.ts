import { MathParser, Variable } from "..";
import { Product } from "../expressions";
import { ExpressionParser } from "../interfaces";
import { MathTryParseResult } from "../math-try-parse-result";
import { isExpressionInBrackets } from "../validation-utils";

export class ProductParser implements ExpressionParser {
  name = Product.prototype.constructor.name;
  mathParser: MathParser;
  constructor(mathParser: MathParser) {
    this.mathParser = mathParser;
  }
  tryToParse(input: string, variables: Variable[]): MathTryParseResult {
    const product = new Product(variables);

    let balance = 0;
    let factor = "";
    let counter = 0;

    const errorResult: MathTryParseResult = {
      errorMessage: "This is not product",
      isSuccessfullyParsed: false,
      inputString: input,
    };

    if ((!input.includes("*") && !input.startsWith("-")) || input.endsWith("*"))
      return errorResult;

    let expression = input;
    if (input.startsWith("-") && !input.charAt(1).match(/\d/g)?.length)
      expression = "-1*" + input.substring(1);

    for (let char of expression) {
      counter++;
      if (char === "(") balance--;
      if (char === ")") balance++;

      if (char === "*" && balance === 0) {
        const parseResult = this.mathParser.tryToParse(factor, variables);

        if (!parseResult.isSuccessfullyParsed) return parseResult;

        if (
          parseResult.expression.name === "Sum" &&
          !isExpressionInBrackets(factor)
        )
          return errorResult;

        product.factors.push(parseResult.expression);
        factor = "";
        continue;
      }

      factor += char;
      if (counter === expression.length) {
        if (!product.factors.length) return errorResult;

        const parseResult = this.mathParser.tryToParse(factor, variables);

        if (!parseResult.isSuccessfullyParsed) return parseResult;

        if (
          parseResult.expression.name === "Sum" &&
          !isExpressionInBrackets(factor)
        )
          return errorResult;

        product.factors.push(parseResult.expression);
      }
    }

    if (product.factors.length === 1) return errorResult;

    return {
      isSuccessfullyParsed: true,
      expression: product,
      inputString: input,
    };
  }
}
