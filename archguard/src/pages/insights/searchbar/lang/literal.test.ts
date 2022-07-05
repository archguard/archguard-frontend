import { literal } from "./literal";

test("normal dsl", async () => {
  let sample = `field:dep_name `;
  let tokens = literal(sample);

  expect(tokens.length).toBe(3);

  expect(tokens[0]).toEqual({ type: "literal", value: "field", start: 0, end: 4 });
  expect(tokens[1]).toEqual({ type: "separator", start: 5, end: 6 });
  expect(tokens[2]).toEqual({ type: "literal", value: "dep_name", start: 6, end: 13 });
});
