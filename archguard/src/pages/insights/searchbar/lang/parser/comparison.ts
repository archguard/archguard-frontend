export enum Comparison {
  Equal,
  NotEqual,
  GreaterThan,
  GreaterThanOrEqual,
  LessThan,
  LessThanOrEqual,
  NotSupported,
}

// eslint-disable-next-line no-redeclare
export namespace Comparison {
  export function fromText(symbol: string) {
    switch (symbol) {
      case "==":
        return Comparison.Equal;
      case "=":
        return Comparison.Equal;
      case "!=":
        return Comparison.NotEqual;
      case ">":
        return Comparison.GreaterThan;
      case ">=":
        return Comparison.GreaterThanOrEqual;
      case "<":
        return Comparison.LessThan;
      case "<=":
        return Comparison.LessThanOrEqual;
      default:
        return Comparison.NotSupported;
    }
  }
}
