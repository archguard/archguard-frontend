import { literal } from "./literal";

test("normal dsl", async () => {
  let sample = `field:dep_name `;
  let tokens = literal(sample);

  expect(tokens.length).toBe(3);

  expect(tokens[0]).toEqual({ type: "literal", value: "field", start: 0, end: 4 });
  expect(tokens[1]).toEqual({ type: "separator", start: 5, end: 6 });
  expect(tokens[2]).toEqual({ type: "literal", value: "dep_name", start: 6, end: 13 });
});

test("string value", async () => {
  let sample = `field:dep_name 'log4j'`;
  let tokens = literal(sample);

  expect(tokens.length).toBe(4);
  expect(tokens[3]).toEqual({ type: "string", value: "'log4j'", start: 15, end: 21 });
});

test('regex value', async () => {
  let sample = `field:dep_name /log4j/`;
  let tokens = literal(sample);

  expect(tokens.length).toBe(4);
  expect(tokens[3]).toEqual({ type: "regex", value: "/log4j/", start: 15, end: 21 });
});

test('like value', async () => {
  let sample = `field:dep_name %log4j%`;
  let tokens = literal(sample);

  expect(tokens.length).toBe(4);
  expect(tokens[3]).toEqual({ type: "like", value: "%log4j%", start: 15, end: 21 });
});

test("comparison", async () => {
  let sample = `field:dep_name = 'log4j'`;
  let tokens = literal(sample);

  expect(tokens.length).toBe(5);
  expect(tokens[3]).toEqual({ type: "comparison", value: 0, start: 15, end: 16 });
});

test("multiple expression", async () => {
  let sample = `field:dep_name = 'log4j' field:version = "1.2.3"`;
  let tokens = literal(sample);

  expect(tokens.length).toBe(10);
});
