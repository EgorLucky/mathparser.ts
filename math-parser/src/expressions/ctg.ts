import { Expression, Function } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Ctg implements Function {
  variables: Variable[];
  arguments: Expression[];
  name = this.constructor.name;

  computeValue(parameters: Parameter[]): number {
    return 1 / Math.tan(this.arguments[0].computeValue(parameters));
  }
}
