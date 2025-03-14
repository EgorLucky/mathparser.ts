const isExpressionInBrackets = (expression: string): boolean => {
  if (!expression) return false;

  if (!expression.startsWith("(") || !expression.endsWith(")")) return false;

  let balance = -1;

  for (let i = 1; i < expression.length; i++) {
    if (expression[i] === ")") balance++;
    else if (expression[i] === "(") balance--;

    if (balance === 0 && i + 1 !== expression.length) return false;
  }

  return balance === 0;
};

const isBracketsAreBalanced = (expression: string): boolean => {
  let balance = 0;

  for (let char of expression) {
    if (char === ")") balance++;
    else if (char === "(") balance--;
  }

  return balance === 0;
};

export { isBracketsAreBalanced, isExpressionInBrackets };
