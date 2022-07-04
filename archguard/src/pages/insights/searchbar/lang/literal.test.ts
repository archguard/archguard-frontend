import { literal } from "./literal";

test("normal dsl", async () => {
  let sample = `field:dep_name `;
  let tokens = literal(sample);

  console.log(tokens);
});
