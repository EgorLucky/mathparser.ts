import { MathParser, Variable } from "..";
import { Pow, Product, Sum } from "../expressions";
import { ExpressionParser } from "../interfaces";
import { MathTryParseResult } from "../math-try-parse-result";
import {
  isBracketsAreBalanced,
  isExpressionInBrackets,
} from "../validation-utils";

const notAcceptedExpressionTypesWithoutBrackets = [
  Sum.constructor.name,
  Product.constructor.name,
];

export class PowParser implements ExpressionParser {
  name = Pow.prototype.constructor.name;
  mathParser: MathParser;
  constructor(mathParser: MathParser) {
    this.mathParser = mathParser;
  }
  tryToParse(input: string, variables: Variable[]): MathTryParseResult {
    const errorResult: MathTryParseResult = {
      errorMessage: "This is not pow",
      isSuccessfullyParsed: false,
      inputString: input,
    };

    if (!input.includes("^") || input.endsWith("^")) return errorResult;

    let i = -1;
    for (let char of input) {
      i++;
      if (char !== "^") continue;
      else if (i !== 0 && i !== input.length - 1) {
        const base = input.substring(0, i);
        const log = input.substring(i + 1);

        if (isBracketsAreBalanced(base) && isBracketsAreBalanced(log)) {
          const baseParseResult = this.mathParser.tryToParse(base, variables);
          if (!baseParseResult.isSuccessfullyParsed) return baseParseResult;

          const logParseResult = this.mathParser.tryToParse(log, variables);
          if (!logParseResult.isSuccessfullyParsed) return logParseResult;

          if (
            notAcceptedExpressionTypesWithoutBrackets.includes(
              baseParseResult.expression.name
            ) &&
            !isExpressionInBrackets(base)
          )
            return errorResult;

          if (
            notAcceptedExpressionTypesWithoutBrackets.includes(
              logParseResult.expression.name
            ) &&
            !isExpressionInBrackets(log)
          )
            return errorResult;

          return {
            isSuccessfullyParsed: true,
            expression: new Pow(
              variables,
              logParseResult.expression,
              baseParseResult.expression
            ),
            inputString: input,
          };
        }
      }
    }

    return errorResult;
  }
}
