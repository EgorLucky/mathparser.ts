import { Expression } from "./interfaces";
import { MathParser } from "./math-parser";
import { Parameter } from "./parameter";
import { Variable } from "./variable";

const parser = new MathParser();

const tryParseMathExpressionString = (
  mathExpression: string,
  ...variableNames: string[]
) => {
  const variables = variableNames.map(
    (variableName) => new Variable(variableName)
  );
  return parser.tryToParse(mathExpression, variables);
};

const computeMathExpressionValue = (
  expression: Expression,
  ...parameterValues: number[]
) => {
  if (parameterValues?.length !== expression?.variables?.length) {
    throw new Error(
      "Parameter values count is not equal to expression variables count."
    );
  }

  const parameters: Parameter[] = [];
  if (expression?.variables?.length) {
    let index = 0;

    for (let variable of expression.variables) {
      const parameter = new Parameter(variable.name, parameterValues[index]);
      parameters.push(parameter);
      index++;
    }
  }

  const result = expression.computeValue(parameters);
  return result;
};

export { tryParseMathExpressionString, computeMathExpressionValue };
