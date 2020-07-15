export const configType = [
  {
    type: "nodeColor",
    label: "着色配置",
    formItems: [
      { id: "type", label: "类型", hidden: true, defaultValue: "nodeColor"},
      { id: "key", label: "类名/方法名", span: 6 },
      { id: "value", label: "颜色", type: "color", defaultValue: "#ffffff", span: 6 },
      { id: "order", label: "应用顺序", type: "number", defaultValue: 1, span: 6 }
    ]
  },
  {
    type: "nodeHidden",
    label: "隐藏配置",
    formItems: [
      { id: "type", label: "类型", hidden: true, defaultValue: "nodeHidden" },

      {
        id: "key",
        label: "隐藏类型",
        type: "select",
        options: [
          { label: "模糊匹配", value: "clz" },
          { label: "全匹配", value: "module" },
        ],
        defaultValue: "clz",
        span: 6
      },
      { id: "value", label: "类名/方法名", span: 6 },
      { id: "order", label: "应用顺序", type: "number", defaultValue: 1, span: 6}
    ]
  },
  {
    type: "analysisScope",
    label: "分析范围配置",
    formItems: [
      {
        id: "type",
        label: "类型",
        hidden: true,
        defaultValue: "analysisScope"
      },

      {
        id: "key",
        label: "分析范围类型",
        type: "select",
        options: [{ label: "包含", value: "contains" }],
        defaultValue: "contains",
        span: 6
      },
      { id: "value", label: "类名/方法名", span: 6 },
      { id: "order", label: "应用顺序", type: "number", defaultValue: 1, span: 6}
    ]
  }
];
