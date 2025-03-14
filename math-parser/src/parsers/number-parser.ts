import { Variable } from "..";
import { Number as NumberExpression } from "../expressions";
import { ExpressionParser } from "../interfaces";
import { MathTryParseResult } from "../math-try-parse-result";

export class NumberParser implements ExpressionParser {
  name = NumberExpression.prototype.constructor.name;

  tryToParse(input: string, variables: Variable[]): MathTryParseResult {
    const errorResult: MathTryParseResult = {
      isSuccessfullyParsed: false,
      errorMessage: "This is not number",
      inputString: input,
    };

    if (!input) return errorResult;

    const parsed = Number(input);

    if (Number.isNaN(parsed)) return errorResult;

    return {
      isSuccessfullyParsed: true,
      expression: new NumberExpression(parsed),
      inputString: input,
    };
  }

  create(value: number): NumberExpression {
    return new NumberExpression(value);
  }
}
