// todo: add keyword kind
export enum KeywordKind {
  Or = "or",
  And = "and",
  Not = "not",
}

export interface CharacterRange {
  start: number;
  end: number;
}

/**
 * Represents a field in a search query.
 * i.e., the `dep_name` in `field:dep_name`. field will be {@link Field} type
 */
export interface Field extends CharacterRange {
  type: "literal";
  value: string;
}

/**
 * separator
 * i.e., the `:` in `field:dep_name`.
 */
export interface Separator extends CharacterRange {
  type: "separator";
}

export type Token = Field | Separator | KeywordKind;

const charExp = /[a-zA-Z_]/;

export function literal(text: string) {
  let end = text.length + 1;
  let current = 0;
  let tokens: Token[] = [];

  while (current < end) {
    let char = text.charAt(current);

    switch (true) {
      case charExp.test(char):
        var string = "" + char;
        var start = current;

        while (charExp.test(text[current + 1])) {
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
      case char == ":":
        tokens.push({ type: "separator", start: current, end: current + 1 });
        break;
      case char == "'" || char == '"' || char == "%" || char == "/":
        break;
      default:
        console.log("default: " + char);
        break;
    }

    current++;
  }

  return tokens;
}
