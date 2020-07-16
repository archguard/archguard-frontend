export const formItems = [
  {
    id: "className",
    label: "类名",
    required: true,
    span: 12
  },
  {
    id: "dependenceType",
    label: "依赖方式",
    required: true,
    type: "select",
    options: [
      {
        label: "类的依赖",
        value: "dependences"
      },
      {
        label: "类的类调用依赖",
        value: "invokes"
      },
      {
        label: "类所有方法对外调用依赖",
        value: "methods_callees"
      }
    ],
    span: 4
  },
  {
    id: "deep",
    label: "调用深度",
    type: "number",
    min: 0,
    validate: value => {
      if (value < 1) {
        return { isValidate: false, message: "调用深度需大于1" };
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
