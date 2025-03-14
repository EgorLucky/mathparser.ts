import sumTest from "./cases/sum-tests";
import productTest from "./cases/product-tests";
import powTest from "./cases/pow-tests";
import bracketTest from "./cases/bracket-tests";
import fractionTest from "./cases/fraction-tests";
import helperTest from "./cases/helper-tests";
import functionTest from "./cases/function-tests";

const tests = [
  sumTest,
  productTest,
  powTest,
  bracketTest,
  fractionTest,
  helperTest,
  functionTest,
];

tests.forEach((test) => test());
