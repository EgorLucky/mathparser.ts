import { E, PI } from "./constants";
import { ExpressionParser, MathParserEntity } from "./interfaces";
import { MathTryParseResult } from "./math-try-parse-result";
import {
  PowParser,
  FractionParser,
  SinParser,
  CosParser,
  TgParser,
  CtgParser,
  ExpParser,
  SumParser,
  ProductParser,
  LogParser,
  NumberParser,
} from "./parsers";
import {
  isBracketsAreBalanced,
  isExpressionInBrackets,
} from "./validation-utils";
import { Variable } from "./variable";

export class MathParser {
  constants = [PI, E];

  numberParser = new NumberParser();

  parsers: ExpressionParser[] = [
    new PowParser(this),
    new FractionParser(this),
    new SinParser(this),
    new CosParser(this),
    new TgParser(this),
    new CtgParser(this),
    new ExpParser(this),
    new SumParser(this),
    new ProductParser(this),
    new LogParser(this),
    this.numberParser,
  ];

  mathParserEntities: MathParserEntity[] = [...this.parsers, ...this.constants];

  constructor() {
    this.parsers = this.parsers.sort((left, right) => {
      const leftIsSum = left.name === "Sum";
      const rightIsSum = right.name === "Sum";

      if (leftIsSum !== rightIsSum) {
        if (leftIsSum) return -1;
        else return 1;
      }

      const leftIsProduct = left.name === "Product";
      const rightIsProduct = right.name === "Product";

      if (leftIsProduct !== rightIsProduct) {
        if (leftIsProduct) return -1;
        else return 1;
      }

      return right.name.length - left.name.length;
    });
  }

  tryToParse(input: string, variables?: Variable[]): MathTryParseResult {
    const errorResult: MathTryParseResult = {
      isSuccessfullyParsed: false,
      inputString: input,
    };

    const parameters: MathTryParseParameters = {
      mathExpression: input,
      variables,
    };

    const errorMessage = this.checkTryParseParameters(parameters);

    if (errorMessage) {
      return { ...errorResult, errorMessage };
    }

    const tryParseResult = this.tryParseExpression(
      parameters.mathExpression,
      parameters.variables
    );

    return { ...tryParseResult, inputString: input };
  }

  private checkTryParseParameters(parameters: MathTryParseParameters): string {
    let { mathExpression, variables } = parameters;

    if (!mathExpression || Array.from(mathExpression).every((ch) => ch === " "))
      return "Empty string in mathExpression";

    //проверка на корректность имен переменных
    if (variables && variables.some((v) => !v.name))
      return "Empty variable name";

    if (
      variables &&
      variables.some((v) =>
        Array.from(v.name).some((ch) => ch.match(/\W/g)?.length)
      )
    )
      return "Incorrect variable name";

    //проверка имен переменных на совпадение с именами констант
    let matchedName = "";
    if (variables)
      matchedName = variables
        .filter((v) =>
          this.mathParserEntities.some((c) => c.name === v.name.toLowerCase())
        )
        .map((v) => v.name)[0];

    if (matchedName)
      return `Wrong name for variable ${matchedName}. There is already entity with the same name`;

    //форматирование строки
    mathExpression = mathExpression.replace(/\ /g, "");
    mathExpression = mathExpression.toLowerCase();

    if (!isBracketsAreBalanced(mathExpression))
      return "brackets are not balanced";

    while (isExpressionInBrackets(mathExpression))
      mathExpression = mathExpression.substring(1, mathExpression.length - 1);

    parameters.mathExpression = mathExpression;

    if (!mathExpression) return "Empty string in mathExpression";

    return "";
  }

  private tryParseExpression(
    mathExpression: string,
    variables: Variable[]
  ): MathTryParseResult {
    for (const parser of this.parsers) {
      const parseResult = parser.tryToParse(mathExpression, variables);
      if (parseResult.isSuccessfullyParsed) return parseResult;
    }

    const matchedConstant = this.constants.filter(
      (c) => c.name.toLowerCase() === mathExpression
    )[0];

    if (matchedConstant)
      return {
        isSuccessfullyParsed: true,
        expression: this.numberParser.create(matchedConstant.value),
        inputString: mathExpression,
      };

    const variable = variables
      ? variables.filter((v) => v.name.toLowerCase() === mathExpression)[0]
      : null;

    if (variable)
      return {
        isSuccessfullyParsed: true,
        expression: variable,
        inputString: mathExpression,
      };

    return {
      isSuccessfullyParsed: false,
      errorMessage: "Unknown expression",
      inputString: mathExpression,
    };
  }
}

interface MathTryParseParameters {
  mathExpression: string;
  variables: Variable[];
}
