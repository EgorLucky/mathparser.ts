import { Variable } from "./variable";

export class Parameter {
  variableName: string;
  value: number;

  constructor(variableName: string, value: number) {
    this.variableName = variableName;
    this.value = value;
  }

  getVariable() {
    return new Variable(this.variableName);
  }
}
