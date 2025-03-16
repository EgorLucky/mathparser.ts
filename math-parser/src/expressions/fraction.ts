import { Expression } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Fraction implements Expression {
  variables: Variable[];
  name = this.constructor.name;
  numerator: Expression;
  denumerator: Expression;

  constructor(
    variables: Variable[],
    numerator: Expression,
    denumerator: Expression
  ) {
    this.variables = variables;
    this.numerator = numerator;
    this.denumerator = denumerator;
  }

  computeValue(parameters: Parameter[]): number {
    const result =
      this.numerator.computeValue(parameters) /
      this.denumerator.computeValue(parameters);
    return result;
  }
}
