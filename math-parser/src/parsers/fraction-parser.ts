import { MathParser, Variable } from "..";
import { Fraction, Product, Sum } from "../expressions";
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

export class FractionParser implements ExpressionParser {
  name = Fraction.prototype.constructor.name;
  mathParser: MathParser;
  constructor(mathParser: MathParser) {
    this.mathParser = mathParser;
  }
  tryToParse(input: string, variables: Variable[]): MathTryParseResult {
    const errorResult: MathTryParseResult = {
      errorMessage: "This is not fraction",
      isSuccessfullyParsed: false,
      inputString: input,
    };

    if (!input.includes("/") || input.endsWith("/")) return errorResult;

    for (let i = input.length - 1; i >= 0; i--) {
      const char = input[i];
      if (char !== "/") continue;
      else if (i !== 0 && i !== input.length - 1) {
        const numerator = input.substring(0, i);
        const denominator = input.substring(i + 1);

        if (
          isBracketsAreBalanced(numerator) &&
          isBracketsAreBalanced(denominator)
        ) {
          const numeratorParseResult = this.mathParser.tryToParse(
            numerator,
            variables
          );
          if (!numeratorParseResult.isSuccessfullyParsed)
            return numeratorParseResult;

          const denominatorParseResult = this.mathParser.tryToParse(
            denominator,
            variables
          );
          if (!denominatorParseResult.isSuccessfullyParsed)
            return denominatorParseResult;

          if (
            notAcceptedExpressionTypesWithoutBrackets.includes(
              numeratorParseResult.expression.name
            ) &&
            !isExpressionInBrackets(numerator)
          )
            return errorResult;

          if (
            notAcceptedExpressionTypesWithoutBrackets.includes(
              denominatorParseResult.expression.name
            ) &&
            !isExpressionInBrackets(denominator)
          )
            return errorResult;

          return {
            isSuccessfullyParsed: true,
            expression: new Fraction(
              variables,
              numeratorParseResult.expression,
              denominatorParseResult.expression
            ),
            inputString: input,
          };
        }
      }
    }

    return errorResult;
  }
}
