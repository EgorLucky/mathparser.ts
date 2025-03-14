import { Expression } from "./interfaces";

export interface MathTryParseResult {
  isSuccessfullyParsed: boolean;
  expression?: Expression;
  inputString: string;
  errorMessage?: string;
}
