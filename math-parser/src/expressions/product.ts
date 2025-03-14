import { Expression } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Product implements Expression {
  variables: Variable[];
  name = this.constructor.name;
  factors: Expression[] = [];

  constructor(variables: Variable[]) {
    this.variables = variables;
  }

  computeValue(parameters: Parameter[]): number {
    const result = this.factors
      .map((t) => t.computeValue(parameters))
      .reduce((acc, curr) => acc * curr, 1);
    return result;
  }
}
