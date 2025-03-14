import { Parameter } from "../parameter";
import { Variable } from "../variable";

export interface Expression {
  name: string;
  variables: Variable[];
  computeValue(parameters: Parameter[]): number;
}
