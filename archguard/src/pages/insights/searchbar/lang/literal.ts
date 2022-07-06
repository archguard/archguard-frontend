// position
export interface Position {
  start: number;
  end: number;
}

export interface BaseToken extends Position {
  type: InsightToken['type']
}

/**
 * Represents a field in a search query.
 * i.e., the `dep_name` in `field:dep_name`. field will be {@link Field} type
 */
export interface Field extends BaseToken {
  type: "literal";
  value: string;
}

/**
 * separator
 * i.e., the `:` in `field:dep_name`.
 */
export interface Separator extends BaseToken {
  type: "separator";
}

/**
 * `string` kind value, i.e.: 'log' or "log"
 */
export interface StringKind extends BaseToken {
  type: "string";
  value: string;
}

/**
 * `regex` kind value, i.e.: /log/
 */
export interface RegexKind extends BaseToken {
  type: "regex";
  value: string;
}

/**
 * `like` kind value, i.e.: %log%
 */
export interface LikeKind extends BaseToken {
  type: "like";
  value: string;
}

/**
 * comparison like: '==', '!=','>', '<', '>=', '<='
 */
export interface ComparisonKind extends BaseToken {
  type: "comparison";
  value: Comparison;
}

export interface Error extends BaseToken {
  type: "error";
  value?: string;
}

export interface Space extends BaseToken {
  type: "space";
}

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
  export function fromText(symbol: String) {
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

const charExp = /[a-zA-Z_]/;
const comparison = /[<>=!]/;

function valueTypeFromChar(char: string) {
  switch (char) {
    case "'":
    case '"':
    case "`":
      return "string";
    case "/":
      return "regex";
    case "%":
      return "like";
    default:
      return "error";
  }
}

export type ValueToken = StringKind | RegexKind | LikeKind;

export type InsightToken =
  | Field
  | Separator
  | StringKind
  | RegexKind
  | LikeKind
  | ComparisonKind
  | Space
  | Error;

export function literal(text: string) {
  let end = text.length + 1;
  let current = 0;
  let tokens: InsightToken[] = [];

  let length = text.length;

  while (current < end) {
    let char = text.charAt(current);

    switch (true) {
      case charExp.test(char):
        var string = "" + char;
        var start = current;

        while (current + 1 < length && charExp.test(text[current + 1])) {
          string += text[current + 1];
          current += 1;
        }

        tokens.push({
          type: "literal",
          value: string,
          start,
          end: current,
        });
        break;
      case char == "'" || char == '"' || char == "`" || char == "/" || char == "%":
        // todo: process escape string
        var endChar = char;
        var value = "" + char;
        var startPos = current;

        while (current + 1 <= length && text[current + 1] != endChar) {
          value += text[current + 1];
          current += 1;
        }

        if (value != "" + char) {
          // move to endChar
          current = current + 1;
          value += text[current];

          tokens.push({
            type: valueTypeFromChar(endChar),
            value: value,
            start: startPos,
            end: current,
          } as ValueToken);
        } else {
          // reset position
          current = startPos;
        }

        break;
      case comparison.test(char):
        // eslint-disable-next-line no-redeclare
        var string = "" + char;
        // eslint-disable-next-line no-redeclare
        var start = current;

        while (current < length && charExp.test(text[current + 1])) {
          string += text[current + 1];
          current += 1;
        }

        current += 1;
        var comparisonType = Comparison.fromText(string);

        tokens.push({
          type: "comparison",
          value: comparisonType,
          start,
          end: current,
        });
        break;
      case char == ":":
        tokens.push({ type: "separator", start: current, end: current + 1 });
        break;
      case char == " ":
        tokens.push({ type: "space", start: current, end: current + 1 });
        break;
      case char.length == 0:
        // skip spaces
        break;
      default:
        tokens.push({ type: "error", value: char, start: current, end: current + 1 });
        break;
    }

    current++;
  }

  return tokens;
}
