import { INSIGHTS_KEYWORDS, OP_KEYWORDS } from "./keywords";
import { Comparison } from "./comparison";
import { BaseToken, InsightsToken } from "./insightsToken";

export function getTokenValue<T extends BaseToken>(token: T): any {
  return (token as any).value;
}

const charRegExpr = /[a-zA-Z_]/;
const comparisonRegExpr = /[<>=!]/;

const SINGLE_QUOTE = "'";
const DOUBLE_QUOTE = '"';
const BACKTICK = "`";
const SLASH = "/";
const PERCENT = "%";

function valueTypeFromChar(char: string) {
  switch (char) {
    case SINGLE_QUOTE:
    case DOUBLE_QUOTE:
    case BACKTICK:
      return "string";
    case SLASH:
      return "regex";
    case PERCENT:
      return "like";
    default:
      return "error";
  }
}

export function lexer(text: string) {
  const length = text.length;
  const end = length + 1;
  let current = 0;
  let tokens: InsightsToken[] = [];

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

        tokens.push({ type, value: string, start, end: ++current } as InsightsToken);
        break;
      case char == SINGLE_QUOTE || char == DOUBLE_QUOTE || char == BACKTICK || char == SLASH || char == PERCENT:
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
          } as InsightsToken);
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
