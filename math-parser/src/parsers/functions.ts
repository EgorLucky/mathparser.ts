import { Cos, Ctg, Exp, Log, Sin, Tg } from "../expressions";
import { MathParser } from "..";
import { FunctionParser } from "./function-parser";

class CosParser extends FunctionParser<Cos> {
  constructor(mathParser: MathParser) {
    super(Cos.prototype.constructor.name, 1, mathParser, Cos);
  }
}

class SinParser extends FunctionParser<Sin> {
  constructor(mathParser: MathParser) {
    super(Sin.prototype.constructor.name, 1, mathParser, Sin);
  }
}

class TgParser extends FunctionParser<Tg> {
  constructor(mathParser: MathParser) {
    super(Tg.prototype.constructor.name, 1, mathParser, Tg);
  }
}

class CtgParser extends FunctionParser<Ctg> {
  constructor(mathParser: MathParser) {
    super(Ctg.prototype.constructor.name, 1, mathParser, Ctg);
  }
}

class ExpParser extends FunctionParser<Exp> {
  constructor(mathParser: MathParser) {
    super(Exp.prototype.constructor.name, 1, mathParser, Exp);
  }
}

class LogParser extends FunctionParser<Log> {
  constructor(mathParser: MathParser) {
    super(Log.prototype.constructor.name, 2, mathParser, Log);
  }
}

export { CosParser, SinParser, TgParser, CtgParser, ExpParser, LogParser };
