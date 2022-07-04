// todo: add keyword kind
export enum KeywordKind {
  Or = "or",
  And = "and",
  Not = "not",
}

const charExp = /[a-zA-Z_]/;

export function literal(text: string) {
  let end = text.length + 1;
  let current = 0;
  let tokens = [];

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

        tokens.push({ text: string, type: "token", start, end: current });
        break;
      case char == ":":
        tokens.push({ type: "delimiter", start: current, end: current + 1 });
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
