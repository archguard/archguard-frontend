export const formItems = [
  {
    id: "className",
    label: "类名",
    required: true,
    span: 12
  },
  {
    id: "methodName",
    label: "方法名",
    required: true,
    span: 4
  },
  {
    id: "dependenceType",
    label: "依赖方式",
    type: "select",
    options: [
      {
        label: "全部依赖",
        value: "invokes"
      },
      {
        label: "调用依赖",
        value: "callees"
      },
      {
        label: "被调用依赖",
        value: "callers"
      }
    ],
    required: true,
    span: 4
  },
  {
    id: "deep",
    label: "调用深度",
    type: "number",
    min: 0,
    validate: (value) => {
      if (value < 1) {
        return {isValidate: false, message: "调用深度需大于1"}
      }
    },
    span: 2
  }
];

export const buttons = [
  {
    text: "查询",
    id: "show",
    type: "primary",
    span: 2
  }
];
