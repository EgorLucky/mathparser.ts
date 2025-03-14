import { Expression } from "./interfaces";
import { Parameter } from "./parameter";

export class Variable implements Expression {
  name: string;
  variables: Variable[] = [];
  constructor(name: string, variables: Variable[] = []) {
    this.name = name;
    this.variables = variables;
  }

  computeValue(parameters: Parameter[]): number {
    const thisVariableParameter = parameters.find(
      (p) => p.variableName == this.name
    );
    return thisVariableParameter.value;
  }
}
