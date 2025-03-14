import { Expression, Function } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Cos implements Function {
  variables: Variable[];
  arguments: Expression[];
  name = this.constructor.name;

  computeValue(parameters: Parameter[]): number {
    return Math.cos(this.arguments[0].computeValue(parameters));
  }
}
