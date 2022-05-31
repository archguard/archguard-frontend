import { markdownToDsl } from "./markdownToDsl";

test("normal tmp", async () => {
  let sampleImportCode = `| name | scmUrl | language | branch |
|-------|-------|---------|-------|
| DDD Mono | https://github.com/archguard/ddd-monolithic-code-sample | Java | master |
`;

  let dsl = markdownToDsl(sampleImportCode);

  expect(dsl).toEqual([
    'repo(name="DDD Mono",scmUrl="https://github.com/archguard/ddd-monolithic-code-sample",language="Java",branch="master")',
  ]);
});
