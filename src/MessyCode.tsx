// Messy code
// Man kann die Probleme nicht sehen wegen SonarQube IDE/SonarLint
// Bei Sonar Server kann man aber die Probleme finden
// Quality Profiles ist auf Sonar away, es muss eigentlich etwas anders sein, damit es sticter die codes überwacht.
function calc(a, b, t) {
  let r;
  if (t === "add") r = a + b;
  else if (t === "sub") r = a - b;
  else if (t === "mul") r = a * b;
  else r = a / b;
  return r;
}
export default calc;
// -----------------------------
// Clean Code
function calculate(a: number, b: number, operation: OperationType): number {
  switch (operation) {
    case OperationType.Add:
      return a + b;
    case OperationType.Divide:
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    case OperationType.Multiply:
      return a * b;
    case OperationType.Subtract:
      return a - b;
    default:
      throw new Error("Invalid operation");
  }
}

enum OperationType {
  Add = "add",
  Divide = "divide",
  Multiply = "multiply",
  Subtract = "subtract",
}
