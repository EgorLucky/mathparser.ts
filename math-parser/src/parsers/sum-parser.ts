import { MathParser, Variable } from "..";
import { Sum } from "../expressions";
import { ExpressionParser } from "../interfaces";
import { MathTryParseResult } from "../math-try-parse-result";

export class SumParser implements ExpressionParser {
  name = Sum.prototype.constructor.name;
  mathParser: MathParser;
  constructor(mathParser: MathParser) {
    this.mathParser = mathParser;
  }
  tryToParse(input: string, variables: Variable[]): MathTryParseResult {
    const sum = new Sum(variables);

    let balance = 0;
    let term = "";
    let counter = 0;

    const errorResult: MathTryParseResult = {
      errorMessage: "This is not sum",
      isSuccessfullyParsed: false,
      inputString: input,
    };

    for (let char of input) {
      counter++;
      if (char === "(") balance--;
      if (char === ")") balance++;

      if ((char === "+" || char === "-") && balance === 0 && counter !== 1) {
        const parseResult = this.mathParser.tryToParse(term, variables);

        if (!parseResult.isSuccessfullyParsed) return parseResult;

        sum.terms.push(parseResult.expression);
        term = char === "-" ? "-" : "";
        continue;
      }

      term += char;
      if (counter === input.length) {
        if (!sum.terms.length) return errorResult;

        const parseResult = this.mathParser.tryToParse(term, variables);

        if (!parseResult.isSuccessfullyParsed) return parseResult;

        sum.terms.push(parseResult.expression);
      }
    }

    if (sum.terms.length === 1) return errorResult;

    return {
      isSuccessfullyParsed: true,
      expression: sum,
      inputString: input,
    };
  }
}
