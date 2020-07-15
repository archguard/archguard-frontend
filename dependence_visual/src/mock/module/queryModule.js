import Mock from "mockjs";

const response = [];

for (let i = 0; i < 3; i++) {
  response.push(
    Mock.mock({
      id: "@id",
      name: "@string(5, 10)",
      packages: ["package1", "package2", "package3"]
    })
  );
}

export default response;
