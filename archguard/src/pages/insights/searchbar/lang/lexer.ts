// position
import { INSIGHTS_KEYWORDS, OP_KEYWORDS } from "./keywords";

export interface Position {
  start: number;
  end: number;
}

export interface BaseToken extends Position {
  type: InsightToken["type"];
}

export function getTokenValue<T extends BaseToken>(token: T): any {
  return (token as any).value;
}

/**
 * Represents a field in a search query.
 * i.e., the `dep_name` in `field:dep_name`. field will be {@link Identifier} type
 */
export interface Keyword extends BaseToken {
  type: "keyword";
  value: string;
}

/**
 * Represents a special type of a keyword that used as a logic operator
 * i.e., the `and` and `or` keyword
 */
export interface Operator extends BaseToken {
  type: "operator";
  value: string;
}

/**
 * Represents a field in a search query.
 * i.e., the `dep_name` in `field:dep_name`. field will be {@link Identifier} type
 */
export interface Identifier extends BaseToken {
  type: "identifier";
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
  // for compatibility with monaco editor, we use `value` to store the error message
  value: string;
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

const charRegExpr = /[a-zA-Z_]/;
const comparisonRegExpr = /[<>=!]/;

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
  | Keyword
  | Operator
  | Identifier
  | Separator
  | StringKind
  | RegexKind
  | LikeKind
  | ComparisonKind
  | Error;

export function lexer(text: string) {
  const length = text.length;
  const end = length + 1;
  let current = 0;
  let tokens: InsightToken[] = [];

  while (current < end) {
    let char = text.charAt(current);

    switch (true) {
      case charRegExpr.test(char):
        var string = `${char}`;
        var start = current;

        while (current + 1 < length && charRegExpr.test(text[current + 1])) {
          string += text[current + 1];
          current++;
        }

        var type = "identifier";
        switch (true) {
          case INSIGHTS_KEYWORDS.includes(string):
            type = "keyword";
            break;
          case OP_KEYWORDS.includes(string):
            type = "operator";
            break;
        }

        tokens.push({ type, value: string, start, end: ++current } as InsightToken);
        break;
      case char == "'" || char == '"' || char == "`" || char == "/" || char == "%":
        // todo: process escape string
        var endChar = char;
        var value = "" + char;
        var startPos = current;

        while (current + 1 < length && text[current + 1] != endChar) {
          value += text[current + 1];
          current++;
        }

        if (text[current + 1] === endChar) {
          // move to endChar
          current++;
          value += endChar;

          tokens.push({
            type: valueTypeFromChar(endChar),
            value: value,
            start: startPos,
            end: ++current,
          } as InsightToken);
        } else {
          current = startPos;
          tokens.push({
            type: "error",
            value: endChar,
            start: startPos,
            end: ++current,
          });
        }

        break;
      case comparisonRegExpr.test(char):
        // eslint-disable-next-line no-redeclare
        var string = "" + char;
        // eslint-disable-next-line no-redeclare
        var start = current;

        while (current < length && comparisonRegExpr.test(text[current + 1])) {
          string += text[current + 1];
          current += 1;
        }

        tokens.push({
          type: "comparison",
          value: Comparison.fromText(string),
          start,
          end: ++current,
        });
        break;
      case char == ":":
        tokens.push({ type: "separator", start: current, end: ++current });
        break;
      case char == " ":
        current++;
        break;
      case char.length === 0:
        // skip last one
        current++;
        break;
      default:
        tokens.push({ type: "error", value: char, start: current, end: ++current });
        break;
    }
  }

  return tokens;
}
