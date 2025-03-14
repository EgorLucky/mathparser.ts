import { Expression } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Fraction implements Expression {
  variables: Variable[];
  name = this.constructor.name;
  numerator: Expression;
  denomitator: Expression;

  constructor(
    variables: Variable[],
    numerator: Expression,
    denumerator: Expression
  ) {
    this.variables = variables;
    this.numerator = numerator;
    this.denomitator = denumerator;
  }

  computeValue(parameters: Parameter[]): number {
    const result =
      this.numerator.computeValue(parameters) /
      this.denomitator.computeValue(parameters);
    return result;
  }
}
