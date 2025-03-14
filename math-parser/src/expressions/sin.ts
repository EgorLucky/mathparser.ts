import { Expression, Function } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Sin implements Function {
  variables: Variable[];
  arguments: Expression[];
  name = this.constructor.name;

  computeValue(parameters: Parameter[]): number {
    return Math.sin(this.arguments[0].computeValue(parameters));
  }
}
