import { Expression, Function } from "../interfaces";
import { Parameter } from "../parameter";
import { Variable } from "../variable";

export class Log implements Function {
  variables: Variable[];
  arguments: Expression[];
  name = this.constructor.name;
  base: Expression;
  argument: Expression;
  computeValue(parameters: Parameter[]): number {
    return (
      Math.log(this.arguments[1].computeValue(parameters)) /
      Math.log(this.arguments[0].computeValue(parameters))
    );
  }
}
