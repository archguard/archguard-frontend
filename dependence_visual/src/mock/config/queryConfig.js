import Mock from "mockjs";

const response = [];

for (let i = 0; i < 3; i++) {
  response.push(
    Mock.mock({
      id: "@id",
      type: "analysisScope",
      key: "contains",
      value: "@string(5, 10)",
      "order|1-100": 100
    })
  );
}

for (let i = 0; i < 3; i++) {
  response.push(
    Mock.mock({
      id: "@id",
      type: "nodeColor",
      key: "@string(5, 10)",
      value: "@color",
      "order|1-100": 100
    })
  );
}

for (let i = 0; i < 3; i++) {
  response.push(
    Mock.mock({
      id: "@id",
      type: "nodeHidden",
      "key|1": ["module", "clz"],
      value: "@string(5, 10)",
      "order|1-100": 100
    })
  );
}

console.log("mock", response);

export default response;
