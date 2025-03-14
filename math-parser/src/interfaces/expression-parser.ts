import { MathParserEntity } from ".";
import { MathTryParseResult } from "../math-try-parse-result";
import { Variable } from "../variable";

export interface ExpressionParser extends MathParserEntity {
  tryToParse(input: string, variables: Variable[]): MathTryParseResult;
}
