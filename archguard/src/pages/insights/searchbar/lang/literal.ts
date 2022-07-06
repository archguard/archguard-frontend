// todo: add keyword kind
export enum KeywordKind {
  Or = "or",
  And = "and",
  Not = "not",
}

export interface CharRange {
  start: number;
  end: number;
}

/**
 * Represents a field in a search query.
 * i.e., the `dep_name` in `field:dep_name`. field will be {@link Field} type
 */
export interface Field extends CharRange {
  type: "literal";
  value: string;
}

/**
 * separator
 * i.e., the `:` in `field:dep_name`.
 */
export interface Separator extends CharRange {
  type: "separator";
}

/**
 * `string` kind value, i.e.: 'log' or "log"
 */
export interface StringKind extends CharRange {
  type: "string";
  value: string;
}

/**
 * `regex` kind value, i.e.: /log/
 */
export interface RegexKind extends CharRange {
  type: "regex";
  value: string;
}

/**
 * `like` kind value, i.e.: %log%
 */
export interface LikeKind extends CharRange {
  type: "like";
  value: string;
}

export interface ComparisonKind extends CharRange {
  type: "comparison";
  value: Comparison;
}

export interface Error extends CharRange {
  type: "error";
  value?: string;
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
    case '`':
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

export type Token =
  | Field
  | Separator
  | KeywordKind
  | StringKind
  | RegexKind
  | LikeKind
  | ComparisonKind
  | Error;

export function literal(text: string) {
  let end = text.length + 1;
  let current = 0;
  let tokens: Token[] = [];

  let length = text.length;

  while (current < end) {
    let char = text.charAt(current);

    switch (true) {
      case charExp.test(char):
        var string = "" + char;
        var start = current;

        while (current < length && charExp.test(text[current + 1])) {
          string += text[current + 1];
          current = current + 1;
        }

        tokens.push({
          type: "literal",
          value: string,
          start,
          end: current,
        });
        break;
      case char == "'" || char == '"' || char == '`' || char == "/" || char == "%":
        var endChar = char;
        var value = "" + char;
        var startPos = current;

        while (current + 1 <= length && text[current + 1] != endChar) {
          value += text[current + 1];
          current = current + 1;
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
          current = current + 1;
        }

        current = current + 1;

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
      case char == " " || char.length == 0:
        // skip spaces
        break;
      default:
        console.log(`----${char}////`);
        tokens.push({ type: "error", start: current, end: current + 1 });
        break;
    }

    current++;
  }

  return tokens;
}
