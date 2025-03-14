import { MathParser, Variable } from "..";
import { Expression, ExpressionParser, Function } from "../interfaces";
import { MathTryParseResult } from "../math-try-parse-result";
import { isExpressionInBrackets } from "../validation-utils";

export class FunctionParser<FunctionType extends Function>
  implements ExpressionParser
{
  argCount: number;
  mathParser: MathParser;
  name: string;
  factory: new () => FunctionType;
  constructor(
    functionName: string,
    argCount: number,
    mathParser: MathParser,
    factory: new () => FunctionType
  ) {
    if (!functionName) throw new Error("functionName is empty");

    if (argCount == 0) throw new Error("argCount is less than 1");

    this.name = functionName.toLowerCase();
    this.mathParser = mathParser;
    this.argCount = argCount;
    this.factory = factory;
  }

  tryToParse(expression: string, variables: Variable[]): MathTryParseResult {
    const errorResult: MathTryParseResult = {
      errorMessage: `This is not ${this.name}`,
      isSuccessfullyParsed: false,
      inputString: expression,
    };

    if (!expression.startsWith(this.name)) return errorResult;

    let argsString = expression.substring(this.name.length);

    if (this.argCount > 1 && !isExpressionInBrackets(argsString)) {
      errorResult.errorMessage = `Incorrect arguments in ${this.name}`;
      return errorResult;
    }

    if (this.argCount > 1) {
      argsString = argsString.substring(1);
      argsString = argsString.substring(0, argsString.length - 1);
    }

    const argumentsArray: Expression[] = [];

    let balance = 0;
    let argumentString = "";
    let counter = 0;

    if (
      (!expression.includes(",") && this.argCount !== 1) ||
      expression.endsWith(",")
    )
      return errorResult;

    for (let ch of argsString) {
      counter++;
      if (ch === "(") balance--;
      if (ch === ")") balance++;

      if (ch === "," && balance === 0 && counter !== 1) {
        let parseResult = this.mathParser.tryToParse(argumentString, variables);

        if (!parseResult.isSuccessfullyParsed) return parseResult;
        argumentsArray.push(parseResult.expression);
        argumentString = "";
        continue;
      }

      argumentString += ch;
      if (counter == argsString.length) {
        let parseResult = this.mathParser.tryToParse(argumentString, variables);

        if (!parseResult.isSuccessfullyParsed) return parseResult;
        argumentsArray.push(parseResult.expression);
      }
    }

    if (argumentsArray.length != this.argCount) return errorResult;

    let result = new this.factory();
    result.arguments = argumentsArray;
    result.variables = variables;

    return {
      isSuccessfullyParsed: true,
      expression: result,
      inputString: expression,
    };
  }
}
