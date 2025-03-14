import { Expression } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Sum implements Expression {
  variables: Variable[];
  name = this.constructor.name;
  terms: Expression[] = [];

  constructor(variables: Variable[]) {
    this.variables = variables;
  }

  computeValue(parameters: Parameter[]): number {
    const result = this.terms
      .map((t) => t.computeValue(parameters))
      .reduce((acc, curr) => acc + curr, 0);
    return result;
  }
}
