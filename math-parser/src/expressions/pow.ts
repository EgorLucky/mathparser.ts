import { Expression } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Pow implements Expression {
  variables: Variable[];
  name = this.constructor.name;
  log: Expression;
  base: Expression;

  constructor(variables: Variable[], log: Expression, base: Expression) {
    this.variables = variables;
    this.log = log;
    this.base = base;
  }

  computeValue(parameters: Parameter[]): number {
    const logValue = this.log.computeValue(parameters);
    const baseValue = this.base.computeValue(parameters);

    const result = Math.pow(baseValue, logValue);

    return result;
  }
}
