import Mock from "mockjs";

const response = Mock.mock({
  "list|8": [
    {
      "id|+1": 1,
      createdDate: "@datetime",
      "name|1": ["质量评估", "可用性评估", "市场响应力评估"],
    },
  ],
});

export default response.list;
