import { literal } from "./literal";

test("normal dsl", async () => {
  // field is keyword, dep_name is identifier
  let tokens = literal(`field:dep_name = "5" and field:version = "1.3.7"`);

  expect(tokens.length).toBe(11);

  [
    { type: "keyword", value: "field", start: 0, end: 5 },
    { type: "separator", start: 5, end: 6 },
    { type: "identifier", value: "dep_name", start: 6, end: 14 },
    { type: "comparison", value: 0, start: 15, end: 16 },
    { type: "string", value: '"5"', start: 17, end: 20 },
    { type: "operator", value: "and", start: 21, end: 24 },
    { type: "keyword", value: "field", start: 25, end: 30 },
    { type: "separator", start: 30, end: 31 },
    { type: "identifier", value: "version", start: 31, end: 38 },
    { type: "comparison", value: 0, start: 39, end: 40 },
    { type: "string", value: '"1.3.7"', start: 41, end: 48 },
  ].forEach((expected, index) => expect(tokens[index]).toEqual(expected));
});

test("string value", async () => {
  let tokens = literal(`field:dep_name 'log4j'`);

  expect(tokens.length).toBe(4);
  expect(tokens[3]).toEqual({ type: "string", value: "'log4j'", start: 15, end: 22 });

  let tokens2 = literal(`field:dep_name "log4j"`);

  expect(tokens2.length).toBe(4);
  expect(tokens2[3]).toEqual({ type: "string", value: '"log4j"', start: 15, end: 22 });

  let tokens3 = literal(`field:dep_name \`log4j\``);

  expect(tokens3.length).toBe(4);
  expect(tokens3[3]).toEqual({ type: "string", value: "`log4j`", start: 15, end: 22 });
});

test("regex value", async () => {
  let tokens = literal(`field:dep_name /log4j/`);

  expect(tokens.length).toBe(4);
  expect(tokens[3]).toEqual({ type: "regex", value: "/log4j/", start: 15, end: 22 });
});

test("like value", async () => {
  let tokens = literal(`field:dep_name %log4j%`);

  expect(tokens.length).toBe(4);
  expect(tokens[3]).toEqual({ type: "like", value: "%log4j%", start: 15, end: 22 });
});

test("comparison", async () => {
  let sample = `field:dep_name = 'log4j'`;
  let tokens = literal(sample);

  expect(tokens.length).toBe(5);
  expect(tokens[3]).toEqual({ type: "comparison", value: 0, start: 15, end: 16 });
});

test("multiple expression", async () => {
  let tokens = literal(`field:dep_name = 'log4j' field:version = "1.2.3"`);

  expect(tokens.length).toBe(10);
});

test("error", async () => {
  let tokens = literal(`field:dep_name &`);

  expect(tokens.length).toBe(4);
  expect(tokens[3]).toEqual({ type: "error", value: "&", start: 15, end: 16 });
});

test("new field", async () => {
  let tokens = literal("fiel");

  expect(tokens.length).toBe(1);
  expect(tokens[0]).toEqual({ type: "identifier", value: "fiel", start: 0, end: 4 });
});
