import { Function, Expression } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Tg implements Function {
  variables: Variable[];
  arguments: Expression[];
  name = this.constructor.name;

  computeValue(parameters: Parameter[]): number {
    return Math.tan(this.arguments[0].computeValue(parameters));
  }
}
