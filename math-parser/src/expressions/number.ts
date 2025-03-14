import { Expression } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Number implements Expression {
  variables: Variable[];
  name = this.constructor.name;
  value: number;

  constructor(value: number) {
    this.value = value;
  }

  computeValue(parameters: Parameter[]): number {
    return this.value;
  }
}
