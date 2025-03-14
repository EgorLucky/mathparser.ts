import { Expression } from ".";

export interface Function extends Expression {
  arguments: Expression[];
}
