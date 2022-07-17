import { lexer } from "./lexer";

test("normal dsl", async () => {
  // field is keyword, dep_name is identifier
  let tokens = lexer(`dep_name = "5" and version = "1.3.7"`);

  expect(tokens.length).toBe(7);

  [
    { type: "identifier", value: "dep_name", start: 0, end: 8 },
    { type: "comparison", value: 0, start: 9, end: 10 },
    { type: "string", value: '"5"', start: 11, end: 14 },
    { type: "combinator", value: "and", start: 15, end: 18 },
    { type: "identifier", value: "version", start: 19, end: 26 },
    { type: "comparison", value: 0, start: 27, end: 28 },
    { type: "string", value: '"1.3.7"', start: 29, end: 36 },
  ].forEach((expected, index) => expect(tokens[index]).toEqual(expected));
});

test("unpaired wrapper", async () => {
  let tokens = lexer(`dep_name = '"\`/@`);
  expect(tokens.length).toBe(7);
});

test("string value", async () => {
  let tokens = lexer(`dep_name = 'log4j'`);

  expect(tokens.length).toBe(3);
  expect(tokens[2]).toEqual({ type: "string", value: "'log4j'", start: 11, end: 18 });

  let tokens2 = lexer(`dep_name = "log4j"`);

  expect(tokens2.length).toBe(3);
  expect(tokens2[2]).toEqual({ type: "string", value: '"log4j"', start: 11, end: 18 });

  let tokens3 = lexer(`dep_name = \`log4j\``);

  expect(tokens3.length).toBe(3);
  expect(tokens3[2]).toEqual({ type: "string", value: "`log4j`", start: 11, end: 18 });
});

test("regex value", async () => {
  let tokens = lexer(`dep_name = /log4j/`);

  expect(tokens.length).toBe(3);
  expect(tokens[2]).toEqual({ type: "regex", value: "/log4j/", start: 11, end: 18 });
});

test("like value", async () => {
  let tokens = lexer(`dep_name = @%log4j%@`);

  expect(tokens.length).toBe(3);
  expect(tokens[2]).toEqual({ type: "like", value: "@%log4j%@", start: 11, end: 20 });
});

test("expression", async () => {
  let sample = `dep_name = 'log4j'`;
  let tokens = lexer(sample);

  expect(tokens.length).toBe(3);
  expect(tokens[1]).toEqual({ type: "comparison", value: 0, start: 9, end: 10 });
});

test("multiple expression", async () => {
  let tokens = lexer(`a = "1" and b = "2" && c = "3" or d = "4" || e = "5"`);

  expect(tokens.length).toBe(19);

  expect(tokens[3]).toEqual({ type: "combinator", value: "and", start: 8, end: 11 });
  expect(tokens[7]).toEqual({ type: "combinator", value: "&&", start: 20, end: 22 });
  expect(tokens[11]).toEqual({ type: "combinator", value: "or", start: 31, end: 33 });
  expect(tokens[15]).toEqual({ type: "combinator", value: "||", start: 42, end: 44 });
});

test("error", async () => {
  let tokens = lexer(`&`);

  expect(tokens.length).toBe(1);
  expect(tokens[0]).toEqual({ type: "error", value: "&", start: 0, end: 1 });
});

test("new field", async () => {
  let tokens = lexer("fiel");

  expect(tokens.length).toBe(1);
  expect(tokens[0]).toEqual({ type: "identifier", value: "fiel", start: 0, end: 4 });
});

test("then", async () => {
  let tokens = lexer("name = 'world' then version = /.*7$/");
  expect(tokens.length).toBe(7);
});
